from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    market_hash_name = Column(String, unique=True, index=True, nullable=False)
    app_id = Column(Integer, default=730, nullable=False) # Domyślnie CS2 (730)
    icon_url = Column(String, nullable=True)
    
    # --- NOWE POLA DLA ANALIZY TRENDÓW ---
    # np. "The Cobblestone Collection", "Operation Bravo Case"
    collection_name = Column(String, index=True, nullable=True) 
    # np. "Sticker", "Sniper Rifle", "Container"
    item_type = Column(String, index=True, nullable=True) 

    # Relacje - jeden przedmiot ma wiele wpisów cen i wiele wyników analiz
    price_history = relationship("PriceHistory", back_populates="item", cascade="all, delete-orphan")
    analysis_results = relationship("AnalysisResult", back_populates="item", cascade="all, delete-orphan")

class PriceHistory(Base):
    """
    Docelowo ta tabela stanie się hypertable w TimescaleDB, 
    co jest idealne dla szeregów czasowych (cen).
    """
    __tablename__ = "price_history"

    # W TimescaleDB klucz główny musi zawierać kolumnę partycjonowania (timestamp)
    timestamp = Column(DateTime(timezone=True), primary_key=True, default=lambda: datetime.now(timezone.utc))
    item_id = Column(Integer, ForeignKey("items.id"), primary_key=True)
    price = Column(Float, nullable=False)
    volume = Column(Integer, nullable=False)

    item = relationship("Item", back_populates="price_history")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    # Wynik z modelu ML (Isolation Forest)
    is_anomaly = Column(Boolean, default=False)
    risk_score = Column(Float, nullable=False) # np. od 0.0 (bezpiecznie) do 100.0 (bańka/manipulacja)
    
    # Wynik z modelu AI (Gemini Agent)
    ai_report = Column(Text, nullable=True)

    item = relationship("Item", back_populates="analysis_results")