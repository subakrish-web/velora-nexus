"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Chrome, Github, Loader2, FlaskConical, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    try {
      // Step 1: Ensure demo user exists in DB
      const setup = await fetch("/api/auth/demo", { method: "POST" });
      const data = await setup.json();

      if (!data.success) {
        setError(data.error ?? "Demo setup failed.");
        return;
      }

      // Step 2: Sign in with the returned credentials
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        // Step 3: Seed demo data in background, then redirect
        fetch("/api/demo/seed", { method: "POST" }).catch(() => null);
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Demo login failed — please try manually with demo@velora.app / VeloraDemo2024!");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your Velora account
        </p>
      </div>

      {/* Demo access banner */}
      <div className="mb-6 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="px-4 py-3">
          <div className="flex items-start gap-3">
            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="flex-1 text-sm">
              <p className="font-medium text-primary">Try a live demo — no signup needed</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pre-loaded with products, AI agents, automations, and analytics.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={demoLoading}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {demoLoading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Setting up demo…</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Launch Demo Dashboard</>
            )}
          </button>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Trial ID: <span className="font-mono text-primary">VELORA-DEMO-2024</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => handleOAuth("google")}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary/80"
        >
          <Chrome className="h-5 w-5" />
          Continue with Google
        </button>
        <button
          onClick={() => handleOAuth("github")}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary/80"
        >
          <Github className="h-5 w-5" />
          Continue with GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or sign in with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">Sign up free</Link>
      </p>
    </div>
  );
}
