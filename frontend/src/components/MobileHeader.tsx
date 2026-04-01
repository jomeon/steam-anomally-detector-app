export default function MobileHeader() {
  return (
    <header className="bg-[#0e0e0e] border-b border-white/5 fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 h-16 md:hidden">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">monitoring</span>
        <h1 className="font-headline tracking-tighter font-bold text-xl text-primary">SteamQuant</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-outline">account_circle</span>
      </div>
    </header>
  );
}