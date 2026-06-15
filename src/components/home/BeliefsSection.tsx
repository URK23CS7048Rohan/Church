"use client";

import React from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useLanguage } from "@/components/providers/LanguageProvider";

const BELIEFS_METADATA = [
  {
    titleKey: "beliefs_faith_title",
    descKey: "beliefs_faith_desc",
    image: "/church-photos/church-photo-4.jpeg",
  },
  {
    titleKey: "beliefs_healing_title",
    descKey: "beliefs_healing_desc",
    image: "/church-photos/main-prayer.jpeg",
  },
  {
    titleKey: "beliefs_community_title",
    descKey: "beliefs_community_desc",
    image: "/church-photos/church-photo-6.jpeg",
  },
];

export function BeliefsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 bg-midnight text-ivory border-b border-surface-3/30">
      <div className="max-w-5xl mx-auto text-center">
        {/* Subtitle */}
        <RevealOnScroll>
          <p className="font-display text-lg italic text-sacred mb-4">
            {t("beliefs_we_believe")}
          </p>
        </RevealOnScroll>

        {/* Headline */}
        <RevealOnScroll className="mb-16">
          <h2 
            className="font-heading text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto text-ivory tracking-tight"
            dangerouslySetInnerHTML={{ __html: t("beliefs_headline_html") }}
          />
        </RevealOnScroll>

        {/* Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {BELIEFS_METADATA.map((belief) => {
            const title = t(belief.titleKey);
            const description = t(belief.descKey);
            return (
              <RevealOnScroll 
                key={belief.titleKey} 
                className="flex flex-col items-center text-center group"
              >
                {/* Image Container with rounded top-pill shape or smooth rounded corners */}
                <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-surface-3/20 relative">
                  <img 
                    src={belief.image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3 text-ivory">
                  {title}
                </h3>
                <p className="font-body text-fog text-sm leading-relaxed max-w-xs">
                  {description}
                </p>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
