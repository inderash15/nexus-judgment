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
  adminUpdateMCQQuestion,
} from "../lib/server-fns";
import { DBStudent, DBQuestion, DBMCQQuestion, SecurityLog } from "../lib/db";
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
  MCQTab,
  MCQModal,
  TopNavigation,
  CommandPalette,
  RiskCenterTab,
  AnalyticsTab,
  SelectionTab,
} from "@/components/admin";
import type { Tab, DataState } from "@/components/admin";
import { getCandidateScore } from "@/lib/utils";

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
  const [data, setData] = useState<DataState>({ students: [], questions: [], mcqQuestions: [], securityLogs: [] });

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
  
  const [mcqSearch, setMcqSearch] = useState("");
  const [isMcqModalOpen, setIsMcqModalOpen] = useState(false);
  const [editingMcq, setEditingMcq] = useState<Partial<DBMCQQuestion> | null>(null);
  const [mcqForm, setMcqForm] = useState<Partial<DBMCQQuestion>>({});

  const [wordForm, setWordForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("Artificial Intelligence");
  const [hintForm, setHintForm] = useState("");
  const [difficultyForm, setDifficultyForm] = useState<"easy" | "medium" | "hard">("medium");
  const [activeForm, setActiveForm] = useState(true);
  const [bulkJsonText, setBulkJsonText] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState(45);
  const [maxWrongAttempts, setMaxWrongAttempts] = useState(4);
  const [systemMode, setSystemMode] = useState<"normal" | "workshop" | "maintenance">("workshop");
  const [systemConfig, setSystemConfig] = useState<any>(null);
  const [round1PassingScore, setRound1PassingScore] = useState(60);
  const [round2PassingScore, setRound2PassingScore] = useState(60);
  const [round1TimeLimit, setRound1TimeLimit] = useState(300);
  const [round2TimeLimit, setRound2TimeLimit] = useState(600);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await adminGetDashboardData();
      setData(res);

      const config = await getSystemConfigData();
      setSystemConfig(config);
      setSessionTimeout(config.sessionTimeout);
      setMaxWrongAttempts(config.maxWrongAttempts);
      setSystemMode(config.mode);
      setRound1PassingScore(config.round1PassingScore || 60);
      setRound2PassingScore(config.round2PassingScore || 60);
      setRound1TimeLimit(config.round1TimeLimit || 300);
      setRound2TimeLimit(config.round2TimeLimit || 600);
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
          round1PassingScore,
          round2PassingScore,
          round1TimeLimit,
          round2TimeLimit,
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
          config[status] || "bg-slate-500/10 text-black border-slate-500/20"
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

    const scores = students.map((s) => getCandidateScore(s));
    const avgScore = totalReg > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalReg) : 0;
    const successRate = totalReg > 0 ? Math.round((qualified / totalReg) * 100) : 0;
    const failureRate = totalReg > 0 ? Math.round((eliminated / totalReg) * 100) : 0;

    const now = new Date();
    const liveCount = students.filter((s) => {
      if (!s.lastActiveTime) return false;
      const lastActive = new Date(s.lastActiveTime);
      return now.getTime() - lastActive.getTime() < 15 * 60 * 1000 && s.status === "Active";
    }).length;

    const topPerformers = [...students].sort((a, b) => getCandidateScore(b) - getCandidateScore(a)).slice(0, 5);

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

  const filteredMCQs = useMemo(() => {
    return (data.mcqQuestions || []).filter((q) => {
      const matchSearch = q.text.toLowerCase().includes(mcqSearch.toLowerCase());
      return matchSearch;
    });
  }, [data.mcqQuestions, mcqSearch]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a: DBStudent, b: DBStudent) => {
      let valA = studentSortField === "score" ? getCandidateScore(a) : (a as any)[studentSortField];
      let valB = studentSortField === "score" ? getCandidateScore(b) : (b as any)[studentSortField];
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

  const handleToggleLock = async (email: string, locked: boolean) => {
    try {
      const res = await adminUpdateStudentLock({ data: { email, locked, status: locked ? "Disqualified" : "Active" } });
      if (res.success) {
        setData((prev) => ({ ...prev, students: res.students }));
        if (selectedStudent && selectedStudent.email === email) {
          setSelectedStudent((prev) =>
            prev ? { ...prev, locked: locked, status: locked ? "Disqualified" : "Active" } : null,
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

  const handleDeleteQuestion = async (id: string) => {
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

  const handleEditMCQClick = (q: DBMCQQuestion) => {
    setEditingMcq(q);
    setMcqForm(q);
    setIsMcqModalOpen(true);
  };

  const handleAddMCQClick = () => {
    setEditingMcq(null);
    setMcqForm({
      category: "General",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      active: true,
    });
    setIsMcqModalOpen(true);
  };

  const handleSaveMCQ = async () => {
    if (!mcqForm.text || mcqForm.text.trim() === "") return;

    try {
      if (editingMcq) {
        const res = await adminUpdateMCQQuestion({
          data: { action: "edit", question: mcqForm },
        });
        if (res.success) setData((prev) => ({ ...prev, mcqQuestions: res.mcqQuestions }));
      } else {
        const res = await adminUpdateMCQQuestion({
          data: { action: "add", question: mcqForm },
        });
        if (res.success) setData((prev) => ({ ...prev, mcqQuestions: res.mcqQuestions }));
      }
      setIsMcqModalOpen(false);
    } catch (e) {
      console.error("MCQ save failed", e);
    }
  };

  const handleDeleteMCQ = async (id: string) => {
    if (!confirm("Remove this MCQ from the active pool?")) return;
    try {
      const res = await adminUpdateMCQQuestion({
        data: { action: "delete", question: { id } },
      });
      if (res.success) setData((prev) => ({ ...prev, mcqQuestions: res.mcqQuestions }));
    } catch (e) {
      console.error("MCQ deletion failed", e);
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
      <div className="h-[100dvh] overflow-hidden w-full bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-4 sm:p-6 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-black/[0.04]0 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 text-black">
          <div className="w-12 h-12 rounded-full bg-slate-950 text-black flex items-center justify-center mx-auto shadow-lg shadow-black/10 border border-black/[0.08]">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-lg font-black text-black tracking-tight">
              NexusPro Operations
            </h1>
            <p className="text-xs text-black font-semibold">
              Enter security code to authenticate terminal node.
            </p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (isAuthenticating) return;
              setIsAuthenticating(true);
              try {
                const res = await adminAuthenticate({
                  data: { password: adminPasswordInput },
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
              } finally {
                setIsAuthenticating(false);
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
                disabled={isAuthenticating}
                className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:outline-none focus:ring-1 focus:ring-slate-900 text-center font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal placeholder:text-black disabled:opacity-50"
              />
            </div>
            {authError && (
              <p className="text-[10px] text-rose-500 font-bold text-center uppercase tracking-wider">
                {authError}
              </p>
            )}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-2.5 bg-slate-950 hover:bg-black text-black rounded-xl text-xs font-black tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? "Authenticating..." : "Access Terminal"}
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-[100dvh] w-full bg-[#FDFBF7] text-slate-900 font-sans flex flex-col items-center selection:bg-indigo-500/30 p-4 md:p-6 lg:p-8">
        {/* Main Dashboard Workspace */}
        <div className="w-full max-w-[1600px] flex flex-col relative min-h-[92vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none rounded-[2rem]" />
          
          <div className="flex-1 flex flex-col relative z-10 p-4 md:p-6 lg:p-8">
          <TopNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab as any}
            setCommandPaletteOpen={setCommandPaletteOpen}
            systemMode={systemMode}
            handleLogout={async () => {
              if (confirm("Disconnect and lock terminal node?")) {
                await adminLogout();
                setIsAuthenticated(false);
              }
            }}
          >

          <main className="flex-1 pt-2 pb-8">

          {activeTab === "overview" && (
            <OverviewTab metrics={metrics} data={data} setActiveTab={setActiveTab} questionsCount={data.questions.length} />
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
            />
          )}

          {activeTab === "live" && (
            <LiveRoomTab 
              students={data.students} 
              handleToggleLock={handleToggleLock} 
            />
          )}

          {activeTab === "questions" && (
            <QuestionsTab
              questionSearch={questionSearch}
              setQuestionSearch={setQuestionSearch}
              questionCatFilter={questionCatFilter}
              setQuestionCatFilter={setQuestionCatFilter}
              filteredQuestions={filteredQuestions}
              handleBulkImportClick={() => setIsBulkModalOpen(true)}
              handleAddQuestionClick={handleAddQuestionClick}
              handleEditQuestionClick={handleEditQuestionClick}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          )}

          {activeTab === "mcq" && (
            <MCQTab
              mcqSearch={mcqSearch}
              setMcqSearch={setMcqSearch}
              filteredMCQs={filteredMCQs}
              handleAddMCQClick={handleAddMCQClick}
              handleEditMCQClick={handleEditMCQClick}
              handleDeleteMCQ={handleDeleteMCQ}
            />
          )}

          {activeTab === "leaderboard" && <StandingsTab students={data.students} />}

          {activeTab === "audit" && <AuditLogsTab securityLogs={data.securityLogs} />}

          {activeTab === "selection" && <SelectionTab data={data} config={systemConfig} />}
          {activeTab === "risk" && (
            <RiskCenterTab 
              securityLogs={data.securityLogs} 
              students={data.students} 
              handleToggleLock={handleToggleLock} 
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsTab students={data.students} metrics={metrics} data={data} />
          )}

          {activeTab === "settings" && (
            <SystemRulesTab
              sessionTimeout={sessionTimeout}
              setSessionTimeout={setSessionTimeout}
              maxWrongAttempts={maxWrongAttempts}
              setMaxWrongAttempts={setMaxWrongAttempts}
              mode={systemMode}
              setMode={setSystemMode}
              round1PassingScore={round1PassingScore}
              setRound1PassingScore={setRound1PassingScore}
              round2PassingScore={round2PassingScore}
              setRound2PassingScore={setRound2PassingScore}
              round1TimeLimit={round1TimeLimit}
              setRound1TimeLimit={setRound1TimeLimit}
              round2TimeLimit={round2TimeLimit}
              setRound2TimeLimit={setRound2TimeLimit}
              onSave={handleSaveSettings}
            />
          )}
          </main>
          </TopNavigation>
        </div>
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

      {isMcqModalOpen && (
        <MCQModal
          isOpen={isMcqModalOpen}
          setIsOpen={setIsMcqModalOpen}
          editingMCQ={editingMcq}
          mcqForm={mcqForm}
          setMcqForm={setMcqForm}
          handleSaveMCQ={handleSaveMCQ}
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

        <CommandPalette
          open={commandPaletteOpen}
          setOpen={setCommandPaletteOpen}
          setActiveTab={setActiveTab}
          handleExportCSV={handleExportCSV}
          refreshData={refreshData}
        />
    </div>
    </>
  );
}
