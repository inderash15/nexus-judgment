import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete, ArrowUp, CornerDownLeft } from "lucide-react";

type KeyboardProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
  type?: "text" | "email" | "mac" | "pin";
};

export function VirtualKeyboard({ value, onChange, onClose, isOpen, type = "text" }: KeyboardProps) {
  const [isShift, setIsShift] = useState(false);
  const [isNumeric, setIsNumeric] = useState(false);

  const handleKeyClick = (key: string) => {
    if (key === "BACKSPACE") {
      onChange(value.slice(0, -1));
    } else if (key === "ENTER") {
      onClose();
    } else if (key === "SPACE") {
      onChange(value + " ");
    } else if (key === "SHIFT") {
      setIsShift(!isShift);
    } else if (key === "TOGGLE_NUM") {
      setIsNumeric(!isNumeric);
    } else {
      let char = key;
      if (!isNumeric && isShift) {
        char = char.toUpperCase();
      }
      onChange(value + char);
    }
  };

  const alphaRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const numericRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["@", "#", "$", "_", "&", "-", "+", "(", ")", "/"],
    ["*", '"', "'", ":", ";", "!", "?", "~", "`", "|"],
  ];

  // Specific layouts based on input type
  if (type === "pin") {
    // Custom PIN layout
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-t border-white/10 p-2 sm:p-4 shadow-[0_-20px_60px_rgba(16,185,129,0.1)] select-none pb-8 sm:pb-4"
          >
            <div className="max-w-md mx-auto flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1 px-2">
                <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">Secure PIN Entry</span>
                <button onClick={onClose} className="text-xs font-bold text-emerald-400 py-1 px-2 uppercase font-mono bg-emerald-500/10 rounded border border-emerald-500/20">Close</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <KeyButton key={num} label={num} onClick={() => handleKeyClick(num)} />
                ))}
                <KeyButton label="CLR" onClick={() => onChange("")} variant="special" />
                <KeyButton label="0" onClick={() => handleKeyClick("0")} />
                <KeyButton label={<Delete className="w-5 h-5 mx-auto" />} onClick={() => handleKeyClick("BACKSPACE")} variant="special" />
              </div>
              <KeyButton label="CONFIRM PIN" onClick={() => handleKeyClick("ENTER")} variant="primary" className="mt-1 w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const rows = isNumeric ? numericRows : alphaRows;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-md border-t border-white/10 p-1.5 sm:p-3 shadow-[0_-20px_60px_rgba(16,185,129,0.1)] select-none pb-6 sm:pb-3"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-1.5 sm:gap-2">
            
            <div className="flex justify-between items-center px-1 mb-1">
              <span className="text-[9px] sm:text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">Terminal Input Active</span>
              <button onClick={onClose} className="text-[10px] sm:text-xs font-bold text-emerald-400 py-1 px-3 uppercase font-mono bg-emerald-500/10 rounded-md border border-emerald-500/20 active:bg-emerald-500/20">Done</button>
            </div>

            {/* Row 1 */}
            <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
              {rows[0].map((key) => (
                <KeyButton key={key} label={isShift && !isNumeric ? key.toUpperCase() : key} onClick={() => handleKeyClick(key)} />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex justify-center gap-1 sm:gap-1.5 w-[90%] mx-auto">
              {rows[1].map((key) => (
                <KeyButton key={key} label={isShift && !isNumeric ? key.toUpperCase() : key} onClick={() => handleKeyClick(key)} />
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
              <KeyButton 
                label={<ArrowUp className={`w-4 h-4 mx-auto ${isShift ? 'text-emerald-300' : 'text-emerald-500/70'}`} />} 
                onClick={() => handleKeyClick("SHIFT")} 
                variant="special" 
                className="w-12 sm:w-16" 
              />
              {rows[2].map((key) => (
                <KeyButton key={key} label={isShift && !isNumeric ? key.toUpperCase() : key} onClick={() => handleKeyClick(key)} />
              ))}
              <KeyButton 
                label={<Delete className="w-4 h-4 mx-auto" />} 
                onClick={() => handleKeyClick("BACKSPACE")} 
                variant="special" 
                className="w-12 sm:w-16" 
              />
            </div>

            {/* Row 4 (Space bar row) */}
            <div className="flex justify-center gap-1 sm:gap-1.5 w-full mt-0.5">
              <KeyButton 
                label={isNumeric ? "ABC" : "123"} 
                onClick={() => handleKeyClick("TOGGLE_NUM")} 
                variant="special" 
                className="w-14 sm:w-20" 
              />
              {type === "email" && <KeyButton label="@" onClick={() => handleKeyClick("@")} className="w-10 sm:w-12" />}
              {type === "mac" && <KeyButton label=":" onClick={() => handleKeyClick(":")} className="w-10 sm:w-12" />}
              {type === "email" && <KeyButton label="." onClick={() => handleKeyClick(".")} className="w-10 sm:w-12" />}
              
              <KeyButton label="SPACE" onClick={() => handleKeyClick("SPACE")} className="flex-1 max-w-[200px]" />
              
              <KeyButton 
                label={<CornerDownLeft className="w-4 h-4 mx-auto" />} 
                onClick={() => handleKeyClick("ENTER")} 
                variant="primary" 
                className="w-14 sm:w-20" 
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KeyButton({ 
  label, 
  onClick, 
  variant = "normal",
  className = ""
}: { 
  label: React.ReactNode, 
  onClick: () => void, 
  variant?: "normal" | "special" | "primary",
  className?: string
}) {
  const baseStyle = "h-10 sm:h-12 rounded flex items-center justify-center font-mono text-[16px] sm:text-lg transition-colors active:scale-95 touch-manipulation";
  
  const variants = {
    normal: "bg-white/5 backdrop-blur-sm border border-white/10 text-emerald-50 active:bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
    special: "bg-emerald-900/20 backdrop-blur-sm border border-emerald-500/20 text-emerald-200/90 active:bg-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
    primary: "bg-emerald-600/30 backdrop-blur-sm border border-emerald-400/40 text-emerald-300 active:bg-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]"
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${baseStyle} ${variants[variant]} ${className} min-w-[8.5vw] sm:min-w-[40px] flex-1`}
    >
      {label}
    </button>
  );
}
