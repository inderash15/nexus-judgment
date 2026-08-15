import { Upload, X } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsBulkModalOpen(false)}
      />
      <div className="bg-white rounded-xl shadow-2xl border border-slate-700 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative z-[101]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="font-bold text-sm text-black uppercase tracking-wide flex items-center gap-2">
            <Upload className="w-4 h-4 text-indigo-500" />
            Bulk Import (JSON)
          </h3>
          <button
            onClick={() => setIsBulkModalOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-800 text-black hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={handleBulkUpload}
          className="p-6 space-y-4 text-xs font-medium text-black"
        >
          <p className="text-black leading-normal mb-2">
            Paste a valid JSON array of question nodes to append them to the existing assessment pool. Must follow this schema:
          </p>
          <pre className="p-4 bg-slate-950 text-[#6D5DFB] border border-slate-800 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed">
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
            <label className="block text-black mb-1.5 uppercase tracking-wider text-[10px] font-bold mt-4">JSON Array Payload</label>
            <textarea
              required
              rows={8}
              placeholder="Paste JSON text here..."
              value={bulkJsonText}
              onChange={(e) => setBulkJsonText(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] leading-relaxed text-black focus:outline-none focus:border-indigo-500 placeholder:text-black transition-colors resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              className="px-4 py-2 border border-slate-700 rounded-lg text-black hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-black rounded-lg font-bold text-xs transition-colors"
            >
              Import Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
