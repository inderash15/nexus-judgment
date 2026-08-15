import { ShieldAlert, AlertTriangle, Lock } from "lucide-react";
import { DBStudent } from "@/lib/db";
import { useMemo } from "react";

type RiskCenterTabProps = {
  securityLogs: any[];
  students: DBStudent[];
  handleToggleLock: (id: string, lock: boolean) => Promise<void>;
};

export function RiskCenterTab({ securityLogs, students, handleToggleLock }: RiskCenterTabProps) {
  const { alerts, lockedStudents } = useMemo(() => {
    const alerts = securityLogs
      .filter((l) => l.status === "suspicious" || l.status === "failed")
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const lockedStudents = students.filter((s) => s.locked);
    return { alerts, lockedStudents };
  }, [securityLogs, students]);

  const highRisk = alerts.filter(a => a.status === "suspicious").length;
  const mediumRisk = alerts.filter(a => a.status === "failed").length;

  return (
    <div className="flex flex-col gap-8 w-full h-full animate-in fade-in duration-500">
      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex flex-col mb-2">
          <h2 className="text-3xl font-light tracking-tight text-black leading-tight">Risk</h2>
          <h2 className="text-3xl font-light tracking-tight text-black leading-none">Center</h2>
        </div>

        <div className="flex items-center gap-12 px-8 py-4 glass-panel rounded-full w-max">
          <Metric label="HIGH RISK" value={highRisk} status="●" statusColor="text-rose-400" valueColor="text-rose-400" />
          <div className="w-px h-8 bg-black/[0.04]" />
          <Metric label="MEDIUM" value={mediumRisk} statusColor="text-amber-400" valueColor="text-amber-400" />
          <div className="w-px h-8 bg-black/[0.04]" />
          <Metric label="LOCKED" value={lockedStudents.length} valueColor="text-black" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Active Threats Panel */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h3 className="text-sm font-medium tracking-widest text-black uppercase">Active Alerts</h3>
            {alerts.length > 0 && <span className="flex items-center justify-center w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse" />}
          </div>
          
          <div className="flex-1 overflow-auto scrollbar-hide relative z-10 flex flex-col gap-3 pr-2">
            {alerts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-black text-sm">
                No active threats detected.
              </div>
            ) : (
              alerts.map((alert, i) => {
                const student = students.find((s) => s.email === alert.email);
                const isHigh = alert.status === "suspicious";
                return (
                  <div key={i} className={`p-4 rounded-2xl border transition-colors flex items-start gap-4 ${isHigh ? 'bg-rose-500/5 border-rose-500/10 hover:bg-rose-500/10' : 'glass-panel-inner hover:bg-black/[0.03]'}`}>
                    <div className={`mt-1 w-2 h-2 rounded-full ${isHigh ? 'bg-rose-400' : 'bg-amber-400'}`} />
                    <div className="flex flex-col flex-1">
                      <span className="text-xs font-semibold text-black uppercase tracking-wide">{alert.action}</span>
                      <span className="text-[10px] text-black mt-1">{student?.name || 'Unknown'} (NXP-{alert.email?.substring(0, 4) || '??'})</span>
                    </div>
                    <span className="text-[10px] text-black font-mono tracking-widest">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
        </div>

        {/* Locked Nodes Panel */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col relative overflow-hidden">
          <h3 className="text-sm font-medium tracking-widest text-black uppercase mb-6">Restricted Nodes</h3>
          <div className="flex-1 overflow-auto scrollbar-hide relative z-10 flex flex-col gap-3 pr-2">
             {lockedStudents.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-black text-sm">
                No nodes are currently locked.
              </div>
            ) : (
              lockedStudents.map((s) => (
                <div key={s.email} className="p-4 rounded-2xl glass-panel-inner hover:bg-black/[0.03] transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-black uppercase tracking-wide">{s.name}</span>
                      <span className="text-[10px] text-black font-mono tracking-widest">NXP-{s.email.substring(0, 4)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleLock(s.email, false)}
                    className="px-4 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.06] text-black hover:bg-black/[0.04] transition-colors text-[10px] font-bold uppercase tracking-wider"
                  >
                    Unlock
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, status, statusColor, valueColor }: { label: string, value: string | number, status?: string, statusColor?: string, valueColor?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-medium tracking-[0.2em] text-black uppercase mb-1 flex items-center gap-1.5">
        {status && <span className={statusColor}>{status}</span>}
        {label}
      </span>
      <span className={`text-2xl font-mono font-light tracking-tight leading-none ${valueColor || 'text-black'}`}>
        {value}
      </span>
    </div>
  );
}
