import { useEffect, useState } from "react";
import { adminGetDashboardData } from "@/lib/server-fns";
import { DBStudent } from "@/lib/db";
import { Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function InlineLeaderboard({ currentEmail }: { currentEmail: string }) {
  const [leaderboard, setLeaderboard] = useState<DBStudent[]>([]);

  useEffect(() => {
    adminGetDashboardData()
      .then((res) => {
        setLeaderboard(res.students.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pt-2 space-y-3.5 font-mono text-xs w-full">
      <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold flex items-center justify-between border-b border-emerald-500/20 pb-2 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-emerald-400" />
          <span>Global Leadership Standings</span>
        </span>
        <span className="text-emerald-500/60 text-[9px] uppercase tracking-wider">Top 5</span>
      </div>
      <ScrollArea className="h-40 sm:h-48 pr-3">
        <div className="space-y-2">
          {leaderboard.length === 0 ? (
            <div className="text-[10px] text-emerald-500/40 italic py-2.5 text-center border border-dashed border-emerald-500/10 rounded-xl">
              Connecting to ledger matrix...
            </div>
          ) : (
            leaderboard.slice(0, 5).map((s, idx) => {
              const isUser = s.email === currentEmail;

              // Gold, Silver, Bronze badges for top 3
              const rankStyles =
                idx === 0
                  ? "border-[#FFD700]/30 text-yellow-300 bg-yellow-500/5 shadow-[0_0_12px_rgba(251,191,36,0.1)]"
                  : idx === 1
                    ? "border-[#C0C0C0]/30 text-slate-350 bg-slate-300/5 shadow-[0_0_12px_rgba(203,213,225,0.1)]"
                    : idx === 2
                      ? "border-[#CD7F32]/30 text-amber-600 bg-amber-800/5 shadow-[0_0_12px_rgba(180,83,9,0.1)]"
                      : isUser
                        ? "border-emerald-400/60 bg-emerald-500/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                        : "border-emerald-500/10 bg-black/40";

              const rankBadgeColor =
                idx === 0
                  ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
                  : idx === 1
                    ? "bg-slate-300/20 text-slate-300 border-slate-300/40"
                    : idx === 2
                      ? "bg-amber-700/20 text-amber-500 border-amber-800/40"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";

              return (
                <div
                  key={s.email}
                  className={`px-3 py-2.5 border rounded-xl flex items-center justify-between transition-all hover:scale-[1.01] hover:border-emerald-500/35 hover:bg-black/50 ${rankStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded border text-[9px] font-black flex items-center justify-center ${rankBadgeColor}`}
                    >
                      #{idx + 1}
                    </span>

                    {/* Initials Avatar */}
                    <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-black uppercase text-emerald-100">
                      {s.name.slice(0, 2)}
                    </div>

                    <div className="flex flex-col leading-tight">
                      <span
                        className={`text-[11px] ${isUser ? "text-emerald-300 font-bold" : "text-emerald-150"}`}
                      >
                        {s.name}
                      </span>
                      <span className="text-[8px] text-emerald-500/50 uppercase tracking-wide">
                        {s.department}
                      </span>
                    </div>
                  </div>

                  <span className="font-bold text-[11px] text-emerald-300">{s.score} XP</span>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
