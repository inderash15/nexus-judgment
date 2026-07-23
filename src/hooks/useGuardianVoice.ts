import { useEffect, useState, useCallback, useRef } from "react";

export type GuardianEmotion = "normal" | "warning" | "wrong" | "success" | "final";

// Self-contained Web Audio API synthesizer for bass rumble and cosmic wind using AudioWorklets
class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private rumbleOsc: OscillatorNode | null = null;
  private rumbleGain: GainNode | null = null;
  private windNode: AudioWorkletNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private workletLoaded = false;

  async start() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        await this.ctx.resume().catch(() => {});
      }
      return;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();
      
      // Load Noise AudioWorklet inline to bypass file loading limits
      if (!this.workletLoaded) {
        const workletCode = `
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
        `;
        const blob = new Blob([workletCode], { type: "application/javascript" });
        const workletUrl = URL.createObjectURL(blob);
        await this.ctx.audioWorklet.addModule(workletUrl).catch((err) => {
          console.warn("Failed to load AudioWorklet module, using fallback noise:", err);
        });
        this.workletLoaded = true;
      }

      this.masterGain = this.ctx.createGain();
      // Extremely subtle, under 10% volume
      this.masterGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Bass Rumble (45Hz sine waves + low pass filter at 65Hz)
      this.rumbleOsc = this.ctx.createOscillator();
      this.rumbleOsc.type = "sine";
      this.rumbleOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      const rumbleFilter = this.ctx.createBiquadFilter();
      rumbleFilter.type = "lowpass";
      rumbleFilter.frequency.setValueAtTime(65, this.ctx.currentTime);

      this.rumbleGain = this.ctx.createGain();
      this.rumbleGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      // Breathing effect modulator (0.15Hz breathing cycles)
      const rumbleMod = this.ctx.createOscillator();
      rumbleMod.frequency.setValueAtTime(0.15, this.ctx.currentTime);
      const rumbleModGain = this.ctx.createGain();
      rumbleModGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      rumbleMod.connect(rumbleModGain);
      rumbleModGain.connect(this.rumbleGain.gain);

      this.rumbleOsc.connect(rumbleFilter);
      rumbleFilter.connect(this.rumbleGain);
      this.rumbleGain.connect(this.masterGain);

      rumbleMod.start();
      this.rumbleOsc.start();

      // 2. Cosmic Wind (Generated via AudioWorkletNode + slow sweeping bandpass filter)
      try {
        this.windNode = new AudioWorkletNode(this.ctx, "noise-generator");
      } catch (e) {
        console.warn("Failed to create AudioWorkletNode, wind noise will be silent", e);
      }

      this.windFilter = this.ctx.createBiquadFilter();
      this.windFilter.type = "bandpass";
      this.windFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);
      this.windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);

      // Sweeper for wind shifts (0.06Hz sweeps)
      const windSweep = this.ctx.createOscillator();
      windSweep.frequency.setValueAtTime(0.06, this.ctx.currentTime);
      const windSweepGain = this.ctx.createGain();
      windSweepGain.gain.setValueAtTime(120, this.ctx.currentTime);

      windSweep.connect(windSweepGain);
      windSweepGain.connect(this.windFilter.frequency);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      if (this.windNode) {
        this.windNode.connect(this.windFilter);
      }
      this.windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);

      windSweep.start();
    } catch (e) {
      console.warn("AudioContext failed to initialize:", e);
    }
  }

  duck(active: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const targetVolume = active ? 0.015 : 0.05; // Duck ambience during active speech
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
}

export function useGuardianVoice() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Track active speech chains to cancel old callbacks
  const activeChainIdRef = useRef<number>(0);
  const ambienceRef = useRef<AmbientSoundscape | null>(null);

  // Initialize ambience instance
  if (!ambienceRef.current && typeof window !== "undefined") {
    ambienceRef.current = new AmbientSoundscape();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("guardian-voice") === "true";
      setVoiceEnabled(saved);
    }
  }, []);

  // Manage ambient soundscape cycle based on voice toggle (Defer to user gesture to prevent autoplay errors)
  useEffect(() => {
    if (!voiceEnabled) {
      ambienceRef.current?.stop();
      return;
    }

    const startOnGesture = () => {
      ambienceRef.current?.start();
      window.removeEventListener("click", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
    };

    // Attempt start immediately in case interaction already occurred
    ambienceRef.current?.start();

    // Listen for first interaction to bootstrap the context safely
    window.addEventListener("click", startOnGesture);
    window.addEventListener("keydown", startOnGesture);

    return () => {
      window.removeEventListener("click", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      ambienceRef.current?.stop();
    };
  }, [voiceEnabled]);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("guardian-voice", String(next));
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        activeChainIdRef.current += 1; // cancel current chain
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        ambienceRef.current?.stop();
      }
      return next;
    });
  }, []);

  const speak = useCallback(
    async (text: string, emotion: GuardianEmotion = "normal") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      // Cancel current speaking instances and increment chain ID
      activeChainIdRef.current += 1;
      const currentChainId = activeChainIdRef.current;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);

      if (!voiceEnabled) return;

      // Clean special characters
      const cleanText = text
        .replace(/[“’”"]/g, "")
        .replace(/◈|◊|△|⌘|◉|☾|✦/g, "")
        .replace(/\s+/g, " ")
        .trim();

      // Split text on sentence endings, commas and ellipses keeping the delimiters
      const tokens = cleanText.split(/(\.\.\.|[.,!?])/g);
      
      setIsSpeaking(true);
      ambienceRef.current?.duck(true); // Duck background ambient bass

      // Process tokens sequentially to add randomized human pauses
      for (let i = 0; i < tokens.length; i++) {
        if (currentChainId !== activeChainIdRef.current) return;

        const token = tokens[i].trim();
        if (!token) continue;

        if (token === "...") {
          // Deep mysterious pause (1500ms to 2500ms)
          const delay = 1500 + Math.random() * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else if (token === ".") {
          // Standard sentence pause (650ms to 1200ms)
          const delay = 650 + Math.random() * 550;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else if (token === "?" || token === "!") {
          // Questions or proclamations pause (1000ms to 1500ms)
          const delay = 1000 + Math.random() * 500;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else if (token === ",") {
          // Short comma breath pause (250ms to 450ms)
          const delay = 250 + Math.random() * 200;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          // Speak the current text segment
          await new Promise<void>((resolve) => {
            if (currentChainId !== activeChainIdRef.current) {
              resolve();
              return;
            }

            const utterance = new SpeechSynthesisUtterance(token);
            utteranceRef.current = utterance;

            const voices = window.speechSynthesis.getVoices();
            const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
            
            // Prefer: Microsoft David, Google US English Male, Microsoft Mark, generic male
            const chosenVoice =
              englishVoices.find(
                (v) =>
                  v.name.toLowerCase().includes("david") ||
                  v.name.toLowerCase().includes("google us english male") ||
                  v.name.toLowerCase().includes("mark") ||
                  v.name.toLowerCase().includes("male")
              ) || englishVoices[0];

            if (chosenVoice) {
              utterance.voice = chosenVoice;
            }

            // Base setting variables
            let pitch = 0.45;
            let rate = 0.75;
            const volume = 1.0;

            // Apply emotional voice profiles
            switch (emotion) {
              case "warning":
                pitch = 0.40;
                rate = 0.70;
                break;
              case "wrong":
                pitch = 0.38;
                rate = 0.65;
                break;
              case "success":
                pitch = 0.50;
                rate = 0.80;
                break;
              case "final":
                pitch = 0.45;
                rate = 0.72;
                break;
              case "normal":
              default:
                pitch = 0.45;
                rate = 0.75;
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
      }

      // Restore ambience and clear vocal state if completed naturally
      if (currentChainId === activeChainIdRef.current) {
        setIsSpeaking(false);
        ambienceRef.current?.duck(false);
      }
    },
    [voiceEnabled]
  );

  const stop = useCallback(() => {
    activeChainIdRef.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      ambienceRef.current?.duck(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
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
    stop,
  };
}
