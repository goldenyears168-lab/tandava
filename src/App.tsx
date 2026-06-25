import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { DemoRoleBar } from "@/components/DemoRoleBar";
import { Component, Suspense, type ErrorInfo, type ReactNode } from "react";
import { AppRoutes } from "./router";

// ---------------------------------------------------------------------------
// Error Boundary — shows the crash instead of a black screen
// ---------------------------------------------------------------------------
class AppErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Tandava] Render crash:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0a14", color: "#f5f0e8", fontFamily: "'DM Sans', sans-serif", padding: "2rem" }}>
          <div style={{ maxWidth: "32rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
            <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>Tandava encountered an error during startup.</p>
            <pre style={{ textAlign: "left", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.75rem", overflow: "auto", maxHeight: "12rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {this.state.error.message}
              {"\n\n"}
              {this.state.error.stack}
            </pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: "1.5rem", padding: "0.5rem 1.5rem", background: "#4fd1c5", color: "#0f0a14", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontWeight: 600 }}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

const RouteLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
      <DemoProvider>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={__BASE_PATH__}>
                <DemoRoleBar />
                <Suspense fallback={<RouteLoadingFallback />}>
                  <AppRoutes />
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </DemoProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;