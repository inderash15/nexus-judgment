import { DBQuestion } from "@/lib/db";
import { Plus, Search, SlidersHorizontal, Trash2, Edit2 } from "lucide-react";
import { useMemo } from "react";

type QuestionsTabProps = {
  questionSearch: string;
  setQuestionSearch: (val: string) => void;
  questionCatFilter: string;
  setQuestionCatFilter: (val: string) => void;
  filteredQuestions: DBQuestion[];
  handleAddQuestionClick: () => void;
  handleEditQuestionClick: (q: DBQuestion) => void;
  handleDeleteQuestion: (id: string) => Promise<void>;
  handleBulkImportClick: () => void;
};

export function QuestionsTab({
  questionSearch,
  setQuestionSearch,
  questionCatFilter,
  setQuestionCatFilter,
  filteredQuestions,
  handleAddQuestionClick,
  handleEditQuestionClick,
  handleDeleteQuestion,
  handleBulkImportClick,
}: QuestionsTabProps) {
  const categories = useMemo(() => {
    const cats = new Set(filteredQuestions.map((q) => q.category));
    return Array.from(cats);
  }, [filteredQuestions]);

  return (
    <div className="flex flex-col gap-6 w-full h-full animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="text-display leading-tight">Round 01</h2>
            <h2 className="text-label mt-2">
              Question Pool • {filteredQuestions.length} Items
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleBulkImportClick}
              className="btn-secondary"
            >
              Bulk Import
            </button>
            <button
              onClick={handleAddQuestionClick}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              New Question
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="glass-panel rounded-full p-2 flex flex-col md:flex-row gap-2 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search question text or hint..."
              value={questionSearch}
              onChange={(e) => setQuestionSearch(e.target.value)}
              className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-full pl-10 pr-4 py-2.5 text-sm text-black placeholder:text-black transition-all outline-none font-mono"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select
                value={questionCatFilter}
                onChange={(e) => setQuestionCatFilter(e.target.value)}
                className="w-full bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-full px-4 py-2.5 text-sm text-black appearance-none outline-none cursor-pointer"
              >
                <option value="all" className="bg-white">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white">{c}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-3xl flex flex-col flex-1 min-h-0 relative overflow-hidden">
        <div className="flex-1 overflow-auto scrollbar-hide relative z-10 p-2">
          <table className="w-full text-left whitespace-nowrap border-separate border-spacing-y-[3px]">
            <thead>
              <tr className="text-label text-black">
                <th className="px-5 py-4 w-16">ID</th>
                <th className="px-5 py-4">Question Text</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Difficulty</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-black text-sm">
                    No questions found in pool.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="group transition-colors">
                    <td className="px-5 py-3 rounded-l-xl glass-panel-inner transition-colors">
                      <span className="text-small font-mono uppercase text-black">#{String(q.id).substring(0, 4)}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 transition-colors max-w-[300px] truncate">
                      <span className="text-body font-mono text-black">{q.word}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 transition-colors">
                      <span className="text-label text-black bg-white/30 px-2 py-1 rounded-md">{q.category}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 transition-colors">
                      <span className={`status-${
                        q.difficulty === 'hard' ? 'red' :
                        q.difficulty === 'medium' ? 'amber' : 'emerald'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 transition-colors">
                      <span className={q.active ? "status-emerald" : "status-gray"}>
                        {q.active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3 rounded-r-xl glass-panel-inner border-l-0 transition-colors text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditQuestionClick(q)}
                          className="btn-icon"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(String(q.id))}
                          className="btn-icon text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    </div>
  );
}
