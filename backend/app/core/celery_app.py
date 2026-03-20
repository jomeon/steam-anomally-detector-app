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

@celery_app.task
def scheduled_price_collection():
    """
    Iterates through all items in the database and updates their prices.
    """
    from app.db.database import SessionLocal
    from app.models.models import Item
    from app.services.collector import collect_item_data

    db: Session = SessionLocal()
    try:
        # Get all items currently tracked in the system
        items = db.query(Item).all()
        
        for item in items:
            # Run the collector for each item found
            asyncio.run(collect_item_data(
                app_id=item.app_id,
                market_hash_name=item.market_hash_name,
                item_type=item.item_type,
                collection_name=item.collection_name
            ))
    finally:
        db.close()

# Schedule configuration
celery_app.conf.beat_schedule = {
    "collect-prices-every-hour": {
        "task": "app.core.celery_app.scheduled_price_collection",
        "schedule": crontab(minute=0), # Runs every hour at :00
    },
}