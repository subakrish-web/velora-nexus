import { Ban, Eye, MoreHorizontal, Search, Trash2, ArrowUpCircle } from "lucide-react";

const users = [
  { id: 1, name: "Alex Johnson", email: "alex@creator.io", plan: "PRO MAX", status: "Active", joined: "Jan 15, 2026", revenue: "$2,340" },
  { id: 2, name: "Sarah Miller", email: "sarah@youtube.com", plan: "PRO", status: "Active", joined: "Feb 22, 2026", revenue: "$1,890" },
  { id: 3, name: "Mike Chen", email: "mike@tiktok.com", plan: "AGENCY", status: "Active", joined: "Mar 10, 2026", revenue: "$8,920" },
  { id: 4, name: "Emily Davis", email: "emily@ig.com", plan: "GO", status: "Active", joined: "Apr 5, 2026", revenue: "$342" },
  { id: 5, name: "James Wilson", email: "james@linkedin.com", plan: "PRO", status: "Suspended", joined: "Dec 18, 2025", revenue: "$1,120" },
  { id: 6, name: "Lisa Anderson", email: "lisa@creator.co", plan: "PRO MAX", status: "Active", joined: "May 1, 2026", revenue: "$3,450" },
  { id: 7, name: "David Brown", email: "david@agency.io", plan: "AGENCY", status: "Active", joined: "Jan 8, 2026", revenue: "$12,340" },
  { id: 8, name: "Anna Lee", email: "anna@content.com", plan: "GO", status: "Active", joined: "Jun 1, 2026", revenue: "$89" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground">Search, manage, and monitor platform users</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full rounded-lg border border-input bg-secondary pl-9 pr-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        {["All", "Active", "Suspended", "GO", "PRO", "PRO MAX", "AGENCY"].map((filter) => (
          <button
            key={filter}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              filter === "All" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Revenue</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{user.plan}</span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{user.joined}</td>
                  <td className="p-4 font-medium">{user.revenue}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" title="View" aria-label="View user">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" title="Upgrade" aria-label="Upgrade plan">
                        <ArrowUpCircle className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" title="Suspend" aria-label="Suspend user">
                        <Ban className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
