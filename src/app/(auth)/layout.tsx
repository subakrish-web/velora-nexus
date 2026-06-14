import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary/5 p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Velora</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold">
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
          &copy; {new Date().getFullYear()} Velora. All rights reserved.
        </p>
      </div>
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
