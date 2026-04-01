import { ItemMetrics } from "@/types";

export default function ItemMetricsGrid({ metrics }: { metrics: ItemMetrics }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
      <div className="bg-surface-container p-6 border-b-2 border-outline-variant/20 hover:border-primary transition-colors rounded-xl md:rounded-none">
        <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest block mb-2">Volatility Index</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-headline font-bold">{metrics.volatility_index.toFixed(2)}</span>
          <span className="text-[10px] text-error font-mono flex items-center"><span className="material-symbols-outlined text-[12px]">north_east</span> {metrics.volatility_trend}%</span>
        </div>
      </div>
      <div className="bg-surface-container p-6 border-b-2 border-outline-variant/20 hover:border-primary transition-colors rounded-xl md:rounded-none">
        <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest block mb-2">Liquidity Density</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-headline font-bold">{metrics.liquidity_density.toFixed(2)}</span>
          <span className="text-[10px] text-primary font-mono flex items-center"><span className="material-symbols-outlined text-[12px]">expand_more</span> {metrics.liquidity_trend}%</span>
        </div>
      </div>
      <div className="bg-surface-container p-6 border-b-2 border-outline-variant/20 hover:border-primary transition-colors rounded-xl md:rounded-none">
        <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest block mb-2">Mean Deviation</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-headline font-bold">±{metrics.mean_deviation.toFixed(2)}</span>
          <span className="text-[10px] text-on-surface/40 font-mono">PLN</span>
        </div>
      </div>
      <div className="bg-surface-container p-6 border-b-2 border-outline-variant/20 hover:border-primary transition-colors rounded-xl md:rounded-none">
        <span className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest block mb-2">Projected Stability</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-headline font-bold">{metrics.projected_stability_pct.toFixed(1)}%</span>
          <span className="text-[10px] text-tertiary font-mono">HIGH</span>
        </div>
      </div>
    </section>
  );
}