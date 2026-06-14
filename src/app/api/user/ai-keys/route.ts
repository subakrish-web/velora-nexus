import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const saveKeySchema = z.object({
  provider: z.string().min(1),
  apiKey: z.string().min(1),
  model: z.string().optional(),
});

const preferenceSchema = z.object({
  preferredProvider: z.string().min(1),
  preferredModel: z.string().min(1),
});

// Raw type cast for fields added via schema migration not yet generated
type AiUserFields = {
  preferredAiProvider: string | null;
  preferredAiModel: string | null;
  trialCredits: number;
  trialCreditsUsed: number;
  aiApiKeys: Record<string, string> | null;
};

async function getUserId(): Promise<string | null> {
  const session = await auth();
  return (session?.user as Record<string, unknown>)?.id as string | null ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (db.user as any).findUnique({
    where: { id: userId },
    select: {
      preferredAiProvider: true,
      preferredAiModel: true,
      trialCredits: true,
      trialCreditsUsed: true,
      aiApiKeys: true,
    },
  }) as AiUserFields | null;

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const keys = user.aiApiKeys ?? {};
  const connectedProviders = Object.keys(keys).filter(k => keys[k]);

  return NextResponse.json({
    preferredAiProvider: user.preferredAiProvider ?? "groq",
    preferredAiModel: user.preferredAiModel ?? "llama-3.1-8b-instant",
    trialCredits: user.trialCredits ?? 50,
    trialCreditsUsed: user.trialCreditsUsed ?? 0,
    connectedProviders,
  });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = saveKeySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { provider, apiKey, model } = parsed.data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (db.user as any).findUnique({
    where: { id: userId },
    select: { aiApiKeys: true },
  }) as { aiApiKeys: Record<string, string> | null } | null;

  const existingKeys = user?.aiApiKeys ?? {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db.user as any).update({
    where: { id: userId },
    data: {
      aiApiKeys: { ...existingKeys, [provider]: apiKey },
      ...(model ? { preferredAiModel: model, preferredAiProvider: provider } : {}),
    },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = preferenceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db.user as any).update({
    where: { id: userId },
    data: {
      preferredAiProvider: parsed.data.preferredProvider,
      preferredAiModel: parsed.data.preferredModel,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { provider } = await req.json();
  if (!provider) return NextResponse.json({ error: "Provider required" }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (db.user as any).findUnique({
    where: { id: userId },
    select: { aiApiKeys: true },
  }) as { aiApiKeys: Record<string, string> | null } | null;

  const existingKeys = { ...(user?.aiApiKeys ?? {}) };
  delete existingKeys[provider];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db.user as any).update({
    where: { id: userId },
    data: { aiApiKeys: existingKeys },
  });

  return NextResponse.json({ success: true });
}
