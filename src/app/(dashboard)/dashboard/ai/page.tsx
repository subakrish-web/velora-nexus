import { Bot, Brain, Cpu, DollarSign, Gauge, Sparkles, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Credits Used", value: "1,247", change: "of 2,000", changeType: "neutral" as const, icon: Zap },
  { title: "Agents Active", value: "18", change: "of 30+", changeType: "neutral" as const, icon: Bot },
  { title: "AI Cost", value: "$42.30", change: "this month", changeType: "neutral" as const, icon: DollarSign },
  { title: "Tasks Completed", value: "342", change: "+28%", changeType: "positive" as const, icon: Sparkles },
];

const agents = [
  { name: "Viral Content Agent", category: "Content", uses: 89, status: "Active", performance: "92%" },
  { name: "Trend Hunter Agent", category: "Content", uses: 67, status: "Active", performance: "88%" },
  { name: "Product Builder Agent", category: "Product", uses: 34, status: "Active", performance: "95%" },
  { name: "Funnel Agent", category: "Revenue", uses: 23, status: "Active", performance: "91%" },
  { name: "Email Marketing Agent", category: "Marketing", uses: 56, status: "Active", performance: "87%" },
  { name: "Retention Agent", category: "Customer", uses: 45, status: "Active", performance: "93%" },
  { name: "Competitor Agent", category: "Intelligence", uses: 12, status: "Active", performance: "89%" },
  { name: "SEO Agent", category: "Content", uses: 78, status: "Active", performance: "94%" },
  { name: "Pricing Agent", category: "Revenue", uses: 8, status: "Idle", performance: "90%" },
  { name: "Hook Generator Agent", category: "Content", uses: 102, status: "Active", performance: "96%" },
];

const categoryColors: Record<string, string> = {
  Content: "bg-violet-500/10 text-violet-400",
  Product: "bg-blue-500/10 text-blue-400",
  Revenue: "bg-emerald-500/10 text-emerald-400",
  Marketing: "bg-amber-500/10 text-amber-400",
  Customer: "bg-rose-500/10 text-rose-400",
  Intelligence: "bg-cyan-500/10 text-cyan-400",
};

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Agents</h1>
        <p className="text-sm text-muted-foreground">Monitor and manage your AI workforce</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Credit Usage Bar */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Credit Usage</h3>
          <span className="text-sm text-muted-foreground">1,247 / 2,000 credits</span>
        </div>
        <div className="mt-3 h-3 w-full rounded-full bg-secondary">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary to-purple-400" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">753 credits remaining &middot; Resets Jul 1, 2026</p>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 pb-0">
          <h3 className="font-semibold">Agent Activity</h3>
          <p className="text-sm text-muted-foreground">All active AI agents and their performance</p>
        </div>
        <div className="overflow-x-auto p-6 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Uses</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.name} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{agent.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${categoryColors[agent.category]}`}>
                      {agent.category}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{agent.uses}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      agent.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: agent.performance }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{agent.performance}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
