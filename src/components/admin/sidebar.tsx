"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  ChevronLeft,
  CreditCard,
  Home,
  Shield,
  Users,
  X,
} from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Revenue", href: "/admin/revenue", icon: BarChart3 },
  { label: "AI Analytics", href: "/admin/ai", icon: Bot },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Security", href: "/admin/security", icon: Shield },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
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
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive">
              <span className="font-display text-sm text-white">V</span>
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <span className="font-display text-lg">Velora</span>
                <span className="ml-1 text-xs text-destructive">ADMIN</span>
              </div>
            )}
          </Link>
          <button
            onClick={mobileOpen ? onMobileClose : () => setCollapsed(!collapsed)}
            className="cursor-pointer rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Toggle sidebar"}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <ChevronLeft className={cn("hidden h-4 w-4 transition-transform lg:block", collapsed && "rotate-180")} />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              const showLabel = mobileOpen || !collapsed;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onMobileClose}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                      isActive
                        ? "bg-destructive/10 text-destructive font-medium"
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
          <div className={cn("flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5", !mobileOpen && collapsed && "justify-center")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/20 font-display text-sm text-destructive">
              A
            </div>
            {(mobileOpen || !collapsed) && (
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Admin</div>
                <div className="truncate text-xs text-muted-foreground">Platform Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
