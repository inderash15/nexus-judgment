import { useMemo } from "react";
import { motion } from "framer-motion";
import { DBStudent } from "@/lib/db";
import { Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LeaderboardModal({
  data,
  currentEmail,
  onClose,
}: {
  data: DBStudent[];
  currentEmail?: string;
  onClose: () => void;
}) {
  const sorted = useMemo(() => {
    return [...data].sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
  }, [data]);

  const top3 = sorted.slice(0, 3);
  const top10 = sorted.slice(3, 10);
  const rest = sorted.slice(10);

  const stats = useMemo(() => {
    const userIdx = sorted.findIndex((s) => s.email === currentEmail);
    const userRank = userIdx !== -1 ? userIdx + 1 : null;
    const highest = sorted.length > 0 ? sorted[0].score : 0;
    return {
      total: sorted.length,
      userRank,
      highest,
    };
  }, [sorted, currentEmail]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-950 border border-emerald-500/20 rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col font-mono text-xs shadow-2xl shadow-emerald-500/5"
      >
        <div className="p-4 border-b border-emerald-500/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4.5 w-4.5 text-emerald-400" />
            <span className="font-bold text-emerald-200 uppercase tracking-widest">
              Global Standings
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:text-emerald-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Global summary chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-emerald-500/10 bg-black/40 text-center py-3 text-[10px] text-emerald-400/70">
          <div>
            TOTAL PARTICIPANTS: <span className="text-emerald-100 font-bold">{stats.total}</span>
          </div>
          <div>
            YOUR RANK:{" "}
            <span className="text-emerald-100 font-bold">
              {stats.userRank ? `#${stats.userRank}` : "N/A"}
            </span>
          </div>
          <div>
            HIGHEST SCORE: <span className="text-emerald-100 font-bold">{stats.highest} XP</span>
          </div>
        </div>

        <div className="flex-1 pr-4 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Top 3 podium cards */}
            {top3.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {top3.map((student, idx) => {
                  const colors = [
                    "border-amber-400/50 bg-amber-500/5 text-amber-300",
                    "border-slate-300/40 bg-slate-400/5 text-slate-300",
                    "border-amber-700/40 bg-amber-800/5 text-amber-600",
                  ];
                  return (
                    <div
                      key={`${student.email}-${idx}`}
                      className={`border rounded-xl p-3 text-center flex flex-col items-center justify-between ${colors[idx] || ""}`}
                    >
                      {idx === 0 && <span className="text-lg">👑</span>}
                      <div className="font-bold text-[10px] uppercase tracking-wider mt-1 mb-2 max-w-full truncate">
                        {student.name}
                      </div>
                      <div className="text-xs font-black">{student.score} XP</div>
                      <div className="text-[8px] opacity-60 mt-1">{student.department}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Top 10 cards */}
            {top10.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5">
                  Top Contenders
                </div>
                {top10.map((student, idx) => (
                  <div
                    key={`${student.email}-${idx}`}
                    className="bg-black/50 border border-emerald-500/10 rounded-xl px-4 py-2.5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-400">#{idx + 4}</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-emerald-100">{student.name}</span>
                        <span className="text-[9px] text-emerald-500/60">{student.department}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-200">{student.score} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Remaining ranks */}
            {rest.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5">
                  Global Rankings
                </div>
                {rest.map((student, idx) => (
                  <div
                    key={`${student.email}-${idx}`}
                    className="bg-black/30 border border-emerald-500/5 rounded-lg px-4 py-2 flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400/50 font-bold">#{idx + 11}</span>
                      <span className="text-emerald-300/80">{student.name}</span>
                    </div>
                    <span className="text-emerald-400/70">{student.score} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
