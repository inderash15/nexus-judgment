import { useEffect, useState, useCallback, useRef } from "react";

export function useGuardianVoice() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("guardian-voice") === "true";
      setVoiceEnabled(saved);
    }
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("guardian-voice", String(next));
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return next;
    });
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      // Cancel current speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);

      if (!voiceEnabled) return;

      // Strip markdown/emojis/quotes/symbols for cleaner synthesis if any
      const cleanText = text
        .replace(/[“’”"]/g, "")
        .replace(/◈|◊|△|⌘|◉|☾|✦/g, "")
        .replace(/\s+/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;

      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
      
      // Look for a deep/devilish English voice (preferring male, local, or David/Google voices)
      const chosenVoice =
        englishVoices.find(
          (v) =>
            v.name.toLowerCase().includes("david") ||
            v.name.toLowerCase().includes("male") ||
            v.name.toLowerCase().includes("google us english") ||
            v.name.toLowerCase().includes("natural")
        ) || englishVoices[0];

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      // Devil, menacing voice parameters
      utterance.pitch = 0.1; // Deepest pitch possible
      utterance.rate = 0.65; // Slow, rumbling rate

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
