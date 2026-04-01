import { DatabaseSnapshot } from "@/types";

interface Props {
  snapshots: DatabaseSnapshot[];
}

export default function SnapshotsTable({ snapshots }: Props) {
  return (
    <>
      {/* DESKTOP VIEW */}
      <section className="hidden md:block bg-surface-container p-6 rounded border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">Academic Asset Log (Latest Snapshots)</h4>
          <span className="text-[10px] text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            REAL-TIME FEED ACTIVE
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px] leading-relaxed">
            <thead className="text-neutral-500 border-b border-white/5">
              <tr>
                <th className="pb-3 font-medium">TIMESTAMP</th>
                <th className="pb-3 font-medium">ASSET_NAME</th>
                <th className="pb-3 font-medium">METRIC_TYPE</th>
                <th className="pb-3 font-medium">OBSERVED_VALUE</th>
                <th className="pb-3 font-medium text-right">CONF_INTERVAL</th>
              </tr>
            </thead>
            <tbody className="text-on-surface-variant divide-y divide-white/5">
              {snapshots.map((snap, i) => (
                <tr key={i}>
                  <td className="py-3">{snap.timestamp}</td>
                  <td className="py-3 text-on-surface">{snap.asset_name}</td>
                  <td className="py-3">{snap.metric_type}</td>
                  <td className="py-3">{snap.value}</td>
                  <td className="py-3 text-right">{snap.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MOBILE VIEW */}
      <section className="md:hidden space-y-4 pt-4 border-t border-outline-variant/10">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Temporal Snapshots</span>
          <span className="font-mono text-[9px] text-primary animate-pulse">STREAMING_LIVE</span>
        </div>
        <div className="space-y-2">
          {snapshots.map((snap, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface-container-low/50 py-2 px-3 rounded border-l-2 border-primary-container/40">
              <span className="font-mono text-[10px] text-outline">{snap.timestamp.split('.')[0]}</span>
              <span className="font-mono text-[10px] text-on-surface flex-grow truncate">{snap.asset_name}</span>
              <span className="font-mono text-[10px] text-primary-container truncate max-w-[80px]">{snap.value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}