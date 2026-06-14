import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
});

export const PLANS = {
  GO: {
    name: "GO",
    price: 1900,
    priceId: process.env.STRIPE_GO_PRICE_ID || "price_go",
    features: [
      "1 Digital Storefront",
      "3 AI Agent Runs/day",
      "Basic Analytics",
      "Email Support",
      "1,000 Email Sends/mo",
    ],
  },
  PRO: {
    name: "PRO",
    price: 4900,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
    features: [
      "5 Storefronts",
      "Unlimited AI Agents",
      "Advanced Analytics",
      "Priority Support",
      "10,000 Email Sends/mo",
      "Custom Domain",
    ],
  },
  PRO_MAX: {
    name: "PRO MAX",
    price: 9900,
    priceId: process.env.STRIPE_PRO_MAX_PRICE_ID || "price_pro_max",
    features: [
      "Unlimited Storefronts",
      "Unlimited AI Agents",
      "Real-time Analytics",
      "24/7 Support",
      "50,000 Email Sends/mo",
      "Custom Domain",
      "API Access",
      "White-label",
    ],
  },
  AGENCY: {
    name: "AGENCY",
    price: 29900,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || "price_agency",
    features: [
      "Everything in PRO MAX",
      "Multi-team Management",
      "Unlimited Email Sends",
      "Dedicated Account Manager",
      "Custom Integrations",
      "SLA Guarantee",
    ],
  },
} as const;
