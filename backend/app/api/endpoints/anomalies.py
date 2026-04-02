from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.api.dependencies import get_db
from app.models.models import Item, AnalysisResult
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.AnomalyResponse])
def get_anomalies(skip: int = 0, limit: int = 50, min_risk: float = 0.0, db: Session = Depends(get_db)):
    """Returns anomalies with pagination and risk-based filtering."""
    anomalies = db.query(AnalysisResult, Item)\
                  .join(Item, AnalysisResult.item_id == Item.id)\
                  .filter(AnalysisResult.is_anomaly == True)\
                  .filter(AnalysisResult.risk_score >= min_risk)\
                  .order_by(desc(AnalysisResult.risk_score))\
                  .offset(skip)\
                  .limit(limit)\
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