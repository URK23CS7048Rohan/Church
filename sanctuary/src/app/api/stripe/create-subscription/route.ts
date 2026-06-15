import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount_cents, fund, frequency, user_id, email } = body;

    if (!user_id || !email) {
      return NextResponse.json({ error: "Authentication required for recurring donations" }, { status: 401 });
    }

    // Create or retrieve Stripe customer
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    let customer = existingCustomers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: user_id },
      });
    }

    // Create a price for this recurring amount
    const intervalMap: Record<string, "week" | "month"> = {
      weekly: "week",
      monthly: "month",
    };

    const price = await stripe.prices.create({
      unit_amount: amount_cents,
      currency: "usd",
      recurring: { interval: intervalMap[frequency] ?? "month" },
      product_data: {
        name: `Agape International — ${fund} (${frequency})`,
      },
    });

    // Create setup intent for subscription
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      metadata: {
        fund,
        user_id,
        frequency,
        price_id: price.id,
        amount_cents: String(amount_cents),
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      priceId: price.id,
    });
  } catch (err: unknown) {
    console.error("[stripe/create-subscription]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
