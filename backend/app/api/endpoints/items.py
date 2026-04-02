from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.api.dependencies import get_db
from app.models.models import Item, PriceHistory
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.ItemResponse])
def get_tracked_items(db: Session = Depends(get_db)):
    """Returns a list of all tracked items."""
    return db.query(Item).all()

@router.get("/{item_id}/history", response_model=schemas.ItemHistoryResponse)
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

@router.post("/{item_id}/analyze", response_model=schemas.AnalysisTriggerResponse)
def trigger_manual_analysis(item_id: int, db: Session = Depends(get_db)):
    """Triggers a manual ML/LLM analysis pipeline for a specific item."""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # TODO: Celery task call here (e.g., analyze_item_task.delay(item_id))

    return {
        "message": f"Analysis queued for {item.market_hash_name}",
        "item_id": item_id,
        "status": "processing"
    }