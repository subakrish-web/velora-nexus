import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Velora Nexus — Create Content. Velora Builds The Business.",
  description:
    "AI-powered Creator Business Operating System. Build products, sell products, grow audience, manage memberships, automate marketing, and increase revenue.",
  icons: {
    icon: "/velora-logo.svg",
    apple: "/velora-logo.svg",
  },
  openGraph: {
    title: "Velora Nexus",
    description: "AI-powered Creator Business Operating System",
    images: ["/velora-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
