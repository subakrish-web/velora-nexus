import {
  ArrowUpRight,
  Bot,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  {
    title: "Revenue Today",
    value: "$1,284",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Revenue This Month",
    value: "$24,563",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Total Sales",
    value: "1,429",
    change: "+23",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Active Subscribers",
    value: "892",
    change: "+5.1%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "New Customers",
    value: "47",
    change: "+18%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.4%",
    changeType: "positive" as const,
    icon: ArrowUpRight,
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Alex Johnson", product: "Ultimate SEO Guide", amount: "$49", status: "Completed" },
  { id: "ORD-002", customer: "Sarah Miller", product: "AI Prompt Pack", amount: "$29", status: "Completed" },
  { id: "ORD-003", customer: "Mike Chen", product: "Creator Course", amount: "$199", status: "Processing" },
  { id: "ORD-004", customer: "Emily Davis", product: "Notion Templates", amount: "$19", status: "Completed" },
  { id: "ORD-005", customer: "James Wilson", product: "Brand Kit", amount: "$79", status: "Completed" },
];

const topProducts = [
  { name: "Ultimate SEO Guide", sales: 342, revenue: "$16,758" },
  { name: "AI Prompt Pack", sales: 289, revenue: "$8,381" },
  { name: "Creator Course", sales: 156, revenue: "$31,044" },
  { name: "Notion Templates", sales: 534, revenue: "$10,146" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s your business overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart Placeholder */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Daily revenue for this month</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <span className="text-sm text-muted-foreground">Revenue Chart</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Top Selling Products</h3>
          <p className="text-sm text-muted-foreground">Best performers this month</p>
          <div className="mt-6 space-y-4">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                  </div>
                </div>
                <span className="text-sm font-semibold">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Recent Orders</h3>
        <p className="text-sm text-muted-foreground">Latest transactions</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-mono text-xs">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 text-muted-foreground">{order.product}</td>
                  <td className="py-3 font-medium">{order.amount}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}>
                      {order.status}
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
