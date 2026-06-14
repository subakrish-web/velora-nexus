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
      "30+ specialized AI agents that handle content, products, marketing, revenue optimization, and customer success automatically.",
  },
  {
    icon: ShoppingBag,
    title: "Digital Marketplace",
    description:
      "Sell ebooks, courses, templates, AI prompts, memberships, and digital downloads from your personalized storefront.",
  },
  {
    icon: LayoutDashboard,
    title: "Creator Dashboard",
    description:
      "Real-time analytics, revenue tracking, subscriber growth, and performance metrics in one unified dashboard.",
  },
  {
    icon: Globe,
    title: "Social Connectors",
    description:
      "Connect YouTube, Instagram, TikTok, LinkedIn, X, Facebook, and Telegram to track and grow your audience.",
  },
  {
    icon: Mail,
    title: "Marketing Automation",
    description:
      "Automated email sequences, campaign management, referral programs, and launch workflows that run on autopilot.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Stripe-powered checkout with dynamic upsells, subscription management, and automated payouts.",
  },
  {
    icon: Users,
    title: "Membership Management",
    description:
      "Build and manage membership tiers, communities, and subscriber-only content with built-in churn prevention.",
  },
  {
    icon: BarChart3,
    title: "Revenue Intelligence",
    description:
      "AI-powered forecasting, pricing optimization, and revenue insights to maximize your creator business earnings.",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description:
      "Trigger-based workflows for lead capture, purchase sequences, re-engagement campaigns, and referral rewards.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Everything You Need to{" "}
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            One platform. All the tools. Zero complexity. Velora handles the
            business so you can focus on creating.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <feature.icon className="h-6 w-6" />
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
