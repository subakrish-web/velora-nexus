import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId && plan) {
        const planEnum = plan.toUpperCase().replace(" ", "_") as "GO" | "PRO" | "PRO_MAX" | "AGENCY";
        await db.user.update({
          where: { id: userId },
          data: { plan: planEnum },
        });

        await db.subscription.create({
          data: {
            userId,
            stripeSubscriptionId: session.subscription as string,
            plan: planEnum,
            status: "ACTIVE",
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
          },
        });
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as Record<string, unknown>).subscription as string;
      if (subId) {
        await db.subscription.updateMany({
          where: { stripeSubscriptionId: subId },
          data: {
            status: "ACTIVE",
            currentPeriodStart: new Date(invoice.period_start * 1000),
            currentPeriodEnd: new Date(invoice.period_end * 1000),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await db.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { status: "CANCELED" },
      });
      const dbSub = await db.subscription.findFirst({
        where: { stripeSubscriptionId: sub.id },
      });
      if (dbSub) {
        await db.user.update({
          where: { id: dbSub.userId },
          data: { plan: "FREE" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
