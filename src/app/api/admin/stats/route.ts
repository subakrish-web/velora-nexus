import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [totalUsers, totalOrders, totalRevenue, totalProducts, activeSubscriptions, recentUsers] =
    await Promise.all([
      db.user.count(),
      db.order.count(),
      db.order.aggregate({ where: { status: "COMPLETED" }, _sum: { amount: true } }),
      db.product.count({ where: { status: "ACTIVE" } }),
      db.subscription.count({ where: { status: "ACTIVE" } }),
      db.user.findMany({ orderBy: { createdAt: "desc" }, take: 10, select: { id: true, name: true, email: true, plan: true, createdAt: true } }),
    ]);

  return NextResponse.json({
    totalUsers,
    totalOrders,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalProducts,
    activeSubscriptions,
    recentUsers,
  });
}
