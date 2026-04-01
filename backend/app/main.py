from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.db.database import SessionLocal
from app.models.models import Item, PriceHistory, AnalysisResult
from app.schemas import schemas  # Importujemy nasze nowe schematy

app = FastAPI(
    title="Steam Anomaly Detector API",
    description="Professional REST API for CS2 Market ML Analysis.",
    version="1.1.0"
)

# 1. KONFIGURACJA CORS (Pozwala na komunikację z Frontend'em)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # W produkcji zmieniamy na konkretny adres np. ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Zezwala na GET, POST, PUT, DELETE
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Steam Anomaly Detector API is running."}

# 2. UŻYCIE SCHEMATÓW (response_model)
@app.get("/api/items", response_model=List[schemas.ItemResponse])
def get_tracked_items(db: Session = Depends(get_db)):
    """Returns a list of all tracked items."""
    return db.query(Item).all()

@app.get("/api/items/{item_id}/history", response_model=schemas.ItemHistoryResponse)
def get_item_history(item_id: int, limit: int = 100, db: Session = Depends(get_db)):
    """Returns the price and volume history for a specific item."""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    history = db.query(PriceHistory)\
                .filter(PriceHistory.item_id == item_id)\
                .order_by(desc(PriceHistory.timestamp))\
                .limit(limit)\
                .all()
    
    return {
        "item_name": item.market_hash_name,
        "current_price": history[0].lowest_price if history else None,
        "history": history
    }

@app.get("/api/anomalies", response_model=List[schemas.AnomalyResponse])
def get_anomalies(db: Session = Depends(get_db)):
    """Returns all items currently flagged as anomalies by the ML Engine."""
    anomalies = db.query(AnalysisResult, Item)\
                  .join(Item, AnalysisResult.item_id == Item.id)\
                  .filter(AnalysisResult.is_anomaly == True)\
                  .order_by(desc(AnalysisResult.risk_score))\
                  .all()
    
    return [
        {
            "item_id": item.id,
            "name": item.market_hash_name,
            "risk_score": analysis.risk_score,
            "detected_at": analysis.created_at,
            "ai_report": analysis.ai_report
        }
        for analysis, item in anomalies
    ]