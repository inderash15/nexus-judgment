import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Users,
  BookOpen,
  TrendingUp,
  BarChart2,
  Lock,
  Radio,
  History,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  adminGetDashboardData,
  adminUpdateQuestion,
  adminBulkUploadQuestions,
  adminUpdateStudentLock,
  adminAuthenticate,
  adminCheckSession,
  adminLogout,
  getSystemConfigData,
  adminUpdateSystemConfig,
} from "../lib/server-fns";
import { DBStudent, DBQuestion, SecurityLog } from "../lib/db";
import {
  OverviewTab,
  CandidatesTab,
  LiveRoomTab,
  QuestionsTab,
  StandingsTab,
  AuditLogsTab,
  SystemRulesTab,
  StudentDrawer,
  QuestionModal,
  BulkImportModal,
} from "@/components/admin";
import type { Tab, DataState } from "@/components/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "NexusPro — Enterprise Control" },
      {
        name: "description",
        content:
          "Glassmorphic corporate dashboard for test monitoring and question pool management.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataState>({ students: [], questions: [], securityLogs: [] });

  const [studentSearch, setStudentSearch] = useState("");
  const [studentDeptFilter, setStudentDeptFilter] = useState("all");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [studentPage, setStudentPage] = useState(1);
  const [studentSortField, setStudentSortField] = useState<string>("score");
  const [studentSortOrder, setStudentSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedStudent, setSelectedStudent] = useState<DBStudent | null>(null);

  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCatFilter, setQuestionCatFilter] = useState("all");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<DBQuestion> | null>(null);

  const [wordForm, setWordForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("Artificial Intelligence");
  const [hintForm, setHintForm] = useState("");
  const [difficultyForm, setDifficultyForm] = useState<"easy" | "medium" | "hard">("medium");
  const [activeForm, setActiveForm] = useState(true);
  const [bulkJsonText, setBulkJsonText] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState(45);
  const [maxWrongAttempts, setMaxWrongAttempts] = useState(4);
  const [systemMode, setSystemMode] = useState<"normal" | "workshop" | "maintenance">("workshop");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await adminGetDashboardData();
      setData(res);

      const config = await getSystemConfigData();
      setSessionTimeout(config.sessionTimeout);
      setMaxWrongAttempts(config.maxWrongAttempts);
      setSystemMode(config.mode);
    } catch (e) {
      console.error("Failed to load admin dashboard data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await adminUpdateSystemConfig({
        data: {
          sessionTimeout,
          maxWrongAttempts,
          mode: systemMode,
        }
      });
      if (res.success) {
        toast.success("Global rules committed successfully.");
      } else {
        toast.error("Failed to commit global rules: " + res.error);
      }
    } catch (e: any) {
      toast.error("Failed to commit settings: " + e.message);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await adminCheckSession();
        if (res.success) {
          setIsAuthenticated(true);
          refreshData();
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error("Session verification failed", e);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const renderStatusBadge = (status: DBStudent["status"]) => {
    const config: Record<string, string> = {
      Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Qualified: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      Completed: "bg-violet-500/10 text-violet-500 border-violet-500/20",
      Eliminated: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      Disqualified: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs rounded-full font-bold border ${
          config[status] || "bg-slate-500/10 text-slate-500 border-slate-500/20"
        }`}
      >
        {status}
      </span>
    );
  };

  const metrics = useMemo(() => {
    const students = data.students;
    const totalReg = students.length;
    const active = students.filter((s) => s.status === "Active").length;
    const eliminated = students.filter((s) => s.status === "Eliminated").length;
    const qualified = students.filter(
      (s) => s.status === "Qualified" || s.status === "Completed",
    ).length;

    const scores = students.map((s) => s.score);
    const avgScore = totalReg > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalReg) : 0;
    const successRate = totalReg > 0 ? Math.round((qualified / totalReg) * 100) : 0;
    const failureRate = totalReg > 0 ? Math.round((eliminated / totalReg) * 100) : 0;

    const now = new Date();
    const liveCount = students.filter((s) => {
      if (!s.lastActiveTime) return false;
      const lastActive = new Date(s.lastActiveTime);
      return now.getTime() - lastActive.getTime() < 15 * 60 * 1000 && s.status === "Active";
    }).length;

    const topPerformers = [...students].sort((a, b) => b.score - a.score).slice(0, 5);

    return {
      totalReg,
      active,
      eliminated,
      qualified,
      avgScore,
      successRate,
      failureRate,
      liveCount,
      topPerformers,
    };
  }, [data.students]);

  const departments = useMemo(() => {
    const depts = new Set<string>();
    data.students.forEach((s) => depts.add(s.department));
    return Array.from(depts);
  }, [data.students]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    data.questions.forEach((q) => cats.add(q.category));
    return Array.from(cats);
  }, [data.questions]);

  const filteredStudents = useMemo(() => {
    return data.students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearch.toLowerCase());
      const matchDept = studentDeptFilter === "all" || s.department === studentDeptFilter;
      const matchStatus = studentStatusFilter === "all" || s.status === studentStatusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [data.students, studentSearch, studentDeptFilter, studentStatusFilter]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a: DBStudent, b: DBStudent) => {
      let valA = a[studentSortField];
      let valB = b[studentSortField];
      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return studentSortOrder === "asc" ? -1 : 1;
      if (valA > valB) return studentSortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, studentSortField, studentSortOrder]);

  const paginatedStudents = useMemo(() => {
    const start = (studentPage - 1) * 8;
    return sortedStudents.slice(start, start + 8);
  }, [sortedStudents, studentPage]);

  const filteredQuestions = useMemo(() => {
    return data.questions.filter((q) => {
      const matchSearch =
        q.word.toLowerCase().includes(questionSearch.toLowerCase()) ||
        q.hint.toLowerCase().includes(questionSearch.toLowerCase());
      const matchCat = questionCatFilter === "all" || q.category === questionCatFilter;
      return matchSearch && matchCat;
    });
  }, [data.questions, questionSearch, questionCatFilter]);

  const handleExportCSV = () => {
    if (data.students.length === 0) return;
    const headers = [
      "Name",
      "Email",
      "Department",
      "Score",
      "Levels Completed",
      "Status",
      "Attempts",
    ];
    const rows = data.students.map((s) => [
      s.name,
      s.email,
      s.department,
      s.score,
      s.levelsCompleted,
      s.status,
      s.attempts,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleLock = async (student: DBStudent) => {
    const nextLockedState = !student.locked;
    const nextStatus = nextLockedState ? "Disqualified" : "Active";

    try {
      const res = await adminUpdateStudentLock({
        data: { email: student.email, locked: nextLockedState, status: nextStatus },
      });
      if (res.success) {
        setData((prev) => ({ ...prev, students: res.students }));
        if (selectedStudent && selectedStudent.email === student.email) {
          setSelectedStudent((prev) =>
            prev ? { ...prev, locked: nextLockedState, status: nextStatus } : null,
          );
        }
      }
    } catch (e) {
      console.error("Lock toggle failed", e);
    }
  };

  const handleEditQuestionClick = (q: DBQuestion) => {
    setEditingQuestion(q);
    setWordForm(q.word);
    setCategoryForm(q.category);
    setHintForm(q.hint);
    setDifficultyForm(q.difficulty);
    setActiveForm(q.active);
    setIsQuestionModalOpen(true);
  };

  const handleAddQuestionClick = () => {
    setEditingQuestion(null);
    setWordForm("");
    setCategoryForm("Artificial Intelligence");
    setHintForm("");
    setDifficultyForm("medium");
    setActiveForm(true);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordForm.trim() || !hintForm.trim()) return;

    try {
      const payload: Partial<DBQuestion> = {
        word: wordForm.toUpperCase().trim(),
        category: categoryForm,
        hint: hintForm.trim(),
        difficulty: difficultyForm,
        active: activeForm,
      };

      if (editingQuestion) {
        payload.id = editingQuestion.id;
        const res = await adminUpdateQuestion({
          data: { action: "edit", question: payload },
        });
        if (res.success) setData((prev) => ({ ...prev, questions: res.questions }));
      } else {
        const res = await adminUpdateQuestion({
          data: { action: "add", question: payload },
        });
        if (res.success) setData((prev) => ({ ...prev, questions: res.questions }));
      }
      setIsQuestionModalOpen(false);
    } catch (e) {
      console.error("Question save failed", e);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Remove this question from the active pool?")) return;
    try {
      const res = await adminUpdateQuestion({
        data: { action: "delete", question: { id } },
      });
      if (res.success) setData((prev) => ({ ...prev, questions: res.questions }));
    } catch (e) {
      console.error("Question deletion failed", e);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const list = JSON.parse(bulkJsonText);
      if (!Array.isArray(list)) throw new Error("Payload must be a JSON array");
      const res = await adminBulkUploadQuestions({ data: list });
      if (res.success) {
        setData((prev) => ({ ...prev, questions: res.questions }));
        setIsBulkModalOpen(false);
        setBulkJsonText("");
      }
    } catch (e: unknown) {
      alert("Invalid JSON format: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-4 sm:p-6 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 text-slate-805">
          <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto shadow-lg shadow-black/10 border border-white/20">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-lg font-black text-slate-800 tracking-tight">
              NexusPro Operations
            </h1>
            <p className="text-xs text-slate-500 font-semibold">
              Enter security code to authenticate terminal node.
            </p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await adminAuthenticate({
                  data: { password: adminPasswordInput, rememberMe },
                });
                if (res.success) {
                  setIsAuthenticated(true);
                  setAuthError("");
                  refreshData();
                } else {
                  setAuthError(res.error || "Credential mismatch. Access denied.");
                }
              } catch {
                setAuthError("Authentication service unavailable.");
              }
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                required
                placeholder="Enter Admin Password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 text-center font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center px-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                />
                Remember me (7 days)
              </label>
            </div>
            {authError && (
              <p className="text-[10px] text-rose-500 font-bold text-center uppercase tracking-wider">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-md cursor-pointer"
            >
              Access Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-3 sm:p-4 md:p-6 lg:p-10 font-sans flex items-center justify-center">
      <div className="w-full max-w-7xl min-h-[85vh] bg-white/35 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl sm:rounded-[32px] overflow-hidden flex flex-col md:flex-row">
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white/40 p-6 flex flex-col justify-between border-r border-[#E5EAE9]/80 shrink-0 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images.png"
                  alt="NexusPro"
                  className="w-7 h-7 rounded object-contain bg-slate-950"
                />
                <h1 className="font-extrabold text-slate-800 text-base tracking-tight leading-none">
                  NexusPro
                </h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-slate-200/40 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {(
                [
                  { id: "overview", label: "Dashboard", icon: BarChart2 },
                  { id: "students", label: "Candidates", icon: Users },
                  { id: "live", label: "Live Room", icon: Radio },
                  { id: "questions", label: "Questions", icon: BookOpen },
                  { id: "leaderboard", label: "Standings", icon: TrendingUp },
                  { id: "audit", label: "Security Logs", icon: History },
                  { id: "settings", label: "System Rules", icon: Settings },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setStudentPage(1);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-lg shadow-teal-700/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4">
            <button
              onClick={async () => {
                if (confirm("Disconnect and lock terminal node?")) {
                  await adminLogout();
                  setIsAuthenticated(false);
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Terminal</span>
            </button>
            <div className="text-[10px] font-bold text-slate-400/80 px-2 tracking-wider">
              SYSTEM ENGINE v1.2
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-x-hidden">
          <header className="flex justify-between items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-white/70 border border-slate-200 hover:bg-white text-slate-600 shadow-sm transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <p className="text-[11px] font-extrabold text-teal-800 tracking-wider">
                  Welcome back, Admin 👋
                </p>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-800 capitalize leading-tight">
                  {activeTab}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs border border-white/10">
                  AD
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-extrabold text-slate-800 leading-none">Andrea Admin</p>
                  <span className="text-[9px] font-bold text-slate-400">System Node</span>
                </div>
              </div>
            </div>
          </header>

          {activeTab === "overview" && (
            <OverviewTab metrics={metrics} data={data} setActiveTab={setActiveTab} />
          )}

          {activeTab === "students" && (
            <CandidatesTab
              studentSearch={studentSearch}
              setStudentSearch={setStudentSearch}
              studentDeptFilter={studentDeptFilter}
              setStudentDeptFilter={setStudentDeptFilter}
              studentStatusFilter={studentStatusFilter}
              setStudentStatusFilter={setStudentStatusFilter}
              departments={departments}
              sortedStudents={sortedStudents}
              paginatedStudents={paginatedStudents}
              studentPage={studentPage}
              setStudentPage={setStudentPage}
              handleExportCSV={handleExportCSV}
              handleToggleLock={handleToggleLock}
              setSelectedStudent={setSelectedStudent}
              renderStatusBadge={renderStatusBadge}
            />
          )}

          {activeTab === "live" && <LiveRoomTab students={data.students} />}

          {activeTab === "questions" && (
            <QuestionsTab
              questionSearch={questionSearch}
              setQuestionSearch={setQuestionSearch}
              questionCatFilter={questionCatFilter}
              setQuestionCatFilter={setQuestionCatFilter}
              categories={categories}
              filteredQuestions={filteredQuestions}
              setIsBulkModalOpen={setIsBulkModalOpen}
              handleAddQuestionClick={handleAddQuestionClick}
              handleEditQuestionClick={handleEditQuestionClick}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          )}

          {activeTab === "leaderboard" && <StandingsTab students={data.students} />}

          {activeTab === "audit" && <AuditLogsTab securityLogs={data.securityLogs} />}

          {activeTab === "settings" && (
            <SystemRulesTab
              sessionTimeout={sessionTimeout}
              setSessionTimeout={setSessionTimeout}
              maxWrongAttempts={maxWrongAttempts}
              setMaxWrongAttempts={setMaxWrongAttempts}
              mode={systemMode}
              setMode={setSystemMode}
              onSave={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {selectedStudent && (
        <StudentDrawer
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          data={data}
          handleToggleLock={handleToggleLock}
        />
      )}

      {isQuestionModalOpen && (
        <QuestionModal
          isQuestionModalOpen={isQuestionModalOpen}
          setIsQuestionModalOpen={setIsQuestionModalOpen}
          editingQuestion={editingQuestion}
          wordForm={wordForm}
          setWordForm={setWordForm}
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          hintForm={hintForm}
          setHintForm={setHintForm}
          difficultyForm={difficultyForm}
          setDifficultyForm={setDifficultyForm}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          handleSaveQuestion={handleSaveQuestion}
        />
      )}

      {isBulkModalOpen && (
        <BulkImportModal
          isBulkModalOpen={isBulkModalOpen}
          setIsBulkModalOpen={setIsBulkModalOpen}
          bulkJsonText={bulkJsonText}
          setBulkJsonText={setBulkJsonText}
          handleBulkUpload={handleBulkUpload}
        />
      )}
    </div>
  );
}
