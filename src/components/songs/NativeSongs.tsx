"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEED_SONGS, Song } from "@/lib/songData";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChevronLeft, Search, Music, Play, MoreVertical } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";

export function NativeSongs() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "en" | "hi" | "ml" | "ar">("all");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const filteredSongs = SEED_SONGS.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === "all" || song.lang === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const isRtl = selectedSong?.lang === "ar";

  const renderSpotifyLyrics = (lyrics: string) => {
    return lyrics.split("\n").map((line, idx) => {
      // For the native immersive view, we hide chords by default to make it look like Spotify lyrics
      const cleanLine = line.replace(/\[([A-Za-z0-9#b/]+)\]/g, "");
      if (!cleanLine.trim()) return <div key={idx} className="h-6" />;
      
      return (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px -40% 0px" }}
          transition={{ duration: 0.4 }}
          className={cn(
            "font-display text-2xl md:text-3xl font-bold leading-tight my-4 cursor-pointer hover:text-white transition-colors",
            isRtl ? "text-right" : "text-left"
          )}
          style={{ color: "rgba(255,255,255,0.4)" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {cleanLine}
        </motion.p>
      );
    });
  };

  return (
    <div className="min-h-screen pb-28 overflow-hidden relative" style={{ background:"#0A0A0A", color:"#FFFFFF" }}>
      <AnimatePresence mode="wait">
        {!selectedSong ? (
          <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, x:-20 }} className="h-full flex flex-col">
            <header className="px-5 pt-12 pb-4 sticky top-0 z-20" style={{ background:"rgba(10,10,10,0.8)", backdropFilter:"blur(20px)" }}>
              <h1 style={{ fontFamily:"var(--font-playfair)", fontSize:"28px", fontWeight:700, marginBottom:"16px" }}>
                Hymns & Lyrics
              </h1>
              
              <div className="relative mb-4">
                <Search size={18} className="absolute left-4 top-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:bg-white/15 transition-colors font-inter text-sm"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[{ id: "all", label: "All" }, { id: "en", label: "English" }, { id: "hi", label: "Hindi" }, { id: "ml", label: "Malayalam" }, { id: "ar", label: "Arabic" }].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id as any)}
                    className={`px-4 py-1.5 rounded-full whitespace-nowrap font-inter text-xs font-semibold transition-all ${
                      selectedLanguage === lang.id ? "bg-[#1DB954] text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </header>

            <main className="flex-1 overflow-y-auto px-5 pb-20">
              <div className="space-y-2 mt-2">
                {filteredSongs.map((song) => (
                  <motion.div
                    key={song.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSong(song)}
                    className="flex items-center gap-4 p-2 rounded-xl active:bg-white/5"
                  >
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                      <Music size={20} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-inter font-bold text-base truncate">{song.title}</h3>
                      <p className="font-inter text-xs text-white/50 truncate">{song.artist}</p>
                    </div>
                    <MoreVertical size={16} className="text-white/30 shrink-0" />
                  </motion.div>
                ))}
              </div>
            </main>
          </motion.div>
        ) : (
          <motion.div key="player" initial={{ opacity:0, y:100 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:100 }} className="fixed inset-0 z-50 flex flex-col" style={{ background:"linear-gradient(to bottom, #4A2B2B, #0A0A0A)" }}>
            <header className="flex items-center justify-between p-5 pt-12">
              <button onClick={() => setSelectedSong(null)} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-md">
                <ChevronLeft size={24} />
              </button>
              <div className="text-center">
                <p className="font-inter text-[10px] font-bold text-white/60 tracking-widest uppercase">Now Playing</p>
                <p className="font-inter text-xs font-bold mt-0.5">{selectedSong.title}</p>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-md">
                <MoreVertical size={20} />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-32 pt-8">
              <div className="max-w-2xl mx-auto">
                {renderSpotifyLyrics(selectedSong.lyrics)}
              </div>
            </main>

            {/* Simulated Player Controls at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-inter font-bold text-lg">{selectedSong.title}</h3>
                  <p className="font-inter text-sm text-white/60">{selectedSong.artist}</p>
                </div>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full mb-6">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>
              <div className="flex items-center justify-center gap-8 pb-4">
                <Play size={48} className="fill-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedSong && <MobileBottomNav />}
    </div>
  );
}
