import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { title: "ETEMAAD100 Group" },
      {
        name: "description",
        content:
          "ETEMAAD100 Group — five ventures, one legacy. A Chitral-rooted holding company built on trust and driven by purpose.",
      },
      { property: "og:title", content: "ETEMAAD100 Group" },
      {
        property: "og:description",
        content: "Five ventures. One legacy. Built on Trust. Driven by Purpose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      
      {/* Global Floating WhatsApp Button */}
      {/* MAKE SURE TO UPDATE YOUR PHONE NUMBER HERE: */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/923000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-6 h-6 sm:w-7 sm:h-7">
            <path d="M12.01 2.014c-5.46 0-9.89 4.43-9.89 9.89 0 1.74.45 3.42 1.31 4.93L2.01 22l5.35-1.4c1.47.8 3.12 1.22 4.84 1.22 5.46 0 9.89-4.43 9.89-9.89s-4.43-9.89-9.89-9.89zm.22 17.06h-.01c-1.47 0-2.91-.4-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.22-4.28c0-4.42 3.6-8.02 8.03-8.02 4.42 0 8.02 3.6 8.02 8.02s-3.6 8.02-8.02 8.02zm4.4-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.22.96 2.42.76 2.86.7.44-.06 1.42-.58 1.62-1.14.2-.56.2-.1.14-.12z" />
          </svg>
        </a>
      </div>
    </QueryClientProvider>
  );
}
