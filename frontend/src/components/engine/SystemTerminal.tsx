import { SystemLog } from "@/types";

interface Props {
  logs: SystemLog[];
}

export default function SystemTerminal({ logs }: Props) {
  return (
    <section className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10">
      <div className="bg-surface-container px-4 py-2 flex justify-between items-center">
        <span className="text-[10px] font-mono text-on-surface-variant tracking-widest uppercase flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span> Kernel Diagnostics
        </span>
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-error/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
        </span>
      </div>
      <div className="p-4 font-mono text-[11px] md:text-sm space-y-2 leading-relaxed h-48 md:h-80 overflow-y-auto no-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-4 ${log.type === "warning" ? "bg-tertiary/5 text-tertiary p-1 rounded" : log.type === "success" ? "text-primary" : "text-on-surface-variant opacity-70"}`}>
            <span className="shrink-0">[{log.time}]</span>
            <span>{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 text-primary mt-4">
          <span></span><span className="animate-pulse">_</span>
        </div>
      </div>
    </section>
  );
}