import { Menu, Search, Bell, Command, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AdminTopbarProps {
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  systemMode: "normal" | "workshop" | "maintenance";
  setCommandPaletteOpen: (open: boolean) => void;
}

export function AdminTopbar({
  setSidebarOpen,
  activeTab,
  systemMode,
  setCommandPaletteOpen,
}: AdminTopbarProps) {
  const getModeBadge = () => {
    switch (systemMode) {
      case "normal":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">NORMAL MODE</span>;
      case "workshop":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">WORKSHOP MODE</span>;
      case "maintenance":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">MAINTENANCE MODE</span>;
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-slate-950 border-b border-slate-800">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded hover:bg-slate-800 text-black transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <h2 className="text-lg font-bold text-black capitalize tracking-tight leading-none">
            {activeTab.replace(/([A-Z])/g, " $1").trim()}
          </h2>
          {getModeBadge()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-black hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span className="text-xs font-medium">Search...</span>
          <div className="flex items-center gap-1 ml-4 px-1.5 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-black">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <button className="p-2 text-black hover:text-black transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>
          
          <ThemeToggle />

          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-bold text-black text-xs border border-slate-700">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-black leading-none">Administrator</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-medium text-black uppercase tracking-wider">System Node</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
