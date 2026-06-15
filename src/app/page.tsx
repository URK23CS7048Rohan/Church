"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { HeroSection } from "@/components/home/HeroSection";
import { BeliefsSection } from "@/components/home/BeliefsSection";
import { WelcomeAndMarquee } from "@/components/home/WelcomeAndMarquee";
import { LiveWidget } from "@/components/home/LiveWidget";
import { QuickActions } from "@/components/home/QuickActions";
import { SermonPreview } from "@/components/home/SermonPreview";
import { PrayerPreview } from "@/components/home/PrayerPreview";
import { PhotoMosaic } from "@/components/home/PhotoMosaic";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useNativePlatform } from "@/hooks/useNativePlatform";
import { NativeHome } from "@/components/home/NativeHome";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { YouTubeSection } from "@/components/home/YouTubeSection";

export default function HomePage() {
  const isNative = useNativePlatform();
  if (isNative) {
    return <NativeHome />;
  }
  return <WebHome />;
}

function WebHome() {
  const { t } = useLanguage();

  const stats = [
    { value: 1200, suffix: "+", labelKey: "home_impact_label_believers", defaultLabel: "Gathered Believers", prefix: "", decimals: undefined },
    { value: 4500, suffix: "+", labelKey: "home_impact_label_outreach", defaultLabel: "Outreach Hours", prefix: "", decimals: undefined },
    { value: 32, suffix: "", labelKey: "home_impact_label_fellowships", defaultLabel: "Home Fellowships", prefix: "", decimals: undefined },
    { value: 14, suffix: "", labelKey: "home_impact_label_missions", defaultLabel: "Global Missions", prefix: "", decimals: undefined },
  ];

  return (
    <>
      <Navbar />

      <main className="pb-20 lg:pb-0">
        {/* Hero */}
        <HeroSection />

        {/* We Believe Section */}
        <BeliefsSection />

        {/* Quick Actions */}
        <QuickActions />

        {/* Scrolling scripture and welcome banner */}
        <WelcomeAndMarquee />

        {/* Live Widget */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <LiveWidget />
          </div>
        </section>

        {/* Scripture of the Day callout */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <div className="glass rounded-3xl p-8 md:p-10 border border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent text-center relative overflow-hidden">
                <span className="font-accent text-xs text-sacred tracking-[0.25em] uppercase block mb-4">
                  {t("home_scripture_day")}
                </span>
                <blockquote className="font-display text-2xl md:text-3xl font-bold text-ivory leading-relaxed mb-6">
                  "{t("home_scripture_day_text")}"
                </blockquote>
                <cite className="font-accent text-xs text-sacred/70 tracking-widest not-italic">
                  {t("home_scripture_day_ref")}
                </cite>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <GoldDivider className="max-w-7xl mx-auto px-4" />

        {/* Latest Sermons */}
        <SermonPreview />

        {/* YouTube Channel Section */}
        <YouTubeSection />

        {/* Events Teaser */}
        <EventsTeaser />

        <GoldDivider className="max-w-7xl mx-auto px-4" />

        {/* Prayer Preview */}
        <PrayerPreview />

        {/* Photo Mosaic */}
        <PhotoMosaic />

        {/* Impact Stats */}
        <section className="py-20 px-4 bg-surface-1">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll className="text-center mb-12">
              <p className="font-accent text-xs text-sacred tracking-[0.3em] uppercase mb-3">
                {t("home_impact_eyebrow")}
              </p>
              <h2 className="font-heading text-4xl font-bold text-ivory">
                {t("home_impact_title")}
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(({ value, suffix, labelKey, defaultLabel, prefix, decimals }) => (
                <RevealOnScroll key={labelKey} className="text-center">
                  <div className="glass rounded-2xl p-6">
                    <div className="font-display text-4xl lg:text-5xl font-bold gold-text mb-2">
                      <AnimatedCounter
                        value={value}
                        prefix={prefix}
                        suffix={suffix}
                        decimals={decimals}
                      />
                    </div>
                    <p className="font-label text-sm text-fog">{t(labelKey) || defaultLabel}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Scripture quote */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <div className="font-accent text-6xl text-sacred/30 leading-none mb-4">"</div>
              <blockquote className="font-display text-3xl md:text-4xl font-bold text-ivory leading-relaxed mb-6">
                {t("home_giving_scripture")}
              </blockquote>
              <cite className="font-accent text-sm text-sacred/70 tracking-widest not-italic">
                {t("home_giving_scripture_ref")}
              </cite>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}
