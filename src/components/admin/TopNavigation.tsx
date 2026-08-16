import { Search, User, LogOut } from "lucide-react";
import { Tab } from "./types";

type TopNavigationProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  setCommandPaletteOpen: (val: boolean) => void;
  systemMode: "normal" | "workshop" | "maintenance";
  handleLogout: () => void;
  children?: React.ReactNode;
};

export function TopNavigation({
  activeTab,
  setActiveTab,
  setCommandPaletteOpen,
  systemMode,
  handleLogout,
  children,
}: TopNavigationProps) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "live", label: "Live Room" },
    { id: "students", label: "Candidates" },
    { id: "analytics", label: "Analytics" },
    { id: "selection", label: "Selection" },
    { id: "questions", label: "Round 01" },
    { id: "mcq", label: "Round 02" },
    { id: "risk", label: "Risk" },
    { id: "audit", label: "Audit" },
    { id: "settings", label: "System" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full gap-8">
      {/* Sidebar (Desktop) / Topbar (Mobile) */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full md:w-64 bg-[#1E1E1E] md:min-h-[92vh] p-6 rounded-[2rem] shadow-xl shrink-0 z-20">
        
        {/* Branding */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 mb-0 md:mb-12">
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-[14px] bg-white/10 text-white font-bold tracking-widest leading-none">
            NXP
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-h2 text-white leading-none mb-1">Assessment</h1>
            <h2 className="text-label text-white/60">Control Center</h2>
          </div>
        </div>

        {/* Vertical Navigation */}
        <div className="hidden md:flex flex-col w-full gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-md scale-105"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown (Placeholder) */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={handleLogout} className="text-white/70">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Bottom Controls (Desktop) */}
        <div className="hidden md:flex flex-col w-full mt-auto gap-4 pt-8">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Top Bar for Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between w-full mb-8">
          
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-600 transition-all text-sm font-medium shadow-sm w-full max-w-md"
          >
            <Search className="w-4 h-4" />
            <span className="inline">Search...</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-sm cursor-pointer">
            <div className="hidden sm:flex flex-col items-end pr-2">
              <span className="text-[12px] font-semibold text-slate-800 leading-tight">Dr. Admin</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${systemMode === "normal" ? "bg-emerald-400" : systemMode === "workshop" ? "bg-[#6D5DFB]" : "bg-rose-400"}`}></span>
                {systemMode}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        {children}
      </div>
    </div>
  );
}
