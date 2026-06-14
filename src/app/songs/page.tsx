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

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  lyrics: string; // Stored with bracketed chords e.g. [G] Amazing [C] Grace
  lang: "en" | "hi" | "ml" | "ar";
}

const SEED_SONGS: Song[] = [
  {
    id: "1",
    title: "Amazing Grace",
    artist: "John Newton",
    key: "G",
    lang: "en",
    lyrics: `[G] Amazing [G7] grace! How [C] sweet the [G] sound
That [G] saved a [Em] wretch like [D] me!
I [G] once was [G7] lost, but [C] now am [G] found;
Was [Em] blind, but [D7] now I [G] see.

'Twas [G] grace that [G7] taught my [C] heart to [G] fear,
And [G] grace my [Em] fears re[D]lieved;
How [G] precious [G7] did that [C] grace ap[G]pear
The [Em] hour I [D7] first be[G]lieved.

Through [G] many [G7] dangers, [C] toils and [G] snares,
I [G] have al[Em]ready [D] come;
'Tis [G] grace hath [G7] brought me [C] safe thus [G] far,
And [Em] grace will [D7] lead me [G] home.`
  },
  {
    id: "2",
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    key: "C",
    lang: "en",
    lyrics: `[C] The splendor of the [Am] King, clothed in majesty
Let all the earth re[F]joice, all the earth rejoice
[C] He wraps Himself in [Am] light, and darkness tries to hide
And trembles at His [F] voice, trembles at His voice

[C] How great is our God, sing with me
[Am] How great is our God, and all will see
How [F] great, how [G] great is our [C] God`
  },
  {
    id: "3",
    title: "In Christ Alone",
    artist: "Keith Getty & Stuart Townend",
    key: "G",
    lang: "en",
    lyrics: `In [G] Christ a[D]lone my [G] hope is [A] found
[D] He is my [G] light, my [D] strength, [Em] my [A] song
This [G] Corner[D]stone, this [G] solid [A] Ground
[D] Firm through the [G] fiercest [D] drought [Em] and [A] storm
What [G] heights of [D] love, what [G] depths of [A] peace
When [D] fears are [G] stilled, when [D] strivings [A] cease
My [G] Comfor[D]ter, my [G] All in [A] All
[D] Here in the [G] love of [D] Christ [Em] I [D] stand`
  },
  {
    id: "4",
    title: "10,000 Reasons (Bless The Lord)",
    artist: "Matt Redman",
    key: "G",
    lang: "en",
    lyrics: `[G] Bless the Lord, O my [C] soul, [G] O my [D] soul,
[C] Worship His [G] holy [D] name.
Sing like [C] never be[G]fore, [C] O my [D] soul, [Em]
I'll [C] worship Your [D] holy [G] name.

The [C] sun comes [G] up, it's a [D] new day [Em] dawning;
[C] It's time to [G] sing Your [D] song a[Em]gain.
What[C]ever may [G] pass, and what[D]ever lies be[Em]fore me,
[C2] Let me be [G] singing when the [D] evening [G] comes.`
  },
  {
    id: "5",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    key: "G",
    lang: "en",
    lyrics: `[G] You were the Word at the beginning,
One with [C] God the Lord [Em] Most [D] High.
[Em] Your hidden glory [D] in cre[G]ation,
Now re[C]vealed in [Em] You our [D] Christ.

What a beautiful Name it [G] is,
What a beautiful Name it [D] is,
The Name of [Em] Jesus [D] Christ my [C] King.
What a beautiful Name it [G/B] is, nothing compares to [D] this,
What a beautiful Name it [Em] is, the [D] Name of [C] Jesus.`
  },
  {
    id: "6",
    title: "Cornerstone",
    artist: "Hillsong Worship",
    key: "C",
    lang: "en",
    lyrics: `[C] My hope is built on nothing less
Than [F] Jesus' blood and [G] righteousness.
I [Am] dare not trust the [Am/G] sweetest frame,
But [F] wholly [G] lean on [C] Jesus' name.

[F] Christ a[Am]lone, [G] Cornerstone,
[C/E] Weak made [F] strong in the [Am] Savior's [G] love.
Through the [C] storm, [F] He is [Am] Lord, Lord of [G] all.`
  },
  {
    id: "7",
    title: "Great Are You Lord",
    artist: "All Sons & Daughters",
    key: "G",
    lang: "en",
    lyrics: `[G] You give life, You are love,
You bring [C] light to the darkness.
[Em] You give hope, You restore
Every [C] heart that is broken.
[G] Great are You, Lord.

It's Your [C] breath in our [Em] lungs,
So we [D] pour out our praise, we pour out our praise.
It's Your [C] breath in our [Em] lungs,
So we [D] pour out our praise to You [G] only.`
  },
  {
    id: "8",
    title: "Yeshu Tera Naam Sabse Uncha Hai",
    artist: "Anil Kant",
    key: "G",
    lang: "hi",
    lyrics: `[G] Yeshu Tera Naam [C] sabse uncha hai
[Am] Sabse uncha hai, [D] sabse uncha hai
[G] Yeshu Tera Naam [C] sabse uncha hai
[Am] Sabse uncha hai, [D] sabse uncha hai [G]

[G] Beemari se shifa [C] milti hai
[Am] Paapon se mukti [D] milti hai
[G] Har ek shaitaan [C] kapta hai
[Am] Jab naam tera [D] liya jata hai [G]`
  },
  {
    id: "9",
    title: "Nanniyeode Njan Sthuthi Padidum",
    artist: "Malayalam Worship",
    key: "D",
    lang: "ml",
    lyrics: `[D] Nanniyeode njan [G] sthuthi padidum
[A] Ente yeshu nathane [D]
[D] Ennil nee cheytha [G] nanmakalkkai
[A] Innere nanni [D] parayunnu njan

[D] Aruliyathal [G] aashvasamame
[A] Kazhchayatal [D] vazhikalame
[D] Ente yeshu nathane [G] sthuthipadum njan
[A] Ee lokavazhiyil [D] thunayayathal`
  },
  {
    id: "10",
    title: "Yasou' Anta Maliki",
    artist: "Arabic Worship",
    key: "Em",
    lang: "ar",
    lyrics: `[Em] Yasou' anta [Am] maliki, wa [D] laho' stajaba [Em] salati
[Em] A'budo'ka ya [Am] ilahee, wa [D] a'ishoo le [Em] khidmateeka

[Em] Fi wasti'dh-dhulmati [Am] anta nooree
[D] Wa fi da'fee anta [Em] quwwatee
[Em] Haleluya, [Am] Haleluya, [D] a'budo'ka ya [Em] ilahee`
  }
];

export default function SongsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "en" | "hi" | "ml" | "ar">("all");
  const [selectedSong, setSelectedSong] = useState<Song | null>(SEED_SONGS[0]);
  const [showChords, setShowChords] = useState(true);

  // Filter songs
  const filteredSongs = SEED_SONGS.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.lyrics.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLang = selectedLanguage === "all" || song.lang === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  // Render lyrics processing the bracketed chords
  const renderLyrics = (lyrics: string) => {
    const isRtl = selectedSong?.lang === "ar";
    return lyrics.split("\n").map((line, lineIdx) => {
      // Find matches for [Chord]
      const matches = [...line.matchAll(/\[([A-Za-z0-9#b/]+)\]/g)];
      
      if (matches.length === 0 || !showChords) {
        // Render normal lyric line without chords
        const cleanLine = line.replace(/\[([A-Za-z0-9#b/]+)\]/g, "");
        return (
          <p 
            key={lineIdx} 
            className={cn(
              "font-body text-ivory/90 text-base py-1 leading-relaxed min-h-[1.5rem]",
              isRtl ? "text-right" : "text-left"
            )}
            dir={isRtl ? "rtl" : "ltr"}
          >
            {cleanLine || "\u00A0"}
          </p>
        );
      }

      // We have chords! To display them beautifully, we can render a "chord row" stacked on top of the "lyrics row"
      let lyricLine = "";
      const chordLineElements: { chord: string; index: number }[] = [];
      let offset = 0;

      // Clean line for printing while keeping track of indices
      let cleanText = "";
      let lastIndex = 0;

      line.split(/(\[[A-Za-z0-9#b/]+\])/).forEach((part) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          const chordName = part.substring(1, part.length - 1);
          chordLineElements.push({
            chord: chordName,
            index: cleanText.length
          });
        } else {
          cleanText += part;
        }
      });

      return (
        <div key={lineIdx} className={cn("py-1 relative font-mono select-text", isRtl ? "text-right" : "text-left")} dir={isRtl ? "rtl" : "ltr"}>
          {/* Chords line */}
          <div className={cn("text-sacred font-bold text-xs h-4 select-none relative flex flex-row", isRtl ? "justify-end" : "justify-start")}>
            {/* Render spacers to align chords with words */}
            {chordLineElements.map((item, chordIdx) => {
              const spacesBefore = chordIdx === 0 
                ? item.index 
                : item.index - chordLineElements[chordIdx - 1].index - chordLineElements[chordIdx - 1].chord.length;
              
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
          {/* Lyrics line */}
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
            <SectionHeader
              eyebrow={t("nav_songs")}
              title={t("songs_title")}
              titleHighlight={t("songs_title_highlight")}
              subtitle={t("songs_subtitle")}
            />
            <p className="font-body text-fog italic text-sm mt-3 max-w-2xl mx-auto">
              "{t("songs_scripture")}"
            </p>
            <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
              {t("songs_scripture_ref")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Left Sidebar List */}
            <div className="space-y-6">
              <GlassCard className="p-5 border border-white/5 bg-surface-1 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("songs_search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                  />
                  <Search className="absolute left-3.5 top-3.5 text-fog" size={16} />
                </div>

                {/* Language Filters */}
                <div className="flex gap-1 p-1 glass rounded-xl text-xs font-label">
                  {[
                    { id: "all", label: t("songs_filter_all") },
                    { id: "en", label: "EN" },
                    { id: "hi", label: "HI" },
                    { id: "ml", label: "ML" },
                    { id: "ar", label: "AR" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedLanguage(btn.id as any)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-center transition-all",
                        selectedLanguage === btn.id
                          ? "bg-sacred text-midnight font-bold"
                          : "text-fog hover:text-ivory"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                      <button
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                          selectedSong?.id === song.id
                            ? "bg-sacred/10 border-sacred text-sacred"
                            : "glass border-white/5 hover:border-white/20 text-fog hover:text-ivory"
                        }`}
                      >
                        <div className="truncate">
                          <h4 className="font-heading font-bold text-sm text-ivory truncate">{song.title}</h4>
                          <span className="font-body text-xs text-fog/75 block mt-0.5">{song.artist}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-label font-semibold rounded bg-white/5 border border-white/10 text-sacred">
                            {t("songs_key_label")} {song.key}
                          </span>
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

            {/* Right Main Viewer Panel */}
            <div className="lg:col-span-2">
              {selectedSong ? (
                <GlassCard className="p-8 md:p-10 border border-white/10 bg-surface-1 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
                  {/* Song Meta Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-5 mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sacred/15 flex items-center justify-center shrink-0">
                        <Music size={20} className="text-sacred" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-ivory">
                          {selectedSong.title}
                        </h2>
                        <p className="font-body text-sm text-fog">{t("songs_by")} {selectedSong.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Guitar Chords toggle */}
                      <button
                        onClick={() => setShowChords(!showChords)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-label transition-all ${
                          showChords
                            ? "bg-sacred text-midnight border-transparent font-bold"
                            : "glass border-white/10 text-fog hover:text-ivory"
                        }`}
                      >
                        <Guitar size={14} /> {showChords ? t("songs_chords_on") : t("songs_chords_off")}
                      </button>

                      <div className="px-3 py-1.5 rounded-xl bg-surface-2 border border-white/5">
                        <span className="font-label text-xs text-fog">{t("songs_key_label")} </span>
                        <span className="font-label text-xs text-sacred font-bold">{selectedSong.key}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Song Lyrics Section */}
                  <div className="overflow-x-auto select-text py-4 whitespace-pre-wrap max-w-full bg-surface-2/20 p-6 rounded-2xl border border-white/5">
                    <div className="space-y-4">
                      {renderLyrics(selectedSong.lyrics)}
                    </div>
                  </div>

                  {/* Help Info Footer */}
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
