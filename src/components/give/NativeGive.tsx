"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Heart, CreditCard, ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn, formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];
const FUNDS = ["Tithe", "Missions", "Building", "Outreach"];
const FREQUENCIES = ["One-time", "Monthly", "Weekly"];

export function NativeGive() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedFund, setSelectedFund] = useState("Tithe");
  const [selectedFreq, setSelectedFreq] = useState("One-time");
  
  // Checkout flow step: 1 = choose amount/details, 2 = payment, 3 = success
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form details
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    } else {
      setAmount(0);
    }
  };

  const handleNextStep = () => {
    if (amount <= 0) {
      toast.error("Please select or enter an amount");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !cardNumber || !expiry || !cvc) {
      toast.error("Please fill in all payment details");
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500)); // Simulate Stripe/payment API delay
    setIsSubmitting(false);
    setStep(3);
    toast.success("Thank you for your generous gift! ❤️");
  };

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(252,165,165,0.15)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.12)] to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 px-5 pt-12 pb-4 bg-[rgba(8,8,18,0.85)] backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 ? (
              <button 
                onClick={() => setStep((step - 1) as any)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform"
              >
                <ChevronLeft size={20} />
              </button>
            ) : (
              <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
                <ChevronLeft size={20} />
              </Link>
            )}
            <div>
              <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "0.08em", lineHeight: 1 }} className="text-white">
                GIVING
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Support Our Mission
              </span>
            </div>
          </div>
          <Heart size={20} className="text-red-400 animate-pulse" />
        </header>

        <main className="flex-grow px-5 pt-4 pb-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Banner */}
                <div className="rounded-[28px] p-5 relative overflow-hidden bg-gradient-to-br from-red-500/10 to-transparent border border-white/5">
                  <div className="relative z-10 space-y-1.5">
                    <p style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "10px", color: "#FCA5A5", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Generosity
                    </p>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "22px", fontWeight: 700, lineHeight: 1.2, color: "white" }}>
                      "Every man shall give as he is able..."
                    </h2>
                    <p className="text-[10px] text-white/50" style={{ fontFamily: "var(--font-lato)" }}>Deuteronomy 16:17</p>
                  </div>
                </div>

                {/* Presets */}
                <div className="space-y-3">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 font-inter">
                    Select Amount (USD)
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {PRESET_AMOUNTS.map(val => {
                      const isSelected = amount === val && !customAmount;
                      return (
                        <motion.button
                          whileTap={{ scale: 0.93 }}
                          key={val}
                          type="button"
                          onClick={() => handleAmountSelect(val)}
                          className={cn(
                            "py-3.5 rounded-2xl border text-sm font-bold transition-all duration-200",
                            isSelected
                              ? "bg-[#C9A84C] border-[#C9A84C] text-[#080812]"
                              : "bg-white/[0.02] border-white/5 text-white hover:border-white/10"
                          )}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          ${val}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-3">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 font-inter">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-lg font-bold text-white/40">$</span>
                    <input
                      type="number"
                      placeholder="Other Amount"
                      value={customAmount}
                      onChange={e => handleCustomAmountChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-4 py-3 text-base font-bold text-white outline-none focus:border-[#C9A84C]/50"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    />
                  </div>
                </div>

                {/* Fund Selection */}
                <div className="space-y-3">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 font-inter">
                    Designated Fund
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FUNDS.map(fund => {
                      const isSelected = selectedFund === fund;
                      return (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          key={fund}
                          type="button"
                          onClick={() => setSelectedFund(fund)}
                          className={cn(
                            "py-3 rounded-2xl border text-xs font-semibold transition-all",
                            isSelected
                              ? "bg-red-500/10 border-red-500/40 text-red-300"
                              : "bg-white/[0.02] border-white/5 text-fog hover:text-white"
                          )}
                          style={{ fontFamily: "var(--font-raleway)" }}
                        >
                          {fund}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-3">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 font-inter">
                    Giving Frequency
                  </label>
                  <div className="flex gap-2 p-1 rounded-2xl bg-white/5">
                    {FREQUENCIES.map(freq => {
                      const isSelected = selectedFreq === freq;
                      return (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setSelectedFreq(freq)}
                          className={cn(
                            "flex-1 py-2 rounded-xl text-xs font-bold transition-all",
                            isSelected
                              ? "bg-white/10 text-white shadow"
                              : "text-fog hover:text-white"
                          )}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {freq}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-4 rounded-full bg-[#C9A84C] text-[#080812] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    CONTINUE TO PAYMENT <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Summary Card */}
                <div className="rounded-[24px] p-5 bg-[#12121e] border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase text-white/50" style={{ fontFamily: "var(--font-inter)" }}>Your Gift Summary</span>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", fontWeight: 700, color: "white" }}>
                      {selectedFund} Fund
                    </h3>
                    <p className="text-xs text-red-300 font-semibold mt-0.5">{selectedFreq}</p>
                  </div>
                  <div className="text-right">
                    <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "32px", fontWeight: 700, color: "#C9A84C" }}>
                      ${amount}
                    </span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl">
                  <ShieldCheck size={16} className="shrink-0" />
                  <span className="text-[11px] font-semibold font-inter uppercase tracking-wider">Secured 256-bit SSL encrypted connection</span>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-1.5 font-inter">
                      Donor Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-1.5 font-inter">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-1.5 font-inter">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3.5 text-white/30" size={16} />
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-1.5 font-inter">
                        Expiration
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-1.5 font-inter">
                        CVC Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cvc}
                        onChange={e => setCvc(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50 text-center"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-red-400 text-[#080812] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-[#080812] border-t-transparent animate-spin" />
                      ) : (
                        `DONATE $${amount} NOW`
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 size={40} />
                </div>

                <div className="space-y-2 max-w-sm">
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "28px", fontWeight: 700, color: "white" }}>
                    Thank You!
                  </h2>
                  <p className="text-sm text-fog/80 leading-relaxed">
                    Your generous contribution of <span className="text-[#C9A84C] font-semibold">${amount}</span> to the {selectedFund} fund has been processed successfully.
                  </p>
                  <p className="text-xs text-white/40">
                    A receipt has been sent to {email}.
                  </p>
                </div>

                <div className="pt-4 w-full max-w-xs">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setCustomAmount("");
                      setAmount(50);
                    }}
                    className="w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    GIVE AGAIN
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
