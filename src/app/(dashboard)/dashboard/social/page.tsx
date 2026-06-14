import { ExternalLink, Plus, TrendingUp, Users, Eye, Heart } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Total Followers", value: "245K", change: "+3.2K this month", changeType: "positive" as const, icon: Users },
  { title: "Total Reach", value: "1.2M", change: "+18%", changeType: "positive" as const, icon: Eye },
  { title: "Engagement Rate", value: "4.8%", change: "+0.6%", changeType: "positive" as const, icon: Heart },
  { title: "Growth Rate", value: "+2.1%", change: "weekly avg", changeType: "positive" as const, icon: TrendingUp },
];

const platforms = [
  { name: "YouTube", handle: "@velora", followers: "82K", growth: "+1.2K", engagement: "5.2%", status: "Connected", color: "bg-red-500/10 text-red-400" },
  { name: "Instagram", handle: "@velora.co", followers: "64K", growth: "+890", engagement: "4.8%", status: "Connected", color: "bg-pink-500/10 text-pink-400" },
  { name: "TikTok", handle: "@velora", followers: "45K", growth: "+2.1K", engagement: "7.2%", status: "Connected", color: "bg-cyan-500/10 text-cyan-400" },
  { name: "LinkedIn", handle: "Velora", followers: "28K", growth: "+340", engagement: "3.1%", status: "Connected", color: "bg-blue-500/10 text-blue-400" },
  { name: "X", handle: "@velora_hq", followers: "19K", growth: "+210", engagement: "2.4%", status: "Connected", color: "bg-gray-500/10 text-gray-400" },
  { name: "Facebook", handle: "Velora", followers: "7K", growth: "+45", engagement: "1.8%", status: "Not Connected", color: "bg-blue-600/10 text-blue-300" },
  { name: "Telegram", handle: "@velora_community", followers: "—", growth: "—", engagement: "—", status: "Not Connected", color: "bg-sky-500/10 text-sky-400" },
];

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Social Media</h1>
          <p className="text-sm text-muted-foreground">Track your social presence and growth</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" />
          Connect Account
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <div key={p.name} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${p.color}`}>
                  <span className="text-sm font-bold">{p.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.handle}</div>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                p.status === "Connected" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              }`}>
                {p.status}
              </span>
            </div>
            {p.status === "Connected" ? (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-lg font-bold">{p.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-success">{p.growth}</div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{p.engagement}</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  Connect {p.name}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Content Performance</h3>
        <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
          <span className="text-sm text-muted-foreground">Cross-Platform Content Performance Chart</span>
        </div>
      </div>
    </div>
  );
}
