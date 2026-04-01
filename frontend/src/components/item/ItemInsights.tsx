import { ItemInsights } from "@/types";

export default function ItemInsightsSection({ insights }: { insights: ItemInsights }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-start mt-8">
      <div className="lg:col-span-2 space-y-6">
        {insights.liquidity_alert && (
          <div className="bg-[#353534]/60 backdrop-blur-xl border-l-4 border-tertiary p-4 rounded-xl flex gap-4">
            <div className="bg-tertiary/20 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-tertiary uppercase tracking-tighter text-sm">Liquidity Alert</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">{insights.liquidity_alert}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-outline-variant/20"></div>
          <h2 className="font-headline text-xs font-black uppercase tracking-[0.3em] text-on-surface/40">Observational Insights</h2>
          <div className="h-px flex-1 bg-outline-variant/20"></div>
        </div>

        <div className="bg-surface-container-high p-6 md:p-8 border border-outline-variant/10 rounded-lg">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="space-y-4">
              {insights.ai_analysis.map((paragraph, idx) => (
                <p key={idx} className="text-sm text-on-surface/80 leading-relaxed font-body">{paragraph}</p>
              ))}
              <div className="pt-4 flex gap-6 border-t border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-[9px] font-mono text-on-surface/40 uppercase tracking-widest">Asset Status: {insights.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-[9px] font-mono text-on-surface/40 uppercase tracking-widest">Sentiment: {insights.sentiment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}