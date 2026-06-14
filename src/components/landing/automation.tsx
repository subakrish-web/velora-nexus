import { ArrowRight, Mail, ShoppingCart, UserPlus, Gift, RefreshCw, Bell } from "lucide-react";

const automations = [
  {
    trigger: "Lead Captured",
    action: "Email Sequence",
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    trigger: "Purchase Completed",
    action: "Welcome + Upsell",
    icon: ShoppingCart,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    trigger: "Subscription Started",
    action: "Onboarding Flow",
    icon: Bell,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    trigger: "Subscription Expiring",
    action: "Renewal Campaign",
    icon: RefreshCw,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    trigger: "Inactive User",
    action: "Re-engagement",
    icon: Mail,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    trigger: "Referral Completed",
    action: "Reward Workflow",
    icon: Gift,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export function Automation() {
  return (
    <section className="py-20 sm:py-32 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Automation That{" "}
            <span className="gradient-text">Runs Your Business</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Set up once, run forever. Intelligent workflows that trigger
            automatically based on customer actions.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automations.map((auto) => (
            <div
              key={auto.trigger}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${auto.bg}`}
              >
                <auto.icon className={`h-5 w-5 ${auto.color}`} />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-sm font-medium">{auto.trigger}</div>
                  <div className="text-xs text-muted-foreground">Trigger</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-primary">
                    {auto.action}
                  </div>
                  <div className="text-xs text-muted-foreground">Action</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
