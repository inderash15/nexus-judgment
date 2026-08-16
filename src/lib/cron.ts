import { performTopNSelection } from "./selection.server";

export function initCronJobs() {
  if ((globalThis as any).isCronRunning) return;
  (globalThis as any).isCronRunning = true;

  console.log("[CRON] Initializing hourly Top-N selection cron job.");

  const ONE_HOUR = 60 * 60 * 1000;
  
  setInterval(async () => {
    try {
      console.log("[CRON] Running hourly Top-N automatic selection...");
      const res = await performTopNSelection("system-cron");
      if (res && res.success) {
        console.log(`[CRON] Selection success: Version ${res.version} with ${res.selectedCount} candidates.`);
      }
    } catch (e: any) {
      console.error("[CRON] Unhandled error during hourly selection:", e.message);
    }
  }, ONE_HOUR);
}
