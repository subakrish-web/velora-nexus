import { AdminSidebar } from "@/components/admin/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <div className="lg:pl-64 pl-16">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
