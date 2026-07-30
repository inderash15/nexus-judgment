import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

export function PortraitOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-emerald-50 px-6 text-center select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 90 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
          className="text-emerald-400"
        >
          <Smartphone size={64} strokeWidth={1.5} />
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="font-serif text-2xl tracking-widest text-emerald-300">
            ROTATE DEVICE
          </h1>
          <p className="font-mono text-xs text-emerald-400/60 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
            The Shadow Realm cannot be accessed in portrait mode. Rotate your device to landscape to continue the trial.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
