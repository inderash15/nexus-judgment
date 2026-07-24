type SystemRulesTabProps = {
  sessionTimeout: number;
  setSessionTimeout: (val: number) => void;
  maxWrongAttempts: number;
  setMaxWrongAttempts: (val: number) => void;
};

export function SystemRulesTab({
  sessionTimeout,
  setSessionTimeout,
  maxWrongAttempts,
  setMaxWrongAttempts,
}: SystemRulesTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300 max-w-3xl">
      <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">
          General Rule Matrix
        </h3>

        <div className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-500 mb-1.5">Timeout Limit per Level (seconds)</label>
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1.5">Maximum Guesses Lives</label>
            <input
              type="number"
              value={maxWrongAttempts}
              onChange={(e) => setMaxWrongAttempts(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
