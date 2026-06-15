"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, MotionValue } from "framer-motion";
import {
  Bell, Search, Images, Sparkles, ChevronRight,
  Play, Heart, BookOpen, CalendarDays, Users, Radio,
  MapPin, Clock, ArrowUpRight, Flame, Star, Cross
} from "lucide-react";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useLanguage } from "@/components/providers/LanguageProvider";

// ─── DATA ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",       label: "All",       icon: Sparkles  },
  { id: "worship",   label: "Worship",   icon: Heart     },
  { id: "sermons",   label: "Sermons",   icon: BookOpen  },
  { id: "events",    label: "Events",    icon: CalendarDays },
  { id: "community", label: "Community", icon: Users     },
  { id: "live",      label: "Live",      icon: Radio     },
];

interface PinCard {
  id: string;
  src: string;
  category: string;
  title: string;
  desc: string;
  tag: string;
  height: "short" | "tall" | "med";
  meta?: string;
}

const PIN_CARDS: PinCard[] = [
  {
    id: "p1",
    src: "/church-photos/main-prayer.jpeg",
    category: "worship",
    title: "Power of Prayer",
    desc: "A blessed session of intercession and faith that moved mountains.",
    tag: "Worship",
    height: "tall",
    meta: "Sunday Service",
  },
  {
    id: "p2",
    src: "/church-photos/church-photo-1.jpeg",
    category: "community",
    title: "Sacred Praise",
    desc: "Congregational worship in spirit and truth.",
    tag: "Community",
    height: "med",
    meta: "Fellowship",
  },
  {
    id: "p3",
    src: "/church-photos/church-photo-3.jpeg",
    category: "worship",
    title: "Worship Team",
    desc: "Ministering in music and dynamic praise.",
    tag: "Worship",
    height: "short",
    meta: "Music Ministry",
  },
  {
    id: "p4",
    src: "/church-photos/church-photo-5.jpeg",
    category: "community",
    title: "Home Fellowships",
    desc: "Growing in discipleship and brotherly love.",
    tag: "Community",
    height: "tall",
    meta: "Cell Groups",
  },
  {
    id: "p5",
    src: "/church-photos/church-photo-7.jpeg",
    category: "events",
    title: "Youth Fellowship",
    desc: "Guiding and uplifting the next generation.",
    tag: "Events",
    height: "med",
    meta: "Youth Ministry",
  },
  {
    id: "p6",
    src: "/church-photos/church-photo-2.jpeg",
    category: "sermons",
    title: "The Living Word",
    desc: "Pastor's message on faith and perseverance.",
    tag: "Sermons",
    height: "short",
    meta: "Last Sunday",
  },
  {
    id: "p7",
    src: "/church-photos/church-photo-4.jpeg",
    category: "events",
    title: "Annual Retreat",
    desc: "Three days of renewal and spiritual refreshing.",
    tag: "Events",
    height: "tall",
    meta: "Coming Soon",
  },
  {
    id: "p8",
    src: "/church-photos/church-photo-6.jpeg",
    category: "community",
    title: "Outreach Day",
    desc: "Serving the neighbourhood with love and grace.",
    tag: "Community",
    height: "med",
    meta: "Outreach",
  },
  {
    id: "p9",
    src: "/church-photos/church-photo-8.jpeg",
    category: "worship",
    title: "Sunrise Devotion",
    desc: "Early morning prayer — where the day begins with God.",
    tag: "Worship",
    height: "short",
    meta: "Devotion",
  },
];

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "Sunday Celebration",
    time: "10:00 AM",
    date: "Every Sunday",
    location: "Main Sanctuary",
    color: "#C9A84C",
  },
  {
    id: "e2",
    title: "Youth Night",
    time: "7:00 PM",
    date: "This Friday",
    location: "Youth Hall",
    color: "#7C6FCD",
  },
  {
    id: "e3",
    title: "Prayer & Fasting",
    time: "6:00 AM",
    date: "Wednesday",
    location: "Prayer Room",
    color: "#5DA3A3",
  },
];

const QUICK_TILES = [
  { icon: Play,       label: "Sermons",  href: "/sermons",  bg: "from-[#1A1A2E] to-[#16213E]", accent: "#C9A84C" },
  { icon: Heart,      label: "Give",     href: "/give",     bg: "from-[#1A1A2E] to-[#16213E]", accent: "#E57373" },
  { icon: Radio,      label: "Live",     href: "/live",     bg: "from-[#1A1A2E] to-[#16213E]", accent: "#66BB6A" },
  { icon: CalendarDays, label: "Events", href: "/events",   bg: "from-[#1A1A2E] to-[#16213E]", accent: "#7C6FCD" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function heightClass(h: PinCard["height"]) {
  if (h === "tall") return "h-72";
  if (h === "med")  return "h-52";
  return "h-36";
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(60px)",
        opacity: 0.18,
      }}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.12, 1],
        opacity: [0.18, 0.28, 0.18],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function PinTile({ card, index }: { card: PinCard; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 16,
        delay: index * 0.07,
      }}
      whileTap={{ scale: 0.97 }}
      className="break-inside-avoid mb-3 group relative"
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl">
        {/* Image */}
        <div className={`relative ${heightClass(card.height)} overflow-hidden`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-active:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/90 via-[#080810]/20 to-transparent" />

          {/* Tag pill */}
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[9px] font-label font-semibold tracking-widest uppercase bg-black/60 backdrop-blur-md text-[#C9A84C] border border-[#C9A84C]/30 rounded-full px-2.5 py-1">
              {card.tag}
            </span>
          </div>

          {/* Like button */}
          <motion.button
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            whileTap={{ scale: 0.85 }}
            onTap={() => setLiked(!liked)}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={12} className={liked ? "fill-red-500 text-red-500" : "text-white/70"} />
            </motion.div>
          </motion.button>
        </div>

        {/* Text */}
        <div className="p-3 flex flex-col gap-1">
          <h4 className="font-heading text-xs font-bold text-white leading-tight">
            {card.title}
          </h4>
          {card.height !== "short" && (
            <p className="font-body text-[10px] text-white/50 leading-snug line-clamp-2">
              {card.desc}
            </p>
          )}
          {card.meta && (
            <span className="font-label text-[9px] text-[#C9A84C]/70 tracking-widest uppercase mt-0.5">
              {card.meta}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div ref={ref} className="relative h-[72vw] max-h-[340px] overflow-hidden rounded-b-[2.5rem]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/church-photos/main-prayer.jpeg"
          alt="Church hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col justify-end p-6"
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 backdrop-blur-sm rounded-full px-3 py-1 w-fit mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-label text-[10px] text-red-400 font-semibold tracking-widest uppercase">Live Now</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="font-accent text-3xl font-bold text-white leading-tight tracking-wide mb-1"
        >
          Where Faith
          <span className="block gold-shimmer">Comes Alive</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 80 }}
          className="font-body text-xs text-white/60 mb-4 tracking-wide"
        >
          Agape Church · Growing in Grace Together
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2"
        >
          <Link
            href="/live"
            className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-label text-xs font-bold tracking-wider uppercase rounded-full px-4 py-2.5 active:scale-95 transition-transform"
          >
            <Play size={12} className="fill-black" />
            Watch Live
          </Link>
          <Link
            href="/sermons"
            className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white font-label text-xs font-semibold rounded-full px-4 py-2.5 active:scale-95 transition-transform"
          >
            Sermons
            <ChevronRight size={12} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

function QuickActionGrid() {
  return (
    <div className="grid grid-cols-4 gap-2.5 px-4">
      {QUICK_TILES.map((tile, i) => (
        <motion.div
          key={tile.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 120 }}
        >
          <Link href={tile.href}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-2 bg-gradient-to-b ${tile.bg} border border-white/5 rounded-2xl p-3 active:opacity-80`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${tile.accent}22`, border: `1px solid ${tile.accent}33` }}
              >
                <tile.icon size={18} style={{ color: tile.accent }} />
              </div>
              <span className="font-label text-[10px] text-white/70 font-medium tracking-wide">{tile.label}</span>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function EventsStrip() {
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-[#C9A84C]" />
          <h3 className="font-heading text-sm font-bold text-white">Upcoming</h3>
        </div>
        <Link href="/events" className="font-label text-[10px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1">
          See all <ArrowUpRight size={11} />
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {UPCOMING_EVENTS.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, type: "spring", stiffness: 100 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3.5 bg-[#111118] border border-white/5 rounded-2xl p-3.5"
          >
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: `${ev.color}22`, border: `1px solid ${ev.color}33` }}
            >
              <CalendarDays size={16} style={{ color: ev.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs font-bold text-white truncate">{ev.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-label text-[9px] text-white/40 flex items-center gap-1">
                  <Clock size={9} /> {ev.time}
                </span>
                <span className="text-white/20">·</span>
                <span className="font-label text-[9px] text-white/40 flex items-center gap-1">
                  <MapPin size={9} /> {ev.location}
                </span>
              </div>
            </div>
            <div
              className="font-label text-[9px] font-semibold px-2 py-1 rounded-full"
              style={{ background: `${ev.color}22`, color: ev.color }}
            >
              {ev.date}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScriptureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80 }}
      className="mx-4 relative overflow-hidden rounded-3xl border border-[#C9A84C]/20"
      style={{
        background: "linear-gradient(135deg, #0D0D14 0%, #1A1400 50%, #0D0D14 100%)",
      }}
    >
      {/* Subtle cross watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Cross size={120} className="text-[#C9A84C]" />
      </div>

      <div className="relative z-10 p-6 text-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-3"
        >
          <Star size={18} className="text-[#C9A84C] fill-[#C9A84C]" />
        </motion.div>
        <p className="font-accent text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-3">
          Scripture of the Day
        </p>
        <blockquote className="font-heading text-base font-bold text-white leading-relaxed mb-3">
          &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        </blockquote>
        <cite className="font-label text-[10px] text-[#C9A84C]/60 tracking-widest not-italic">
          — Philippians 4:13
        </cite>
      </div>
    </motion.div>
  );
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 py-1"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(cat.id)}
            className="relative flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 border transition-colors duration-200"
            style={{
              background: isActive ? "#C9A84C" : "rgba(255,255,255,0.04)",
              borderColor: isActive ? "#C9A84C" : "rgba(255,255,255,0.08)",
              color: isActive ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            <cat.icon size={12} />
            <span className="font-label text-[11px] font-semibold tracking-wide">
              {cat.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="cat-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "#C9A84C", zIndex: -1 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function MasonryGrid({ cards }: { cards: PinCard[] }) {
  const col1 = cards.filter((_, i) => i % 2 === 0);
  const col2 = cards.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex gap-3 px-4">
      <div className="flex-1 flex flex-col">
        {col1.map((card, i) => (
          <PinTile key={card.id} card={card} index={i * 2} />
        ))}
      </div>
      <div className="flex-1 flex flex-col pt-6">
        {col2.map((card, i) => (
          <PinTile key={card.id} card={card} index={i * 2 + 1} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function NativeHome() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchVisible, setSearchVisible] = useState(false);
  const { t } = useLanguage();

  const filteredCards =
    activeCategory === "all"
      ? PIN_CARDS
      : PIN_CARDS.filter((c) => c.category === activeCategory);

  return (
    <div
      className="min-h-screen pb-28 overflow-x-hidden relative"
      style={{ background: "#080810", color: "#F0EDE8" }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingOrb x="10%" y="5%"  size={280} color="radial-gradient(circle, #C9A84C44, transparent)" delay={0} />
        <FloatingOrb x="60%" y="25%" size={220} color="radial-gradient(circle, #7C6FCD33, transparent)" delay={2} />
        <FloatingOrb x="0%"  y="55%" size={180} color="radial-gradient(circle, #5DA3A333, transparent)" delay={4} />
      </div>

      <div className="relative z-10">
        {/* ── Sticky Header ── */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className="sticky top-0 z-50 px-5 py-4 flex items-center justify-between"
          style={{
            background: "rgba(8,8,16,0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div>
            <span
              className="font-accent text-xl font-bold tracking-widest uppercase"
              style={{
                background: "linear-gradient(90deg, #C9A84C, #E8D48A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ✦ Agape
            </span>
            <p className="font-body text-[9px] tracking-widest mt-0.5 uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
              Where Your Faith Lives
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchVisible(!searchVisible)}
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <Search size={16} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center border relative"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </motion.button>
          </div>
        </motion.header>

        {/* ── Search Bar (slide in) ── */}
        <AnimatePresence>
          {searchVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              className="overflow-hidden px-4 pt-0 pb-3"
              style={{ background: "rgba(8,8,16,0.95)" }}
            >
              <input
                type="text"
                placeholder="Search sermons, events, prayers…"
                className="w-full text-xs font-body rounded-xl px-4 py-3 outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0EDE8",
                }}
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero Parallax ── */}
        <HeroParallax />

        {/* ── Quick Actions ── */}
        <div className="mt-6">
          <QuickActionGrid />
        </div>

        {/* ── Scripture Card ── */}
        <div className="mt-7">
          <ScriptureCard />
        </div>

        {/* ── Upcoming Events ── */}
        <div className="mt-8">
          <EventsStrip />
        </div>

        {/* ── Gallery Section Header ── */}
        <div className="mt-9 px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Images size={14} style={{ color: "#C9A84C" }} />
            <h3 className="font-heading text-sm font-bold text-white">Church Life</h3>
          </div>
          <Link
            href="/community"
            className="font-label text-[10px] uppercase tracking-widest flex items-center gap-1"
            style={{ color: "#C9A84C" }}
          >
            Gallery <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* ── Category Filter ── */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* ── Pinterest Masonry Grid ── */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MasonryGrid cards={filteredCards} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Flame / Inspiration Footer Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="mx-4 mt-6 mb-4 rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #1A1400, #2A1F00, #1A1400)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.5) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 p-6 text-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-3"
            >
              <Flame size={28} style={{ color: "#C9A84C" }} className="fill-[#C9A84C]/30" />
            </motion.div>
            <p className="font-accent text-base font-bold text-white mb-2">
              Join Our Community
            </p>
            <p className="font-body text-xs text-white/50 mb-4 leading-relaxed">
              Be part of a family that prays, grows,<br />and serves together.
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full active:scale-95 transition-transform"
              style={{ background: "#C9A84C", color: "#000" }}
            >
              <Users size={13} />
              Get Involved
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Nav ── */}
      <MobileBottomNav />
    </div>
  );
}
