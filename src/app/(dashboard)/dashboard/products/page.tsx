import { Archive, Copy, Edit, Package, Plus } from "lucide-react";

const products = [
  { id: 1, name: "Ultimate SEO Guide", type: "Ebook", price: "$49", sales: 342, status: "Active" },
  { id: 2, name: "AI Prompt Pack", type: "Digital Download", price: "$29", sales: 289, status: "Active" },
  { id: 3, name: "Creator Masterclass", type: "Course", price: "$199", sales: 156, status: "Active" },
  { id: 4, name: "Notion Creator Kit", type: "Template", price: "$19", sales: 534, status: "Active" },
  { id: 5, name: "Brand Strategy Guide", type: "Ebook", price: "$79", sales: 98, status: "Draft" },
  { id: 6, name: "Social Media Calendar", type: "Template", price: "$15", sales: 421, status: "Active" },
  { id: 7, name: "Email Marketing Course", type: "Course", price: "$149", sales: 87, status: "Active" },
  { id: 8, name: "Creator Community", type: "Membership", price: "$29/mo", sales: 234, status: "Active" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your digital products</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" />
          Create Product
        </button>
      </div>

      <div className="flex gap-2">
        {["All", "Ebooks", "Courses", "Templates", "Memberships", "Downloads"].map((tab) => (
          <button
            key={tab}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              tab === "All"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Sales</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.type}</td>
                  <td className="p-4 font-medium">{product.price}</td>
                  <td className="p-4">{product.sales}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      product.status === "Active"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Duplicate">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Archive">
                        <Archive className="h-4 w-4" />
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
