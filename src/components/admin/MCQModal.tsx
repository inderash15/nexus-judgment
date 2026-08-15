import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, FileText } from "lucide-react";
import { DBMCQQuestion } from "@/lib/db";

type MCQModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  editingMCQ: Partial<DBMCQQuestion> | null;
  mcqForm: Partial<DBMCQQuestion>;
  setMcqForm: (val: Partial<DBMCQQuestion>) => void;
  handleSaveMCQ: () => void;
};

export function MCQModal({
  isOpen,
  setIsOpen,
  editingMCQ,
  mcqForm,
  setMcqForm,
  handleSaveMCQ,
}: MCQModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white border border-slate-700 text-black p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-4 border-b border-slate-800 bg-slate-950">
          <DialogTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 text-black">
            <FileText className="w-4 h-4 text-indigo-500" />
            {editingMCQ ? "Edit Assessment Node" : "Create Assessment Node"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-black mb-1.5 uppercase tracking-wider">
              Question Text
            </label>
            <textarea
              rows={3}
              value={mcqForm.text || ""}
              onChange={(e) => setMcqForm({ ...mcqForm, text: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-black placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
              placeholder="Enter the assessment scenario or question..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-black mb-1.5 uppercase tracking-wider">
              Knowledge Category
            </label>
            <input
              type="text"
              value={mcqForm.category || ""}
              onChange={(e) => setMcqForm({ ...mcqForm, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-black focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Logic, React, History"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-bold text-black mb-1.5 uppercase tracking-wider">
              Options Matrix (Select Correct)
            </label>
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${mcqForm.correctAnswer === idx ? "bg-emerald-500/10 border-emerald-500/30" : "bg-slate-950 border-slate-800"}`}>
                <div className="relative flex items-center justify-center pl-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={mcqForm.correctAnswer === idx}
                    onChange={() => setMcqForm({ ...mcqForm, correctAnswer: idx })}
                    className="w-4 h-4 text-emerald-500 bg-white border-slate-700 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="flex-1 flex items-center bg-white border border-slate-800 rounded-md overflow-hidden">
                   <span className="px-3 py-2 bg-slate-950 text-black font-mono text-xs border-r border-slate-800">
                     {String.fromCharCode(65 + idx)}
                   </span>
                  <input
                    type="text"
                    value={mcqForm.options?.[idx] || ""}
                    onChange={(e) => {
                      const newOpts = [...(mcqForm.options || ["", "", "", ""])];
                      newOpts[idx] = e.target.value;
                      setMcqForm({ ...mcqForm, options: newOpts });
                    }}
                    className="flex-1 px-3 py-2 bg-transparent text-sm text-black focus:outline-none"
                    placeholder={`Define vector ${String.fromCharCode(65 + idx)}...`}
                  />
                </div>
              </div>
            ))}
          </div>

          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-white/50 cursor-pointer hover:bg-slate-800 transition-colors mt-2">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={mcqForm.active !== false}
                onChange={(e) => setMcqForm({ ...mcqForm, active: e.target.checked })}
                className="peer appearance-none w-4 h-4 rounded border border-slate-600 bg-slate-950 checked:bg-indigo-500 checked:border-indigo-500 focus:outline-none transition-colors cursor-pointer"
              />
              <svg className="absolute w-2.5 h-2.5 text-black pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-black font-bold select-none text-xs">Activate for immediate candidate evaluation</span>
          </label>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-slate-700 rounded-lg text-black hover:bg-slate-800 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMCQ}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-black rounded-lg font-bold text-xs transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
