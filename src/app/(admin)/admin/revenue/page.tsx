import { DollarSign, RefreshCw, TrendingUp, CreditCard } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Monthly Revenue", value: "$89,420", change: "+12.3%", changeType: "positive" as const, icon: DollarSign },
  { title: "Annual Revenue", value: "$1.07M", change: "+18.7%", changeType: "positive" as const, icon: TrendingUp },
  { title: "Refund Rate", value: "1.2%", change: "-0.3%", changeType: "positive" as const, icon: RefreshCw },
  { title: "Subscription Revenue", value: "$72,340", change: "+15%", changeType: "positive" as const, icon: CreditCard },
];

export default function AdminRevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Revenue Analytics</h1>
        <p className="text-sm text-muted-foreground">Platform-wide revenue metrics and trends</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Monthly Revenue</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Monthly Revenue Chart</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Revenue by Plan</h3>
          <div className="mt-4 space-y-4">
            {[
              { plan: "GO", revenue: "$9,946", pct: 11 },
              { plan: "PRO", revenue: "$20,213", pct: 23 },
              { plan: "PRO MAX", revenue: "$28,610", pct: 32 },
              { plan: "AGENCY", revenue: "$30,651", pct: 34 },
            ].map((p) => (
              <div key={p.plan}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.plan}</span>
                  <span>{p.revenue}</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Product Revenue Breakdown</h3>
        <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
          <span className="text-sm text-muted-foreground">Product Revenue Chart</span>
        </div>
      </div>
    </div>
  );
}
