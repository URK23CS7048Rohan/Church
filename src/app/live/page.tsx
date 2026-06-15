"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { ServiceCountdown } from "@/components/live/ServiceCountdown";
import { SermonNotes } from "@/components/live/SermonNotes";
import { YouTubeEmbed } from "@/components/live/YouTubeEmbed";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/components/providers/LanguageProvider";

// This would be fetched server-side in production
const DEMO_VIDEO_ID = "agapeinternationalmedia";
const IS_LIVE = false; // Toggle when stream is active

export default function LivePage() {
  const { t } = useLanguage();

  const waitLinks = [
    { labelKey: "live_link_sermons", defaultLabel: "Catch up on sermons", href: "/sermons" },
    { labelKey: "live_link_events", defaultLabel: "Browse upcoming events", href: "/events" },
    { labelKey: "live_link_prayer", defaultLabel: "Submit a prayer request", href: "/prayer" },
    { labelKey: "live_link_connect", defaultLabel: "Connect with a small group", href: "/connect" },
  ];

  return (
    <NativePageWrapper title="Watch Live" accentColor="#6EE7B7" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        {IS_LIVE ? (
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
            {/* YouTube embed — main content */}
            <div className="lg:flex-1">
              <div className="sticky top-16">
                <YouTubeEmbed videoId={DEMO_VIDEO_ID} autoplay />
                <div className="px-6 py-4 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="font-heading text-xl font-bold text-ivory">
                      {t("live_morning_worship")}
                    </h1>
                    <p className="font-body text-fog text-sm mt-1">
                      {t("live_morning_worship_sub")}
                    </p>
                  </div>
                  <div className="text-left md:text-right max-w-xs">
                    <p className="font-body text-fog italic text-xs">
                      "{t("live_scripture")}"
                    </p>
                    <p className="font-accent text-[9px] text-sacred/70 tracking-widest mt-0.5">
                      {t("live_scripture_ref")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar — sermon notes */}
            <div className="lg:w-96 border-l border-white/5 flex flex-col">
              <SermonNotes sermonId="live" />
            </div>
          </div>
        ) : (
          /* Offline — countdown + upcoming sermon info */
          <div className="max-w-4xl mx-auto px-4 pt-16">
            <div className="text-center mb-16">
              <RevealOnScroll>
                <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">
                  {t("live_eyebrow")}
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h1 className="font-display text-6xl font-bold text-ivory mt-4 mb-4">
                  {t("live_headline")}
                  <span className="gold-text">{t("live_headline_highlight")}</span>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="font-body text-fog text-xl mb-3">
                  {t("live_subtitle")}
                </p>
                <p className="font-body text-fog italic text-sm max-w-md mx-auto">
                  "{t("live_scripture")}"
                </p>
                <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
                  {t("live_scripture_ref")}
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.3}>
              <ServiceCountdown />
            </RevealOnScroll>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <RevealOnScroll className="glass rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold text-ivory mb-2">
                  {t("live_sunday_msg")}
                </h3>
                <p className="font-display text-2xl gold-text font-bold mb-3">
                  {t("live_msg_title")}
                </p>
                <p className="font-body text-fog text-sm">
                  {t("live_msg_desc")}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1} className="glass rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold text-ivory mb-4">
                  {t("live_while_wait")}
                </h3>
                <div className="space-y-2">
                  {waitLinks.map(({ labelKey, defaultLabel, href }) => (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-2 font-body text-sm text-fog hover:text-sacred transition-colors py-1"
                    >
                      <span className="text-sacred">→</span> {t(labelKey) || defaultLabel}
                    </a>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            {/* Recent sermon embed */}
            <div className="mt-16">
              <RevealOnScroll>
                <h2 className="font-heading text-2xl font-bold text-ivory mb-6">
                  {t("live_last_sunday")}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <YouTubeEmbed videoId={DEMO_VIDEO_ID} />
                <div className="mt-4">
                  <SermonNotes sermonId="last-sunday" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}
      </NativePageWrapper>
  );
}
