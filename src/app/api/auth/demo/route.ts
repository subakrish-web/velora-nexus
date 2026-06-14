import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const DEMO_EMAIL = "demo@velora.app";
export const DEMO_PASSWORD = "VeloraDemo2024!";

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    // Upsert demo user — idempotent, safe to call multiple times
    await db.user.upsert({
      where: { email: DEMO_EMAIL },
      create: {
        email: DEMO_EMAIL,
        name: "Demo Creator",
        hashedPassword,
        plan: "PRO",
        role: "CREATOR",
      },
      update: {
        // Ensure password is always valid even if changed externally
        hashedPassword,
        plan: "PRO",
      },
    });

    // Return credentials so the client calls signIn("credentials", ...) itself.
    // We cannot call signIn() inside a Route Handler in NextAuth v5 —
    // that function is only valid inside Server Actions or during request handling.
    return NextResponse.json({
      success: true,
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
  } catch (error) {
    console.error("[demo-setup]", error);
    return NextResponse.json(
      { error: "Demo setup failed. Please try again." },
      { status: 500 }
    );
  }
}
