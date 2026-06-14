import { AlertTriangle, Eye, Globe, Key, Monitor, Shield, Smartphone } from "lucide-react";

const loginActivity = [
  { user: "Alex Johnson", ip: "192.168.1.42", device: "Chrome / macOS", location: "San Francisco, US", time: "2 min ago", status: "Success" },
  { user: "Sarah Miller", ip: "10.0.0.15", device: "Safari / iOS", location: "New York, US", time: "15 min ago", status: "Success" },
  { user: "Unknown", ip: "185.220.101.45", device: "Firefox / Linux", location: "Moscow, RU", time: "32 min ago", status: "Failed" },
  { user: "Mike Chen", ip: "172.16.0.8", device: "Chrome / Windows", location: "Toronto, CA", time: "1 hour ago", status: "Success" },
  { user: "Unknown", ip: "91.121.87.12", device: "curl/7.88", location: "Paris, FR", time: "2 hours ago", status: "Blocked" },
  { user: "Emily Davis", ip: "192.168.2.101", device: "Edge / Windows", location: "London, UK", time: "3 hours ago", status: "Success" },
];

const alerts = [
  { type: "warning", title: "3 failed login attempts", description: "From IP 185.220.101.45 targeting multiple accounts", time: "32 min ago" },
  { type: "danger", title: "Suspicious API usage detected", description: "Unusual rate of API calls from user david@agency.io", time: "1 hour ago" },
  { type: "info", title: "New device login", description: "Mike Chen logged in from a new device in Toronto", time: "1 hour ago" },
];

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Dashboard</h1>
        <p className="text-sm text-muted-foreground">Monitor security events and protect the platform</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-success" />
            Security Score
          </div>
          <div className="mt-2 text-2xl font-bold text-success">94/100</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Key className="h-4 w-4 text-primary" />
            MFA Enabled
          </div>
          <div className="mt-2 text-2xl font-bold">67%</div>
          <div className="text-xs text-muted-foreground">of users</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Failed Logins
          </div>
          <div className="mt-2 text-2xl font-bold">23</div>
          <div className="text-xs text-muted-foreground">last 24 hours</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-destructive" />
            Blocked IPs
          </div>
          <div className="mt-2 text-2xl font-bold">7</div>
          <div className="text-xs text-muted-foreground">active blocks</div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Active Alerts</h3>
        <div className="mt-4 space-y-3">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-start gap-3 rounded-lg border p-4 ${
              alert.type === "danger" ? "border-destructive/30 bg-destructive/5" :
              alert.type === "warning" ? "border-warning/30 bg-warning/5" :
              "border-info/30 bg-info/5"
            }`}>
              <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${
                alert.type === "danger" ? "text-destructive" :
                alert.type === "warning" ? "text-warning" : "text-info"
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{alert.title}</div>
                <div className="text-xs text-muted-foreground">{alert.description}</div>
              </div>
              <span className="text-xs text-muted-foreground">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login Activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Login Activity</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">IP Address</th>
                <th className="pb-3 font-medium">Device</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginActivity.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2.5 font-medium">{log.user}</td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{log.ip}</td>
                  <td className="py-2.5 text-muted-foreground">{log.device}</td>
                  <td className="py-2.5 text-muted-foreground">{log.location}</td>
                  <td className="py-2.5 text-muted-foreground">{log.time}</td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      log.status === "Success" ? "bg-success/10 text-success" :
                      log.status === "Failed" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {log.status}
                    </span>
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
