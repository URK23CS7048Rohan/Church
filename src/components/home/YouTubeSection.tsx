"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CHANNEL_URL = "https://www.youtube.com/@agapeinternationalmedia";

const FEATURED_VIDEOS = [
  {
    id: "v1",
    title: "Sunday Worship Service — Live from Agape International",
    speaker: "Agape International Media",
    series: "Sunday Service",
    href: CHANNEL_URL,
    label: "Latest",
    accent: "#FF4444",
  },
  {
    id: "v2",
    title: "Mid-Week Prayer & Praise Night",
    speaker: "Agape International Media",
    series: "Midweek Service",
    href: `${CHANNEL_URL}/videos`,
    label: "Recent",
    accent: "#C9A84C",
  },
  {
    id: "v3",
    title: "Youth Praise & Worship Night",
    speaker: "Youth Ministry",
    series: "Youth Service",
    href: `${CHANNEL_URL}/videos`,
    label: "Popular",
    accent: "#9B87F5",
  },
  {
    id: "v4",
    title: "Sermon: Walking in the Spirit",
    speaker: "Senior Pastor",
    series: "Word of Faith",
    href: `${CHANNEL_URL}/videos`,
    label: "Featured",
    accent: "#34D399",
  },
];

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        whileHover={{ scale: 1.12 }}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: "rgba(255,0,0,0.9)", boxShadow: "0 0 40px rgba(255,0,0,0.4)" }}
      >
        <Play size={24} className="text-white fill-white ml-1" />
      </motion.div>
    </div>
  );
}

function VideoThumbnailPlaceholder({ accent, label }: { accent: string; label: string }) {
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-t-2xl"
      style={{ background: `linear-gradient(135deg, #0a0a14, #14001a)` }}
    >
      {/* YT logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-8">
        <svg width="80" height="80" viewBox="0 0 48 48" fill="none">
          <rect x="2" y="10" width="44" height="28" rx="8" fill="#FF0000" opacity="0.15"/>
        </svg>
      </div>

      {/* Diagonal gradient lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)`,
        }}
      />

      <PlayButton />

      {/* Label badge */}
      <div className="absolute top-3 left-3">
        <span
          className="font-accent text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ background: `${accent}CC`, color: "white", fontWeight: 700 }}
        >
          {label}
        </span>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
    </div>
  );
}

export function YouTubeSection() {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <RevealOnScroll>
            <div className="flex items-center gap-4">
              {/* YouTube logo */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.25)" }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <rect x="2" y="10" width="44" height="28" rx="8" fill="#FF0000"/>
                  <polygon points="20,17 33,24 20,31" fill="white"/>
                </svg>
              </div>
              <SectionHeader
                eyebrow="Watch Online"
                title="Agape on"
                titleHighlight="YouTube"
                align="left"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 font-label text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
            >
              <ExternalLink size={14} />
              Subscribe on YouTube
            </a>
          </RevealOnScroll>
        </div>

        {/* Channel banner card */}
        <RevealOnScroll className="mb-10">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-2xl p-6 flex items-center gap-6 group"
              style={{
                background: "linear-gradient(135deg, rgba(255,0,0,0.08) 0%, rgba(201,168,76,0.05) 100%)",
                border: "1px solid rgba(255,0,0,0.2)",
              }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(255,0,0,0.06) 0%, transparent 60%)" }} />

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#FF0000", boxShadow: "0 4px 20px rgba(255,0,0,0.4)" }}>
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
                  <polygon points="20,14 36,24 20,34" fill="white"/>
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-ivory">Agape International Media</h3>
                <p className="font-body text-fog text-sm mt-0.5">@agapeinternationalmedia · Sermons, Worship & Live Services</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-label text-xs text-fog/50">Watch our Sunday services, midweek prayer, youth nights and more →</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 flex-shrink-0 font-label text-sm font-bold px-5 py-2.5 rounded-full"
                style={{ background: "#FF0000", color: "white" }}>
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                  <rect x="2" y="10" width="44" height="28" rx="8" fill="white"/>
                  <polygon points="20,17 33,24 20,31" fill="#FF0000"/>
                </svg>
                Subscribe
              </div>
            </motion.div>
          </a>
        </RevealOnScroll>

        {/* Video grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_VIDEOS.map((vid) => (
            <StaggerItem key={vid.id}>
              <a href={vid.href} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group rounded-2xl overflow-hidden cursor-pointer"
                  style={{ background: "rgba(15,15,25,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <VideoThumbnailPlaceholder accent={vid.accent} label={vid.label} />
                  <div className="p-4">
                    {vid.series && (
                      <span className="font-accent text-[10px] tracking-widest uppercase" style={{ color: vid.accent }}>
                        {vid.series}
                      </span>
                    )}
                    <h4 className="font-heading text-sm font-semibold text-ivory group-hover:text-sacred transition-colors line-clamp-2 mt-1">
                      {vid.title}
                    </h4>
                    <p className="font-body text-fog/60 text-xs mt-1.5">{vid.speaker}</p>
                  </div>
                </motion.div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile subscribe btn */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-label text-sm font-bold px-6 py-3 rounded-full"
            style={{ background: "#FF0000", color: "white" }}
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
