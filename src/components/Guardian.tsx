import { useEffect, useState } from "react";
import { GuardianDesktop } from "./GuardianDesktop";

type Props = {
  scale?: number;
  glow?: boolean;
  className?: string;
  speaking?: boolean;
  state?: string;
};

export function Guardian(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-96 flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse">
        Establishing Link...
      </div>
    );
  }

  return <GuardianDesktop {...props} />;
}
