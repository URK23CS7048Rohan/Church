"use client";

import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { BeliefsSection } from "@/components/home/BeliefsSection";
import { WelcomeAndMarquee } from "@/components/home/WelcomeAndMarquee";
import { QuickActions } from "@/components/home/QuickActions";
import { LiveWidget } from "@/components/home/LiveWidget";
import { SermonPreview } from "@/components/home/SermonPreview";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { PrayerPreview } from "@/components/home/PrayerPreview";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Bell, Images, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NATIVE_SLIDES = [
  { id: "1", src: "/church-photos/main-prayer.jpeg", title: "Power of Prayer", desc: "A blessed session of intercession and faith." },
  { id: "2", src: "/church-photos/church-photo-1.jpeg", title: "Sacred Praise", desc: "Congregational worship in spirit and truth." },
  { id: "3", src: "/church-photos/church-photo-3.jpeg", title: "Worship Team", desc: "Ministering in music and dynamic praise." },
  { id: "4", src: "/church-photos/church-photo-5.jpeg", title: "Home Fellowships", desc: "Growing in discipleship and brotherly love." },
  { id: "5", src: "/church-photos/church-photo-7.jpeg", title: "Youth Fellowship", desc: "Guiding and uplifting the next generation." },
];

export function NativeHome() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } }
  };

  return (
    <div className="min-h-screen bg-black text-ivory pb-24 overflow-x-hidden relative">
      {/* Radiant Gold Halo background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[350px] pointer-events-none z-0 opacity-40 blur-[80px]"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.25) 0%, transparent 75%)"
        }}
      />

      {/* App Header */}
      <motion.header 
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 13 }}
        className="sticky top-0 z-50 bg-black/85 backdrop-blur-lg border-b border-white/5 pt-safe-top"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <span className="font-accent text-2xl font-bold bg-gradient-to-r from-sacred via-sacred-light to-sacred bg-clip-text text-transparent tracking-widest uppercase">✦ Agape</span>
            <p className="font-body text-fog/60 text-[9px] tracking-widest mt-0.5 uppercase">Where Your Faith Lives</p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl bg-[#14141E] border border-white/10 flex items-center justify-center text-ivory relative hover:border-sacred/30 transition-colors"
          >
            <Bell size={18} className="text-sacred" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 animate-live"></span>
          </motion.button>
        </div>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-9 pt-0 relative z-10"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <HeroSection />
        </motion.div>

        {/* We Believe Section */}
        <motion.div variants={itemVariants}>
          <BeliefsSection />
        </motion.div>

        {/* Quick Actions (Optimized for Mobile Grid) */}
        <motion.div variants={itemVariants} className="px-4">
          <QuickActions />
        </motion.div>

        {/* Welcome & Marquee banner */}
        <motion.div variants={itemVariants}>
          <WelcomeAndMarquee />
        </motion.div>

        {/* Live Widget */}
        <motion.div variants={itemVariants} className="px-4">
          <LiveWidget />
        </motion.div>

        {/* Real Church Photos Slider (Fluid Scroll Horizontal) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Images size={16} className="text-sacred" />
              <h3 className="font-heading text-lg font-bold text-ivory">Church Life</h3>
            </div>
            <Link href="/community" className="font-label text-xs text-sacred hover:text-sacred-light transition-colors uppercase tracking-wider">
              Gallery →
            </Link>
          </div>

          <div className="overflow-x-auto flex gap-4 px-5 pb-4 scrollbar-hide snap-x snap-mandatory">
            {NATIVE_SLIDES.map((slide) => (
              <motion.div
                key={slide.id}
                whileTap={{ scale: 0.98 }}
                className="w-[280px] shrink-0 bg-[#14141E] rounded-2xl overflow-hidden border border-white/5 snap-start shadow-xl flex flex-col relative group"
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                </div>
                <div className="p-4 flex flex-col gap-1 bg-gradient-to-b from-[#14141E] to-[#0D0D14]">
                  <h4 className="font-heading text-sm font-bold text-ivory flex items-center gap-1.5">
                    <Sparkles size={12} className="text-sacred" />
                    {slide.title}
                  </h4>
                  <p className="font-body text-xs text-fog/80 leading-normal">{slide.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content sections with their original containers but wrapped in a dark theme override */}
        <motion.div variants={itemVariants} className="[&>section]:bg-transparent [&>section]:py-2">
          <SermonPreview />
        </motion.div>

        <motion.div variants={itemVariants} className="[&>section]:bg-transparent [&>section]:py-2">
          <EventsTeaser />
        </motion.div>

        <motion.div variants={itemVariants} className="[&>section]:bg-transparent [&>section]:py-2">
          <PrayerPreview />
        </motion.div>
      </motion.main>
      <MobileBottomNav />
    </div>
  );
}

