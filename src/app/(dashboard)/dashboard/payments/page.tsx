import { CreditCard, DollarSign, RefreshCw, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Total Revenue", value: "$124,563", change: "+12.5%", changeType: "positive" as const, icon: DollarSign },
  { title: "Subscription Revenue", value: "$25,896", change: "+8.2%", changeType: "positive" as const, icon: TrendingUp },
  { title: "Pending Payouts", value: "$3,420", change: "Next payout: Jun 16", changeType: "neutral" as const, icon: CreditCard },
  { title: "Refunds", value: "$892", change: "-15%", changeType: "positive" as const, icon: RefreshCw },
];

const transactions = [
  { id: "TXN-8901", type: "Sale", description: "Ultimate SEO Guide", amount: "+$49.00", date: "Jun 14, 2026" },
  { id: "TXN-8902", type: "Sale", description: "AI Prompt Pack", amount: "+$29.00", date: "Jun 14, 2026" },
  { id: "TXN-8903", type: "Subscription", description: "Creator Community - Monthly", amount: "+$29.00", date: "Jun 14, 2026" },
  { id: "TXN-8904", type: "Refund", description: "Brand Strategy Guide", amount: "-$79.00", date: "Jun 13, 2026" },
  { id: "TXN-8905", type: "Payout", description: "Stripe Payout", amount: "-$2,450.00", date: "Jun 12, 2026" },
  { id: "TXN-8906", type: "Sale", description: "Creator Masterclass", amount: "+$199.00", date: "Jun 12, 2026" },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted-foreground">Revenue overview and transaction history</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Transaction History</h3>
          <div className="mt-4 space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    txn.type === "Sale" || txn.type === "Subscription"
                      ? "bg-success/10" : txn.type === "Refund"
                      ? "bg-destructive/10" : "bg-info/10"
                  }`}>
                    {txn.type === "Refund" ? (
                      <RefreshCw className={`h-4 w-4 text-destructive`} />
                    ) : (
                      <DollarSign className={`h-4 w-4 ${txn.type === "Payout" ? "text-info" : "text-success"}`} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{txn.description}</div>
                    <div className="text-xs text-muted-foreground">{txn.type} &middot; {txn.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    txn.amount.startsWith("+") ? "text-success" : "text-destructive"
                  }`}>
                    {txn.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">{txn.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Failed Payments</h3>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 p-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-sm font-medium">3 failed payments</div>
                <div className="text-xs text-muted-foreground">$87.00 at risk</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Payout Schedule</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next payout</span>
                <span className="font-medium">Jun 16, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">$3,420.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-medium">Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
