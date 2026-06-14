import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { code?: string; next?: string };
}) {
  const { code, next } = await searchParams;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  redirect(next ?? "/");
}
