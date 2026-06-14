import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { AIAgents } from "@/components/landing/ai-agents";
import { Marketplace } from "@/components/landing/marketplace";
import { Automation } from "@/components/landing/automation";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AIAgents />
      <Marketplace />
      <Automation />
      <Pricing />
      <Footer />
    </main>
  );
}
