"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [magicLink, setMagicLink] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const supabase = createClient();

      if (magicLink) {
        const { error } = await supabase.auth.signInWithOtp({ email: data.email });
        if (error) throw error;
        setMagicSent(true);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      toast.success("Welcome back! 🙏");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-white/15 shadow-md transition-transform group-hover:scale-105 p-1.5">
              <img src="/logo.png" alt="Agape International Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-accent text-3xl text-sacred tracking-wider uppercase">Agape International</span>
          </Link>
          <p className="font-body text-fog text-sm mt-2">Welcome back. We&apos;re glad you&apos;re here.</p>
        </div>

        <div className="glass-strong rounded-3xl p-8">
          <h1 className="font-heading text-2xl font-bold text-ivory mb-6 text-center">Sign In</h1>

          {magicSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-sacred/20 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-sacred" />
              </div>
              <h2 className="font-heading text-xl font-bold text-ivory mb-2">Check your email</h2>
              <p className="font-body text-fog">We sent a magic link to <span className="text-ivory">{watch("email")}</span>. Click it to sign in instantly.</p>
              <button onClick={() => setMagicSent(false)} className="font-body text-sm text-sacred hover:text-sacred-light mt-4 transition-colors">
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                  <input {...register("email")} type="email" placeholder="you@example.com" autoComplete="email" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signin-email" />
                </div>
                {errors.email && <p className="text-ember text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              {!magicLink && (
                <div>
                  <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                    <input {...register("password")} type={showPass ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signin-password" />
                    <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fog/50 hover:text-fog transition-colors" aria-label={showPass ? "Hide password" : "Show password"}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-ember text-xs mt-1">{errors.password.message}</p>}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" id="signin-submit">
                {magicLink ? "Send Magic Link" : "Sign In"}
              </Button>

              <GoldDivider label="or" />

              <button type="button" onClick={() => setMagicLink((v) => !v)} className="w-full py-3 rounded-xl border border-white/10 text-fog font-label text-sm hover:text-ivory hover:border-white/20 transition-colors">
                {magicLink ? "Use password instead" : "Sign in with Magic Link"}
              </button>
            </form>
          )}

          <p className="font-body text-center text-fog text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-sacred hover:text-sacred-light transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
