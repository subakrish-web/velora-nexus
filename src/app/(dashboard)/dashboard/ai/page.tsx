"use client";

import { useState } from "react";
import {
  Bot,
  Brain,
  Cpu,
  DollarSign,
  Gauge,
  Sparkles,
  Zap,
  Plus,
  Play,
  Pause,
  Settings,
  X,
  PenTool,
  Share2,
  Mail,
  Search,
  BarChart3,
  HeadphonesIcon,
  TrendingUp,
  Layers,
  ChevronRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Credits Used", value: "1,247", change: "of 2,000", changeType: "neutral" as const, icon: Zap },
  { title: "Agents Active", value: "18", change: "of 30+", changeType: "neutral" as const, icon: Bot },
  { title: "AI Cost", value: "$42.30", change: "this month", changeType: "neutral" as const, icon: DollarSign },
  { title: "Tasks Completed", value: "342", change: "+28%", changeType: "positive" as const, icon: Sparkles },
];

const agentTypes = [
  { type: "CONTENT_WRITER", label: "Content Writer", icon: PenTool, color: "text-violet-400 bg-violet-500/10", desc: "Generates blog posts, social captions, scripts, and copy tailored to your brand voice." },
  { type: "SOCIAL_MANAGER", label: "Social Manager", icon: Share2, color: "text-blue-400 bg-blue-500/10", desc: "Schedules posts, analyzes engagement, and optimizes your social presence across platforms." },
  { type: "EMAIL_MARKETER", label: "Email Marketer", icon: Mail, color: "text-amber-400 bg-amber-500/10", desc: "Creates email sequences, newsletters, and automated campaigns with high open rates." },
  { type: "SEO_OPTIMIZER", label: "SEO Optimizer", icon: Search, color: "text-emerald-400 bg-emerald-500/10", desc: "Audits pages, finds keyword opportunities, and optimizes content for search rankings." },
  { type: "ANALYTICS_REPORTER", label: "Analytics Reporter", icon: BarChart3, color: "text-cyan-400 bg-cyan-500/10", desc: "Generates weekly/monthly reports with insights, trends, and actionable recommendations." },
  { type: "CUSTOMER_SUPPORT", label: "Customer Support", icon: HeadphonesIcon, color: "text-rose-400 bg-rose-500/10", desc: "Auto-resolves common tickets, escalates complex issues, and maintains satisfaction scores." },
  { type: "SALES_ASSISTANT", label: "Sales Assistant", icon: TrendingUp, color: "text-orange-400 bg-orange-500/10", desc: "Identifies high-intent leads, scores prospects, and drafts personalized outreach." },
  { type: "FUNNEL_BUILDER", label: "Funnel Builder", icon: Layers, color: "text-pink-400 bg-pink-500/10", desc: "Designs and optimizes conversion funnels, A/B tests pages, and maximizes ROI." },
];

const activeAgents = [
  { id: "1", name: "Viral Content Agent", type: "CONTENT_WRITER", status: "ACTIVE", uses: 89, performance: 92, lastRun: "2 min ago" },
  { id: "2", name: "Trend Hunter", type: "SEO_OPTIMIZER", status: "ACTIVE", uses: 67, performance: 88, lastRun: "15 min ago" },
  { id: "3", name: "Product Builder", type: "FUNNEL_BUILDER", status: "ACTIVE", uses: 34, performance: 95, lastRun: "1 hr ago" },
  { id: "4", name: "Email Sequence Pro", type: "EMAIL_MARKETER", status: "ACTIVE", uses: 56, performance: 87, lastRun: "30 min ago" },
  { id: "5", name: "Lead Scorer", type: "SALES_ASSISTANT", status: "ACTIVE", uses: 23, performance: 91, lastRun: "45 min ago" },
  { id: "6", name: "Support Bot", type: "CUSTOMER_SUPPORT", status: "ACTIVE", uses: 145, performance: 93, lastRun: "just now" },
  { id: "7", name: "Social Scheduler", type: "SOCIAL_MANAGER", status: "INACTIVE", uses: 78, performance: 90, lastRun: "2 hrs ago" },
  { id: "8", name: "Weekly Reporter", type: "ANALYTICS_REPORTER", status: "ACTIVE", uses: 12, performance: 96, lastRun: "1 day ago" },
];

export default function AIPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("");
  const [agentDesc, setAgentDesc] = useState("");
  const [configTone, setConfigTone] = useState("professional");
  const [configFrequency, setConfigFrequency] = useState("daily");
  const [step, setStep] = useState(1);

  const getAgentInfo = (type: string) => agentTypes.find((a) => a.type === type);

  const handleCreate = async () => {
    setShowCreate(false);
    setStep(1);
    setSelectedType(null);
    setAgentName("");
    setAgentDesc("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-sm text-muted-foreground">Create, configure, and manage your AI workforce</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New Agent
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Credit Usage</h3>
          <span className="text-sm text-muted-foreground">1,247 / 2,000 credits</span>
        </div>
        <div className="mt-3 h-3 w-full rounded-full bg-secondary">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary to-amber-400" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">753 credits remaining &middot; Resets Jul 1, 2026</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agentTypes.map((agent) => {
          const active = activeAgents.filter((a) => a.type === agent.type && a.status === "ACTIVE").length;
          return (
            <div key={agent.type} className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${agent.color}`}>
                  <agent.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{agent.label}</h4>
                  <p className="text-xs text-muted-foreground">{active} active</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{agent.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3 className="font-semibold">Active Agents</h3>
            <p className="text-sm text-muted-foreground">Manage your deployed AI agents</p>
          </div>
        </div>
        <div className="overflow-x-auto p-6 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Runs</th>
                <th className="pb-3 font-medium">Performance</th>
                <th className="pb-3 font-medium">Last Run</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeAgents.map((agent) => {
                const info = getAgentInfo(agent.type);
                return (
                  <tr key={agent.id} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${info?.color}`}>
                          {info && <info.icon className="h-4 w-4" />}
                        </div>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${info?.color}`}>
                        {info?.label}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{agent.uses}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${agent.performance}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{agent.performance}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{agent.lastRun}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        agent.status === "ACTIVE" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {agent.status === "ACTIVE" ? "Active" : "Paused"}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <button className="cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-secondary">
                          {agent.status === "ACTIVE" ? <Pause className="h-3.5 w-3.5 text-muted-foreground" /> : <Play className="h-3.5 w-3.5 text-muted-foreground" />}
                        </button>
                        <button className="cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-secondary">
                          <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h2 className="font-display text-xl">Create New Agent</h2>
                <p className="text-sm text-muted-foreground">Step {step} of 3</p>
              </div>
              <button onClick={() => { setShowCreate(false); setStep(1); }} className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-secondary"}`} />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h3 className="font-semibold">Choose Agent Type</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Select the type of AI agent you want to create</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {agentTypes.map((agent) => (
                      <button
                        key={agent.type}
                        onClick={() => setSelectedType(agent.type)}
                        className={`cursor-pointer rounded-xl border p-4 text-left transition-all ${
                          selectedType === agent.type
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${agent.color}`}>
                            <agent.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{agent.label}</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{agent.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Configure Agent</h3>
                  <p className="text-sm text-muted-foreground">Set up your agent&apos;s identity and behavior</p>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Agent Name</label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="e.g. Viral Content Writer"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Description</label>
                    <textarea
                      value={agentDesc}
                      onChange={(e) => setAgentDesc(e.target.value)}
                      placeholder="What should this agent focus on?"
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Brand Voice / Tone</label>
                    <select
                      value={configTone}
                      onChange={(e) => setConfigTone(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual & Friendly</option>
                      <option value="bold">Bold & Edgy</option>
                      <option value="educational">Educational</option>
                      <option value="luxury">Luxury & Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Run Frequency</label>
                    <select
                      value={configFrequency}
                      onChange={(e) => setConfigFrequency(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Review & Launch</h3>
                  <p className="text-sm text-muted-foreground">Review your agent configuration before deploying</p>
                  <div className="rounded-xl border border-border bg-background p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      {selectedType && (() => {
                        const info = getAgentInfo(selectedType);
                        return info ? (
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${info.color}`}>
                            <info.icon className="h-6 w-6" />
                          </div>
                        ) : null;
                      })()}
                      <div>
                        <h4 className="font-semibold">{agentName || "Unnamed Agent"}</h4>
                        <p className="text-sm text-muted-foreground">{getAgentInfo(selectedType || "")?.label}</p>
                      </div>
                    </div>
                    {agentDesc && <p className="text-sm text-muted-foreground">{agentDesc}</p>}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-card p-3">
                        <span className="text-xs text-muted-foreground">Tone</span>
                        <p className="font-medium capitalize">{configTone}</p>
                      </div>
                      <div className="rounded-lg bg-card p-3">
                        <span className="text-xs text-muted-foreground">Frequency</span>
                        <p className="font-medium capitalize">{configFrequency}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Gauge className="h-4 w-4" />
                      Estimated Credit Usage
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      ~{configFrequency === "realtime" ? "50" : configFrequency === "hourly" ? "24" : configFrequency === "daily" ? "5" : configFrequency === "weekly" ? "2" : "1"} credits/{configFrequency === "manual" ? "run" : "day"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border p-6">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary">
                  Back
                </button>
              ) : <div />}
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !selectedType}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Sparkles className="h-4 w-4" /> Deploy Agent
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
