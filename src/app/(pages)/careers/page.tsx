import { MapPin, Clock, ArrowRight } from "lucide-react";

const openings = [
  { title: "Senior Full-Stack Engineer", department: "Engineering", location: "Remote", type: "Full-time" },
  { title: "ML Engineer — AI Agents", department: "AI", location: "Remote", type: "Full-time" },
  { title: "Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { title: "Growth Marketing Lead", department: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Developer Advocate", department: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Customer Success Manager", department: "Support", location: "Remote", type: "Full-time" },
  { title: "Content Marketing Manager", department: "Marketing", location: "Remote", type: "Full-time" },
  { title: "QA Engineer", department: "Engineering", location: "Remote", type: "Full-time" },
];

const perks = [
  "Fully remote — work from anywhere",
  "Competitive salary + equity",
  "Unlimited PTO",
  "Home office stipend",
  "Health & wellness benefits",
  "Learning & development budget",
];

export default function CareersPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            Build the Future of the{" "}
            <span className="gradient-text">Creator Economy</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join a team that&apos;s helping 50,000+ creators turn their passion into thriving businesses.
          </p>
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8">
          <h2 className="font-display text-xl">Why Velora?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {perk}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl">Open Positions</h2>
          <div className="mt-6 space-y-3">
            {openings.map((job) => (
              <a
                key={job.title}
                href={`mailto:hello@veloranexus.com?subject=Application: ${job.title}`}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30"
              >
                <div>
                  <h3 className="font-semibold group-hover:text-primary">{job.title}</h3>
                  <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Don&apos;t see your role? We&apos;re always looking for talented people.</p>
          <a
            href="mailto:hello@veloranexus.com?subject=General Application"
            className="mt-4 inline-block cursor-pointer rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Send General Application
          </a>
        </div>
      </div>
    </div>
  );
}
