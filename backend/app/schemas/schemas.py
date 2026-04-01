from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from typing import Dict, Any

# --- ITEM SCHEMAS ---
class ItemBase(BaseModel):
    market_hash_name: str
    app_id: int
    item_type: Optional[str] = None
    collection_name: Optional[str] = None
    icon_url: Optional[str] = None

class ItemResponse(ItemBase):
    id: int

    class Config:
        from_attributes = True 

# --- PRICE HISTORY SCHEMAS ---
class PriceHistoryResponse(BaseModel):
    timestamp: datetime
    lowest_price: Optional[float]
    median_price: Optional[float]
    volume: int

    class Config:
        from_attributes = True

class ItemHistoryResponse(BaseModel):
    item_name: str
    current_price: Optional[float]
    history: List[PriceHistoryResponse]

# --- ANOMALY SCHEMAS ---
class AnomalyResponse(BaseModel):
    item_id: int
    name: str
    risk_score: float
    detected_at: datetime
    ai_report: Optional[Dict[str, Any]] = None