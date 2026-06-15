"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_SERMONS } from "@/lib/sermonData";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChevronLeft, Search, Play, Clock, Share2, MoreVertical } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn, formatDuration, getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/utils";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/live/YouTubeEmbed";

export function NativeSermons() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"recent" | "series" | "topics">("recent");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = MOCK_SERMONS.filter((s) => 
    !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-28 overflow-hidden relative bg-midnight text-ivory">
      {/* Immersive Background Blur based on currently playing or first video */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-midnight/90 backdrop-blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-sacred/10 to-transparent opacity-60" />
      </div>

      <header className="px-5 pt-12 pb-4 sticky top-0 z-20" style={{ background:"linear-gradient(to bottom, rgba(10,10,15,1), rgba(10,10,15,0.8))", backdropFilter:"blur(20px)" }}>
        <h1 style={{ fontFamily:"var(--font-playfair)", fontSize:"28px", fontWeight:700, marginBottom:"16px", color:"white" }}>
          Sermons
        </h1>
        
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 text-white pl-12 pr-4 py-3 rounded-2xl outline-none focus:bg-white/10 transition-colors font-inter text-sm border border-white/5"
          />
        </div>

        <div className="flex gap-2">
          {["recent", "series", "topics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-4 py-1.5 rounded-full capitalize font-inter text-xs font-semibold transition-all",
                activeTab === tab ? "bg-sacred text-midnight" : "bg-white/5 text-fog hover:text-white border border-white/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 px-4 pt-4 pb-20 h-full overflow-y-auto space-y-6">
        <AnimatePresence>
          {filtered.map((sermon, idx) => {
            const vid = getYouTubeVideoId(sermon.youtube_url);
            const thumb = sermon.thumbnail_url ?? (vid ? getYouTubeThumbnail(vid) : "");
            const isPlaying = playingId === sermon.id;

            return (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface-1/40 border border-white/5 rounded-3xl overflow-hidden"
              >
                {/* Video / Thumbnail Area */}
                <div className="relative aspect-video bg-black cursor-pointer" onClick={() => setPlayingId(isPlaying ? null : sermon.id)}>
                  {isPlaying && vid ? (
                    <YouTubeEmbed videoId={vid} className="w-full h-full" />
                  ) : (
                    <>
                      {thumb && <img src={thumb} alt={sermon.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Play size={24} className="text-white fill-white ml-1" />
                        </div>
                      </div>
                      {sermon.duration_seconds && (
                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold font-inter text-white">
                          {formatDuration(sermon.duration_seconds)}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {sermon.series && (
                        <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-sacred mb-2 block">
                          {sermon.series}
                        </span>
                      )}
                      <Link href={`/sermons/${sermon.id}`}>
                        <h3 className="font-playfair text-xl font-bold text-white mb-1 leading-tight">{sermon.title}</h3>
                      </Link>
                      <p className="font-inter text-xs text-fog">{sermon.speaker}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 active:scale-95 shrink-0">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>

      <MobileBottomNav />
    </div>
  );
}
