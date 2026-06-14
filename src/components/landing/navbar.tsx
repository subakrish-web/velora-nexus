"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "AI Agents", href: "#agents" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-lg text-white">V</span>
            </div>
            <span className="font-display text-xl">Velora</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Get Started Free
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block cursor-pointer py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/login"
              className="rounded-lg border border-border px-4 py-2.5 text-center text-sm transition-colors hover:bg-secondary"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
