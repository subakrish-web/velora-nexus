import Image from "next/image";
import Link from "next/link";

const CURRENT_YEAR = 2026;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#0A0A0A] p-12 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/velora-logo.svg" alt="Velora" width={40} height={40} />
          <Image src="/velora-wordmark.svg" alt="Velora Nexus" width={140} height={35} className="h-8 w-auto" />
        </Link>

        {/* Center hero */}
        <div className="space-y-6">
          {/* Big logo */}
          <div className="flex justify-center">
            <Image
              src="/velora-logo.svg"
              alt="Velora Nexus"
              width={160}
              height={160}
              className="opacity-90 drop-shadow-[0_0_40px_rgba(217,119,6,0.4)]"
            />
          </div>
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold text-white leading-tight">
              Create Content.
            </h2>
            <h2 className="font-display text-4xl font-bold leading-tight" style={{ color: "#D97706" }}>
              Velora Builds The Business.
            </h2>
            <p className="mt-4 text-sm text-white/50 max-w-sm mx-auto">
              Join 50,000+ creators who use AI agents to build, sell, and scale
              their digital businesses automatically.
            </p>
          </div>

          {/* Provider logos row */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["OpenAI", "Anthropic", "Google", "Groq", "Mistral"].map((name) => (
              <div key={name} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
                {name}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-white/30">
          &copy; {CURRENT_YEAR} Velora Nexus. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <Image src="/velora-logo.svg" alt="Velora" width={32} height={32} />
          <Image src="/velora-wordmark.svg" alt="Velora Nexus" width={120} height={30} className="h-7 w-auto" />
        </Link>
        {children}
      </div>
    </div>
  );
}
