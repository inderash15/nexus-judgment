import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useTheme } from "./ThemeProvider-wFmpNBr2.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as adminGetDashboardData, c as adminUpdateQuestion, d as cn, i as adminCheckSession, l as adminUpdateStudentLock, n as adminAuthenticate, o as adminLogout, p as getSystemConfigData, r as adminBulkUploadQuestions, s as adminUpdateMCQQuestion, t as ScrollArea, u as adminUpdateSystemConfig } from "./scroll-area-BzFcnQzi.mjs";
import { A as Lock, C as Plus, E as Moon, F as Hammer, J as ChevronLeft, L as FileDown, N as History, O as Menu, Q as BookOpen, S as Radio, Z as ChartNoAxesColumn, _ as Shield, a as Users, c as UserCheck, d as TrendingUp, f as Trash2, h as SquarePen, j as LockOpen, m as Sun, n as X, q as ChevronRight, tt as ArrowUpRight, v as Settings, y as Search } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C5mbPMf1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle({ className = "" }) {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: toggleTheme,
		className: `p-2.5 rounded-full bg-white/60 hover:bg-white text-slate-600 shadow-sm border border-slate-200/30 transition-all cursor-pointer ${className}`,
		title: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
	});
}
function OverviewTab({ metrics, data, setActiveTab, questionsCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-slate-400 tracking-wider",
							children: "ACTIVE INTENSIVE SESSION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-extrabold text-teal-700 bg-teal-500/10 px-2 py-0.5 rounded-full",
							children: "MONITORING"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-6 h-6 text-teal-700 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-slate-500",
								children: "Live Active Room"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-black text-slate-800",
								children: [metrics.liveCount, " Candidates Trialing"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("live"),
							className: "text-[10px] font-black text-teal-700 flex items-center gap-1 hover:underline",
							children: ["VIEW ROOM ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-xs text-slate-400 tracking-wide uppercase",
							children: "Top Performers Standings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab("leaderboard"),
							className: "text-[10px] font-black text-teal-700 hover:underline",
							children: "View all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-slate-400/80 font-bold border-b border-slate-100 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "RANK"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "CANDIDATE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "DEPARTMENT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 text-right",
										children: "SCORE"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-100/50 text-slate-700 font-bold",
								children: metrics.topPerformers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "py-4 text-center text-slate-400 font-medium",
									children: "No candidates registered."
								}) }) : metrics.topPerformers.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-50/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 text-slate-400",
											children: ["#", idx + 1]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: s.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-slate-500 font-semibold",
											children: s.department
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 text-right text-teal-700 font-black",
											children: [s.score, " pts"]
										})
									]
								}, s.email))
							})]
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-xs text-slate-400 tracking-wide uppercase",
								children: "General Statistics"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-teal-700",
								children: "COMPLETION RATE"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full bg-[#E5EAE9] h-2.5 rounded-full overflow-hidden flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { width: `${metrics.successRate}%` },
									className: "bg-gradient-to-r from-teal-600 to-teal-800 h-full"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { width: `${metrics.failureRate}%` },
									className: "bg-rose-500/80 h-full"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 text-center text-xs font-extrabold pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400 text-[10px] tracking-wider uppercase",
										children: "Average"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-800 text-sm font-black",
										children: metrics.avgScore
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400 text-[10px] tracking-wider uppercase",
										children: "Success"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-teal-700 text-sm font-black",
										children: [metrics.successRate, "%"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-400 text-[10px] tracking-wider uppercase",
										children: "Eliminated"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-rose-500 text-sm font-black",
										children: [metrics.failureRate, "%"]
									})] })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4",
						children: [
							{
								label: "Intake Total",
								value: metrics.totalReg,
								color: "bg-[#7B2CBF]/10 text-[#7B2CBF]",
								icon: Users
							},
							{
								label: "Pool Size",
								value: questionsCount,
								color: "bg-[#E07A5F]/10 text-[#E07A5F]",
								icon: BookOpen
							},
							{
								label: "Success Ratios",
								value: `${metrics.successRate}%`,
								color: "bg-[#2A9D8F]/10 text-[#2A9D8F]",
								icon: UserCheck
							},
							{
								label: "Live Nodes",
								value: metrics.liveCount,
								color: "bg-teal-700/10 text-teal-700",
								icon: Radio
							}
						].map((stat, idx) => {
							const Icon = stat.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${stat.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none",
									children: stat.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-black text-slate-800 mt-1",
									children: stat.value
								})] })]
							}, idx);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#1A4B40] rounded-2xl p-5 text-white flex justify-between items-center relative overflow-hidden shadow-md shadow-[#1A4B40]/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-[#A8D3CA] uppercase tracking-wider",
									children: "SYSTEM CONFIG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-extrabold text-sm leading-snug",
									children: "Chamber Trial Rules & Control"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("settings"),
									className: "bg-white text-[#1A4B40] hover:bg-slate-100 px-4 py-1.5 rounded-lg text-[10px] font-extrabold transition-all shadow-sm",
									children: "Adjust rules"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-[#2A6557]/45 blur-lg" })]
					})
				]
			})]
		})
	});
}
function CandidatesTab({ studentSearch, setStudentSearch, studentDeptFilter, setStudentDeptFilter, studentStatusFilter, setStudentStatusFilter, departments, sortedStudents, paginatedStudents, studentPage, setStudentPage, handleExportCSV, handleToggleLock, setSelectedStudent, renderStatusBadge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search candidate name or email...",
					value: studentSearch,
					onChange: (e) => {
						setStudentSearch(e.target.value);
						setStudentPage(1);
					},
					className: "w-full pl-9 pr-4 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 sm:gap-2.5 w-full sm:w-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: studentDeptFilter,
						onChange: (e) => {
							setStudentDeptFilter(e.target.value);
							setStudentPage(1);
						},
						className: "px-3 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All Departments"
						}), departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d,
							children: d
						}, d))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: studentStatusFilter,
						onChange: (e) => {
							setStudentStatusFilter(e.target.value);
							setStudentPage(1);
						},
						className: "px-3 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Active",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Qualified",
								children: "Qualified"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Completed",
								children: "Completed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Eliminated",
								children: "Eliminated"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Disqualified",
								children: "Disqualified"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleExportCSV,
						className: "p-2.5 min-h-[44px] min-w-[44px] rounded-xl border border-slate-200/50 bg-white/70 hover:bg-white text-slate-600 shadow-sm transition-all flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "w-4 h-4" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Department"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Completed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Attempts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4 text-right",
								children: "Access Controls"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-100/50 text-slate-700 font-bold",
						children: paginatedStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "p-8 text-center text-slate-400",
							children: "No records found."
						}) }) : paginatedStudents.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => setSelectedStudent(student),
							className: "cursor-pointer hover:bg-slate-50/40 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold text-slate-800",
										children: student.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-400 font-semibold",
										children: student.email
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 font-semibold text-slate-500",
									children: student.department
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4 font-semibold",
									children: [student.levelsCompleted, " / 3"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-teal-800 font-black",
									children: student.score
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 font-mono font-semibold",
									children: student.attempts
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: renderStatusBadge(student.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleToggleLock(student),
										className: `px-3 py-1.5 rounded-lg border text-[10px] font-black flex items-center gap-1.5 ml-auto transition-all ${student.locked ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20" : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"}`,
										children: [student.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-3 h-3" }), student.locked ? "UNLOCK" : "DISQUALIFY"]
									})
								})
							]
						}, student.email))
					})]
				})
			}), sortedStudents.length > 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex justify-between items-center border-t border-slate-100 text-xs font-bold text-slate-500 bg-slate-50/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Showing ",
					(studentPage - 1) * 8 + 1,
					"-",
					Math.min(studentPage * 8, sortedStudents.length),
					" ",
					"of ",
					sortedStudents.length,
					" candidates"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: studentPage === 1,
						onClick: () => setStudentPage((prev) => Math.max(1, prev - 1)),
						className: "p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: studentPage * 8 >= sortedStudents.length,
						onClick: () => setStudentPage((prev) => prev + 1),
						className: "p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
					})]
				})]
			})]
		})]
	});
}
function LiveRoomTab({ students }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
			children: students.filter((s) => s.status === "Active").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-350 rounded-2xl",
				children: "No active student trial sessions currently running."
			}) : students.filter((s) => s.status === "Active").map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-extrabold text-sm text-slate-800 leading-snug",
							children: student.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-slate-400 font-semibold",
							children: student.department
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-extrabold border border-emerald-500/20",
							children: "LIVE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 text-xs leading-relaxed border-t border-slate-100 pt-3 text-slate-600 font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500 mb-0.5",
									children: "Current Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-slate-800 font-black",
									children: [
										"Level ",
										student.currentLevel,
										" of 3"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400",
								children: "Trial Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-teal-700 font-black",
								children: [student.score, " pts"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400",
								children: "Attempts / Wrong"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-slate-800 font-black",
								children: [
									student.attempts,
									" / ",
									student.wrongAnswersCount
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400",
								children: "Last Ping"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] text-slate-400",
								children: student.lastActiveTime ? new Date(student.lastActiveTime).toLocaleTimeString() : "N/A"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-400",
							children: "Guess Vectors"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5 flex-wrap",
							children: student.currentGuesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-slate-400 italic",
								children: "No inputs guessed"
							}) : student.currentGuesses.map((g, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-black font-mono text-[10px] text-slate-700",
								children: g
							}, idx))
						})]
					})
				]
			}, student.email))
		})
	});
}
function QuestionsTab({ questionSearch, setQuestionSearch, questionCatFilter, setQuestionCatFilter, categories, filteredQuestions, setIsBulkModalOpen, handleAddQuestionClick, handleEditQuestionClick, handleDeleteQuestion }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search word or clue hint...",
					value: questionSearch,
					onChange: (e) => setQuestionSearch(e.target.value),
					className: "w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: questionCatFilter,
						onChange: (e) => setQuestionCatFilter(e.target.value),
						className: "px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All Categories"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsBulkModalOpen(true),
						className: "px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-600 bg-white/70 hover:bg-white transition-all",
						children: "Bulk Import"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleAddQuestionClick,
						className: "px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-xl text-xs font-extrabold tracking-wide hover:shadow-lg transition-all",
						children: "Add Question"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
			children: filteredQuestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col justify-between space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-800 text-[9px] font-extrabold border border-teal-500/20",
									children: q.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${q.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : q.difficulty === "medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"}`,
									children: q.difficulty
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleEditQuestionClick(q),
									className: "p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteQuestion(q.id),
									className: "p-1 rounded hover:bg-rose-50 text-rose-500 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-mono text-base font-black tracking-widest text-slate-800 uppercase",
							children: q.word
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold leading-relaxed text-slate-400",
							children: q.hint
						})
					]
				})
			}, q.id))
		})]
	});
}
function StandingsTab({ students }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Rank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Candidate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Department"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Accuracy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4 text-right",
								children: "Trial Score"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-100/50 text-slate-700 font-bold",
						children: students.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "p-8 text-center text-slate-400",
							children: "No candidates recorded."
						}) }) : students.sort((a, b) => b.score - a.score).map((student, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-50/40 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4 font-black text-slate-400",
									children: ["#", idx + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold text-slate-800",
										children: student.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-slate-400 font-semibold",
										children: student.email
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-slate-500 font-semibold",
									children: student.department
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4 text-emerald-600",
									children: [student.attempts > 0 ? Math.round((student.levelsCompleted || 1) / (student.attempts || 1) * 100) : 0, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4 text-right text-teal-800 font-black",
									children: [student.score, " pts"]
								})
							]
						}, student.email))
					})]
				})
			})
		})
	});
}
function AuditLogsTab({ securityLogs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Timestamp"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Candidate Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Details Summary"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-100/50 text-slate-700 font-bold",
						children: securityLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-50/40 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 font-mono text-slate-400 text-[10px]",
									children: new Date(log.timestamp).toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-slate-700",
									children: log.action
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-slate-500 font-semibold",
									children: log.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${log.status === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : log.status === "suspicious" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"}`,
										children: log.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-slate-450 font-medium max-w-xs truncate",
									children: log.details
								})
							]
						}, log.id))
					})]
				})
			})
		})
	});
}
function SystemRulesTab({ sessionTimeout, setSessionTimeout, maxWrongAttempts, setMaxWrongAttempts, mode, setMode, round1PassingScore, setRound1PassingScore, round2PassingScore, setRound2PassingScore, round1TimeLimit, setRound1TimeLimit, round2TimeLimit, setRound2TimeLimit, onSave }) {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleCommit = async () => {
		setSaving(true);
		try {
			await onSave();
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300 max-w-3xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-slate-100 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5 text-slate-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-extrabold text-sm text-slate-800 tracking-wide uppercase",
						children: "Global Operation Matrix"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-bold text-slate-500 uppercase tracking-wider",
						children: "System Operation Mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-3",
						children: [
							{
								id: "normal",
								label: "Normal Mode",
								icon: Shield,
								desc: "Challenges are active and registrations are normal.",
								color: "border-teal-200 bg-teal-50/20 text-teal-700",
								activeColor: "border-teal-500 bg-teal-500/10 text-teal-800"
							},
							{
								id: "workshop",
								label: "Workshop Mode",
								icon: Radio,
								desc: "Optimal mode for active workshops. Leaderboards and live room monitor active.",
								color: "border-indigo-200 bg-indigo-50/20 text-indigo-700",
								activeColor: "border-indigo-500 bg-indigo-500/10 text-indigo-800"
							},
							{
								id: "maintenance",
								label: "Maintenance Mode",
								icon: Hammer,
								desc: "Students blocked. Only admins can access dashboard terminals.",
								color: "border-rose-200 bg-rose-50/20 text-rose-700",
								activeColor: "border-rose-500 bg-rose-500/10 text-rose-800"
							}
						].map((opt) => {
							const Icon = opt.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMode(opt.id),
								className: `p-4 border rounded-xl text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer ${mode === opt.id ? opt.activeColor + " ring-1 ring-offset-1 ring-slate-400" : "border-slate-200 bg-white/40 hover:border-slate-300 hover:bg-slate-50/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-xs",
										children: opt.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-500 font-medium leading-relaxed",
									children: opt.desc
								})]
							}, opt.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Timeout Limit per Level (seconds)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 10,
							max: 600,
							value: sessionTimeout,
							onChange: (e) => setSessionTimeout(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Maximum Guess Lives (Elimination Threshold)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 10,
							value: maxWrongAttempts,
							onChange: (e) => setMaxWrongAttempts(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Round 1 Passing Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: round1PassingScore,
							onChange: (e) => setRound1PassingScore(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Round 2 Passing Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: round2PassingScore,
							onChange: (e) => setRound2PassingScore(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Round 1 Time Limit (s)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 10,
							value: round1TimeLimit,
							onChange: (e) => setRound1TimeLimit(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-slate-500 mb-1.5 font-bold uppercase tracking-wider text-[10px]",
							children: "Round 2 Time Limit (s)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 10,
							value: round2TimeLimit,
							onChange: (e) => setRound2TimeLimit(Number(e.target.value)),
							className: "w-full p-2.5 bg-slate-50/40 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-slate-100 pt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleCommit,
						disabled: saving,
						className: "px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50",
						children: saving ? "Saving Matrix..." : "Save Configuration Matrix"
					})
				})
			]
		})
	});
}
function StudentDrawer({ selectedStudent, setSelectedStudent, data, handleToggleLock }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md h-[100dvh] overflow-y-auto bg-[#FCFDFD]/95 backdrop-blur-xl border-l border-slate-200/80 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-350 text-slate-800",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center border-b border-slate-100 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-extrabold text-sm text-slate-400 uppercase tracking-wider",
						children: "Candidate File"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedStudent(null),
						className: "px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-black text-slate-600 transition-all",
						children: "✕ CLOSE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-full bg-teal-800 flex items-center justify-center font-bold text-white text-base",
								children: selectedStudent.name.slice(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-extrabold text-base text-slate-850 leading-tight",
								children: selectedStudent.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 font-semibold",
								children: selectedStudent.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50/50 p-4 border border-slate-150 rounded-2xl grid grid-cols-2 gap-4 text-xs font-bold leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400",
									children: "Department"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-850",
									children: selectedStudent.department
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400",
									children: "Trial Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-teal-700 font-black",
									children: [selectedStudent.score, " pts"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-50 p-4 rounded-xl border border-slate-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1",
										children: "Levels Cleared"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-slate-800",
										children: [selectedStudent.levelsCompleted, " of 3"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-800",
									children: selectedStudent.status
								})] })
							]
						}),
						selectedStudent.promptStrength !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50/50 p-4 border border-slate-150 rounded-2xl space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-extrabold text-slate-400 uppercase tracking-wide",
										children: "Prompt Strength"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-black text-slate-850 mt-0.5",
										children: [selectedStudent.promptStrength, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-slate-400 font-bold",
											children: "/100"
										})]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${(selectedStudent.promptStrength || 0) >= 70 ? "text-emerald-700 border-emerald-500/30 bg-emerald-500/10" : (selectedStudent.promptStrength || 0) >= 40 ? "text-amber-700 border-amber-500/30 bg-amber-500/10" : "text-rose-700 border-rose-500/30 bg-rose-500/10"}`,
										children: (selectedStudent.promptStrength || 0) >= 70 ? "Strong" : (selectedStudent.promptStrength || 0) >= 40 ? "Moderate" : "Weak"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-2 bg-slate-200 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full ${(selectedStudent.promptStrength || 0) >= 70 ? "bg-emerald-500" : (selectedStudent.promptStrength || 0) >= 40 ? "bg-amber-500" : "bg-rose-500"}`,
										style: { width: `${Math.max(0, Math.min(100, selectedStudent.promptStrength || 0))}%` }
									})
								}),
								selectedStudent.promptTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 font-bold",
									children: "Given Topic"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-700 font-semibold leading-relaxed",
									children: selectedStudent.promptTitle
								})] }),
								selectedStudent.promptText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 font-bold",
									children: "Submitted Prompt"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-600 font-semibold leading-relaxed bg-white/70 border border-slate-100 rounded-xl p-2.5",
									children: selectedStudent.promptText
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] font-extrabold text-slate-400 uppercase tracking-wide",
								children: "Candidate Action History"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
								className: "h-56 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: data.securityLogs.filter((log) => log.email === selectedStudent.email).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 border border-slate-100 bg-white/60 rounded-xl text-xs leading-relaxed font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-[9px] text-slate-400 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: log.action }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono",
												children: new Date(log.timestamp).toLocaleTimeString()
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-slate-600 font-semibold",
											children: log.details
										})]
									}, log.id))
								})
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => handleToggleLock(selectedStudent),
				className: `w-full py-2.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all ${selectedStudent.locked ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20" : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"}`,
				children: [selectedStudent.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-4 h-4" }), selectedStudent.locked ? "RELEASE LOCK" : "DISQUALIFY"]
			})]
		})
	});
}
function QuestionModal({ isQuestionModalOpen, setIsQuestionModalOpen, editingQuestion, wordForm, setWordForm, categoryForm, setCategoryForm, hintForm, setHintForm, difficultyForm, setDifficultyForm, activeForm, setActiveForm, handleSaveQuestion }) {
	if (!isQuestionModalOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-b border-slate-100 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-sm text-slate-800",
					children: editingQuestion ? "Edit Trial Word" : "Inject Trial Word"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsQuestionModalOpen(false),
					className: "text-slate-400 hover:text-slate-650 font-bold text-sm",
					children: "✕"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSaveQuestion,
				className: "p-5 space-y-4 text-xs font-bold text-slate-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-slate-500 mb-1.5",
						children: "Target Word (Hangman Answer)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						required: true,
						placeholder: "e.g. TRANSFORMER",
						value: wordForm,
						onChange: (e) => setWordForm(e.target.value),
						className: "w-full p-2.5 border border-slate-200 rounded-xl uppercase tracking-widest font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-700"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-slate-500 mb-1.5",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: categoryForm,
						onChange: (e) => setCategoryForm(e.target.value),
						className: "w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Artificial Intelligence",
								children: "Artificial Intelligence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Machine Learning",
								children: "Machine Learning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Data Science",
								children: "Data Science"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Programming",
								children: "Programming"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Logical Reasoning",
								children: "Logical Reasoning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Mathematics",
								children: "Mathematics"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Cyber Security",
								children: "Cyber Security"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Generative AI",
								children: "Generative AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "RAG Systems",
								children: "RAG Systems"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "AI Agents",
								children: "AI Agents"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Operating Systems",
								children: "Operating Systems"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Networking",
								children: "Networking"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Algorithms",
								children: "Algorithms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Aptitude",
								children: "Aptitude"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Problem Solving",
								children: "Problem Solving"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Advanced Technical Concepts",
								children: "Advanced Technical Concepts"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-slate-500 mb-1.5",
						children: "Difficulty"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4",
						children: [
							"easy",
							"medium",
							"hard"
						].map((diff) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-1.5 font-bold cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "difficulty",
								checked: difficultyForm === diff,
								onChange: () => setDifficultyForm(diff),
								className: "text-teal-750 focus:ring-teal-700"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: diff
							})]
						}, diff))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-slate-500 mb-1.5",
						children: "Guardian Clue / Hint Text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 3,
						placeholder: "Explain details of this technology or clue.",
						value: hintForm,
						onChange: (e) => setHintForm(e.target.value),
						className: "w-full p-2.5 border border-slate-200 rounded-xl leading-relaxed text-slate-800 focus:outline-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "activeForm",
							checked: activeForm,
							onChange: (e) => setActiveForm(e.target.checked),
							className: "rounded border-slate-300 text-teal-700 focus:ring-teal-700 h-4 w-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "activeForm",
							className: "text-slate-500 select-none cursor-pointer",
							children: "Enable immediately in question pool"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-slate-100 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsQuestionModalOpen(false),
							className: "px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-black",
							children: "Save Changes"
						})]
					})
				]
			})]
		})
	});
}
function BulkImportModal({ isBulkModalOpen, setIsBulkModalOpen, bulkJsonText, setBulkJsonText, handleBulkUpload }) {
	if (!isBulkModalOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-b border-slate-100 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-sm text-slate-805",
					children: "Bulk Upload Questions (JSON)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsBulkModalOpen(false),
					className: "text-slate-400 hover:text-slate-650 font-bold text-sm",
					children: "✕"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleBulkUpload,
				className: "p-5 space-y-4 text-xs font-bold text-slate-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 leading-normal mb-2 font-medium",
						children: "Paste a valid JSON array of questions to append them to the existing pool. Format:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed",
						children: `[
  {
    "word": "TRANSFORMER",
    "category": "Artificial Intelligence",
    "hint": "The sequence-to-sequence architecture.",
    "difficulty": "hard",
    "active": true
  }
]`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-slate-500 mb-1.5",
						children: "JSON Array Payload"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 8,
						placeholder: "Paste JSON text here...",
						value: bulkJsonText,
						onChange: (e) => setBulkJsonText(e.target.value),
						className: "w-full p-2.5 border border-slate-200 rounded-xl font-mono text-[11px] leading-relaxed text-slate-800 focus:outline-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-slate-100 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsBulkModalOpen(false),
							className: "px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-black",
							children: "Import Questions"
						})]
					})
				]
			})]
		})
	});
}
function MCQTab({ mcqSearch, setMcqSearch, filteredMCQs, handleAddMCQClick, handleEditMCQClick, handleDeleteMCQ }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 flex-1 animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search MCQ text...",
					value: mcqSearch,
					onChange: (e) => setMcqSearch(e.target.value),
					className: "w-full pl-9 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddMCQClick,
					className: "px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-xl text-xs font-extrabold tracking-wide hover:shadow-lg transition-all flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "Add MCQ"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
			children: [filteredMCQs.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col justify-between space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-800 text-[9px] font-extrabold border border-teal-500/20",
									children: q.category
								}), !q.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[9px] font-extrabold border border-rose-500/20 uppercase",
									children: "Draft"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleEditMCQClick(q),
									className: "p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteMCQ(q.id),
									className: "p-1 rounded hover:bg-rose-50 text-rose-500 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-sans text-sm font-black tracking-tight text-slate-800",
							children: q.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5 mt-3",
							children: q.options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `text-xs font-semibold px-3 py-1.5 rounded-lg border ${q.correctAnswer === i ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-500"}`,
								children: [
									String.fromCharCode(65 + i),
									". ",
									opt
								]
							}, i))
						})
					]
				})
			}, q.id)), filteredMCQs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-slate-400",
					children: "No MCQ questions found."
				})
			})]
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-h-[90dvh] overflow-y-auto", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function MCQModal({ isOpen, setIsOpen, editingMCQ, mcqForm, setMcqForm, handleSaveMCQ }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[600px] bg-slate-900 border border-slate-700 text-slate-100 p-0 overflow-hidden shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "p-6 border-b border-slate-800 bg-slate-900/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl font-bold",
						children: editingMCQ ? "Edit MCQ" : "Add New MCQ"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-slate-400 mb-1.5 uppercase",
							children: "Question Text"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: mcqForm.text || "",
							onChange: (e) => setMcqForm({
								...mcqForm,
								text: e.target.value
							}),
							className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500",
							placeholder: "Enter the question text..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-slate-400 mb-1.5 uppercase",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: mcqForm.category || "",
							onChange: (e) => setMcqForm({
								...mcqForm,
								category: e.target.value
							}),
							className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500",
							placeholder: "e.g. Logic, React, History"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-slate-400 mb-1.5 uppercase",
								children: "Options (A, B, C, D)"
							}), [
								0,
								1,
								2,
								3
							].map((idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "correctAnswer",
									checked: mcqForm.correctAnswer === idx,
									onChange: () => setMcqForm({
										...mcqForm,
										correctAnswer: idx
									}),
									className: "w-4 h-4 text-teal-500 bg-slate-800 border-slate-600 focus:ring-teal-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: mcqForm.options?.[idx] || "",
									onChange: (e) => {
										const newOpts = [...mcqForm.options || [
											"",
											"",
											"",
											""
										]];
										newOpts[idx] = e.target.value;
										setMcqForm({
											...mcqForm,
											options: newOpts
										});
									},
									className: "flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500",
									placeholder: `Option ${String.fromCharCode(65 + idx)}`
								})]
							}, idx))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								id: "mcqActive",
								checked: mcqForm.active !== false,
								onChange: (e) => setMcqForm({
									...mcqForm,
									active: e.target.checked
								}),
								className: "w-4 h-4 rounded text-teal-500 bg-slate-800 border-slate-600 focus:ring-teal-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "mcqActive",
								className: "text-sm font-semibold text-slate-300",
								children: "Active (Visible to candidates)"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsOpen(false),
						className: "px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSaveMCQ,
						className: "px-6 py-2 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/50",
						children: "Save MCQ"
					})]
				})
			]
		})
	});
}
function AdminDashboard() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [data, setData] = (0, import_react.useState)({
		students: [],
		questions: [],
		mcqQuestions: [],
		securityLogs: []
	});
	const [studentSearch, setStudentSearch] = (0, import_react.useState)("");
	const [studentDeptFilter, setStudentDeptFilter] = (0, import_react.useState)("all");
	const [studentStatusFilter, setStudentStatusFilter] = (0, import_react.useState)("all");
	const [studentPage, setStudentPage] = (0, import_react.useState)(1);
	const [studentSortField, setStudentSortField] = (0, import_react.useState)("score");
	const [studentSortOrder, setStudentSortOrder] = (0, import_react.useState)("desc");
	const [selectedStudent, setSelectedStudent] = (0, import_react.useState)(null);
	const [questionSearch, setQuestionSearch] = (0, import_react.useState)("");
	const [questionCatFilter, setQuestionCatFilter] = (0, import_react.useState)("all");
	const [isQuestionModalOpen, setIsQuestionModalOpen] = (0, import_react.useState)(false);
	const [isBulkModalOpen, setIsBulkModalOpen] = (0, import_react.useState)(false);
	const [editingQuestion, setEditingQuestion] = (0, import_react.useState)(null);
	const [mcqSearch, setMcqSearch] = (0, import_react.useState)("");
	const [isMcqModalOpen, setIsMcqModalOpen] = (0, import_react.useState)(false);
	const [editingMcq, setEditingMcq] = (0, import_react.useState)(null);
	const [mcqForm, setMcqForm] = (0, import_react.useState)({});
	const [wordForm, setWordForm] = (0, import_react.useState)("");
	const [categoryForm, setCategoryForm] = (0, import_react.useState)("Artificial Intelligence");
	const [hintForm, setHintForm] = (0, import_react.useState)("");
	const [difficultyForm, setDifficultyForm] = (0, import_react.useState)("medium");
	const [activeForm, setActiveForm] = (0, import_react.useState)(true);
	const [bulkJsonText, setBulkJsonText] = (0, import_react.useState)("");
	const [sessionTimeout, setSessionTimeout] = (0, import_react.useState)(45);
	const [maxWrongAttempts, setMaxWrongAttempts] = (0, import_react.useState)(4);
	const [systemMode, setSystemMode] = (0, import_react.useState)("workshop");
	const [round1PassingScore, setRound1PassingScore] = (0, import_react.useState)(60);
	const [round2PassingScore, setRound2PassingScore] = (0, import_react.useState)(60);
	const [round1TimeLimit, setRound1TimeLimit] = (0, import_react.useState)(300);
	const [round2TimeLimit, setRound2TimeLimit] = (0, import_react.useState)(600);
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [isAuthenticating, setIsAuthenticating] = (0, import_react.useState)(false);
	const [adminPasswordInput, setAdminPasswordInput] = (0, import_react.useState)("");
	const [authError, setAuthError] = (0, import_react.useState)("");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const refreshData = async () => {
		setLoading(true);
		try {
			const res = await adminGetDashboardData();
			setData(res);
			const config = await getSystemConfigData();
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
			const res = await adminUpdateSystemConfig({ data: {
				sessionTimeout,
				maxWrongAttempts,
				mode: systemMode,
				round1PassingScore,
				round2PassingScore,
				round1TimeLimit,
				round2TimeLimit
			} });
			if (res.success) toast.success("Global rules committed successfully.");
			else toast.error("Failed to commit global rules: " + res.error);
		} catch (e) {
			toast.error("Failed to commit settings: " + e.message);
		}
	};
	(0, import_react.useEffect)(() => {
		const checkSession = async () => {
			try {
				if ((await adminCheckSession()).success) {
					setIsAuthenticated(true);
					refreshData();
				} else setLoading(false);
			} catch (e) {
				console.error("Session verification failed", e);
				setLoading(false);
			}
		};
		checkSession();
	}, []);
	const renderStatusBadge = (status) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `px-2.5 py-1 text-xs rounded-full font-bold border ${{
				Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
				Qualified: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
				Completed: "bg-violet-500/10 text-violet-500 border-violet-500/20",
				Eliminated: "bg-rose-500/10 text-rose-500 border-rose-500/20",
				Disqualified: "bg-amber-500/10 text-amber-500 border-amber-500/20"
			}[status] || "bg-slate-500/10 text-slate-500 border-slate-500/20"}`,
			children: status
		});
	};
	const metrics = (0, import_react.useMemo)(() => {
		const students = data.students;
		const totalReg = students.length;
		const active = students.filter((s) => s.status === "Active").length;
		const eliminated = students.filter((s) => s.status === "Eliminated").length;
		const qualified = students.filter((s) => s.status === "Qualified" || s.status === "Completed").length;
		const scores = students.map((s) => s.score);
		const avgScore = totalReg > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalReg) : 0;
		const successRate = totalReg > 0 ? Math.round(qualified / totalReg * 100) : 0;
		const failureRate = totalReg > 0 ? Math.round(eliminated / totalReg * 100) : 0;
		const now = /* @__PURE__ */ new Date();
		return {
			totalReg,
			active,
			eliminated,
			qualified,
			avgScore,
			successRate,
			failureRate,
			liveCount: students.filter((s) => {
				if (!s.lastActiveTime) return false;
				const lastActive = new Date(s.lastActiveTime);
				return now.getTime() - lastActive.getTime() < 900 * 1e3 && s.status === "Active";
			}).length,
			topPerformers: [...students].sort((a, b) => b.score - a.score).slice(0, 5)
		};
	}, [data.students]);
	const departments = (0, import_react.useMemo)(() => {
		const depts = /* @__PURE__ */ new Set();
		data.students.forEach((s) => depts.add(s.department));
		return Array.from(depts);
	}, [data.students]);
	const categories = (0, import_react.useMemo)(() => {
		const cats = /* @__PURE__ */ new Set();
		data.questions.forEach((q) => cats.add(q.category));
		return Array.from(cats);
	}, [data.questions]);
	const filteredStudents = (0, import_react.useMemo)(() => {
		return data.students.filter((s) => {
			const matchSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase());
			const matchDept = studentDeptFilter === "all" || s.department === studentDeptFilter;
			const matchStatus = studentStatusFilter === "all" || s.status === studentStatusFilter;
			return matchSearch && matchDept && matchStatus;
		});
	}, [
		data.students,
		studentSearch,
		studentDeptFilter,
		studentStatusFilter
	]);
	const filteredMCQs = (0, import_react.useMemo)(() => {
		return (data.mcqQuestions || []).filter((q) => {
			return q.text.toLowerCase().includes(mcqSearch.toLowerCase());
		});
	}, [data.mcqQuestions, mcqSearch]);
	const sortedStudents = (0, import_react.useMemo)(() => {
		const sorted = [...filteredStudents];
		sorted.sort((a, b) => {
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
	}, [
		filteredStudents,
		studentSortField,
		studentSortOrder
	]);
	const paginatedStudents = (0, import_react.useMemo)(() => {
		const start = (studentPage - 1) * 8;
		return sortedStudents.slice(start, start + 8);
	}, [sortedStudents, studentPage]);
	const filteredQuestions = (0, import_react.useMemo)(() => {
		return data.questions.filter((q) => {
			const matchSearch = q.word.toLowerCase().includes(questionSearch.toLowerCase()) || q.hint.toLowerCase().includes(questionSearch.toLowerCase());
			const matchCat = questionCatFilter === "all" || q.category === questionCatFilter;
			return matchSearch && matchCat;
		});
	}, [
		data.questions,
		questionSearch,
		questionCatFilter
	]);
	const handleExportCSV = () => {
		if (data.students.length === 0) return;
		const headers = [
			"Name",
			"Email",
			"Department",
			"Score",
			"Levels Completed",
			"Status",
			"Attempts"
		];
		const rows = data.students.map((s) => [
			s.name,
			s.email,
			s.department,
			s.score,
			s.levelsCompleted,
			s.status,
			s.attempts
		]);
		const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, "\"\"")}"`).join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "candidates_report.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const handleToggleLock = async (student) => {
		const nextLockedState = !student.locked;
		const nextStatus = nextLockedState ? "Disqualified" : "Active";
		try {
			const res = await adminUpdateStudentLock({ data: {
				email: student.email,
				locked: nextLockedState,
				status: nextStatus
			} });
			if (res.success) {
				setData((prev) => ({
					...prev,
					students: res.students
				}));
				if (selectedStudent && selectedStudent.email === student.email) setSelectedStudent((prev) => prev ? {
					...prev,
					locked: nextLockedState,
					status: nextStatus
				} : null);
			}
		} catch (e) {
			console.error("Lock toggle failed", e);
		}
	};
	const handleEditQuestionClick = (q) => {
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
	const handleSaveQuestion = async (e) => {
		e.preventDefault();
		if (!wordForm.trim() || !hintForm.trim()) return;
		try {
			const payload = {
				word: wordForm.toUpperCase().trim(),
				category: categoryForm,
				hint: hintForm.trim(),
				difficulty: difficultyForm,
				active: activeForm
			};
			if (editingQuestion) {
				payload.id = editingQuestion.id;
				const res = await adminUpdateQuestion({ data: {
					action: "edit",
					question: payload
				} });
				if (res.success) setData((prev) => ({
					...prev,
					questions: res.questions
				}));
			} else {
				const res = await adminUpdateQuestion({ data: {
					action: "add",
					question: payload
				} });
				if (res.success) setData((prev) => ({
					...prev,
					questions: res.questions
				}));
			}
			setIsQuestionModalOpen(false);
		} catch (e) {
			console.error("Question save failed", e);
		}
	};
	const handleDeleteQuestion = async (id) => {
		if (!confirm("Remove this question from the active pool?")) return;
		try {
			const res = await adminUpdateQuestion({ data: {
				action: "delete",
				question: { id }
			} });
			if (res.success) setData((prev) => ({
				...prev,
				questions: res.questions
			}));
		} catch (e) {
			console.error("Question deletion failed", e);
		}
	};
	const handleEditMCQClick = (q) => {
		setEditingMcq(q);
		setMcqForm(q);
		setIsMcqModalOpen(true);
	};
	const handleAddMCQClick = () => {
		setEditingMcq(null);
		setMcqForm({
			category: "General",
			text: "",
			options: [
				"",
				"",
				"",
				""
			],
			correctAnswer: 0,
			active: true
		});
		setIsMcqModalOpen(true);
	};
	const handleSaveMCQ = async () => {
		if (!mcqForm.text || mcqForm.text.trim() === "") return;
		try {
			if (editingMcq) {
				const res = await adminUpdateMCQQuestion({ data: {
					action: "edit",
					question: mcqForm
				} });
				if (res.success) setData((prev) => ({
					...prev,
					mcqQuestions: res.mcqQuestions
				}));
			} else {
				const res = await adminUpdateMCQQuestion({ data: {
					action: "add",
					question: mcqForm
				} });
				if (res.success) setData((prev) => ({
					...prev,
					mcqQuestions: res.mcqQuestions
				}));
			}
			setIsMcqModalOpen(false);
		} catch (e) {
			console.error("MCQ save failed", e);
		}
	};
	const handleDeleteMCQ = async (id) => {
		if (!confirm("Remove this MCQ from the active pool?")) return;
		try {
			const res = await adminUpdateMCQQuestion({ data: {
				action: "delete",
				question: { id }
			} });
			if (res.success) setData((prev) => ({
				...prev,
				mcqQuestions: res.mcqQuestions
			}));
		} catch (e) {
			console.error("MCQ deletion failed", e);
		}
	};
	const handleBulkUpload = async (e) => {
		e.preventDefault();
		try {
			const list = JSON.parse(bulkJsonText);
			if (!Array.isArray(list)) throw new Error("Payload must be a JSON array");
			const res = await adminBulkUploadQuestions({ data: list });
			if (res.success) {
				setData((prev) => ({
					...prev,
					questions: res.questions
				}));
				setIsBulkModalOpen(false);
				setBulkJsonText("");
			}
		} catch (e) {
			alert("Invalid JSON format: " + (e instanceof Error ? e.message : String(e)));
		}
	};
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[100dvh] overflow-hidden w-full bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-4 sm:p-6 font-sans flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 text-slate-805",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto shadow-lg shadow-black/10 border border-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-black text-slate-800 tracking-tight",
						children: "NexusPro Operations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 font-semibold",
						children: "Enter security code to authenticate terminal node."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: async (e) => {
						e.preventDefault();
						if (isAuthenticating) return;
						setIsAuthenticating(true);
						try {
							const res = await adminAuthenticate({ data: {
								password: adminPasswordInput,
								rememberMe
							} });
							if (res.success) {
								setIsAuthenticated(true);
								setAuthError("");
								refreshData();
							} else setAuthError(res.error || "Credential mismatch. Access denied.");
						} catch {
							setAuthError("Authentication service unavailable.");
						} finally {
							setIsAuthenticating(false);
						}
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							placeholder: "Enter Admin Password",
							value: adminPasswordInput,
							onChange: (e) => setAdminPasswordInput(e.target.value),
							disabled: isAuthenticating,
							className: "w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 text-center font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 disabled:opacity-50"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center px-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs font-semibold text-slate-500 cursor-pointer select-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: rememberMe,
									onChange: (e) => setRememberMe(e.target.checked),
									disabled: isAuthenticating,
									className: "rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 disabled:opacity-50"
								}), "Remember me (7 days)"]
							})
						}),
						authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-rose-500 font-bold text-center uppercase tracking-wider",
							children: authError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isAuthenticating,
							className: "w-full py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
							children: isAuthenticating ? "Authenticating..." : "Access Terminal"
						})
					]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[100dvh] overflow-hidden bg-gradient-to-br from-[#E2F0ED] via-[#E6E6FA] to-[#FFE4E1] p-3 sm:p-4 md:p-6 lg:p-10 font-sans flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-7xl min-h-[85vh] bg-white/35 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl sm:rounded-[32px] overflow-hidden flex flex-col md:flex-row",
				children: [
					sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-40 bg-black/40 md:hidden",
						onClick: () => setSidebarOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: `fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white/40 p-6 flex flex-col justify-between border-r border-[#E5EAE9]/80 shrink-0 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/src/assets/images.png",
										alt: "NexusPro",
										className: "w-7 h-7 rounded object-contain bg-slate-950"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-extrabold text-slate-800 text-base tracking-tight leading-none",
										children: "NexusPro"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSidebarOpen(false),
									className: "md:hidden p-1 rounded-lg hover:bg-slate-200/40 text-slate-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "space-y-1",
								children: [
									{
										id: "overview",
										label: "Dashboard",
										icon: ChartNoAxesColumn
									},
									{
										id: "students",
										label: "Candidates",
										icon: Users
									},
									{
										id: "live",
										label: "Live Room",
										icon: Radio
									},
									{
										id: "questions",
										label: "Round 1 Puzzles",
										icon: BookOpen
									},
									{
										id: "mcq",
										label: "Round 2 MCQs",
										icon: BookOpen
									},
									{
										id: "leaderboard",
										label: "Standings",
										icon: TrendingUp
									},
									{
										id: "audit",
										label: "Security Logs",
										icon: History
									},
									{
										id: "settings",
										label: "System Rules",
										icon: Settings
									}
								].map((item) => {
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setActiveTab(item.id);
											setStudentPage(1);
											setSidebarOpen(false);
										},
										className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${activeTab === item.id ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-lg shadow-teal-700/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
									}, item.id);
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									if (confirm("Disconnect and lock terminal node?")) {
										await adminLogout();
										setIsAuthenticated(false);
									}
								},
								className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lock Terminal" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-bold text-slate-400/80 px-2 tracking-wider",
								children: "SYSTEM ENGINE v1.2"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-x-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex justify-between items-center mb-6 sm:mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSidebarOpen(true),
										className: "md:hidden p-2 rounded-xl bg-white/70 border border-slate-200 hover:bg-white text-slate-600 shadow-sm transition-all",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold text-teal-800 tracking-wider",
										children: "Welcome back, Admin 👋"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg sm:text-2xl font-extrabold text-slate-800 capitalize leading-tight",
										children: activeTab
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs border border-white/10",
											children: "AD"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden lg:block text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-slate-800 leading-none",
												children: "Andrea Admin"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-slate-400",
												children: "System Node"
											})]
										})]
									})]
								})]
							}),
							activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, {
								metrics,
								data,
								setActiveTab,
								questionsCount: data.questions.length
							}),
							activeTab === "students" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidatesTab, {
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
								renderStatusBadge
							}),
							activeTab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRoomTab, { students: data.students }),
							activeTab === "questions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionsTab, {
								questionSearch,
								setQuestionSearch,
								questionCatFilter,
								setQuestionCatFilter,
								categories,
								filteredQuestions,
								setIsBulkModalOpen,
								handleAddQuestionClick,
								handleEditQuestionClick,
								handleDeleteQuestion
							}),
							activeTab === "mcq" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MCQTab, {
								mcqSearch,
								setMcqSearch,
								filteredMCQs,
								handleAddMCQClick,
								handleEditMCQClick,
								handleDeleteMCQ
							}),
							activeTab === "leaderboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandingsTab, { students: data.students }),
							activeTab === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditLogsTab, { securityLogs: data.securityLogs }),
							activeTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRulesTab, {
								sessionTimeout,
								setSessionTimeout,
								maxWrongAttempts,
								setMaxWrongAttempts,
								mode: systemMode,
								setMode: setSystemMode,
								round1PassingScore,
								setRound1PassingScore,
								round2PassingScore,
								setRound2PassingScore,
								round1TimeLimit,
								setRound1TimeLimit,
								round2TimeLimit,
								setRound2TimeLimit,
								onSave: handleSaveSettings
							})
						]
					})
				]
			}),
			selectedStudent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentDrawer, {
				selectedStudent,
				setSelectedStudent,
				data,
				handleToggleLock
			}),
			isQuestionModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionModal, {
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
				handleSaveQuestion
			}),
			isMcqModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MCQModal, {
				isOpen: isMcqModalOpen,
				setIsOpen: setIsMcqModalOpen,
				editingMCQ: editingMcq,
				mcqForm,
				setMcqForm,
				handleSaveMCQ
			}),
			isBulkModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkImportModal, {
				isBulkModalOpen,
				setIsBulkModalOpen,
				bulkJsonText,
				setBulkJsonText,
				handleBulkUpload
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
