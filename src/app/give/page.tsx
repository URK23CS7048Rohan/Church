"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { GivingForm } from "@/components/give/GivingForm";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { Heart, Globe, Building2, Users } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const IMPACT_STATS = [
  { value: 14, prefix: "", suffix: "", labelKey: "home_impact_label_missions", icon: Globe },
  { value: 250, prefix: "", suffix: "+", labelKey: "home_impact_label_outreach", icon: Users },
  { value: 12, prefix: "", suffix: "", labelKey: "give_steward_outreach", icon: Heart },
  { value: 100, prefix: "", suffix: "%", labelKey: "give_steward_ops", icon: Building2 },
];

export default function GivePage() {
  const { t } = useLanguage();

  return (
    <NativePageWrapper title="Give" accentColor="#FCA5A5" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        {/* Page Hero */}
        <div className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <RevealOnScroll>
              <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">
                {t("give_generosity")}
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 
                className="font-display text-6xl md:text-7xl font-bold text-ivory mt-4 mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: t("give_headline_html") }}
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-fog text-xl leading-relaxed mb-4">
                {t("give_cheerful_giver")}
              </p>
              <p className="font-accent text-sm text-sacred/70 tracking-widest">
                {t("give_cheerful_giver_ref")}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <GoldDivider className="max-w-4xl mx-auto px-4 mb-16" />

        {/* Giving Form */}
        <section className="px-4 pb-20">
          <GivingForm />
        </section>

        <GoldDivider className="max-w-6xl mx-auto px-4 mb-16" />

        {/* Impact Stats */}
        <section className="py-16 px-4 bg-surface-1/50">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {t("give_gift_at_work")}
              </h2>
              <p className="font-body text-fog mt-3">
                {t("give_gift_at_work_sub")}
              </p>
            </RevealOnScroll>

            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {IMPACT_STATS.map(({ value, prefix, suffix, labelKey, icon: Icon }) => (
                <StaggerItem key={labelKey}>
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="w-10 h-10 rounded-xl bg-sacred/15 flex items-center justify-center mx-auto mb-4">
                      <Icon size={18} className="text-sacred" />
                    </div>
                    <div className="font-display text-4xl font-bold gold-text mb-2">
                      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
                    </div>
                    <p className="font-label text-xs text-fog tracking-wide">{t(labelKey)}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Where the money goes */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {t("give_steward_title")}
              </h2>
            </RevealOnScroll>
            <div className="space-y-4">
              {[
                { labelKey: "give_steward_ops", pct: 45, color: "bg-sacred" },
                { labelKey: "give_steward_missions", pct: 20, color: "bg-violet" },
                { labelKey: "give_steward_building", pct: 20, color: "bg-emerald-500" },
                { labelKey: "give_steward_outreach", pct: 15, color: "bg-ember" },
              ].map(({ labelKey, pct, color }) => (
                <RevealOnScroll key={labelKey}>
                  <div className="flex items-center gap-4">
                    <span className="font-label text-sm text-ivory w-48 shrink-0">{t(labelKey)}</span>
                    <div className="flex-1 h-2 bg-surface-3 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%`, transition: "width 1.2s ease-out" }} />
                    </div>
                    <span className="font-label text-sm text-sacred w-10 text-right">{pct}%</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </NativePageWrapper>
  );
}
