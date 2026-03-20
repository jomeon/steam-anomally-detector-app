from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.models import Item, PriceHistory
from app.services.steam_client import SteamClient
import datetime
import re

def clean_price(price_str: str) -> float:
    """Extract float value from currency string like '172,50zł'"""
    if not price_str: 
        return 0.0
    cleaned = re.sub(r'[^\d,.]', '', price_str).replace(',', '.')
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

async def collect_item_data(
    app_id: int, 
    market_hash_name: str, 
    item_type: str, 
    collection_name: str
):
    """
    Fetches data from Steam and persists it to the database.
    Item metadata is parameterized to avoid hardcoding.
    """
    db: Session = SessionLocal()
    client = SteamClient()
    
    try:
        # Fetch current market state
        data = await client.get_price_overview(app_id, market_hash_name)
        if not data:
            return

        # Ensure item exists in the database
        item = db.query(Item).filter(Item.market_hash_name == market_hash_name).first()
        if not item:
            item = Item(
                market_hash_name=market_hash_name,
                app_id=app_id,
                item_type=item_type,
                collection_name=collection_name
            )
            db.add(item)
            db.commit()
            db.refresh(item)

        # Create new history entry
        new_price_entry = PriceHistory(
            item_id=item.id,
            lowest_price=clean_price(data.get('lowest_price')),
            median_price=clean_price(data.get('median_price')),
            volume=int(str(data.get('volume', '0')).replace(',', '')),
            timestamp=datetime.datetime.now(datetime.timezone.utc)
        )
        
        db.add(new_price_entry)
        db.commit()
        print(f"Success: Record saved for {market_hash_name}")

    except Exception as e:
        print(f"Collector error: {e}")
        db.rollback()
    finally:
        db.close()