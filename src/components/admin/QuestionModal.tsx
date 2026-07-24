import { DBQuestion } from "@/lib/db";

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">
            {editingQuestion ? "Edit Trial Word" : "Inject Trial Word"}
          </h3>
          <button
            onClick={() => setIsQuestionModalOpen(false)}
            className="text-slate-400 hover:text-slate-650 font-bold text-sm"
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={handleSaveQuestion}
          className="p-5 space-y-4 text-xs font-bold text-slate-700"
        >
          <div>
            <label className="block text-slate-500 mb-1.5">Target Word (Hangman Answer)</label>
            <input
              type="text"
              required
              placeholder="e.g. TRANSFORMER"
              value={wordForm}
              onChange={(e) => setWordForm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl uppercase tracking-widest font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1.5">Category</label>
            <select
              value={categoryForm}
              onChange={(e) => setCategoryForm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700"
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
            <label className="block text-slate-500 mb-1.5">Difficulty</label>
            <div className="flex gap-4">
              {["easy", "medium", "hard"].map((diff) => (
                <label key={diff} className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    checked={difficultyForm === diff}
                    onChange={() => setDifficultyForm(diff as "easy" | "medium" | "hard")}
                    className="text-teal-750 focus:ring-teal-700"
                  />
                  <span className="capitalize">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-500 mb-1.5">Guardian Clue / Hint Text</label>
            <textarea
              required
              rows={3}
              placeholder="Explain details of this technology or clue."
              value={hintForm}
              onChange={(e) => setHintForm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl leading-relaxed text-slate-800 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activeForm"
              checked={activeForm}
              onChange={(e) => setActiveForm(e.target.checked)}
              className="rounded border-slate-300 text-teal-700 focus:ring-teal-700 h-4 w-4"
            />
            <label htmlFor="activeForm" className="text-slate-500 select-none cursor-pointer">
              Enable immediately in question pool
            </label>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsQuestionModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-black"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
