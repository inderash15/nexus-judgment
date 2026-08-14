import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-3ffpMGIb.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scroll-area-BzFcnQzi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var adminCheckSession = createServerFn({ method: "GET" }).handler(createSsrRpc("220c0424dcf996be039ec68621c36ac54f0d5261a0f7e6c3d643864262695da4"));
var adminLogout = createServerFn({ method: "POST" }).handler(createSsrRpc("ef500b865ded474ada9177cb740af019b4470871f4f8a62c7c79d82ee0adbc44"));
var adminAuthenticate = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("a122f78a17f8171f84de43807ee05a54f7028217b380353ec860930e26e6f8b3"));
var registerOrResumeStudent = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("4aeb2ec1c37092defabdb6da2cd389a1b2dc95c0fc21c5655c78bb667ac60e7a"));
var submitMCQResults = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("3a225929a800e137232c34655f668507e7af8c96e3fa62443a62befde273ec31"));
var submitGuess = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("1f63413257f480c1f8709827f79c8dd513d52842d685d5b462cca4f6b170e6e1"));
var adminGetDashboardData = createServerFn({ method: "GET" }).handler(createSsrRpc("4ba5652efc09bee95610b6f5e68a89f32c2c6dc5b39579a14e191dcbfb02cc35"));
var adminUpdateQuestion = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("b16b93aa9fd91823a0073bd4ea12c30cc8149bb9cdabfc6b1fae7f8503a4af50"));
var adminUpdateMCQQuestion = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("e4d1a3a9cb16adc78189a096bb7b5cefab163f94d6223d89fd32f751ef94f4c5"));
var adminBulkUploadQuestions = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("265e4ae78b330cc9eddd22b6493af1e67c09e859d98e27856b719c560e1e90d8"));
var adminUpdateStudentLock = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("16def2c88d821231df73a84aca3363bae17a490edee4f3fd2d69608d8839dee4"));
var getLeaderboardData = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("78ae18d99fdefeac7d451c660b78fceeda53d6de8d9b11c2d8ebf12d5db4fed7"));
var getSystemConfigData = createServerFn({ method: "GET" }).handler(createSsrRpc("e5d63187c666fdcd91f1831510c716c75eb5dc3b0adfec35a024be49bc9a7710"));
var adminUpdateSystemConfig = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("e35514a5f0cd8a750abdacb1026db86dda8f6e1125e38782576b482e5bf7c97f"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
//#endregion
export { adminGetDashboardData as a, adminUpdateQuestion as c, cn as d, getLeaderboardData as f, submitMCQResults as g, submitGuess as h, adminCheckSession as i, adminUpdateStudentLock as l, registerOrResumeStudent as m, adminAuthenticate as n, adminLogout as o, getSystemConfigData as p, adminBulkUploadQuestions as r, adminUpdateMCQQuestion as s, ScrollArea as t, adminUpdateSystemConfig as u };
