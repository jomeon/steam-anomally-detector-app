from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timezone, timedelta

from app.api.dependencies import get_db
from app.models.models import Item, AnalysisResult
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=schemas.DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Returns aggregated stats for the frontend dashboard KPI cards."""
    total_items = db.query(Item).count()
    
    yesterday = datetime.now(timezone.utc) - timedelta(days=1)
    
    anomalies_24h = db.query(AnalysisResult).filter(
        AnalysisResult.is_anomaly == True,
        AnalysisResult.created_at >= yesterday
    ).count()
    
    highest_risk = db.query(func.max(AnalysisResult.risk_score)).filter(
        AnalysisResult.is_anomaly == True
    ).scalar()

    return {
        "total_tracked_items": total_items,
        "anomalies_last_24h": anomalies_24h,
        "highest_risk_score": highest_risk if highest_risk else 0.0
    }