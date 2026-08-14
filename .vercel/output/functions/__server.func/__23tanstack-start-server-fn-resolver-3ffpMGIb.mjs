//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-3ffpMGIb.js
var manifest = {
	"16def2c88d821231df73a84aca3363bae17a490edee4f3fd2d69608d8839dee4": {
		functionName: "adminUpdateStudentLock_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"1f63413257f480c1f8709827f79c8dd513d52842d685d5b462cca4f6b170e6e1": {
		functionName: "submitGuess_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"220c0424dcf996be039ec68621c36ac54f0d5261a0f7e6c3d643864262695da4": {
		functionName: "adminCheckSession_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"265e4ae78b330cc9eddd22b6493af1e67c09e859d98e27856b719c560e1e90d8": {
		functionName: "adminBulkUploadQuestions_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"3a225929a800e137232c34655f668507e7af8c96e3fa62443a62befde273ec31": {
		functionName: "submitMCQResults_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"4aeb2ec1c37092defabdb6da2cd389a1b2dc95c0fc21c5655c78bb667ac60e7a": {
		functionName: "registerOrResumeStudent_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"4ba5652efc09bee95610b6f5e68a89f32c2c6dc5b39579a14e191dcbfb02cc35": {
		functionName: "adminGetDashboardData_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"78ae18d99fdefeac7d451c660b78fceeda53d6de8d9b11c2d8ebf12d5db4fed7": {
		functionName: "getLeaderboardData_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"a122f78a17f8171f84de43807ee05a54f7028217b380353ec860930e26e6f8b3": {
		functionName: "adminAuthenticate_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"b16b93aa9fd91823a0073bd4ea12c30cc8149bb9cdabfc6b1fae7f8503a4af50": {
		functionName: "adminUpdateQuestion_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"e35514a5f0cd8a750abdacb1026db86dda8f6e1125e38782576b482e5bf7c97f": {
		functionName: "adminUpdateSystemConfig_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"e4d1a3a9cb16adc78189a096bb7b5cefab163f94d6223d89fd32f751ef94f4c5": {
		functionName: "adminUpdateMCQQuestion_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"e5d63187c666fdcd91f1831510c716c75eb5dc3b0adfec35a024be49bc9a7710": {
		functionName: "getSystemConfigData_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	},
	"ef500b865ded474ada9177cb740af019b4470871f4f8a62c7c79d82ee0adbc44": {
		functionName: "adminLogout_createServerFn_handler",
		importer: () => import("./_ssr/server-fns-D-Y45riZ.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
