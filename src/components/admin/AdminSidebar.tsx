import {
  Users,
  BookOpen,
  TrendingUp,
  BarChart2,
  Radio,
  History,
  Settings,
  ShieldAlert,
  Activity,
  X,
  Lock,
} from "lucide-react";
import type { Tab } from "./types";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: Tab | "analytics" | "risk";
  setActiveTab: (tab: Tab | "analytics" | "risk") => void;
  setStudentPage: (page: number) => void;
  handleLogout: () => void;
}

export function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  setStudentPage,
  handleLogout,
}: AdminSidebarProps) {
  const navGroups = [
    {
      title: "COMMAND CENTER",
      items: [
        { id: "overview", label: "Overview", icon: BarChart2 },
        { id: "live", label: "Live Room", icon: Radio },
        { id: "students", label: "Candidates", icon: Users },
      ],
    },
    {
      title: "ASSESSMENT",
      items: [
        { id: "questions", label: "Round 1", icon: BookOpen },
        { id: "mcq", label: "Round 2", icon: BookOpen },
        { id: "analytics", label: "Analytics", icon: Activity },
      ],
    },
    {
      title: "SECURITY",
      items: [
        { id: "risk", label: "Risk Center", icon: ShieldAlert },
        { id: "audit", label: "Audit Logs", icon: History },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { id: "leaderboard", label: "Standings", icon: TrendingUp },
        { id: "settings", label: "System Rules", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-slate-950 flex flex-col justify-between border-r border-slate-800 shrink-0 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                <img src="/src/assets/images.png" alt="NXP" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-black text-sm tracking-tight leading-none">
                  NEXUSPRO
                </h1>
                <span className="text-[10px] font-mono text-black uppercase tracking-widest mt-0.5">
                  Operations
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded hover:bg-slate-800 text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 py-6 px-4 space-y-6">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-[10px] font-bold text-black tracking-widest uppercase px-2 mb-2">
                  {group.title}
                </h3>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setStudentPage(1);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-slate-800 text-black"
                          : "text-black hover:text-black hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 rounded text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
