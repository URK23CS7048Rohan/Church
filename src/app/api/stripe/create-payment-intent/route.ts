import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount_cents, fund, frequency, user_id } = body;

    if (!amount_cents || amount_cents < 100) {
      return NextResponse.json({ error: "Minimum donation is $1" }, { status: 400 });
    }

    const supabase = await createClient();

    if (frequency === "one_time") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount_cents,
        currency: "usd",
        metadata: { fund, user_id: user_id ?? "guest", frequency },
        description: `Agape International — ${fund} (one-time)`,
      });

      // Pre-create donation record
      if (user_id) {
        await supabase.from("donations").insert({
          user_id,
          amount_cents,
          fund,
          frequency,
          stripe_payment_intent_id: paymentIntent.id,
          status: "pending",
        });
      }

      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }

    return NextResponse.json({ error: "For recurring donations, use /api/stripe/create-subscription" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[stripe/create-payment-intent]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
