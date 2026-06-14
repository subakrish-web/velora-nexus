export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">We collect information you provide directly (name, email, payment details) and information generated through your use of the Service (analytics, AI usage, product data).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-2">We use your data to provide and improve the Service, process payments, send important communications, and train AI agents to better serve your business needs. We never sell your personal data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Data Security</h2>
            <p className="mt-2">We implement industry-standard security measures including encryption at rest and in transit, regular security audits, MFA support, and SOC 2 compliance. Report security concerns to <a href="mailto:security@veloranexus.com" className="text-primary hover:underline">security@veloranexus.com</a>.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-2">We use Stripe for payment processing, Supabase for data storage, and select AI providers for agent functionality. Each operates under their own privacy policies.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
            <p className="mt-2">You may request access to, correction of, or deletion of your personal data at any time. You may export your data or close your account through dashboard settings or by contacting <a href="mailto:support@veloranexus.com" className="text-primary hover:underline">support@veloranexus.com</a>.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Cookies</h2>
            <p className="mt-2">We use essential cookies for authentication and preferences. Analytics cookies are optional and respect your browser&apos;s Do Not Track settings.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
            <p className="mt-2">For privacy questions, contact us at <a href="mailto:hello@veloranexus.com" className="text-primary hover:underline">hello@veloranexus.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
