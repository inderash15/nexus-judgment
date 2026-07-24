type BulkImportModalProps = {
  isBulkModalOpen: boolean;
  setIsBulkModalOpen: (val: boolean) => void;
  bulkJsonText: string;
  setBulkJsonText: (val: string) => void;
  handleBulkUpload: (e: React.FormEvent) => void;
};

export function BulkImportModal({
  isBulkModalOpen,
  setIsBulkModalOpen,
  bulkJsonText,
  setBulkJsonText,
  handleBulkUpload,
}: BulkImportModalProps) {
  if (!isBulkModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-805">Bulk Upload Questions (JSON)</h3>
          <button
            onClick={() => setIsBulkModalOpen(false)}
            className="text-slate-400 hover:text-slate-650 font-bold text-sm"
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={handleBulkUpload}
          className="p-5 space-y-4 text-xs font-bold text-slate-700"
        >
          <p className="text-slate-500 leading-normal mb-2 font-medium">
            Paste a valid JSON array of questions to append them to the existing pool. Format:
          </p>
          <pre className="p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed">
            {`[
  {
    "word": "TRANSFORMER",
    "category": "Artificial Intelligence",
    "hint": "The sequence-to-sequence architecture.",
    "difficulty": "hard",
    "active": true
  }
]`}
          </pre>

          <div>
            <label className="block text-slate-500 mb-1.5">JSON Array Payload</label>
            <textarea
              required
              rows={8}
              placeholder="Paste JSON text here..."
              value={bulkJsonText}
              onChange={(e) => setBulkJsonText(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl font-mono text-[11px] leading-relaxed text-slate-800 focus:outline-none"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-black"
            >
              Import Questions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
