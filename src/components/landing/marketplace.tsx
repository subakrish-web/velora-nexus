import {
  BookOpen,
  Code,
  Download,
  FileText,
  GraduationCap,
  Layout,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";

const products = [
  { icon: BookOpen, label: "Ebooks", count: "2.4K+" },
  { icon: FileText, label: "PDF Guides", count: "1.8K+" },
  { icon: Layout, label: "Templates", count: "5.2K+" },
  { icon: Sparkles, label: "AI Prompts", count: "3.1K+" },
  { icon: Code, label: "AI Agents", count: "890+" },
  { icon: GraduationCap, label: "Courses", count: "1.2K+" },
  { icon: Users, label: "Communities", count: "670+" },
  { icon: Download, label: "Downloads", count: "8.9K+" },
  { icon: Palette, label: "Design Assets", count: "4.3K+" },
];

export function Marketplace() {
  return (
    <section id="marketplace" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Your{" "}
              <span className="gradient-text">AI-Powered Storefront</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sell anything digital. Velora generates your storefront, product
              pages, checkout flows, and handles payments — all with AI-driven
              personalized recommendations and dynamic upsells.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "AI-generated product pages & descriptions",
                "Dynamic pricing & upsell optimization",
                "One-click checkout with Stripe",
                "Personalized recommendations per customer",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <div
                key={product.label}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <product.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{product.label}</span>
                <span className="text-xs text-muted-foreground">
                  {product.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
