"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  ChevronLeft,
  CreditCard,
  FileCode,
  Globe,
  Home,
  LayoutTemplate,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  Zap,
  X,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Members", href: "/dashboard/members", icon: Users },
  { label: "AI Agents", href: "/dashboard/ai", icon: Bot },
  { label: "AI Providers", href: "/dashboard/ai-providers", icon: Sparkles },
  { label: "Social", href: "/dashboard/social", icon: Globe },
  { label: "Automations", href: "/dashboard/automations", icon: Zap },
  { label: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { label: "Code Editor", href: "/dashboard/code", icon: FileCode },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          "lg:z-40",
          collapsed ? "lg:w-16" : "lg:w-64",
          mobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
            <Image
              src="/velora-logo.svg"
              alt="Velora Nexus"
              width={32}
              height={32}
              className="shrink-0"
            />
            {(!collapsed || mobileOpen) && (
              <Image
                src="/velora-wordmark.svg"
                alt="Velora Nexus"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
            )}
          </Link>
          <button
            onClick={mobileOpen ? onMobileClose : () => setCollapsed(!collapsed)}
            className="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Toggle sidebar"}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <ChevronLeft
                className={cn(
                  "hidden h-4 w-4 transition-transform lg:block",
                  collapsed && "rotate-180"
                )}
              />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              const showLabel = mobileOpen || !collapsed;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onMobileClose}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                    title={!showLabel ? link.label : undefined}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {showLabel && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5",
              !mobileOpen && collapsed && "justify-center"
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-display text-sm text-primary">
              V
            </div>
            {(mobileOpen || !collapsed) && (
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Creator</div>
                <div className="truncate text-xs text-muted-foreground">
                  PRO Plan
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
