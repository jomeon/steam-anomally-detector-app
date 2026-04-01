export interface AIReport {
  summary?: string;
  potential_cause?: string;
  severity?: string;
}

export interface Anomaly {
  item_id: number;
  name: string;
  risk_score: number;
  detected_at: string;
  ai_report?: AIReport | null;
}

export interface SystemLog {
  time: string;
  msg: string;
  type: "info" | "warning" | "success" | "error";
}

export interface EngineMetrics {
  model_health_pct: number;
  latency_ms: number;
  ingestion_gb_h: number;
  uptime_hours: number;
  status: string;
}

export interface InfraStatus {
  db_status: string;
  compute_nodes: number;
  compute_load_pct: number;
  memory_used_tb: number;
  memory_total_tb: number;
}

// FastAPI  endpoint /api/engine
export interface EngineData {
  metrics: EngineMetrics;
  logs: SystemLog[];
  infra: InfraStatus;
}

export interface DatabaseStats {
  total_observed: number;
  avg_volatility_pct: number;
  system_uptime_pct: number;
}

export interface DatabaseItem {
  id: string;
  name: string;
  category: string;
  rarity: string;
  condition: string;
  is_stattrak: boolean;
  price: number;
  delta_24h: number;
  quant_score: number;
  image_url: string;
}

export interface DatabaseSnapshot {
  timestamp: string;
  asset_name: string;
  metric_type: string;
  value: string;
  confidence: string;
}

export interface DatabaseResponse {
  stats: DatabaseStats;
  items: DatabaseItem[];
  snapshots: DatabaseSnapshot[];
}

export interface ItemMetrics {
  volatility_index: number;
  volatility_trend: number;
  liquidity_density: number;
  liquidity_trend: number;
  mean_deviation: number;
  projected_stability_pct: number;
}

export interface ItemInsights {
  liquidity_alert?: string;
  ai_analysis: string[];
  status: string;
  sentiment: string;
}

export interface ItemAttributes {
  collection: string;
  float_index: string;
  stk_capable: boolean;
  demand_tier: string;
  market_cap: string;
  retention_rate: string;
}

export interface ItemDetailData {
  id: string;
  name: string;
  category: string;
  rarity: string;
  is_stattrak: boolean;
  global_floor_price: number;
  delta_24h_pct: number;
  quant_score: number;
  image_url: string;
  metrics: ItemMetrics;
  insights: ItemInsights;
  attributes: ItemAttributes;
}