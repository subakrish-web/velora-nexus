import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "30d";

  const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };
  const days = daysMap[period] || 30;
  const since = new Date(Date.now() - days * 86400000);

  const [revenue, orders, products, analytics] = await Promise.all([
    db.order.aggregate({
      where: { userId: session.user.id, status: "COMPLETED", createdAt: { gte: since } },
      _sum: { amount: true },
      _count: true,
    }),
    db.order.findMany({
      where: { userId: session.user.id, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { product: { select: { title: true } } },
    }),
    db.product.count({ where: { userId: session.user.id, status: "ACTIVE" } }),
    db.analytics.findMany({
      where: { userId: session.user.id, date: { gte: since } },
      orderBy: { date: "asc" },
    }),
  ]);

  return NextResponse.json({
    totalRevenue: revenue._sum.amount || 0,
    totalOrders: revenue._count,
    activeProducts: products,
    recentOrders: orders,
    chartData: analytics,
  });
}
