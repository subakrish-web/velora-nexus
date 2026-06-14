import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  const session = await auth();
  const userId = (session?.user as Record<string, unknown>)?.id as string | null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // ── Products ──────────────────────────────────────────────
    const products = await Promise.all([
      db.product.upsert({
        where: { id: `demo-product-1-${userId}` },
        create: {
          id: `demo-product-1-${userId}`,
          userId,
          title: "AI Content Blueprint",
          description: "The complete system to build a 6-figure content business using AI agents. Includes templates, workflows, and scripts.",
          price: 97,
          type: "DIGITAL",
          status: "ACTIVE",
          imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400",
        },
        update: {},
      }),
      db.product.upsert({
        where: { id: `demo-product-2-${userId}` },
        create: {
          id: `demo-product-2-${userId}`,
          userId,
          title: "Creator OS Membership",
          description: "Monthly membership with exclusive AI tools, community access, and weekly live coaching calls.",
          price: 29,
          type: "MEMBERSHIP",
          status: "ACTIVE",
        },
        update: {},
      }),
      db.product.upsert({
        where: { id: `demo-product-3-${userId}` },
        create: {
          id: `demo-product-3-${userId}`,
          userId,
          title: "Growth Accelerator Course",
          description: "Self-paced 8-week course teaching how to grow from 0 to 100k subscribers using AI-powered content strategies.",
          price: 297,
          type: "COURSE",
          status: "ACTIVE",
        },
        update: {},
      }),
    ]);

    // ── Orders ────────────────────────────────────────────────
    const orderData = [
      { productId: products[0].id, amount: 97, customer: "alex@creator.io", name: "Alex Johnson" },
      { productId: products[1].id, amount: 29, customer: "maya@studio.co", name: "Maya Patel" },
      { productId: products[2].id, amount: 297, customer: "chris@viral.app", name: "Chris Torres" },
      { productId: products[0].id, amount: 97, customer: "sam@build.xyz", name: "Sam Kim" },
      { productId: products[1].id, amount: 29, customer: "riley@launch.io", name: "Riley Chen" },
    ];

    for (const o of orderData) {
      await db.order.upsert({
        where: { id: `demo-order-${o.customer}-${userId}` },
        create: {
          id: `demo-order-${o.customer}-${userId}`,
          userId,
          productId: o.productId,
          amount: o.amount,
          status: "COMPLETED",
          customerEmail: o.customer,
          customerName: o.name,
        },
        update: {},
      });
    }

    // ── AI Agents ─────────────────────────────────────────────
    const agents = await Promise.all([
      db.aIAgent.upsert({
        where: { id: `demo-agent-1-${userId}` },
        create: {
          id: `demo-agent-1-${userId}`,
          userId,
          name: "Content Multiplier",
          type: "CONTENT_WRITER",
          description: "Turns one idea into 10 pieces of content — blog post, 5 tweets, LinkedIn article, email newsletter, and YouTube script.",
          status: "ACTIVE",
          runsCount: 47,
          config: {
            model: "claude-sonnet-4-6",
            provider: "anthropic",
            outputFormats: ["tweet", "blog", "email", "script"],
            tone: "conversational",
          },
        },
        update: { runsCount: { increment: 1 } },
      }),
      db.aIAgent.upsert({
        where: { id: `demo-agent-2-${userId}` },
        create: {
          id: `demo-agent-2-${userId}`,
          userId,
          name: "Product Launch Agent",
          type: "SALES_ASSISTANT",
          description: "Automates your entire product launch: generates copy, schedules social posts, writes email sequences, and tracks conversions.",
          status: "ACTIVE",
          runsCount: 12,
          config: {
            model: "gpt-4o",
            provider: "openai",
            triggers: ["product_created", "launch_date"],
            emailSequence: 5,
          },
        },
        update: { runsCount: { increment: 1 } },
      }),
      db.aIAgent.upsert({
        where: { id: `demo-agent-3-${userId}` },
        create: {
          id: `demo-agent-3-${userId}`,
          userId,
          name: "SEO Traffic Bot",
          type: "SEO_OPTIMIZER",
          description: "Continuously researches keywords, optimizes existing content, and generates new SEO-focused blog posts on autopilot.",
          status: "INACTIVE",
          runsCount: 8,
          config: {
            model: "gemini-2.0-flash",
            provider: "google",
            targetKeywords: 50,
            postFrequency: "weekly",
          },
        },
        update: {},
      }),
    ]);

    // ── Automations ───────────────────────────────────────────
    await Promise.all([
      db.automation.upsert({
        where: { id: `demo-auto-1-${userId}` },
        create: {
          id: `demo-auto-1-${userId}`,
          userId,
          name: "New Sale → Welcome Sequence",
          trigger: "order.completed",
          status: "ACTIVE",
          runsCount: 34,
          actions: [
            { type: "send_email", template: "welcome", delay: 0 },
            { type: "send_email", template: "getting_started", delay: 86400 },
            { type: "send_email", template: "quick_win", delay: 259200 },
            { type: "add_to_community", platform: "discord", delay: 0 },
          ],
        },
        update: { runsCount: { increment: 1 } },
      }),
      db.automation.upsert({
        where: { id: `demo-auto-2-${userId}` },
        create: {
          id: `demo-auto-2-${userId}`,
          userId,
          name: "Weekly Content Drop",
          trigger: "schedule.weekly",
          status: "ACTIVE",
          runsCount: 12,
          actions: [
            { type: "run_agent", agentId: agents[0].id },
            { type: "post_social", platforms: ["twitter", "linkedin", "instagram"] },
            { type: "send_newsletter", list: "subscribers" },
          ],
        },
        update: { runsCount: { increment: 1 } },
      }),
    ]);

    // ── Analytics ─────────────────────────────────────────────
    const today = new Date();
    const analyticsEntries = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      analyticsEntries.push(
        { userId, metric: "revenue", value: Math.floor(Math.random() * 800) + 200, date },
        { userId, metric: "page_views", value: Math.floor(Math.random() * 5000) + 1000, date },
        { userId, metric: "conversions", value: Math.floor(Math.random() * 20) + 5, date },
        { userId, metric: "ai_runs", value: Math.floor(Math.random() * 50) + 10, date }
      );
    }

    // Delete old demo analytics and re-seed fresh
    await db.analytics.deleteMany({
      where: { userId, metric: { in: ["revenue", "page_views", "conversions", "ai_runs"] } },
    });
    await db.analytics.createMany({ data: analyticsEntries });

    return NextResponse.json({
      success: true,
      seeded: {
        products: products.length,
        orders: orderData.length,
        agents: agents.length,
        automations: 2,
        analyticsDays: 7,
      },
    });
  } catch (error) {
    console.error("[demo-seed]", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
