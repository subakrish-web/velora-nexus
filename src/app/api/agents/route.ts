import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const agentSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum([
    "CONTENT_WRITER",
    "SOCIAL_MANAGER",
    "EMAIL_MARKETER",
    "SEO_OPTIMIZER",
    "ANALYTICS_REPORTER",
    "CUSTOMER_SUPPORT",
    "SALES_ASSISTANT",
    "FUNNEL_BUILDER",
  ]),
  description: z.string().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agents = await db.aIAgent.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(agents);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = agentSchema.parse(body);

    const { config, ...rest } = data;
    const agent = await db.aIAgent.create({
      data: {
        ...rest,
        userId: session.user.id,
        ...(config !== undefined && { config: config as object }),
      },
    });

    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
