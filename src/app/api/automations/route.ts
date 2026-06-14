import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const automationSchema = z.object({
  name: z.string().min(1).max(200),
  trigger: z.string().min(1),
  actions: z.array(z.record(z.string(), z.unknown())),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const automations = await db.automation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(automations);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = automationSchema.parse(body);

    const automation = await db.automation.create({
      data: {
        name: data.name,
        trigger: data.trigger,
        actions: data.actions as object,
        userId: session.user.id,
      },
    });

    return NextResponse.json(automation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
