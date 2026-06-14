"use client";

import { useState } from "react";
import {
  LayoutTemplate,
  Search,
  Star,
  Download,
  ExternalLink,
  Palette,
  Video,
  FileText,
  Mail,
  Instagram,
  ShoppingBag,
  Presentation,
  Filter,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Templates", icon: LayoutTemplate },
  { id: "social", label: "Social Media", icon: Instagram },
  { id: "video", label: "Video", icon: Video },
  { id: "email", label: "Email", icon: Mail },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "presentation", label: "Presentation", icon: Presentation },
  { id: "document", label: "Document", icon: FileText },
];

const TEMPLATES = [
  {
    id: 1,
    name: "Product Launch Post",
    category: "social",
    tags: ["Instagram", "TikTok"],
    rating: 4.9,
    uses: 2840,
    preview: "bg-gradient-to-br from-amber-500 to-orange-600",
    emoji: "🚀",
    description: "Eye-catching product announcement with bold typography and brand colors.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 2,
    name: "UGC Story Template",
    category: "video",
    tags: ["Reels", "Stories"],
    rating: 4.8,
    uses: 1920,
    preview: "bg-gradient-to-br from-purple-600 to-pink-600",
    emoji: "🎬",
    description: "Vertical video template optimized for Instagram Reels and TikTok.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 3,
    name: "Welcome Email Series",
    category: "email",
    tags: ["Onboarding", "Nurture"],
    rating: 4.7,
    uses: 3100,
    preview: "bg-gradient-to-br from-blue-600 to-cyan-500",
    emoji: "💌",
    description: "5-email welcome sequence to convert new subscribers into customers.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 4,
    name: "Product Unboxing",
    category: "video",
    tags: ["YouTube", "TikTok"],
    rating: 4.9,
    uses: 987,
    preview: "bg-gradient-to-br from-green-500 to-emerald-600",
    emoji: "📦",
    description: "Professional unboxing video script and visual overlay template.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 5,
    name: "Digital Product Listing",
    category: "ecommerce",
    tags: ["Shopify", "Gumroad"],
    rating: 4.6,
    uses: 4200,
    preview: "bg-gradient-to-br from-rose-500 to-red-600",
    emoji: "🛍️",
    description: "Clean product page layout with social proof and CTA sections.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 6,
    name: "Creator Pitch Deck",
    category: "presentation",
    tags: ["Sponsors", "Partnerships"],
    rating: 4.8,
    uses: 760,
    preview: "bg-gradient-to-br from-yellow-500 to-amber-600",
    emoji: "📊",
    description: "12-slide deck to pitch brand partnerships and sponsorships.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 7,
    name: "Tutorial Series",
    category: "video",
    tags: ["YouTube", "Course"],
    rating: 4.7,
    uses: 1540,
    preview: "bg-gradient-to-br from-indigo-600 to-violet-600",
    emoji: "🎓",
    description: "Educational video template with chapters and animated text overlays.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 8,
    name: "Newsletter Template",
    category: "email",
    tags: ["Weekly", "Newsletter"],
    rating: 4.5,
    uses: 2300,
    preview: "bg-gradient-to-br from-teal-500 to-cyan-600",
    emoji: "📰",
    description: "Curated newsletter layout with sections for tips, links, and products.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 9,
    name: "Brand Style Guide",
    category: "document",
    tags: ["Branding", "Design"],
    rating: 4.9,
    uses: 890,
    preview: "bg-gradient-to-br from-pink-500 to-rose-600",
    emoji: "🎨",
    description: "Complete brand guide with colors, fonts, logo usage, and tone of voice.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 10,
    name: "Flash Sale Announcement",
    category: "social",
    tags: ["Instagram", "Facebook"],
    rating: 4.6,
    uses: 3780,
    preview: "bg-gradient-to-br from-orange-500 to-red-500",
    emoji: "⚡",
    description: "High-urgency sale post with countdown and discount callouts.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 11,
    name: "Testimonial Carousel",
    category: "social",
    tags: ["Instagram", "LinkedIn"],
    rating: 4.7,
    uses: 2100,
    preview: "bg-gradient-to-br from-sky-500 to-blue-600",
    emoji: "⭐",
    description: "Showcase customer reviews and social proof in a swipeable format.",
    canvaUrl: "https://www.canva.com/design/new",
  },
  {
    id: 12,
    name: "Course Landing Page",
    category: "ecommerce",
    tags: ["Online Course", "Webinar"],
    rating: 4.8,
    uses: 1670,
    preview: "bg-gradient-to-br from-violet-500 to-purple-600",
    emoji: "💡",
    description: "High-converting course sales page with curriculum, instructor bio, and pricing.",
    canvaUrl: "https://www.canva.com/design/new",
  },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl">Templates</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ready-to-use content templates. Open in Canva, customize, and publish.
          </p>
        </div>
        <a
          href="https://www.canva.com/create"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Palette className="h-4 w-4" />
          Open Canva
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-secondary pl-9 pr-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{filtered.length} templates</span>
        <span>·</span>
        <span>Updated weekly</span>
        <span>·</span>
        <span className="text-primary">Canva Pro not required</span>
      </div>

      {/* Template grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
          >
            {/* Preview */}
            <div className={`relative flex h-36 items-center justify-center ${template.preview}`}>
              <span className="text-5xl">{template.emoji}</span>
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-tight">{template.name}</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {template.description}
              </p>

              {/* Tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats + Actions */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {template.rating}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Download className="h-3 w-3" />
                    {template.uses.toLocaleString()}
                  </span>
                </div>
                <a
                  href={template.canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Use
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <LayoutTemplate className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No templates match your search.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("all"); }}
            className="cursor-pointer text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
