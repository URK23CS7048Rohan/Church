import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createAdminClient();

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await supabase
          .from("donations")
          .update({ status: "succeeded" })
          .eq("stripe_payment_intent_id", pi.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await supabase
          .from("donations")
          .update({ status: "failed" })
          .eq("stripe_payment_intent_id", pi.id);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        const subscriptionId = typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription?.id;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const meta = subscription.metadata;

          await supabase.from("donations").insert({
            user_id: meta.user_id,
            amount_cents: invoice.amount_paid,
            fund: meta.fund ?? "offering",
            frequency: meta.frequency ?? "monthly",
            stripe_subscription_id: subscriptionId,
            status: "succeeded",
          });
        }
        break;
      }

      case "setup_intent.succeeded": {
        const si = event.data.object as Stripe.SetupIntent;
        const meta = si.metadata;

        if (meta?.price_id && meta?.user_id) {
          await stripe.subscriptions.create({
            customer: si.customer as string,
            items: [{ price: meta.price_id }],
            default_payment_method: si.payment_method as string,
            metadata: {
              user_id: meta.user_id,
              fund: meta.fund,
              frequency: meta.frequency,
            },
          });
        }
        break;
      }

      default:
        console.log(`[webhook] Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("[webhook] Error processing event", err);
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
