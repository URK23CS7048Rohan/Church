"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  full_name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
}).refine((d) => d.password === d.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.full_name },
        },
      });

      if (error) throw error;
      toast.success("Welcome to Agape International! Check your email to confirm your account. 🙏");
      router.push("/auth/sign-in");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,45,142,0.08) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-white/15 shadow-md transition-transform group-hover:scale-105 p-1.5">
              <img src="/logo.png" alt="Agape International Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-accent text-3xl text-sacred tracking-wider uppercase">Agape International</span>
          </Link>
          <p className="font-body text-fog text-sm mt-2">Join our church family today.</p>
        </div>

        <div className="glass-strong rounded-3xl p-8">
          <h1 className="font-heading text-2xl font-bold text-ivory mb-6 text-center">Create Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                <input {...register("full_name")} placeholder="Your full name" autoComplete="name" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signup-name" />
              </div>
              {errors.full_name && <p className="text-ember text-xs mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                <input {...register("email")} type="email" placeholder="you@example.com" autoComplete="email" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signup-email" />
              </div>
              {errors.email && <p className="text-ember text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                <input {...register("password")} type={showPass ? "text" : "password"} placeholder="Min. 8 characters" autoComplete="new-password" className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signup-password" />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fog/50 hover:text-fog transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-ember text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="font-label text-xs text-fog/70 uppercase tracking-wider block mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog/50" />
                <input {...register("confirm_password")} type={showPass ? "text" : "password"} placeholder="Repeat password" autoComplete="new-password" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="signup-confirm-password" />
              </div>
              {errors.confirm_password && <p className="text-ember text-xs mt-1">{errors.confirm_password.message}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" id="signup-submit">
              Join Agape International
            </Button>

            <p className="font-body text-center text-fog/60 text-xs">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-sacred hover:text-sacred-light">Terms</Link> and{" "}
              <Link href="/privacy" className="text-sacred hover:text-sacred-light">Privacy Policy</Link>.
            </p>
          </form>

          <p className="font-body text-center text-fog text-sm mt-6">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-sacred hover:text-sacred-light transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
