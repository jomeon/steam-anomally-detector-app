import os
import asyncio
from celery import Celery
from celery.schedules import crontab
from dotenv import load_dotenv
from sqlalchemy.orm import Session

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

celery_app = Celery(
    "worker",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    beat_schedule_filename="/tmp/celerybeat-schedule"
)

async def fetch_prices_with_delay(items):
    """
    Asynchronous runner that processes items one by one with a mandatory delay
    to respect Steam API rate limits.
    """
    from app.services.collector import collect_item_data
    
    # 3.5 seconds delay allows processing ~1000 items per hour safely
    DELAY_BETWEEN_REQUESTS = 3.5 
    
    for item in items:
        await collect_item_data(
            app_id=item.app_id,
            market_hash_name=item.market_hash_name,
            item_type=item.item_type,
            collection_name=item.collection_name
        )
        await asyncio.sleep(DELAY_BETWEEN_REQUESTS)

@celery_app.task
def scheduled_price_collection():
    """
    Triggered every hour. Retrieves all items and starts the delayed fetching process.
    """
    from app.db.database import SessionLocal
    from app.models.models import Item
    from app.services.ml_engine import AnomalyDetector

    db: Session = SessionLocal()
    detector = AnomalyDetector()
    try:
        items = db.query(Item).all()
        print(f"Starting price collection for {len(items)} items. Estimated time: {len(items) * 3.5 / 60:.2f} minutes.")

        asyncio.run(fetch_prices_with_delay(items))
        print("Price collection cycle finished. Starting ML Analysis...")
        
        analyzed_count = 0
        for item in items:
            success = detector.analyze_item(item.id, db)
            if success:
                analyzed_count += 1
                
        print(f"ML Analysis complete. Processed {analyzed_count} items with sufficient data history.")
        
    except Exception as e:
        print(f"Error in scheduled task: {e}")
    finally:
        db.close()
        print("Price collection cycle finished.")

# Schedule configuration
celery_app.conf.beat_schedule = {
    "collect-prices-every-hour": {
        "task": "app.core.celery_app.scheduled_price_collection",
        "schedule": crontab(minute=0), # Runs every hour at :00
    },
}