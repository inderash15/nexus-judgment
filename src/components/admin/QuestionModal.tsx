import { DBQuestion } from "@/lib/db";
import { Database, X } from "lucide-react";

type QuestionModalProps = {
  isQuestionModalOpen: boolean;
  setIsQuestionModalOpen: (val: boolean) => void;
  editingQuestion: Partial<DBQuestion> | null;
  wordForm: string;
  setWordForm: (val: string) => void;
  categoryForm: string;
  setCategoryForm: (val: string) => void;
  hintForm: string;
  setHintForm: (val: string) => void;
  difficultyForm: "easy" | "medium" | "hard";
  setDifficultyForm: (val: "easy" | "medium" | "hard") => void;
  activeForm: boolean;
  setActiveForm: (val: boolean) => void;
  handleSaveQuestion: (e: React.FormEvent) => void;
};

export function QuestionModal({
  isQuestionModalOpen,
  setIsQuestionModalOpen,
  editingQuestion,
  wordForm,
  setWordForm,
  categoryForm,
  setCategoryForm,
  hintForm,
  setHintForm,
  difficultyForm,
  setDifficultyForm,
  activeForm,
  setActiveForm,
  handleSaveQuestion,
}: QuestionModalProps) {
  if (!isQuestionModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsQuestionModalOpen(false)}
      />
      <div className="bg-[#0C0C0C]/80 backdrop-blur-[40px] border border-black/[0.04] shadow-2xl rounded-[2rem] w-full max-w-3xl p-8 relative flex flex-col max-h-[90vh] overflow-hidden z-[101]">
        <div className="flex justify-between items-center mb-8 border-b border-black/[0.03] pb-4">
          <h3 className="font-bold text-sm text-black uppercase tracking-wide flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-500" />
            {editingQuestion ? "Edit Question" : "New Question"}
          </h3>
          <button
            onClick={() => setIsQuestionModalOpen(false)}
            className="w-8 h-8 rounded-full bg-black/[0.02] flex items-center justify-center hover:bg-black/[0.04] transition-colors"
          >
            <X className="w-4 h-4 text-black" />
          </button>
        </div>
        <form
          onSubmit={handleSaveQuestion}
          className="flex-1 overflow-y-auto space-y-8 pr-2 scrollbar-hide"
        >
          <div className="space-y-4">
            <label className="text-[10px] font-medium tracking-widest text-black uppercase">Question Text</label>
            <textarea
              required
              placeholder="e.g. TRANSFORMER"
              value={wordForm}
              onChange={(e) => setWordForm(e.target.value)}
              className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-2xl p-4 text-sm text-black placeholder:text-black outline-none transition-all resize-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest text-black uppercase mb-3">Category</label>
            <select
              value={categoryForm}
              onChange={(e) => setCategoryForm(e.target.value)}
              className="w-full p-4 bg-black/[0.03] border border-black/[0.04] rounded-2xl focus:outline-none focus:border-black/[0.08] text-black appearance-none text-sm"
            >
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Programming">Programming</option>
              <option value="Logical Reasoning">Logical Reasoning</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Generative AI">Generative AI</option>
              <option value="RAG Systems">RAG Systems</option>
              <option value="AI Agents">AI Agents</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Networking">Networking</option>
              <option value="Algorithms">Algorithms</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Advanced Technical Concepts">Advanced Technical Concepts</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest text-black uppercase mb-3">Difficulty Classification</label>
            <div className="flex gap-3">
              {["easy", "medium", "hard"].map((diff) => (
                <label key={diff} className={`flex-1 flex items-center justify-center gap-1.5 font-medium cursor-pointer px-3 py-3 rounded-2xl transition-colors text-[10px] uppercase tracking-widest ${
                  difficultyForm === diff 
                    ? "bg-black/[0.04] text-black border border-black/[0.08]" 
                    : "bg-black/[0.03] text-black border border-black/[0.04] hover:bg-black/[0.06] hover:text-black"
                }`}>
                  <input
                    type="radio"
                    name="difficulty"
                    checked={difficultyForm === diff}
                    onChange={() => setDifficultyForm(diff as "easy" | "medium" | "hard")}
                    className="sr-only"
                  />
                  <span>{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest text-black uppercase mb-3">Guardian Clue / Hint Text</label>
            <textarea
              required
              rows={3}
              placeholder="Explain details of this technology or clue."
              value={hintForm}
              onChange={(e) => setHintForm(e.target.value)}
              className="w-full p-4 bg-black/[0.03] border border-black/[0.04] rounded-2xl text-sm text-black placeholder:text-black focus:outline-none focus:border-black/[0.08] resize-none transition-all"
            />
          </div>

          <label className="flex items-center gap-3 p-4 rounded-2xl border border-black/[0.04] bg-black/[0.03] cursor-pointer hover:bg-black/[0.06] transition-colors">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={activeForm}
                onChange={(e) => setActiveForm(e.target.checked)}
                className="peer appearance-none w-4 h-4 rounded-sm border border-black/[0.08] bg-transparent checked:bg-[#6D5DFB] checked:border-[#FDFBF7] focus:outline-none transition-colors"
              />
              <svg className="absolute w-2.5 h-2.5 text-black pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-black font-medium text-[10px] uppercase tracking-widest">Enable immediately in active pool</span>
          </label>

          <div className="mt-8 pt-6 border-t border-black/[0.03] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsQuestionModalOpen(false)}
              className="px-6 py-2.5 rounded-full border border-black/[0.06] text-black hover:text-black hover:bg-black/[0.02] transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!wordForm.trim() || !categoryForm.trim()}
              className="px-6 py-2.5 rounded-full bg-[#6D5DFB] text-black hover:bg-white transition-colors text-[10px] font-bold uppercase tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingQuestion ? "Save Changes" : "Create Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
