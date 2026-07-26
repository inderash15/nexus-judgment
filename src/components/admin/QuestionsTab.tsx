import { Search, Edit, Trash2 } from "lucide-react";
import { DBQuestion } from "@/lib/db";

type QuestionsTabProps = {
  questionSearch: string;
  setQuestionSearch: (val: string) => void;
  questionCatFilter: string;
  setQuestionCatFilter: (val: string) => void;
  categories: string[];
  filteredQuestions: DBQuestion[];
  setIsBulkModalOpen: (val: boolean) => void;
  handleAddQuestionClick: () => void;
  handleEditQuestionClick: (q: DBQuestion) => void;
  handleDeleteQuestion: (id: number) => void;
};

export function QuestionsTab({
  questionSearch,
  setQuestionSearch,
  questionCatFilter,
  setQuestionCatFilter,
  categories,
  filteredQuestions,
  setIsBulkModalOpen,
  handleAddQuestionClick,
  handleEditQuestionClick,
  handleDeleteQuestion,
}: QuestionsTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search word or clue hint..."
            value={questionSearch}
            onChange={(e) => setQuestionSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
          <select
            value={questionCatFilter}
            onChange={(e) => setQuestionCatFilter(e.target.value)}
            className="px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-600 bg-white/70 hover:bg-white transition-all"
          >
            Bulk Import
          </button>

          <button
            onClick={handleAddQuestionClick}
            className="px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-xl text-xs font-extrabold tracking-wide hover:shadow-lg transition-all"
          >
            Add Question
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-800 text-[9px] font-extrabold border border-teal-500/20">
                    {q.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${
                      q.difficulty === "easy"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : q.difficulty === "medium"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleEditQuestionClick(q)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1 rounded hover:bg-rose-50 text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-mono text-base font-black tracking-widest text-slate-800 uppercase">
                {q.word}
              </h4>
              <p className="text-xs font-semibold leading-relaxed text-slate-400">{q.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
