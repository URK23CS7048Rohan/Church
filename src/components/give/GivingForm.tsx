"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  Globe,
  Building2,
  Wallet,
  RefreshCw,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";
import type { DonationFund, DonationFrequency } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

const FUNDS: { id: DonationFund; labelKey: string; icon: typeof Heart; descriptionKey: string; color: string }[] = [
  {
    id: "tithe",
    labelKey: "give_fund_tithe",
    icon: Heart,
    descriptionKey: "give_fund_tithe_desc",
    color: "from-sacred/20 to-sacred/5",
  },
  {
    id: "offering",
    labelKey: "give_fund_offering",
    icon: Wallet,
    descriptionKey: "give_fund_offering_desc",
    color: "from-violet/20 to-violet/5",
  },
  {
    id: "missions",
    labelKey: "give_fund_missions",
    icon: Globe,
    descriptionKey: "give_fund_missions_desc",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "building",
    labelKey: "give_fund_building",
    icon: Building2,
    descriptionKey: "give_fund_building_desc",
    color: "from-ember/20 to-ember/5",
  },
];

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

const FREQUENCIES: { id: DonationFrequency; labelKey: string; icon: typeof RefreshCw }[] = [
  { id: "one_time", labelKey: "give_freq_one_time", icon: CheckCircle },
  { id: "weekly", labelKey: "give_freq_weekly", icon: RefreshCw },
  { id: "monthly", labelKey: "give_freq_monthly", icon: Calendar },
];

export function GivingForm() {
  const { t } = useLanguage();
  
  const [selectedFund, setSelectedFund] = useState<DonationFund>("tithe");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<DonationFrequency>("one_time");
  const [step, setStep] = useState<"select" | "payment" | "success">("select");
  const [loading, setLoading] = useState(false);

  const giveSchema = z.object({
    name: z.string().min(2, t("give_err_name")),
    email: z.string().email(t("give_err_email")),
  });

  type GiveFormData = z.infer<typeof giveSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<GiveFormData>({
    resolver: zodResolver(giveSchema),
  });

  const finalAmount = customAmount
    ? Math.round(parseFloat(customAmount) * 100)
    : (selectedAmount ?? 0) * 100;

  const finalAmountDisplay = customAmount
    ? `$${parseFloat(customAmount).toFixed(2)}`
    : selectedAmount
    ? formatCurrency(selectedAmount * 100)
    : "$0";

  const currentFund = FUNDS.find((f) => f.id === selectedFund)!;

  const onSubmit = async (data: GiveFormData) => {
    if (finalAmount < 100) {
      toast.error(t("give_err_min"));
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        frequency === "one_time"
          ? "/api/stripe/create-payment-intent"
          : "/api/stripe/create-subscription";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: finalAmount,
          fund: selectedFund,
          frequency,
          email: data.email,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Payment failed");
      }

      await new Promise((r) => setTimeout(r, 1500));
      setStep("success");
      toast.success(t("prayer_toast_success"));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 text-center max-w-lg mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-sacred/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-sacred" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-ivory mb-3">
          {t("give_thank_you")}
        </h2>
        <p className="font-body text-fog text-lg mb-2">
          {t("give_success_desc")}
        </p>
        <p className="font-body text-sacred text-base mb-8 font-semibold">
          {finalAmountDisplay} · {t(currentFund.labelKey)} ({t(`give_freq_${frequency}`)})
        </p>
        <button
          onClick={() => setStep("select")}
          className="font-label text-sm text-sacred hover:text-sacred-light transition-colors"
        >
          {t("give_success_again")}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Fund Selector */}
        <div>
          <h3 className="font-label font-semibold text-ivory/80 text-sm uppercase tracking-wider mb-4">
            {t("give_choose_fund")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {FUNDS.map((fund) => (
              <motion.button
                type="button"
                key={fund.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedFund(fund.id)}
                className={cn(
                  "relative p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer",
                  selectedFund === fund.id
                    ? "border-sacred/60 bg-sacred/10"
                    : "border-white/10 bg-surface-2/50 hover:border-white/20"
                )}
                id={`fund-${fund.id}`}
              >
                <fund.icon
                  size={18}
                  className={cn(
                    "mb-2 transition-colors",
                    selectedFund === fund.id ? "text-sacred" : "text-fog"
                  )}
                />
                <p className={cn("font-label text-sm font-semibold", selectedFund === fund.id ? "text-sacred" : "text-ivory")}>
                  {t(fund.labelKey)}
                </p>
                {/* Active indicator */}
                {selectedFund === fund.id && (
                  <motion.div
                    layoutId="fund-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sacred to-sacred-light rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedFund}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="font-body text-sm text-fog/80 mt-3 px-1"
            >
              {t(currentFund.descriptionKey)}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Amount selector */}
        <div>
          <h3 className="font-label font-semibold text-ivory/80 text-sm uppercase tracking-wider mb-4">
            {t("give_select_amount")}
          </h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {PRESET_AMOUNTS.map((amount) => (
              <motion.button
                type="button"
                key={amount}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={cn(
                  "py-3 rounded-xl font-label font-semibold text-sm border transition-all duration-200",
                  selectedAmount === amount && !customAmount
                    ? "border-sacred bg-sacred/15 text-sacred shadow-[0_0_16px_rgba(201,168,76,0.2)]"
                    : "border-white/10 text-fog hover:border-white/30 hover:text-ivory"
                )}
                id={`amount-${amount}`}
              >
                ${amount}
              </motion.button>
            ))}
          </div>
          {/* Custom amount */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-label text-fog font-semibold">
              $
            </span>
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder={t("give_custom_amount")}
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className={cn(
                "w-full pl-8 pr-4 py-3.5 rounded-xl bg-surface-2 border font-label text-ivory placeholder:text-fog/40 transition-all duration-200 focus:outline-none",
                customAmount
                  ? "border-sacred/50 ring-2 ring-sacred/10"
                  : "border-white/10 focus:border-sacred/40"
              )}
              id="custom-amount-input"
            />
          </div>
        </div>

        {/* Frequency toggle */}
        <div>
          <h3 className="font-label font-semibold text-ivory/80 text-sm uppercase tracking-wider mb-4">
            {t("give_frequency")}
          </h3>
          <div className="relative flex bg-surface-2 rounded-xl p-1 gap-1">
            {FREQUENCIES.map((freq) => (
              <button
                type="button"
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={cn(
                  "relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-label text-sm font-semibold transition-colors duration-200 z-10",
                  frequency === freq.id ? "text-midnight animate-fade-in" : "text-fog hover:text-ivory"
                )}
                id={`freq-${freq.id}`}
              >
                {frequency === freq.id && (
                  <motion.div
                    layoutId="freq-pill"
                    className="absolute inset-0 bg-sacred rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <freq.icon size={14} className="relative z-10" />
                <span className="relative z-10">{t(freq.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Donor info */}
        <div className="space-y-3">
          <h3 className="font-label font-semibold text-ivory/80 text-sm uppercase tracking-wider">
            {t("give_your_info")}
          </h3>
          <input
            {...register("name")}
            placeholder={t("give_label_name")}
            className="w-full px-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors"
            id="donor-name"
          />
          {errors.name && (
            <p className="text-ember text-xs">{errors.name.message}</p>
          )}
          <input
            {...register("email")}
            type="email"
            placeholder={t("give_label_email")}
            className="w-full px-4 py-3.5 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors"
            id="donor-email"
          />
          {errors.email && (
            <p className="text-ember text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full text-base"
          id="give-submit-btn"
        >
          {t("give_btn_submit")} {finalAmountDisplay}
          {frequency !== "one_time" && ` / ${t(frequency === "weekly" ? "give_week" : "give_month")}`}
        </Button>

        <p className="text-center font-body text-xs text-fog/50">
          {t("give_secure_note")}
        </p>
      </form>
    </div>
  );
}
