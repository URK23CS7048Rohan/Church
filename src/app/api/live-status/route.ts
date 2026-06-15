import { NextResponse } from "next/server";
import { getLiveStreamStatus } from "@/lib/youtube";

export async function GET() {
  const status = await getLiveStreamStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" },
  });
}
