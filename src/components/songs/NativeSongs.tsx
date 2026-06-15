"use client";

import { motion } from "framer-motion";
import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { ChevronLeft, Play, Search, Heart, Music2, Share2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const POPULAR_SONGS = [
  { id: "1", title: "Yeshu Ente Nalla Edayan", subtitle: "Worship Song", duration: "5:34" },
  { id: "2", title: "Ente Daivam Mahatvam", subtitle: "Praise & Worship", duration: "4:12" },
  { id: "3", title: "Aaradhana Nayakan", subtitle: "Sunday Worship", duration: "6:01" },
  { id: "4", title: "Kripayude Geethangal", subtitle: "Hymn", duration: "3:45" },
];

export function NativeSongs() {
  const { t } = useLanguage();

  return (
    <NativePageWrapper title="Songs & Lyrics">
      <div className="min-h-screen bg-[#000000] text-white flex flex-col font-body">
        
        {/* Header */}
        <header className="px-5 pt-14 pb-6 sticky top-0 z-20 bg-gradient-to-b from-black/90 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:scale-90 transition-transform">
              <Search size={18} />
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-oswald)", fontSize: "36px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            WORSHIP<br/>LYRICS
          </h1>
        </header>

        <div className="flex-1 px-4 pb-20">
          
          {/* Featured Song (Spotify style) */}
          <div className="flex justify-center mb-8 mt-2">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-48 rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C9A84C, #3D548F)" }}
            >
              <Music2 size={64} className="text-white/50 mix-blend-overlay" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "var(--font-inter)", fontSize: "22px", fontWeight: 700 }}>Yeshu Ente Nalla Edayan</h2>
              <p style={{ fontFamily: "var(--font-lato)", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>Agape Worship</p>
            </div>
            <div className="flex items-center gap-3">
              <Heart size={24} className="text-white/60" />
              <Share2 size={24} className="text-white/60" />
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <button className="w-16 h-16 rounded-full flex items-center justify-center bg-white text-black active:scale-95 transition-transform shadow-lg">
              <Play size={28} className="ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Playlist */}
          <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Popular Songs</h3>
          
          <div className="flex flex-col gap-4">
            {POPULAR_SONGS.map((song, i) => (
              <motion.div 
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Music2 size={20} className="text-white/50" />
                </div>
                <div className="flex-1">
                  <h4 style={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 600 }}>{song.title}</h4>
                  <p style={{ fontFamily: "var(--font-lato)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{song.subtitle}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20">
                  <Play size={12} fill="white" className="ml-0.5" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </NativePageWrapper>
  );
}
