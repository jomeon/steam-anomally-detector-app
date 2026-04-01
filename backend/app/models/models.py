from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from sqlalchemy.dialects.postgresql import JSONB

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    market_hash_name = Column(String, unique=True, index=True, nullable=False)
    app_id = Column(Integer, default=730, nullable=False) 
    icon_url = Column(String, nullable=True)
    
    # Metadata for trend analysis
    collection_name = Column(String, index=True, nullable=True) 
    item_type = Column(String, index=True, nullable=True) 

    # Relationships
    price_history = relationship("PriceHistory", back_populates="item", cascade="all, delete-orphan")
    analysis_results = relationship("AnalysisResult", back_populates="item", cascade="all, delete-orphan")

class PriceHistory(Base):
    """
    Time-series table for market data.
    Designed for TimescaleDB hypertable compatibility.
    """
    __tablename__ = "price_history"

    # Primary key must include the partitioning column (timestamp) for TimescaleDB
    timestamp = Column(DateTime(timezone=True), primary_key=True, default=lambda: datetime.now(timezone.utc))
    item_id = Column(Integer, ForeignKey("items.id"), primary_key=True)
    
    # Split price fields to match Steam priceoverview API
    lowest_price = Column(Float, nullable=True)
    median_price = Column(Float, nullable=True)
    volume = Column(Integer, nullable=False, default=0)

    item = relationship("Item", back_populates="price_history")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    # ML detection results
    is_anomaly = Column(Boolean, default=False)
    risk_score = Column(Float, nullable=False)
    
    # AI Agent verification report
    ai_report = Column(JSONB, nullable=True)

    item = relationship("Item", back_populates="analysis_results")