import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#1c1b1b]/80 backdrop-blur-xl border-t border-white/5 md:hidden">
      <Link href="/" className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${isActive("/") ? "text-primary bg-primary/10 rounded-xl scale-110" : "text-outline hover:text-primary"}`}>
        <span className="material-symbols-outlined">radar</span>
        <span className="font-body text-[10px] uppercase tracking-widest mt-1 font-bold">Alerts</span>
      </Link>
      <Link href="/database" className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${isActive("/database") ? "text-primary bg-primary/10 rounded-xl scale-110" : "text-outline hover:text-primary"}`}>
        <span className="material-symbols-outlined">database</span>
        <span className="font-body text-[10px] uppercase tracking-widest mt-1 font-bold">Data</span>
      </Link>
      <Link href="/engine" className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${isActive("/engine") ? "text-primary bg-primary/10 rounded-xl scale-110" : "text-outline hover:text-primary"}`}>
        <span className="material-symbols-outlined">terminal</span>
        <span className="font-body text-[10px] uppercase tracking-widest mt-1 font-bold">Engine</span>
      </Link>
    </nav>
  );
}