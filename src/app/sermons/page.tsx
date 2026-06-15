"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { YouTubeEmbed } from "@/components/live/YouTubeEmbed";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Play, Clock, Eye, Search } from "lucide-react";
import { formatDate, formatDuration, getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useNativePlatform } from "@/hooks/useNativePlatform";
import { MOCK_SERMONS } from "@/lib/sermonData";
import { NativeSermons } from "@/components/sermons/NativeSermons";

export default function SermonsPage() {
  const isNative = useNativePlatform();
  if (isNative) return <NativeSermons />;
  return <WebSermons />;
}

function WebSermons() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [speaker, setSpeaker] = useState("all");
  const [series, setSeries] = useState("all");

  const filtered = MOCK_SERMONS.filter((s) => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.speaker.toLowerCase().includes(search.toLowerCase());
    const matchSpeaker = speaker === "all" || s.speaker === speaker;
    const matchSeries = series === "all" || s.series === series;
    return matchSearch && matchSpeaker && matchSeries;
  });

  const featured = MOCK_SERMONS[0];
  const featuredVideoId = getYouTubeVideoId(featured.youtube_url);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 lg:pb-0 bg-midnight">
        <div className="pt-16 bg-surface-1">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6 mb-8">
              <div>
                <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">{t("sermons_eyebrow")}</span>
                <h1 className="font-display text-4xl font-bold text-ivory mt-2">{t("sermons_title")}</h1>
              </div>
              <div className="max-w-md md:text-right">
                <p className="font-body text-fog italic text-xs leading-relaxed">"{t("sermons_scripture")}"</p>
                <p className="font-accent text-[9px] text-sacred/70 tracking-widest mt-1">{t("sermons_scripture_ref")}</p>
              </div>
            </div>

            <RevealOnScroll>
              <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">{t("sermons_featured_label")}</span>
            </RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-8 items-center mt-4">
              <div>
                <RevealOnScroll delay={0.1}>
                  {featured.series && (
                    <span className="font-label text-xs text-violet-light bg-violet/20 px-3 py-1 rounded-full">{featured.series}</span>
                  )}
                  <h1 className="font-display text-5xl font-bold text-ivory mt-3 mb-3 leading-tight">{featured.title}</h1>
                  <p className="font-body text-fog text-lg mb-2">{featured.speaker}</p>
                  <p className="font-body text-fog/70 text-sm mb-6">{featured.description}</p>
                  <div className="flex gap-4 text-xs font-label text-fog/60">
                    <span className="flex items-center gap-1"><Clock size={11} /> {featured.duration_seconds ? formatDuration(featured.duration_seconds) : ""}</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {featured.view_count.toLocaleString()} {t("sermons_views")}</span>
                    <span>{formatDate(featured.sermon_date)}</span>
                  </div>
                </RevealOnScroll>
              </div>
              <RevealOnScroll delay={0.2}>
                {featuredVideoId && <YouTubeEmbed videoId={featuredVideoId} className="rounded-2xl" />}
              </RevealOnScroll>
            </div>
          </div>
        </div>

        <GoldDivider className="max-w-7xl mx-auto px-4" />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fog/50" />
              <input type="text" placeholder={t("sermons_search_placeholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" />
            </div>
            <select value={speaker} onChange={(e) => setSpeaker(e.target.value)} className="px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory focus:outline-none focus:border-sacred/40 transition-colors">
              <option value="all">{t("sermons_filter_all_speakers")}</option>
              <option value="Pastor Reni Peter">Pastor Reni Peter</option>
              <option value="Pastor Jacoub">Pastor Jacoub</option>
            </select>
            <select value={series} onChange={(e) => setSeries(e.target.value)} className="px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory focus:outline-none focus:border-sacred/40 transition-colors">
              <option value="all">{t("sermons_filter_all_series")}</option>
              <option value="Mountains & Valleys">Mountains & Valleys</option>
              <option value="We Are One">We Are One</option>
              <option value="Kingdom Economy">Kingdom Economy</option>
              <option value="Identity">Identity</option>
            </select>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 pb-16">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-fog text-lg">{t("sermons_no_results")}</p>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((sermon) => {
                const vid = getYouTubeVideoId(sermon.youtube_url);
                const thumb = sermon.thumbnail_url ?? (vid ? getYouTubeThumbnail(vid) : "");
                return (
                  <StaggerItem key={sermon.id}>
                    <Link href={`/sermons/${sermon.id}`}>
                      <div className="group glass rounded-2xl overflow-hidden cursor-pointer hover:border-sacred/30 transition-all duration-200">
                        <div className="relative aspect-video bg-surface-2 overflow-hidden">
                          {thumb && <img src={thumb} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
                          <div className="absolute inset-0 bg-midnight/20 group-hover:bg-midnight/10 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-sacred/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Play size={18} className="text-midnight fill-midnight ml-1" />
                            </div>
                          </div>
                          {sermon.duration_seconds && (
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-midnight/80 rounded text-xs font-label text-ivory">
                              {formatDuration(sermon.duration_seconds)}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          {sermon.series && <span className="font-accent text-[10px] text-sacred/80 tracking-widest uppercase">{sermon.series}</span>}
                          <h3 className="font-heading text-base font-bold text-ivory mt-1 mb-1 group-hover:text-sacred transition-colors line-clamp-2">{sermon.title}</h3>
                          <p className="font-body text-fog text-xs mb-2">{sermon.speaker}</p>
                          <div className="flex gap-3 text-[11px] font-label text-fog/50">
                            <span>{formatDate(sermon.sermon_date)}</span>
                            <span className="flex items-center gap-1"><Eye size={10} /> {sermon.view_count.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
