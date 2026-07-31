import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
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
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border border-slate-700 text-slate-100 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 border-b border-slate-800 bg-slate-900/50">
          <DialogTitle className="text-xl font-bold">
            {editingMCQ ? "Edit MCQ" : "Add New MCQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Question Text
            </label>
            <textarea
              rows={3}
              value={mcqForm.text || ""}
              onChange={(e) => setMcqForm({ ...mcqForm, text: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              placeholder="Enter the question text..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Category
            </label>
            <input
              type="text"
              value={mcqForm.category || ""}
              onChange={(e) => setMcqForm({ ...mcqForm, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
              placeholder="e.g. Logic, React, History"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Options (A, B, C, D)
            </label>
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={mcqForm.correctAnswer === idx}
                  onChange={() => setMcqForm({ ...mcqForm, correctAnswer: idx })}
                  className="w-4 h-4 text-teal-500 bg-slate-800 border-slate-600 focus:ring-teal-500"
                />
                <input
                  type="text"
                  value={mcqForm.options?.[idx] || ""}
                  onChange={(e) => {
                    const newOpts = [...(mcqForm.options || ["", "", "", ""])];
                    newOpts[idx] = e.target.value;
                    setMcqForm({ ...mcqForm, options: newOpts });
                  }}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500"
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="mcqActive"
              checked={mcqForm.active !== false}
              onChange={(e) => setMcqForm({ ...mcqForm, active: e.target.checked })}
              className="w-4 h-4 rounded text-teal-500 bg-slate-800 border-slate-600 focus:ring-teal-500"
            />
            <label htmlFor="mcqActive" className="text-sm font-semibold text-slate-300">
              Active (Visible to candidates)
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMCQ}
            className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/50"
          >
            Save MCQ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
