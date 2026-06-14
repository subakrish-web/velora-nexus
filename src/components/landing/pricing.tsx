import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "GO",
    price: 19,
    description: "For creators just getting started",
    features: [
      "Digital Storefront",
      "Community Features",
      "5 AI Agents",
      "100 AI Credits / month",
      "Basic Analytics",
      "Email Support",
    ],
    cta: "Start with GO",
    highlighted: false,
  },
  {
    name: "PRO",
    price: 49,
    description: "For serious creators ready to grow",
    features: [
      "Everything in GO",
      "15 AI Agents",
      "Product Builder",
      "Funnel Builder",
      "500 AI Credits / month",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Start with PRO",
    highlighted: true,
  },
  {
    name: "PRO MAX",
    price: 99,
    description: "For creators building empires",
    features: [
      "Everything in PRO",
      "All 30+ AI Agents",
      "Revenue Intelligence",
      "Competitor Intelligence",
      "2,000 AI Credits / month",
      "Custom Automations",
      "Dedicated Support",
    ],
    cta: "Start with PRO MAX",
    highlighted: false,
  },
  {
    name: "AGENCY",
    price: 299,
    description: "For agencies managing creators",
    features: [
      "Everything in PRO MAX",
      "Multi-Client Workspaces",
      "White Label Branding",
      "Team Access & Roles",
      "API Access",
      "Agency-Specific Agents",
      "Custom Integrations",
      "Account Manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Simple, <span className="gradient-text">Honest Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, scale when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all duration-200 ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="font-display text-lg">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="mt-4">
                <span className="font-display text-4xl">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === "AGENCY" ? "/contact" : "/signup"}
                className={`mt-6 block cursor-pointer rounded-lg py-2.5 text-center text-sm font-medium transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-border bg-secondary text-foreground hover:border-primary/30"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
