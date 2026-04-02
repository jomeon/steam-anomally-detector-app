from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importujemy nasze zorganizowane routery
from app.api.endpoints import items, anomalies, stats

app = FastAPI(
    title="Steam Anomaly Detector API",
    description="Professional REST API for CS2 Market ML Analysis.",
    version="1.1.0"
)

# KONFIGURACJA CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Zabezpiecz to przed wdrożeniem na produkcję!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REJESTRACJA ROUTERÓW Z PRZEDROSTKAMI
app.include_router(stats.router, prefix="/api/stats", tags=["Dashboard"])
app.include_router(items.router, prefix="/api/items", tags=["Items Data"])
app.include_router(anomalies.router, prefix="/api/anomalies", tags=["Anomalies & ML"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Steam Anomaly Detector API is running."}