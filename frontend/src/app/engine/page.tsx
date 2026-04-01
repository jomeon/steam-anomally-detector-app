"use client";

import Sidebar from "../../components/Sidebar";
import MobileHeader from "../../components/MobileHeader";
import BottomNav from "../../components/BottomNav";
import SystemTerminal from "../../components/engine/SystemTerminal";
import InfraGrid from "../../components/engine/InfraGrid";
import { useEngineStatus } from "../../hooks/useEngineStatus";

export default function EngineDashboard() {
  const { data, loading, error } = useEngineStatus();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileHeader />
      <BottomNav />

      <main className="w-full relative pt-20 pb-28 px-4 md:pt-12 md:pb-12 md:px-8 md:ml-64 max-w-7xl mx-auto">
        {/* Tło atmosferyczne */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(51,148,241,0.03)_0%,_transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#404752 1px, transparent 1px), linear-gradient(90deg, #404752 1px, transparent 1px)", backgroundSize: "80px 80px" }}></div>
        </div>

        {loading && <p className="text-outline font-mono animate-pulse mt-10">Establishing secure connection to Engine API...</p>}
        {error && <p className="text-error font-mono mt-10">Failed to connect: {error}</p>}

        {/* Pokazujemy interfejs tylko jak mamy dane */}
        {!loading && data && (
          <>
            <div className="hidden md:flex justify-between items-end mb-10 border-b border-outline-variant/10 pb-6 mt-6">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-tight text-on-surface mb-1">
                  Engine Status: <span className="text-primary">Neural-Quant v2.4.0</span>
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">{data.metrics.status}</span>
                  <span className="text-xs text-outline font-mono uppercase tracking-tighter">Uptime: {data.metrics.uptime_hours} Hours</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-widest text-outline mb-1">Local Observational Time</div>
                <div className="text-xl font-mono text-on-surface">{new Date().toLocaleTimeString()} <span className="text-xs opacity-40">UTC</span></div>
              </div>
            </div>

            <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-surface-container-high p-5 md:p-6 rounded-lg border-l-2 md:border-l-0 border-primary/30 md:border-t-4 md:border-primary flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary md:text-primary/50 text-sm md:text-xl">shield_heart</span>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-outline">Model Health</span>
                  </div>
                </div>
                <div className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
                  {data.metrics.model_health_pct}<span className="text-lg md:text-xl text-primary md:ml-1">%</span>
                </div>
                <div className="hidden md:block w-full bg-surface-container-lowest h-1.5 rounded-full mt-4">
                  <div className="h-full bg-primary shadow-[0_0_8px_rgba(162,201,255,0.4)]" style={{ width: `${data.metrics.model_health_pct}%` }}></div>
                </div>
              </div>

              <div className="bg-surface-container-high p-5 md:p-6 rounded-lg border-l-2 md:border-l-0 border-tertiary/30 md:border-t-4 md:border-tertiary flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary md:text-tertiary/50 text-sm md:text-xl">timer</span>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-outline">Latency</span>
                  </div>
                </div>
                <div className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
                  {data.metrics.latency_ms}<span className="text-lg md:text-xl text-tertiary md:ml-1">ms</span>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 bg-surface-container-high p-5 md:p-6 rounded-lg border-l-2 md:border-l-0 border-secondary/30 md:border-t-4 md:border-secondary flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary md:text-secondary/50 text-sm md:text-xl">swap_vert</span>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-outline">Data Ingestion</span>
                  </div>
                </div>
                <div className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
                  {data.metrics.ingestion_gb_h}<span className="text-lg md:text-xl text-secondary md:ml-1">GB/h</span>
                </div>
              </div>
            </section>

            <SystemTerminal logs={data.logs} />
            <InfraGrid infra={data.infra} />
          </>
        )}
      </main>
    </div>
  );
}