import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const metrics = [
  { title: "Revenue", value: "$24,563", change: "+8.2%", changeType: "positive" as const, icon: DollarSign },
  { title: "Orders", value: "1,429", change: "+12.3%", changeType: "positive" as const, icon: ShoppingCart },
  { title: "Refunds", value: "$342", change: "-2.1%", changeType: "positive" as const, icon: RefreshCw },
  { title: "Churn Rate", value: "2.4%", change: "-0.3%", changeType: "positive" as const, icon: ArrowDownRight },
  { title: "Subscriber Growth", value: "+47", change: "+18%", changeType: "positive" as const, icon: Users },
  { title: "Conversion Rate", value: "3.2%", change: "+0.4%", changeType: "positive" as const, icon: TrendingUp },
  { title: "CLV", value: "$142", change: "+$12", changeType: "positive" as const, icon: DollarSign },
  { title: "Avg Order Value", value: "$67", change: "+$4", changeType: "positive" as const, icon: ArrowUpRight },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your business performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <StatCard key={m.title} {...m} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Daily Revenue</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Daily Revenue Chart</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Subscription Growth</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Subscription Growth Chart</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Traffic Sources</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Traffic Sources Chart</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Funnel Performance</h3>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Funnel Chart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
