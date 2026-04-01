"use client";

import Sidebar from "../../components/Sidebar";
import MobileHeader from "../../components/MobileHeader";
import BottomNav from "../../components/BottomNav";
import ItemCard from "../../components/database/ItemCard";
import SnapshotsTable from "../../components/database/SnapshotsTable";
import { useDatabase } from "../../hooks/useDatabase";

export default function DatabaseDashboard() {
  const { data, loading } = useDatabase();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileHeader />
      <BottomNav />

      {/* Dedykowany Desktop Header dla bazy */}
      <header className="hidden md:flex fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-neutral-950/60 backdrop-blur-xl border-b border-white/5 items-center justify-between px-8 h-16">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-md group">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">search</span>
            <input type="text" placeholder="QUERY ITEM DATABASE..." className="bg-transparent border-none focus:ring-0 text-xs font-['Inter'] font-medium uppercase tracking-widest text-on-surface w-full pl-6 py-2 outline-none" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-primary transition-colors"></div>
          </div>
        </div>
      </header>

      <main className="w-full relative pt-20 pb-28 px-4 md:pt-24 md:pb-12 md:px-8 md:ml-64 max-w-screen-2xl mx-auto">
        {/* Tło atmosferyczne */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(51,148,241,0.03)_0%,_transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        </div>

        {/* Sekcja Filtrów Desktop / Mobile */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end mb-8">
          <div className="md:col-span-4">
            <h2 className="text-xl md:text-4xl font-headline font-bold tracking-tight text-on-surface mb-2 hidden md:block">Item Database</h2>
            <div className="flex items-center justify-between px-1 md:hidden mb-2">
              <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Parameters / Filtration</span>
              <span className="font-mono text-[9px] text-tertiary">SESSION_ID: 0x9AF4</span>
            </div>
            <p className="text-on-surface-variant text-sm font-body max-w-xs hidden md:block">Global aggregate of high-liquidity digital assets and their observational stability metrics.</p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-3 gap-2 md:gap-4">
            {['Category', 'Rarity', 'Stability'].map((filter, i) => (
              <div key={i} className="bg-surface-container-low p-2 md:p-3 rounded-lg md:rounded-sm border-b-2 border-outline-variant/30 md:border-none flex flex-col gap-1 md:gap-2">
                <label className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-outline md:text-neutral-500">{filter}</label>
                <select className="bg-transparent md:bg-surface-container border-none text-xs font-medium tracking-tight text-on-surface md:p-3 rounded-sm focus:ring-1 focus:ring-primary/30 outline-none appearance-none cursor-pointer">
                  <option>All {filter}s</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        {loading ? (
          <p className="text-outline font-mono animate-pulse text-sm">Synchronizing Database Nodes...</p>
        ) : data ? (
          <>
            {/* Stats Ribbon (Głównie Desktop) */}
            <div className="hidden md:flex gap-4 overflow-x-auto no-scrollbar pb-6">
              <div className="bg-surface-container-high px-6 py-4 rounded flex flex-col min-w-[200px]">
                <span className="text-[10px] font-mono text-neutral-500 mb-1">TOTAL_OBSERVED</span>
                <span className="text-xl font-headline font-bold">{data.stats.total_observed.toLocaleString()}</span>
              </div>
              <div className="bg-surface-container-high px-6 py-4 rounded flex flex-col min-w-[200px]">
                <span className="text-[10px] font-mono text-neutral-500 mb-1">AVG_VOLATILITY</span>
                <span className="text-xl font-headline font-bold text-tertiary">{data.stats.avg_volatility_pct}%</span>
              </div>
              <div className="bg-surface-container-high px-6 py-4 rounded flex flex-col min-w-[200px]">
                <span className="text-[10px] font-mono text-neutral-500 mb-1">SYSTEM_UPTIME</span>
                <span className="text-xl font-headline font-bold text-primary">{data.stats.system_uptime_pct}%</span>
              </div>
            </div>

            {/* Mobile Header dla siatki */}
            <div className="flex md:hidden items-center gap-2 px-1 mb-4 mt-6">
              <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
              <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Inventory Manifest</span>
              <div className="h-[1px] w-8 bg-outline-variant/20"></div>
            </div>

            {/* Siatka Kart */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
              {data.items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Tabela Logów */}
            <SnapshotsTable snapshots={data.snapshots} />
          </>
        ) : null}
      </main>
    </div>
  );
}