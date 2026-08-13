import { useEffect, useRef } from "react";

export function useMobileKeyboard() {
  const activeInputRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only run on client and if visualViewport is supported
    if (typeof window === "undefined" || !window.visualViewport) return;

    // Detect mobile touch devices (width check or user agent)
    const isMobile = () => 
      window.matchMedia("(max-width: 1024px)").matches || 
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      ("ontouchstart" in window);
      
    if (!isMobile()) return;

    const vv = window.visualViewport;
    // Track the maximum height seen to reliably detect keyboard on both iOS and Android
    let maxVvHeight = vv.height;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        activeInputRef.current = target;
        // Delay slightly to let the keyboard start opening and iOS scroll happen
        setTimeout(updateOffset, 50);
        setTimeout(updateOffset, 300);
      }
    };

    const handleFocusOut = () => {
      activeInputRef.current = null;
      document.documentElement.style.setProperty("--keyboard-offset", "0px");
    };

    const updateOffset = () => {
      if (!activeInputRef.current) return;
      
      // Update max height if the current viewport is larger
      if (vv.height > maxVvHeight) {
        maxVvHeight = vv.height;
      }
      
      // Compare current visual viewport against the maximum seen height
      const keyboardOpen = vv.height < maxVvHeight - 150;
      
      if (!keyboardOpen) {
        document.documentElement.style.setProperty("--keyboard-offset", "0px");
        return;
      }

      // Keyboard is open and we have an active input. 
      // Check if it's obscured by the keyboard.
      const rect = activeInputRef.current.getBoundingClientRect();
      
      // Because we apply a CSS transform (translateY) to #root using --keyboard-offset,
      // getBoundingClientRect() will return the ALREADY SHIFTED coordinates.
      // We must add back the current offset to get the true physical position.
      const currentOffsetStr = document.documentElement.style.getPropertyValue("--keyboard-offset");
      const currentOffset = parseFloat(currentOffsetStr) || 0; // typically negative
      
      const absoluteInputBottom = rect.bottom - currentOffset; 
      
      // Extra padding so the input doesn't sit exactly on the keyboard's edge
      const padding = 30; 
      
      if (absoluteInputBottom > vv.height - padding) {
        // Input is obscured. Calculate shift amount (push UI up = negative translate)
        const diff = absoluteInputBottom - (vv.height - padding);
        document.documentElement.style.setProperty("--keyboard-offset", `-${diff}px`);
      } else {
        // If it's not obscured, we don't need any offset
        document.documentElement.style.setProperty("--keyboard-offset", "0px");
      }
    };

    const handleResize = () => {
      if (vv.height > maxVvHeight) {
        maxVvHeight = vv.height;
      }
      
      if (!activeInputRef.current) {
        if (vv.height >= maxVvHeight - 150) {
           document.documentElement.style.setProperty("--keyboard-offset", "0px");
        }
        return;
      }
      updateOffset();
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    vv.addEventListener("resize", handleResize);
    vv.addEventListener("scroll", handleResize); // iOS sometimes fires scroll on visualViewport

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      vv.removeEventListener("resize", handleResize);
      vv.removeEventListener("scroll", handleResize);
      document.documentElement.style.setProperty("--keyboard-offset", "0px");
    };
  }, []);
}
