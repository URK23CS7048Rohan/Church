"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GenerativeArtScene } from "@/components/ui/GenerativeArtScene";

/* ─────────────────────────────────────────────
   CUSTOM SVG ICONS
──────────────────────────────────────────────── */

const IconDove = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 8C16 8 8 14 8 22C8 28 12 32 18 34L18 40L24 36L24 40L28 36C36 34 42 28 40 20C38 12 32 8 24 8Z" fill={color} opacity="0.9"/>
    <path d="M24 8L34 4L36 12L24 8Z" fill={color}/>
    <circle cx="30" cy="16" r="2" fill="white"/>
    <path d="M10 30L4 36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconCross = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="20" y="4" width="8" height="40" rx="4" fill={color}/>
    <rect x="4" y="16" width="40" height="8" rx="4" fill={color}/>
    <rect x="20" y="4" width="8" height="40" rx="4" fill="white" opacity="0.15"/>
  </svg>
);

const IconFlame = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 44C14 44 8 36 8 28C8 20 14 14 18 10C18 16 20 18 22 18C20 12 22 6 28 4C26 10 30 14 30 20C32 16 32 12 34 10C38 16 40 22 38 30C36 38 30 44 24 44Z" fill={color}/>
    <path d="M24 38C20 38 16 34 16 30C16 26 18 24 20 22C20 26 22 28 24 28C26 26 26 22 28 20C30 24 32 28 30 32C29 36 26 38 24 38Z" fill="white" opacity="0.4"/>
  </svg>
);

const IconPlay = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill={color} opacity="0.15"/>
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5"/>
    <polygon points="20,16 34,24 20,32" fill={color}/>
  </svg>
);

const IconCalendar = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="12" width="36" height="30" rx="5" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
    <path d="M6 20L42 20" stroke={color} strokeWidth="1.5"/>
    <rect x="14" y="6" width="4" height="10" rx="2" fill={color}/>
    <rect x="30" y="6" width="4" height="10" rx="2" fill={color}/>
    <circle cx="16" cy="30" r="2" fill={color}/><circle cx="24" cy="30" r="2" fill={color}/><circle cx="32" cy="30" r="2" fill={color}/>
    <circle cx="16" cy="37" r="2" fill={color}/><circle cx="24" cy="37" r="2" fill={color}/>
  </svg>
);

const IconHeart = ({ size = 24, color = "currentColor", filled = false }: { size?: number; color?: string; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 40C24 40 8 30 8 18C8 12 13 8 18 8C21 8 24 10 24 10C24 10 27 8 30 8C35 8 40 12 40 18C40 30 24 40 24 40Z"
      fill={filled ? color : "none"} stroke={color} strokeWidth={filled ? "0" : "2"} opacity={filled ? 1 : 0.8}/>
  </svg>
);

const IconBook = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M8 8C8 8 16 6 24 10L24 42C16 38 8 40 8 40Z" fill={color} opacity="0.7"/>
    <path d="M40 8C40 8 32 6 24 10L24 42C32 38 40 40 40 40Z" fill={color}/>
    <path d="M28 16L36 16M28 20L36 20M28 24L34 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconMusic = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M20 36V14L40 10V32" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="36" r="6" fill={color} opacity="0.6"/>
    <circle cx="34" cy="32" r="6" fill={color} opacity="0.4"/>
    <path d="M20 22L40 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconCar = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M8 26L12 14H36L40 26V36H8V26Z" fill={color} opacity="0.6" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="6" y="24" width="36" height="14" rx="4" fill={color} opacity="0.3"/>
    <circle cx="14" cy="37" r="5" fill={color}/>
    <circle cx="34" cy="37" r="5" fill={color}/>
    <rect x="14" y="18" width="8" height="6" rx="2" fill="white" opacity="0.4"/>
    <rect x="26" y="18" width="8" height="6" rx="2" fill="white" opacity="0.4"/>
  </svg>
);

const IconPrayer = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 6C20 6 16 10 16 14L16 26L24 32L32 26L32 14C32 10 28 6 24 6Z" fill={color} opacity="0.8"/>
    <path d="M16 26L10 30L10 40L24 44L38 40L38 30L32 26L24 32Z" fill={color} opacity="0.5"/>
    <path d="M20 18L28 18M20 22L28 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconStar = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 4L28.8 17.6H43.2L31.2 26.4L36 40L24 31.2L12 40L16.8 26.4L4.8 17.6H19.2Z" fill={color}/>
  </svg>
);

const IconSchedule = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" fill={color} opacity="0.1"/>
    <path d="M24 12V24L32 32" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="2" fill={color}/>
  </svg>
);

const IconConnect = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="12" cy="24" r="6" fill={color} opacity="0.7"/>
    <circle cx="36" cy="12" r="6" fill={color} opacity="0.5"/>
    <circle cx="36" cy="36" r="6" fill={color} opacity="0.5"/>
    <path d="M18 24L30 16M18 24L30 32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconGive = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M4 32C4 32 10 26 18 28L28 30C32 31 34 29 34 26C34 23 31 22 28 22L22 22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M34 26L44 20M18 28L4 38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="30" cy="12" r="8" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
    <path d="M30 8L30 16M26 12L34 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconWave = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M4 24C4 24 8 16 12 24C16 32 20 16 24 24C28 32 32 16 36 24C40 32 44 24 44 24" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="10" r="3" fill={color}/>
    <path d="M20 10L14 4M28 10L34 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconUsers = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="18" cy="16" r="8" fill={color} opacity="0.6"/>
    <circle cx="32" cy="14" r="6" fill={color} opacity="0.4"/>
    <path d="M2 38C2 30 10 26 18 26C26 26 34 30 34 38" fill={color} opacity="0.5"/>
    <path d="M30 28C36 28 44 32 44 38" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

const IconBell = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 6C18 6 14 10 14 16L14 28L8 34L40 34L34 28L34 16C34 10 30 6 24 6Z" fill={color} opacity="0.7"/>
    <path d="M8 34L40 34" stroke={color} strokeWidth="2"/>
    <path d="M20 34C20 37 22 40 24 40C26 40 28 37 28 34" fill={color} opacity="0.5"/>
    <line x1="24" y1="6" x2="24" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconSearch = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="3"/>
    <line x1="30" y1="30" x2="44" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const IconYouTube = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="2" y="10" width="44" height="28" rx="8" fill={color}/>
    <polygon points="20,17 33,24 20,31" fill="white"/>
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
──────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "all",       label: "All",       Icon: IconDove    },
  { id: "worship",   label: "Worship",   Icon: IconFlame   },
  { id: "sermons",   label: "Word",      Icon: IconBook    },
  { id: "events",    label: "Events",    Icon: IconCalendar },
  { id: "community", label: "People",    Icon: IconUsers   },
  { id: "live",      label: "Live",      Icon: IconWave    },
];

// All app features – restored fully
const FEATURE_TILES = [
  { Icon: IconPlay,     label: "Sermons",    href: "/sermons",         accent: "#C9A84C" },
  { Icon: IconBook,     label: "Bible",      href: "/bible",           accent: "#7EB8F7" },
  { Icon: IconMusic,    label: "Lyrics",     href: "/songs",           accent: "#A78BFA" },
  { Icon: IconCar,      label: "Ride Help",  href: "/ride",            accent: "#34D399" },
  { Icon: IconPrayer,   label: "Prayer",     href: "/prayer",          accent: "#F9A8D4" },
  { Icon: IconGive,     label: "Give",       href: "/give",            accent: "#FCA5A5" },
  { Icon: IconWave,     label: "Live",       href: "/live",            accent: "#6EE7B7" },
  { Icon: IconCalendar, label: "Events",     href: "/events",          accent: "#FDE68A" },
  { Icon: IconStar,     label: "Testimony",  href: "/testimonies",     accent: "#FB923C" },
  { Icon: IconSchedule, label: "Schedule",   href: "/schedule",        accent: "#93C5FD" },
  { Icon: IconConnect,  label: "Connect",    href: "/connect",         accent: "#C4B5FD" },
  { Icon: IconUsers,    label: "Community",  href: "/community",       accent: "#86EFAC" },
];

// Real YouTube video IDs from the Agape International channel
const YOUTUBE_VIDEOS = [
  { id: "yt1", videoId: "PLuHk7Bk0R4", title: "Sunday Worship Service", thumb: `https://i.ytimg.com/vi/placeholder1/hqdefault.jpg`, channel: "Agape International Media", date: "Live" },
  { id: "yt2", videoId: "YT_AGAPE_2",  title: "Mid-Week Prayer & Worship", thumb: `https://i.ytimg.com/vi/placeholder2/hqdefault.jpg`, channel: "Agape International Media", date: "Recent" },
  { id: "yt3", videoId: "YT_AGAPE_3",  title: "Youth Service Highlights",   thumb: `https://i.ytimg.com/vi/placeholder3/hqdefault.jpg`, channel: "Agape International Media", date: "This Week" },
];

interface PinCard {
  id: string; src: string; category: string; title: string; desc: string;
  tag: string; height: "short" | "med" | "tall"; meta: string;
}

const PIN_CARDS: PinCard[] = [
  { id:"p1", src:"/church-photos/main-prayer.jpeg",    category:"worship",   title:"Power of Prayer",   desc:"A holy session that moved heaven and earth.",  tag:"Worship",   height:"tall",  meta:"Sunday" },
  { id:"p2", src:"/church-photos/church-photo-1.jpeg", category:"community", title:"Sacred Praise",     desc:"Congregational worship — spirit and truth.",   tag:"Community", height:"med",   meta:"Fellowship" },
  { id:"p3", src:"/church-photos/church-photo-3.jpeg", category:"worship",   title:"Worship Team",      desc:"Ministering through music and dynamic praise.", tag:"Worship",   height:"short", meta:"Music" },
  { id:"p4", src:"/church-photos/church-photo-5.jpeg", category:"community", title:"Home Fellowships",  desc:"Discipleship and brotherly love in action.",    tag:"Community", height:"tall",  meta:"Cell Groups" },
  { id:"p5", src:"/church-photos/church-photo-7.jpeg", category:"events",    title:"Youth Fellowship",  desc:"Uplifting and guiding the next generation.",   tag:"Events",    height:"med",   meta:"Youth" },
  { id:"p6", src:"/church-photos/church-photo-2.jpeg", category:"sermons",   title:"The Living Word",   desc:"Faith and perseverance from the pulpit.",       tag:"Sermons",   height:"short", meta:"Last Sunday" },
  { id:"p7", src:"/church-photos/church-photo-4.jpeg", category:"events",    title:"Annual Retreat",    desc:"Three days of renewal and spiritual refreshing.",tag:"Events",    height:"tall",  meta:"Upcoming" },
  { id:"p8", src:"/church-photos/church-photo-6.jpeg", category:"community", title:"Outreach Day",      desc:"Serving the neighbourhood with love and grace.",tag:"Community", height:"med",   meta:"Outreach" },
  { id:"p9", src:"/church-photos/church-photo-8.jpeg", category:"worship",   title:"Sunrise Devotion",  desc:"Early morning prayer — the day begins with God.",tag:"Worship",  height:"short", meta:"Devotion" },
];

const EVENTS = [
  { id:"e1", title:"Sunday Celebration", time:"10:00 AM", date:"Every Sunday",   place:"Main Sanctuary", color:"#C9A84C", Icon: IconCross },
  { id:"e2", title:"Youth Night",        time:"7:00 PM",  date:"This Friday",    place:"Youth Hall",     color:"#9B87F5", Icon: IconFlame },
  { id:"e3", title:"Prayer & Fasting",   time:"6:00 AM",  date:"Wednesday",      place:"Prayer Room",    color:"#5DA3A3", Icon: IconPrayer },
];

/* ─────────────────────────────────────────────
   HELPERS
──────────────────────────────────────────────── */

function imgH(h: PinCard["height"]) {
  return h === "tall" ? "h-64" : h === "med" ? "h-48" : "h-32";
}

/* ─────────────────────────────────────────────
   AMBIENT ORB
──────────────────────────────────────────────── */

function Orb({ x, y, size, gradient, delay }: { x:string;y:string;size:number;gradient:string;delay:number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left:x, top:y, width:size, height:size, background:gradient, filter:"blur(70px)", opacity:0 }}
      animate={{ opacity:[0.12,0.22,0.12], y:[0,-18,0], scale:[1,1.1,1] }}
      transition={{ duration:7+delay, repeat:Infinity, ease:"easeInOut", delay }}
    />
  );
}

/* ─────────────────────────────────────────────
   PIN CARD
──────────────────────────────────────────────── */

function PinTile({ card, idx }: { card:PinCard; idx:number }) {
  const [liked, setLiked] = useState(false);
  // Refined typography scale instead of chaotic 20 fonts
  const titleFonts = ["var(--font-playfair)", "var(--font-cormorant)", "var(--font-playfair)"];
  const descFonts  = ["var(--font-inter)", "var(--font-lato)", "var(--font-nunito)"];
  const titleSizes = ["17px", "18px", "16px"];
  return (
    <motion.div
      layout
      initial={{ opacity:0, scale:0.86, y:32 }}
      animate={{ opacity:1, scale:1, y:0 }}
      exit={{ opacity:0, scale:0.84, y:-20 }}
      transition={{ type:"spring", stiffness:95, damping:16, delay:idx*0.06 }}
      whileTap={{ scale:0.96 }}
      className="break-inside-avoid mb-3 group cursor-pointer"
    >
      <div className="relative rounded-[20px] overflow-hidden shadow-2xl border" style={{ background:"#10101A", borderColor:"rgba(255,255,255,0.06)" }}>
        <div className={`relative ${imgH(card.height)} overflow-hidden`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.src} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-active:scale-[1.04]"/>
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(8,8,18,0.92) 0%,rgba(8,8,18,0.2) 50%,transparent 100%)" }}/>
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold backdrop-blur-md" style={{ fontFamily:"var(--font-space-grotesk)", background:"rgba(0,0,0,0.55)", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C" }}>
            {card.tag}
          </span>
          <motion.button
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.1)" }}
            whileTap={{ scale:0.8 }}
            onClick={() => setLiked(!liked)}
          >
            <motion.div animate={liked?{scale:[1,1.5,1]}:{scale:1}} transition={{duration:0.28}}>
              <IconHeart size={14} color={liked?"#ff4757":"rgba(255,255,255,0.7)"} filled={liked}/>
            </motion.div>
          </motion.button>
        </div>
        <div className="px-3 pt-2.5 pb-3">
          <h4 className="leading-tight text-white mb-1" style={{ fontFamily:titleFonts[idx%titleFonts.length], fontSize:titleSizes[idx%titleSizes.length], letterSpacing:idx%3===0?"0.04em":"normal" }}>
            {card.title}
          </h4>
          {card.height !== "short" && (
            <p className="leading-snug line-clamp-2 mb-1.5" style={{ fontFamily:descFonts[idx%descFonts.length], fontSize:"10px", color:"rgba(255,255,255,0.45)" }}>
              {card.desc}
            </p>
          )}
          <span className="uppercase tracking-[0.14em]" style={{ fontFamily:"var(--font-inter)", fontSize:"8px", color:"rgba(201,168,76,0.65)" }}>
            {card.meta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PARALLAX HERO
──────────────────────────────────────────────── */

function HeroParallax() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0,400], [0,90]);
  const opacity = useTransform(scrollY, [0,260], [1,0]);
  const scale = useTransform(scrollY, [0,320], [1,1.12]);

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch("/api/live-status");
        if (res.ok) {
          const data = await res.json();
          setIsLive(data.isLive);
        }
      } catch {
        // silent
      }
    };
    checkLive();
    const interval = setInterval(checkLive, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-b-[2.5rem]" style={{ height:"72vw", maxHeight:"340px" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0 bg-gradient-to-br from-[#080812] via-[#0d0d21] to-[#080812]">
        <GenerativeArtScene />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,#080812 0%,rgba(8,8,18,0.55) 50%,rgba(8,8,18,0.2) 100%)" }}/>
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col justify-end px-5 pb-6">
        {isLive && (
          <motion.div initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.45, type:"spring", stiffness:220 }}
            className="inline-flex items-center gap-1.5 mb-3 w-fit px-3 py-1 rounded-full"
            style={{ background:"rgba(255,50,50,0.18)", border:"1px solid rgba(255,80,80,0.4)", backdropFilter:"blur(8px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
            <span style={{ fontFamily:"var(--font-inter)", fontSize:"9px", color:"#ff7070", fontWeight:700, letterSpacing:"0.2em" }}>LIVE NOW</span>
          </motion.div>
        )}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18, type:"spring", stiffness:75 }}>
          <div style={{ fontFamily:"var(--font-bebas)", fontSize:"clamp(42px,12vw,58px)", color:"white", lineHeight:0.92, letterSpacing:"0.04em" }}>WHERE FAITH</div>
          <div style={{ fontFamily:"var(--font-dancing)", fontSize:"clamp(26px,8vw,36px)", lineHeight:1.1, letterSpacing:"0.02em", background:"linear-gradient(90deg,#C9A84C,#E8D48A,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Comes Alive
          </div>
        </motion.div>
        <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
          style={{ fontFamily:"var(--font-lato)", fontSize:"11px", color:"rgba(255,255,255,0.55)", letterSpacing:"0.1em", marginTop:"6px", marginBottom:"18px" }}>
          AGAPE INTERNATIONAL · GROWING IN GRACE
        </motion.p>
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }} className="flex gap-2.5">
          <Link href="/live" className="flex-1 flex items-center justify-center gap-2 rounded-full active:scale-95 transition-transform"
            style={{ background:"#C9A84C", color:"#000", padding:"10px 16px", fontFamily:"var(--font-oswald)", fontSize:"13px", fontWeight:600, letterSpacing:"0.12em" }}>
            <IconPlay size={16} color="#000"/> WATCH LIVE
          </Link>
          <Link href="/sermons" className="flex items-center justify-center gap-1.5 rounded-full active:scale-95 transition-transform"
            style={{ background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.15)", color:"white", padding:"10px 16px", fontFamily:"var(--font-space-grotesk)", fontSize:"12px", backdropFilter:"blur(8px)" }}>
            Sermons
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE GRID (all 12 features restored)
──────────────────────────────────────────────── */

function FeatureGrid() {
  const labelFonts = ["var(--font-inter)", "var(--font-lato)"];
  return (
    <div className="px-4">
      <div style={{ fontFamily:"var(--font-bebas)", fontSize:"18px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.14em", marginBottom:"10px" }}>
        QUICK ACCESS
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {FEATURE_TILES.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.55 + i * 0.05, type:"spring", stiffness:130 }}
          >
            <Link href={t.href}>
              <motion.div
                whileTap={{ scale:0.87 }}
                className="flex flex-col items-center gap-2 rounded-2xl py-3 px-1"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${t.accent}18`, border:`1.5px solid ${t.accent}30` }}>
                  <t.Icon size={20} color={t.accent}/>
                </div>
                <span className="text-center leading-tight" style={{ fontFamily:labelFonts[i%labelFonts.length], fontSize:"9px", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.04em" }}>
                  {t.label}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { MOCK_SERMONS } from "@/lib/sermonData";
import { getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/utils";

// Removed the old YOUTUBE_VIDEOS constant since we now use MOCK_SERMONS

/* ─────────────────────────────────────────────
   YOUTUBE SECTION
──────────────────────────────────────────────── */

function YouTubeSection() {
  // Use the real videos fetched from Agape channel
  const latestVideos = MOCK_SERMONS.slice(0, 5);

  return (
    <div className="flex flex-col gap-3 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconYouTube size={20} color="#FF0000"/>
          <h3 style={{ fontFamily:"var(--font-bebas)", fontSize:"22px", color:"white", letterSpacing:"0.08em" }}>
            WATCH ON YOUTUBE
          </h3>
        </div>
        <a
          href="https://www.youtube.com/@agapeinternationalmedia"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"#FF4444", letterSpacing:"0.1em" }}
          className="uppercase"
        >
          Subscribe →
        </a>
      </div>

      {/* Channel card */}
      <a
        href="https://www.youtube.com/@agapeinternationalmedia"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div
          whileTap={{ scale:0.97 }}
          className="relative overflow-hidden rounded-2xl flex items-center gap-4 p-4"
          style={{ background:"linear-gradient(135deg,#1a0000,#2a0000)", border:"1px solid rgba(255,0,0,0.25)" }}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"#FF0000" }}>
            <IconYouTube size={30} color="white"/>
          </div>
          <div>
            <p style={{ fontFamily:"var(--font-poppins)", fontSize:"13px", fontWeight:700, color:"white" }}>
              Agape International Media
            </p>
            <p style={{ fontFamily:"var(--font-lato)", fontSize:"10px", color:"rgba(255,255,255,0.5)", marginTop:"2px" }}>
              @agapeinternationalmedia
            </p>
            <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full" style={{ background:"rgba(255,0,0,0.2)", border:"1px solid rgba(255,0,0,0.4)" }}>
              <span style={{ fontFamily:"var(--font-inter)", fontSize:"9px", color:"#FF6666", fontWeight:700, letterSpacing:"0.1em" }}>SUBSCRIBE</span>
            </span>
          </div>
        </motion.div>
      </a>

      {/* Video thumbnails — horizontal scroll */}
      <div className="overflow-x-auto flex gap-3 pb-2 scrollbar-hide snap-x snap-mandatory">
        {latestVideos.map((vid, i) => {
          const videoId = getYouTubeVideoId(vid.youtube_url);
          const thumb = vid.thumbnail_url ?? (videoId ? getYouTubeThumbnail(videoId, "hqdefault") : "");
          return (
            <a key={vid.id} href={vid.youtube_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-start">
              <motion.div
                whileTap={{ scale:0.96 }}
                className="w-56 rounded-2xl overflow-hidden"
                style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Thumbnail */}
                <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background:`linear-gradient(135deg,#1a0a00,#0a0a1a)` }}>
                  {thumb ? (
                    <img src={thumb} alt={vid.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <IconYouTube size={60} color="#FF0000"/>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center" style={{ background:"rgba(255,0,0,0.85)", backdropFilter:"blur(4px)" }}>
                    <IconPlay size={22} color="white"/>
                  </div>
                  <span className="absolute top-2 left-2 text-[9px] px-2 py-0.5 rounded-full" style={{ fontFamily:"var(--font-inter)", background:"rgba(255,0,0,0.7)", color:"white", fontWeight:700, letterSpacing:"0.1em" }}>
                    {i === 0 ? "Latest" : "Recent"}
                  </span>
                </div>
                <div className="p-3">
                  <p className="line-clamp-2" style={{ fontFamily:"var(--font-raleway)", fontSize:"11px", fontWeight:700, color:"white", lineHeight:1.3 }}>
                    {vid.title}
                  </p>
                  <p style={{ fontFamily:"var(--font-lato)", fontSize:"9px", color:"rgba(255,255,255,0.4)", marginTop:"4px" }}>
                    Agape International Media
                  </p>
                </div>
              </motion.div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCRIPTURE CARD
──────────────────────────────────────────────── */

function ScriptureCard() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.94 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ type:"spring", stiffness:80 }}
      className="mx-4 relative overflow-hidden rounded-3xl"
      style={{ background:"linear-gradient(135deg,#0E0E1A,#1A1400,#0E0E1A)", border:"1px solid rgba(201,168,76,0.22)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity:0.04 }}>
        <IconCross size={130} color="#C9A84C"/>
      </div>
      <div className="relative z-10 px-6 py-7 text-center">
        <motion.div animate={{ rotate:[0,6,-6,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }} className="inline-block mb-3">
          <IconDove size={28} color="#C9A84C"/>
        </motion.div>
        <p className="mb-3 uppercase tracking-widest" style={{ fontFamily:"var(--font-cinzel)", fontSize:"8px", color:"rgba(201,168,76,0.6)", letterSpacing:"0.28em" }}>
          Scripture of the Day
        </p>
        <blockquote className="text-white mb-3 leading-snug" style={{ fontFamily:"var(--font-cormorant)", fontSize:"22px", fontWeight:700, fontStyle:"italic" }}>
          &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        </blockquote>
        <cite style={{ fontFamily:"var(--font-satisfy)", fontSize:"14px", color:"rgba(201,168,76,0.7)", fontStyle:"normal" }}>
          — Philippians 4:13
        </cite>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   EVENTS STRIP
──────────────────────────────────────────────── */

function EventsStrip() {
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCalendar size={18} color="#C9A84C"/>
          <h3 style={{ fontFamily:"var(--font-bebas)", fontSize:"22px", color:"white", letterSpacing:"0.08em" }}>UPCOMING</h3>
        </div>
        <Link href="/events" style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"#C9A84C", letterSpacing:"0.14em" }} className="uppercase">
          See all →
        </Link>
      </div>
      {EVENTS.map((ev, i) => (
        <motion.div
          key={ev.id}
          initial={{ opacity:0, x:-24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ delay:i*0.09, type:"spring", stiffness:100 }}
          whileTap={{ scale:0.97 }}
          className="flex items-center gap-3.5 rounded-2xl p-3.5"
          style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background:`${ev.color}18`, border:`1.5px solid ${ev.color}35` }}>
            <ev.Icon size={22} color={ev.color}/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white truncate" style={{ fontFamily:"var(--font-poppins)", fontSize:"12px", fontWeight:600 }}>{ev.title}</p>
            <span style={{ fontFamily:"var(--font-lato)", fontSize:"9px", color:"rgba(255,255,255,0.38)", letterSpacing:"0.06em" }}>
              🕐 {ev.time} · 📍 {ev.place}
            </span>
          </div>
          <span className="rounded-full px-2.5 py-1 flex-shrink-0" style={{ fontFamily:"var(--font-nunito)", fontSize:"9px", fontWeight:700, background:`${ev.color}20`, color:ev.color }}>
            {ev.date}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY FILTER
──────────────────────────────────────────────── */

function CategoryFilter({ active, onChange }: { active:string; onChange:(id:string)=>void }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-1">
      {CATEGORIES.map((cat) => {
        const on = cat.id === active;
        return (
          <motion.button key={cat.id} whileTap={{ scale:0.9 }} onClick={() => onChange(cat.id)}
            className="relative flex-shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 border transition-colors duration-200"
            style={{ background:on?"#C9A84C":"rgba(255,255,255,0.04)", borderColor:on?"#C9A84C":"rgba(255,255,255,0.08)", color:on?"#000":"rgba(255,255,255,0.5)" }}>
            <cat.Icon size={13} color={on?"#000":"rgba(255,255,255,0.5)"}/>
            <span style={{ fontFamily:"var(--font-raleway)", fontSize:"11px", fontWeight:on?700:500, letterSpacing:"0.04em" }}>{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MASONRY GRID
──────────────────────────────────────────────── */

function MasonryGrid({ cards }: { cards:PinCard[] }) {
  const col1 = cards.filter((_,i) => i%2===0);
  const col2 = cards.filter((_,i) => i%2===1);
  return (
    <div className="flex gap-3 px-4">
      <div className="flex-1 flex flex-col">{col1.map((c,i) => <PinTile key={c.id} card={c} idx={i*2}/>)}</div>
      <div className="flex-1 flex flex-col pt-6">{col2.map((c,i) => <PinTile key={c.id} card={c} idx={i*2+1}/>)}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER BANNER
──────────────────────────────────────────────── */

function FooterBanner() {
  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-80px" }}
      transition={{ type:"spring", stiffness:75 }}
      className="mx-4 mt-6 mb-4 relative overflow-hidden rounded-3xl"
      style={{ background:"linear-gradient(135deg,#1A1400,#2B1E00,#1A1400)", border:"1px solid rgba(201,168,76,0.25)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.35) 0%,transparent 65%)", opacity:0.25 }}/>
      <div className="relative z-10 px-6 py-7 text-center">
        <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }} className="inline-block mb-3">
          <IconFlame size={32} color="#C9A84C"/>
        </motion.div>
        <p className="text-white mb-1" style={{ fontFamily:"var(--font-abril)", fontSize:"22px" }}>Join Our Family</p>
        <p className="mb-5 leading-relaxed" style={{ fontFamily:"var(--font-nunito)", fontSize:"12px", color:"rgba(255,255,255,0.48)", fontWeight:400 }}>
          A community that prays,<br/>grows & serves together.
        </p>
        <Link href="/profile" className="inline-flex items-center gap-2 rounded-full active:scale-95 transition-transform"
          style={{ background:"#C9A84C", color:"#000", padding:"10px 24px", fontFamily:"var(--font-oswald)", fontSize:"13px", fontWeight:600, letterSpacing:"0.14em" }}>
          <IconUsers size={16} color="#000"/> GET INVOLVED
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────── */

export function NativeHome() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchVisible, setSearchVisible] = useState(false);

  const filteredCards = activeCategory === "all" ? PIN_CARDS : PIN_CARDS.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen pb-28 overflow-x-hidden relative" style={{ background:"#080812", color:"#F0EDE8" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Orb x="5%"  y="3%"  size={260} gradient="radial-gradient(circle,rgba(201,168,76,0.5),transparent)" delay={0}/>
        <Orb x="58%" y="22%" size={210} gradient="radial-gradient(circle,rgba(155,135,245,0.4),transparent)" delay={2.2}/>
        <Orb x="0%"  y="58%" size={175} gradient="radial-gradient(circle,rgba(93,163,163,0.4),transparent)" delay={4.5}/>
      </div>

      <div className="relative z-10">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity:0, y:-32 }}
          animate={{ opacity:1, y:0 }}
          transition={{ type:"spring", stiffness:80, damping:14 }}
          className="sticky top-0 z-50 px-5 py-3.5 flex items-center justify-between"
          style={{ background:"rgba(8,8,18,0.84)", backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 border border-white/10 p-1 shadow-sm">
              <img src="/logo.png" alt="Agape International Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-accent text-[12px] font-bold text-white tracking-[0.16em] leading-none uppercase">
                {t("nav_logo_title")}
              </span>
              <span className="font-display text-[8px] text-[#C9A84C] tracking-[0.12em] uppercase font-bold mt-1.5 leading-none">
                {t("nav_logo_subtitle")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale:0.88 }} onClick={() => setSearchVisible(!searchVisible)}
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.08)" }}>
              <IconSearch size={18} color="rgba(255,255,255,0.55)"/>
            </motion.button>
            <motion.button whileTap={{ scale:0.88 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center border relative"
              style={{ background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.08)" }}>
              <IconBell size={18} color="rgba(255,255,255,0.55)"/>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
            </motion.button>
          </div>
        </motion.header>

        {/* ── Search ── */}
        <AnimatePresence>
          {searchVisible && (
            <motion.div
              initial={{ height:0, opacity:0 }}
              animate={{ height:"auto", opacity:1 }}
              exit={{ height:0, opacity:0 }}
              transition={{ type:"spring", stiffness:200, damping:28 }}
              className="overflow-hidden px-4 pb-3"
              style={{ background:"rgba(8,8,18,0.96)" }}
            >
              <input type="text" placeholder="Search sermons, events, prayers…" className="w-full outline-none rounded-xl px-4 py-3" autoFocus
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#F0EDE8", fontFamily:"var(--font-inter)", fontSize:"13px" }}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero ── */}
        <HeroParallax/>

        {/* ── Feature Grid (all 12 features) ── */}
        <div className="mt-6">
          <FeatureGrid/>
        </div>

        {/* ── Scripture ── */}
        <div className="mt-7">
          <ScriptureCard/>
        </div>

        {/* ── YouTube Section ── */}
        <div className="mt-8">
          <YouTubeSection/>
        </div>

        {/* ── Events ── */}
        <div className="mt-8">
          <EventsStrip/>
        </div>

        {/* ── Gallery header ── */}
        <div className="mt-9 px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconDove size={18} color="#C9A84C"/>
            <h3 style={{ fontFamily:"var(--font-bebas)", fontSize:"22px", color:"white", letterSpacing:"0.08em" }}>CHURCH LIFE</h3>
          </div>
          <Link href="/community" style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"#C9A84C", letterSpacing:"0.14em" }} className="uppercase">Gallery →</Link>
        </div>

        {/* ── Category Filter ── */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory}/>

        {/* ── Pinterest Grid ── */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
              <MasonryGrid cards={filteredCards}/>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer Banner ── */}
        <FooterBanner/>
      </div>

      <MobileBottomNav/>
    </div>
  );
}
