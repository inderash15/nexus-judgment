import { motion } from "framer-motion";

export function SceneWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-4 sm:py-24 sm:px-6 landscape:py-6"
    >
      {children}
    </motion.section>
  );
}
