import { Shield, Lock, Key, Eye, Server, AlertTriangle } from "lucide-react";

const features = [
  { icon: Lock, title: "End-to-End Encryption", description: "All data encrypted at rest (AES-256) and in transit (TLS 1.3)." },
  { icon: Key, title: "Passkey & MFA Support", description: "Passwordless authentication with passkeys, plus TOTP and SMS two-factor." },
  { icon: Eye, title: "Audit Logging", description: "Complete audit trail of all account actions, exportable for compliance." },
  { icon: Server, title: "SOC 2 Compliant", description: "Regular third-party audits ensure enterprise-grade data protection." },
  { icon: Shield, title: "Device Detection", description: "Real-time alerts for new device logins and suspicious activity patterns." },
  { icon: AlertTriangle, title: "Vulnerability Program", description: "Responsible disclosure program for security researchers." },
];

export default function SecurityPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            Security at <span className="gradient-text">Velora</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your business data is precious. We protect it with enterprise-grade security at every layer.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <feature.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <Shield className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="mt-4 font-display text-2xl">Report a Vulnerability</h2>
          <p className="mt-2 text-muted-foreground">Found a security issue? We appreciate responsible disclosure.</p>
          <a
            href="mailto:security@veloranexus.com"
            className="mt-4 inline-block cursor-pointer rounded-lg bg-destructive px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            security@veloranexus.com
          </a>
        </div>
      </div>
    </div>
  );
}
