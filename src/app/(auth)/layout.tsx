import Link from "next/link";

const CURRENT_YEAR = 2026;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary/5 p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg text-white">V</span>
          </div>
          <span className="font-display text-xl">Velora</span>
        </Link>
        <div>
          <h2 className="font-display text-3xl">
            Create Content.
            <br />
            <span className="gradient-text">Velora Builds The Business.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Join 50,000+ creators who use AI agents to build, sell, and scale
            their digital businesses automatically.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {CURRENT_YEAR} Velora Nexus. All rights reserved.
        </p>
      </div>
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
