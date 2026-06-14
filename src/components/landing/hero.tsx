import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow" />
            AI-Powered Creator Business OS
          </div>

          <h1 className="font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl">
            Create Content.
            <br />
            <span className="gradient-text">Velora Builds The Business.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Stop juggling tools. Velora&apos;s AI agents handle your products,
            sales, marketing, and growth — so you stay in your creative zone
            while your business scales itself.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              Start Free — No Card Needed
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-secondary">
              <Play className="h-4 w-4" />
              Watch 2-Min Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              4.9/5 from 2,400+ creators
            </span>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "50K+", label: "Creators Building" },
              { value: "$12M+", label: "Revenue Generated" },
              { value: "30+", label: "AI Agents Working" },
              { value: "99.9%", label: "Platform Uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl gradient-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
