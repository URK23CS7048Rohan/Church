"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Search, Music, ChevronRight, BookOpen, Guitar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNativePlatform } from "@/hooks/useNativePlatform";
import { SEED_SONGS, Song } from "@/lib/songData";
import { NativeSongs } from "@/components/songs/NativeSongs";

export default function SongsPage() {
  const isNative = useNativePlatform();
  if (isNative) return <NativeSongs />;
  return <WebSongs />;
}

function WebSongs() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "en" | "hi" | "ml" | "ar">("all");
  const [selectedSong, setSelectedSong] = useState<Song | null>(SEED_SONGS[0]);
  const [showChords, setShowChords] = useState(true);

  const filteredSongs = SEED_SONGS.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.lyrics.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLang = selectedLanguage === "all" || song.lang === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const renderLyrics = (lyrics: string) => {
    const isRtl = selectedSong?.lang === "ar";
    return lyrics.split("\n").map((line, lineIdx) => {
      const matches = [...line.matchAll(/\[([A-Za-z0-9#b/]+)\]/g)];
      
      if (matches.length === 0 || !showChords) {
        const cleanLine = line.replace(/\[([A-Za-z0-9#b/]+)\]/g, "");
        return (
          <p key={lineIdx} className={cn("font-body text-ivory/90 text-base py-1 leading-relaxed min-h-[1.5rem]", isRtl ? "text-right" : "text-left")} dir={isRtl ? "rtl" : "ltr"}>
            {cleanLine || "\u00A0"}
          </p>
        );
      }

      const chordLineElements: { chord: string; index: number }[] = [];
      let cleanText = "";
      line.split(/(\[[A-Za-z0-9#b/]+\])/).forEach((part) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          chordLineElements.push({ chord: part.substring(1, part.length - 1), index: cleanText.length });
        } else {
          cleanText += part;
        }
      });

      return (
        <div key={lineIdx} className={cn("py-1 relative font-mono select-text", isRtl ? "text-right" : "text-left")} dir={isRtl ? "rtl" : "ltr"}>
          <div className={cn("text-sacred font-bold text-xs h-4 select-none relative flex flex-row", isRtl ? "justify-end" : "justify-start")}>
            {chordLineElements.map((item, chordIdx) => {
              const spacesBefore = chordIdx === 0 ? item.index : item.index - chordLineElements[chordIdx - 1].index - chordLineElements[chordIdx - 1].chord.length;
              return (
                <span key={chordIdx} style={{ whiteSpace: "pre" }}>
                  {" ".repeat(Math.max(0, spacesBefore))}
                  <span className="bg-sacred/10 border border-sacred/20 px-1 rounded text-[10px] uppercase font-label select-all cursor-pointer hover:bg-sacred hover:text-midnight transition-all">
                    {item.chord}
                  </span>
                </span>
              );
            })}
          </div>
          <p className={cn("font-body text-ivory text-base tracking-wide leading-relaxed min-h-[1.5rem]", isRtl ? "text-right" : "text-left")} dir={isRtl ? "rtl" : "ltr"}>
            {cleanText || "\u00A0"}
          </p>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 lg:pb-0 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <SectionHeader eyebrow={t("nav_songs")} title={t("songs_title")} titleHighlight={t("songs_title_highlight")} subtitle={t("songs_subtitle")} />
            <p className="font-body text-fog italic text-sm mt-3 max-w-2xl mx-auto">"{t("songs_scripture")}"</p>
            <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">{t("songs_scripture_ref")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="space-y-6">
              <GlassCard className="p-5 border border-white/5 bg-surface-1 space-y-4">
                <div className="relative">
                  <input type="text" placeholder={t("songs_search_placeholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred" />
                  <Search className="absolute left-3.5 top-3.5 text-fog" size={16} />
                </div>
                <div className="flex gap-1 p-1 glass rounded-xl text-xs font-label">
                  {[{ id: "all", label: t("songs_filter_all") }, { id: "en", label: "EN" }, { id: "hi", label: "HI" }, { id: "ml", label: "ML" }, { id: "ar", label: "AR" }].map((btn) => (
                    <button key={btn.id} onClick={() => setSelectedLanguage(btn.id as any)} className={cn("flex-1 py-1.5 rounded-lg text-center transition-all", selectedLanguage === btn.id ? "bg-sacred text-midnight font-bold" : "text-fog hover:text-ivory")}>
                      {btn.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                      <button key={song.id} onClick={() => setSelectedSong(song)} className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${selectedSong?.id === song.id ? "bg-sacred/10 border-sacred text-sacred" : "glass border-white/5 hover:border-white/20 text-fog hover:text-ivory"}`}>
                        <div className="truncate">
                          <h4 className="font-heading font-bold text-sm text-ivory truncate">{song.title}</h4>
                          <span className="font-body text-xs text-fog/75 block mt-0.5">{song.artist}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-label font-semibold rounded bg-white/5 border border-white/10 text-sacred">{t("songs_key_label")} {song.key}</span>
                          <ChevronRight size={14} className="opacity-40" />
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm font-body text-fog text-center py-6">{t("songs_no_results")}</p>
                  )}
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-2">
              {selectedSong ? (
                <GlassCard className="p-8 md:p-10 border border-white/10 bg-surface-1 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-5 mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sacred/15 flex items-center justify-center shrink-0">
                        <Music size={20} className="text-sacred" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-ivory">{selectedSong.title}</h2>
                        <p className="font-body text-sm text-fog">{t("songs_by")} {selectedSong.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setShowChords(!showChords)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-label transition-all ${showChords ? "bg-sacred text-midnight border-transparent font-bold" : "glass border-white/10 text-fog hover:text-ivory"}`}>
                        <Guitar size={14} /> {showChords ? t("songs_chords_on") : t("songs_chords_off")}
                      </button>
                      <div className="px-3 py-1.5 rounded-xl bg-surface-2 border border-white/5">
                        <span className="font-label text-xs text-fog">{t("songs_key_label")} </span>
                        <span className="font-label text-xs text-sacred font-bold">{selectedSong.key}</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto select-text py-4 whitespace-pre-wrap max-w-full bg-surface-2/20 p-6 rounded-2xl border border-white/5">
                    <div className="space-y-4">{renderLyrics(selectedSong.lyrics)}</div>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs font-label text-fog/60">
                    <span className="flex items-center gap-1"><BookOpen size={12} className="text-sacred" /> {t("songs_hymnal_label")}</span>
                    <span>{t("songs_lang_label")} {selectedSong.lang.toUpperCase()}</span>
                  </div>
                </GlassCard>
              ) : (
                <GlassCard className="p-12 flex flex-col items-center justify-center h-80 text-center border border-white/5">
                  <Music size={40} className="text-fog/40 mb-3" />
                  <p className="font-body text-fog text-sm">{t("songs_select_prompt")}</p>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

