import { Anomaly } from "../types";

interface Props {
  anomaly: Anomaly;
}

export default function AnomalyCard({ anomaly }: Props) {
  // Dynamiczny pasek postępu w zależności od risk_score
  const progressStyle = {
    background: `conic-gradient(from 0deg, #a2c9ff ${anomaly.risk_score}%, transparent 0%)`
  };

  return (
    <article className="bg-surface-container rounded-xl overflow-hidden shadow-2xl transition-all hover:translate-y-[-4px] border border-white/5">
      <div className="grid grid-cols-12">

        {/* Lewa Strona - Tożsamość */}
        <div className="col-span-12 lg:col-span-4 p-8 bg-surface-container-low border-r border-white/5">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest font-mono">
              Market Asset
            </span>
            {anomaly.ai_report?.severity === "CRITICAL" && (
              <span className="text-tertiary material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            )}
          </div>
          <div className="mb-8">
            <h4 className="font-headline text-3xl font-bold tracking-tighter text-on-surface leading-none mb-2">
              {anomaly.name}
            </h4>
            <p className="text-outline text-xs tracking-wide">Standard Statistical Baseline Exceeded</p>
          </div>
          <div className="relative w-full aspect-square bg-surface-container-lowest rounded-lg mb-6 flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-6xl text-outline-variant">inventory_2</span>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary/50">ID: {anomaly.item_id}</div>
          </div>
        </div>

        {/* Prawa Strona - Dane & AI */}
        <div className="col-span-12 lg:col-span-8 p-8 flex flex-col gap-8">

          <div className="flex items-center gap-12 py-6 border-b border-outline-variant/10">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-surface-container-highest"></div>
              <div className="absolute inset-0 rounded-full border-4" style={progressStyle}></div>
              <div className="text-center">
                <p className="text-[10px] font-mono text-outline leading-none">SCORE</p>
                <p className="font-headline text-lg font-bold">{anomaly.risk_score.toFixed(1)}</p>
              </div>
            </div>
            <div>
              <h5 className="font-headline text-xl font-bold text-on-surface tracking-tight">Anomalous Deviation Detected</h5>
              <p className="text-sm text-on-surface-variant max-w-md mt-2">
                Event triggered at: {new Date(anomaly.detected_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* AI Report Box */}
          <div className="bg-surface-container-high p-6 rounded-lg space-y-4 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1 bg-primary"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">psychology</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">AI Analysis</span>
            </div>

            {anomaly.ai_report ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-outline-variant uppercase tracking-tighter block mb-1">Observed Event</label>
                  <p className="text-sm text-on-surface font-medium leading-relaxed">{anomaly.ai_report.summary}</p>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-outline-variant uppercase tracking-tighter block mb-1">Probable Cause</label>
                  <p className="text-sm text-primary font-medium leading-relaxed">{anomaly.ai_report.potential_cause}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-outline animate-pulse">Waiting for AI assessment...</p>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}