import { Download, Eye, Filter, Search } from "lucide-react";

const orders = [
  { id: "ORD-2401", customer: "Alex Johnson", email: "alex@example.com", product: "Ultimate SEO Guide", amount: "$49", date: "2026-06-14", status: "Completed", payment: "Paid" },
  { id: "ORD-2402", customer: "Sarah Miller", email: "sarah@example.com", product: "AI Prompt Pack", amount: "$29", date: "2026-06-14", status: "Completed", payment: "Paid" },
  { id: "ORD-2403", customer: "Mike Chen", email: "mike@example.com", product: "Creator Masterclass", amount: "$199", date: "2026-06-13", status: "Processing", payment: "Pending" },
  { id: "ORD-2404", customer: "Emily Davis", email: "emily@example.com", product: "Notion Creator Kit", amount: "$19", date: "2026-06-13", status: "Completed", payment: "Paid" },
  { id: "ORD-2405", customer: "James Wilson", email: "james@example.com", product: "Brand Strategy Guide", amount: "$79", date: "2026-06-12", status: "Refunded", payment: "Refunded" },
  { id: "ORD-2406", customer: "Lisa Anderson", email: "lisa@example.com", product: "Social Media Calendar", amount: "$15", date: "2026-06-12", status: "Completed", payment: "Paid" },
  { id: "ORD-2407", customer: "David Brown", email: "david@example.com", product: "Email Marketing Course", amount: "$149", date: "2026-06-11", status: "Completed", payment: "Paid" },
  { id: "ORD-2408", customer: "Anna Lee", email: "anna@example.com", product: "Creator Community", amount: "$29", date: "2026-06-11", status: "Completed", payment: "Paid" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage customer orders and transactions</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-lg border border-input bg-secondary pl-9 pr-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="p-4 font-mono text-xs">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{order.product}</td>
                  <td className="p-4 font-medium">{order.amount}</td>
                  <td className="p-4 text-muted-foreground">{order.date}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.status === "Completed" ? "bg-success/10 text-success" :
                      order.status === "Processing" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.payment === "Paid" ? "bg-success/10 text-success" :
                      order.payment === "Pending" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Invoice">
                        <Download className="h-4 w-4" />
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
