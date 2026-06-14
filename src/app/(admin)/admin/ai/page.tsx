import { Bot, Cpu, DollarSign, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Total Tokens", value: "24.8M", change: "this month", changeType: "neutral" as const, icon: Cpu },
  { title: "Total Credits", value: "186K", change: "consumed", changeType: "neutral" as const, icon: Zap },
  { title: "Total AI Cost", value: "$4,230", change: "+8%", changeType: "negative" as const, icon: DollarSign },
  { title: "Cost Per User", value: "$0.33", change: "-12%", changeType: "positive" as const, icon: Bot },
];

const agentCosts = [
  { agent: "Content Agents", usage: "8.2M tokens", cost: "$1,420", users: 4230 },
  { agent: "Product Agents", usage: "4.1M tokens", cost: "$890", users: 2100 },
  { agent: "Revenue Agents", usage: "3.8M tokens", cost: "$720", users: 1890 },
  { agent: "Marketing Agents", usage: "5.2M tokens", cost: "$650", users: 3420 },
  { agent: "Customer Agents", usage: "2.1M tokens", cost: "$340", users: 1560 },
  { agent: "Intelligence Agents", usage: "1.4M tokens", cost: "$210", users: 890 },
];

export default function AdminAIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Analytics</h1>
        <p className="text-sm text-muted-foreground">Monitor AI usage, costs, and performance across the platform</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Usage Over Time</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Token Usage Chart</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Cost by Agent Category</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Agent</th>
                  <th className="pb-3 font-medium">Usage</th>
                  <th className="pb-3 font-medium">Cost</th>
                  <th className="pb-3 font-medium">Users</th>
                </tr>
              </thead>
              <tbody>
                {agentCosts.map((a) => (
                  <tr key={a.agent} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium">{a.agent}</td>
                    <td className="py-2.5 text-muted-foreground">{a.usage}</td>
                    <td className="py-2.5">{a.cost}</td>
                    <td className="py-2.5 text-muted-foreground">{a.users.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Model Usage Distribution</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { model: "GPT-4o", usage: "58%", cost: "$2,453" },
            { model: "Claude Sonnet", usage: "32%", cost: "$1,354" },
            { model: "Claude Haiku", usage: "10%", cost: "$423" },
          ].map((m) => (
            <div key={m.model} className="rounded-lg border border-border p-4">
              <div className="text-sm font-medium">{m.model}</div>
              <div className="mt-2 text-2xl font-bold">{m.usage}</div>
              <div className="text-xs text-muted-foreground">{m.cost} cost</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
