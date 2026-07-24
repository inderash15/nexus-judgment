import { Users, BookOpen, Radio, UserCheck, ArrowUpRight } from "lucide-react";
import { Metrics, DataState, Tab } from "./types";

type OverviewTabProps = {
  metrics: Metrics;
  data: DataState;
  setActiveTab: (tab: Tab) => void;
  questionsCount: number;
};

export function OverviewTab({ metrics, data, setActiveTab, questionsCount }: OverviewTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column Layout */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Next scheduled session (Active Monitor Preview) */}
          <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 tracking-wider">
                ACTIVE INTENSIVE SESSION
              </span>
              <span className="text-[10px] font-extrabold text-teal-700 bg-teal-500/10 px-2 py-0.5 rounded-full">
                MONITORING
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-teal-700 animate-pulse" />
                <div>
                  <p className="text-xs font-extrabold text-slate-500">Live Active Room</p>
                  <p className="text-sm font-black text-slate-800">
                    {metrics.liveCount} Candidates Trialing
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("live")}
                className="text-[10px] font-black text-teal-700 flex items-center gap-1 hover:underline"
              >
                VIEW ROOM <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Standings (Top Candidates Table) */}
          <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">
                Top Performers Standings
              </h3>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className="text-[10px] font-black text-teal-700 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-slate-400/80 font-bold border-b border-slate-100 pb-2">
                    <th className="pb-2">RANK</th>
                    <th className="pb-2">CANDIDATE</th>
                    <th className="pb-2">DEPARTMENT</th>
                    <th className="pb-2 text-right">SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
                  {metrics.topPerformers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-400 font-medium">
                        No candidates registered.
                      </td>
                    </tr>
                  ) : (
                    metrics.topPerformers.map((s, idx) => (
                      <tr key={s.email} className="hover:bg-slate-50/20">
                        <td className="py-3 text-slate-400">#{idx + 1}</td>
                        <td className="py-3">{s.name}</td>
                        <td className="py-3 text-slate-500 font-semibold">{s.department}</td>
                        <td className="py-3 text-right text-teal-700 font-black">{s.score} pts</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column Layout */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Statistical Summary (Victory, Draw, Lost Equivalents) */}
          <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">
                General Statistics
              </h3>
              <span className="text-[10px] font-bold text-teal-700">COMPLETION RATE</span>
            </div>

            {/* Progress Bar (Teal indicator) */}
            <div className="space-y-2">
              <div className="w-full bg-[#E5EAE9] h-2.5 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${metrics.successRate}%` }}
                  className="bg-gradient-to-r from-teal-600 to-teal-800 h-full"
                />
                <div
                  style={{ width: `${metrics.failureRate}%` }}
                  className="bg-rose-500/80 h-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold pt-2">
                <div>
                  <p className="text-slate-400 text-[10px] tracking-wider uppercase">Average</p>
                  <p className="text-slate-800 text-sm font-black">{metrics.avgScore}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] tracking-wider uppercase">Success</p>
                  <p className="text-teal-700 text-sm font-black">{metrics.successRate}%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] tracking-wider uppercase">Eliminated</p>
                  <p className="text-rose-500 text-sm font-black">{metrics.failureRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Grid of 4 Small Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Intake Total",
                value: metrics.totalReg,
                color: "bg-[#7B2CBF]/10 text-[#7B2CBF]",
                icon: Users,
              },
              {
                label: "Pool Size",
                value: questionsCount,
                color: "bg-[#E07A5F]/10 text-[#E07A5F]",
                icon: BookOpen,
              },
              {
                label: "Success Ratios",
                value: `${metrics.successRate}%`,
                color: "bg-[#2A9D8F]/10 text-[#2A9D8F]",
                icon: UserCheck,
              },
              {
                label: "Live Nodes",
                value: metrics.liveCount,
                color: "bg-teal-700/10 text-teal-700",
                icon: Radio,
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-4 flex items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">
                      {stat.label}
                    </p>
                    <p className="text-sm font-black text-slate-800 mt-1">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Card 3: Promo Teal Control Banner */}
          <div className="bg-[#1A4B40] rounded-2xl p-5 text-white flex justify-between items-center relative overflow-hidden shadow-md shadow-[#1A4B40]/10">
            <div className="space-y-2 z-10">
              <span className="text-[10px] font-bold text-[#A8D3CA] uppercase tracking-wider">
                SYSTEM CONFIG
              </span>
              <h4 className="font-extrabold text-sm leading-snug">Chamber Trial Rules & Control</h4>
              <button
                onClick={() => setActiveTab("settings")}
                className="bg-white text-[#1A4B40] hover:bg-slate-100 px-4 py-1.5 rounded-lg text-[10px] font-extrabold transition-all shadow-sm"
              >
                Adjust rules
              </button>
            </div>
            {/* Decorative blurred circles matching standard CoachPro background designs */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-[#2A6557]/45 blur-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
