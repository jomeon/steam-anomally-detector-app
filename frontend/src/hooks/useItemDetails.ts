import { useState, useEffect } from 'react';
import { ItemDetailData } from '../types';

export const useItemDetails = (id: string) => {
  const [data, setData] = useState<ItemDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DOCELOWO: fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/database/items/${id}`)
    
    // Symulacja bazy danych
    setTimeout(() => {
      setData({
        id: id, // Używamy ID z URL
        name: "AK-47 | Redline",
        category: "Rifle",
        rarity: "Classified",
        is_stattrak: true,
        global_floor_price: 412.50,
        delta_24h_pct: 2.4,
        quant_score: 92.4,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcr9-9e18SddXPCM7yAkVJUJtNj9MSmS-addnAVaGKBHQvsxTM1fEpL83YVU6CoQNYKw85iR7sw0aZbFK28fTTmWWhqXE-LMSNLH4w6Kl4bZpG3vBLMWlwcWuIIpKcuipXIiIbeJbrWyuZ28LVhwLCDzFxt1GQdrEk5TND9IDjte0e2I-1yzD_IxLXk3CViQX2VMKdljY4TPGV9_ZAVrruEJcWlrmQRZ1v8X8RoOYfll2ykj3q2P6w7QAPlMy_Gb-i42Wm0_KXSw",
        metrics: {
          volatility_index: 1.44,
          volatility_trend: 0.2,
          liquidity_density: 8.92,
          liquidity_trend: 1.1,
          mean_deviation: 4.12,
          projected_stability_pct: 94.2
        },
        insights: {
          liquidity_alert: "Current supply in active trade pipelines has decreased by 14% since the last engine cycle. Resistance likely at 450.00 PLN.",
          ai_analysis: [
            "The asset continues to serve as a primary benchmark for the Classified Rifle market. Current data propagation suggests a positive correlation (r=0.82) with the recent game update.",
            "Volume analysis indicates North American liquidity pools are over-performing. We observe an anomalous spike in volume at support levels, likely indicating institutional accumulation."
          ],
          status: "Nominal",
          sentiment: "Accumulation"
        },
        attributes: {
          collection: "PHOENIX",
          float_index: "STABLE",
          stk_capable: true,
          demand_tier: "ALPHA",
          market_cap: "HIGH",
          retention_rate: "98%"
        }
      });
      setLoading(false);
    }, 600);
  }, [id]); // Hook odświeży się, jeśli zmieni się ID w URL

  return { data, loading };
};