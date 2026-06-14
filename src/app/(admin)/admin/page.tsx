import { Bot, CreditCard, DollarSign, TrendingUp, UserPlus, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Total Users", value: "12,847", change: "+342 this month", changeType: "positive" as const, icon: Users },
  { title: "Active Users", value: "8,923", change: "69.5% active", changeType: "neutral" as const, icon: UserPlus },
  { title: "MRR", value: "$89,420", change: "+12.3%", changeType: "positive" as const, icon: DollarSign },
  { title: "ARR", value: "$1.07M", change: "+18.7%", changeType: "positive" as const, icon: TrendingUp },
  { title: "Churn Rate", value: "2.4%", change: "-0.3%", changeType: "positive" as const, icon: TrendingUp },
  { title: "AI Costs", value: "$4,230", change: "+8%", changeType: "negative" as const, icon: Bot },
];

const recentSignups = [
  { name: "Jordan Smith", email: "jordan@creator.io", plan: "PRO", date: "2 hours ago" },
  { name: "Casey Taylor", email: "casey@youtube.com", plan: "PRO MAX", date: "4 hours ago" },
  { name: "Morgan Lee", email: "morgan@tiktok.com", plan: "GO", date: "6 hours ago" },
  { name: "Riley Chen", email: "riley@ig.com", plan: "PRO", date: "8 hours ago" },
  { name: "Avery Park", email: "avery@linkedin.com", plan: "AGENCY", date: "12 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform overview and key metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Revenue Trend</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Monthly Revenue Chart</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Recent Signups</h3>
          <div className="mt-4 space-y-3">
            {recentSignups.map((user) => (
              <div key={user.email} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{user.plan}</span>
                  <div className="mt-0.5 text-xs text-muted-foreground">{user.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Plan Distribution</h3>
          <div className="mt-4 space-y-3">
            {[
              { plan: "GO", users: 5234, pct: 41 },
              { plan: "PRO", users: 4123, pct: 32 },
              { plan: "PRO MAX", users: 2890, pct: 22 },
              { plan: "AGENCY", users: 600, pct: 5 },
            ].map((p) => (
              <div key={p.plan}>
                <div className="flex justify-between text-sm">
                  <span>{p.plan}</span>
                  <span className="text-muted-foreground">{p.users.toLocaleString()} users</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Active Subscriptions</h3>
          <div className="mt-2 text-3xl font-bold">9,847</div>
          <p className="text-sm text-muted-foreground">+234 this month</p>
          <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Subscription Chart</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">AI Usage</h3>
          <div className="mt-2 text-3xl font-bold">2.4M</div>
          <p className="text-sm text-muted-foreground">tokens this month</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg per user</span>
              <span>187 credits</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost per user</span>
              <span>$0.33</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total AI cost</span>
              <span>$4,230</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
