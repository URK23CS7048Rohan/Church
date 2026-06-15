"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SCRIPTURE_KEYS = [
  "marquee_scripture_1",
  "marquee_scripture_2",
  "marquee_scripture_3",
  "marquee_scripture_4",
  "marquee_scripture_5",
];

export function WelcomeAndMarquee() {
  const { t } = useLanguage();

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Scrolling Marquee Scripture Banner */}
      <div className="bg-[#EBE3D5] py-4 border-y border-[#FAF8F5] relative flex items-center">
        <div className="flex whitespace-nowrap gap-16 animate-marquee">
          {/* First loop */}
          {SCRIPTURE_KEYS.map((key, idx) => (
            <span 
              key={`marquee-1-${idx}`} 
              className="font-display text-sm md:text-base font-semibold text-[#1A2E20] tracking-wide"
            >
              📖 {t(key)}
            </span>
          ))}
          {/* Second loop for seamless scroll */}
          {SCRIPTURE_KEYS.map((key, idx) => (
            <span 
              key={`marquee-2-${idx}`} 
              className="font-display text-sm md:text-base font-semibold text-[#1A2E20] tracking-wide"
            >
              📖 {t(key)}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Welcome from Pastor Banner with diagonal badges */}
      <div 
        className="w-full py-24 px-6 relative flex flex-col items-center justify-center text-center overflow-hidden bg-[#1A2E20]"
        style={{
          backgroundImage: "linear-gradient(rgba(26, 46, 32, 0.75), rgba(26, 46, 32, 0.85)), url('/church-photos/church-photo-6.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          {/* Badge Stickers */}
          <div className="flex gap-4 mb-6 transform -rotate-1">
            <span className="bg-[#3D548F] text-[#FAF8F5] font-label text-[10px] font-bold px-4 py-1.5 rounded uppercase tracking-wider shadow-md transform -rotate-3 border border-white/10">
              {t("welcome_badge_hope")}
            </span>
            <span className="bg-[#8F8C3D] text-[#FAF8F5] font-label text-[10px] font-bold px-4 py-1.5 rounded uppercase tracking-wider shadow-md transform rotate-3 border border-white/10">
              {t("welcome_badge_faith")}
            </span>
          </div>

          {/* Heading */}
          <h2 
            className="font-heading text-3xl md:text-5xl font-extrabold text-[#FAF8F5] tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: t("welcome_headline_html") }}
          />
          
          <p className="font-body text-[#FAF8F5]/80 text-sm max-w-lg mt-4 leading-relaxed">
            {t("welcome_description")}
          </p>
        </div>
      </div>
    </div>
  );
}
