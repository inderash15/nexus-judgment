import { useState } from "react";
import { ActionButton } from "../game/ActionButton";
import { Shield, Radio, Hammer, Settings } from "lucide-react";

type SystemRulesTabProps = {
  sessionTimeout: number;
  setSessionTimeout: (val: number) => void;
  maxWrongAttempts: number;
  setMaxWrongAttempts: (val: number) => void;
  mode: "normal" | "workshop" | "maintenance";
  setMode: (val: "normal" | "workshop" | "maintenance") => void;
  onSave: () => Promise<void>;
};

export function SystemRulesTab({
  sessionTimeout,
  setSessionTimeout,
  maxWrongAttempts,
  setMaxWrongAttempts,
  mode,
  setMode,
  onSave,
}: SystemRulesTabProps) {
  const [saving, setSaving] = useState(false);

  const handleCommit = async () => {
    setSaving(true);
    try {
      await onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300 max-w-3xl">
      <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Settings className="w-5 h-5 text-slate-700" />
          <h3 className="font-extrabold text-sm text-slate-800 tracking-wide uppercase">
            Global Operation Matrix
          </h3>
        </div>

        {/* Operation Modes */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            System Operation Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: "normal",
                label: "Normal Mode",
                icon: Shield,
                desc: "Challenges are active and registrations are normal.",
                color: "border-teal-200 bg-teal-50/20 text-teal-700",
                activeColor: "border-teal-500 bg-teal-500/10 text-teal-800",
              },
              {
                id: "workshop",
                label: "Workshop Mode",
                icon: Radio,
                desc: "Optimal mode for active workshops. Leaderboards and live room monitor active.",
                color: "border-indigo-200 bg-indigo-50/20 text-indigo-700",
                activeColor: "border-indigo-500 bg-indigo-500/10 text-indigo-800",
              },
              {
                id: "maintenance",
                label: "Maintenance Mode",
                icon: Hammer,
                desc: "Students blocked. Only admins can access dashboard terminals.",
                color: "border-rose-200 bg-rose-50/20 text-rose-700",
                activeColor: "border-rose-500 bg-rose-500/10 text-rose-800",
              },
            ].map((opt) => {
              const Icon = opt.icon;
              const isActive = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id as any)}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer ${
                    isActive ? opt.activeColor + " ring-1 ring-offset-1 ring-slate-400" : "border-slate-200 bg-white/40 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-extrabold text-xs">{opt.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rule parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-2">
          <div>
            <label className="block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]">
              Timeout Limit per Level (seconds)
            </label>
            <input
              type="number"
              min={10}
              max={600}
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]">
              Maximum Guess Lives (Elimination Threshold)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={maxWrongAttempts}
              onChange={(e) => setMaxWrongAttempts(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
            />
          </div>
        </div>

        {/* Action triggers */}
        <div className="border-t border-slate-100 pt-4 flex justify-end">
          <button
            onClick={handleCommit}
            disabled={saving}
            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Matrix..." : "Save Configuration Matrix"}
          </button>
        </div>
      </div>
    </div>
  );
}
