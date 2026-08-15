import { Save, Sliders, Shield, Settings2, Clock, CheckCircle2 } from "lucide-react";

type SystemRulesTabProps = {
  sessionTimeout: number;
  setSessionTimeout: (val: number) => void;
  maxWrongAttempts: number;
  setMaxWrongAttempts: (val: number) => void;
  mode: "normal" | "workshop" | "maintenance";
  setMode: (val: "normal" | "workshop" | "maintenance") => void;
  round1PassingScore: number;
  setRound1PassingScore: (val: number) => void;
  round2PassingScore: number;
  setRound2PassingScore: (val: number) => void;
  round1TimeLimit: number;
  setRound1TimeLimit: (val: number) => void;
  round2TimeLimit: number;
  setRound2TimeLimit: (val: number) => void;
  onSave: () => Promise<void>;
};

export function SystemRulesTab({
  sessionTimeout,
  setSessionTimeout,
  maxWrongAttempts,
  setMaxWrongAttempts,
  mode,
  setMode,
  round1PassingScore,
  setRound1PassingScore,
  round2PassingScore,
  setRound2PassingScore,
  round1TimeLimit,
  setRound1TimeLimit,
  round2TimeLimit,
  setRound2TimeLimit,
  onSave,
}: SystemRulesTabProps) {
  return (
    <div className="flex flex-col gap-6 w-full h-full animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 mb-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="text-display leading-tight">System Rules</h2>
            <h2 className="text-label mt-2">
              Global Rules & Parameters
            </h2>
          </div>
          
          <button
            onClick={onSave}
            className="btn-primary"
          >
            <Save className="w-4 h-4" />
            Commit Changes
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Operations Module */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col gap-8">
            <h3 className="text-label text-black flex items-center gap-3">
              <Settings2 className="w-4 h-4" /> Core Operations
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">System Mode</label>
                <div className="flex p-1 rounded-full bg-black/[0.03] border border-black/[0.04] w-full">
                  {(["normal", "workshop", "maintenance"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        mode === m 
                          ? "bg-[#6D5DFB] text-black shadow-md" 
                          : "text-black hover:text-black"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-black mt-1">Maintenance mode blocks candidate logins.</p>
              </div>
            </div>
          </div>

          {/* Security Module */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col gap-8">
             <h3 className="text-label text-black flex items-center gap-3">
              <Shield className="w-4 h-4" /> Security Parameters
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Session Timeout (min)</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 30)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Max Failed Attempts</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxWrongAttempts}
                  onChange={(e) => setMaxWrongAttempts(parseInt(e.target.value) || 5)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Round 1 Limits */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col gap-8">
             <h3 className="text-sm font-medium tracking-widest text-black uppercase flex items-center gap-3">
              <Sliders className="w-4 h-4" /> Round 01 Assessment
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Passing Score</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={round1PassingScore}
                  onChange={(e) => setRound1PassingScore(parseInt(e.target.value) || 60)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Time Limit (sec)</label>
                <input
                  type="number"
                  min="60"
                  max="3600"
                  value={round1TimeLimit}
                  onChange={(e) => setRound1TimeLimit(parseInt(e.target.value) || 300)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Round 2 Limits */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col gap-8">
             <h3 className="text-sm font-medium tracking-widest text-black uppercase flex items-center gap-3">
              <Sliders className="w-4 h-4" /> Round 02 Assessment
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Passing Score</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={round2PassingScore}
                  onChange={(e) => setRound2PassingScore(parseInt(e.target.value) || 60)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-medium tracking-widest text-black uppercase">Time Limit (sec)</label>
                <input
                  type="number"
                  min="60"
                  max="3600"
                  value={round2TimeLimit}
                  onChange={(e) => setRound2TimeLimit(parseInt(e.target.value) || 600)}
                  className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl px-4 py-3 text-2xl font-mono text-black outline-none transition-all"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
