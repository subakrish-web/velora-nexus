export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">By accessing or using Velora Nexus (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
            <p className="mt-2">Velora Nexus is an AI-powered creator business operating system that provides tools for building products, selling digital goods, managing memberships, automating marketing, and analyzing business performance.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">3. User Accounts</h2>
            <p className="mt-2">You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Payment Terms</h2>
            <p className="mt-2">Paid plans are billed monthly or annually. All fees are non-refundable except as required by law. We may change pricing with 30 days&apos; notice. Payments are processed securely via Stripe.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Content Ownership</h2>
            <p className="mt-2">You retain ownership of all content you create using Velora Nexus. We do not claim any intellectual property rights over your content, products, or business data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Acceptable Use</h2>
            <p className="mt-2">You agree not to use the Service for illegal activities, to distribute harmful content, to attempt unauthorized access to our systems, or to resell the Service without authorization.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Termination</h2>
            <p className="mt-2">Either party may terminate the agreement at any time. Upon termination, your access to the Service will cease and your data will be available for export for 30 days.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
            <p className="mt-2">For questions about these terms, contact us at <a href="mailto:hello@veloranexus.com" className="text-primary hover:underline">hello@veloranexus.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
