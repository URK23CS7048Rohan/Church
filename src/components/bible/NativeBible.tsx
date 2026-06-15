"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKS_OF_BIBLE, BOOK_CODE_MAP, TRANSLATIONS, CHAPTERS_COUNT, Verse } from "@/lib/bibleData";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChevronLeft, ChevronRight, Settings2, BookOpen } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function NativeBible() {
  const { t, language } = useLanguage();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState("ENGWEBP");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"books" | "chapters" | "reader">("books");

  // Auto-align translation
  useEffect(() => {
    if (language === "hi") setSelectedTranslation("HINIRV");
    else if (language === "ml") setSelectedTranslation("mal_irv");
    else if (language === "ar") setSelectedTranslation("ARBNAV");
    else setSelectedTranslation("ENGWEBP");
  }, [language]);

  const fetchChapter = useCallback(async (book: string, chapter: number, translation: string) => {
    setLoading(true);
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
          return { book_id: bookCode, book_name: book, chapter, verse: node.number, text };
        });
      
      setVerses(formattedVerses);
    } catch (err) {
      console.error(err);
      setVerses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === "reader" && selectedBook) {
      fetchChapter(selectedBook, selectedChapter, selectedTranslation);
    }
  }, [view, selectedBook, selectedChapter, selectedTranslation, fetchChapter]);

  const handleBookSelect = (book: string) => {
    setSelectedBook(book);
    setView("chapters");
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setView("reader");
  };

  const handleBack = () => {
    if (view === "reader") setView("chapters");
    else if (view === "chapters") setView("books");
  };

  const isRtl = selectedTranslation === "ARBNAV";

  return (
    <div className="min-h-screen pb-28 overflow-hidden relative" style={{ background:"#080812", color:"#F0EDE8" }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background:"radial-gradient(circle at 50% -20%, rgba(126, 184, 247, 0.15), transparent 60%)" }} />

      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 flex items-center justify-between" style={{ background:"rgba(8,8,18,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {view !== "books" && (
              <motion.button initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
                onClick={handleBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 active:scale-95 transition-transform">
                <ChevronLeft size={20} color="#7EB8F7" />
              </motion.button>
            )}
          </AnimatePresence>
          <div>
            <h1 style={{ fontFamily:"var(--font-playfair)", fontSize:"22px", color:"white", lineHeight:1.1 }}>
              {view === "books" ? "Holy Bible" : view === "chapters" ? selectedBook : `${selectedBook} ${selectedChapter}`}
            </h1>
            <p style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
              {TRANSLATIONS.find(t => t.id === selectedTranslation)?.name || "Translation"}
            </p>
          </div>
        </div>
        {view === "books" && (
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 active:scale-95">
            <Settings2 size={18} color="rgba(255,255,255,0.6)" />
          </button>
        )}
      </header>

      <main className="relative z-10 px-4 pt-6 pb-20 h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === "books" && (
            <motion.div key="books" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="grid grid-cols-2 gap-3">
              {BOOKS_OF_BIBLE.map((book, i) => {
                const isNT = i >= 39;
                return (
                  <motion.div key={book} whileTap={{ scale:0.96 }} onClick={() => handleBookSelect(book)}
                    className="relative overflow-hidden rounded-[20px] p-4 flex flex-col justify-end"
                    style={{ height: i % 3 === 0 ? "140px" : "110px", background: isNT ? "linear-gradient(135deg, #111118, #1a1a24)" : "linear-gradient(135deg, #0f0f14, #14141c)", border:"1px solid rgba(255,255,255,0.05)" }}>
                    <BookOpen size={24} className="absolute top-3 right-3 opacity-10" color={isNT ? "#7EB8F7" : "#C9A84C"} />
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily:"var(--font-inter)", color:isNT ? "#7EB8F7" : "#C9A84C" }}>
                      {isNT ? "New Testament" : "Old Testament"}
                    </span>
                    <h3 style={{ fontFamily:"var(--font-playfair)", fontSize:"18px", color:"white", lineHeight:1.1 }}>{book}</h3>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {view === "chapters" && selectedBook && (
            <motion.div key="chapters" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: CHAPTERS_COUNT[selectedBook] || 1 }, (_, i) => i + 1).map((ch) => (
                  <motion.button key={ch} whileTap={{ scale:0.9 }} onClick={() => handleChapterSelect(ch)}
                    className="aspect-square rounded-2xl flex items-center justify-center font-bold text-lg"
                    style={{ fontFamily:"var(--font-cormorant)", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(126, 184, 247, 0.15)", color:"white" }}>
                    {ch}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {view === "reader" && (
            <motion.div key="reader" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#7EB8F7] border-t-transparent animate-spin" />
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>Loading Word...</p>
                </div>
              ) : (
                <div className="space-y-6 px-1" dir={isRtl ? "rtl" : "ltr"}>
                  <h2 className="text-center mb-8" style={{ fontFamily:"var(--font-playfair)", fontSize:"32px", color:"#7EB8F7" }}>
                    Chapter {selectedChapter}
                  </h2>
                  {verses.map((v) => (
                    <div key={v.verse} className="flex gap-4">
                      <span className="shrink-0 pt-1.5" style={{ fontFamily:"var(--font-inter)", fontSize:"11px", fontWeight:700, color:"#7EB8F7", opacity:0.7 }}>
                        {v.verse}
                      </span>
                      <p style={{ fontFamily:"var(--font-cormorant)", fontSize:"22px", lineHeight:1.6, color:"#F0EDE8" }}>
                        {v.text}
                      </p>
                    </div>
                  ))}
                  
                  {/* Footer Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
                    <button 
                      onClick={() => selectedChapter > 1 && handleChapterSelect(selectedChapter - 1)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${selectedChapter > 1 ? "bg-white/5 active:scale-95" : "opacity-30"}`}>
                      <ChevronLeft size={16} /> <span style={{ fontFamily:"var(--font-inter)", fontSize:"12px" }}>Previous</span>
                    </button>
                    <button 
                      onClick={() => selectedChapter < (CHAPTERS_COUNT[selectedBook!] || 1) && handleChapterSelect(selectedChapter + 1)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${(selectedChapter < (CHAPTERS_COUNT[selectedBook!] || 1)) ? "bg-[#7EB8F7]/20 text-[#7EB8F7] active:scale-95" : "opacity-30"}`}>
                      <span style={{ fontFamily:"var(--font-inter)", fontSize:"12px", fontWeight:600 }}>Next</span> <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <MobileBottomNav />
    </div>
  );
}
