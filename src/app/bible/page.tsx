"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookOpen, Book, ChevronRight, ChevronLeft, Type, Search, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BOOKS_OF_BIBLE = [
  // Old Testament
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", 
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", 
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", 
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  // New Testament
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", 
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", 
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const BOOK_CODE_MAP: Record<string, string> = {
  Genesis: "GEN", Exodus: "EXO", Leviticus: "LEV", Numbers: "NUM", Deuteronomy: "DEU",
  Joshua: "JOS", Judges: "JDG", Ruth: "RUT", "1 Samuel": "1SA", "2 Samuel": "2SA",
  "1 Kings": "1KI", "2 Kings": "2KI", "1 Chronicles": "1CH", "2 Chronicles": "2CH",
  Ezra: "EZR", Nehemiah: "NEH", Esther: "EST", Job: "JOB", Psalms: "PSA", Proverbs: "PRO",
  Ecclesiastes: "ECC", "Song of Solomon": "SNG", Isaiah: "ISA", Jeremiah: "JER",
  Lamentations: "LAM", Ezekiel: "EZK", Daniel: "DAN", Hosea: "HOS", Joel: "JOL",
  Amos: "AMO", Obadiah: "OBD", Jonah: "JON", Micah: "MIC", Nahum: "NAM", Habakkuk: "HAB",
  Zephaniah: "ZEP", Haggai: "HAG", Zechariah: "ZEC", Malachi: "MAL",
  Matthew: "MAT", Mark: "MRK", Luke: "LUK", John: "JHN", Acts: "ACT", Romans: "ROM",
  "1 Corinthians": "1CO", "2 Corinthians": "2CO", Galatians: "GAL", Ephesians: "EPH",
  Philippians: "PHP", Colossians: "COL", "1 Thessalonians": "1TH", "2 Thessalonians": "2TH",
  "1 Timothy": "1TM", "2 Timothy": "2TM", Titus: "TIT", Philemon: "PHM", Hebrews: "HEB",
  James: "JAS", "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JO", "2 John": "2JO",
  "3 John": "3JO", Jude: "JUD", Revelation: "REV"
};

const TRANSLATIONS = [
  { id: "ENGWEBP", name: "World English Bible (WEB)" },
  { id: "BSB", name: "Berean Standard Bible (BSB)" },
  { id: "HINIRV", name: "हिन्दी इंडियन रिवाइज्ड वर्जन (IRV)" },
  { id: "mal_irv", name: "മലയാളം ഇന്ത്യൻ റിവൈസ്ഡ് വേർഷൻ (IRV)" },
  { id: "ARBNAV", name: "العربية كتاب الحياة (NAV)" },
];

const CHAPTERS_COUNT: Record<string, number> = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34, Joshua: 24, Judges: 21, Ruth: 4,
  "1 Samuel": 31, "2 Samuel": 24, "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, Ezra: 10, Nehemiah: 13,
  Esther: 10, Job: 42, Psalms: 150, Proverbs: 31, Ecclesiastes: 12, "Song of Solomon": 8, Isaiah: 66, Jeremiah: 52,
  Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7,
  Nahum: 3, Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4,
  Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16, "1 Corinthians": 16, "2 Corinthians": 13,
  Galatians: 6, Ephesians: 6, Philippians: 4, Colossians: 4, "1 Thessalonians": 5, "2 Thessalonians": 3,
  "1 Timothy": 6, "2 Timothy": 4, Titus: 3, Philemon: 1, Hebrews: 13, James: 5, "1 Peter": 5, "2 Peter": 3,
  "1 John": 5, "2 John": 1, "3 John": 1, Jude: 1, Revelation: 22
};

interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function BiblePage() {
  const { t, language } = useLanguage();
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [selectedTranslation, setSelectedTranslation] = useState("ENGWEBP");
  const [fontSize, setFontSize] = useState("text-base"); // text-sm, text-base, text-lg, text-xl
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Verse[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const totalChapters = CHAPTERS_COUNT[selectedBook] || 1;

  // Auto-align selected translation with the site language selection
  useEffect(() => {
    if (language === "hi") {
      setSelectedTranslation("HINIRV");
    } else if (language === "ml") {
      setSelectedTranslation("mal_irv");
    } else if (language === "ar") {
      setSelectedTranslation("ARBNAV");
    } else {
      setSelectedTranslation("ENGWEBP");
    }
  }, [language]);

  const fetchChapter = useCallback(async (book: string, chapter: number, translation: string) => {
    setLoading(true);
    setError(null);
    try {
      const bookCode = BOOK_CODE_MAP[book] || "JHN";
      const url = `https://bible.helloao.org/api/${translation}/${bookCode}/${chapter}.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Could not retrieve scripture text.");
      const data = await res.json();
      
      const helloAOVerses = data.chapter?.content || [];
      const formattedVerses = helloAOVerses
        .filter((node: any) => node.type === "verse")
        .map((node: any) => {
          const text = node.content
            .map((part: any) => {
              if (typeof part === "string") return part;
              if (part && typeof part === "object") return part.text || "";
              return "";
            })
            .join("");
          return {
            book_id: bookCode,
            book_name: book,
            chapter: chapter,
            verse: node.number,
            text: text
          };
        });
      
      setVerses(formattedVerses);
    } catch (err) {
      console.error(err);
      setError("Failed to load scripture text. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChapter(selectedBook, selectedChapter, selectedTranslation);
  }, [selectedBook, selectedChapter, selectedTranslation, fetchChapter]);

  const handleNextChapter = () => {
    if (selectedChapter < totalChapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      // Go to next book
      const currentBookIdx = BOOKS_OF_BIBLE.indexOf(selectedBook);
      if (currentBookIdx < BOOKS_OF_BIBLE.length - 1) {
        const nextBook = BOOKS_OF_BIBLE[currentBookIdx + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      // Go to prev book
      const currentBookIdx = BOOKS_OF_BIBLE.indexOf(selectedBook);
      if (currentBookIdx > 0) {
        const prevBook = BOOKS_OF_BIBLE[currentBookIdx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(CHAPTERS_COUNT[prevBook] || 1);
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchError(null);
    try {
      const regex = /^([1-3]?\s*[A-Za-z\s]+)\s+(\d+)[:\s]+(\d+)/i;
      const match = searchQuery.match(regex);
      if (!match) {
        throw new Error("Could not parse reference. Please use format like 'John 3:16' or 'Genesis 1:1'");
      }
      
      const parsedBookInput = match[1].trim().toLowerCase();
      const chapter = parseInt(match[2]);
      const verseNum = parseInt(match[3]);
      
      const matchedBook = BOOKS_OF_BIBLE.find(b => {
        const lowerB = b.toLowerCase();
        return lowerB === parsedBookInput || lowerB.startsWith(parsedBookInput) || parsedBookInput.startsWith(lowerB.substring(0, 3));
      });
      
      if (!matchedBook) {
        throw new Error(`Could not find book matching "${match[1]}".`);
      }
      
      const bookCode = BOOK_CODE_MAP[matchedBook];
      const url = `https://bible.helloao.org/api/${selectedTranslation}/${bookCode}/${chapter}.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Could not find the requested chapter.");
      const data = await res.json();
      
      const helloAOVerses = data.chapter?.content || [];
      const formattedVerses = helloAOVerses
        .filter((node: any) => node.type === "verse" && node.number === verseNum)
        .map((node: any) => {
          const text = node.content
            .map((part: any) => {
              if (typeof part === "string") return part;
              if (part && typeof part === "object") return part.text || "";
              return "";
            })
            .join("");
          return {
            book_id: bookCode,
            book_name: matchedBook,
            chapter: chapter,
            verse: node.number,
            text: text
          };
        });
        
      if (formattedVerses.length === 0) {
        throw new Error(`Verse ${verseNum} not found in ${matchedBook} ${chapter}.`);
      }
      
      setSearchResults(formattedVerses);
    } catch (err: any) {
      setSearchError(err.message || "Failed to search.");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const isRtlTranslation = selectedTranslation === "ARBNAV";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 lg:pb-0 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <SectionHeader
              eyebrow={t("nav_bible")}
              title={t("bible_title")}
              titleHighlight={t("bible_title_highlight")}
              subtitle={t("bible_subtitle")}
            />
            <p className="font-body text-fog italic text-sm mt-3 max-w-2xl mx-auto">
              "{t("bible_scripture")}"
            </p>
            <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
              {t("bible_scripture_ref")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
            {/* Left Controls Bar */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-5 space-y-5 border border-white/5 bg-surface-1">
                <h3 className="font-heading text-lg font-bold text-ivory flex items-center gap-2">
                  <Book size={18} className="text-sacred" /> {t("bible_reader_setup")}
                </h3>

                {/* Translation Selection */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">{t("bible_translation_label")}</label>
                  <select
                    value={selectedTranslation}
                    onChange={(e) => setSelectedTranslation(e.target.value)}
                    className="w-full glass bg-midnight text-ivory px-3 py-2 rounded-xl text-sm font-body border border-white/10 focus:border-sacred outline-none"
                  >
                    {TRANSLATIONS.map((t) => (
                      <option key={t.id} value={t.id} className="bg-surface-2">{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Book Selection */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">{t("bible_book_label")}</label>
                  <select
                    value={selectedBook}
                    onChange={(e) => {
                      setSelectedBook(e.target.value);
                      setSelectedChapter(1);
                    }}
                    className="w-full glass bg-midnight text-ivory px-3 py-2 rounded-xl text-sm font-body border border-white/10 focus:border-sacred outline-none"
                  >
                    {BOOKS_OF_BIBLE.map((b) => (
                      <option key={b} value={b} className="bg-surface-2">{b}</option>
                    ))}
                  </select>
                </div>

                {/* Chapter Selection */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">{t("bible_chapter_label")}</label>
                  <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => (
                      <button
                        key={ch}
                        onClick={() => setSelectedChapter(ch)}
                        className={`py-1.5 text-xs font-label rounded-lg transition-all border ${
                          selectedChapter === ch
                            ? "bg-gradient-gold text-midnight border-transparent font-bold"
                            : "glass hover:border-sacred/40 text-fog hover:text-ivory"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Formatting Controls */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Type size={12} className="text-sacred" /> {t("bible_text_size_label")}
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: "text-sm", name: "SM" },
                      { id: "text-base", name: "MD" },
                      { id: "text-lg", name: "LG" },
                      { id: "text-xl", name: "XL" },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        onClick={() => setFontSize(sz.id)}
                        className={`py-1 text-xs font-label rounded-lg transition-all ${
                          fontSize === sz.id
                            ? "bg-sacred/20 border border-sacred text-sacred font-bold"
                            : "glass border border-white/5 hover:border-white/20 text-fog"
                        }`}
                      >
                        {sz.name}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Passage/Verse Search */}
              <GlassCard className="p-5 space-y-4 border border-white/5 bg-surface-1">
                <h3 className="font-heading text-lg font-bold text-ivory flex items-center gap-2">
                  <Search size={18} className="text-sacred" /> {t("bible_lookup_title")}
                </h3>
                <form onSubmit={handleSearch} className="space-y-2">
                  <input
                    type="text"
                    placeholder={t("bible_lookup_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glass bg-midnight text-ivory px-3 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                  />
                  <Button type="submit" size="sm" className="w-full">
                    {searching ? t("bible_searching") : t("bible_lookup_btn")}
                  </Button>
                </form>

                {searchError && (
                  <div className="flex gap-2 text-xs text-ember bg-ember/15 p-3 rounded-xl border border-ember/20">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <p>{searchError}</p>
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="mt-4 border-t border-white/5 pt-4 space-y-3 max-h-60 overflow-y-auto">
                    <h4 className="font-label text-xs font-semibold text-sacred tracking-wider">{t("bible_results_label")}</h4>
                    {searchResults.map((result, idx) => (
                      <div key={idx} className="text-xs bg-surface-2/40 p-2.5 rounded-xl border border-white/5">
                        <span className="font-bold text-sacred">
                          {result.book_name} {result.chapter}:{result.verse}
                        </span>
                        <p className="font-display italic text-fog mt-1">{result.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Right Scripture Display Panel */}
            <div className="lg:col-span-3">
              <GlassCard className="p-8 md:p-12 border border-white/10 bg-surface-1 shadow-[0_12px_48px_rgba(0,0,0,0.5)] min-h-[500px] flex flex-col">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-5 mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sacred/15 flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-sacred" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-ivory">
                        {selectedBook} {selectedChapter}
                      </h2>
                      <span className="font-label text-xs text-fog uppercase tracking-wider">
                        {TRANSLATIONS.find((t) => t.id === selectedTranslation)?.name}
                      </span>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevChapter}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-fog hover:text-ivory hover:border-sacred/40 transition-colors"
                      title="Previous Chapter"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNextChapter}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-fog hover:text-ivory hover:border-sacred/40 transition-colors"
                      title="Next Chapter"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Main Scripture Text */}
                <div className="flex-grow">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-sacred border-t-transparent animate-spin" />
                      <p className="font-label text-sm text-fog">{t("bible_loading")}</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-6 bg-ember/5 rounded-2xl border border-ember/10">
                      <AlertCircle size={36} className="text-ember mb-3" />
                      <p className="font-body text-fog max-w-sm mb-4">{error}</p>
                      <Button onClick={() => fetchChapter(selectedBook, selectedChapter, selectedTranslation)} size="sm">
                        {t("bible_retry")}
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className={cn(
                        fontSize, 
                        "font-display leading-relaxed text-ivory/90 space-y-4 max-w-3xl mx-auto",
                        isRtlTranslation ? "text-right" : "text-left"
                      )}
                      dir={isRtlTranslation ? "rtl" : "ltr"}
                    >
                      {verses.map((v) => (
                        <span key={v.verse} className={cn("inline group relative", isRtlTranslation ? "ml-2" : "mr-2")}>
                          <sup className="font-label text-[10px] font-bold text-sacred mr-1 select-none">
                            {v.verse}
                          </sup>
                          <span className="hover:text-ivory transition-colors duration-150 inline">
                            {v.text}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer nav */}
                <div className="border-t border-white/5 pt-6 mt-12 flex justify-between items-center text-xs font-label text-fog">
                  <span>{t("bible_footer_hint")}</span>
                  <div className="flex gap-4">
                    <button onClick={handlePrevChapter} className="hover:text-sacred transition-colors flex items-center gap-1">
                      <ChevronLeft size={14} /> {t("bible_prev")}
                    </button>
                    <button onClick={handleNextChapter} className="hover:text-sacred transition-colors flex items-center gap-1">
                      {t("bible_next")} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
