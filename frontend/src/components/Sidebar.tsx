import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Funkcja pomocnicza do sprawdzania, czy link jest aktywny
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#1c1b1b] border-r border-white/5 flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold tracking-tighter text-neutral-100 font-headline">
          SteamQuant <span className="block text-sm font-medium tracking-tight text-neutral-500">Analytics</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded transition-colors duration-200 font-headline tracking-tight text-sm ${isActive("/") ? "text-primary font-bold border-r-2 border-primary bg-primary/5" : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}`}>
          <span className="material-symbols-outlined">sensors</span>
          Anomaly Feed
        </Link>
        <Link href="/database" className={`flex items-center gap-3 px-4 py-3 rounded transition-colors duration-200 font-headline tracking-tight text-sm ${isActive("/database") ? "text-primary font-bold border-r-2 border-primary bg-primary/5" : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}`}>
          <span className="material-symbols-outlined">database</span>
          Item Database
        </Link>
        <Link href="/engine" className={`flex items-center gap-3 px-4 py-3 rounded transition-colors duration-200 font-headline tracking-tight text-sm ${isActive("/engine") ? "text-primary font-bold border-r-2 border-primary bg-primary/5" : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}`}>
          <span className="material-symbols-outlined">settings_input_component</span>
          Engine Status
        </Link>
      </nav>
      <div className="mt-auto px-4 opacity-40">
        <div className="text-[10px] font-mono uppercase tracking-widest text-outline">Instance_ID: SQ-8842</div>
      </div>
    </aside>
  );
}