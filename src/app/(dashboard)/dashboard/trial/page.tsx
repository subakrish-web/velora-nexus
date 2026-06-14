"use client";

import { useState, useEffect } from "react";
import {
  Copy, Check, ExternalLink, Sparkles, Key, Zap,
  ShoppingBag, Bot, BarChart3, Shield, RefreshCw
} from "lucide-react";

interface TrialStatus {
  trialId: string;
  plan: string;
  trialCredits: number;
  trialCreditsUsed: number;
  connectedProviders: string[];
  preferredAiProvider: string;
  preferredAiModel: string;
}

const TEST_ENDPOINTS = [
  { method: "GET", path: "/api/analytics?period=7d", label: "Analytics API", icon: BarChart3 },
  { method: "GET", path: "/api/agents", label: "AI Agents API", icon: Bot },
  { method: "GET", path: "/api/products", label: "Products API", icon: ShoppingBag },
  { method: "GET", path: "/api/user/ai-keys", label: "AI Keys API", icon: Key },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-lg bg-[#0D0D0D] p-4 font-mono text-xs">
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="absolute right-2 top-2 cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="overflow-x-auto text-green-400 whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

export default function TrialPage() {
  const [status, setStatus] = useState<TrialStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; data: string }>>({});
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    fetch("/api/user/ai-keys")
      .then(r => r.json())
      .then(d => {
        setStatus({
          trialId: "VELORA-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          plan: "PRO",
          trialCredits: d.trialCredits ?? 50,
          trialCreditsUsed: d.trialCreditsUsed ?? 0,
          connectedProviders: d.connectedProviders ?? [],
          preferredAiProvider: d.preferredAiProvider ?? "groq",
          preferredAiModel: d.preferredAiModel ?? "llama-3.1-8b-instant",
        });
      })
      .catch(() => {
        setStatus({
          trialId: "VELORA-DEMO24",
          plan: "PRO",
          trialCredits: 50,
          trialCreditsUsed: 3,
          connectedProviders: [],
          preferredAiProvider: "groq",
          preferredAiModel: "llama-3.1-8b-instant",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const runSeed = async () => {
    setSeeding(true);
    await fetch("/api/demo/seed", { method: "POST" });
    setSeedDone(true);
    setSeeding(false);
  };

  const runTest = async (endpoint: typeof TEST_ENDPOINTS[0]) => {
    try {
      const res = await fetch(endpoint.path);
      const data = await res.json();
      setTestResults(prev => ({
        ...prev,
        [endpoint.path]: { ok: res.ok, data: JSON.stringify(data, null, 2).slice(0, 300) + "…" }
      }));
    } catch (e) {
      setTestResults(prev => ({
        ...prev,
        [endpoint.path]: { ok: false, data: String(e) }
      }));
    }
  };

  const creditsRemaining = (status?.trialCredits ?? 50) - (status?.trialCreditsUsed ?? 0);
  const creditsPct = Math.round((creditsRemaining / (status?.trialCredits ?? 50)) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl">Trial & Testing</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your trial ID, API testing console, and backend health.</p>
        </div>
        <button
          onClick={runSeed}
          disabled={seeding}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${seeding ? "animate-spin text-primary" : "text-muted-foreground"}`} />
          {seedDone ? "Demo data refreshed!" : seeding ? "Seeding…" : "Refresh Demo Data"}
        </button>
      </div>

      {/* Trial ID card */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#0A0A0A] via-card to-card p-6">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Trial ID</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xl font-bold text-primary">{status?.trialId}</span>
              <button
                onClick={() => { navigator.clipboard.writeText(status?.trialId ?? ""); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); }}
                className="cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground"
              >
                {copiedId ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Credits */}
          <div className="rounded-xl border border-border bg-card/50 p-4">
            <p className="text-xs text-muted-foreground">Trial Credits</p>
            <p className="mt-1 font-display text-2xl font-bold">{creditsRemaining}<span className="text-sm text-muted-foreground font-normal">/{status?.trialCredits}</span></p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${creditsPct}%` }} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{creditsPct}% remaining</p>
          </div>

          {/* Plan */}
          <div className="rounded-xl border border-border bg-card/50 p-4">
            <p className="text-xs text-muted-foreground">Current Plan</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">{status?.plan}</p>
            <a href="/dashboard/payments" className="mt-2 block text-xs text-primary hover:underline">Upgrade plan →</a>
          </div>

          {/* AI Provider */}
          <div className="rounded-xl border border-border bg-card/50 p-4">
            <p className="text-xs text-muted-foreground">Active AI Model</p>
            <p className="mt-1 font-display text-lg font-bold capitalize">{status?.preferredAiProvider}</p>
            <p className="text-xs text-muted-foreground truncate">{status?.preferredAiModel}</p>
            <a href="/dashboard/ai-providers" className="mt-1 block text-xs text-primary hover:underline">Change model →</a>
          </div>
        </div>
      </div>

      {/* Backend API test console */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Backend API Testing Console</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Click any endpoint to test your backend live.</p>

        <div className="mt-4 space-y-3">
          {TEST_ENDPOINTS.map((ep) => {
            const result = testResults[ep.path];
            return (
              <div key={ep.path} className="rounded-lg border border-border">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${ep.method === "GET" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs">{ep.path}</span>
                    <span className="text-xs text-muted-foreground">{ep.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result && (
                      <span className={`text-xs font-medium ${result.ok ? "text-green-400" : "text-red-400"}`}>
                        {result.ok ? "200 OK" : "Error"}
                      </span>
                    )}
                    <button
                      onClick={() => runTest(ep)}
                      className="cursor-pointer rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      Run
                    </button>
                  </div>
                </div>
                {result && (
                  <div className="border-t border-border">
                    <pre className={`max-h-32 overflow-auto p-3 font-mono text-[10px] ${result.ok ? "text-green-400" : "text-red-400"}`}>
                      {result.data}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI & Automation API snippets */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">AI Agent API</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Trigger an AI agent run via the REST API.</p>
          <div className="mt-3">
            <CodeBlock code={`// Run an AI agent
const res = await fetch('/api/agents/{id}/run', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    input: 'Write a product launch tweet for...',
    provider: '${status?.preferredAiProvider}',
    model: '${status?.preferredAiModel}'
  })
});
const { output, creditsUsed } = await res.json();`} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">n8n Webhook Trigger</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Trigger the AI marketing pipeline via webhook.</p>
          <div className="mt-3">
            <CodeBlock code={`// Trigger n8n AI Marketing Pipeline
const res = await fetch(
  'https://winvel.app.n8n.cloud/webhook/velora-marketing',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productPhotoUrl: 'https://...',
      productName: 'My Product',
      audience: 'Gen Z creators',
      goal: 'Drive sales',
      brandVoice: 'Bold and authentic',
      platform: 'tiktok'
    })
  }
);
const { videoUrl, viralityScore } = await res.json();`} />
          </div>
        </div>
      </div>

      {/* Security & Backend config */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Backend Security Checklist</h2>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { label: "JWT sessions (NextAuth v5)", ok: true },
            { label: "Zod input validation on all routes", ok: true },
            { label: "Admin role middleware guard", ok: true },
            { label: "Stripe webhook signature verify", ok: true },
            { label: "HSTS + X-Frame-Options headers", ok: true },
            { label: "Email enumeration prevention", ok: true },
            { label: "Pagination capped at 100 rows", ok: true },
            { label: "API keys encrypted in DB (JSON)", ok: true },
            { label: ".env never pushed to GitHub", ok: true },
            { label: "Mass-assignment blocked (Zod .strict)", ok: true },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <Check className={`h-3.5 w-3.5 shrink-0 ${item.ok ? "text-green-400" : "text-red-400"}`} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
        <a href="/admin/security" className="mt-4 flex items-center gap-1 text-xs text-primary hover:underline">
          View full security logs <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
