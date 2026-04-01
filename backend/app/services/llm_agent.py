import os
import json
import logging
import httpx
import google.generativeai as genai
from sqlalchemy.orm import Session
from app.models.models import Item, PriceHistory, AnalysisResult

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class MarketAnalystAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
    def _fetch_latest_cs2_news(self) -> str:
        """
        Pobiera 3 najnowsze aktualizacje/newsy ze świata CS2 bezpośrednio od Valve.
        Zwraca sformatowany tekst do wstrzyknięcia w prompt.
        """
        url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/"
        params = {
            "appid": 730, 
            "count": 3,   # 3 latest
            "maxlength": 300, 
            "format": "json"
        }
        
        try:
            response = httpx.get(url, params=params, timeout=5.0)
            if response.status_code == 200:
                news_items = response.json().get("appnews", {}).get("newsitems", [])
                
                if not news_items:
                    return "No recent official CS2 news available."
                
                news_text = ""
                for n in news_items:
                    title = n.get("title", "No title")
                    contents = n.get("contents", "No content").replace("<br>", " ").replace("<i>", "").replace("</i>", "")
                    news_text += f"- [{n.get('date')}] TITLE: {title} | SNIPPET: {contents[:150]}...\n"
                return news_text
            return "Failed to fetch news (Non-200 status)."
        except Exception as e:
            logger.error(f"News fetch error: {e}")
            return "Failed to fetch news due to network error."

    def generate_report(self, item_id: int, db: Session) -> bool:
        """
        Gathers item context, recent game news, and asks LLM to generate a JSON report.
        """
        if not GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY is not set. Skipping AI generation.")
            return False

        item = db.query(Item).filter(Item.id == item_id).first()
        analysis = db.query(AnalysisResult).filter(AnalysisResult.item_id == item_id).first()
        history = db.query(PriceHistory).filter(PriceHistory.item_id == item_id).order_by(PriceHistory.timestamp.desc()).limit(24).all()
        
        if not item or not analysis or not history:
            return False

        current_price = history[0].lowest_price
        current_vol = history[0].volume
        avg_price_24h = sum([h.lowest_price for h in history]) / len(history)
        avg_vol_24h = sum([h.volume for h in history]) / len(history)

        latest_news = self._fetch_latest_cs2_news()

        prompt = f"""
        You are an expert Quantitative Analyst and CS2 Market Expert.
        An anomaly detection system (Isolation Forest) flagged an item as highly irregular.
        
        TASK: Analyze the provided market data AND the recent game news to return a JSON object with your assessment. 
        DO NOT return markdown outside the JSON block. ONLY return valid JSON.
        
        MARKET DATA:
        - Item Name: "{item.market_hash_name}"
        - Item Type: "{item.item_type}"
        - ML Risk Score: {analysis.risk_score}/100 (Higher means more anomalous)
        - Current Price: {current_price} PLN (24h Average: {avg_price_24h:.2f} PLN)
        - Current Volume: {current_vol} (24h Average: {avg_vol_24h:.2f})
        
        RECENT CS2 OFFICIAL NEWS (Context):
        {latest_news}
        
        JSON SCHEMA REQUIRED:
        {{
            "summary": "1-2 sentences explaining what happened on the market.",
            "potential_cause": "Based on the news and data, what is the most likely cause? (e.g., game update, major tournament, market manipulation, or panic selling)",
            "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
            "actionable_advice": "What should a trader do? (e.g., HOLD, SELL NOW, WAIT FOR CRASH)"
        }}
        """

        try:
            response = self.model.generate_content(prompt)
            
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:-3] 
            elif raw_text.startswith("```"):
                raw_text = raw_text[3:-3]
                
            report_data = json.loads(raw_text)
            
            analysis.ai_report = report_data
            db.commit()
            logger.info(f"Successfully generated Context-Aware AI report for {item.market_hash_name}")
            return True
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse LLM response into JSON: {e} \nRaw: {response.text}")
            return False
        except Exception as e:
            logger.error(f"LLM API Error: {e}")
            return False