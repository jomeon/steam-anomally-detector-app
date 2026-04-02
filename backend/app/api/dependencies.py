from app.db.database import SessionLocal

def get_db():
    """Wspólna zależność (Dependency) do wstrzykiwania sesji bazy danych."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()