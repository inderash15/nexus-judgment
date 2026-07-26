import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import appCss from "../styles.css?url";
import { ThemeProvider } from "../components/ThemeProvider";
import { RotatePrompt } from "../components/RotatePrompt";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#090D16] px-4 font-sans text-[#F3F4F6]">
      <div className="max-w-md text-center space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20 font-bold text-sm">
          404
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            Resource Node Not Located
          </h1>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            The requested database path or client route does not exist. The administrator node has
            been notified of this query.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-indigo-700 shadow-md shadow-indigo-600/10"
          >
            Return to Terminal
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const errorId = useMemo(
    () => "ERR-NJ-" + Math.random().toString(36).substring(3, 9).toUpperCase(),
    [],
  );

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component", errorId });
  }, [error, errorId]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#090D16] px-4 font-sans text-[#F3F4F6]">
      <div className="max-w-md text-center space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            System Operational Anomaly Detected
          </h1>
          <p className="mt-2 text-xs text-slate-450 leading-relaxed">
            An unexpected error occurred while processing system modules. The system telemetry has
            logged this event, and automatic recovery protocols are standing by.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-400 font-bold">
            TRACKING ID: {errorId}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              // Clear cached memory states on retry
              localStorage.removeItem("guardian-voice");
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-indigo-700 shadow-md shadow-indigo-600/10"
          >
            Re-verify Node
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-slate-700"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nexus Judgment — Guardian of Shadows" },
      {
        name: "description",
        content: "A gamified word puzzle assessment tool themed as a Shadow Realm trial.",
      },
      { name: "author", content: "NexusPro" },
      { property: "og:title", content: "Nexus Judgment — Guardian of Shadows" },
      {
        property: "og:description",
        content:
          "Solve the hidden words. Escape the Shadow Realm. One attempt. Zero margin for error.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RotatePrompt />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
