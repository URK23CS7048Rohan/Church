"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { ChevronLeft, Search, BookOpen, Bookmark, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const OLD_TESTAMENT = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth"];
const NEW_TESTAMENT = ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians"];

export function NativeBible() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"OT" | "NT">("NT");

  const books = activeTab === "OT" ? OLD_TESTAMENT : NEW_TESTAMENT;

  return (
    <NativePageWrapper title="Bible">
      <div className="min-h-screen bg-[#080812] text-[#F0EDE8] flex flex-col">
        
        {/* Header */}
        <header className="px-5 pt-14 pb-4 sticky top-0 z-20 bg-[rgba(8,8,18,0.85)] backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "22px", letterSpacing: "0.1em" }}>
              HOLY BIBLE
            </h1>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
              <Search size={18} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-sacred/10 border border-sacred/20 text-sacred">
              <Clock size={14} />
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 600 }}>Reading Plan: Day 42</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-fog">
              <Bookmark size={14} />
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 600 }}>12 Bookmarks</span>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 pt-4 pb-20">
          
          {/* Continue Reading Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-[24px] p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1A1A24, #0A0A0F)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen size={80} /></div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>Continue Reading</p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>John 3</h2>
            <p style={{ fontFamily: "var(--font-lato)", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>"For God so loved the world..."</p>
            <button className="px-5 py-2.5 rounded-full bg-sacred text-black" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 700 }}>RESUME</button>
          </motion.div>

          {/* Tabs */}
          <div className="flex p-1 rounded-xl bg-white/5 mb-6">
            <button 
              onClick={() => setActiveTab("OT")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "OT" ? "bg-white/10 text-white shadow-sm" : "text-fog"}`}
            >
              Old Testament
            </button>
            <button 
              onClick={() => setActiveTab("NT")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "NT" ? "bg-white/10 text-white shadow-sm" : "text-fog"}`}
            >
              New Testament
            </button>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 gap-3">
            {books.map((book, i) => (
              <motion.div
                key={book}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-sacred/10 text-sacred flex items-center justify-center font-bold text-xs">
                  {book.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", fontWeight: 600 }}>{book}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </NativePageWrapper>
  );
}
