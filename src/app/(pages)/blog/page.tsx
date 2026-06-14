import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    slug: "ai-agents-for-creators",
    title: "How AI Agents Are Changing the Creator Economy in 2026",
    excerpt: "The creator economy is evolving fast. Here's how AI agents are helping creators build scalable businesses without burning out.",
    category: "AI & Automation",
    date: "Jun 12, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "build-digital-products",
    title: "The Complete Guide to Building Digital Products That Sell",
    excerpt: "From ebooks to courses to templates — learn the framework top creators use to build products that generate passive income.",
    category: "Products",
    date: "Jun 10, 2026",
    readTime: "12 min read",
    featured: true,
  },
  {
    slug: "email-marketing-creators",
    title: "Email Marketing for Creators: 5 Sequences That Convert",
    excerpt: "Your email list is your most valuable asset. Here are the five automated sequences every creator needs.",
    category: "Marketing",
    date: "Jun 8, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "pricing-digital-products",
    title: "How to Price Your Digital Products (Without Undercharging)",
    excerpt: "Most creators undercharge by 40%. Learn the psychology-backed pricing strategies that top creators use.",
    category: "Revenue",
    date: "Jun 5, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "grow-tiktok-2026",
    title: "Growing on TikTok in 2026: What Actually Works",
    excerpt: "The algorithm changed again. Here's what's working now for creators who want to grow fast on TikTok.",
    category: "Social Growth",
    date: "Jun 3, 2026",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "membership-business",
    title: "Why Every Creator Should Build a Membership Business",
    excerpt: "Recurring revenue is the holy grail. Learn how to launch a membership that retains 95%+ of subscribers.",
    category: "Memberships",
    date: "May 30, 2026",
    readTime: "10 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const recent = posts.filter((p) => !p.featured);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl">
            The Velora <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Strategies, insights, and guides to help you build a thriving creator business.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-xl">Featured</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <h3 className="mt-4 font-display text-xl transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-xl">Recent Posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30"
              >
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <h3 className="mt-3 font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                  Read more <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
