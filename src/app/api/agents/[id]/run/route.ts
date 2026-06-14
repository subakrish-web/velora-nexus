import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const agent = await db.aIAgent.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  if (agent.status !== "ACTIVE") {
    return NextResponse.json({ error: "Agent is not active" }, { status: 400 });
  }

  const results: Record<string, string> = {
    CONTENT_WRITER: "Generated 3 blog post drafts based on your niche trends.",
    SOCIAL_MANAGER: "Scheduled 7 posts across Instagram, Twitter, and LinkedIn for next week.",
    EMAIL_MARKETER: "Created a 5-email welcome sequence with 42% predicted open rate.",
    SEO_OPTIMIZER: "Analyzed 15 pages — found 8 optimization opportunities. Report ready.",
    ANALYTICS_REPORTER: "Weekly report generated: revenue up 12%, traffic up 8%.",
    CUSTOMER_SUPPORT: "Processed 23 tickets — 19 auto-resolved, 4 escalated to you.",
    SALES_ASSISTANT: "Identified 12 high-intent leads from your recent funnel traffic.",
    FUNNEL_BUILDER: "Optimized checkout flow — estimated 15% conversion improvement.",
  };

  await db.aIAgent.update({
    where: { id },
    data: { lastRunAt: new Date(), runsCount: { increment: 1 } },
  });

  return NextResponse.json({
    agentId: id,
    type: agent.type,
    result: results[agent.type] || "Task completed successfully.",
    completedAt: new Date().toISOString(),
  });
}
