import { useState, useEffect } from 'react';
import { EngineData } from '../types';

export const useEngineStatus = () => {
  const [data, setData] = useState<EngineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // DOCELOWO: fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engine`)
    // Na razie robimy "mock API" (sztuczne opóźnienie i dane), żebyś mógł łatwo to podmienić
    
    const fetchMockData = () => {
      setTimeout(() => {
        setData({
          metrics: {
            model_health_pct: 99.8,
            latency_ms: 42,
            ingestion_gb_h: 14.2,
            uptime_hours: 1422,
            status: "SYSTEM_OPERATIONAL"
          },
          infra: {
            db_status: "Synced & Consistent",
            compute_nodes: 12,
            compute_load_pct: 84,
            memory_used_tb: 12.4,
            memory_total_tb: 16.0
          },
          logs: [
            { time: "09:12:01", msg: "BOOTSTRAP: Initializing observer nodes...", type: "info" },
            { time: "09:15:22", msg: "SYNC_COMPLETE: Steam API response 200.", type: "success" },
            { time: "09:18:40", msg: "ALERT: Sigma threshold exceeded. Recalibrating.", type: "warning" },
            { time: "09:21:55", msg: "CLEANUP: Local buffers purged. Ready for cycle.", type: "info" },
          ]
        });
        setLoading(false);
      }, 500); // Symulacja 500ms ładowania z serwera
    };

    fetchMockData();
    
    // Odświeżanie logów co np. 10 sekund (odkomentujesz, jak backend będzie gotowy)
    // const interval = setInterval(fetchEngineData, 10000);
    // return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};