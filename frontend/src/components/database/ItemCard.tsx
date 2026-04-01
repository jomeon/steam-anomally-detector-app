import Link from "next/link";
import { DatabaseItem } from "@/types";

interface Props {
  item: DatabaseItem;
}

export default function ItemCard({ item }: Props) {
  const isPositive = item.delta_24h > 0;
  const isNeutral = item.delta_24h === 0;
  
  const colorClass = isPositive ? "text-primary" : isNeutral ? "text-on-surface" : "text-tertiary";
  const bgProgressClass = isPositive ? "bg-primary" : isNeutral ? "bg-neutral-600" : "bg-tertiary";

  return (
    <>
      {/* WERSJA DESKTOP (Ukryta na mobile) */}
      <Link href={`/database/${item.id}`} className="hidden md:flex bg-surface-container-high group hover:bg-surface-variant transition-colors duration-300 rounded overflow-hidden flex-col cursor-pointer">
        <div className="h-48 relative overflow-hidden bg-surface-container flex items-center justify-center p-8">
          <img src={item.image_url || "/api/placeholder/400/300"} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 left-4 bg-secondary-container px-2 py-1 rounded-sm">
            <span className="text-[9px] font-mono font-bold text-on-secondary-container tracking-wider uppercase">{item.category}</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-base font-headline font-bold text-on-surface">{item.name}</h3>
            <p className="text-[10px] text-neutral-500 font-mono">ID: {item.id}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Index Price</span>
              <span className="text-sm font-headline font-medium">{item.price.toFixed(2)} PLN</span>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">24h Delta</span>
              <span className={`text-sm font-headline font-medium ${colorClass}`}>
                {item.delta_24h > 0 ? "+" : ""}{item.delta_24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-widest text-neutral-500">Quant-Score</span>
              <span className={`text-xs font-mono font-bold ${colorClass}`}>{item.quant_score.toFixed(1)}</span>
            </div>
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div className={`h-full ${bgProgressClass}`} style={{ width: `${item.quant_score}%` }}></div>
            </div>
          </div>
        </div>
      </Link>

      {/* WERSJA MOBILE (Ukryta na PC) */}
      <Link href={`/database/${item.id}`} className="md:hidden bg-surface-container-high rounded-xl overflow-hidden group active:bg-surface-container-highest transition-colors cursor-pointer">
        <div className="p-4 flex gap-4">
          <div className="w-20 h-20 bg-surface-container-low rounded flex items-center justify-center relative overflow-hidden shrink-0">
            <img src={item.image_url || "/api/placeholder/100/100"} alt={item.name} className="object-cover w-full h-full mix-blend-screen opacity-80" />
            <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md px-1 rounded">
              <span className={`font-mono text-[8px] ${colorClass}`}>{item.condition}</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-between py-0.5">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-headline font-bold text-sm tracking-tight text-on-surface truncate pr-2">{item.name}</h3>
                <span className="font-mono text-[9px] text-outline shrink-0">{item.id.split('-')[1]}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] bg-secondary-container/30 text-on-secondary-container px-1.5 py-0.5 rounded-sm uppercase tracking-tighter truncate max-w-[80px]">{item.rarity}</span>
                {item.is_stattrak && <span className="text-[9px] bg-outline-variant/10 text-outline px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">StatTrak™</span>}
              </div>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold text-primary tracking-tighter">${item.price.toFixed(2)}</span>
                <span className={`font-mono text-[10px] ${colorClass}`}>{item.delta_24h > 0 ? "+" : ""}{item.delta_24h.toFixed(2)}% (24h)</span>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="font-mono text-[10px] text-outline">QS: {item.quant_score.toFixed(1)}</span>
                <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div className={`h-full ${bgProgressClass}`} style={{ width: `${item.quant_score}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}