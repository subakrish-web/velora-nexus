import {
  Brain,
  FileText,
  LineChart,
  Megaphone,
  Package,
  Search,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

const agentCategories = [
  {
    title: "Content Agents",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    agents: [
      "Viral Content",
      "Trend Hunter",
      "Hook Generator",
      "YouTube",
      "Instagram",
      "TikTok",
      "LinkedIn",
      "SEO",
      "Content Calendar",
    ],
    icon: FileText,
  },
  {
    title: "Product Agents",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    agents: [
      "Product Builder",
      "Ebook Builder",
      "Course Builder",
      "Membership Builder",
      "Template Builder",
    ],
    icon: Package,
  },
  {
    title: "Revenue Agents",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    agents: [
      "Funnel Agent",
      "Pricing Agent",
      "Upsell Agent",
      "Revenue Agent",
      "Checkout Optimization",
    ],
    icon: TrendingUp,
  },
  {
    title: "Marketing Agents",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    agents: [
      "Email Marketing",
      "Campaign Agent",
      "Referral Agent",
      "Launch Agent",
      "Lead Magnet",
    ],
    icon: Megaphone,
  },
  {
    title: "Customer Success",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    agents: [
      "Retention Agent",
      "Community Agent",
      "Support Agent",
      "Feedback Agent",
    ],
    icon: Users,
  },
  {
    title: "Intelligence Agents",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    agents: [
      "Competitor Agent",
      "Analytics Agent",
      "Forecast Agent",
      "Research Agent",
      "Growth Agent",
    ],
    icon: Brain,
  },
];

export function AIAgents() {
  return (
    <section id="agents" className="py-20 sm:py-32 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Brain className="h-4 w-4" />
            30+ AI Agents
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your AI Team,{" "}
            <span className="gradient-text">Always Working</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Specialized AI agents that handle every aspect of your creator
            business — from content creation to revenue optimization.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agentCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.bg}`}
                >
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.agents.map((agent) => (
                  <span
                    key={agent}
                    className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
