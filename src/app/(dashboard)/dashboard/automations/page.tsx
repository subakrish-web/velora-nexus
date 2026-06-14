import { ArrowRight, Bell, Gift, Mail, Plus, RefreshCw, ShoppingCart, UserPlus, Zap } from "lucide-react";

const automations = [
  {
    name: "Welcome Email Sequence",
    trigger: "Lead Captured",
    action: "5-part email sequence",
    status: "Active",
    runs: 1243,
    icon: UserPlus,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    name: "Post-Purchase Upsell",
    trigger: "Purchase Completed",
    action: "Upsell email + offer page",
    status: "Active",
    runs: 892,
    icon: ShoppingCart,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    name: "New Member Onboarding",
    trigger: "Subscription Started",
    action: "7-day onboarding flow",
    status: "Active",
    runs: 456,
    icon: Bell,
    color: "bg-violet-500/10 text-violet-400",
  },
  {
    name: "Renewal Reminder",
    trigger: "Subscription Expiring",
    action: "3-email renewal campaign",
    status: "Active",
    runs: 234,
    icon: RefreshCw,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    name: "Win-Back Campaign",
    trigger: "Inactive 30 Days",
    action: "Re-engagement sequence",
    status: "Paused",
    runs: 167,
    icon: Mail,
    color: "bg-rose-500/10 text-rose-400",
  },
  {
    name: "Referral Rewards",
    trigger: "Referral Completed",
    action: "Credit + thank you email",
    status: "Active",
    runs: 89,
    icon: Gift,
    color: "bg-cyan-500/10 text-cyan-400",
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Automations</h1>
          <p className="text-sm text-muted-foreground">Automated workflows that run your business</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" />
          Create Automation
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Active Automations
          </div>
          <div className="mt-2 text-2xl font-bold">5</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="h-4 w-4 text-success" />
            Total Runs
          </div>
          <div className="mt-2 text-2xl font-bold">3,081</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-info" />
            Emails Sent
          </div>
          <div className="mt-2 text-2xl font-bold">12,450</div>
        </div>
      </div>

      <div className="space-y-4">
        {automations.map((auto) => (
          <div key={auto.name} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${auto.color}`}>
                  <auto.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{auto.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{auto.trigger}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="text-primary">{auto.action}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{auto.runs.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">total runs</div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  auto.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {auto.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
