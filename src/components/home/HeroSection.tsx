"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ChevronDown, Play, Headset } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const LIGHT_RAYS = [
  { angle: -25, left: "15%", opacity: 0.08 },
  { angle: -12, left: "30%", opacity: 0.05 },
  { angle: 0, left: "50%", opacity: 0.1 },
  { angle: 12, left: "70%", opacity: 0.05 },
  { angle: 25, left: "85%", opacity: 0.08 },
];

interface HeroSectionProps {
  isLive?: boolean;
}

export function HeroSection({ isLive = false }: HeroSectionProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state — everything invisible
      gsap.set(raysRef.current, { opacity: 0 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set(headlineRef.current, { opacity: 0, y: 30 });
      gsap.set(sublineRef.current, { opacity: 0, y: 15 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Light rays stagger
      tl.to(raysRef.current, {
        opacity: (i: number) => LIGHT_RAYS[i].opacity,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.1,
      });

      // 2. Eyebrow
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.9");

      // 3. Headline
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

      // 4. Subline
      tl.to(sublineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

      // 5. CTA buttons
      tl.to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3");

      // 6. Scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, "-=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] pt-20 flex flex-col items-center justify-center overflow-hidden bg-[#0F1E15] text-[#FAF8F5]"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 30, 21, 0.78), rgba(15, 30, 21, 0.88)), url('https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      aria-label="Hero"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(143,140,61,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Light rays */}
      {LIGHT_RAYS.map((ray, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) raysRef.current[i] = el;
          }}
          className="ray absolute top-0 w-0.5 h-[75vh] pointer-events-none"
          style={{
            left: ray.left,
            transform: `rotate(${ray.angle}deg)`,
            width: "1px",
          }}
        />
      ))}

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-8">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-6">
          <span className="font-label text-xs text-[#C5B48D] tracking-[0.25em] uppercase font-bold">
            {t("hero_welcome")}
          </span>
        </div>

        {/* Main headline */}
        <h1 
          ref={headlineRef} 
          className="font-heading text-[clamp(38px,6.5vw,76px)] font-bold leading-[1.15] mb-6 text-[#FAF8F5] max-w-4xl tracking-tight"
          dangerouslySetInnerHTML={{ __html: t("hero_headline_html") }}
        />

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-[#FAF8F5]/80 text-base md:text-lg max-w-2xl leading-relaxed mb-8"
        >
          {t("hero_subline")}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <Link href="/live">
            <button
              className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#8F8C3D] hover:bg-[#A3A04E] text-[#0F1E15] font-label font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-md group"
              id="hero-watch-live-btn"
            >
              <Headset size={16} />
              {t("hero_cta_listen")} →
            </button>
          </Link>

          <Link href="/connect">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#FAF8F5]/20 text-[#FAF8F5] hover:border-[#FAF8F5]/50 hover:bg-[#FAF8F5]/5 font-label font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300"
              id="hero-new-here-btn"
            >
              {t("hero_cta_new")}
            </button>
          </Link>

          <Link href="/ride?request=true">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C5B48D]/40 text-[#C5B48D] hover:border-[#C5B48D] hover:bg-[#C5B48D]/5 font-label font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300"
              id="hero-need-ride-btn"
            >
              {t("hero_cta_ride")}
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-accent text-[10px] text-[#C5B48D]/60 tracking-[0.4em] uppercase">
          {t("hero_scroll")}
        </span>
        <ChevronDown
          size={16}
          className="text-[#C5B48D]/50 animate-bounce-slow"
        />
      </div>
    </section>
  );
}
