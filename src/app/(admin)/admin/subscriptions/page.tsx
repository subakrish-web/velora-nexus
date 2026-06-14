import { ArrowDownCircle, ArrowUpCircle, CreditCard, RefreshCw } from "lucide-react";

const plans = [
  { name: "GO", price: "$19/mo", users: 5234, mrr: "$99,446", growth: "+3.2%" },
  { name: "PRO", price: "$49/mo", users: 4123, mrr: "$202,027", growth: "+5.1%" },
  { name: "PRO MAX", price: "$99/mo", users: 2890, mrr: "$286,110", growth: "+8.4%" },
  { name: "AGENCY", price: "$299/mo", users: 600, mrr: "$179,400", growth: "+12.1%" },
];

const recentChanges = [
  { user: "Alex Johnson", action: "Upgraded", from: "PRO", to: "PRO MAX", date: "2 hours ago" },
  { user: "Sarah Miller", action: "Downgraded", from: "PRO MAX", to: "PRO", date: "5 hours ago" },
  { user: "Mike Chen", action: "Upgraded", from: "PRO", to: "AGENCY", date: "8 hours ago" },
  { user: "Emily Davis", action: "Cancelled", from: "GO", to: "—", date: "1 day ago" },
  { user: "James Wilson", action: "Upgraded", from: "GO", to: "PRO", date: "1 day ago" },
  { user: "Lisa Anderson", action: "Renewed", from: "PRO MAX", to: "PRO MAX", date: "2 days ago" },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription Management</h1>
        <p className="text-sm text-muted-foreground">Monitor and manage platform subscriptions</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{plan.name}</h3>
              <span className="text-sm text-muted-foreground">{plan.price}</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{plan.users.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">subscribers</div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">MRR</span>
              <span className="font-medium">{plan.mrr}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Growth</span>
              <span className="text-success">{plan.growth}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Recent Subscription Changes</h3>
        <div className="mt-4 space-y-3">
          {recentChanges.map((change, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  change.action === "Upgraded" ? "bg-success/10" :
                  change.action === "Downgraded" || change.action === "Cancelled" ? "bg-destructive/10" :
                  "bg-info/10"
                }`}>
                  {change.action === "Upgraded" ? (
                    <ArrowUpCircle className="h-4 w-4 text-success" />
                  ) : change.action === "Downgraded" || change.action === "Cancelled" ? (
                    <ArrowDownCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <RefreshCw className="h-4 w-4 text-info" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{change.user}</div>
                  <div className="text-xs text-muted-foreground">
                    {change.action}: {change.from} → {change.to}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{change.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
