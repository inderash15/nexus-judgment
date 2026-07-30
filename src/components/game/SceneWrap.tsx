import { motion } from "framer-motion";

export function SceneWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="scene-wrapper relative z-10 flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {children}
    </motion.section>
  );
}
