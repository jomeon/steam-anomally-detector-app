import { useState, useEffect } from 'react';
import { Anomaly } from '../types';

export const useAnomalies = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anomalies`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setAnomalies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
    // Opcjonalnie: odświeżanie co 60 sekund
    const interval = setInterval(fetchAnomalies, 60000);
    return () => clearInterval(interval);
  }, []);

  return { anomalies, loading, error };
};