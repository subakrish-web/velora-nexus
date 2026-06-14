import { ArrowRight, Building, Handshake, Users } from "lucide-react";

const partnerTypes = [
  {
    icon: Building,
    title: "Agency Partners",
    description: "Manage multiple creator accounts with white-label tools, team access, and dedicated support.",
    cta: "Apply for Agency Partnership",
  },
  {
    icon: Users,
    title: "Affiliate Partners",
    description: "Earn recurring commissions by referring creators to Velora. Get 30% for the life of each referral.",
    cta: "Join Affiliate Program",
  },
  {
    icon: Handshake,
    title: "Technology Partners",
    description: "Build integrations with our API. Get listed in our marketplace and reach 50,000+ creators.",
    cta: "Become a Tech Partner",
  },
];

export default function PartnersPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            <span className="gradient-text">Partner</span> with Velora
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Grow together. Whether you&apos;re an agency, affiliate, or tech company — there&apos;s a place for you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {partnerTypes.map((partner) => (
            <div key={partner.title} className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <partner.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-xl">{partner.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{partner.description}</p>
              <a
                href="mailto:hello@veloranexus.com?subject=Partnership Inquiry"
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {partner.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
