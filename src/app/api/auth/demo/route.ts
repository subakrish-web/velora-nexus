import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";

const DEMO_EMAIL = "demo@velora.app";
const DEMO_PASSWORD = "VeloraDemo2024!";
const DEMO_NAME = "Demo User";

export async function POST() {
  try {
    // Upsert demo user (create if not exists, skip if already there)
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    await db.user.upsert({
      where: { email: DEMO_EMAIL },
      create: {
        email: DEMO_EMAIL,
        name: DEMO_NAME,
        hashedPassword,
        plan: "PRO",
      },
      update: {},
    });

    // Sign in using credentials provider
    await signIn("credentials", {
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      redirect: false,
    });

    return NextResponse.json({ success: true, redirectTo: "/dashboard" });
  } catch (error) {
    console.error("[demo-login]", error);
    return NextResponse.json(
      { error: "Demo login failed. Please try again." },
      { status: 500 }
    );
  }
}
