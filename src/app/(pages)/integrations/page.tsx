import { ArrowRight } from "lucide-react";
import Link from "next/link";

const integrations = [
  {
    category: "Payments",
    items: [
      { name: "Stripe", description: "Accept payments, subscriptions, and payouts globally", status: "Live" },
      { name: "PayPal", description: "Alternative payment method for international customers", status: "Coming Soon" },
      { name: "Lemonsqueezy", description: "Digital product payments with built-in tax handling", status: "Coming Soon" },
    ],
  },
  {
    category: "Social Platforms",
    items: [
      { name: "YouTube", description: "Video analytics, channel growth, and content insights", status: "Live" },
      { name: "Instagram", description: "Reels analytics, engagement metrics, and growth tracking", status: "Live" },
      { name: "TikTok", description: "Video performance analytics and trend detection", status: "Live" },
      { name: "LinkedIn", description: "Post analytics and professional audience growth", status: "Live" },
      { name: "X (Twitter)", description: "Tweet performance and follower growth metrics", status: "Live" },
      { name: "Telegram", description: "Community metrics and member activity tracking", status: "Beta" },
    ],
  },
  {
    category: "Email & Marketing",
    items: [
      { name: "Built-in Email", description: "Native email marketing with sequences and campaigns", status: "Live" },
      { name: "Mailchimp", description: "Sync contacts and campaigns with Mailchimp", status: "Coming Soon" },
      { name: "ConvertKit", description: "Integrate with your existing ConvertKit workflows", status: "Coming Soon" },
    ],
  },
  {
    category: "APIs & Developer Tools",
    items: [
      { name: "REST API", description: "Full API access for custom integrations and automation", status: "Live" },
      { name: "Webhooks", description: "Real-time event notifications for purchases, signups, and more", status: "Live" },
      { name: "Zapier", description: "Connect Velora with 5,000+ apps via Zapier", status: "Beta" },
      { name: "Make (Integromat)", description: "Advanced automation workflows with Make", status: "Coming Soon" },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            <span className="gradient-text">Integrations</span> & Connections
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect Velora with the tools you already use. Payments, socials, email, and APIs — all in one place.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {integrations.map((group) => (
            <div key={group.category}>
              <h2 className="font-display text-xl">{group.category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.status === "Live" ? "bg-success/10 text-success" :
                        item.status === "Beta" ? "bg-info/10 text-info" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="font-display text-2xl">Need a Custom Integration?</h2>
          <p className="mt-2 text-muted-foreground">Our API gives you full access. Build anything you need.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/api-docs"
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              API Documentation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:hello@veloranexus.com?subject=Custom Integration Request"
              className="cursor-pointer rounded-lg border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
