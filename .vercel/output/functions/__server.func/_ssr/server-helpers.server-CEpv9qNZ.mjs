import { t as getDB } from "./db-Dy0-QO7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-helpers.server-CEpv9qNZ.js
var cacheMap = /* @__PURE__ */ new Map();
function getCached(key) {
	const entry = cacheMap.get(key);
	if (!entry) return null;
	if (Date.now() > entry.expiresAt) {
		cacheMap.delete(key);
		return null;
	}
	return entry.data;
}
function setCached(key, data, ttlMs) {
	cacheMap.set(key, {
		data,
		expiresAt: Date.now() + ttlMs
	});
}
function clearCachePrefix(prefix) {
	for (const key of cacheMap.keys()) if (key.startsWith(prefix)) cacheMap.delete(key);
}
var rateLimitMap = /* @__PURE__ */ new Map();
var lastPruneTime = Date.now();
function checkRateLimit(key, maxRequests, windowMs) {
	const now = Date.now();
	if (now - lastPruneTime > 6e4) {
		lastPruneTime = now;
		for (const [k, timestamps] of rateLimitMap) {
			const last = timestamps[timestamps.length - 1];
			if (!last || now - last > 6e5) rateLimitMap.delete(k);
		}
	}
	const validTimestamps = (rateLimitMap.get(key) || []).filter((ts) => now - ts < windowMs);
	if (validTimestamps.length >= maxRequests) return false;
	validTimestamps.push(now);
	rateLimitMap.set(key, validTimestamps);
	return true;
}
async function getSystemConfig() {
	const cached = getCached("system_config");
	if (cached) return cached;
	try {
		const config = await (await getDB()).collection("systemConfig").findOne({ id: "global" });
		if (config) {
			setCached("system_config", config, 5e3);
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
		round1PassingScore: 60,
		round2PassingScore: 60,
		round1TimeLimit: 300,
		round2TimeLimit: 600
	};
}
async function verifyAdminSession() {
	const { getCookie, deleteCookie } = await import("./server-CzwrC6AH.mjs");
	const token = getCookie("admin_session");
	if (!token) return false;
	try {
		const db = await getDB();
		const session = await db.collection("adminSessions").findOne({ token });
		if (!session) return false;
		if (new Date(session.expiresAt).getTime() < Date.now()) {
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
async function verifyStudentSession(email) {
	if ((await getSystemConfig()).mode === "maintenance") return false;
	const { getCookie } = await import("./server-CzwrC6AH.mjs");
	const token = getCookie("student_session");
	if (!token) return false;
	try {
		const db = await getDB();
		const session = await db.collection("studentSessions").findOne({
			token,
			email
		});
		if (!session) return false;
		if (new Date(session.expiresAt).getTime() < Date.now()) {
			await db.collection("studentSessions").deleteOne({ token });
			return false;
		}
		return true;
	} catch (e) {
		console.error("[verifyStudentSession] Error:", e);
		return false;
	}
}
//#endregion
export { checkRateLimit, clearCachePrefix, getCached, getSystemConfig, setCached, verifyAdminSession, verifyStudentSession };
