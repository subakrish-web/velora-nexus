"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  ExternalLink,
  Info,
  Key,
  Sparkles,
  Zap,
  Star,
  Lock,
} from "lucide-react";

// ─── Provider config ────────────────────────────────────────────────────────

const PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI",
    subtitle: "GPT-4o, o1, o3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    color: "#10A37F",
    bg: "bg-[#10A37F]/10",
    border: "border-[#10A37F]/30",
    docsUrl: "https://platform.openai.com/api-keys",
    free: false,
    models: [
      { id: "gpt-4o", name: "GPT-4o", tier: "pro" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", tier: "free" },
      { id: "o1", name: "o1", tier: "pro" },
      { id: "o3-mini", name: "o3 Mini", tier: "pro" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    subtitle: "Claude Sonnet, Opus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    color: "#D97706",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    docsUrl: "https://console.anthropic.com/keys",
    free: false,
    models: [
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", tier: "pro" },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", tier: "free" },
      { id: "claude-opus-4-8", name: "Claude Opus 4.8", tier: "pro" },
    ],
  },
  {
    id: "google",
    name: "Google",
    subtitle: "Gemini Flash, Pro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    color: "#4285F4",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    docsUrl: "https://aistudio.google.com/app/apikey",
    free: true,
    freeNote: "Free tier available via AI Studio",
    models: [
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", tier: "free" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", tier: "pro" },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    subtitle: "Llama 3.1 (Free!)",
    logo: null,
    logoText: "⚡",
    color: "#F97316",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    docsUrl: "https://console.groq.com/keys",
    free: true,
    freeNote: "Free tier — no credit card required",
    recommended: true,
    models: [
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", tier: "free" },
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", tier: "free" },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", tier: "free" },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    subtitle: "200+ models, one key",
    logoText: "⊕",
    color: "#7C3AED",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    docsUrl: "https://openrouter.ai/keys",
    free: true,
    freeNote: "Some models are free",
    models: [
      { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B (Free)", tier: "free" },
      { id: "google/gemini-flash-1.5", name: "Gemini Flash 1.5", tier: "pro" },
      { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", tier: "pro" },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    subtitle: "DeepSeek V3, R1",
    logoText: "🔍",
    color: "#2563EB",
    bg: "bg-blue-600/10",
    border: "border-blue-600/30",
    docsUrl: "https://platform.deepseek.com/api_keys",
    free: false,
    models: [
      { id: "deepseek-chat", name: "DeepSeek V3", tier: "free" },
      { id: "deepseek-reasoner", name: "DeepSeek R1", tier: "pro" },
    ],
  },
  {
    id: "qwen",
    name: "Qwen",
    subtitle: "Qwen 2.5, QwQ",
    logoText: "Q",
    color: "#7C3AED",
    bg: "bg-purple-600/10",
    border: "border-purple-600/30",
    docsUrl: "https://help.aliyun.com/zh/dashscope/developer-reference/api-details",
    free: true,
    freeNote: "Generous free credits for new users",
    models: [
      { id: "qwen-plus", name: "Qwen Plus", tier: "free" },
      { id: "qwen-max", name: "Qwen Max", tier: "pro" },
      { id: "qwq-32b", name: "QwQ 32B (Reasoning)", tier: "free" },
    ],
  },
  {
    id: "mistral",
    name: "Mistral",
    subtitle: "Mistral Large, Small",
    logoText: "▲",
    color: "#FF7000",
    bg: "bg-orange-600/10",
    border: "border-orange-600/30",
    docsUrl: "https://console.mistral.ai/api-keys/",
    free: true,
    freeNote: "Free trial credits available",
    models: [
      { id: "mistral-small-latest", name: "Mistral Small", tier: "free" },
      { id: "mistral-large-latest", name: "Mistral Large", tier: "pro" },
      { id: "mistral-nemo", name: "Mistral Nemo (Free)", tier: "free" },
    ],
  },
];

const PLAN_SUGGESTIONS: Record<string, { plan: string; reason: string }> = {
  "gpt-4o": { plan: "PRO", reason: "GPT-4o needs your own OpenAI key on PRO or higher." },
  "o1": { plan: "PRO_MAX", reason: "o1 reasoning model works best on PRO MAX plan." },
  "claude-opus-4-8": { plan: "PRO_MAX", reason: "Claude Opus is our most powerful — upgrade to PRO MAX." },
  "gemini-2.5-pro": { plan: "PRO", reason: "Gemini 2.5 Pro requires PRO plan for full context window." },
  "deepseek-reasoner": { plan: "GO", reason: "DeepSeek R1 reasoning model is available from the GO plan." },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface ProviderState {
  apiKey: string;
  selectedModel: string;
  saved: boolean;
  showKey: boolean;
}

export default function AiProvidersPage() {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [providerState, setProviderState] = useState<Record<string, ProviderState>>({});
  const [globalModel, setGlobalModel] = useState("llama-3.1-8b-instant");
  const [globalProvider, setGlobalProvider] = useState("groq");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const getState = (id: string): ProviderState =>
    providerState[id] ?? { apiKey: "", selectedModel: PROVIDERS.find(p => p.id === id)?.models[0]?.id ?? "", saved: false, showKey: false };

  const updateState = (id: string, patch: Partial<ProviderState>) =>
    setProviderState(prev => ({ ...prev, [id]: { ...getState(id), ...patch } }));

  const saveKey = async (providerId: string) => {
    const st = getState(providerId);
    setSaving(true);
    await fetch("/api/user/ai-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: providerId, apiKey: st.apiKey, model: st.selectedModel }),
    });
    setSaving(false);
    updateState(providerId, { saved: true });
    setTimeout(() => updateState(providerId, { saved: false }), 3000);
  };

  const savePreference = async () => {
    setSaving(true);
    await fetch("/api/user/ai-keys", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preferredProvider: globalProvider, preferredModel: globalModel }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedModelSuggestion = PLAN_SUGGESTIONS[globalModel];
  const activeProviderObj = PROVIDERS.find(p => p.id === activeProvider);
  const activeModels = activeProviderObj?.models ?? [];

  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-8">
        <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl">Bring Your Own AI</h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-xl">
              Use your own API key from any major provider. You control the model, the cost, and the data.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>Don&apos;t have an API key?</span>
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline">
                Groq offers a free tier
              </a>
              <span>— perfect for getting started.</span>
            </div>
          </div>
        </div>

        {/* Free trial bar */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
              <Star className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-400">Free Trial Active — 50 AI credits remaining</p>
              <p className="text-xs text-muted-foreground">Try any provider free. Credits reset on upgrade.</p>
            </div>
          </div>
          <a href="/dashboard/payments" className="rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-500/20">
            Upgrade for Unlimited
          </a>
        </div>
      </div>

      {/* Global model preference */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Default AI Model</h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Active</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Velora uses this model for all AI features unless overridden.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Provider</label>
            <select
              value={globalProvider}
              onChange={e => {
                setGlobalProvider(e.target.value);
                const p = PROVIDERS.find(p => p.id === e.target.value);
                setGlobalModel(p?.models[0]?.id ?? "");
              }}
              className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              {PROVIDERS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Model</label>
            <select
              value={globalModel}
              onChange={e => setGlobalModel(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              {(PROVIDERS.find(p => p.id === globalProvider)?.models ?? []).map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Plan suggestion */}
        {selectedModelSuggestion && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <div className="text-xs">
              <span className="font-medium text-amber-400">Plan suggestion: </span>
              <span className="text-muted-foreground">{selectedModelSuggestion.reason}</span>
              <a href="/dashboard/payments" className="ml-1 font-medium text-primary hover:underline">
                Upgrade to {selectedModelSuggestion.plan} →
              </a>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={savePreference}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saved ? <Check className="h-4 w-4" /> : <Star className="h-4 w-4" />}
            {saved ? "Saved!" : saving ? "Saving…" : "Save Preference"}
          </button>
        </div>
      </div>

      {/* Provider cards */}
      <div>
        <h2 className="mb-4 font-semibold">Connect Providers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROVIDERS.map((provider) => {
            const st = getState(provider.id);
            const isOpen = activeProvider === provider.id;
            const hasKey = st.apiKey.length > 0 || st.saved;

            return (
              <div
                key={provider.id}
                className={`relative overflow-hidden rounded-xl border bg-card transition-all ${
                  isOpen ? `${provider.border} shadow-lg` : "border-border hover:border-border/80"
                }`}
              >
                {/* Badge */}
                {provider.recommended && (
                  <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                    Recommended
                  </div>
                )}
                {provider.free && !provider.recommended && (
                  <div className="absolute right-2 top-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400 border border-green-500/20">
                    Free Tier
                  </div>
                )}

                <button
                  onClick={() => setActiveProvider(isOpen ? null : provider.id)}
                  className="flex w-full cursor-pointer flex-col items-center gap-2 p-5 text-center"
                >
                  {/* Logo / icon */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${provider.bg} border ${provider.border}`}>
                    {provider.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={provider.logo} alt={provider.name} className="h-8 w-8 object-contain" />
                    ) : (
                      <span className="text-2xl">{provider.logoText}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-xs text-muted-foreground">{provider.subtitle}</p>
                  </div>
                  {hasKey && (
                    <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">
                      <Check className="h-3 w-3" />
                      Connected
                    </div>
                  )}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded form */}
                {isOpen && (
                  <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                    {provider.free && provider.freeNote && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-green-500/5 px-2.5 py-2 text-xs text-green-400 border border-green-500/20">
                        <Zap className="h-3 w-3 shrink-0" />
                        {provider.freeNote}
                      </div>
                    )}

                    {/* API key input */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium">API Key</label>
                        <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-[10px] text-primary hover:underline">
                          Get key <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                      <div className="relative mt-1">
                        <Key className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type={st.showKey ? "text" : "password"}
                          value={st.apiKey}
                          onChange={e => updateState(provider.id, { apiKey: e.target.value })}
                          placeholder={`${provider.name.toLowerCase()}-sk-...`}
                          className="w-full rounded-lg border border-input bg-background pl-8 pr-8 py-2 text-xs outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => updateState(provider.id, { showKey: !st.showKey })}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {st.showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Lock className="h-2.5 w-2.5" />
                        Encrypted and stored securely. Never shared.
                      </p>
                    </div>

                    {/* Model selection */}
                    <div>
                      <label className="text-xs font-medium">Model</label>
                      <select
                        value={st.selectedModel || activeModels[0]?.id}
                        onChange={e => updateState(provider.id, { selectedModel: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-input bg-secondary px-2.5 py-2 text-xs outline-none focus:border-primary"
                      >
                        {activeModels.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.name}{m.tier === "free" ? " ✓ Free" : " ★ Pro"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => saveKey(provider.id)}
                      disabled={!st.apiKey || saving}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      {getState(provider.id).saved ? <><Check className="h-3.5 w-3.5" /> Saved!</> : "Save Key"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free tier note */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don&apos;t have an API key?{" "}
          <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline">
            Groq offers a free tier
          </a>{" "}
          — perfect for getting started.
        </p>
      </div>

      {/* Plan comparison */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold">AI Credits by Plan</h2>
        <p className="mt-1 text-xs text-muted-foreground">Use Velora&apos;s hosted AI without your own API key.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[
            { plan: "FREE Trial", credits: "50 credits", note: "Try all providers", highlight: false },
            { plan: "GO", credits: "500 credits/mo", note: "Best for starters", highlight: false },
            { plan: "PRO", credits: "2,000 credits/mo", note: "Most popular", highlight: true },
            { plan: "PRO MAX", credits: "Unlimited", note: "Power users + BYOK", highlight: false },
          ].map(t => (
            <div key={t.plan} className={`rounded-lg border p-4 text-center ${t.highlight ? "border-primary bg-primary/5" : "border-border"}`}>
              <p className={`text-xs font-semibold ${t.highlight ? "text-primary" : "text-muted-foreground"}`}>{t.plan}</p>
              <p className="mt-1 font-display text-sm font-bold">{t.credits}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{t.note}</p>
              {t.highlight && <span className="mt-1.5 inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Most Popular</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <a href="/dashboard/payments" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:opacity-90">
            View All Plans
          </a>
        </div>
      </div>
    </div>
  );
}
