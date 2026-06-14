import { Mail, MessageSquare, Shield } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    title: "General Inquiries",
    email: "hello@veloranexus.com",
    description: "Questions about Velora, partnerships, or press inquiries.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    email: "support@veloranexus.com",
    description: "Need help with your account, billing, or technical issues? We respond within 4 hours.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Security",
    email: "security@veloranexus.com",
    description: "Report security vulnerabilities or concerns. We take every report seriously.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;d love to hear from you. Choose the best way to reach us.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div key={contact.email} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${contact.bg}`}>
                <contact.icon className={`h-7 w-7 ${contact.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{contact.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{contact.description}</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-4 inline-block cursor-pointer rounded-lg bg-secondary px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-primary hover:text-white"
              >
                {contact.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="font-display text-center text-2xl">Send Us a Message</h2>
          <form className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more..."
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
