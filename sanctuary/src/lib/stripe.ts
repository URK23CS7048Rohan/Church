import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
});

export const STRIPE_FUNDS = {
  tithe: "price_tithe",
  offering: "price_offering",
  missions: "price_missions",
  building: "price_building",
} as const;
