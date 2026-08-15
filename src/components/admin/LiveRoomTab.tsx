import { DBStudent } from "@/lib/db";
import { Clock, ShieldAlert, Zap, Radio } from "lucide-react";

type LiveRoomTabProps = {
  students: DBStudent[];
  handleToggleLock: (id: string, lock: boolean) => Promise<void>;
};

export function LiveRoomTab({ students, handleToggleLock }: LiveRoomTabProps) {
  const activeStudents = [...students]
    .filter(s => s.status === "Active" || s.status === "Completed")
    .sort((a, b) => new Date(b.lastActiveTime).getTime() - new Date(a.lastActiveTime).getTime());

  return (
    <div className="flex flex-col gap-8 w-full h-full animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="flex flex-col mb-4">
        <h2 className="text-display leading-tight">Live Sessions</h2>
        <h3 className="text-h3 text-black">Real-time candidate monitoring</h3>
      </div>

      <div className="glass-panel rounded-3xl p-6 flex flex-col flex-1 min-h-0 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-label text-black">Operations Feed</h3>
          <span className="status-emerald flex items-center gap-1.5 px-3 py-1 text-xs">
            <Radio className="w-3 h-3 animate-pulse" /> {activeStudents.length} Active
          </span>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide relative z-10">
          <table className="w-full text-left whitespace-nowrap border-separate border-spacing-y-2">
            <thead>
              <tr className="text-label text-black">
                <th className="px-4 pb-3">Candidate</th>
                <th className="px-4 pb-3 text-center">Round</th>
                <th className="px-4 pb-3 text-right">Score</th>
                <th className="px-4 pb-3">Status</th>
                <th className="px-4 pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-black text-sm">
                    No active sessions to monitor.
                  </td>
                </tr>
              ) : (
                activeStudents.map((s, i) => (
                  <tr key={i} className="group hover:-translate-y-0.5 transition-transform duration-200">
                    <td className="px-4 py-3 rounded-l-2xl glass-panel-inner transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-small shrink-0">
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-body font-medium">{s.name}</span>
                          <span className="text-small font-mono tracking-widest uppercase">{s.email.split('@')[0]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 glass-panel-inner border-l-0 text-center transition-colors">
                      <span className="text-body font-mono text-black">0{s.levelsCompleted + 1}</span>
                    </td>
                    <td className="px-4 py-3 glass-panel-inner border-l-0 text-right transition-colors">
                      <span className="text-body font-mono text-[#6D5DFB] font-bold">{s.score}</span>
                    </td>
                    <td className="px-4 py-3 glass-panel-inner border-l-0 transition-colors">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`status-${s.status === "Active" ? "emerald" : s.status === "Completed" ? "indigo" : "amber"}`}>
                          {s.locked ? "LOCKED" : s.status}
                        </span>
                        <span className="text-small flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {getTimeAgo(s.lastActiveTime)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 rounded-r-2xl glass-panel-inner border-l-0 text-right transition-colors">
                       <button
                          onClick={() => handleToggleLock(s.email, !s.locked)}
                          className={s.locked ? "btn-secondary text-rose-500 hover:text-rose-600 py-1" : "btn-secondary py-1"}
                        >
                          {s.locked ? "Unlock" : "Lock Node"}
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    </div>
  );
}

function getTimeAgo(dateString: string) {
  if (!dateString) return "Never";
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
