import { Activity, Radio, AlertCircle } from "lucide-react";
import { Metrics, DataState, Tab } from "./types";
import { useMemo } from "react";
import { getCandidateScore } from "@/lib/utils";

type OverviewTabProps = {
  metrics: Metrics;
  data: DataState;
  setActiveTab: (tab: Tab) => void;
  questionsCount: number;
};

export function OverviewTab({ metrics, data, setActiveTab }: OverviewTabProps) {
  const securityAlerts = useMemo(() => {
    return data.securityLogs.filter(log => log.status === "suspicious" || log.status === "failed").length;
  }, [data.securityLogs]);

  const liveFeed = useMemo(() => {
    return [...data.students]
      .filter(s => s.status === "Active" || s.status === "Eliminated" || s.status === "Completed")
      .sort((a, b) => new Date(b.lastActiveTime).getTime() - new Date(a.lastActiveTime).getTime())
      .slice(0, 6);
  }, [data.students]);

  const distributionBins = useMemo(() => {
    const bins = Array(10).fill(0);
    if (data.students.length === 0) return Array(10).fill(0);
    data.students.forEach(s => {
      const p = Math.min(100, Math.max(0, getCandidateScore(s)));
      const binIdx = Math.min(9, Math.floor(p / 10));
      bins[binIdx]++;
    });
    const maxCount = Math.max(...bins, 1);
    return bins.map(count => (count / maxCount) * 100);
  }, [data.students]);

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
      
      {/* Top Header & Horizontal Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-black leading-tight">Assessment</h2>
          <h2 className="text-3xl font-light tracking-tight text-black leading-none">Control Center</h2>
        </div>

        <div className="flex items-center gap-12 px-8 py-4 glass-panel rounded-full w-max">
          <Metric label="REGISTERED" value={metrics.totalReg} />
          <div className="w-px h-8 bg-black/[0.04]" />
          <Metric label="ACTIVE" value={metrics.active} status="●" statusColor="text-emerald-400" />
          <div className="w-px h-8 bg-black/[0.04]" />
          <Metric label="QUALIFIED" value={metrics.qualified} />
          <div className="w-px h-8 bg-black/[0.04]" />
          <Metric label="AVG SCORE" value={`${metrics.avgScore}`} />
        </div>
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Panel */}
        <div className="lg:col-span-2 pastel-blue rounded-[2rem] p-6 relative overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <h3 className="text-sm font-medium tracking-widest text-black uppercase">System Performance</h3>
            <button onClick={() => setActiveTab("analytics")} className="w-8 h-8 rounded-full bg-black/[0.02] flex items-center justify-center hover:bg-black/[0.04] transition-colors">
              <Activity className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 relative z-10 h-full">
            {distributionBins.map((h, i) => (
              <div key={i} className="w-full bg-white/[0.03] rounded-t-sm relative group overflow-hidden h-full flex items-end">
                <div className="w-full bg-[#6D5DFB]/20 transition-all duration-700 ease-out relative" style={{ height: `${Math.max(1, h)}%` }}>
                  <div className="absolute top-0 w-full h-px bg-[#6D5DFB]/60 shadow-[0_0_8px_rgba(109,93,251,0.8)]" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Live Sessions Panel */}
        <div className="pastel-pink rounded-[2rem] p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-medium tracking-widest text-black uppercase">Live Sessions</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {metrics.active} Active
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide">
            {liveFeed.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl glass-panel-inner hover:bg-black/[0.03] transition-colors cursor-pointer" onClick={() => setActiveTab("live")}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black/[0.02] flex items-center justify-center text-[10px] font-medium text-black">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-black uppercase tracking-wide">{s.name}</span>
                    <span className="text-[10px] text-black font-mono tracking-widest">ROUND 0{s.levelsCompleted + 1}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-mono text-black">{getCandidateScore(s)}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 ${s.status === "Active" ? "text-emerald-400" : s.status === "Completed" ? "text-[#6D5DFB]" : "text-amber-400"}`}>
                    <span className={`w-1 h-1 rounded-full ${s.status === "Active" ? "bg-emerald-400" : s.status === "Completed" ? "bg-[#6D5DFB]" : "bg-amber-400"}`}></span>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Horizontal Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selection Funnel Snapshot */}
        <div className="pastel-green rounded-[2rem] p-6 flex flex-col justify-between">
          <h3 className="text-sm font-medium tracking-widest text-black uppercase mb-4">Selection</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-black uppercase tracking-wider">Registered</span>
              <span className="font-mono text-black">{metrics.totalReg}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-black uppercase tracking-wider">Qualified</span>
              <span className="font-mono text-[#6D5DFB]">{metrics.qualified}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-black uppercase tracking-wider">Selection Rate</span>
              <span className="font-mono text-emerald-300">{metrics.successRate}%</span>
            </div>
          </div>
        </div>

        {/* Security Module */}
        <div className="pastel-yellow rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <h3 className="text-label text-slate-700">Total Registered</h3>
            <div className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center relative">
              {securityAlerts > 0 ? (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex flex-col">
              <span className={`text-2xl font-mono leading-none ${securityAlerts > 0 ? "text-rose-400" : "text-emerald-400"}`}>{securityAlerts}</span>
              <span className="text-[10px] text-black uppercase tracking-widest mt-1">Active Alerts</span>
            </div>
          </div>
        </div>

        {/* System Rules Shortcut */}
        <div className="glass-panel rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:bg-black/[0.03] transition-colors" onClick={() => setActiveTab("settings")}>
           <div className="flex flex-col">
             <h3 className="text-sm font-medium tracking-widest text-black uppercase mb-1">System Mode</h3>
             <span className="text-[10px] text-black uppercase tracking-widest">Normal Operations</span>
           </div>
           <div className="w-10 h-10 rounded-full bg-[#6D5DFB] flex items-center justify-center shadow-lg">
             <Radio className="w-4 h-4 text-black" />
           </div>
        </div>

      </div>

    </div>
  );
}

function Metric({ label, value, status, statusColor }: { label: string, value: string | number, status?: string, statusColor?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-medium tracking-[0.2em] text-black uppercase mb-1 flex items-center gap-1.5">
        {status && <span className={statusColor}>{status}</span>}
        {label}
      </span>
      <span className="text-2xl font-mono font-light tracking-tight text-black leading-none">
        {value}
      </span>
    </div>
  );
}
