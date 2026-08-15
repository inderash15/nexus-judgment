import { DBStudent } from "@/lib/db";
import { Download, Search, SlidersHorizontal, Lock, Unlock, Clock, ShieldAlert } from "lucide-react";
import { useMemo } from "react";

type CandidatesTabProps = {
  studentSearch: string;
  setStudentSearch: (val: string) => void;
  studentDeptFilter: string;
  setStudentDeptFilter: (val: string) => void;
  studentStatusFilter: string;
  setStudentStatusFilter: (val: string) => void;
  departments: string[];
  sortedStudents: DBStudent[];
  paginatedStudents: DBStudent[];
  studentPage: number;
  setStudentPage: (val: number) => void;
  handleExportCSV: () => void;
  handleToggleLock: (email: string, locked: boolean) => Promise<void>;
  setSelectedStudent: (student: DBStudent | null) => void;
};

export function CandidatesTab({
  studentSearch,
  setStudentSearch,
  studentDeptFilter,
  setStudentDeptFilter,
  studentStatusFilter,
  setStudentStatusFilter,
  departments,
  sortedStudents,
  paginatedStudents,
  studentPage,
  setStudentPage,
  handleExportCSV,
  handleToggleLock,
  setSelectedStudent,
}: CandidatesTabProps) {
  const totalPages = Math.ceil(sortedStudents.length / 50);

  return (
    <div className="flex flex-col gap-6 w-full h-full animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="text-display leading-tight">Candidates</h2>
            <h2 className="text-label mt-2">
              {sortedStudents.length} Registered
            </h2>
          </div>
          
          <button
            onClick={handleExportCSV}
            className="btn-primary"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters Panel */}
        <div className="glass-panel rounded-full p-2 flex flex-col md:flex-row gap-2 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search candidate name or ID..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-full pl-10 pr-4 py-2.5 text-sm text-black placeholder:text-black transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select
                value={studentDeptFilter}
                onChange={(e) => setStudentDeptFilter(e.target.value)}
                className="w-full bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-full px-4 py-2.5 text-sm text-black appearance-none outline-none cursor-pointer"
              >
                <option value="all" className="bg-white">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-white">{dept}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none" />
            </div>

            <div className="relative w-full md:w-48">
              <select
                value={studentStatusFilter}
                onChange={(e) => setStudentStatusFilter(e.target.value)}
                className="w-full bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-full px-4 py-2.5 text-sm text-black appearance-none outline-none cursor-pointer"
              >
                <option value="all" className="bg-white">All Statuses</option>
                <option value="Active" className="bg-white">Active</option>
                <option value="Qualified" className="bg-white">Qualified</option>
                <option value="Eliminated" className="bg-white">Eliminated</option>
                <option value="Completed" className="bg-white">Completed</option>
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
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4 text-center">Round</th>
                <th className="px-5 py-4 text-right">Score</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Activity</th>
                <th className="px-5 py-4 text-center">Risk</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-black text-sm">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => (
                  <tr 
                    key={s.email} 
                    className="group cursor-pointer transition-colors"
                    onClick={() => setSelectedStudent(s)}
                  >
                    <td className="px-5 py-3 rounded-l-xl glass-panel-inner bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-black/[0.02] flex items-center justify-center text-[9px] font-bold text-black shrink-0 border border-black/[0.04]">
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-black">{s.name}</span>
                          <span className="text-[9px] text-black font-mono tracking-widest uppercase">{s.email.split('@')[0]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                      <span className="text-black">{s.department || "—"}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors text-center">
                      <span className="font-mono text-black">0{s.levelsCompleted + 1}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors text-right">
                      <span className="font-mono font-bold text-[#6D5DFB]">{s.score}</span>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                      <StatusBadge status={s.status} locked={s.locked} />
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                      <div className="flex items-center gap-1.5 text-black">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] tracking-wider uppercase">{getTimeAgo(s.lastActiveTime)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors text-center">
                      {s.locked ? (
                        <ShieldAlert className="w-4 h-4 text-rose-500 mx-auto" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-black/[0.06] inline-block"></span>
                      )}
                    </td>
                    <td className="px-5 py-3 rounded-r-xl glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLock(s.email, !s.locked);
                        }}
                        className={`p-2 rounded-full transition-colors border ${
                          s.locked 
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20" 
                            : "bg-black/[0.02] border-black/[0.06] text-black hover:text-black hover:bg-black/[0.04]"
                        }`}
                        title={s.locked ? "Unlock Candidate" : "Lock Candidate"}
                      >
                        {s.locked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between relative z-10 rounded-b-3xl backdrop-blur-md">
          <span className="text-label">
            Page {studentPage} of {totalPages || 1}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStudentPage(Math.max(1, studentPage - 1))}
              disabled={studentPage === 1}
              className="btn-secondary py-1.5 px-3 rounded-lg text-xs"
            >
              Prev
            </button>
            <button
              onClick={() => setStudentPage(Math.min(totalPages, studentPage + 1))}
              disabled={studentPage === totalPages || totalPages === 0}
              className="btn-secondary py-1.5 px-3 rounded-lg text-xs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, locked }: { status: string, locked?: boolean }) {
  if (locked) return <span className="status-red">LOCKED</span>;
  
  const map: Record<string, string> = {
    Active: "status-emerald",
    Qualified: "status-indigo",
    Completed: "status-gray",
    Eliminated: "status-amber",
    Disqualified: "status-red",
  };

  const className = map[status] || "status-gray";

  return (
    <span className={className}>
      {status}
    </span>
  );
}

function getTimeAgo(dateString: string) {
  if (!dateString) return "Never";
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
