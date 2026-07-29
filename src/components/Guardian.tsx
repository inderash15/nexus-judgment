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
      <div className="h-full flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse">
        Establishing Link...
      </div>
    );
  }

  // Dynamic responsive height classes matching sizes criteria:
  // Mobile: 220px, Small Mobile: 260px, Landscape: 300px, Tablet (md): 420px, Desktop (lg): 620px, Large Desktop (xl): 760px
  const sizeClasses = `
    w-full
    h-[220px] 
    xs:h-[260px] 
    landscape:h-[300px] 
    sm:h-[350px] 
    md:h-[420px] 
    lg:h-[620px] 
    xl:h-[760px] 
    flex items-center justify-center select-none overflow-visible
  `.replace(/\s+/g, " ").trim();

  return (
    <div className={`${sizeClasses} ${props.className || ""}`}>
      {isDesktop ? (
        <GuardianDesktop {...props} />
      ) : (
        <GuardianMobile {...props} />
      )}
    </div>
  );
}
