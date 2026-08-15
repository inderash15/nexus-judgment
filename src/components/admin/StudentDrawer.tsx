import { X, Lock, Unlock, ShieldAlert, Activity, Award, User, Target } from "lucide-react";
import { DBStudent } from "@/lib/db";
import { DataState } from "./types";
import { useMemo } from "react";

type StudentDrawerProps = {
  selectedStudent: DBStudent;
  setSelectedStudent: (val: DBStudent | null) => void;
  data: DataState;
  handleToggleLock: (id: string, lock: boolean) => Promise<void>;
};

export function StudentDrawer({ selectedStudent, setSelectedStudent, data, handleToggleLock }: StudentDrawerProps) {
  const studentLogs = useMemo(() => {
    return [...data.securityLogs]
      .filter((l) => l.email === selectedStudent.email)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [data.securityLogs, selectedStudent.email]);

  const hasAlerts = studentLogs.some((l) => l.status === "suspicious" || l.status === "failed");

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 animate-in fade-in"
        onClick={() => setSelectedStudent(null)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white/80 backdrop-blur-[32px] border-l border-white/50 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right-full duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] glass-panel-inner flex items-center justify-center text-black font-bold text-lg shadow-sm border border-white/40">
              {selectedStudent.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <h2 className="text-h2 leading-none">{selectedStudent.name}</h2>
              <span className="text-small font-mono tracking-widest uppercase">NXP-{selectedStudent.email.substring(0, 6)}</span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedStudent(null)}
            className="btn-icon"
          >
            <X className="w-4 h-4 text-black" />
          </button>
        </div>

        <div className="px-8 pb-8 border-b border-black/[0.03] flex items-center gap-2">
          <StatusBadge status={selectedStudent.status} locked={selectedStudent.locked} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          
          {/* Performance Overview */}
          <div className="flex flex-col gap-4">
            <h3 className="text-label flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Performance
            </h3>
            <div className="flex items-center justify-between p-5 rounded-3xl glass-panel-inner">
              <div className="flex flex-col">
                <span className="text-metric leading-none">{selectedStudent.score}</span>
                <span className="text-label mt-2">Overall Score</span>
              </div>
              <Award className="w-8 h-8 text-[#6D5DFB]/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl glass-panel-inner flex flex-col justify-between h-24 relative overflow-hidden">
                 <span className="text-[10px] tracking-widest text-black uppercase relative z-10">Round 01</span>
                 <span className="text-2xl font-mono text-black relative z-10">{selectedStudent.round1Completed ? "Pass" : "—"}</span>
                 {selectedStudent.round1Completed && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/20" />}
               </div>
               <div className="p-4 rounded-2xl glass-panel-inner flex flex-col justify-between h-24 relative overflow-hidden">
                 <span className="text-[10px] tracking-widest text-black uppercase relative z-10">Round 02</span>
                 <span className="text-2xl font-mono text-black relative z-10">{selectedStudent.status === "Completed" || selectedStudent.status === "Qualified" ? "Pass" : "—"}</span>
                 {(selectedStudent.status === "Completed" || selectedStudent.status === "Qualified") && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6D5DFB]/20" />}
               </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="flex flex-col gap-4">
             <h3 className="text-label flex items-center gap-2">
              <Target className="w-3.5 h-3.5" /> Activity
            </h3>
            <div className="p-5 rounded-3xl glass-panel-inner flex flex-col gap-4 relative">
              <div className="absolute left-[31px] top-[30px] bottom-[30px] w-px bg-slate-200" />
              {/* Mocking timeline visually for the effect */}
              <TimelineItem time="14:57" title="MCQ submitted" active />
              <TimelineItem time="14:42" title="Round 02 started" />
              <TimelineItem time="14:38" title="Puzzle completed" />
              <TimelineItem time="14:31" title="Started Round 01" />
            </div>
          </div>

          {/* Security */}
          <div className="flex flex-col gap-4">
             <h3 className="text-[10px] font-medium tracking-widest text-black uppercase flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" /> Security
            </h3>
            
            <div className={`p-5 rounded-2xl border ${hasAlerts ? 'bg-rose-500/5 border-rose-500/10' : 'glass-panel-inner'}`}>
              <div className="flex items-center gap-3 mb-4">
                 <span className={`w-2.5 h-2.5 rounded-full ${hasAlerts ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]'}`} />
                 <span className="text-xs font-semibold text-black uppercase tracking-wide">
                   {hasAlerts ? 'Suspicious Activity Detected' : 'No Suspicious Activity'}
                 </span>
              </div>
              
              {hasAlerts && (
                <div className="flex flex-col gap-3 mt-4 border-t border-black/[0.04] pt-4">
                  {studentLogs.slice(0, 3).map((l, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs text-rose-400">{l.action}</span>
                        <span className="text-[10px] text-black font-mono mt-0.5">{new Date(l.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-8 pt-4 border-t border-black/[0.03] flex items-center gap-4">
          <button
            onClick={() => handleToggleLock(selectedStudent.email, !selectedStudent.locked)}
            className={`flex-1 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              selectedStudent.locked 
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30" 
                : "bg-black/[0.02] text-black border border-black/[0.06] hover:bg-black/[0.04]"
            }`}
          >
            {selectedStudent.locked ? (
              <><Unlock className="w-3.5 h-3.5" /> Unlock Candidate</>
            ) : (
              <><Lock className="w-3.5 h-3.5" /> Lock Candidate</>
            )}
          </button>
        </div>

      </div>
    </>
  );
}

function TimelineItem({ time, title, active }: { time: string, title: string, active?: boolean }) {
  return (
    <div className="flex items-start gap-4 relative z-10">
      <div className="w-10 text-right shrink-0 pt-0.5">
        <span className="text-[10px] font-mono text-black">{time}</span>
      </div>
      <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${active ? 'bg-[#6D5DFB] shadow-[0_0_8px_rgba(109,93,251,0.5)]' : 'bg-black/[0.06]'}`} />
      <div className="flex flex-col pb-2">
        <span className={`text-xs ${active ? 'text-black font-medium' : 'text-black'}`}>{title}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status, locked }: { status: string, locked?: boolean }) {
  if (locked) return <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400"></span>LOCKED</span>;
  
  const config: Record<string, string> = {
    Active: "text-emerald-400",
    Qualified: "text-[#6D5DFB]",
    Completed: "text-blue-400",
    Eliminated: "text-amber-400",
    Disqualified: "text-rose-400",
  };

  const bgConfig: Record<string, string> = {
    Active: "bg-emerald-400",
    Qualified: "bg-[#6D5DFB]",
    Completed: "bg-blue-400",
    Eliminated: "bg-amber-400",
    Disqualified: "bg-rose-400",
  };

  const color = config[status] || "text-black";
  const bg = bgConfig[status] || "bg-white/40";

  return (
    <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${color}`}>
      <span className={`w-2 h-2 rounded-full ${bg} shadow-[0_0_8px_currentColor]`}></span>
      {status}
    </span>
  );
}
