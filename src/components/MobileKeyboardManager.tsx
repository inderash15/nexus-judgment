import { useMobileKeyboard } from "../hooks/useMobileKeyboard";

/**
 * Global wrapper that mounts the mobile keyboard awareness logic.
 * It's placed here so it can be mounted at the app root without triggering
 * re-renders of the root component when internal hook state changes (though
 * this hook only uses refs and DOM events to avoid re-renders anyway).
 */
export function MobileKeyboardManager() {
  useMobileKeyboard();
  return null; // Silent component
}
