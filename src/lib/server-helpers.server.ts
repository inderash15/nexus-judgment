import { getDB, SystemConfig } from "./db";

// Global In-Memory Caching System
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}
const cacheMap = new Map<string, CacheEntry<any>>();

export function getCached<T>(key: string): T | null {
  const entry = cacheMap.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cacheMap.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached<T>(key: string, data: T, ttlMs: number) {
  cacheMap.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export function clearCachePrefix(prefix: string) {
  for (const key of cacheMap.keys()) {
    if (key.startsWith(prefix)) {
      cacheMap.delete(key);
    }
  }
}

// Global In-Memory Rate Limiter
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);
  
  if (validTimestamps.length >= maxRequests) {
    return false;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return true;
}

// Fetch global system configuration (cached)
export async function getSystemConfig(): Promise<SystemConfig> {
  const cached = getCached<SystemConfig>("system_config");
  if (cached) return cached;

  try {
    const db = await getDB();
    const config = await db.collection<SystemConfig>("systemConfig").findOne({ id: "global" });
    if (config) {
      setCached("system_config", config, 5000); // 5 seconds cache
      return config;
    }
  } catch (e) {
    console.error("[getSystemConfig] Error:", e);
  }

  return {
    id: "global",
    sessionTimeout: 45,
    maxWrongAttempts: 4,
    mode: "workshop",
  };
}

// Verify admin session token in DB
export async function verifyAdminSession(): Promise<boolean> {
  const { getCookie, deleteCookie } = await import("@tanstack/react-start/server");
  const token = getCookie("admin_session");
  if (!token) return false;

  try {
    const db = await getDB();
    const session = await db.collection("adminSessions").findOne({ token });
    if (!session) return false;

    // Check expiration
    const expiresAt = new Date(session.expiresAt);
    if (expiresAt.getTime() < Date.now()) {
      await db.collection("adminSessions").deleteOne({ token });
      deleteCookie("admin_session");
      return false;
    }

    return true;
  } catch (e) {
    console.error("[verifyAdminSession] Error:", e);
    return false;
  }
}

// Verify student session token in DB
export async function verifyStudentSession(email: string): Promise<boolean> {
  // Access control: block students under Maintenance Mode
  const config = await getSystemConfig();
  if (config.mode === "maintenance") return false;

  const { getCookie } = await import("@tanstack/react-start/server");
  const token = getCookie("student_session");
  if (!token) return false;

  try {
    const db = await getDB();
    const session = await db.collection("studentSessions").findOne({ token, email });
    if (!session) return false;

    const expiresAt = new Date(session.expiresAt);
    if (expiresAt.getTime() < Date.now()) {
      await db.collection("studentSessions").deleteOne({ token });
      return false;
    }

    return true;
  } catch (e) {
    console.error("[verifyStudentSession] Error:", e);
    return false;
  }
}
