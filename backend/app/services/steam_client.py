import httpx
import logging
from typing import Optional, Dict, Any
from tenacity import retry, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)

class SteamClient:
    """
    Klient do komunikacji z API Steam.
    Używa stabilnego endpointu priceoverview do budowania własnej historii cen.
    """
    
    # Zmieniamy bazowy URL na stabilniejszy endpoint
    BASE_URL = "https://steamcommunity.com/market/priceoverview/"

    def __init__(self, steam_api_key: Optional[str] = None):
        self.api_key = steam_api_key
        # Ulepszony User-Agent i dodatkowe nagłówki symulujące przeglądarkę
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "application/json",
            "Referer": "https://steamcommunity.com/market/"
        }

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=2, min=4, max=15),
        reraise=True
    )
    async def get_price_overview(self, app_id: int, market_hash_name: str) -> Dict[str, Any]:
        """
        Pobiera aktualne dane rynkowe (cena minimalna, średnia, wolumen).
        To dane 'tu i teraz', które będziemy zapisywać do bazy, tworząc własną historię.
        """
        params = {
            "appid": app_id,
            "market_hash_name": market_hash_name,
            "country": "PL",
            "currency": 6  # 6 = PLN
        }

        async with httpx.AsyncClient(headers=self.headers, follow_redirects=True) as client:
            try:
                response = await client.get(self.BASE_URL, params=params, timeout=10.0)
                
                # Obsługa Rate Limitu
                if response.status_code == 429:
                    logger.warning("Steam Rate Limit hit! Czekam na retry...")
                    raise httpx.HTTPStatusError("Rate limit", request=response.request, response=response)
                
                response.raise_for_status()
                data = response.json()

                if not data.get("success"):
                    logger.error(f"Steam API zwrócił success=False dla {market_hash_name}. Sprawdź nazwę przedmiotu.")
                    return {}

                return data

            except httpx.HTTPError as e:
                logger.error(f"Błąd HTTP podczas komunikacji ze Steam: {e}")
                raise
            except Exception as e:
                logger.error(f"Nieoczekiwany błąd: {e}")
                raise