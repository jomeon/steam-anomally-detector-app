"use client";

import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import BottomNav from "../components/BottomNav";
import AnomalyCard from "../components/AnomalyCard";
import { useAnomalies } from "../hooks/useAnomalies";

export default function Dashboard() {
  const { anomalies, loading, error } = useAnomalies();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar ukryty na telefonach (domyślnie hidden, od md: flex) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Komponenty dedykowane na mobile (ukrywane od rozdzielczości md:) */}
      <MobileHeader />
      <BottomNav />

      {/* Main Content - responsywne marginesy */}
      {/* Na mobile: marginesy górny i dolny na paski. Na PC: lewy margines na Sidebar */}
      <main className="w-full relative pt-20 pb-28 px-4 md:pt-12 md:pb-12 md:px-8 md:ml-64 max-w-7xl mx-auto">
        
        {/* Tło atmosferyczne */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(51,148,241,0.03)_0%,_transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#404752 1px, transparent 1px), linear-gradient(90deg, #404752 1px, transparent 1px)", backgroundSize: "80px 80px" }}></div>
        </div>

        {/* Responsywny pasek statystyk - Scroll poziomy na mobile, Grid na PC */}
        <section className="flex gap-4 overflow-x-auto no-scrollbar mb-8 md:grid md:grid-cols-3 md:overflow-visible">
          <div className="flex-shrink-0 w-36 md:w-auto bg-surface-container-high p-4 md:p-6 rounded-lg relative overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 md:mb-4">Tracked Items</p>
            <h2 className="font-headline text-2xl md:text-5xl font-bold md:font-light tracking-tighter text-primary">102</h2>
          </div>
          <div className="flex-shrink-0 w-36 md:w-auto bg-surface-container-high p-4 md:p-6 rounded-lg relative overflow-hidden border-l-2 border-tertiary/20">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 md:mb-4">Active Alerts</p>
            <h2 className="font-headline text-2xl md:text-5xl font-bold md:font-light tracking-tighter text-tertiary">{anomalies.length}</h2>
          </div>
          <div className="flex-shrink-0 w-48 md:w-auto bg-surface-container-high p-4 md:p-6 rounded-lg flex flex-col justify-center border-l-2 md:border-l-4 border-primary">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">Model Status</p>
            <h2 className="font-headline text-lg md:text-2xl font-bold tracking-tight text-on-surface">System Active</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-mono text-primary uppercase">API Linked</span>
            </div>
          </div>
        </section>

        {/* Header Sekcji Kart */}
        <div className="flex items-center justify-between mb-4 md:mb-8 border-b border-outline-variant/10 pb-2 md:pb-4">
          <h3 className="font-headline text-sm md:text-2xl font-bold md:font-light tracking-tight uppercase opacity-60 md:opacity-100 flex items-center gap-2 md:gap-3">
            <span className="material-symbols-outlined text-tertiary hidden md:block">emergency_home</span>
            Priority Alerts
          </h3>
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest md:hidden">Live Feed</span>
        </div>

        {/* Lista Kart Anomalii */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {loading && <p className="text-outline font-mono animate-pulse text-sm">Scanning market arrays...</p>}
          {error && <p className="text-error font-mono text-sm">System Error: {error}</p>}
          {!loading && anomalies.length === 0 && <p className="text-outline font-mono text-sm">System clear. No anomalies detected in current cycle.</p>}
          
          {anomalies.map((anomaly) => (
            <AnomalyCard key={anomaly.item_id} anomaly={anomaly} />
          ))}
        </div>

      </main>
    </div>
  );
}