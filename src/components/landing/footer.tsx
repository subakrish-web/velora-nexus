import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "AI Agents", href: "#agents" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api-docs" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/help" },
  ],
  Company: [
    { label: "About Velora", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg text-white">V</span>
              </div>
              <span className="font-display text-xl">Velora</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Create Content. Velora Builds The Business.
              <br />
              The AI-powered operating system for modern creators.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="mailto:hello@veloranexus.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                hello@veloranexus.com
              </a>
              <a
                href="mailto:support@veloranexus.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-accent" />
                support@veloranexus.com
              </a>
              <a
                href="mailto:security@veloranexus.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-destructive" />
                security@veloranexus.com
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold">{category}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {CURRENT_YEAR} Velora Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
