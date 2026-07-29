import { useEffect, useState } from "react";
import { GuardianDesktop } from "./GuardianDesktop";
import { GuardianMobile } from "./GuardianMobile";

type Props = {
  scale?: number;
  glow?: boolean;
  className?: string;
  speaking?: boolean;
  state?: string;
};

export function Guardian(props: Props) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkViewport = () => {
      // Screens 768px (md breakpoint) and larger render the desktop version
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!mounted) {
    return (
      <div className="h-96 flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse">
        Establishing Link...
      </div>
    );
  }

  if (isDesktop) {
    return <GuardianDesktop {...props} />;
  }

  // Mobile custom size constraints
  const mobileSizeClasses = `
    w-full
    h-[220px] 
    xs:h-[260px] 
    landscape:h-[300px] 
    flex items-center justify-center select-none overflow-visible
  `.replace(/\s+/g, " ").trim();

  return (
    <div className={`${mobileSizeClasses} ${props.className || ""}`}>
      <GuardianMobile {...props} />
    </div>
  );
}
