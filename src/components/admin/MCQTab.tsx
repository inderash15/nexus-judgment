import { Search, Edit, Trash2, Plus } from "lucide-react";
import { DBMCQQuestion } from "@/lib/db";
import { useState } from "react";

type MCQTabProps = {
  mcqSearch: string;
  setMcqSearch: (val: string) => void;
  filteredMCQs: DBMCQQuestion[];
  handleAddMCQClick: () => void;
  handleEditMCQClick: (q: DBMCQQuestion) => void;
  handleDeleteMCQ: (id: string) => void;
};

export function MCQTab({
  mcqSearch,
  setMcqSearch,
  filteredMCQs,
  handleAddMCQClick,
  handleEditMCQClick,
  handleDeleteMCQ,
}: MCQTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search MCQ text..."
            value={mcqSearch}
            onChange={(e) => setMcqSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleAddMCQClick}
            className="px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-xl text-xs font-extrabold tracking-wide hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add MCQ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {filteredMCQs.map((q) => (
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
                  {!q.active && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[9px] font-extrabold border border-rose-500/20 uppercase">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleEditMCQClick(q)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteMCQ(q.id)}
                    className="p-1 rounded hover:bg-rose-50 text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-sans text-sm font-black tracking-tight text-slate-800">
                {q.text}
              </h4>
              <div className="space-y-1.5 mt-3">
                {q.options.map((opt, i) => (
                  <div key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${q.correctAnswer === i ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-500"}`}>
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {filteredMCQs.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/40">
            <p className="text-sm font-bold text-slate-400">No MCQ questions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
