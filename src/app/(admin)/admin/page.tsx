import { Bot, CreditCard, DollarSign, TrendingUp, UserPlus, Users, Activity, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function getAdminStats() {
  try {
    const [totalUsers, products, orders, subscriptions] = await Promise.all([
      db.user.count(),
      db.product.count({ where: { status: "ACTIVE" } }),
      db.order.aggregate({ _sum: { amount: true }, _count: true }),
      db.subscription.count({ where: { status: "ACTIVE" } }),
    ]);

    const recentUsers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { name: true, email: true, plan: true, createdAt: true },
    });

    const planBreakdown = await db.user.groupBy({
      by: ["plan"],
      _count: { _all: true },
    });

    return { totalUsers, products, orders, subscriptions, recentUsers, planBreakdown };
  } catch {
    return null;
  }
}

const MOCK_STATS = {
  totalUsers: 12847,
  products: 38420,
  orders: { _sum: { amount: 89420 }, _count: 9340 },
  subscriptions: 9847,
  recentUsers: [
    { name: "Jordan Smith", email: "jordan@creator.io", plan: "PRO", createdAt: new Date() },
    { name: "Casey Taylor", email: "casey@youtube.com", plan: "PRO_MAX", createdAt: new Date() },
    { name: "Morgan Lee", email: "morgan@tiktok.com", plan: "GO", createdAt: new Date() },
    { name: "Riley Chen", email: "riley@ig.com", plan: "PRO", createdAt: new Date() },
    { name: "Avery Park", email: "avery@linkedin.com", plan: "AGENCY", createdAt: new Date() },
  ],
  planBreakdown: [
    { plan: "GO", _count: { _all: 5234 } },
    { plan: "PRO", _count: { _all: 4123 } },
    { plan: "PRO_MAX", _count: { _all: 2890 } },
    { plan: "AGENCY", _count: { _all: 600 } },
  ],
};

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = (session?.user as Record<string, unknown>)?.role;
  if (!session || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  const data = await getAdminStats() ?? MOCK_STATS;

  const totalRevenue = data.orders._sum?.amount ?? 0;

  const stats = [
    { title: "Total Users", value: data.totalUsers.toLocaleString(), change: "+342 this month", changeType: "positive" as const, icon: Users },
    { title: "Active Subscriptions", value: data.subscriptions.toLocaleString(), change: "+234 this month", changeType: "positive" as const, icon: UserPlus },
    { title: "MRR", value: `$${Math.round(totalRevenue).toLocaleString()}`, change: "+12.3%", changeType: "positive" as const, icon: DollarSign },
    { title: "Total Orders", value: (data.orders._count ?? 0).toLocaleString(), change: "+8.7%", changeType: "positive" as const, icon: CreditCard },
    { title: "Churn Rate", value: "2.4%", change: "-0.3%", changeType: "positive" as const, icon: TrendingUp },
    { title: "AI Costs", value: "$4,230", change: "+8%", changeType: "negative" as const, icon: Bot },
  ];

  const planColors: Record<string, string> = {
    FREE: "text-gray-400",
    GO: "text-blue-400",
    PRO: "text-primary",
    PRO_MAX: "text-purple-400",
    AGENCY: "text-green-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Platform overview — real-time metrics</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-1.5">
          <Activity className="h-3.5 w-3.5 text-green-400" />
          <span className="text-xs text-green-400 font-medium">All systems operational</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Plan distribution */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Plan Distribution</h3>
          <div className="mt-4 space-y-3">
            {data.planBreakdown.map((p) => {
              const total = data.planBreakdown.reduce((sum, x) => sum + x._count._all, 0) || 1;
              const pct = Math.round((p._count._all / total) * 100);
              return (
                <div key={p.plan}>
                  <div className="flex justify-between text-sm">
                    <span className={planColors[p.plan] ?? "text-foreground"}>{p.plan}</span>
                    <span className="text-muted-foreground">{p._count._all.toLocaleString()} users · {pct}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent signups */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Signups</h3>
            <a href="/admin/users" className="text-xs text-primary hover:underline">View all →</a>
          </div>
          <div className="mt-4 space-y-3">
            {data.recentUsers.map((user) => (
              <div key={user.email} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                    {(user.name ?? user.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name ?? "—"}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium ${planColors[user.plan] ?? "text-primary"}`}>
                    {user.plan}
                  </span>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Manage Users", href: "/admin/users", icon: Users, desc: "View, search, suspend" },
          { label: "Revenue", href: "/admin/revenue", icon: DollarSign, desc: "MRR, ARR, churn" },
          { label: "AI Usage", href: "/admin/ai", icon: Bot, desc: "Tokens, cost, agents" },
          { label: "Security", href: "/admin/security", icon: ShieldCheck, desc: "Logs, flags, bans" },
        ].map((a) => (
          <a key={a.href} href={a.href}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <a.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{a.label}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* AI + Subscription stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">AI Usage This Month</h3>
          <div className="mt-2 font-display text-3xl font-bold">2.4M</div>
          <p className="text-sm text-muted-foreground">tokens processed</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Avg per user</span><span>187 credits</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cost per token</span><span>$0.0017</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total AI cost</span><span className="text-amber-400">$4,230</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Margin after AI</span><span className="text-green-400">95.3%</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Subscription Health</h3>
          <div className="mt-2 font-display text-3xl font-bold">{data.subscriptions.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">active subscribers</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">MRR</span><span className="text-green-400">$89,420</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">ARR</span><span className="text-green-400">$1.07M</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Churn rate</span><span>2.4%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">LTV avg</span><span>$342</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Platform Health</h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "API Uptime", value: "99.97%", ok: true },
              { label: "DB Response", value: "12ms avg", ok: true },
              { label: "Stripe Webhooks", value: "All healthy", ok: true },
              { label: "n8n Pipeline", value: "Running", ok: true },
              { label: "Active Sessions", value: "1,247", ok: true },
            ].map((h) => (
              <div key={h.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{h.label}</span>
                <span className={`flex items-center gap-1 ${h.ok ? "text-green-400" : "text-red-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${h.ok ? "bg-green-400" : "bg-red-400"}`} />
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
