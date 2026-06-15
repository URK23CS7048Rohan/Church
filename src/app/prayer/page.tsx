"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { useState } from "react";
import { Plus } from "lucide-react";
import { PrayerWall } from "@/components/prayer/PrayerWall";
import { SubmitPrayerModal } from "@/components/prayer/SubmitPrayerModal";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PrayerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <NativePageWrapper title="Prayer Wall" accentColor="#F9A8D4" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -5%, rgba(91,45,142,0.15) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-2xl mx-auto relative z-10">
          <RevealOnScroll>
            <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">
              {t("prayer_eyebrow")}
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-ivory mt-4 mb-4">
              {t("prayer_title")}{" "}
              <span className="gold-text">{t("prayer_title_highlight")}</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-body text-fog text-lg mb-3">
              &ldquo;{t("prayer_subtitle")}&rdquo;
            </p>
            <p className="font-accent text-xs text-sacred/70 tracking-widest mb-8">
              {t("prayer_scripture_ref")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus size={18} />}
              onClick={() => setModalOpen(true)}
              id="submit-prayer-btn"
            >
              {t("prayer_btn_submit")}
            </Button>
          </RevealOnScroll>
        </div>
      </div>

      {/* Prayer Wall */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <PrayerWall />
      </section>

      <SubmitPrayerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setModalOpen(false)}
      />
    </NativePageWrapper>
  );
}
