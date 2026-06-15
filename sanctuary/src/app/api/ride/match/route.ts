import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { calculateDistance, CHURCH_LOCATION } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const { service_time, pickup_lat, pickup_lng } = body;

    // Query open ride offers for the same service time
    const { data: offers, error } = await supabase
      .from("ride_offers")
      .select("*, driver:profiles(full_name, avatar_url, phone)")
      .eq("service_time", service_time)
      .eq("status", "open")
      .gt("seats_remaining", 0)
      .neq("driver_id", user.id);

    if (error) throw error;

    // Sort by proximity if coordinates provided
    let sortedOffers = offers ?? [];

    if (pickup_lat && pickup_lng) {
      sortedOffers = sortedOffers
        .map((offer) => ({
          ...offer,
          distance_km:
            offer.pickup_lat && offer.pickup_lng
              ? calculateDistance(
                  pickup_lat,
                  pickup_lng,
                  offer.pickup_lat,
                  offer.pickup_lng
                )
              : 999,
        }))
        .sort((a, b) => (a.distance_km ?? 999) - (b.distance_km ?? 999));
    }

    return NextResponse.json({ offers: sortedOffers });
  } catch (err: unknown) {
    console.error("[ride/match]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error matching rides" },
      { status: 500 }
    );
  }
}
