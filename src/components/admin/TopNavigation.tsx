import { Search, User, LogOut } from "lucide-react";
import { Tab } from "./types";

type TopNavigationProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  setCommandPaletteOpen: (val: boolean) => void;
  systemMode: "normal" | "workshop" | "maintenance";
  handleLogout: () => void;
};

export function TopNavigation({
  activeTab,
  setActiveTab,
  setCommandPaletteOpen,
  systemMode,
  handleLogout,
}: TopNavigationProps) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "live", label: "Live Room" },
    { id: "students", label: "Candidates" },
    { id: "analytics", label: "Analytics" },
    { id: "questions", label: "Round 01" },
    { id: "mcq", label: "Round 02" },
    { id: "risk", label: "Risk" },
    { id: "audit", label: "Audit" },
    { id: "settings", label: "System" },
  ];

  return (
    <div className="flex items-center justify-between w-full mb-8 pt-2">
      {/* NexusPro Branding */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-[14px] bg-white/[0.25] border border-white/30 shadow-inner backdrop-blur-md">
          <span className="text-[12px] font-bold text-black tracking-widest leading-none">NXP</span>
        </div>
        <div className="hidden md:flex flex-col">
          <h1 className="text-h2 leading-none mb-1">Assessment</h1>
          <h2 className="text-label text-black">Control Center</h2>
        </div>
      </div>

      {/* Pill Navigation */}
      <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white text-black shadow-md scale-105"
                : "text-black hover:text-black hover:bg-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 text-black hover:text-black transition-all text-[13px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search...</span>
          <span className="hidden sm:inline opacity-50 ml-2 font-mono text-[10px]">⌘K</span>
        </button>

        <div className="flex items-center gap-3 px-2 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] group relative cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-black shadow-sm border border-white/50">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col pr-3">
            <span className="text-[12px] font-semibold text-black leading-tight">Admin</span>
            <span className="text-[9px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${systemMode === "normal" ? "bg-emerald-400" : systemMode === "workshop" ? "bg-[#6D5DFB]" : "bg-rose-400"}`}></span>
              {systemMode}
            </span>
          </div>

          {/* Hover Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl bg-[#0C0C0C]/90 backdrop-blur-xl border border-black/[0.06]/[0.05] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right scale-95 group-hover:scale-100">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left flex items-center gap-3 text-xs font-medium text-rose-400 hover:bg-black/[0.02] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
