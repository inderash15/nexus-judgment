import { DBStudent } from "@/lib/db";
import { Metrics, DataState } from "./types";
import { useMemo } from "react";
import { getCandidateScore } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { ArrowRight, ChevronRight } from "lucide-react";

type AnalyticsTabProps = {
  students: DBStudent[];
  metrics: Metrics;
  data: DataState;
};

// SVG Circular Progress
function CircularProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
          <circle 
            cx="48" cy="48" r={radius} 
            stroke={color} 
            strokeWidth="2" 
            fill="transparent" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-h3 font-semibold">{value}%</span>
        </div>
      </div>
      <span className="text-label text-black text-center">{label}</span>
    </div>
  );
}

export function AnalyticsTab({ students, metrics, data }: AnalyticsTabProps) {
  const funnel = useMemo(() => {
    const total = students.length || 1;
    const started = students.filter(s => s.levelsCompleted > 0 || s.round1Completed).length;
    const passedRound1 = students.filter(s => s.round1Completed).length;
    const passedRound2 = students.filter(s => s.status === "Qualified" || s.status === "Completed").length;

    return [
      { id: "reg", label: "Registered", count: students.length, color: "text-black", bg: "bg-slate-100" },
      { id: "r1", label: "Round 01", count: started, color: "text-[#6D5DFB]", bg: "bg-[#6D5DFB]/10" },
      { id: "r2", label: "Round 02", count: passedRound1, color: "text-amber-600", bg: "bg-amber-500/10" },
      { id: "qual", label: "Qualified", count: passedRound2, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    ];
  }, [students]);

  const timelineData = useMemo(() => {
    if (students.length === 0) return [];
    
    // Sort students by loginTime ascending
    const sorted = [...students].filter(s => s.loginTime).sort((a, b) => new Date(a.loginTime).getTime() - new Date(b.loginTime).getTime());
    if (sorted.length === 0) return [];
    
    const points = [];
    const chunks = 5;
    const chunkSize = Math.max(1, Math.ceil(sorted.length / chunks));
    
    let cumulativeScore = 0;
    let count = 0;
    
    for (let i = 0; i < sorted.length; i += chunkSize) {
      const chunk = sorted.slice(i, i + chunkSize);
      cumulativeScore += chunk.reduce((sum, s) => sum + getCandidateScore(s), 0);
      count += chunk.length;
      
      const avgScore = cumulativeScore / count;
      const date = new Date(chunk[chunk.length - 1].loginTime);
      points.push({
        time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        score: Math.round(avgScore)
      });
    }
    
    // If we have fewer than 2 points, it won't draw an area well, so pad it
    if (points.length === 1) {
      points.unshift({ time: "Start", score: 0 });
    }
    
    return points;
  }, [students]);

  const circularMetrics = useMemo(() => {
    const total = students.length || 1;
    const passedR1 = students.filter(s => s.round1Completed).length;
    const passedR2 = students.filter(s => s.mcqCompleted).length;
    const qualified = students.filter(s => s.status === "Qualified" || s.status === "Completed").length;
    
    // System Health: 100% minus percentage of recent errors/suspicious activities
    const recentLogs = data.securityLogs.slice(0, 50);
    const issueLogs = recentLogs.filter(log => log.status === "failed" || log.status === "suspicious").length;
    const healthDrop = recentLogs.length > 0 ? (issueLogs / recentLogs.length) * 100 : 0;
    const systemHealth = Math.max(0, Math.round(100 - healthDrop));

    return {
      r1Completion: Math.round((passedR1 / total) * 100),
      r2Completion: Math.round((passedR2 / total) * 100),
      qualificationRate: Math.round((qualified / total) * 100),
      systemHealth
    };
  }, [students, data.securityLogs]);

  const distributionData = useMemo(() => {
    const ranges = [
      { name: "0-20", count: 0 },
      { name: "21-40", count: 0 },
      { name: "41-60", count: 0 },
      { name: "61-80", count: 0 },
      { name: "81-100", count: 0 },
    ];
    students.forEach(s => {
      const p = getCandidateScore(s);
      if (p <= 20) ranges[0].count++;
      else if (p <= 40) ranges[1].count++;
      else if (p <= 60) ranges[2].count++;
      else if (p <= 80) ranges[3].count++;
      else ranges[4].count++;
    });
    return ranges;
  }, [students]);

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="flex flex-col mb-4">
        <h2 className="text-display mb-2">Assessment Performance</h2>
        <h3 className="text-h3 text-black">Candidate progression and scoring metrics</h3>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Main Chart + Circular Metrics */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="glass-panel rounded-[2rem] p-8 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-label text-black">Overall Score Progression</h3>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-metric leading-none">{metrics.avgScore.toFixed(1)}%</span>
                  <span className="text-status-emerald mt-1">+4.2%</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6D5DFB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6D5DFB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                    cursor={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6D5DFB" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="pastel-yellow rounded-3xl p-6 flex items-center justify-center">
              <CircularProgress value={circularMetrics.r1Completion} label="R1 Completion" color="#6D5DFB" />
            </div>
            <div className="pastel-pink rounded-3xl p-6 flex items-center justify-center">
              <CircularProgress value={circularMetrics.r2Completion} label="R2 Completion" color="#f59e0b" />
            </div>
            <div className="pastel-green rounded-3xl p-6 flex items-center justify-center">
              <CircularProgress value={circularMetrics.qualificationRate} label="Qualification Rate" color="#10b981" />
            </div>
            <div className="pastel-blue rounded-3xl p-6 flex items-center justify-center">
              <CircularProgress value={circularMetrics.systemHealth} label="System Health" color="#94a3b8" />
            </div>
          </div>
        </div>

        {/* Right Column: Funnel & Distribution */}
        <div className="flex flex-col gap-6">
          
          {/* Vertical Funnel */}
          <div className="glass-panel rounded-[2rem] p-8 flex flex-col min-h-[300px]">
            <h3 className="text-label text-black mb-8">Selection Funnel</h3>
            <div className="flex flex-col gap-2 flex-1 justify-center relative">
              <div className="absolute left-[19px] top-[24px] bottom-[24px] w-px bg-white/30" />
              {funnel.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-6 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.bg} border border-white/50 shadow-sm`}>
                    <span className={`text-[12px] font-bold ${step.color}`}>{idx + 1}</span>
                  </div>
                  <div className="flex flex-col py-3">
                    <span className="text-label text-black">{step.label}</span>
                    <span className="text-h2 font-medium">{step.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Distribution */}
          <div className="glass-panel rounded-[2rem] p-8 flex flex-col h-[260px]">
            <h3 className="text-label text-black mb-6">Score Distribution</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '11px', color: '#0f172a' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={24}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? "#10b981" : index === 3 ? "#6D5DFB" : "rgba(109,93,251,0.2)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
