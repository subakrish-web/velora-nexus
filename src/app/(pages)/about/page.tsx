import { Heart, Globe, Zap, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Creator-First",
    description: "Everything we build starts with one question: does this help creators earn more while creating more?",
  },
  {
    icon: Zap,
    title: "AI That Works",
    description: "We don't add AI for the buzzword. Every agent solves a real problem that used to take hours of manual work.",
  },
  {
    icon: Globe,
    title: "Global & Inclusive",
    description: "Creators come from everywhere. Velora works for solo YouTubers, TikTok educators, and LinkedIn thought leaders alike.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our roadmap is shaped by the creators who use Velora every day. Your feedback becomes our next feature.",
  },
];

const team = [
  { name: "The Engineering Team", role: "Building the platform", count: "24 engineers" },
  { name: "The AI Team", role: "Training & deploying agents", count: "12 ML engineers" },
  { name: "The Design Team", role: "Crafting the experience", count: "8 designers" },
  { name: "The Growth Team", role: "Helping creators succeed", count: "16 specialists" },
];

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            Built by Creators,{" "}
            <span className="gradient-text">for Creators</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Velora Nexus was born from frustration. We watched talented creators
            spend more time on business operations than on creating. So we built
            an AI team that handles the business side — products, sales,
            marketing, growth — while creators do what they love.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-center text-2xl sm:text-3xl">Our Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-center text-2xl sm:text-3xl">Our Team</h2>
          <p className="mt-4 text-center text-muted-foreground">60+ people building the future of creator businesses</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="font-display text-2xl gradient-text">{t.count}</div>
                <div className="mt-2 font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl sm:text-3xl">Want to Join Us?</h2>
          <p className="mt-4 text-muted-foreground">We&apos;re always looking for passionate people who care about creators.</p>
          <a href="/careers" className="mt-6 inline-block cursor-pointer rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
}
