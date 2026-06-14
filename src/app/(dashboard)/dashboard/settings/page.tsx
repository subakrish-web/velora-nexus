import { Bell, CreditCard, Globe, Key, Palette, Shield, User } from "lucide-react";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your personal information and public profile",
    icon: User,
  },
  {
    title: "Billing & Plans",
    description: "Manage subscription, payment methods, and invoices",
    icon: CreditCard,
  },
  {
    title: "Security",
    description: "Password, two-factor authentication, and sessions",
    icon: Shield,
  },
  {
    title: "Notifications",
    description: "Email and push notification preferences",
    icon: Bell,
  },
  {
    title: "API Keys",
    description: "Manage API access and webhook endpoints",
    icon: Key,
  },
  {
    title: "Domain & Branding",
    description: "Custom domain, logo, and brand colors",
    icon: Palette,
  },
  {
    title: "Integrations",
    description: "Connected apps and third-party services",
    icon: Globe,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {settingsSections.map((section) => (
          <button
            key={section.title}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{section.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Profile Section (expanded by default) */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                defaultValue="Creator"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="creator@velora.io"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              rows={3}
              defaultValue="Digital creator building scalable businesses with AI."
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end">
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:opacity-90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
