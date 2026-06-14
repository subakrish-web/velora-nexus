import {
  BarChart3,
  Bot,
  CreditCard,
  Globe,
  LayoutDashboard,
  Mail,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Agent System",
    description:
      "30+ specialized AI agents handle content, products, marketing, revenue, and customer success around the clock.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: ShoppingBag,
    title: "Digital Marketplace",
    description:
      "Sell ebooks, courses, templates, AI prompts, memberships — from a storefront that converts.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Creator Dashboard",
    description:
      "Real-time revenue, subscriber growth, and performance metrics. Everything you need, nothing you don't.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "Social Connectors",
    description:
      "YouTube, Instagram, TikTok, LinkedIn, X, Facebook, Telegram — track and grow all your audiences.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Mail,
    title: "Marketing Automation",
    description:
      "Email sequences, campaigns, referral programs, and launch workflows that run while you sleep.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description:
      "One-click checkout, dynamic upsells, subscription billing, and automatic payouts via Stripe.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Users,
    title: "Memberships & Community",
    description:
      "Build tiers, gate content, and grow a loyal community with built-in churn prevention.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: BarChart3,
    title: "Revenue Intelligence",
    description:
      "AI-powered forecasting, pricing optimization, and insights that find money you're leaving on the table.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description:
      "Trigger-based workflows for leads, purchases, renewals, re-engagement, and referral rewards.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Everything You Need to{" "}
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One platform replaces twelve. No more duct-taping tools together.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-colors duration-200`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
