import { useState, useEffect } from 'react';
import { DatabaseResponse } from '../types';

export const useDatabase = () => {
  const [data, setData] = useState<DatabaseResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DOCELOWO: fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/database`)
    setTimeout(() => {
      setData({
        stats: {
          total_observed: 12842,
          avg_volatility_pct: 14.2,
          system_uptime_pct: 99.98
        },
        items: [
          { id: "SQL-8829-X", name: "AK-47 | Slate", category: "Rifle", rarity: "Classified", condition: "FN", is_stattrak: true, price: 245.50, delta_24h: 1.24, quant_score: 92.4, image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoPD3UvG1J-eV79GRfIz2Zvy5FlClmBS4-QOETWV6BXOyCKqnuu9CKh859116Y0Nde14li5fQT2aESISfSbRykwVQBq8eL63ofDR1BliHDIGvWbC13bhCwubHUynnWYEYDLYMdrZcqvdTfVjrbZ40TztRhLPtP26p9orglYbpn_4almUOnzjNmaTUCfqXE0NAu5vjnm4I5jKaH9eXmNiIZDvV3m54jLelyCHsl7Ug6GjnNxc91EW0RNqvYyvjZS58q6TyfacnYtw" },
          { id: "SQL-4412-M", name: "Butterfly | Marble", category: "Knife", rarity: "Covert", condition: "MW", is_stattrak: false, price: 8240.00, delta_24h: -0.82, quant_score: 48.2, image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWkjXdLvR5OCUAs5Ti3cEfmxePO-OPOpNoDpuSYLBNad-9Ryhs2IMr2lP06KjArMPsN2u_ktg3BEfwamIRwi9DcgCGrCjp9AbMHJAIW48jKCcRHfWx51d_twA6Tca5wREJBM1mGoGfEfW7Y3VM9ZzfURgV4m0Dd_m5topHc9m2yk-9oyVodCh9EAReOPb_Y0hd2Vl7ATynGmOHJvssZ1kHdvF3W4FYbXkBujboCHpzCWcCHtruHuSSuouM04xvO3sRYyNYbzjjw" },
          { id: "SQL-9901-T", name: "M4A4 | Temukau", category: "Rifle", rarity: "Classified", condition: "FN", is_stattrak: false, price: 1120.40, delta_24h: 4.12, quant_score: 81.9, image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDptLrqzBvWHEQplSq9NjeE5gU4rI2iGDcWwaup0bFEsNVVWlzMjn1jffjCvTgdXpW-lSw3JEa8WSFPSDbzluG84rip4jPKTVU0fMTT6ZY13hdNbcBmQU-DHLodV6msnZ5Vs-zyll5mfANaR3_vgMBV_nCGrGKgSF1kWHnfOsWxfavFBy8HsrzfwQxLxS3_dCqrzzzSasyrLhsyrU3MJA121RdqaPpgocsX7rNZEGepfK5qVitjTjw-cUdUwVSqalyDAj7saRXSQ" },
          { id: "SQL-2209-O", name: "Sport Gloves | Omega", category: "Gloves", rarity: "Extraordinary", condition: "FT", is_stattrak: false, price: 4550.00, delta_24h: 0.00, quant_score: 72.0, image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo8TKFUPSa1nW7LzoKM87apQx3j3Ib5_qILsZ53IEiRetMdDrMkn1iYWo9PJ0qGsxSepAVx1uSoU0Vdf8j4WUCCL6lDw85LtfuA1hQ2iF8Rhu3qxW8HmMTL4OFc36avdahJ8tqGMYh6F-NSvo7Pflz2zkqcraldsfcw_jJmpdkYdMljnSQ7SGwq-ELTn4M6Wui0UMHTUZsjjAs4evyeUU-B8kCEu5nmFk1JImvAr6Zve0QDnmS5bnELJ8PETU1ah5jvDgkLR58Aw" },
        ],
        snapshots: [
          { timestamp: "14:22:01.042", asset_name: "Desert Eagle | Printstream", metric_type: "Aggregated_Market_Mean", value: "342.12 PLN", confidence: "±0.04%" },
          { timestamp: "14:21:58.210", asset_name: "AWP | Gungnir", metric_type: "Standard_Deviation_Sigma", value: "1.442", confidence: "±0.12%" },
          { timestamp: "14:21:44.992", asset_name: "Glock-18 | Fade", metric_type: "Liquidity_Density_Score", value: "0.9942", confidence: "±0.01%" },
        ]
      });
      setLoading(false);
    }, 600);
  }, []);

  return { data, loading };
};