import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Users,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  BarChart2,
  Shield,
  Download,
  Plus,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  FileText,
  FileSpreadsheet,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sun,
  Moon,
  Globe,
  Settings,
  Database,
  Radio,
  Clock,
  Activity,
  History,
  UserCheck,
  UserX,
  PlusCircle,
  ArrowUpRight,
  FileDown
} from "lucide-react";
import {
  adminGetDashboardData,
  adminUpdateQuestion,
  adminBulkUploadQuestions,
  adminUpdateStudentLock
} from "../lib/server-fns";
import { DBStudent, DBQuestion, SecurityLog } from "../lib/db";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "NexusPro — Enterprise Control" },
      { name: "description", content: "Glassmorphic corporate dashboard for test monitoring and question pool management." }
    ]
  }),
  component: AdminDashboard,
});

type Tab = "overview" | "students" | "live" | "questions" | "leaderboard" | "audit" | "settings";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    students: DBStudent[];
    questions: DBQuestion[];
    securityLogs: SecurityLog[];
  }>({ students: [], questions: [], securityLogs: [] });

  // Student list search and filter states
  const [studentSearch, setStudentSearch] = useState("");
  const [studentDeptFilter, setStudentDeptFilter] = useState("all");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [studentPage, setStudentPage] = useState(1);
  const [studentSortField, setStudentSortField] = useState<string>("score");
  const [studentSortOrder, setStudentSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedStudent, setSelectedStudent] = useState<DBStudent | null>(null);

  // Question bank search/edit states
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCatFilter, setQuestionCatFilter] = useState("all");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<DBQuestion> | null>(null);

  // Question Form Fields
  const [wordForm, setWordForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("Artificial Intelligence");
  const [hintForm, setHintForm] = useState("");
  const [difficultyForm, setDifficultyForm] = useState<"easy" | "medium" | "hard">("medium");
  const [activeForm, setActiveForm] = useState(true);
  const [bulkJsonText, setBulkJsonText] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState(300);
  const [maxWrongAttempts, setMaxWrongAttempts] = useState(7);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await adminGetDashboardData();
      setData(res);
    } catch (e) {
      console.error("Failed to load admin dashboard data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const renderStatusBadge = (status: DBStudent["status"]) => {
    const config: Record<string, string> = {
      Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Qualified: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      Completed: "bg-violet-500/10 text-violet-500 border-violet-500/20",
      Eliminated: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      Disqualified: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    };

    return (
      <span className={`px-2.5 py-1 text-xs rounded-full font-bold border ${config[status] || "bg-slate-500/10 text-slate-500 border-slate-500/20"}`}>
        {status}
      </span>
    );
  };

  // Compute stats
  const metrics = useMemo(() => {
    const students = data.students;
    const totalReg = students.length;
    const active = students.filter(s => s.status === "Active").length;
    const eliminated = students.filter(s => s.status === "Eliminated").length;
    const qualified = students.filter(s => s.status === "Qualified" || s.status === "Completed").length;
    
    const scores = students.map(s => s.score);
    const avgScore = totalReg > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalReg) : 0;
    const successRate = totalReg > 0 ? Math.round((qualified / totalReg) * 100) : 0;
    const failureRate = totalReg > 0 ? Math.round((eliminated / totalReg) * 100) : 0;

    // Online count (last active within 15 minutes)
    const now = new Date();
    const liveCount = students.filter(s => {
      if (!s.lastActiveTime) return false;
      const lastActive = new Date(s.lastActiveTime);
      return (now.getTime() - lastActive.getTime()) < 15 * 60 * 1000 && s.status === "Active";
    }).length;

    // Standings calculation
    const topPerformers = [...students]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return {
      totalReg,
      active,
      eliminated,
      qualified,
      avgScore,
      successRate,
      failureRate,
      liveCount,
      topPerformers
    };
  }, [data.students]);

  // Unique departments for filter dropdowns
  const departments = useMemo(() => {
    const depts = new Set<string>();
    data.students.forEach(s => depts.add(s.department));
    return Array.from(depts);
  }, [data.students]);

  // Unique categories for filter dropdowns
  const categories = useMemo(() => {
    const cats = new Set<string>();
    data.questions.forEach(q => cats.add(q.category));
    return Array.from(cats);
  }, [data.questions]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return data.students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
      const matchDept = studentDeptFilter === "all" || s.department === studentDeptFilter;
      const matchStatus = studentStatusFilter === "all" || s.status === studentStatusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [data.students, studentSearch, studentDeptFilter, studentStatusFilter]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a: any, b: any) => {
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

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return data.questions.filter(q => {
      const matchSearch = q.word.toLowerCase().includes(questionSearch.toLowerCase()) ||
                          q.hint.toLowerCase().includes(questionSearch.toLowerCase());
      const matchCat = questionCatFilter === "all" || q.category === questionCatFilter;
      return matchSearch && matchCat;
    });
  }, [data.questions, questionSearch, questionCatFilter]);

  const handleExportCSV = () => {
    if (data.students.length === 0) return;
    const headers = ["Name", "Email", "Department", "Score", "Levels Completed", "Status", "Attempts"];
    const rows = data.students.map(s => [
      s.name,
      s.email,
      s.department,
      s.score,
      s.levelsCompleted,
      s.status,
      s.attempts
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    
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
        data: { email: student.email, locked: nextLockedState, status: nextStatus }
      });
      if (res.success) {
        setData(prev => ({ ...prev, students: res.students }));
        if (selectedStudent && selectedStudent.email === student.email) {
          setSelectedStudent(prev => prev ? { ...prev, locked: nextLockedState, status: nextStatus } : null);
        }
      }
    } catch (e) {
      console.error("Lock toggle failed", e);
    }
  };

  // Question CRUD handlers
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
        const res = await adminUpdateQuestion({ data: { action: "edit", question: payload } });
        if (res.success) setData(prev => ({ ...prev, questions: res.questions }));
      } else {
        const res = await adminUpdateQuestion({ data: { action: "add", question: payload } });
        if (res.success) setData(prev => ({ ...prev, questions: res.questions }));
      }
      setIsQuestionModalOpen(false);
    } catch (e) {
      console.error("Question save failed", e);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Remove this question from the active pool?")) return;
    try {
      const res = await adminUpdateQuestion({ data: { action: "delete", question: { id } } });
      if (res.success) setData(prev => ({ ...prev, questions: res.questions }));
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
        setData(prev => ({ ...prev, questions: res.questions }));
        setIsBulkModalOpen(false);
        setBulkJsonText("");
      }
    } catch (e: any) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-6 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl p-8 space-y-6 text-slate-805">
          <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto shadow-lg shadow-black/10 border border-white/20">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-lg font-black text-slate-800 tracking-tight">NexusPro Operations</h1>
            <p className="text-xs text-slate-500 font-semibold">Enter security code to authenticate terminal node.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (adminPasswordInput === "csda@10") {
                setIsAuthenticated(true);
                setAuthError("");
              } else {
                setAuthError("Credential mismatch. Access denied.");
              }
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                required
                placeholder="••••••"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 text-center font-mono tracking-widest"
              />
            </div>
            {authError && (
              <p className="text-[10px] text-rose-500 font-bold text-center uppercase tracking-wider">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-md"
            >
              Access Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-6 md:p-10 font-sans flex items-center justify-center">
      
      {/* CENTRAL GLASS PANEL SHELL */}
      <div className="w-full max-w-7-xl min-h-[85vh] bg-white/35 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[32px] overflow-hidden flex flex-col md:flex-row">
        
        {/* SIDEBAR NAVIGATION CARD */}
        <aside className="w-full md:w-64 bg-white/40 p-6 flex flex-col justify-between border-r border-[#E5EAE9]/80 shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="w-7 h-7 rounded bg-slate-950 flex items-center justify-center font-bold text-white tracking-widest text-xs border border-white/10">
                NP
              </div>
              <h1 className="font-extrabold text-slate-800 text-base tracking-tight leading-none">NexusPro</h1>
            </div>

            <nav className="space-y-1">
              {[
                { id: "overview", label: "Dashboard", icon: BarChart2 },
                { id: "students", label: "Candidates", icon: Users },
                { id: "live", label: "Live Room", icon: Radio },
                { id: "questions", label: "Questions", icon: BookOpen },
                { id: "leaderboard", label: "Standings", icon: TrendingUp },
                { id: "audit", label: "Security Logs", icon: History },
                { id: "settings", label: "System Rules", icon: Settings },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setStudentPage(1);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
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
          
          <div className="text-[10px] font-bold text-slate-400/80 px-2 tracking-wider">
            SYSTEM ENGINE v1.2
          </div>
        </aside>

        {/* MAIN PANEL CONTENT WINDOW */}
        <main className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-x-hidden">
          
          {/* TOP HEADER SECTION */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <p className="text-[11px] font-extrabold text-teal-800 tracking-wider">Welcome back, Admin 👋</p>
              <h2 className="text-2xl font-extrabold text-slate-800 capitalize leading-tight">{activeTab}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-full bg-white/60 hover:bg-white text-slate-600 shadow-sm border border-slate-200/30 transition-all relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              </button>
              
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

          {/* DYNAMIC TAB CONTROLS */}

          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column Layout */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Card 1: Next scheduled session (Active Monitor Preview) */}
                  <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 tracking-wider">ACTIVE INTENSIVE SESSION</span>
                      <span className="text-[10px] font-extrabold text-teal-700 bg-teal-500/10 px-2 py-0.5 rounded-full">MONITORING</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Radio className="w-6 h-6 text-teal-700 animate-pulse" />
                        <div>
                          <p className="text-xs font-extrabold text-slate-500">Live Active Room</p>
                          <p className="text-sm font-black text-slate-800">{metrics.liveCount} Candidates Trialing</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab("live")}
                        className="text-[10px] font-black text-teal-700 flex items-center gap-1 hover:underline"
                      >
                        VIEW ROOM <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Standings (Top Candidates Table) */}
                  <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">Top Performers Standings</h3>
                      <button 
                        onClick={() => setActiveTab("leaderboard")}
                        className="text-[10px] font-black text-teal-700 hover:underline"
                      >
                        View all
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="text-slate-400/80 font-bold border-b border-slate-100 pb-2">
                            <th className="pb-2">RANK</th>
                            <th className="pb-2">CANDIDATE</th>
                            <th className="pb-2">DEPARTMENT</th>
                            <th className="pb-2 text-right">SCORE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
                          {metrics.topPerformers.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-4 text-center text-slate-400 font-medium">No candidates registered.</td>
                            </tr>
                          ) : (
                            metrics.topPerformers.map((s, idx) => (
                              <tr key={s.email} className="hover:bg-slate-50/20">
                                <td className="py-3 text-slate-400">#{idx + 1}</td>
                                <td className="py-3">{s.name}</td>
                                <td className="py-3 text-slate-500 font-semibold">{s.department}</td>
                                <td className="py-3 text-right text-teal-700 font-black">{s.score} pts</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column Layout */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Card 1: Statistical Summary (Victory, Draw, Lost Equivalents) */}
                  <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">General Statistics</h3>
                      <span className="text-[10px] font-bold text-teal-700">COMPLETION RATE</span>
                    </div>

                    {/* Progress Bar (Teal indicator) */}
                    <div className="space-y-2">
                      <div className="w-full bg-[#E5EAE9] h-2.5 rounded-full overflow-hidden flex">
                        <div style={{ width: `${metrics.successRate}%` }} className="bg-gradient-to-r from-teal-600 to-teal-800 h-full" />
                        <div style={{ width: `${metrics.failureRate}%` }} className="bg-rose-500/80 h-full" />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold pt-2">
                        <div>
                          <p className="text-slate-400 text-[10px] tracking-wider uppercase">Average</p>
                          <p className="text-slate-800 text-sm font-black">{metrics.avgScore}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] tracking-wider uppercase">Success</p>
                          <p className="text-teal-700 text-sm font-black">{metrics.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] tracking-wider uppercase">Eliminated</p>
                          <p className="text-rose-500 text-sm font-black">{metrics.failureRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Grid of 4 Small Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Intake Total", value: metrics.totalReg, color: "bg-[#7B2CBF]/10 text-[#7B2CBF]", icon: Users },
                      { label: "Pool Size", value: data.questions.length, color: "bg-[#E07A5F]/10 text-[#E07A5F]", icon: BookOpen },
                      { label: "Success Ratios", value: `${metrics.successRate}%`, color: "bg-[#2A9D8F]/10 text-[#2A9D8F]", icon: UserCheck },
                      { label: "Live Nodes", value: metrics.liveCount, color: "bg-teal-700/10 text-teal-700", icon: Radio },
                    ].map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-4 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">{stat.label}</p>
                            <p className="text-sm font-black text-slate-800 mt-1">{stat.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card 3: Promo Teal Control Banner */}
                  <div className="bg-[#1A4B40] rounded-2xl p-5 text-white flex justify-between items-center relative overflow-hidden shadow-md shadow-[#1A4B40]/10">
                    <div className="space-y-2 z-10">
                      <span className="text-[10px] font-bold text-[#A8D3CA] uppercase tracking-wider">SYSTEM CONFIG</span>
                      <h4 className="font-extrabold text-sm leading-snug">Chamber Trial Rules & Control</h4>
                      <button 
                        onClick={() => setActiveTab("settings")}
                        className="bg-white text-[#1A4B40] hover:bg-slate-100 px-4 py-1.5 rounded-lg text-[10px] font-extrabold transition-all shadow-sm"
                      >
                        Adjust rules
                      </button>
                    </div>
                    {/* Decorative blurred circles matching standard CoachPro background designs */}
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-[#2A6557]/45 blur-lg" />
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATE REGISTERS */}
          {activeTab === "students" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidate name or email..."
                    value={studentSearch}
                    onChange={e => { setStudentSearch(e.target.value); setStudentPage(1); }}
                    className="w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
                  />
                </div>

                <div className="flex gap-2.5 w-full md:w-auto">
                  <select
                    value={studentDeptFilter}
                    onChange={e => { setStudentDeptFilter(e.target.value); setStudentPage(1); }}
                    className="px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>

                  <select
                    value={studentStatusFilter}
                    onChange={e => { setStudentStatusFilter(e.target.value); setStudentPage(1); }}
                    className="px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Completed">Completed</option>
                    <option value="Eliminated">Eliminated</option>
                    <option value="Disqualified">Disqualified</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="p-2.5 rounded-xl border border-slate-200/50 bg-white/70 hover:bg-white text-slate-600 shadow-sm transition-all"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20">
                        <th className="p-4">Name</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Completed</th>
                        <th className="p-4">Score</th>
                        <th className="p-4">Attempts</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Access Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
                      {paginatedStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">No records found.</td>
                        </tr>
                      ) : (
                        paginatedStudents.map(student => (
                          <tr
                            key={student.email}
                            onClick={() => setSelectedStudent(student)}
                            className="cursor-pointer hover:bg-slate-50/40 transition-colors"
                          >
                            <td className="p-4">
                              <div>
                                <p className="font-extrabold text-slate-800">{student.name}</p>
                                <p className="text-[10px] text-slate-400 font-semibold">{student.email}</p>
                              </div>
                            </td>
                            <td className="p-4 font-semibold text-slate-500">{student.department}</td>
                            <td className="p-4 font-semibold">{student.levelsCompleted} / 7</td>
                            <td className="p-4 text-teal-800 font-black">{student.score}</td>
                            <td className="p-4 font-mono font-semibold">{student.attempts}</td>
                            <td className="p-4">{renderStatusBadge(student.status)}</td>
                            <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => handleToggleLock(student)}
                                className={`px-3 py-1.5 rounded-lg border text-[10px] font-black flex items-center gap-1.5 ml-auto transition-all ${
                                  student.locked
                                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                                }`}
                              >
                                {student.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                {student.locked ? "UNLOCK" : "DISQUALIFY"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {sortedStudents.length > 8 && (
                  <div className="p-4 flex justify-between items-center border-t border-slate-100 text-xs font-bold text-slate-500 bg-slate-50/10">
                    <p>Showing {(studentPage - 1) * 8 + 1}-{Math.min(studentPage * 8, sortedStudents.length)} of {sortedStudents.length} candidates</p>
                    <div className="flex gap-2">
                      <button
                        disabled={studentPage === 1}
                        onClick={() => setStudentPage(prev => Math.max(1, prev - 1))}
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={studentPage * 8 >= sortedStudents.length}
                        onClick={() => setStudentPage(prev => prev + 1)}
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: LIVE MONITORING */}
          {activeTab === "live" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.students.filter(s => s.status === "Active").length === 0 ? (
                  <div className="col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-350 rounded-2xl">
                    No active student trial sessions currently running.
                  </div>
                ) : (
                  data.students.filter(s => s.status === "Active").map(student => (
                    <div
                      key={student.email}
                      className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-800 leading-snug">{student.name}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{student.department}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-extrabold border border-emerald-500/20">LIVE</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs leading-relaxed border-t border-slate-100 pt-3 text-slate-600 font-bold">
                        <div>
                          <p className="text-[10px] text-slate-400">Current Level</p>
                          <p className="text-slate-800 font-black">Level {student.currentLevel} of 7</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Trial Score</p>
                          <p className="text-teal-700 font-black">{student.score} pts</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Attempts / Wrong</p>
                          <p className="text-slate-800 font-black">{student.attempts} / {student.wrongAnswersCount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Last Ping</p>
                          <p className="font-mono text-[10px] text-slate-400">
                            {student.lastActiveTime ? new Date(student.lastActiveTime).toLocaleTimeString() : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] text-slate-400">Guess Vectors</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {student.currentGuesses.length === 0 ? (
                            <span className="text-[10px] text-slate-400 italic">No inputs guessed</span>
                          ) : (
                            student.currentGuesses.map((g, idx) => (
                              <span key={idx} className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-black font-mono text-[10px] text-slate-700">{g}</span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: QUESTIONS BANK */}
          {activeTab === "questions" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search word or clue hint..."
                    value={questionSearch}
                    onChange={e => setQuestionSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
                  />
                </div>

                <div className="flex gap-2.5 w-full md:w-auto">
                  <select
                    value={questionCatFilter}
                    onChange={e => setQuestionCatFilter(e.target.value)}
                    className="px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredQuestions.map(q => (
                  <div
                    key={q.id}
                    className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-800 text-[9px] font-extrabold border border-teal-500/20">{q.category}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${
                            q.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                            q.difficulty === "medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          }`}>{q.difficulty}</span>
                        </div>

                        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
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

                      <h4 className="font-mono text-base font-black tracking-widest text-slate-800 uppercase">{q.word}</h4>
                      <p className="text-xs font-semibold leading-relaxed text-slate-400">{q.hint}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: STANDINGS */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20">
                      <th className="p-4">Rank</th>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Accuracy</th>
                      <th className="p-4 text-right">Trial Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
                    {data.students.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">No candidates recorded.</td>
                      </tr>
                    ) : (
                      data.students.sort((a, b) => b.score - a.score).map((student, idx) => (
                        <tr key={student.email} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 font-black text-slate-400">#{idx + 1}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-extrabold text-slate-800">{student.name}</p>
                              <p className="text-[9px] text-slate-400 font-semibold">{student.email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-slate-500 font-semibold">{student.department}</td>
                          <td className="p-4 text-emerald-600">
                            {student.attempts > 0 ? Math.round(((student.levelsCompleted || 1) / (student.attempts || 1)) * 100) : 0}%
                          </td>
                          <td className="p-4 text-right text-teal-800 font-black">{student.score} pts</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SECURITY LOGS */}
          {activeTab === "audit" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300">
              <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20">
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Candidate Target</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Details Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
                    {data.securityLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4 font-mono text-slate-400 text-[10px]">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-4 text-slate-700">{log.action}</td>
                        <td className="p-4 text-slate-500 font-semibold">{log.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${
                            log.status === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                            log.status === "suspicious" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          }`}>{log.status}</span>
                        </td>
                        <td className="p-4 text-slate-450 font-medium max-w-xs truncate">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 flex-1 animate-in fade-in duration-300 max-w-3xl">
              <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4">
                <h3 className="font-extrabold text-xs text-slate-400 tracking-wide uppercase">General Rule Matrix</h3>
                
                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-500 mb-1.5">Timeout Limit per Level (seconds)</label>
                    <input
                      type="number"
                      value={sessionTimeout}
                      onChange={e => setSessionTimeout(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1.5">Maximum Guesses Lives</label>
                    <input
                      type="number"
                      value={maxWrongAttempts}
                      onChange={e => setMaxWrongAttempts(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* COMPONENT: DETAILED STUDENT DRAWER OVERLAY */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md h-screen bg-[#FCFDFD]/95 backdrop-blur-xl border-l border-slate-200/80 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-350 text-slate-800">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider">Candidate File</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-black text-slate-600 transition-all"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-800 flex items-center justify-center font-bold text-white text-base">
                    {selectedStudent.name.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-850 leading-tight">{selectedStudent.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 border border-slate-150 rounded-2xl grid grid-cols-2 gap-4 text-xs font-bold leading-relaxed">
                  <div>
                    <p className="text-[10px] text-slate-400">Department</p>
                    <p className="text-slate-850">{selectedStudent.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Trial Score</p>
                    <p className="text-teal-700 font-black">{selectedStudent.score} pts</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Completed</p>
                    <p className="text-slate-800">{selectedStudent.levelsCompleted} of 7</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Status</p>
                    <p className="text-slate-800">{selectedStudent.status}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">Candidate Action History</h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {data.securityLogs.filter(log => log.email === selectedStudent.email).map(log => (
                      <div key={log.id} className="p-3 border border-slate-100 bg-white/60 rounded-xl text-xs leading-relaxed font-semibold">
                        <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1">
                          <span>{log.action}</span>
                          <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-slate-600 font-semibold">{log.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleToggleLock(selectedStudent)}
              className={`w-full py-2.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                selectedStudent.locked
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
              }`}
            >
              {selectedStudent.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              {selectedStudent.locked ? "RELEASE LOCK" : "DISQUALIFY"}
            </button>
          </div>
        </div>
      )}

      {/* MODAL: CREATE OR EDIT SINGLE QUESTION */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">{editingQuestion ? "Edit Trial Word" : "Inject Trial Word"}</h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveQuestion} className="p-5 space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block text-slate-500 mb-1.5">Target Word (Hangman Answer)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TRANSFORMER"
                  value={wordForm}
                  onChange={e => setWordForm(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl uppercase tracking-widest font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1.5">Category</label>
                <select
                  value={categoryForm}
                  onChange={e => setCategoryForm(e.target.value)}
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
                  {["easy", "medium", "hard"].map(diff => (
                    <label key={diff} className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        checked={difficultyForm === diff}
                        onChange={() => setDifficultyForm(diff as any)}
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
                  onChange={e => setHintForm(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl leading-relaxed text-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activeForm"
                  checked={activeForm}
                  onChange={e => setActiveForm(e.target.checked)}
                  className="rounded border-slate-300 text-teal-700 focus:ring-teal-700 h-4 w-4"
                />
                <label htmlFor="activeForm" className="text-slate-500 select-none cursor-pointer">Enable immediately in question pool</label>
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
      )}

      {/* MODAL: BULK JSON IMPORT */}
      {isBulkModalOpen && (
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
            <form onSubmit={handleBulkUpload} className="p-5 space-y-4 text-xs font-bold text-slate-700">
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
                  onChange={e => setBulkJsonText(e.target.value)}
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
      )}

    </div>
  );
}
