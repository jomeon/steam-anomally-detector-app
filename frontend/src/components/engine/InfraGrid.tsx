import { InfraStatus } from "@/types";

interface Props {
  infra: InfraStatus;
}

export default function InfraGrid({ infra }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
      <div className="bg-surface-container flex items-center p-4 rounded-lg border-l-2 border-primary/40">
        <div className="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center mr-4">
          <span className="material-symbols-outlined text-primary">database</span>
        </div>
        <div className="flex-grow">
          <div className="text-[10px] font-mono uppercase text-on-surface-variant tracking-wider">Database Cluster</div>
          <div className="text-sm font-semibold">{infra.db_status} <span className="text-primary text-[10px] ml-2">● Online</span></div>
        </div>
      </div>
      <div className="bg-surface-container flex items-center p-4 rounded-lg border-l-2 border-tertiary/40">
        <div className="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center mr-4">
          <span className="material-symbols-outlined text-tertiary">memory</span>
        </div>
        <div className="flex-grow">
          <div className="text-[10px] font-mono uppercase text-on-surface-variant tracking-wider">Compute Capacity</div>
          <div className="text-sm font-semibold">{infra.compute_nodes} Nodes <span className="text-tertiary text-[10px] ml-2">● {infra.compute_load_pct}% Load</span></div>
        </div>
      </div>
      <div className="bg-surface-container flex items-center p-4 rounded-lg border-l-2 border-outline-variant/40">
        <div className="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center mr-4">
          <span className="material-symbols-outlined text-on-surface-variant">sd_card</span>
        </div>
        <div className="flex-grow">
          <div className="text-[10px] font-mono uppercase text-on-surface-variant tracking-wider">Memory Allocation</div>
          <div className="text-sm font-semibold">{infra.memory_used_tb.toFixed(1)} / {infra.memory_total_tb.toFixed(1)} TB</div>
        </div>
      </div>
    </section>
  );
}