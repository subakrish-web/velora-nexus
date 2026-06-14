import { TrendingDown, TrendingUp, UserCheck, UserMinus, UserPlus, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { title: "Active Members", value: "892", change: "+23 this month", changeType: "positive" as const, icon: UserCheck },
  { title: "New Members", value: "47", change: "+18%", changeType: "positive" as const, icon: UserPlus },
  { title: "Churned", value: "12", change: "-8%", changeType: "positive" as const, icon: UserMinus },
  { title: "Churn Rate", value: "2.4%", change: "-0.3%", changeType: "positive" as const, icon: TrendingDown },
];

const members = [
  { name: "Alex Johnson", email: "alex@example.com", plan: "PRO MAX", joined: "Jan 15, 2026", status: "Active", activity: "2h ago" },
  { name: "Sarah Miller", email: "sarah@example.com", plan: "PRO", joined: "Feb 22, 2026", status: "Active", activity: "5h ago" },
  { name: "Mike Chen", email: "mike@example.com", plan: "PRO MAX", joined: "Mar 10, 2026", status: "Active", activity: "1d ago" },
  { name: "Emily Davis", email: "emily@example.com", plan: "GO", joined: "Apr 5, 2026", status: "Active", activity: "3h ago" },
  { name: "James Wilson", email: "james@example.com", plan: "PRO", joined: "Dec 18, 2025", status: "Expiring", activity: "2d ago" },
  { name: "Lisa Anderson", email: "lisa@example.com", plan: "GO", joined: "May 1, 2026", status: "Active", activity: "12h ago" },
];

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Members</h1>
        <p className="text-sm text-muted-foreground">Manage your membership and subscribers</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Member List</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Member</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Joined</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.email} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{m.plan}</span>
                    </td>
                    <td className="py-3 text-muted-foreground">{m.joined}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        m.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{m.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Growth</h3>
            <div className="mt-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
              <span className="text-sm text-muted-foreground">Member Growth Chart</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Churn Analysis</h3>
            <div className="mt-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
              <span className="text-sm text-muted-foreground">Churn Chart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
