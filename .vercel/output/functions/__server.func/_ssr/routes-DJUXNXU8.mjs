import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as cn, f as getLeaderboardData, g as submitMCQResults, h as submitGuess, m as registerOrResumeStudent, t as ScrollArea } from "./scroll-area-BzFcnQzi.mjs";
import { $ as Award, B as CornerDownLeft, D as Minimize, G as CircleCheck, H as Clipboard, I as Gift, J as ChevronLeft, K as ChevronUp, M as KeyRound, P as Heart, R as Delete, T as OctagonAlert, U as CircleX, V as Clock, W as CircleQuestionMark, X as Check, Y as ChevronDown, b as ScrollText, et as ArrowUp, g as Smartphone, i as Volume2, k as Maximize, l as Trophy, o as User, p as Target, q as ChevronRight, r as VolumeX, s as UserPlus, t as Zap, w as Percent, x as Rocket, z as Cpu } from "../_libs/lucide-react.mjs";
import { t as FILLBLANK_QUESTIONS } from "./fillblank-data-D9-HLXwo.mjs";
import { a as AnimatePresence, i as motion, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJUXNXU8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var guardian_hero_default = "/assets/guardian-hero-BHsyOa7g.png";
function GuardianDesktop({ scale = 1, glow = true, className = "", speaking = false, state = "idle" }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [isBlinking, setIsBlinking] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, {
		stiffness: 120,
		damping: 16,
		mass: .3
	});
	const springY = useSpring(mouseY, {
		stiffness: 120,
		damping: 16,
		mass: .3
	});
	const glowX = useTransform(() => springX.get() * -.5);
	const glowY = useTransform(() => springY.get() * -.5);
	const auroraX = useTransform(() => springX.get() * -.25);
	const auroraY = useTransform(() => springY.get() * -.25);
	const bodyX = useTransform(() => springX.get());
	const bodyY = useTransform(() => springY.get());
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		const triggerBlink = () => {
			if (!active) return;
			setIsBlinking(true);
			setTimeout(() => {
				if (!active) return;
				setIsBlinking(false);
				if (active) {
					const nextBlink = 3e3 + Math.random() * 3e3;
					setTimeout(triggerBlink, nextBlink);
				}
			}, 160);
		};
		const initialTimeout = setTimeout(triggerBlink, 3e3);
		return () => {
			active = false;
			clearTimeout(initialTimeout);
		};
	}, []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-96 flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse",
		children: "Establishing Link..."
	});
	const isApocalypse = [
		"angry",
		"punishment",
		"death",
		"rejected"
	].includes(state.toLowerCase());
	const activeImage = guardian_hero_default;
	const eyeColor = isApocalypse ? "bg-red-400 shadow-[0_0_15px_rgba(239,68,68,1)]" : "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,1)]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: `relative w-full h-[250px] sm:h-[340px] md:h-[400px] lg:h-[530px] flex items-center justify-center select-none overflow-visible ${className}`,
		children: [
			glow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "absolute inset-0 -z-30 pointer-events-none",
				style: {
					x: glowX,
					y: glowY
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-[-80px] blur-[100px] opacity-80 transition-colors duration-1000",
					style: { background: `radial-gradient(circle at 50% 50%, ${isApocalypse ? "rgba(239,68,68,0.8)" : "rgba(16,185,129,0.8)"}, transparent 65%)` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-1/2 top-1/2 h-[150%] w-[110%] -translate-x-1/2 -translate-y-1/2 blur-[80px] opacity-60 transition-colors duration-1000",
					style: { background: `radial-gradient(circle, ${isApocalypse ? "rgba(185,28,28,0.7)" : "rgba(4,120,87,0.7)"}, transparent 60%)` }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "absolute inset-0 -z-20 pointer-events-none opacity-45 mix-blend-screen",
				style: {
					x: auroraX,
					y: auroraY
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[10%] left-[-10%] w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.1),transparent_50%)] blur-[40px] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-[5%] right-[-10%] w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,78,59,0.15),transparent_50%)] blur-[40px] animate-pulse",
					style: { animationDuration: "8s" }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "relative mx-auto h-[95%] flex items-end justify-center overflow-visible",
				style: { transformOrigin: "bottom center" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-48 h-5 bg-black/80 rounded-full blur-[8px] -z-10 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-[-160px] left-1/2 -translate-x-1/2 w-full h-[150px] opacity-25 scale-y-[-0.65] pointer-events-none blur-[4px] select-none -z-20",
						style: {
							transformOrigin: "top center",
							WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)",
							maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activeImage,
							alt: "Floor Reflection",
							className: "w-full h-full object-contain filter brightness-50"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						style: {
							x: bodyX,
							y: bodyY,
							transformOrigin: "bottom center"
						},
						className: "relative max-h-full flex items-end justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "relative max-h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: activeImage,
								alt: "The Guardian",
								draggable: false,
								className: `relative mx-auto max-h-[150px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[480px] object-contain transition-all duration-500 translate-y-4 sm:translate-y-0 ${isApocalypse ? "drop-shadow-[0_0_80px_rgba(239,68,68,0.7)] filter saturate-[1.15] brightness-[1.08] contrast-[1.05]" : "drop-shadow-[0_0_80px_rgba(16,185,129,0.55)] filter saturate-[1.1] brightness-[1.05]"}`,
								style: {
									maskImage: "radial-gradient(circle at 50% 45%, black 45%, transparent 78%)",
									WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 45%, transparent 78%)"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex items-center justify-center pointer-events-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: `absolute top-[14.8%] left-[44.5%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-2 rounded-full blur-[1px] ${eyeColor}`,
									animate: {
										scaleY: isBlinking ? .05 : speaking ? [
											1,
											1.25,
											1
										] : [
											1,
											1.05,
											1
										],
										scaleX: isBlinking ? 1.2 : 1,
										opacity: isBlinking ? .1 : speaking ? [
											.7,
											1,
											.7
										] : [
											.5,
											.8,
											.5
										]
									},
									transition: {
										scaleY: {
											duration: isBlinking ? .08 : speaking ? 1.2 : 2.5,
											repeat: isBlinking ? 0 : Infinity
										},
										opacity: {
											duration: isBlinking ? .08 : speaking ? 1.2 : 2.5,
											repeat: isBlinking ? 0 : Infinity
										}
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: `absolute top-[14.8%] left-[55.5%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-2 rounded-full blur-[1px] ${eyeColor}`,
									animate: {
										scaleY: isBlinking ? .05 : speaking ? [
											1,
											1.25,
											1
										] : [
											1,
											1.05,
											1
										],
										scaleX: isBlinking ? 1.2 : 1,
										opacity: isBlinking ? .1 : speaking ? [
											.7,
											1,
											.7
										] : [
											.5,
											.8,
											.5
										]
									},
									transition: {
										scaleY: {
											duration: isBlinking ? .08 : speaking ? 1.2 : 2.5,
											repeat: isBlinking ? 0 : Infinity
										},
										opacity: {
											duration: isBlinking ? .08 : speaking ? 1.2 : 2.5,
											repeat: isBlinking ? 0 : Infinity
										}
									}
								})]
							})]
						})
					})
				]
			}),
			speaking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 h-8 bg-black/60 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md z-20 ${isApocalypse ? "border-red-500/30 shadow-red-500/10" : "border-emerald-500/30 shadow-emerald-500/10"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `font-mono text-[9px] uppercase tracking-[0.2em] mr-1 animate-pulse ${isApocalypse ? "text-red-400" : "text-emerald-400"}`,
					children: "Vocalizing"
				}), [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: `w-1 rounded-full ${isApocalypse ? "bg-red-400" : "bg-emerald-400"}`,
					animate: { height: [
						6,
						i % 2 === 0 ? 20 : 14,
						6
					] },
					transition: {
						duration: .6 + i * .12,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}, i))]
			})
		]
	});
}
function Guardian(props) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-96 flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse",
		children: "Establishing Link..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuardianDesktop, { ...props });
}
var chamber_bg_default = "/assets/chamber-bg-IBg8zwcl.jpg";
var Ancient_Gothic_shadow_temple_loop_202607231856_1_apo8_prob4_default = "/assets/Ancient_Gothic_shadow_temple_loop_202607231856_1_apo8_prob4-BYRlUiTR.mp4";
/** Ambient chamber backdrop with a looping MP4 video, mist particles and vignette. */
function Atmosphere({ intensity = 1, speaking = false }) {
	const [particles, setParticles] = (0, import_react.useState)([]);
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setParticles(Array.from({ length: 120 }).map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			size: 1 + Math.random() * 3.5,
			delay: Math.random() * 8,
			duration: 10 + Math.random() * 15,
			opacity: .15 + Math.random() * .45
		})));
	}, []);
	(0, import_react.useEffect)(() => {
		const onVisibilityChange = () => {
			const video = videoRef.current;
			if (!video) return;
			if (document.hidden) video.pause();
			else if (video.paused) video.play().catch(() => {});
		};
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => document.removeEventListener("visibilitychange", onVisibilityChange);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 overflow-hidden bg-black",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-cover bg-center",
				style: {
					backgroundImage: `url(${chamber_bg_default})`,
					opacity: .35 * intensity
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true,
				preload: "metadata",
				onLoadedData: () => {
					if (videoRef.current) {
						videoRef.current.playbackRate = 1;
						console.log("Video Loaded:", {
							readyState: videoRef.current.readyState,
							currentTime: videoRef.current.currentTime,
							paused: videoRef.current.paused,
							autoplay: videoRef.current.autoplay,
							videoWidth: videoRef.current.videoWidth,
							videoHeight: videoRef.current.videoHeight,
							currentSrc: videoRef.current.currentSrc,
							error: videoRef.current.error,
							playbackRate: videoRef.current.playbackRate
						});
					}
				},
				className: "absolute inset-0 w-full h-full object-cover select-none pointer-events-none",
				style: {
					opacity: (speaking ? .75 : .6) * intensity,
					filter: speaking ? "saturate(1.2) contrast(1.15) brightness(1.05)" : "saturate(1.05) contrast(1.05)",
					transition: "opacity 1.5s ease, filter 1.5s ease"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: Ancient_Gothic_shadow_temple_loop_202607231856_1_apo8_prob4_default,
					type: "video/mp4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.05] pointer-events-none",
				style: {
					backgroundImage: `linear-gradient(rgba(52, 211, 153, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(52, 211, 153, 0.2) 1px, transparent 1px)`,
					backgroundSize: "30px 30px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/45 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: {
					background: speaking ? "radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.35), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.85), transparent 75%)" : "radial-gradient(ellipse at 50% 40%, rgba(6,78,59,0.25), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.85), transparent 75%)",
					transition: "background 1.5s ease"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 mix-blend-screen opacity-35",
				style: { background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)" }
			}),
			particles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute rounded-full bg-emerald-300/40 blur-[1px] animate-float",
				style: {
					left: `${p.left}%`,
					top: `${p.top}%`,
					width: speaking ? p.size * 1.5 : p.size,
					height: speaking ? p.size * 1.5 : p.size,
					opacity: speaking ? Math.min(1, p.opacity * 2.2) : p.opacity,
					boxShadow: speaking ? "0 0 10px rgba(52,211,153,0.75)" : "none",
					animationDelay: `${p.delay}s`,
					animationDuration: `${speaking ? p.duration * .8 : p.duration}s`,
					transition: "width 1.2s ease, height 1.2s ease, opacity 1.2s ease, box-shadow 1.2s ease"
				}
			}, p.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.04] mix-blend-overlay",
				style: { backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)" }
			})
		]
	});
}
var AmbientSoundscape = class {
	ctx = null;
	rumbleOsc = null;
	rumbleGain = null;
	windNode = null;
	windFilter = null;
	windGain = null;
	masterGain = null;
	workletLoaded = false;
	async start() {
		if (this.ctx) {
			if (this.ctx.state === "suspended") await this.ctx.resume().catch(() => {});
			return;
		}
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (!AudioContextClass) return;
		try {
			this.ctx = new AudioContextClass();
			if (!this.workletLoaded) {
				const blob = new Blob([`
          class NoiseProcessor extends AudioWorkletProcessor {
            process(inputs, outputs, parameters) {
              const output = outputs[0];
              for (let channel = 0; channel < output.length; ++channel) {
                const outputChannel = output[channel];
                for (let i = 0; i < outputChannel.length; ++i) {
                  outputChannel[i] = Math.random() * 2 - 1;
                }
              }
              return true;
            }
          }
          registerProcessor('noise-generator', NoiseProcessor);
        `], { type: "application/javascript" });
				const workletUrl = URL.createObjectURL(blob);
				await this.ctx.audioWorklet.addModule(workletUrl).catch((err) => {
					console.warn("Failed to load AudioWorklet module, using fallback noise:", err);
				});
				this.workletLoaded = true;
			}
			this.masterGain = this.ctx.createGain();
			this.masterGain.gain.setValueAtTime(.05, this.ctx.currentTime);
			this.masterGain.connect(this.ctx.destination);
			this.rumbleOsc = this.ctx.createOscillator();
			this.rumbleOsc.type = "sine";
			this.rumbleOsc.frequency.setValueAtTime(45, this.ctx.currentTime);
			const rumbleFilter = this.ctx.createBiquadFilter();
			rumbleFilter.type = "lowpass";
			rumbleFilter.frequency.setValueAtTime(65, this.ctx.currentTime);
			this.rumbleGain = this.ctx.createGain();
			this.rumbleGain.gain.setValueAtTime(.3, this.ctx.currentTime);
			const rumbleMod = this.ctx.createOscillator();
			rumbleMod.frequency.setValueAtTime(.15, this.ctx.currentTime);
			const rumbleModGain = this.ctx.createGain();
			rumbleModGain.gain.setValueAtTime(.12, this.ctx.currentTime);
			rumbleMod.connect(rumbleModGain);
			rumbleModGain.connect(this.rumbleGain.gain);
			this.rumbleOsc.connect(rumbleFilter);
			rumbleFilter.connect(this.rumbleGain);
			this.rumbleGain.connect(this.masterGain);
			rumbleMod.start();
			this.rumbleOsc.start();
			try {
				this.windNode = new AudioWorkletNode(this.ctx, "noise-generator");
			} catch (e) {
				console.warn("Failed to create AudioWorkletNode, wind noise will be silent", e);
			}
			this.windFilter = this.ctx.createBiquadFilter();
			this.windFilter.type = "bandpass";
			this.windFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);
			this.windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
			const windSweep = this.ctx.createOscillator();
			windSweep.frequency.setValueAtTime(.06, this.ctx.currentTime);
			const windSweepGain = this.ctx.createGain();
			windSweepGain.gain.setValueAtTime(120, this.ctx.currentTime);
			windSweep.connect(windSweepGain);
			windSweepGain.connect(this.windFilter.frequency);
			this.windGain = this.ctx.createGain();
			this.windGain.gain.setValueAtTime(.08, this.ctx.currentTime);
			if (this.windNode) this.windNode.connect(this.windFilter);
			this.windFilter.connect(this.windGain);
			this.windGain.connect(this.masterGain);
			windSweep.start();
		} catch (e) {
			console.warn("AudioContext failed to initialize:", e);
		}
	}
	duck(active) {
		if (!this.ctx || !this.masterGain) return;
		const targetVolume = active ? .015 : .05;
		this.masterGain.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 1.2);
	}
	stop() {
		if (this.ctx) {
			try {
				this.ctx.close();
			} catch {}
			this.ctx = null;
			this.windNode = null;
		}
	}
};
function useGuardianVoice() {
	const [voiceEnabled, setVoiceEnabled] = (0, import_react.useState)(false);
	const [isSpeaking, setIsSpeaking] = (0, import_react.useState)(false);
	const utteranceRef = (0, import_react.useRef)(null);
	const activeChainIdRef = (0, import_react.useRef)(0);
	const ambienceRef = (0, import_react.useRef)(null);
	const voiceEnabledRef = (0, import_react.useRef)(false);
	if (!ambienceRef.current && typeof window !== "undefined") ambienceRef.current = new AmbientSoundscape();
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("guardian-voice") === "true";
			setVoiceEnabled(saved);
			voiceEnabledRef.current = saved;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!voiceEnabled) {
			ambienceRef.current?.stop();
			return;
		}
		const startOnGesture = () => {
			ambienceRef.current?.start();
			window.removeEventListener("click", startOnGesture);
			window.removeEventListener("keydown", startOnGesture);
		};
		window.addEventListener("click", startOnGesture);
		window.addEventListener("keydown", startOnGesture);
		return () => {
			window.removeEventListener("click", startOnGesture);
			window.removeEventListener("keydown", startOnGesture);
			ambienceRef.current?.stop();
		};
	}, [voiceEnabled]);
	const toggleVoice = (0, import_react.useCallback)(() => {
		setVoiceEnabled((prev) => {
			const next = !prev;
			voiceEnabledRef.current = next;
			localStorage.setItem("guardian-voice", String(next));
			if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
				activeChainIdRef.current += 1;
				window.speechSynthesis.cancel();
				setIsSpeaking(false);
				ambienceRef.current?.stop();
			}
			return next;
		});
	}, []);
	const speak = (0, import_react.useCallback)(async (text, emotion = "normal") => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		activeChainIdRef.current += 1;
		const currentChainId = activeChainIdRef.current;
		window.speechSynthesis.cancel();
		setIsSpeaking(false);
		if (!voiceEnabledRef.current) return;
		const tokens = text.replace(/[“’”"]/g, "").replace(/◈|◊|△|⌘|◉|☾|✦/g, "").replace(/\s+/g, " ").trim().split(/(\.\.\.|[.,!?])/g);
		setIsSpeaking(true);
		ambienceRef.current?.duck(true);
		for (let i = 0; i < tokens.length; i++) {
			if (currentChainId !== activeChainIdRef.current) return;
			const token = tokens[i].trim();
			if (!token) continue;
			if (token === "...") {
				const delay = 1500 + Math.random() * 1e3;
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else if (token === ".") {
				const delay = 650 + Math.random() * 550;
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else if (token === "?" || token === "!") {
				const delay = 1e3 + Math.random() * 500;
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else if (token === ",") {
				const delay = 250 + Math.random() * 200;
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else await new Promise((resolve) => {
				if (currentChainId !== activeChainIdRef.current) {
					resolve();
					return;
				}
				const utterance = new SpeechSynthesisUtterance(token);
				utteranceRef.current = utterance;
				const englishVoices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
				const chosenVoice = englishVoices.find((v) => v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("google us english male") || v.name.toLowerCase().includes("mark") || v.name.toLowerCase().includes("male")) || englishVoices[0];
				if (chosenVoice) utterance.voice = chosenVoice;
				let pitch = .45;
				let rate = .75;
				const volume = 1;
				switch (emotion) {
					case "warning":
						pitch = .4;
						rate = .7;
						break;
					case "wrong":
						pitch = .38;
						rate = .65;
						break;
					case "success":
						pitch = .5;
						rate = .8;
						break;
					case "final":
						pitch = .45;
						rate = .72;
						break;
					default:
						pitch = .45;
						rate = .75;
						break;
				}
				utterance.pitch = pitch;
				utterance.rate = rate;
				utterance.volume = volume;
				utterance.onend = () => resolve();
				utterance.onerror = () => resolve();
				window.speechSynthesis.speak(utterance);
			});
		}
		if (currentChainId === activeChainIdRef.current) {
			setIsSpeaking(false);
			ambienceRef.current?.duck(false);
		}
	}, []);
	const stop = (0, import_react.useCallback)(() => {
		activeChainIdRef.current += 1;
		if (typeof window !== "undefined" && "speechSynthesis" in window) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
			ambienceRef.current?.duck(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && "speechSynthesis" in window) {
			window.speechSynthesis.getVoices();
			if (window.speechSynthesis.onvoiceschanged !== void 0) window.speechSynthesis.onvoiceschanged = () => {
				window.speechSynthesis.getVoices();
			};
		}
		return () => {
			stop();
		};
	}, [stop]);
	return {
		voiceEnabled,
		toggleVoice,
		isSpeaking,
		speak,
		stop
	};
}
function SceneWrap({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .6,
			ease: "easeInOut"
		},
		className: "scene-wrapper relative z-10 flex min-h-[100dvh] overflow-y-auto w-full items-center justify-center p-4 py-12 sm:p-6 md:p-8 custom-scrollbar",
		children
	});
}
function ActionButton({ children, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		disabled,
		className: "group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/30 to-emerald-700/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-50 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.6)] transition hover:from-emerald-400/40 hover:to-emerald-600/30 hover:shadow-[0_10px_60px_-5px_rgba(52,211,153,0.8)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent opacity-0 transition group-hover:opacity-100" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10",
			children
		})]
	});
}
var full_logo_default = "/assets/full%20logo-HR533-6U.png";
function BootScene({ onComplete, speak, voiceEnabled, toggleVoice }) {
	const [stage, setStage] = (0, import_react.useState)("click-to-start");
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const startedRef = (0, import_react.useRef)(false);
	const timersRef = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const timers = timersRef.current;
		return () => {
			timers.forEach((t) => clearTimeout(t));
			timers.forEach((t) => clearInterval(t));
		};
	}, []);
	const startBoot = () => {
		if (startedRef.current) return;
		startedRef.current = true;
		setStage("loading");
		if (!voiceEnabled) toggleVoice();
		timersRef.current.push(setTimeout(() => {
			speak("Establishing link with Sector 0 7. Decrypting seals. Standing by for selection.");
		}, 300));
		[
			{
				delay: 300,
				text: "> CONNECTING TO SHADOW REALM CONTROLLER..."
			},
			{
				delay: 800,
				text: "> INITIALIZING GUARDIAN DIALOGUE MATRIX... OK"
			},
			{
				delay: 1400,
				text: "> LOADING DYNAMIC CIPHER LIBRARIES..."
			},
			{
				delay: 2e3,
				text: "> ESTABLISHING ONE-RETRIAL ACCOUNT INTEGRITY SEALS..."
			},
			{
				delay: 2700,
				text: "> RANDOMIZING INTEL WORKSPACE QUESTIONS... READY"
			},
			{
				delay: 3400,
				text: "> SECURITY VIGILANCE MODULE: ACTIVE"
			},
			{
				delay: 4e3,
				text: "> SECTOR SYSTEM FULLY INJECTED. ENTER THE TRIAL NOW."
			}
		].forEach((item) => {
			timersRef.current.push(setTimeout(() => {
				setLogs((prev) => [...prev, item.text]);
			}, item.delay));
		});
		timersRef.current.push(setInterval(() => {
			setProgress((p) => Math.min(100, p + 2));
		}, 80));
		timersRef.current.push(setTimeout(() => {
			setStage("ready");
			timersRef.current.push(setTimeout(() => {
				onComplete();
			}, 800));
		}, 4800));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneWrap, { children: [
		stage === "click-to-start" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
			initial: { opacity: 0 },
			animate: { opacity: .6 },
			exit: { opacity: 0 },
			transition: { duration: 1 },
			src: "/assets/background-Z_WMrgb1.png",
			alt: "Background",
			className: "fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: (stage === "loading" || stage === "ready") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.video, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: 1 },
			src: "/assets/0724%20(1)-B5CaJsHS.mp4",
			autoPlay: true,
			muted: true,
			playsInline: true,
			loop: true,
			className: "fixed inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 w-full h-full flex flex-col items-center justify-center",
			children: stage === "click-to-start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .9
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "relative overflow-hidden text-center w-[90%] max-w-[300px] sm:max-w-md mx-auto px-3 sm:px-6 py-4 sm:py-6 backdrop-blur-xl bg-black/30 border border-emerald-500/20 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-emerald-500/5 before:to-transparent before:pointer-events-none flex flex-col items-center justify-center gap-1 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 w-full flex justify-center pointer-events-none mt-1 mb-2 sm:mb-4 px-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: full_logo_default,
							alt: "Logo",
							className: "w-56 sm:w-72 md:w-80 h-auto max-h-36 sm:max-h-48 object-contain drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1 z-10 relative w-full mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "relative z-20 m-0 font-serif text-[13px] sm:text-lg tracking-wider sm:tracking-widest text-emerald-100 uppercase leading-snug",
							children: "2 Days GEN AI WORKSHOP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "m-0 font-mono text-[7px] sm:text-[9px] text-emerald-400/70 tracking-[0.2em] sm:tracking-[0.4em] uppercase",
							children: "Sector 07 // Intelligence Vault"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: startBoot,
						className: "group relative w-full sm:w-auto overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/20 to-emerald-700/10 px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)] hover:from-emerald-400/30 hover:to-emerald-600/20 transition cursor-pointer",
						children: "Enter the Shadow Realm"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: 1.05,
					filter: "brightness(2)"
				},
				transition: { duration: .5 },
				className: "relative overflow-hidden w-full max-w-[300px] sm:max-w-md rounded-2xl border border-emerald-500/20 bg-black/40 p-4 sm:p-5 font-mono text-xs backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.2)] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-emerald-500/5 before:to-transparent before:pointer-events-none text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-400/80 uppercase tracking-widest text-[9px] sm:text-[10px]",
							children: "System Boot Sequence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-emerald-300",
								children: "ONLINE"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
						className: "h-32 sm:h-40 pr-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 text-emerald-300/80 text-[11px] sm:text-xs",
							children: logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: { duration: .3 },
								children: log
							}, index))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-emerald-500/10 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[10px] text-emerald-400/70 mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DECRYPTING SECURE MATRIX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "%"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 w-full bg-emerald-950/70 rounded-full overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
								animate: { width: `${progress}%` },
								transition: { ease: "linear" }
							})
						})]
					})
				]
			})
		})
	] });
}
function ExpandedContent({ person }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[9px] sm:text-[10px] text-emerald-300 tracking-widest uppercase mb-1",
			children: person.company
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] sm:text-xs text-emerald-100 font-medium mb-2",
			children: person.specialization
		}),
		person.details && person.details.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1.5",
			children: person.details.map((detail, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-1.5 text-[10px] sm:text-[11px] text-emerald-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-emerald-400 mt-[3px] text-[8px]",
					children: "▶"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detail })]
			}, idx))
		})
	] });
}
function ResourcePersonCard({ person, index }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 30
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				delay: .15 * index,
				duration: .5,
				ease: "easeOut"
			},
			className: "group relative rounded-xl border border-emerald-500/30 bg-black p-4 sm:p-5 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all duration-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-shrink-0 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-emerald-400/40 bg-emerald-900/40 flex items-center justify-center overflow-hidden",
							children: person.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: person.photoUrl,
								alt: person.name,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl sm:text-2xl font-serif text-emerald-300",
								children: person.name.charAt(0)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border border-emerald-400/50 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-serif text-sm sm:text-base text-emerald-50 truncate",
							children: person.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] sm:text-xs text-emerald-300/70 tracking-wider",
							children: person.designation
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 mt-3 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setExpanded((p) => !p),
						className: "inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] text-emerald-400 tracking-wider uppercase hover:text-emerald-300 transition cursor-pointer",
						children: [expanded ? "Less" : "Learn More", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							animate: { rotate: expanded ? 90 : 0 },
							transition: { duration: .2 },
							className: "inline-block",
							children: "→"
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: person.inlineExpansion ? {
				height: 0,
				opacity: 0,
				marginTop: 0
			} : {
				opacity: 0,
				y: -5
			},
			animate: person.inlineExpansion ? {
				height: "auto",
				opacity: 1,
				marginTop: 8
			} : {
				opacity: 1,
				y: 0
			},
			exit: person.inlineExpansion ? {
				height: 0,
				opacity: 0,
				marginTop: 0
			} : {
				opacity: 0,
				y: -5
			},
			transition: { duration: person.inlineExpansion ? .3 : .25 },
			className: person.inlineExpansion ? "overflow-hidden" : "absolute left-0 right-0 z-20 mt-1 rounded-xl border border-emerald-500/40 bg-black p-4 shadow-[0_0_40px_rgba(0,0,0,0.9)]",
			children: person.inlineExpansion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-emerald-500/40 bg-black p-4 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandedContent, { person })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandedContent, { person })
		}) })]
	});
}
function MissionTimeline({ schedule }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 sm:space-y-8",
		children: schedule.map((day, di) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				x: -20
			},
			animate: {
				opacity: 1,
				x: 0
			},
			transition: {
				delay: .1 * di,
				duration: .5
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-mono text-xs sm:text-sm text-emerald-400 tracking-[0.3em] uppercase mb-3 sm:mb-4",
				children: day.day
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative pl-8 sm:pl-10",
				children: day.events.map((ev, ei) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -10
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						delay: .08 * di + .06 * ei,
						duration: .4
					},
					className: "relative mb-3 sm:mb-4 last:mb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-8 sm:-left-7 top-1 h-0 w-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-widest uppercase",
							children: ev.time
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-emerald-100/80 mt-0.5",
							children: ev.label
						})
					]
				}, ei))
			})]
		}, day.day))
	});
}
var RESOURCE_PERSONS = [
	{
		name: "Dr. Geetha P",
		designation: "Principal",
		company: "KPR College Of Arts Science and Research",
		specialization: "Driving Innovation in Higher Education",
		photoUrl: "/assets/pricipal-BEeX6lyR.jpeg",
		details: [
			"Ph.D. in Science and Humanities",
			"Academic Leader",
			"Institution Builder",
			"Driving Innovation in Higher Education"
		]
	},
	{
		name: "Dr. Pradeepa K",
		designation: "Dean",
		company: "KPR College Of Arts Science and Research",
		specialization: "Dean, School of Artificial Intelligence and Data Science PhD in Artificial Intelligence",
		photoUrl: "/assets/dean-CycaDl0u.jpeg"
	},
	{
		name: "Jeeththenthar LA",
		designation: "AI Engineer",
		company: "KovanLabs",
		specialization: "AI Engineer and SaaS product builder with 3 years of experience, passionate about building practical AI solutions.",
		photoUrl: "/assets/jeeththentar-C0qgljaA.jpeg",
		inlineExpansion: true,
		details: [
			"Creator of AnalyzeDB, LearnVisually & PromptPilot.",
			"Passionate about practical AI solutions.",
			"Active in Coimbatore’s tech community.",
			"Mentor to aspiring developers."
		]
	}
];
var OBJECTIVES = [
	"Learn Generative AI fundamentals",
	"Master Prompt Engineering techniques",
	"Build AI Automation pipelines",
	"Work on real-world Projects",
	"Gain hands-on Experience"
];
var REWARDS = [
	{
		icon: Award,
		label: "Certificate"
	},
	{
		icon: Target,
		label: "Challenge Completion"
	},
	{
		icon: Rocket,
		label: "AI Skills"
	},
	{
		icon: Gift,
		label: "Surprise Rewards"
	}
];
var SCHEDULE = [{
	day: "Day 1",
	events: [
		{
			time: "09:00 AM",
			label: "Inauguration & Workshop Kickoff"
		},
		{
			time: "11:00 AM",
			label: "Generative AI Deep Dive"
		},
		{
			time: "02:00 PM",
			label: "Hands-on Lab Session"
		},
		{
			time: "04:00 PM",
			label: "Challenge Round — Nexus Judgment"
		},
		{
			time: "05:30 PM",
			label: "Networking & Wrap-up"
		}
	]
}, {
	day: "Day 2",
	events: [
		{
			time: "09:00 AM",
			label: "Advanced AI Concepts"
		},
		{
			time: "11:00 AM",
			label: "Team Challenge & Collaboration"
		},
		{
			time: "02:00 PM",
			label: "Evaluation & Scoring"
		},
		{
			time: "04:00 PM",
			label: "Certificates & Closing Ceremony"
		}
	]
}];
var DECRYPT_LINES = [
	"Decrypting Classified Archive...",
	"████████████████████████████",
	"ACCESS LEVEL VERIFIED",
	"LOADING MISSION DOSSIER..."
];
function MissionDossierScene({ onComplete, speak, isSpeaking }) {
	const [phase, setPhase] = (0, import_react.useState)("decrypt");
	const [decryptLine, setDecryptLine] = (0, import_react.useState)(0);
	const [revealedCards, setRevealedCards] = (0, import_react.useState)([]);
	const [showCta, setShowCta] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("info");
	const hasSpoken = (0, import_react.useRef)(false);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("Agent... Before entering the Shadow Realm... Review your mission carefully.", "normal");
			hasSpoken.current = true;
		}
	}, [speak]);
	(0, import_react.useEffect)(() => {
		if (phase !== "decrypt") return;
		if (decryptLine >= DECRYPT_LINES.length) {
			setTimeout(() => setPhase("content"), 600);
			return;
		}
		const t = setTimeout(() => setDecryptLine((p) => p + 1), 700);
		return () => clearTimeout(t);
	}, [phase, decryptLine]);
	(0, import_react.useEffect)(() => {
		if (phase !== "content") return;
		if (revealedCards.length >= 8) {
			setTimeout(() => setShowCta(true), 800);
			return;
		}
		const nextIdx = revealedCards.length;
		const t = setTimeout(() => {
			setRevealedCards((prev) => [...prev, nextIdx]);
		}, nextIdx === 0 ? 600 : 500);
		return () => clearTimeout(t);
	}, [phase, revealedCards]);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [revealedCards, showCta]);
	const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
			mode: "wait",
			children: [phase === "decrypt" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: {
					opacity: 0,
					filter: "brightness(2)"
				},
				className: "w-full rounded-2xl border border-emerald-500/20 bg-black/70 backdrop-blur-md p-6 sm:p-8 font-mono text-center shadow-[0_0_60px_rgba(16,185,129,0.15)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: DECRYPT_LINES.slice(0, decryptLine + 1).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							x: -10
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { duration: .3 },
						className: `text-xs sm:text-sm tracking-widest ${i === DECRYPT_LINES.length - 1 ? "text-emerald-300 font-bold" : "text-emerald-400/70"}`,
						children: line
					}, i))
				})
			}, "decrypt"), phase === "content" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { duration: .6 },
				className: "w-full rounded-2xl border border-emerald-500/20 bg-black/60 backdrop-blur-md shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scrollRef,
					className: "max-h-[70svh] md:max-h-[80vh] overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "text-center relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									initial: {
										scale: .5,
										opacity: 0
									},
									animate: {
										scale: 1,
										opacity: 1
									},
									transition: {
										delay: .2,
										type: "spring",
										stiffness: 200
									},
									className: "inline-block rounded-full border border-red-500/50 bg-red-500/10 px-3 py-0.5 font-mono text-[9px] sm:text-[10px] text-red-400 tracking-[0.3em] uppercase mb-3",
									children: "CLASSIFIED"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-serif text-2xl sm:text-3xl md:text-4xl text-emerald-50 tracking-tight",
									children: "AGENTIC AI WORKSHOP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] sm:text-xs text-emerald-400/60 tracking-[0.4em] uppercase mt-2",
									children: "Operation: Guardian's Judgment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" })
							]
						}),
						revealedCards.includes(0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DossierCard, {
							title: "Operation Name",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-lg sm:text-xl md:text-2xl text-emerald-200",
								children: "GEN AI WORKSHOP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1",
								children: "2-Day Immersive Intelligence Program"
							})]
						}),
						revealedCards.includes(1) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DossierCard, {
							title: "Duration",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-lg sm:text-xl text-emerald-200",
								children: "2 Days"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1",
								children: "Intensive Training & Challenge"
							})]
						}),
						revealedCards.includes(2) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DossierCard, {
							title: "Date",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-base sm:text-lg text-emerald-200",
								children: dateStr
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1",
								children: "Scheduled Deployment Window"
							})]
						}),
						revealedCards.includes(3) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DossierCard, {
							title: "Venue",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-base sm:text-lg text-emerald-200",
								children: "Workshop Hall — Sector 07"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1",
								children: "Secure Intelligence Facility"
							})]
						}),
						revealedCards.includes(4) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DossierCard, {
							title: "Resource Persons",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: RESOURCE_PERSONS.length === 1 ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: RESOURCE_PERSONS.map((p, i) => {
									const isLastOdd = RESOURCE_PERSONS.length % 2 !== 0 && i === RESOURCE_PERSONS.length - 1;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: RESOURCE_PERSONS.length === 1 ? "w-full max-w-sm" : isLastOdd ? "sm:col-span-2" : "",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourcePersonCard, {
											person: p,
											index: i
										})
									}, i);
								})
							})
						}),
						revealedCards.includes(5) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DossierCard, {
							title: "Mission Objectives",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: OBJECTIVES.map((obj, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
									initial: {
										opacity: 0,
										x: -10
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: {
										delay: .08 * i,
										duration: .3
									},
									className: "flex items-center gap-2 text-xs sm:text-sm text-emerald-100/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400",
										children: "✓"
									}), obj]
								}, i))
							})
						}),
						revealedCards.includes(6) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DossierCard, {
							title: "Mission Rewards",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
								children: REWARDS.map((r, i) => {
									const Icon = r.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											scale: .8
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										transition: {
											delay: .1 * i,
											duration: .4
										},
										className: "flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-center w-12 h-12 rounded-full border border-emerald-400/30 bg-transparent shadow-[0_0_10px_rgba(52,211,153,0.15)] mb-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "w-5 h-5 text-emerald-400",
												strokeWidth: 1.5
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider text-center",
											children: r.label
										})]
									}, i);
								})
							})
						}),
						revealedCards.includes(7) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DossierCard, {
							title: "Mission Schedule",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionTimeline, { schedule: SCHEDULE })
						}),
						showCta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "text-center pt-2 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { boxShadow: [
									"0 0 20px rgba(52,211,153,0.3)",
									"0 0 40px rgba(52,211,153,0.6)",
									"0 0 20px rgba(52,211,153,0.3)"
								] },
								transition: {
									duration: 2,
									repeat: Infinity
								},
								className: "inline-block rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
									onClick: onComplete,
									children: "MISSION ACCEPTED"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-mono text-[9px] sm:text-[10px] text-emerald-400/40 tracking-widest",
								children: "INITIALIZING CINEMATIC SEQUENCE"
							})]
						})
					]
				})
			}, "content")]
		})
	}) });
}
function DossierCard({ title, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			ease: "easeOut"
		},
		className: `relative rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:p-5 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative z-10 font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-[0.3em] uppercase mb-2 sm:mb-3",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children
			})
		]
	});
}
var VOICE_LINES = [];
function CinematicScene({ onComplete, speak, stop }) {
	const [subtitle, setSubtitle] = (0, import_react.useState)("");
	const speakRef = (0, import_react.useRef)(speak);
	const onCompleteRef = (0, import_react.useRef)(onComplete);
	const stoppedRef = (0, import_react.useRef)(false);
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		speakRef.current = speak;
		onCompleteRef.current = onComplete;
	});
	(0, import_react.useEffect)(() => {
		return () => {
			stoppedRef.current = true;
			stop();
		};
	}, [stop]);
	const runNarration = (0, import_react.useCallback)(async () => {
		await new Promise((r) => setTimeout(r, 400));
		if (stoppedRef.current) return;
		for (let i = 0; i < VOICE_LINES.length; i++) {
			if (stoppedRef.current) return;
			const line = VOICE_LINES[i];
			setSubtitle(line.sub);
			const waitForTimestamp = async () => {
				while (!stoppedRef.current) {
					const vid = videoRef.current;
					if (vid && vid.currentTime >= line.showAt - .1) return;
					await new Promise((r) => setTimeout(r, 100));
				}
			};
			await waitForTimestamp();
			if (stoppedRef.current) return;
			await new Promise((resolve) => {
				if (stoppedRef.current) {
					resolve();
					return;
				}
				speakRef.current(line.text);
				const wordCount = line.text.split(" ").length;
				const estimatedMs = Math.max(3e3, wordCount * 400);
				setTimeout(resolve, estimatedMs);
			});
			if (stoppedRef.current) return;
			await new Promise((r) => setTimeout(r, 600));
		}
		if (!stoppedRef.current && VOICE_LINES.length > 0) {
			setSubtitle("");
			setTimeout(() => {
				if (!stoppedRef.current) onCompleteRef.current();
			}, 1e3);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		runNarration();
	}, [runNarration]);
	const handleVideoEnd = () => {
		onCompleteRef.current();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-emerald-950 overflow-hidden select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				autoPlay: true,
				playsInline: true,
				onEnded: handleVideoEnd,
				className: "absolute inset-0 w-full h-full object-cover",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: "/videos/final.mp4",
					type: "video/mp4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950 pointer-events-none opacity-85" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,44,34,0.65))] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 max-w-2xl w-full text-center px-4 pointer-events-none z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -10
						},
						transition: { duration: .5 },
						className: "font-serif text-sm sm:text-lg md:text-2xl leading-relaxed text-emerald-50 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]",
						children: subtitle
					}, subtitle)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onComplete,
				className: "absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-black/40 px-3 py-2 sm:px-3.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
				children: "Skip Cinematic"
			})
		]
	});
}
function IntroScene({ onBegin, hasSave, candidateName, speak, isSpeaking }) {
	const hasSpoken = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("Many have entered this realm. Very few have survived. Intelligence is your only weapon. One mistake will have consequences.", "normal");
			hasSpoken.current = true;
		}
	}, [speak]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			x: -40,
			opacity: 0
		},
		animate: {
			x: 0,
			opacity: 1
		},
		transition: {
			duration: 1,
			delay: .2
		},
		className: "w-full max-w-md text-left backdrop-blur-md bg-black/40 border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] p-5 sm:p-6 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80",
				children: "TRANSMISSION // SHADOW REALM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-emerald-50",
				children: ["The Guardian's ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-emerald-300",
					children: "Judgment."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-emerald-100/80 sm:text-lg",
				children: "A hangman trial of raw tech intelligence. Seven words stand between you and validation. Make four mistakes, and your account will be locked forever."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap items-center gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
					onClick: onBegin,
					children: hasSave ? `Resume Trial, ${candidateName.split(" ")[0]}` : "Submit to Trial"
				})
			})
		]
	}) });
}
function SkillBadge({ skill, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		initial: {
			opacity: 0,
			scale: .6
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		transition: {
			delay: .05 * index,
			duration: .3
		},
		className: "inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider",
		children: skill
	});
}
function useViewport() {
	const [viewport, setViewport] = (0, import_react.useState)({
		width: typeof window !== "undefined" ? window.innerWidth : 1920,
		height: typeof window !== "undefined" ? window.innerHeight : 1080
	});
	const rafRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleResize = () => {
			if (rafRef.current != null) return;
			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null;
				setViewport({
					width: window.innerWidth,
					height: window.innerHeight
				});
			});
		};
		window.addEventListener("resize", handleResize);
		window.addEventListener("orientationchange", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("orientationchange", handleResize);
			if (rafRef.current != null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
		};
	}, []);
	return viewport;
}
function getOrientation(width, height) {
	return {
		orientation: width >= height ? "landscape" : "portrait",
		aspectRatio: width / (height || 1)
	};
}
function useResponsive() {
	const { width, height } = useViewport();
	const { orientation } = getOrientation(width, height);
	const minDim = Math.min(width, height);
	const maxDim = Math.max(width, height);
	const isPhone = minDim < 768;
	const isTablet = minDim >= 768 && maxDim < 1366;
	return {
		isPhoneLandscape: isPhone && orientation === "landscape",
		isPhonePortrait: isPhone && orientation === "portrait",
		isTablet,
		isDesktop: !isPhone && !isTablet,
		isMobile: isPhone || isTablet
	};
}
function AgentCard({ agent }) {
	const { isMobile } = useResponsive();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			scale: .95,
			filter: "blur(8px)"
		},
		animate: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)"
		},
		exit: {
			opacity: 0,
			scale: 1.05,
			filter: "blur(8px)"
		},
		transition: {
			duration: .7,
			ease: "easeInOut"
		},
		className: "w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center text-center px-4 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full flex flex-col items-center origin-top transition-transform duration-300",
			style: { transform: isMobile ? "scale(0.85)" : "scale(1)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .7
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						delay: .15,
						duration: .6,
						type: "spring",
						stiffness: 120
					},
					className: "relative mb-3 sm:mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								duration: 20,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 -m-3 sm:-m-4 rounded-full border border-dashed border-emerald-400/30"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: {
								scale: [
									1,
									1.15,
									1
								],
								opacity: [
									.4,
									0,
									.4
								]
							},
							transition: {
								duration: 2.5,
								repeat: Infinity
							},
							className: "absolute inset-0 -m-2 rounded-full border border-emerald-400/50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-20 w-20 xs:h-28 xs:w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full border-2 border-emerald-400/50 bg-gradient-to-b from-emerald-900/60 to-black/60 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)] overflow-hidden",
							children: agent.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: agent.photoUrl,
								alt: agent.name,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-10 pointer-events-none",
								style: { backgroundImage: "repeating-linear-gradient(0deg, rgba(52,211,153,0.4) 0px, rgba(52,211,153,0.4) 1px, transparent 1px, transparent 3px)" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl xs:text-3xl sm:text-4xl font-serif text-emerald-300/80 select-none",
								children: agent.initials
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							animate: { opacity: [
								1,
								.5,
								1
							] },
							transition: {
								duration: 1.5,
								repeat: Infinity
							},
							className: "absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/70 px-2.5 py-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[8px] sm:text-[9px] text-emerald-300 tracking-widest uppercase",
								children: "ONLINE"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: .3,
						duration: .5
					},
					className: "font-serif text-xl sm:text-2xl md:text-3xl text-emerald-50",
					children: agent.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .4,
						duration: .5
					},
					className: "font-mono text-[10px] sm:text-xs text-emerald-400 tracking-[0.25em] uppercase mt-1",
					children: agent.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .5,
						duration: .5
					},
					className: "font-mono text-[min(2vw,0.6rem)] sm:text-[10px] text-emerald-400/50 tracking-[0.1em] sm:tracking-[0.2em] uppercase mt-0.5 max-w-[90%] sm:max-w-md mx-auto overflow-hidden text-ellipsis line-clamp-2 leading-snug",
					children: agent.department
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .6,
						duration: .5
					},
					className: "mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-md",
					children: agent.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .7,
						duration: .5
					},
					className: "mt-2 sm:mt-3 flex flex-wrap justify-center gap-2",
					children: agent.skills.map((skill, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBadge, {
						skill,
						index: i
					}, skill))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.blockquote, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .9,
						duration: .6
					},
					className: "mt-3 sm:mt-4 relative px-4 py-2 rounded-lg border-l-2 border-emerald-400/30 bg-emerald-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs sm:text-sm italic text-emerald-200/60",
						children: [
							"\"",
							agent.quote,
							"\""
						]
					})
				})
			]
		})
	});
}
var AGENTS = [
	{
		name: "Dr. Manoj M",
		role: "Event Coordinator",
		department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
		bio: "Assistant Professor. Orchestrates and guides every moving piece behind the scenes to ensure the smooth execution of the trial.",
		skills: [
			"Logistics",
			"Coordination",
			"Data Analytics",
			"Problem Solving"
		],
		quote: "Every great trial succeeds because of flawless organization.",
		initials: "MM",
		photoUrl: "/assets/manoj-pXNkdg86.jpeg"
	},
	{
		name: "Inderash.M",
		role: "Full Stack Developer",
		department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
		bio: "Orchestrates the client architecture and the backend servers. The core architect behind the digital system.",
		skills: [
			"React",
			"Node.js",
			"MongoDB",
			"TanStack Start"
		],
		quote: "A digital ledger should record the truth without compromise.",
		initials: "IM",
		photoUrl: "/assets/inderash-C8iDPKkb.jpeg"
	},
	{
		name: "Pughal Vanan C",
		role: "UI/UX & Graphic Designer",
		department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
		bio: "Crafts high-fidelity visuals, animations, and design layouts. Builds a dark, immersive atmosphere for candidates.",
		skills: [
			"UI/UX Design",
			"Figma",
			"Framer Motion",
			"Tailwind CSS"
		],
		quote: "Visual immersion is the bridge to human focus.",
		initials: "PV",
		photoUrl: "/assets/pughal-D_KxMXpa.jpeg"
	}
];
var SEARCH_LINES = [
	"Searching Personnel Database...",
	"████████████████████████",
	"3 AGENTS FOUND",
	"Loading Personnel..."
];
function MeetAgentsScene({ onComplete, speak, isSpeaking }) {
	const [phase, setPhase] = (0, import_react.useState)("search");
	const [searchLine, setSearchLine] = (0, import_react.useState)(0);
	const [agentIndex, setAgentIndex] = (0, import_react.useState)(0);
	const hasSpoken = (0, import_react.useRef)(false);
	const touchStartX = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("Agent... Prepare to meet the technical division. These are your allies.", "normal");
			hasSpoken.current = true;
		}
	}, [speak]);
	(0, import_react.useEffect)(() => {
		if (phase !== "search") return;
		if (searchLine >= SEARCH_LINES.length) {
			setTimeout(() => setPhase("showcase"), 500);
			return;
		}
		const t = setTimeout(() => setSearchLine((p) => p + 1), 650);
		return () => clearTimeout(t);
	}, [phase, searchLine]);
	(0, import_react.useEffect)(() => {
		if (phase !== "showcase") return;
		const agent = AGENTS[agentIndex];
		speak(`Agent ${String(agentIndex + 1).padStart(2, "0")}. ${agent.role}. ${agent.department}.`, "normal");
	}, [
		phase,
		agentIndex,
		speak
	]);
	const goNext = () => {
		if (agentIndex < AGENTS.length - 1) setAgentIndex((p) => p + 1);
	};
	const goPrev = () => {
		if (agentIndex > 0) setAgentIndex((p) => p - 1);
	};
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e) => {
		const diff = touchStartX.current - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 50) if (diff > 0) goNext();
		else goPrev();
	};
	const isLast = agentIndex === AGENTS.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
			mode: "wait",
			children: [phase === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: {
					opacity: 0,
					filter: "brightness(2)"
				},
				className: "w-full rounded-2xl border border-emerald-500/20 bg-black/70 backdrop-blur-md p-6 sm:p-8 font-mono text-center shadow-[0_0_60px_rgba(16,185,129,0.15)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: SEARCH_LINES.slice(0, searchLine + 1).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							x: -10
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { duration: .3 },
						className: `text-xs sm:text-sm tracking-widest ${i === SEARCH_LINES.length - 1 ? "text-emerald-300 font-bold" : "text-emerald-400/70"}`,
						children: line
					}, i))
				})
			}, "search"), phase === "showcase" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { duration: .6 },
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: -10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						className: "text-center mb-1 sm:mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-xl sm:text-2xl md:text-3xl text-emerald-50 tracking-tight",
							children: "MEET THE AGENTS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-[0.4em] uppercase mt-1",
							children: "Guardian Technical Division"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between w-full gap-2 sm:gap-6 relative mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: goPrev,
								disabled: agentIndex === 0,
								className: "hidden sm:flex self-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 sm:p-3 items-center justify-center text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-0 transition cursor-pointer z-10 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-6 h-6 sm:w-8 sm:h-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex-1 flex items-start justify-center pt-4 sm:pt-6",
								onTouchStart: handleTouchStart,
								onTouchEnd: handleTouchEnd,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentCard, { agent: AGENTS[agentIndex] }, agentIndex)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: isLast ? onComplete : goNext,
								className: `hidden sm:flex self-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 sm:p-3 items-center justify-center text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer z-10 shrink-0 ${isLast ? "shadow-[0_0_20px_rgba(52,211,153,0.5)] animate-pulse" : "shadow-[0_0_15px_rgba(16,185,129,0.15)]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-6 h-6 sm:w-8 sm:h-8" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .5 },
						className: "mt-3 sm:mt-4 flex flex-col items-center justify-center gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex sm:hidden items-center justify-between w-full px-4 mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: goPrev,
									disabled: agentIndex === 0,
									className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300 disabled:opacity-0 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-5 h-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									children: AGENTS.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										animate: {
											width: i === agentIndex ? 20 : 6,
											opacity: i === agentIndex ? 1 : .3
										},
										transition: { duration: .3 },
										className: "h-1.5 rounded-full bg-emerald-400"
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: isLast ? onComplete : goNext,
									className: `rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300 transition ${isLast ? "shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse" : ""}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-5 h-5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden sm:flex items-center gap-1.5",
							children: AGENTS.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								animate: {
									width: i === agentIndex ? 20 : 6,
									opacity: i === agentIndex ? 1 : .3
								},
								transition: { duration: .3 },
								className: "h-1.5 rounded-full bg-emerald-400"
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-center font-mono text-[9px] sm:text-[10px] text-emerald-400/40 tracking-widest",
						children: [
							String(agentIndex + 1).padStart(2, "0"),
							" / ",
							String(AGENTS.length).padStart(2, "0")
						]
					})
				]
			}, "showcase")]
		})
	}) });
}
function VirtualKeyboard({ value, onChange, onClose, isOpen, type = "text" }) {
	const [isShift, setIsShift] = (0, import_react.useState)(false);
	const [isNumeric, setIsNumeric] = (0, import_react.useState)(false);
	const handleKeyClick = (key) => {
		if (key === "BACKSPACE") onChange(value.slice(0, -1));
		else if (key === "ENTER") onClose();
		else if (key === "SPACE") onChange(value + " ");
		else if (key === "SHIFT") setIsShift(!isShift);
		else if (key === "TOGGLE_NUM") setIsNumeric(!isNumeric);
		else {
			let char = key;
			if (!isNumeric && isShift) char = char.toUpperCase();
			onChange(value + char);
		}
	};
	const alphaRows = [
		[
			"q",
			"w",
			"e",
			"r",
			"t",
			"y",
			"u",
			"i",
			"o",
			"p"
		],
		[
			"a",
			"s",
			"d",
			"f",
			"g",
			"h",
			"j",
			"k",
			"l"
		],
		[
			"z",
			"x",
			"c",
			"v",
			"b",
			"n",
			"m"
		]
	];
	const numericRows = [
		[
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"0"
		],
		[
			"@",
			"#",
			"$",
			"_",
			"&",
			"-",
			"+",
			"(",
			")",
			"/"
		],
		[
			"*",
			"\"",
			"'",
			":",
			";",
			"!",
			"?",
			"~",
			"`",
			"|"
		]
	];
	if (type === "pin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { y: "100%" },
		animate: { y: 0 },
		exit: { y: "100%" },
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-t border-white/10 p-2 sm:p-4 shadow-[0_-20px_60px_rgba(16,185,129,0.1)] select-none pb-8 sm:pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md mx-auto flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-1 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest",
						children: "Secure PIN Entry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-xs font-bold text-emerald-400 py-1 px-2 uppercase font-mono bg-emerald-500/10 rounded border border-emerald-500/20",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						[
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7",
							"8",
							"9"
						].map((num) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: num,
							onClick: () => handleKeyClick(num)
						}, num)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: "CLR",
							onClick: () => onChange(""),
							variant: "special"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: "0",
							onClick: () => handleKeyClick("0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "w-5 h-5 mx-auto" }),
							onClick: () => handleKeyClick("BACKSPACE"),
							variant: "special"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
					label: "CONFIRM PIN",
					onClick: () => handleKeyClick("ENTER"),
					variant: "primary",
					className: "mt-1 w-full"
				})
			]
		})
	}) });
	const rows = isNumeric ? numericRows : alphaRows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { y: "100%" },
		animate: { y: 0 },
		exit: { y: "100%" },
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed bottom-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-md border-t border-white/10 p-1.5 sm:p-3 shadow-[0_-20px_60px_rgba(16,185,129,0.1)] select-none pb-6 sm:pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto flex flex-col gap-1.5 sm:gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center px-1 mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] sm:text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest",
						children: "Terminal Input Active"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-[10px] sm:text-xs font-bold text-emerald-400 py-1 px-3 uppercase font-mono bg-emerald-500/10 rounded-md border border-emerald-500/20 active:bg-emerald-500/20",
						children: "Done"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center gap-1 sm:gap-1.5 w-full",
					children: rows[0].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
						label: isShift && !isNumeric ? key.toUpperCase() : key,
						onClick: () => handleKeyClick(key)
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center gap-1 sm:gap-1.5 w-[90%] mx-auto",
					children: rows[1].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
						label: isShift && !isNumeric ? key.toUpperCase() : key,
						onClick: () => handleKeyClick(key)
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-1 sm:gap-1.5 w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: `w-4 h-4 mx-auto ${isShift ? "text-emerald-300" : "text-emerald-500/70"}` }),
							onClick: () => handleKeyClick("SHIFT"),
							variant: "special",
							className: "w-12 sm:w-16"
						}),
						rows[2].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: isShift && !isNumeric ? key.toUpperCase() : key,
							onClick: () => handleKeyClick(key)
						}, key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "w-4 h-4 mx-auto" }),
							onClick: () => handleKeyClick("BACKSPACE"),
							variant: "special",
							className: "w-12 sm:w-16"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-1 sm:gap-1.5 w-full mt-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: isNumeric ? "ABC" : "123",
							onClick: () => handleKeyClick("TOGGLE_NUM"),
							variant: "special",
							className: "w-14 sm:w-20"
						}),
						type === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: "@",
							onClick: () => handleKeyClick("@"),
							className: "w-10 sm:w-12"
						}),
						type === "mac" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: ":",
							onClick: () => handleKeyClick(":"),
							className: "w-10 sm:w-12"
						}),
						type === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: ".",
							onClick: () => handleKeyClick("."),
							className: "w-10 sm:w-12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: "SPACE",
							onClick: () => handleKeyClick("SPACE"),
							className: "flex-1 max-w-[200px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "w-4 h-4 mx-auto" }),
							onClick: () => handleKeyClick("ENTER"),
							variant: "primary",
							className: "w-14 sm:w-20"
						})
					]
				})
			]
		})
	}) });
}
function KeyButton({ label, onClick, variant = "normal", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: (e) => {
			e.preventDefault();
			onClick();
		},
		className: `h-10 sm:h-12 rounded flex items-center justify-center font-mono text-[16px] sm:text-lg transition-colors active:scale-95 touch-manipulation ${{
			normal: "bg-white/5 backdrop-blur-sm border border-white/10 text-emerald-50 active:bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
			special: "bg-emerald-900/20 backdrop-blur-sm border border-emerald-500/20 text-emerald-200/90 active:bg-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
			primary: "bg-emerald-600/30 backdrop-blur-sm border border-emerald-400/40 text-emerald-300 active:bg-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]"
		}[variant]} ${className} min-w-[8.5vw] sm:min-w-[40px] flex-1`,
		children: label
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function RegisterScene({ onComplete, speak, isSpeaking }) {
	const [tab, setTab] = (0, import_react.useState)("register");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)("");
	const [macAddress, setMacAddress] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const [activeField, setActiveField] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("input");
	const [generatedPin, setGeneratedPin] = (0, import_react.useState)("");
	const [registeredStudent, setRegisteredStudent] = (0, import_react.useState)(null);
	const [registeredQuestions, setRegisteredQuestions] = (0, import_react.useState)([]);
	const [registeredMcq, setRegisteredMcq] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const hasSpoken = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("Identify yourself. Bind your credentials or resume an existing ledger session.", "normal");
			hasSpoken.current = true;
		}
	}, [speak]);
	const handleCopy = () => {
		navigator.clipboard.writeText(generatedPin);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);
		try {
			if (tab === "register") {
				if (!name.trim() || !email.includes("@") || !dept) {
					setError("All required fields must be filled.");
					setSubmitting(false);
					return;
				}
				const res = await registerOrResumeStudent({ data: {
					name: name.trim(),
					email: email.trim().toLowerCase(),
					department: dept,
					macAddress,
					action: "register"
				} });
				if (res.error) setError(res.error);
				else if (res.student) {
					setGeneratedPin(res.loginPin || "");
					setRegisteredStudent(res.student);
					setRegisteredQuestions(res.questions);
					setRegisteredMcq(res.mcqQuestions || []);
					setPhase("pin-display");
					speak("Your unique identity is bound. Secure your access key before entering the shadow realm.", "success");
				}
			} else {
				if (!email.includes("@") || pin.trim().length !== 6) {
					setError("Please enter a valid email and 6-character PIN.");
					setSubmitting(false);
					return;
				}
				const res = await registerOrResumeStudent({ data: {
					email: email.trim().toLowerCase(),
					pin: pin.trim().toUpperCase(),
					action: "login"
				} });
				if (res.error) {
					setError(res.error);
					speak("Invalid credentials. The shadows do not recognize this binding.", "warning");
				} else if (res.student) onComplete(res.student, res.questions, res.mcqQuestions);
			}
		} catch (err) {
			setError(err?.message || "An unexpected error occurred. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	if (phase === "pin-display") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			scale: .9,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1
		},
		transition: { duration: .5 },
		className: "w-full max-w-md text-left backdrop-blur-md bg-black/50 border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold",
				children: "Identity Ledger Saved"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl sm:text-3xl text-emerald-50 leading-tight",
				children: "Identity Bound."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-emerald-100/60 leading-relaxed font-sans",
				children: "Here is your unique access PIN. You **must** save this PIN. If you refresh, log out, or switch devices, you will need this PIN to resume."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 relative bg-emerald-950/20 border border-emerald-500/20 rounded-xl px-4 py-4 sm:py-5 flex flex-col items-center justify-center gap-2.5 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono tracking-wider text-emerald-500/60 uppercase",
						children: "Your Security Access Key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl sm:text-4xl font-mono font-black tracking-[0.2em] text-emerald-300 select-all drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]",
						children: generatedPin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleCopy,
						className: "mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-[10px] font-bold text-emerald-300 transition-all cursor-pointer",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PIN COPIED" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clipboard, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COPY ACCESS KEY" })] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
					onClick: () => {
						if (registeredStudent) onComplete(registeredStudent, registeredQuestions, registeredMcq);
					},
					children: "Begin Shadow Trial →"
				})
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			y: 20,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: { duration: .8 },
		className: "w-full max-w-md text-left backdrop-blur-md bg-black/45 border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] p-4 sm:p-6 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 p-1 bg-zinc-950/60 border border-emerald-500/10 rounded-xl mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setTab("register");
						setError(null);
					},
					className: `flex-1 py-2 rounded-lg text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${tab === "register" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "text-emerald-500/50 hover:text-emerald-400 border border-transparent"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NEW TRIAL" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setTab("resume");
						setError(null);
					},
					className: `flex-1 py-2 rounded-lg text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${tab === "resume" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "text-emerald-500/50 hover:text-emerald-400 border border-transparent"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RESUME TRIAL" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400/80",
				children: tab === "register" ? "Acknowledge Identity" : "Verify Session"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-emerald-50",
				children: tab === "register" ? "Input Credentials." : "Enter Security PIN."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 sm:mt-2 text-xs text-emerald-100/60 leading-relaxed font-sans",
				children: tab === "register" ? "Your name, official email, and department will bind this single attempt. Laptop MAC address is optional. Retakes are locked." : "Provide your registered email and the unique 6-character PIN generated during registration."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: `mt-4 sm:mt-6 space-y-3.5 w-full transition-all duration-300 ${activeField ? "pb-[320px] sm:pb-[360px]" : ""}`,
				onSubmit: handleSubmit,
				children: [
					tab === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						onFocus: () => setActiveField("name"),
						inputMode: "none",
						maxLength: 40,
						required: true,
						placeholder: "Full Name",
						className: "w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						onFocus: () => setActiveField("email"),
						inputMode: "none",
						maxLength: 50,
						required: true,
						placeholder: "Official Email Address",
						className: "w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
					}) }),
					tab === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: dept,
						onValueChange: setDept,
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)] text-left flex justify-between items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Department" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							className: "bg-zinc-950 border border-emerald-500/20 text-emerald-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "csda I A section",
									children: "CSDA I A "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "csda I B section",
									children: "CSDA I B "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "csda II",
									children: "CSDA II"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "csda III",
									children: "CSDA III"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aids I A section",
									children: "AIDS I A "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aids I B section",
									children: "AIDS I B "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aids II A section",
									children: "AIDS II A "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aids II B section",
									children: "AIDS II B "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aids III",
									children: "AIDS III"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aiml I",
									children: "AIML I"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aiml II",
									children: "AIML II"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aiml III",
									children: "AIML III"
								})
							]
						})]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: macAddress,
						onChange: (e) => setMacAddress(e.target.value),
						onFocus: () => setActiveField("mac"),
						inputMode: "none",
						maxLength: 17,
						placeholder: "Laptop MAC Address (Optional, e.g. 00:1A:2B:3C:4D:5E)",
						className: "w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
					}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: pin,
						onChange: (e) => setPin(e.target.value),
						onFocus: () => setActiveField("pin"),
						inputMode: "none",
						maxLength: 6,
						required: true,
						placeholder: "6-Digit Access PIN",
						className: "w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-mono text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)] text-center tracking-[0.2em] placeholder:font-sans placeholder:tracking-normal"
					}) }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: -5
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "text-[10px] text-red-400 font-bold uppercase tracking-wider font-mono bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 text-center",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 flex items-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							disabled: submitting || (tab === "register" ? name.trim().length < 2 || !email.includes("@") || !dept : !email.includes("@") || pin.trim().length !== 6),
							children: submitting ? "Processing Ledger..." : tab === "register" ? "Initiate Judgment →" : "Verify Token →"
						})
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualKeyboard, {
		isOpen: activeField !== null,
		onClose: () => setActiveField(null),
		type: activeField === "name" ? "text" : activeField || "text",
		value: activeField === "name" ? name : activeField === "email" ? email : activeField === "mac" ? macAddress : activeField === "pin" ? pin : "",
		onChange: (val) => {
			if (activeField === "name") setName(val);
			else if (activeField === "email") setEmail(val);
			else if (activeField === "mac") setMacAddress(val);
			else if (activeField === "pin") setPin(val.substring(0, 6));
		}
	})] });
}
function BriefingScene({ student, onEnter, speak, isSpeaking }) {
	const hasSpoken = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak(`Level ${student.currentLevel}. Prepare your intellect. The gates are shifting.`, "success");
			hasSpoken.current = true;
		}
	}, [speak, student.currentLevel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			x: 30,
			opacity: 0
		},
		animate: {
			x: 0,
			opacity: 1
		},
		className: "w-full max-w-md space-y-3 sm:space-y-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80",
				children: [
					"Level ",
					String(student.currentLevel).padStart(2, "0"),
					" / 07"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-emerald-50",
				children: "Entering the Chamber of Code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-emerald-100/70 leading-relaxed",
				children: "The shadows part. The Guardian watches with cold, analytical focus. A hidden word waits behind the seal. Fail to solve it, and the void will consume your attempt."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
					onClick: onEnter,
					children: "Face the Guardian →"
				})
			})
		]
	}) });
}
var LetterKey = (0, import_react.memo)(function LetterKey({ letter, guessed, correct, disabled, onPress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		disabled: guessed || disabled,
		onClick: () => onPress(letter),
		className: `min-h-[38px] sm:min-h-[44px] h-8 sm:h-9 md:h-11 rounded-lg font-mono text-[10px] sm:text-xs md:text-sm font-bold border transition cursor-pointer select-none ${guessed ? correct ? "bg-emerald-600/30 border-emerald-500/40 text-emerald-300" : "bg-red-950/40 border-red-900/40 text-red-500/50" : disabled ? "bg-emerald-950/10 border-emerald-500/10 text-emerald-500/30 cursor-not-allowed opacity-50" : "bg-black/50 border-emerald-500/20 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/10"}`,
		children: letter
	});
});
var ChamberScene = (0, import_react.memo)(function ChamberScene({ student, question, onGuessLetter, speak, isSpeaking, submitting = false, compact = false }) {
	const [seconds, setSeconds] = (0, import_react.useState)(60);
	const [hintOpen, setHintOpen] = (0, import_react.useState)(false);
	const [inactiveAlert20, setInactiveAlert20] = (0, import_react.useState)(false);
	const [inactiveAlert40, setInactiveAlert40] = (0, import_react.useState)(false);
	const [guardianEmotionOverride, setGuardianEmotionOverride] = (0, import_react.useState)(null);
	const [pendingGuess, setPendingGuess] = (0, import_react.useState)(null);
	const lastActivityRef = (0, import_react.useRef)(Date.now());
	const inactiveAlert20Ref = (0, import_react.useRef)(false);
	const inactiveAlert40Ref = (0, import_react.useRef)(false);
	const timeoutFiredRef = (0, import_react.useRef)(false);
	const onGuessRef = (0, import_react.useRef)(onGuessLetter);
	(0, import_react.useEffect)(() => {
		onGuessRef.current = onGuessLetter;
	}, [onGuessLetter]);
	const speakRef = (0, import_react.useRef)(speak);
	(0, import_react.useEffect)(() => {
		speakRef.current = speak;
	}, [speak]);
	const submittingRef = (0, import_react.useRef)(submitting);
	(0, import_react.useEffect)(() => {
		submittingRef.current = submitting;
	}, [submitting]);
	const resetInactivity = (0, import_react.useCallback)(() => {
		lastActivityRef.current = Date.now();
		inactiveAlert20Ref.current = false;
		inactiveAlert40Ref.current = false;
		setInactiveAlert20((v) => v ? false : v);
		setInactiveAlert40((v) => v ? false : v);
		setGuardianEmotionOverride((v) => v ? null : v);
	}, []);
	const handleGuess = (0, import_react.useCallback)((char) => {
		if (submittingRef.current) return;
		if (char === "-TIMEOUT-") {
			onGuessRef.current(char);
			return;
		}
		setPendingGuess(char);
		resetInactivity();
		onGuessRef.current(char);
	}, [resetInactivity]);
	(0, import_react.useEffect)(() => {
		if (pendingGuess && student.currentGuesses.includes(pendingGuess)) setPendingGuess(null);
	}, [student.currentGuesses, pendingGuess]);
	(0, import_react.useEffect)(() => {
		const handleInteraction = () => resetInactivity();
		window.addEventListener("mousemove", handleInteraction);
		window.addEventListener("keydown", handleInteraction);
		window.addEventListener("click", handleInteraction);
		return () => {
			window.removeEventListener("mousemove", handleInteraction);
			window.removeEventListener("keydown", handleInteraction);
			window.removeEventListener("click", handleInteraction);
		};
	}, [resetInactivity]);
	(0, import_react.useEffect)(() => {
		const checkTimer = setInterval(() => {
			const elapsed = Date.now() - lastActivityRef.current;
			if (elapsed > 45e3) {
				if (!inactiveAlert40Ref.current) {
					inactiveAlert40Ref.current = true;
					setInactiveAlert40(true);
					setGuardianEmotionOverride("warning");
					speakRef.current("Time waits for no one.", "warning");
				}
			} else if (elapsed > 3e4) {
				if (!inactiveAlert20Ref.current) {
					inactiveAlert20Ref.current = true;
					setInactiveAlert20(true);
					setGuardianEmotionOverride("talking");
					speakRef.current("Have the shadows frightened you?", "normal");
				}
			}
		}, 1e3);
		return () => clearInterval(checkTimer);
	}, []);
	const handleGuessRef = (0, import_react.useRef)(handleGuess);
	(0, import_react.useEffect)(() => {
		handleGuessRef.current = handleGuess;
	}, [handleGuess]);
	const stateRef = (0, import_react.useRef)({
		guesses: student.currentGuesses,
		submitting
	});
	(0, import_react.useEffect)(() => {
		stateRef.current = {
			guesses: student.currentGuesses,
			submitting
		};
	}, [student.currentGuesses, submitting]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			const { guesses, submitting: isSubmitting } = stateRef.current;
			if (isSubmitting) return;
			const char = e.key.toUpperCase();
			if (/^[A-Z]$/.test(char) && !guesses.includes(char)) handleGuessRef.current(char);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleGuess]);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setSeconds((s) => s <= 1 ? 0 : s - 1);
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		if (seconds === 0 && !timeoutFiredRef.current) {
			timeoutFiredRef.current = true;
			handleGuess("-TIMEOUT-");
		}
	}, [seconds]);
	(0, import_react.useEffect)(() => {
		if (hintOpen) speak(question.hint, "warning");
	}, [
		hintOpen,
		speak,
		question.hint
	]);
	const displayWord = (0, import_react.useMemo)(() => {
		return question.word.split("").map((c) => {
			if (student.currentGuesses.includes(c) || pendingGuess === c) return c;
			if (c === " ") return " ";
			return "_";
		});
	}, [
		question.word,
		student.currentGuesses,
		pendingGuess
	]);
	const keyboardKeys = (0, import_react.useMemo)(() => {
		const guessedSet = new Set(student.currentGuesses);
		if (pendingGuess) guessedSet.add(pendingGuess);
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
			letter,
			guessed: guessedSet.has(letter),
			correct: question.word.includes(letter)
		}));
	}, [
		student.currentGuesses,
		pendingGuess,
		question.word
	]);
	const card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "w-full max-w-lg rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-black/80 to-zinc-950 p-4 sm:p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-4 sm:space-y-6 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-emerald-500/10 pb-3 sm:pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-emerald-400/80",
					children: "Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs sm:text-sm font-extrabold text-emerald-200 tracking-wide",
					children: question.category
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 sm:gap-2 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-emerald-100",
						children: [seconds, "s"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center flex-wrap gap-1.5 sm:gap-2 py-2 sm:py-4",
				children: displayWord.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-mono text-xl sm:text-3xl md:text-5xl font-black w-6 sm:w-8 md:w-12 text-center border-b-2 transition ${c === "_" ? "border-emerald-500/40 text-transparent" : "border-emerald-400 text-emerald-100"}`,
					children: c
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-9 sm:grid-cols-10 gap-1 sm:gap-1.5 md:gap-2 justify-center max-w-xl mx-auto pt-2",
				children: keyboardKeys.map(({ letter, guessed, correct }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterKey, {
					letter,
					guessed,
					correct,
					disabled: guessed,
					onPress: handleGuess
				}, letter))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-3 sm:pt-4 flex items-center justify-between border-t border-emerald-500/10 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setHintOpen(!hintOpen),
					className: "font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/80 hover:text-emerald-200 cursor-pointer flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5" }), hintOpen ? "Hide Whisper" : "Request Guardian Clue"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[9px] text-emerald-500/50 uppercase hidden sm:inline",
					children: submitting ? "processing matrix..." : "keyboard inputs accepted"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hintOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				className: "text-xs italic text-emerald-300/80 border-l border-emerald-500/30 pl-3 leading-relaxed font-medium",
				children: [
					"“",
					question.hint,
					"”"
				]
			}) })
		]
	});
	if (compact) return card;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: card });
});
function InlineLeaderboard({ currentEmail }) {
	const [leaderboard, setLeaderboard] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getLeaderboardData({ data: {
			page: 1,
			limit: 10
		} }).then((res) => {
			if (res.success && res.students) setLeaderboard(res.students);
		}).catch(console.error);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-2 space-y-3.5 font-mono text-xs w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold flex items-center justify-between border-b border-emerald-500/20 pb-2 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Global Leadership Standings" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-emerald-500/60 text-[9px] uppercase tracking-wider",
				children: "Top 5"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "h-40 sm:h-48 pr-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: leaderboard.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] text-emerald-500/40 italic py-2.5 text-center border border-dashed border-emerald-500/10 rounded-xl",
					children: "Connecting to ledger matrix..."
				}) : leaderboard.slice(0, 5).map((s, idx) => {
					const isUser = s.email === currentEmail;
					const rankStyles = idx === 0 ? "border-[#FFD700]/30 text-yellow-300 bg-yellow-500/5 shadow-[0_0_12px_rgba(251,191,36,0.1)]" : idx === 1 ? "border-[#C0C0C0]/30 text-slate-350 bg-slate-300/5 shadow-[0_0_12px_rgba(203,213,225,0.1)]" : idx === 2 ? "border-[#CD7F32]/30 text-amber-600 bg-amber-800/5 shadow-[0_0_12px_rgba(180,83,9,0.1)]" : isUser ? "border-emerald-400/60 bg-emerald-500/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]" : "border-emerald-500/10 bg-black/40";
					const rankBadgeColor = idx === 0 ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40" : idx === 1 ? "bg-slate-300/20 text-slate-300 border-slate-300/40" : idx === 2 ? "bg-amber-700/20 text-amber-500 border-amber-800/40" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `px-3 py-2.5 border rounded-xl flex items-center justify-between transition-all hover:scale-[1.01] hover:border-emerald-500/35 hover:bg-black/50 ${rankStyles}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `w-5 h-5 rounded border text-[9px] font-black flex items-center justify-center ${rankBadgeColor}`,
									children: ["#", idx + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-black uppercase text-emerald-100",
									children: s.name.slice(0, 2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[11px] ${isUser ? "text-emerald-300 font-bold" : "text-emerald-150"}`,
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-emerald-500/50 uppercase tracking-wide",
										children: s.department
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-[11px] text-emerald-300",
							children: [s.score, " XP"]
						})]
					}, `${s.email}-${idx}`);
				})
			})
		})]
	});
}
function VerdictScene({ student, onContinue, speak, isSpeaking }) {
	const hasSpoken = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("You solved the seal. You move deeper into the dark.", "success");
			hasSpoken.current = true;
		}
	}, [speak]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			x: 30
		},
		animate: {
			opacity: 1,
			x: 0
		},
		className: "w-full max-w-md space-y-3 sm:space-y-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400",
				children: "Seal Solved"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-emerald-100",
				children: "You solved the code."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-emerald-100/70 leading-relaxed",
				children: "The code resonates. The Guardian nods slightly, allowing you passage deeper into the Sector 07 chambers."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3 sm:gap-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/60 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-2 font-mono text-center flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] sm:text-[9px] uppercase tracking-wider text-emerald-400/60",
						children: "Current XP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-base sm:text-lg font-bold text-emerald-100",
						children: [student.score, " XP"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/60 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-2 font-mono text-center flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] sm:text-[9px] uppercase tracking-wider text-emerald-400/60",
						children: "Level Finished"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-base sm:text-lg font-bold text-emerald-100",
						children: [student.levelsCompleted, " / 3"]
					})]
				})]
			}),
			student.levelsCompleted === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLeaderboard, { currentEmail: student.email }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
					onClick: onContinue,
					children: student.locked ? "Final Evaluation →" : "Proceed to next level →"
				})
			})
		]
	}) });
}
function FinalScene({ student, speak, isSpeaking, onRestart, onReturnHome }) {
	const hasSpoken = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak(`Assessment complete. Your final score is ${student.mcqScore ?? student.score}. Your attempt is locked.`, "final");
			hasSpoken.current = true;
		}
	}, [
		speak,
		student.score,
		student.mcqScore
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-lg bg-black/75 border border-emerald-950/40 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6 text-left shadow-[0_20px_50px_rgba(16,185,129,0.15)] animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs text-emerald-400 font-extrabold uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]",
				children: "Trial Complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl sm:text-4xl md:text-5xl text-emerald-100 font-bold uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]",
				children: "Judgment Rendered"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-zinc-300 text-sm leading-relaxed",
				children: "Your credentials and final score have been submitted and locked to the system database. Retesting or resetting questions is disabled."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full pt-2 font-mono",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/70 border border-emerald-500/25 rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-400/60",
							children: "Total Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-black text-emerald-100",
							children: student.mcqScore ?? student.score
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/70 border border-emerald-500/25 rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-400/60",
							children: "Time Elapsed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-black text-emerald-100 mt-1",
							children: [
								Math.floor(student.timeTaken / 60),
								"m ",
								student.timeTaken % 60,
								"s"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/70 border border-emerald-500/25 rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-400/60",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-black text-emerald-300 mt-1.5 uppercase",
							children: student.status
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLeaderboard, { currentEmail: student.email }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onRestart,
					className: "flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
					children: "New Trial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onReturnHome,
					className: "flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
					children: "Exit Terminal"
				})]
			})
		]
	}) });
}
function GameOverScene({ student, speak, isSpeaking, onTryAgain, onReturnHome }) {
	const hasSpoken = (0, import_react.useRef)(false);
	const [phase, setPhase] = (0, import_react.useState)("guardian");
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak("Account Terminated. You have been eliminated from the Shadow Realm.", "wrong");
			hasSpoken.current = true;
		}
	}, [speak]);
	(0, import_react.useEffect)(() => {
		const t1 = setTimeout(() => setPhase("note"), 2e3);
		const t2 = setTimeout(() => setPhase("details"), 4e3);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);
	const wrongLetter = student.currentGuesses[student.currentGuesses.length - 1] || "N/A";
	const accuracyRate = student.attempts > 0 ? Math.round((student.levelsCompleted || 1) / (student.attempts || 1) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.15),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-lg mx-auto space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
			mode: "wait",
			children: [phase === "guardian" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "relative flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: [
							0,
							.8,
							0
						] },
						transition: {
							duration: .6,
							delay: .3
						},
						className: "absolute inset-0 bg-red-600/20 pointer-events-none rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: .5,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: {
							duration: .8,
							type: "spring",
							stiffness: 80
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { boxShadow: [
								"0 0 40px rgba(239,68,68,0.4)",
								"0 0 80px rgba(239,68,68,0.7)",
								"0 0 40px rgba(239,68,68,0.4)"
							] },
							transition: {
								duration: 1.5,
								repeat: Infinity
							},
							className: "h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-red-500/60 bg-gradient-to-b from-red-900/40 to-black/80 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-5xl sm:text-6xl font-serif text-red-400/80 select-none",
								children: "G"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { top: [
								"0%",
								"100%",
								"0%"
							] },
							transition: {
								duration: 2,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent pointer-events-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .8 },
						className: "mt-4 font-mono text-xs text-red-400/70 tracking-[0.3em] uppercase text-center",
						children: "The Guardian has passed judgment..."
					})
				]
			}, "guardian"), phase === "note" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .8,
					y: 20
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				transition: {
					duration: .6,
					type: "spring",
					stiffness: 100
				},
				className: "relative mx-auto max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_30px_80px_rgba(239,68,68,0.25)] text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							scale: 3,
							opacity: 0,
							rotate: -15
						},
						animate: {
							scale: 1,
							opacity: 1,
							rotate: -12
						},
						transition: {
							delay: .3,
							duration: .4,
							type: "spring"
						},
						className: "absolute top-3 right-3 sm:top-4 sm:right-4 border-2 border-red-500 rounded px-2 py-0.5 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] sm:text-xs text-red-500 font-black tracking-widest uppercase",
							children: "TERMINATED"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] text-red-400/60 tracking-[0.4em] uppercase mb-2",
								children: "Official Death Note"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-xl sm:text-2xl md:text-3xl text-red-500 font-black uppercase tracking-wider",
								children: "YOU HAVE BEEN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl sm:text-3xl md:text-4xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)]",
								children: "ELIMINATED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-zinc-100 text-xs sm:text-sm leading-relaxed font-bold px-2",
								children: "Your account has been locked. The Guardian has deemed you unworthy of proceeding. No second chances or resets are permitted."
							})
						]
					})]
				})
			}, "note")]
		}), phase === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#121319]/80 backdrop-blur-md border border-red-500/35 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-mono text-left w-full space-y-3 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-red-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-red-900/30 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "w-4 h-4 text-red-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Elimination Diagnostic Log" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-y-3.5 gap-x-5 text-[11px] text-zinc-200 font-bold leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Wrong Guess:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-red-300 font-black uppercase",
										children: wrongLetter
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Failed Level:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-red-300 font-black",
										children: [student.currentLevel, " / 3"]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"XP Earned:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-red-300 font-black",
										children: [student.score, " XP"]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Total Time:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-red-300 font-black",
										children: [
											Math.floor(student.timeTaken / 60),
											"m ",
											student.timeTaken % 60,
											"s"
										]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Accuracy: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-red-300 font-black",
									children: [accuracyRate, "%"]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 text-red-400 shrink-0 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Remaining Lives: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-red-300 font-black",
									children: "0 / 4"
								})] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLeaderboard, { currentEmail: student.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onTryAgain,
						className: "flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
						children: "Try Again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onReturnHome,
						className: "flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
						children: "Return Home"
					})]
				})
			]
		})]
	})] });
}
var images_default = "/assets/images-BErr0wbI.png";
function TopHud({ student, scene, onOpenLeaderboard, onOpenProfile, voiceEnabled, onToggleVoice }) {
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);
	const toggleFullScreen = () => {
		if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch((err) => {
			console.error(`Error attempting to enable full-screen mode: ${err.message}`);
		});
		else if (document.exitFullscreen) document.exitFullscreen();
	};
	if (scene === "boot" || scene === "intro" || scene === "register" || scene === "cinematic") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6 pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl items-center justify-between gap-2 sm:gap-3 rounded-2xl border border-emerald-500/20 bg-black/70 px-2.5 sm:px-3 py-1.5 backdrop-blur-xl pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.8)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images_default,
						alt: "NexusPro",
						className: "h-4 w-4 rounded object-contain shrink-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[8px] uppercase tracking-[0.2em] text-emerald-400/80 sm:text-[10px] shrink-0",
						children: "Guardian Trial"
					}),
					student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold tracking-wide text-emerald-100 hidden sm:block truncate",
						children: student.name
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 sm:gap-4 shrink-0",
				children: [student && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.1em] text-emerald-400/60",
							children: "Lv"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] sm:text-xs font-bold text-emerald-300",
							children: student.status === "Completed" || student.status === "Qualified" ? "3/3" : `${student.currentLevel}/3`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.1em] text-emerald-400/50",
							children: "XP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] sm:text-xs text-emerald-100 font-bold",
							children: student.score
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:flex items-center gap-1",
						children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-3 w-3 ${i < 4 - student.wrongAnswersCount ? "text-emerald-400 fill-emerald-500/20" : "text-red-600 fill-red-800/40"}` }, i))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-1.5 border-l border-emerald-500/20 pl-2 sm:pl-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleFullScreen,
							className: "p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition",
							title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
							children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onOpenLeaderboard,
							className: "p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition",
							title: "Leaderboard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onOpenProfile,
							className: "p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition",
							title: "Profile",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onToggleVoice,
							className: "p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition",
							title: voiceEnabled ? "Mute Voice" : "Unmute Voice",
							children: voiceEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" })
						})
					]
				})]
			})]
		})
	});
}
function LeaderboardModal({ data, currentEmail, onClose }) {
	const sorted = (0, import_react.useMemo)(() => {
		return [...data].sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
	}, [data]);
	const top3 = sorted.slice(0, 3);
	const top10 = sorted.slice(3, 10);
	const rest = sorted.slice(10);
	const stats = (0, import_react.useMemo)(() => {
		const userIdx = sorted.findIndex((s) => s.email === currentEmail);
		const userRank = userIdx !== -1 ? userIdx + 1 : null;
		const highest = sorted.length > 0 ? sorted[0].score : 0;
		return {
			total: sorted.length,
			userRank,
			highest
		};
	}, [sorted, currentEmail]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			className: "bg-zinc-950 border border-emerald-500/20 rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col font-mono text-xs shadow-2xl shadow-emerald-500/5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-emerald-500/10 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4.5 w-4.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-emerald-200 uppercase tracking-widest",
							children: "Global Standings"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-emerald-400 hover:text-emerald-200 cursor-pointer",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 border-b border-emerald-500/10 bg-black/40 text-center py-3 text-[10px] text-emerald-400/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["TOTAL PARTICIPANTS: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-100 font-bold",
							children: stats.total
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"YOUR RANK:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-100 font-bold",
								children: stats.userRank ? `#${stats.userRank}` : "N/A"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["HIGHEST SCORE: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-emerald-100 font-bold",
							children: [stats.highest, " XP"]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 pr-4 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 space-y-4",
						children: [
							top3.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3",
								children: top3.map((student, idx) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `border rounded-xl p-3 text-center flex flex-col items-center justify-between ${[
											"border-amber-400/50 bg-amber-500/5 text-amber-300",
											"border-slate-300/40 bg-slate-400/5 text-slate-300",
											"border-amber-700/40 bg-amber-800/5 text-amber-600"
										][idx] || ""}`,
										children: [
											idx === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg",
												children: "👑"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-[10px] uppercase tracking-wider mt-1 mb-2 max-w-full truncate",
												children: student.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs font-black",
												children: [student.score, " XP"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[8px] opacity-60 mt-1",
												children: student.department
											})
										]
									}, `${student.email}-${idx}`);
								})
							}),
							top10.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5",
									children: "Top Contenders"
								}), top10.map((student, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-black/50 border border-emerald-500/10 rounded-xl px-4 py-2.5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-emerald-400",
											children: ["#", idx + 4]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-emerald-100",
												children: student.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] text-emerald-500/60",
												children: student.department
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-emerald-200",
											children: [student.score, " XP"]
										})
									})]
								}, `${student.email}-${idx}`))]
							}),
							rest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5",
									children: "Global Rankings"
								}), rest.map((student, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-black/30 border border-emerald-500/5 rounded-lg px-4 py-2 flex items-center justify-between text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-400/50 font-bold",
											children: ["#", idx + 11]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-300/80",
											children: student.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-emerald-400/70",
										children: [student.score, " XP"]
									})]
								}, `${student.email}-${idx}`))]
							})
						]
					})
				})
			]
		})
	});
}
function ProfileModal({ student, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			className: "bg-zinc-950 border border-emerald-500/20 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col font-mono text-xs shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-b border-emerald-500/10 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4.5 w-4.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-emerald-200 uppercase tracking-widest",
						children: "Candidate Profile"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-emerald-400 hover:text-emerald-200 cursor-pointer",
					children: "✕"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-500/60",
							children: "Candidate Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-emerald-100",
							children: student.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-500/60",
							children: "Department"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-emerald-100",
							children: student.department
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] uppercase tracking-wider text-emerald-500/60",
							children: "Registered Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-emerald-200/80",
							children: student.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 pt-2 border-t border-emerald-500/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[8px] uppercase tracking-wider text-emerald-500/60",
								children: "Completed Levels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-sm sm:text-base font-bold text-white",
								children: [student.levelsCompleted, " / 3"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[8px] uppercase tracking-wider text-emerald-500/60",
								children: "Status Tag"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase mt-1 border ${student.status === "Qualified" ? "bg-emerald-500/10 border-emerald-400 text-emerald-300" : student.status === "Completed" ? "bg-purple-500/10 border-purple-400 text-purple-300" : student.status === "Eliminated" ? "bg-red-500/10 border-red-400 text-red-400" : "bg-blue-500/10 border-blue-400 text-blue-300"}`,
								children: student.status
							})]
						})]
					})
				]
			})]
		})
	});
}
var DEFAULT_TIME$1 = 60;
function useMCQAssessment(questions, email) {
	const STORAGE_KEY = `nexus_mcq_session_${email}`;
	const [state, setState] = (0, import_react.useState)(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) try {
			const parsed = JSON.parse(saved);
			if (typeof parsed.currentQuestionIndex !== "number" || parsed.currentQuestionIndex >= questions.length || parsed.currentQuestionIndex < 0) parsed.currentQuestionIndex = 0;
			if (typeof parsed.timeRemaining !== "number" || parsed.timeRemaining > DEFAULT_TIME$1 || parsed.timeRemaining < 0) parsed.timeRemaining = DEFAULT_TIME$1;
			if (!parsed.answers) parsed.answers = {};
			if (!parsed.statuses) parsed.statuses = {};
			return parsed;
		} catch (e) {
			console.error("Failed to parse saved session", e);
		}
		return {
			answers: {},
			statuses: {},
			timeRemaining: DEFAULT_TIME$1,
			currentQuestionIndex: 0
		};
	});
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state, STORAGE_KEY]);
	(0, import_react.useEffect)(() => {
		let lastTick = Date.now();
		const interval = setInterval(() => {
			const now = Date.now();
			const elapsed = Math.floor((now - lastTick) / 1e3);
			if (elapsed <= 0) return;
			lastTick = now;
			setState((s) => s.timeRemaining <= 0 ? s : {
				...s,
				timeRemaining: Math.max(0, s.timeRemaining - elapsed)
			});
		}, 250);
		return () => clearInterval(interval);
	}, []);
	const answerQuestion = (questionId, optionIndex) => {
		setState((s) => ({
			...s,
			answers: {
				...s.answers,
				[questionId]: optionIndex
			},
			statuses: {
				...s.statuses,
				[questionId]: "answered"
			}
		}));
	};
	const setAnswer = (questionId, value) => {
		setState((s) => ({
			...s,
			answers: {
				...s.answers,
				[questionId]: value
			},
			statuses: {
				...s.statuses,
				[questionId]: "answered"
			}
		}));
	};
	const markQuestion = (questionId) => {
		setState((s) => ({
			...s,
			statuses: {
				...s.statuses,
				[questionId]: "marked"
			}
		}));
	};
	const skipQuestion = (questionId) => {
		setState((s) => ({
			...s,
			statuses: {
				...s.statuses,
				[questionId]: "skipped"
			}
		}));
	};
	const goToNext = () => {
		if (state.currentQuestionIndex < questions.length - 1) setState((s) => ({
			...s,
			currentQuestionIndex: s.currentQuestionIndex + 1,
			timeRemaining: DEFAULT_TIME$1
		}));
	};
	const goToPrevious = () => {
		if (state.currentQuestionIndex > 0) setState((s) => ({
			...s,
			currentQuestionIndex: s.currentQuestionIndex - 1
		}));
	};
	const jumpToQuestion = (index) => {
		if (index >= 0 && index < questions.length) setState((s) => ({
			...s,
			currentQuestionIndex: index
		}));
	};
	const clearSession = () => {
		localStorage.removeItem(STORAGE_KEY);
		setState({
			answers: {},
			statuses: {},
			timeRemaining: DEFAULT_TIME$1,
			currentQuestionIndex: 0
		});
	};
	return {
		state,
		answerQuestion,
		setAnswer,
		markQuestion,
		skipQuestion,
		goToNext,
		goToPrevious,
		jumpToQuestion,
		clearSession,
		currentQuestion: questions[state.currentQuestionIndex]
	};
}
var DEFAULT_TIME = 60;
function MCQAssessment({ email, questions, onComplete, chamberRound = false, chamberStudent = null, chamberQuestion = null, onGuessLetter, chamberSubmitting = false, speak, isSpeaking = false }) {
	const { state, answerQuestion, setAnswer, markQuestion, skipQuestion, goToNext, goToPrevious, currentQuestion } = useMCQAssessment(questions, email);
	const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
	const isFirstQuestion = state.currentQuestionIndex === 0;
	const isPrompt = (q) => q.type === "prompt";
	const isFillBlank = (q) => q.type === "fillblank";
	(0, import_react.useEffect)(() => {
		if (state.timeRemaining <= 0) if (isLastQuestion) onComplete(state.answers, 0);
		else goToNext();
	}, [
		state.timeRemaining,
		onComplete,
		state.answers,
		isLastQuestion,
		goToNext
	]);
	const handleNext = () => {
		if (isLastQuestion) onComplete(state.answers, DEFAULT_TIME - state.timeRemaining);
		else goToNext();
	};
	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s < 10 ? "0" : ""}${s}`;
	};
	if (chamberRound) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl max-h-[90vh]",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "p-3 sm:p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-2 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400",
					children: "Round 2 / 2 · Chamber Trial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs sm:text-sm font-bold text-emerald-400",
					children: "Final Round"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-1 bg-white/10 rounded-full overflow-hidden mx-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-emerald-500",
					style: { width: "100%" }
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "w-full p-4 sm:p-6 bg-zinc-900 flex flex-col gap-4 overflow-y-auto flex-1",
			children: chamberStudent && chamberQuestion && onGuessLetter && speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChamberScene, {
				compact: true,
				student: chamberStudent,
				question: chamberQuestion,
				onGuessLetter,
				speak,
				isSpeaking,
				submitting: chamberSubmitting
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-12 text-center space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-red-500 font-mono text-xl sm:text-2xl tracking-widest uppercase",
					children: "Loading Chamber..."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-red-400/80 font-mono text-xs sm:text-sm",
					children: "SUMMONING THE GUARDIAN."
				})]
			})
		})]
	}) });
	if (!currentQuestion) return null;
	const promptValue = typeof state.answers[currentQuestion.id] === "string" ? state.answers[currentQuestion.id] : "";
	const fillValue = typeof state.answers[currentQuestion.id] === "string" ? state.answers[currentQuestion.id] : "";
	const fillBlankParts = isFillBlank(currentQuestion) ? currentQuestion.text.split("___") : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl max-h-[90vh]",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "p-3 sm:p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-2 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400",
						children: [
							"Question ",
							state.currentQuestionIndex + 1,
							" / ",
							questions.length,
							" ·",
							" ",
							currentQuestion.category
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs sm:text-sm font-bold text-red-400",
						children: formatTime(state.timeRemaining)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-1 bg-white/10 rounded-full overflow-hidden mx-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-emerald-500 transition-all duration-300",
						style: { width: `${(state.currentQuestionIndex + 1) / questions.length * 100}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "w-full p-4 sm:p-6 bg-zinc-900 flex flex-col gap-4 overflow-y-auto flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base md:text-lg font-serif text-white leading-tight",
						children: currentQuestion.text
					})
				}), isPrompt(currentQuestion) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 sm:p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-1",
								children: "AI Topic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base text-emerald-100 font-medium leading-relaxed",
								children: currentQuestion.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: promptValue,
							onChange: (e) => setAnswer(currentQuestion.id, e.target.value),
							placeholder: "Write your AI prompt here...",
							rows: 7,
							className: "w-full resize-y rounded-xl border border-white/10 bg-black/40 text-sm sm:text-base text-white placeholder-zinc-500 p-3 sm:p-4 leading-relaxed focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-colors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-zinc-500 italic",
								children: "Be specific — a role, context and clear output expectations make a prompt stronger."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] text-zinc-500 shrink-0",
								children: [promptValue.trim().length, " chars"]
							})]
						})
					]
				}) : isFillBlank(currentQuestion) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm sm:text-base md:text-lg font-serif text-zinc-100 leading-relaxed",
						children: fillBlankParts.map((part, idx, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [part, idx < arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: fillValue,
							onChange: (e) => setAnswer(currentQuestion.id, e.target.value),
							placeholder: "type your answer",
							autoComplete: "off",
							className: "mx-1 inline-block w-40 sm:w-52 max-w-[60%] px-2 py-0.5 rounded-md border-b-2 border-emerald-500/60 bg-black/40 text-sm sm:text-base text-emerald-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 focus:bg-emerald-500/5 transition-colors"
						})] }, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] sm:text-xs text-zinc-500 italic",
							children: "Fill in the blank with the correct term."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-zinc-500 shrink-0",
							children: [fillValue.trim().length, " chars"]
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2 sm:gap-3 shrink-0",
					children: currentQuestion.options.map((option, idx) => {
						const isSelected = state.answers[currentQuestion.id] === idx;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => answerQuestion(currentQuestion.id, idx),
							className: `text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-center min-h-[44px] sm:min-h-[60px] ${isSelected ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-emerald-500" : "border-white/20"}`,
									children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs sm:text-sm leading-snug",
									children: option
								})]
							})
						}, idx);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "p-3 sm:p-4 border-t border-white/10 bg-zinc-950",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: goToPrevious,
							disabled: isFirstQuestion,
							className: `flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors ${isFirstQuestion ? "opacity-30 cursor-not-allowed text-zinc-500 bg-white/5" : "text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10"}`,
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => markQuestion(currentQuestion.id),
							className: "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-yellow-400 hover:bg-white/10 transition-colors shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleNext,
							className: "flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors",
							children: isLastQuestion ? "Submit" : "Next"
						})
					]
				})
			})
		]
	}) });
}
function McqResultScene({ student, results, onContinue, onReturnHome, speak }) {
	const hasSpoken = (0, import_react.useRef)(false);
	const [phase, setPhase] = (0, import_react.useState)("guardian");
	(0, import_react.useEffect)(() => {
		if (!hasSpoken.current) {
			speak(`Assessment complete. You scored ${results.score} out of ${results.totalQuestions}. Your final result awaits.`, "success");
			hasSpoken.current = true;
		}
	}, [
		speak,
		results.score,
		results.totalQuestions
	]);
	(0, import_react.useEffect)(() => {
		const t1 = setTimeout(() => setPhase("note"), 2e3);
		const t2 = setTimeout(() => setPhase("details"), 4e3);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);
	const strengthColor = results.promptStrength >= 70 ? "bg-emerald-500" : results.promptStrength >= 40 ? "bg-amber-500" : "bg-rose-500";
	const strengthLabel = results.promptStrength >= 70 ? "Strong" : results.promptStrength >= 40 ? "Moderate" : "Weak";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.15),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-lg mx-auto space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
			mode: "wait",
			children: [phase === "guardian" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "relative flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: [
							0,
							.8,
							0
						] },
						transition: {
							duration: .6,
							delay: .3
						},
						className: "absolute inset-0 bg-red-600/20 pointer-events-none rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: .5,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: {
							duration: .8,
							type: "spring",
							stiffness: 80
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { boxShadow: [
								"0 0 40px rgba(239,68,68,0.4)",
								"0 0 80px rgba(239,68,68,0.7)",
								"0 0 40px rgba(239,68,68,0.4)"
							] },
							transition: {
								duration: 1.5,
								repeat: Infinity
							},
							className: "h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-red-500/60 bg-gradient-to-b from-red-900/40 to-black/80 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-5xl sm:text-6xl font-serif text-red-400/80 select-none",
								children: "G"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { top: [
								"0%",
								"100%",
								"0%"
							] },
							transition: {
								duration: 2,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent pointer-events-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .8 },
						className: "mt-4 font-mono text-xs text-red-400/70 tracking-[0.3em] uppercase text-center",
						children: "The Guardian reviews your trial..."
					})
				]
			}, "guardian"), phase === "note" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .8,
					y: 20
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				transition: {
					duration: .6,
					type: "spring",
					stiffness: 100
				},
				className: "relative mx-auto max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_30px_80px_rgba(239,68,68,0.25)] text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							scale: 3,
							opacity: 0,
							rotate: -15
						},
						animate: {
							scale: 1,
							opacity: 1,
							rotate: -12
						},
						transition: {
							delay: .3,
							duration: .4,
							type: "spring"
						},
						className: "absolute top-3 right-3 sm:top-4 sm:right-4 border-2 border-red-500 rounded px-2 py-0.5 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] sm:text-xs text-red-500 font-black tracking-widest uppercase",
							children: "COMPLETE"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] text-red-400/60 tracking-[0.4em] uppercase mb-2",
								children: "Official Trial Verdict"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-xl sm:text-2xl md:text-3xl text-red-500 font-black uppercase tracking-wider",
								children: "ROUND 1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl sm:text-3xl md:text-4xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)]",
								children: "TRIAL RESULTS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-zinc-100 text-xs sm:text-sm leading-relaxed font-bold px-2",
								children: [student.name, ", your technical assessment has been recorded and judged. Proceed to final evaluation."]
							})
						]
					})]
				})
			}, "note")]
		}), phase === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#121319]/80 backdrop-blur-md border border-red-500/35 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-mono text-left w-full space-y-3 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-red-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-red-900/30 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "w-4 h-4 text-red-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trial Diagnostic Log" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-y-3.5 gap-x-5 text-[11px] text-zinc-200 font-bold leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Trial Score:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-red-300 font-black",
											children: [
												results.score,
												" / ",
												results.totalQuestions
											]
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Percentage:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-red-300 font-black",
											children: [results.percentage.toFixed(1), "%"]
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Prompt Strength:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-red-300 font-black",
											children: [results.promptStrength, "/100"]
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [results.fillBlankSolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-red-400 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Fill in the Blank:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-red-300 font-black uppercase",
											children: results.fillBlankSolved ? "Correct" : "Incorrect"
										})
									] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-wider text-red-400/70",
										children: "Prompt Strength"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${results.promptStrength >= 70 ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" : results.promptStrength >= 40 ? "text-amber-400 border-amber-500/40 bg-amber-500/10" : "text-rose-400 border-rose-500/40 bg-rose-500/10"}`,
										children: strengthLabel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-2 bg-white/10 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full ${strengthColor} transition-all duration-1000`,
										style: { width: `${Math.max(0, Math.min(100, results.promptStrength))}%` }
									})
								}),
								results.promptTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-zinc-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-400/70 uppercase tracking-wider",
										children: "Topic: "
									}), results.promptTitle]
								}),
								results.promptText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-zinc-400 leading-relaxed border-l-2 border-red-500/30 pl-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-400/70 uppercase tracking-wider",
										children: "Prompt: "
									}), results.promptText.trim() || "No prompt submitted."]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLeaderboard, { currentEmail: student.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onReturnHome,
						className: "w-full py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
						children: "Return Home"
					})
				})
			]
		})]
	})] });
}
function MobileEntryGate({ onUnlocked }) {
	const [error, setError] = (0, import_react.useState)(null);
	const handleRotateAndContinue = async () => {
		try {
			setError(null);
			if (!document.fullscreenElement) if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
			else if (document.documentElement.webkitRequestFullscreen) await document.documentElement.webkitRequestFullscreen();
			else throw new Error("Fullscreen API not supported.");
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (screen.orientation && screen.orientation.lock) try {
				await screen.orientation.lock("landscape");
			} catch (e) {
				if (!(window.innerWidth > window.innerHeight)) throw new Error("Orientation lock not supported. Please physically rotate your device to landscape first.");
			}
			else if (!(window.innerWidth > window.innerHeight)) throw new Error("Orientation lock not supported. Please physically rotate your device to landscape first.");
			if (!(window.innerWidth > window.innerHeight) && (!screen.orientation || !screen.orientation.type.includes("landscape"))) throw new Error("Device is not in landscape mode.");
			onUnlocked();
		} catch (err) {
			console.error("Entry gate unlock failed:", err);
			setError("FULL SCREEN AND LANDSCAPE MODE ARE REQUIRED TO CONTINUE.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-emerald-50 px-6 text-center select-none overflow-hidden h-[100dvh] w-[100dvw]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent)] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .8 },
			className: "relative z-10 flex flex-col items-center gap-8 max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] text-emerald-400/60 uppercase tracking-widest",
						children: "AI NEXT GEN RESEARCH WORKSHOP 2026"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-3xl tracking-widest text-emerald-300",
						children: "NEXUS JUDGMENT"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { rotate: 90 },
					transition: {
						duration: 1.5,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut",
						repeatDelay: .5
					},
					className: "text-emerald-400 p-4 border border-emerald-900/50 rounded-full bg-emerald-950/30 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
						size: 56,
						strokeWidth: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-sm tracking-[0.2em] text-emerald-400 font-bold uppercase",
						children: "LANDSCAPE MODE REQUIRED"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-sm tracking-[0.2em] text-emerald-400 font-bold uppercase",
						children: "FULL SCREEN REQUIRED"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs text-red-400 uppercase tracking-widest leading-relaxed p-3 bg-red-950/30 rounded border border-red-900/50",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleRotateAndContinue,
					className: "group relative px-8 py-4 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 overflow-hidden w-full rounded",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-500/10 to-emerald-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative font-mono text-sm tracking-[0.2em] text-emerald-100 uppercase",
						children: "ROTATE & CONTINUE"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] animate-pulse mt-4",
					children: "WAITING FOR USER ACTION"
				})
			]
		})]
	});
}
var PROMPT_TITLES = [
	"Write a prompt to create an AI assistant that acts like a senior web developer",
	"Write a prompt to generate the HTML and CSS for a modern portfolio website",
	"Write a prompt to design a custom AI agent that helps students learn math",
	"Write a prompt to build a responsive landing page for a new coffee shop",
	"Write a prompt to create an AI chatbot that schedules appointments for a clinic",
	"Write a prompt to generate a React component for a dark-mode navigation bar",
	"Write a prompt to instruct an AI to write a Python script for scraping weather data",
	"Write a prompt to build a simple e-commerce shopping cart using JavaScript",
	"Write a prompt to create an AI agent that summarizes long PDF documents",
	"Write a prompt to generate a landing page for a fitness app",
	"Write a prompt to build an AI tutor that explains complex physics concepts to a 10-year-old",
	"Write a prompt to create a blog layout using CSS Grid",
	"Write a prompt to design an AI agent that acts as a language translation assistant",
	"Write a prompt to build a contact form with validation in HTML and JS",
	"Write a prompt to instruct an AI to write a Python automation script for organizing downloads",
	"Write a prompt to create a pricing table for a SaaS website",
	"Write a prompt to design an AI virtual assistant that helps users plan a 5-day vacation",
	"Write a prompt to build a modern footer for a corporate website",
	"Write a prompt to create an AI that can generate weekly meal plans based on dietary restrictions",
	"Write a prompt to build a responsive image gallery using CSS Flexbox",
	"Write a prompt to instruct an AI to write an SQL query to find top-selling products",
	"Write a prompt to create a custom 404 error page for a web application",
	"Write a prompt to design an AI agent that evaluates resumes for a tech job",
	"Write a prompt to build a hero section with a video background in HTML/CSS",
	"Write a prompt to create an AI chatbot that provides customer support for a clothing brand",
	"Write a prompt to generate a login and registration page using Tailwind CSS",
	"Write a prompt to instruct an AI to write a script for fetching data from a public API",
	"Write a prompt to build an 'About Us' page for a digital marketing agency",
	"Write a prompt to create an AI that acts as a coding mentor to debug JavaScript errors",
	"Write a prompt to generate a responsive sidebar navigation menu",
	"Write a prompt to design an AI agent that tracks daily expenses and categorizes them",
	"Write a prompt to build a testimonials slider component for a website",
	"Write a prompt to instruct an AI to write a basic Node.js Express server",
	"Write a prompt to create a product detail page for an online store",
	"Write a prompt to build an AI agent that generates ideas for YouTube videos",
	"Write a prompt to design a minimalist 'Coming Soon' page",
	"Write a prompt to create an AI that helps users learn a new programming language step-by-step",
	"Write a prompt to build a multi-step form wizard in React",
	"Write a prompt to instruct an AI to write a regex to validate email addresses",
	"Write a prompt to create a newsletter signup section for a blog",
	"Write a prompt to design an AI assistant that acts as a financial advisor",
	"Write a prompt to build a dashboard layout with charts and widgets",
	"Write a prompt to create an AI agent that generates social media captions for Instagram",
	"Write a prompt to generate a CSS animation for a loading spinner",
	"Write a prompt to instruct an AI to write a unit test for a simple calculator function",
	"Write a prompt to build an FAQ section with an accordion style",
	"Write a prompt to create an AI chatbot that recommends books based on user preferences",
	"Write a prompt to generate an HTML email template for a marketing campaign",
	"Write a prompt to design an AI agent that helps writers overcome writer's block",
	"Write a prompt to build a sticky header that changes color on scroll",
	"Write a prompt to instruct an AI to write a Python script that resizes images",
	"Write a prompt to create a feature comparison table for a software product",
	"Write a prompt to design an AI virtual therapist that provides basic mental health exercises",
	"Write a prompt to build a modern card component with hover effects",
	"Write a prompt to create an AI agent that helps users practice interview questions",
	"Write a prompt to generate a parallax scrolling effect for a website",
	"Write a prompt to instruct an AI to write a MongoDB aggregation query",
	"Write a prompt to build a 'Meet the Team' section with profile pictures",
	"Write a prompt to create an AI that acts as a personal fitness trainer",
	"Write a prompt to design a responsive HTML table for displaying tabular data",
	"Write a prompt to build an AI agent that generates SEO-optimized blog posts",
	"Write a prompt to generate a toggle switch for light/dark mode",
	"Write a prompt to instruct an AI to write a bash script for backing up a folder",
	"Write a prompt to create a pagination component for a list of articles",
	"Write a prompt to design an AI assistant that acts as a sommelier to recommend wines",
	"Write a prompt to build a breadcrumb navigation trail",
	"Write a prompt to create an AI agent that summarizes the latest tech news",
	"Write a prompt to generate a masonry layout for an image portfolio",
	"Write a prompt to instruct an AI to write a simple smart contract in Solidity",
	"Write a prompt to build a timeline component to show company history",
	"Write a prompt to create an AI chatbot that helps users learn basic Spanish",
	"Write a prompt to design a progress bar that animates on page load",
	"Write a prompt to build an AI agent that helps users negotiate a salary offer",
	"Write a prompt to generate a modal popup window in CSS and JS",
	"Write a prompt to instruct an AI to write a web scraper using Cheerio or BeautifulSoup",
	"Write a prompt to create a search bar with a dropdown of autocomplete suggestions",
	"Write a prompt to design an AI that acts as a personal stylist for clothing recommendations",
	"Write a prompt to build a tooltip component that appears on hover",
	"Write a prompt to create an AI agent that plans a weekly workout routine",
	"Write a prompt to generate a floating action button (FAB) for a mobile-first web app",
	"Write a prompt to instruct an AI to write a cron job for running tasks automatically",
	"Write a prompt to build a rating component with clickable stars",
	"Write a prompt to create an AI that helps users discover new music based on their mood",
	"Write a prompt to design a user profile page layout with a cover image",
	"Write a prompt to build an AI agent that acts as a mock investor for pitching a startup",
	"Write a prompt to generate a sticky 'Back to Top' button",
	"Write a prompt to instruct an AI to write a Python function that reverses a string",
	"Write a prompt to create an event schedule layout with times and speakers",
	"Write a prompt to design an AI assistant that helps users track their carbon footprint",
	"Write a prompt to build a dropzone component for file uploads",
	"Write a prompt to create an AI agent that generates creative writing prompts",
	"Write a prompt to generate an off-canvas menu for mobile navigation",
	"Write a prompt to instruct an AI to write a SQL query to join three tables",
	"Write a prompt to build a pricing calculator component based on user input",
	"Write a prompt to create an AI that acts as a travel guide for a specific city",
	"Write a prompt to design a video player interface with custom controls",
	"Write a prompt to build an AI agent that helps users learn how to play chess",
	"Write a prompt to generate a split-screen layout for a login page",
	"Write a prompt to instruct an AI to write a React hook for fetching data",
	"Write a prompt to create a toast notification system for displaying alerts"
];
var LOCAL_EMAIL_KEY = "last-candidate:email:v4";
function LastCandidate() {
	const { isPhonePortrait, isPhoneLandscape, isTablet, isDesktop } = useResponsive();
	const isPhone = isPhonePortrait || isPhoneLandscape;
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [mobileUnlocked, setMobileUnlocked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const [scene, setScene] = (0, import_react.useState)("boot");
	const [student, setStudent] = (0, import_react.useState)(null);
	const [assignedQuestions, setAssignedQuestions] = (0, import_react.useState)([]);
	const [mcqQuestions, setMcqQuestions] = (0, import_react.useState)([]);
	const [verdictCorrect, setVerdictCorrect] = (0, import_react.useState)(true);
	const [mcqResult, setMcqResult] = (0, import_react.useState)(null);
	const [chamberRoundActive, setChamberRoundActive] = (0, import_react.useState)(false);
	const testQuestions = (0, import_react.useMemo)(() => {
		const mcqs = Array.isArray(mcqQuestions) ? mcqQuestions : [];
		const emailKey = student?.email || "";
		let hash = 0;
		for (let i = 0; i < emailKey.length; i++) hash = hash * 31 + emailKey.charCodeAt(i) >>> 0;
		const prompt = {
			id: "prompt-strength-question",
			type: "prompt",
			category: "Prompt Engineering",
			text: "Write a strong AI prompt for the topic below. Be specific — include a role, context, and clear output expectations so an AI could act on it immediately.",
			title: PROMPT_TITLES[hash % PROMPT_TITLES.length]
		};
		const fb = FILLBLANK_QUESTIONS[hash % FILLBLANK_QUESTIONS.length];
		const fillBlank = {
			id: fb.id,
			type: "fillblank",
			category: fb.category,
			text: fb.text
		};
		return [
			mcqs[0],
			prompt,
			fillBlank
		].filter(Boolean);
	}, [mcqQuestions, student?.email]);
	const [deathTriggered, setDeathTriggered] = (0, import_react.useState)(false);
	const [deathPhase, setDeathPhase] = (0, import_react.useState)(0);
	const [showLeaderboard, setShowLeaderboard] = (0, import_react.useState)(false);
	const [showProfile, setShowProfile] = (0, import_react.useState)(false);
	const [leaderboardData, setLeaderboardData] = (0, import_react.useState)([]);
	const [submittingGuess, setSubmittingGuess] = (0, import_react.useState)(false);
	const { voiceEnabled, toggleVoice, isSpeaking, speak, stop } = useGuardianVoice();
	(0, import_react.useEffect)(() => {
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement && isPhone) setMobileUnlocked(false);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, [isPhone]);
	(0, import_react.useEffect)(() => {
		const email = localStorage.getItem(LOCAL_EMAIL_KEY);
		if (email) resumeSession(email);
	}, []);
	const resumeSession = async (email) => {
		try {
			const res = await registerOrResumeStudent({ data: {
				email,
				action: "resume"
			} });
			if (res.error) {
				console.warn("Session resume bypassed:", res.error);
				localStorage.removeItem(LOCAL_EMAIL_KEY);
				return;
			}
			if (res.student) {
				setStudent(res.student);
				setAssignedQuestions(res.questions);
				setMcqQuestions(res.mcqQuestions || []);
				if (res.student.status === "Eliminated" || res.student.status === "Disqualified") setScene("gameover");
				else if (res.student.round1Completed) setScene("final");
				else if (!res.student.mcqCompleted) setScene("mcq");
				else setScene("final");
			}
		} catch (err) {
			console.error("Session resume failed", err);
			localStorage.removeItem(LOCAL_EMAIL_KEY);
		}
	};
	const handleAuthSuccess = (student, questions, mcqQs) => {
		setStudent(student);
		setAssignedQuestions(questions);
		setMcqQuestions(mcqQs || []);
		localStorage.setItem(LOCAL_EMAIL_KEY, student.email);
		if (student.status === "Eliminated" || student.status === "Disqualified") setScene("gameover");
		else if (student.round1Completed || student.locked) setScene("final");
		else if (!student.mcqCompleted) setScene("mcq");
		else setScene("final");
	};
	const loadLeaderboard = async () => {
		try {
			const res = await getLeaderboardData({ data: {
				page: 1,
				limit: 50
			} });
			if (res.success && res.students) setLeaderboardData(res.students);
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		if (showLeaderboard) loadLeaderboard();
	}, [showLeaderboard]);
	const currentQuestion = (0, import_react.useMemo)(() => {
		if (!student || assignedQuestions.length === 0) return null;
		return assignedQuestions[student.currentLevel - 1] || null;
	}, [student, assignedQuestions]);
	const handleGuessLetter = async (char) => {
		if (!student || submittingGuess) return;
		setSubmittingGuess(true);
		try {
			const res = await submitGuess({ data: {
				email: student.email,
				guess: char
			} });
			const prevWrong = student.wrongAnswersCount;
			const prevLevel = student.currentLevel;
			setStudent(res.student);
			setAssignedQuestions(res.questions);
			if (res.error) {
				alert(res.error);
				return;
			}
			const isIncorrect = res.student.wrongAnswersCount > prevWrong;
			if (res.student.status === "Eliminated") triggerDeathSequence();
			else if (isIncorrect) {
				if (res.student.wrongAnswersCount === 1) speak("Your confidence exceeds your intelligence.", "warning");
				else if (res.student.wrongAnswersCount === 2) speak("You are not worthy of entering deeper into this realm.", "warning");
				else if (res.student.wrongAnswersCount === 3) speak("THE SHADOWS HAVE REJECTED YOU.", "wrong");
			} else if (res.student.currentLevel > prevLevel || res.student.status === "Selected" || res.student.status === "Completed") {
				setVerdictCorrect(true);
				setScene("verdict");
			}
		} catch (err) {
			console.error(err);
		} finally {
			setSubmittingGuess(false);
		}
	};
	const triggerDeathSequence = () => {
		setDeathTriggered(true);
		setDeathPhase(1);
		speak("ACCESS TERMINATED. YOU HAVE BEEN ELIMINATED FROM THE SHADOW REALM.", "wrong");
		setTimeout(() => {
			setDeathPhase(2);
		}, 1500);
		setTimeout(() => {
			setDeathPhase(3);
		}, 3e3);
		setTimeout(() => {
			setDeathTriggered(false);
			setDeathPhase(0);
			setScene("gameover");
		}, 5e3);
	};
	const guardianState = (0, import_react.useMemo)(() => {
		if (scene === "gameover") return "death";
		if (scene === "final") return "selected";
		if (scene === "verdict") return "success";
		if (scene === "briefing") return "idle";
		if (scene === "mcq") {
			if (student && student.wrongAnswersCount >= 3) return "angry";
			if (student && student.wrongAnswersCount >= 1) return "warning";
			return "floating";
		}
		return "idle";
	}, [scene, student]);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[100dvh] overflow-hidden w-full bg-zinc-950 flex items-center justify-center font-mono text-xs text-emerald-400 animate-pulse",
		children: "[ SYSTEM INITIALIZING ]"
	});
	const activeSceneContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
		mode: "wait",
		children: [
			scene === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScene, {
				onComplete: () => setScene("mission-dossier"),
				speak,
				voiceEnabled,
				toggleVoice
			}, "boot"),
			scene === "mission-dossier" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDossierScene, {
				onComplete: () => setScene("cinematic"),
				speak,
				isSpeaking
			}, "mission-dossier"),
			scene === "cinematic" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicScene, {
				onComplete: () => setScene("intro"),
				speak,
				stop
			}, "cinematic"),
			scene === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroScene, {
				onBegin: () => setScene(student ? "briefing" : "meet-the-agents"),
				hasSave: Boolean(student),
				candidateName: student?.name || "",
				speak,
				isSpeaking
			}, "intro"),
			scene === "meet-the-agents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeetAgentsScene, {
				onComplete: () => setScene("register"),
				speak,
				isSpeaking
			}, "meet-the-agents"),
			scene === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterScene, {
				onComplete: (student, questions, mcqQs) => handleAuthSuccess(student, questions, mcqQs),
				speak,
				isSpeaking
			}, "register"),
			scene === "briefing" && student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingScene, {
				student,
				onEnter: () => {
					if (!student.mcqCompleted) {
						setChamberRoundActive(false);
						setScene("mcq");
					} else setScene("final");
				},
				speak,
				isSpeaking
			}, "briefing"),
			scene === "mcq" && student && (chamberRoundActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MCQAssessment, {
				email: student.email,
				questions: testQuestions,
				onComplete: async (answers, timeRemaining) => {
					try {
						const promptQ = testQuestions[1];
						const res = await submitMCQResults({ data: {
							email: student.email,
							answers,
							timeTaken: timeRemaining,
							promptTitle: promptQ?.title || ""
						} });
						if (res.error) console.error("MCQ Submission Error", res.error);
						else {
							localStorage.removeItem(`nexus_mcq_session_${student.email}`);
							setStudent((prev) => prev ? {
								...prev,
								mcqCompleted: true,
								mcqScore: res.score,
								mcqPercentage: res.percentage,
								status: "Active",
								locked: false
							} : prev);
							setMcqResult({
								score: res.score,
								percentage: res.percentage,
								totalQuestions: res.totalQuestions,
								promptStrength: res.promptStrength || 0,
								promptTitle: res.promptTitle || "",
								promptText: res.promptText || "",
								fillBlankSolved: !!res.fillBlankSolved
							});
							setScene("mcq-result");
						}
					} catch (err) {
						console.error(err);
					}
				},
				chamberRound: true,
				chamberStudent: student,
				chamberQuestion: currentQuestion,
				onGuessLetter: handleGuessLetter,
				chamberSubmitting: submittingGuess,
				speak,
				isSpeaking
			}, "mcq-chamber") : testQuestions.length < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center w-full h-full text-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-red-500 font-mono text-xl sm:text-3xl tracking-widest uppercase",
					children: "System Error"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-red-400/80 font-mono text-xs sm:text-sm",
					children: "INSUFFICIENT ASSESSMENT DATA. PLEASE CONTACT ADMINISTRATOR."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MCQAssessment, {
				email: student.email,
				questions: testQuestions,
				onComplete: async (answers, timeRemaining) => {
					try {
						const promptQ = testQuestions[1];
						const res = await submitMCQResults({ data: {
							email: student.email,
							answers,
							timeTaken: timeRemaining,
							promptTitle: promptQ?.title || ""
						} });
						if (res.error) console.error("MCQ Submission Error", res.error);
						else {
							localStorage.removeItem(`nexus_mcq_session_${student.email}`);
							setStudent((prev) => prev ? {
								...prev,
								mcqCompleted: true,
								mcqScore: res.score,
								mcqPercentage: res.percentage,
								status: "Active",
								locked: false
							} : prev);
							setMcqResult({
								score: res.score,
								percentage: res.percentage,
								totalQuestions: res.totalQuestions,
								promptStrength: res.promptStrength || 0,
								promptTitle: res.promptTitle || "",
								promptText: res.promptText || "",
								fillBlankSolved: !!res.fillBlankSolved
							});
							setScene("mcq-result");
						}
					} catch (err) {
						console.error(err);
					}
				}
			}, "mcq")),
			scene === "mcq-result" && student && mcqResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McqResultScene, {
				student,
				results: mcqResult,
				onContinue: () => {
					setScene("final");
				},
				onReturnHome: () => {
					localStorage.removeItem(LOCAL_EMAIL_KEY);
					setStudent(null);
					setScene("intro");
				},
				speak
			}, "mcq-result"),
			scene === "verdict" && student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictScene, {
				student,
				onContinue: () => {
					if (student.round1Completed || student.locked) setScene("final");
					else setScene("final");
				},
				speak,
				isSpeaking
			}, `verdict-${student.levelsCompleted}`),
			scene === "final" && student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalScene, {
				student,
				speak,
				isSpeaking,
				onRestart: () => {
					localStorage.removeItem("student_email");
					setStudent(null);
					setScene("register");
				},
				onReturnHome: () => {
					localStorage.removeItem("student_email");
					setStudent(null);
					setScene("intro");
				}
			}, "final"),
			scene === "gameover" && student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameOverScene, {
				student,
				speak,
				isSpeaking,
				onTryAgain: () => {
					localStorage.removeItem("student_email");
					setStudent(null);
					setScene("register");
				},
				onReturnHome: () => {
					localStorage.removeItem("student_email");
					setStudent(null);
					setScene("intro");
				}
			}, "gameover")
		]
	});
	if (isPhone && !mobileUnlocked && mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileEntryGate, { onUnlocked: () => setMobileUnlocked(true) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `relative min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto text-emerald-50 font-sans antialiased transition-all duration-1000 ${deathTriggered && deathPhase >= 1 ? "animate-shake bg-red-950/20" : ""} ${student && student.wrongAnswersCount === 2 ? "bg-black/90 brightness-75" : ""} ${student && student.wrongAnswersCount >= 3 ? "bg-black brightness-50" : "bg-zinc-950"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { speaking: isSpeaking }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: scene === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 1 },
				className: "fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none",
				style: { backgroundImage: `url(/assets/background-Z_WMrgb1.png)` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/60" })
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deathTriggered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-center px-4",
				children: [deathPhase === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .8,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					className: "space-y-4 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-red-500 font-extrabold text-2xl sm:text-5xl md:text-7xl tracking-widest animate-pulse text-center",
						children: "ACCESS TERMINATED"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-red-600 w-48 sm:w-64 mx-auto animate-width" })]
				}), deathPhase >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "space-y-4 sm:space-y-6 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-red-500 font-serif text-2xl sm:text-4xl md:text-6xl tracking-tight leading-none uppercase text-center",
							children: "YOU HAVE BEEN ELIMINATED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-red-400/70 font-mono text-[10px] sm:text-sm tracking-[0.2em] uppercase text-center",
							children: "FROM THE SHADOW REALM"
						}),
						deathPhase >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .5,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							className: "text-red-600 font-black text-4xl sm:text-6xl md:text-8xl tracking-widest mt-4 sm:mt-8 font-mono animate-ping text-center",
							style: { animationDuration: "2s" },
							children: "DISQUALIFIED"
						})
					]
				})]
			}) }),
			![
				"boot",
				"mission-dossier",
				"cinematic",
				"intro",
				"meet-the-agents"
			].includes(scene) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopHud, {
				student,
				scene,
				onOpenLeaderboard: () => setShowLeaderboard(true),
				onOpenProfile: () => setShowProfile(true),
				voiceEnabled,
				onToggleVoice: toggleVoice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-row overflow-hidden pointer-events-none",
				children: [![
					"boot",
					"mission-dossier",
					"cinematic",
					"meet-the-agents"
				].includes(scene) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-0 bottom-0 w-[45%] md:w-[40%] lg:w-[45%] h-[90svh] md:h-[95vh] flex items-end justify-center z-0 opacity-40 md:opacity-100 transition-opacity duration-700 pb-2 md:pb-8 pr-2 md:pr-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guardian, {
						scale: isTablet ? .35 : isDesktop ? .3 : .25,
						speaking: isSpeaking,
						state: guardianState
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `relative z-20 h-full w-full flex items-center transition-all duration-700 pointer-events-auto
            ${![
						"boot",
						"mission-dossier",
						"cinematic",
						"meet-the-agents"
					].includes(scene) ? "justify-start pl-6 sm:pl-10 md:pl-16 lg:pl-24 w-full md:w-[60%] lg:w-[55%]" : "justify-center px-4 w-full"}
          `,
					children: activeSceneContent
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showLeaderboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderboardModal, {
				data: leaderboardData,
				currentEmail: student?.email,
				onClose: () => setShowLeaderboard(false)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showProfile && student && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileModal, {
				student,
				onClose: () => setShowProfile(false)
			}) })
		]
	});
}
//#endregion
export { LastCandidate as component };
