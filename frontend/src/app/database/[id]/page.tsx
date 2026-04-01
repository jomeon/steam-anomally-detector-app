"use client";

import { use } from "react"; 
import { useItemDetails } from "../../../hooks/useItemDetails";
import Sidebar from "../../../components/Sidebar";
import BottomNav from "../../../components/BottomNav";
import ItemMetricsGrid from "../../../components/item/ItemMetricsGrid";
import ItemInsightsSection from "../../../components/item/ItemInsights";
import { useRouter } from "next/navigation";

export default function ItemDetailDashboard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data, loading } = useItemDetails(resolvedParams.id);
  
  const router = useRouter();

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-surface items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-primary animate-spin text-4xl">sync</span>
            <p className="text-primary font-mono animate-pulse uppercase tracking-widest text-xs">Decrypting asset data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <BottomNav />

      {/* Dedykowany Header Mobile */}
      <header className="md:hidden w-full top-0 sticky z-50 bg-[#0e0e0e] border-b border-white/5">
        <div className="flex items-center px-4 h-16 w-full">
          <button onClick={() => router.back()} className="material-symbols-outlined text-primary mr-4 active:opacity-70 transition-opacity cursor-pointer">arrow_back</button>
          <h1 className="font-headline tracking-tight font-bold text-lg text-on-surface truncate">Item Analysis</h1>
        </div>
      </header>

      <main className="w-full relative pb-28 px-4 md:pt-12 md:pb-12 md:px-8 md:ml-64 max-w-screen-2xl mx-auto">
        
        {/* Breadcrumbs & Identity */}
        <section className="space-y-4 pt-6 md:pt-0">
          <nav className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-on-surface/40">
            <button onClick={() => router.back()} className="hover:text-primary transition-colors cursor-pointer">Item Database</button>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface/80">{data.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row justify-between md:items-end border-l-4 border-primary pl-4 md:pl-6 gap-4">
            <div>
              <span className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none block">{data.name}</span>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-3">
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-sm">{data.category}</span>
                <span className="px-2 py-0.5 bg-error-container/20 text-error text-[10px] font-bold uppercase tracking-widest rounded-sm">{data.rarity}</span>
                {data.is_stattrak && <span className="px-2 py-0.5 bg-outline-variant/10 text-outline text-[10px] font-bold uppercase tracking-widest rounded-sm">StatTrak™</span>}
                <span className="text-[10px] font-mono text-on-surface/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">fingerprint</span> {data.id}
                </span>
              </div>
            </div>
            <div className="md:text-right">
              <span className="block text-on-surface/40 text-[10px] font-mono uppercase tracking-widest">Global Floor Price</span>
              <span className="text-3xl font-headline font-bold text-primary tracking-tight">{data.global_floor_price.toFixed(2)} <span className="text-sm font-light">PLN</span></span>
            </div>
          </div>
        </section>

        {/* Hero Image & Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-3 bg-surface-container-high p-4 md:p-8 rounded-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <div>
                <h3 className="font-headline font-bold text-lg uppercase tracking-tight">Price Propagation Analysis</h3>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded md:hidden mt-2 inline-block">LIVE_FEED</span>
              </div>
            </div>
            {/* Wykres SVG (mockup) */}
            <div className="h-[250px] md:h-[400px] w-full relative group">
              <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(162,201,255,0.2)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 0 60 Q 10 55, 20 65 T 40 50 T 60 70 T 80 40 T 100 45" fill="none" stroke="#a2c9ff" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                <path d="M 0 60 Q 10 55, 20 65 T 40 50 T 60 70 T 80 40 T 100 45 V 100 H 0 Z" fill="#a2c9ff" opacity="0.1" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-surface-container p-6 rounded-lg">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface/40 mb-4">Item Visual Audit</h4>
              <div className="relative aspect-video rounded-md overflow-hidden bg-surface-container-lowest border border-outline-variant/10 group">
                <img src={data.image_url} alt={data.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <ItemMetricsGrid metrics={data.metrics} />
        <ItemInsightsSection insights={data.insights} />

      </main>
    </div>
  );
}