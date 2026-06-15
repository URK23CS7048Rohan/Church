"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useLanguage } from "@/components/providers/LanguageProvider";

/* ─────────────────────────────────────────────
   CUSTOM SVG LOGOS & ICONS (hand-crafted, non-Lucide)
──────────────────────────────────────────────── */

const IconDove = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 8 C16 8 8 14 8 22 C8 28 12 32 18 34 L18 40 L24 36 L24 40 L28 36 C36 34 42 28 40 20 C38 12 32 8 24 8Z" fill={color} opacity="0.9"/>
    <path d="M24 8 L34 4 L36 12 L24 8Z" fill={color}/>
    <circle cx="30" cy="16" r="2" fill="white"/>
    <path d="M10 30 L4 36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
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
    <path d="M24 44 C14 44 8 36 8 28 C8 20 14 14 18 10 C18 16 20 18 22 18 C20 12 22 6 28 4 C26 10 30 14 30 20 C32 16 32 12 34 10 C38 16 40 22 38 30 C36 38 30 44 24 44Z" fill={color}/>
    <path d="M24 38 C20 38 16 34 16 30 C16 26 18 24 20 22 C20 26 22 28 24 28 C26 26 26 22 28 20 C30 24 32 28 30 32 C29 36 26 38 24 38Z" fill="white" opacity="0.4"/>
  </svg>
);

const IconPrayer = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 6 C20 6 16 10 16 14 L16 26 L24 32 L32 26 L32 14 C32 10 28 6 24 6Z" fill={color} opacity="0.8"/>
    <path d="M16 26 L10 30 L10 40 L24 44 L38 40 L38 30 L32 26 L24 32Z" fill={color} opacity="0.6"/>
    <path d="M20 18 L28 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 22 L28 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconBook = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M8 8 C8 8 16 6 24 10 L24 42 C16 38 8 40 8 40Z" fill={color} opacity="0.7"/>
    <path d="M40 8 C40 8 32 6 24 10 L24 42 C32 38 40 40 40 40Z" fill={color}/>
    <path d="M28 16 L36 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 20 L36 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 24 L34 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
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
    <path d="M6 20 L42 20" stroke={color} strokeWidth="1.5"/>
    <rect x="14" y="6" width="4" height="10" rx="2" fill={color}/>
    <rect x="30" y="6" width="4" height="10" rx="2" fill={color}/>
    <circle cx="16" cy="30" r="2" fill={color}/>
    <circle cx="24" cy="30" r="2" fill={color}/>
    <circle cx="32" cy="30" r="2" fill={color}/>
    <circle cx="16" cy="37" r="2" fill={color}/>
    <circle cx="24" cy="37" r="2" fill={color}/>
  </svg>
);

const IconHeart = ({ size = 24, color = "currentColor", filled = false }: { size?: number; color?: string; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 40 C24 40 8 30 8 18 C8 12 13 8 18 8 C21 8 24 10 24 10 C24 10 27 8 30 8 C35 8 40 12 40 18 C40 30 24 40 24 40Z"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? "0" : "2"}
      opacity={filled ? 1 : 0.8}
    />
  </svg>
);

const IconGive = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M4 32 C4 32 10 26 18 28 L28 30 C32 31 34 29 34 26 C34 23 31 22 28 22 L22 22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M34 26 L44 20" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 28 L4 38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="30" cy="12" r="8" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
    <path d="M30 8 L30 16 M26 12 L34 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconWave = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M4 24 C4 24 8 16 12 24 C16 32 20 16 24 24 C28 32 32 16 36 24 C40 32 44 24 44 24" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="10" r="3" fill={color}/>
    <path d="M20 10 L14 4 M28 10 L34 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconUsers = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="18" cy="16" r="8" fill={color} opacity="0.6"/>
    <circle cx="32" cy="14" r="6" fill={color} opacity="0.4"/>
    <path d="M2 38 C2 30 10 26 18 26 C26 26 34 30 34 38" fill={color} opacity="0.5"/>
    <path d="M30 28 C36 28 44 32 44 38" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

const IconBell = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 6 C18 6 14 10 14 16 L14 28 L8 34 L40 34 L34 28 L34 16 C34 10 30 6 24 6Z" fill={color} opacity="0.7"/>
    <path d="M8 34 L40 34" stroke={color} strokeWidth="2"/>
    <path d="M20 34 C20 37 22 40 24 40 C26 40 28 37 28 34" fill={color} opacity="0.5"/>
    <line x1="24" y1="6" x2="24" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconSearch = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="3"/>
    <line x1="30" y1="30" x2="44" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
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

interface PinCard {
  id: string;
  src: string;
  category: string;
  title: string;
  desc: string;
  tag: string;
  height: "short" | "med" | "tall";
  meta: string;
}

const PIN_CARDS: PinCard[] = [
  { id:"p1", src:"/church-photos/main-prayer.jpeg",    category:"worship",   title:"Power of Prayer",    desc:"A holy session that moved heaven and earth.",   tag:"Worship",   height:"tall",  meta:"Sunday" },
  { id:"p2", src:"/church-photos/church-photo-1.jpeg", category:"community", title:"Sacred Praise",      desc:"Congregational worship — spirit and truth.",    tag:"Community", height:"med",   meta:"Fellowship" },
  { id:"p3", src:"/church-photos/church-photo-3.jpeg", category:"worship",   title:"Worship Team",       desc:"Ministering through music and dynamic praise.",  tag:"Worship",   height:"short", meta:"Music" },
  { id:"p4", src:"/church-photos/church-photo-5.jpeg", category:"community", title:"Home Fellowships",   desc:"Discipleship and brotherly love in action.",     tag:"Community", height:"tall",  meta:"Cell Groups" },
  { id:"p5", src:"/church-photos/church-photo-7.jpeg", category:"events",    title:"Youth Fellowship",   desc:"Uplifting and guiding the next generation.",    tag:"Events",    height:"med",   meta:"Youth" },
  { id:"p6", src:"/church-photos/church-photo-2.jpeg", category:"sermons",   title:"The Living Word",    desc:"Faith and perseverance from the pulpit.",        tag:"Sermons",   height:"short", meta:"Last Sunday" },
  { id:"p7", src:"/church-photos/church-photo-4.jpeg", category:"events",    title:"Annual Retreat",     desc:"Three days of renewal and spiritual refreshing.", tag:"Events",    height:"tall",  meta:"Upcoming" },
  { id:"p8", src:"/church-photos/church-photo-6.jpeg", category:"community", title:"Outreach Day",       desc:"Serving the neighbourhood with love and grace.", tag:"Community", height:"med",   meta:"Outreach" },
  { id:"p9", src:"/church-photos/church-photo-8.jpeg", category:"worship",   title:"Sunrise Devotion",   desc:"Early morning prayer — the day begins with God.", tag:"Worship",   height:"short", meta:"Devotion" },
];

const EVENTS = [
  { id:"e1", title:"Sunday Celebration", time:"10:00 AM", date:"Every Sunday",   place:"Main Sanctuary", color:"#C9A84C", Icon: IconCross },
  { id:"e2", title:"Youth Night",        time:"7:00 PM",  date:"This Friday",    place:"Youth Hall",     color:"#9B87F5", Icon: IconFlame },
  { id:"e3", title:"Prayer & Fasting",   time:"6:00 AM",  date:"Wednesday",      place:"Prayer Room",    color:"#5DA3A3", Icon: IconPrayer },
];

const QUICK_TILES = [
  { Icon: IconPlay,     label:"Sermons",  href:"/sermons", accent:"#C9A84C" },
  { Icon: IconGive,     label:"Give",     href:"/give",    accent:"#E57373" },
  { Icon: IconWave,     label:"Live",     href:"/live",    accent:"#66BB6A" },
  { Icon: IconCalendar, label:"Events",   href:"/events",  accent:"#9B87F5" },
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

function Orb({ x, y, size, gradient, delay }: { x:string; y:string; size:number; gradient:string; delay:number }) {
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
   PIN CARD (Pinterest tile)
──────────────────────────────────────────────── */

function PinTile({ card, idx }: { card:PinCard; idx:number }) {
  const [liked, setLiked] = useState(false);

  /* Each card uses a different font-pair to break AI uniformity */
  const titleFonts = [
    "var(--font-bebas)",
    "var(--font-oswald)",
    "var(--font-abril)",
    "var(--font-raleway)",
    "var(--font-montserrat)",
    "var(--font-righteous)",
    "var(--font-playfair)",
    "var(--font-poppins)",
    "var(--font-roboto-slab)",
  ];
  const descFonts = [
    "var(--font-lato)",
    "var(--font-nunito)",
    "var(--font-inter)",
    "var(--font-dmsans)",
    "var(--font-space-grotesk)",
    "var(--font-raleway)",
    "var(--font-poppins)",
    "var(--font-lato)",
    "var(--font-inter)",
  ];
  const titleSizes = ["18px","20px","16px","22px","17px","19px","15px","21px","18px"];
  const titleFont  = titleFonts[idx % titleFonts.length];
  const descFont   = descFonts[idx % descFonts.length];
  const titleSize  = titleSizes[idx % titleSizes.length];

  return (
    <motion.div
      layout
      initial={{ opacity:0, scale:0.86, y:32 }}
      animate={{ opacity:1, scale:1,   y:0  }}
      exit={{ opacity:0, scale:0.84, y:-20 }}
      transition={{ type:"spring", stiffness:95, damping:16, delay: idx * 0.06 }}
      whileTap={{ scale:0.96 }}
      className="break-inside-avoid mb-3 group cursor-pointer"
    >
      <div
        className="relative rounded-[20px] overflow-hidden shadow-2xl border"
        style={{ background:"#10101A", borderColor:"rgba(255,255,255,0.06)" }}
      >
        {/* Image */}
        <div className={`relative ${imgH(card.height)} overflow-hidden`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-active:scale-[1.04]"
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(8,8,18,0.92) 0%, rgba(8,8,18,0.2) 50%, transparent 100%)" }} />

          {/* Tag */}
          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold backdrop-blur-md"
            style={{ fontFamily:"var(--font-space-grotesk)", background:"rgba(0,0,0,0.55)", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C" }}
          >
            {card.tag}
          </span>

          {/* Like */}
          <motion.button
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.1)" }}
            whileTap={{ scale:0.8 }}
            onClick={() => setLiked(!liked)}
          >
            <motion.div animate={liked ? { scale:[1,1.5,1] } : { scale:1 }} transition={{ duration:0.28 }}>
              <IconHeart size={14} color={liked ? "#ff4757" : "rgba(255,255,255,0.7)"} filled={liked} />
            </motion.div>
          </motion.button>
        </div>

        {/* Text */}
        <div className="px-3 pt-2.5 pb-3">
          <h4
            className="leading-tight text-white mb-1"
            style={{ fontFamily:titleFont, fontSize:titleSize, letterSpacing: idx%3===0 ? "0.04em" : "normal" }}
          >
            {card.title}
          </h4>
          {card.height !== "short" && (
            <p
              className="leading-snug line-clamp-2 mb-1.5"
              style={{ fontFamily:descFont, fontSize:"10px", color:"rgba(255,255,255,0.45)" }}
            >
              {card.desc}
            </p>
          )}
          <span
            className="uppercase tracking-[0.14em]"
            style={{ fontFamily:"var(--font-inter)", fontSize:"8px", color:"rgba(201,168,76,0.65)" }}
          >
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
  const scale  = useTransform(scrollY, [0,320], [1,1.12]);

  return (
    <div className="relative overflow-hidden rounded-b-[2.5rem]" style={{ height:"72vw", maxHeight:"340px" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/church-photos/main-prayer.jpeg" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, #080812 0%, rgba(8,8,18,0.55) 50%, rgba(8,8,18,0.2) 100%)" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col justify-end px-5 pb-6">
        {/* Live badge */}
        <motion.div
          initial={{ opacity:0, scale:0.6 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.45, type:"spring", stiffness:220 }}
          className="inline-flex items-center gap-1.5 mb-3 w-fit px-3 py-1 rounded-full"
          style={{ background:"rgba(255,50,50,0.18)", border:"1px solid rgba(255,80,80,0.4)", backdropFilter:"blur(8px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span style={{ fontFamily:"var(--font-inter)", fontSize:"9px", color:"#ff7070", fontWeight:700, letterSpacing:"0.2em" }}>
            LIVE NOW
          </span>
        </motion.div>

        {/* Big headline — Bebas Neue for impact */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.18, type:"spring", stiffness:75 }}
        >
          <div
            style={{ fontFamily:"var(--font-bebas)", fontSize:"clamp(42px,12vw,58px)", color:"white", lineHeight:0.92, letterSpacing:"0.04em" }}
          >
            WHERE FAITH
          </div>
          {/* Script accent on second line */}
          <div
            style={{ fontFamily:"var(--font-dancing)", fontSize:"clamp(26px,8vw,36px)", lineHeight:1.1, letterSpacing:"0.02em",
              background:"linear-gradient(90deg,#C9A84C,#E8D48A,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}
          >
            Comes Alive
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.35 }}
          style={{ fontFamily:"var(--font-lato)", fontSize:"11px", color:"rgba(255,255,255,0.55)", letterSpacing:"0.1em", marginTop:"6px", marginBottom:"18px" }}
        >
          AGAPE INTERNATIONAL · GROWING IN GRACE
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.5 }}
          className="flex gap-2.5"
        >
          <Link
            href="/live"
            className="flex-1 flex items-center justify-center gap-2 rounded-full active:scale-95 transition-transform"
            style={{ background:"#C9A84C", color:"#000", padding:"10px 16px", fontFamily:"var(--font-oswald)", fontSize:"13px", fontWeight:600, letterSpacing:"0.12em" }}
          >
            <IconPlay size={16} color="#000" />
            WATCH LIVE
          </Link>
          <Link
            href="/sermons"
            className="flex items-center justify-center gap-1.5 rounded-full active:scale-95 transition-transform"
            style={{ background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.15)", color:"white", padding:"10px 16px", fontFamily:"var(--font-space-grotesk)", fontSize:"12px", backdropFilter:"blur(8px)" }}
          >
            Sermons
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUICK ACTION TILES
──────────────────────────────────────────────── */

function QuickGrid() {
  const tileFonts = ["var(--font-oswald)", "var(--font-nunito)", "var(--font-poppins)", "var(--font-raleway)"];
  return (
    <div className="grid grid-cols-4 gap-2 px-4">
      {QUICK_TILES.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity:0, y:22 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.58+i*0.08, type:"spring", stiffness:130 }}
        >
          <Link href={t.href}>
            <motion.div
              whileTap={{ scale:0.87 }}
              className="flex flex-col items-center gap-2 rounded-2xl p-2.5"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background:`${t.accent}18`, border:`1.5px solid ${t.accent}30` }}
              >
                <t.Icon size={22} color={t.accent} />
              </div>
              <span style={{ fontFamily:tileFonts[i], fontSize:"9px", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.06em" }}>
                {t.label}
              </span>
            </motion.div>
          </Link>
        </motion.div>
      ))}
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
      {/* Watermark cross */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity:0.04 }}>
        <IconCross size={130} color="#C9A84C" />
      </div>

      <div className="relative z-10 px-6 py-7 text-center">
        <motion.div
          animate={{ rotate:[0,6,-6,0] }}
          transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
          className="inline-block mb-3"
        >
          <IconDove size={28} color="#C9A84C" />
        </motion.div>

        <p
          className="mb-3 uppercase tracking-widest"
          style={{ fontFamily:"var(--font-cinzel)", fontSize:"8px", color:"rgba(201,168,76,0.6)", letterSpacing:"0.28em" }}
        >
          Scripture of the Day
        </p>

        <blockquote
          className="text-white mb-3 leading-snug"
          style={{ fontFamily:"var(--font-cormorant)", fontSize:"22px", fontWeight:700, fontStyle:"italic" }}
        >
          &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        </blockquote>

        <cite
          style={{ fontFamily:"var(--font-satisfy)", fontSize:"14px", color:"rgba(201,168,76,0.7)", fontStyle:"normal" }}
        >
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
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCalendar size={18} color="#C9A84C" />
          <h3
            style={{ fontFamily:"var(--font-bebas)", fontSize:"22px", color:"white", letterSpacing:"0.08em" }}
          >
            UPCOMING
          </h3>
        </div>
        <Link
          href="/events"
          style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"#C9A84C", letterSpacing:"0.14em" }}
          className="uppercase"
        >
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
          <div
            className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ background:`${ev.color}18`, border:`1.5px solid ${ev.color}35` }}
          >
            <ev.Icon size={22} color={ev.color} />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-white truncate"
              style={{ fontFamily:"var(--font-poppins)", fontSize:"12px", fontWeight:600 }}
            >
              {ev.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span style={{ fontFamily:"var(--font-lato)", fontSize:"9px", color:"rgba(255,255,255,0.38)", letterSpacing:"0.06em" }}>
                🕐 {ev.time} · 📍 {ev.place}
              </span>
            </div>
          </div>

          <span
            className="rounded-full px-2.5 py-1 flex-shrink-0"
            style={{ fontFamily:"var(--font-nunito)", fontSize:"9px", fontWeight:700, background:`${ev.color}20`, color:ev.color }}
          >
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
          <motion.button
            key={cat.id}
            whileTap={{ scale:0.9 }}
            onClick={() => onChange(cat.id)}
            className="relative flex-shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 border transition-colors duration-200"
            style={{
              background: on ? "#C9A84C" : "rgba(255,255,255,0.04)",
              borderColor: on ? "#C9A84C" : "rgba(255,255,255,0.08)",
              color: on ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            <cat.Icon size={13} color={on ? "#000" : "rgba(255,255,255,0.5)"} />
            <span style={{ fontFamily:"var(--font-raleway)", fontSize:"11px", fontWeight: on ? 700 : 500, letterSpacing:"0.04em" }}>
              {cat.label}
            </span>
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
      <div className="flex-1 flex flex-col">
        {col1.map((c,i) => <PinTile key={c.id} card={c} idx={i*2} />)}
      </div>
      <div className="flex-1 flex flex-col pt-6">
        {col2.map((c,i) => <PinTile key={c.id} card={c} idx={i*2+1} />)}
      </div>
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
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.35) 0%,transparent 65%)", opacity:0.25 }} />
      <div className="relative z-10 px-6 py-7 text-center">
        <motion.div
          animate={{ y:[0,-7,0] }}
          transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
          className="inline-block mb-3"
        >
          <IconFlame size={32} color="#C9A84C" />
        </motion.div>

        <p
          className="text-white mb-1"
          style={{ fontFamily:"var(--font-abril)", fontSize:"22px" }}
        >
          Join Our Family
        </p>
        <p
          className="mb-5 leading-relaxed"
          style={{ fontFamily:"var(--font-nunito)", fontSize:"12px", color:"rgba(255,255,255,0.48)", fontWeight:400 }}
        >
          A community that prays,<br />grows & serves together.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-full active:scale-95 transition-transform"
          style={{ background:"#C9A84C", color:"#000", padding:"10px 24px", fontFamily:"var(--font-oswald)", fontSize:"13px", fontWeight:600, letterSpacing:"0.14em" }}
        >
          <IconUsers size={16} color="#000" />
          GET INVOLVED
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────── */

export function NativeHome() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchVisible, setSearchVisible] = useState(false);

  const filteredCards =
    activeCategory === "all"
      ? PIN_CARDS
      : PIN_CARDS.filter((c) => c.category === activeCategory);

  return (
    <div
      className="min-h-screen pb-28 overflow-x-hidden relative"
      style={{ background:"#080812", color:"#F0EDE8" }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Orb x="5%"  y="3%"  size={260} gradient="radial-gradient(circle,rgba(201,168,76,0.5),transparent)" delay={0} />
        <Orb x="58%" y="22%" size={210} gradient="radial-gradient(circle,rgba(155,135,245,0.4),transparent)" delay={2.2} />
        <Orb x="0%"  y="58%" size={175} gradient="radial-gradient(circle,rgba(93,163,163,0.4),transparent)" delay={4.5} />
      </div>

      <div className="relative z-10">

        {/* ── Sticky Header ── */}
        <motion.header
          initial={{ opacity:0, y:-32 }}
          animate={{ opacity:1, y:0 }}
          transition={{ type:"spring", stiffness:80, damping:14 }}
          className="sticky top-0 z-50 px-5 py-3.5 flex items-center justify-between"
          style={{ background:"rgba(8,8,18,0.84)", backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Logo wordmark — two-font combo for brand feel */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              {/* Cinzel for the "A" monogram */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-xl"
                style={{ background:"linear-gradient(135deg,#C9A84C,#E8D48A)", fontFamily:"var(--font-cinzel)", fontSize:"18px", color:"#0A0800", fontWeight:700 }}
              >
                A
              </span>
              {/* Bebas for the brand name */}
              <span
                style={{ fontFamily:"var(--font-bebas)", fontSize:"24px", letterSpacing:"0.1em", lineHeight:1,
                  background:"linear-gradient(90deg,#C9A84C,#E8D48A,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}
              >
                AGAPE
              </span>
            </div>
            <span
              style={{ fontFamily:"var(--font-lato)", fontSize:"7px", letterSpacing:"0.22em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginTop:"-1px" }}
            >
              International Church
            </span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale:0.88 }}
              onClick={() => setSearchVisible(!searchVisible)}
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.55)" }}
            >
              <IconSearch size={18} color="rgba(255,255,255,0.55)" />
            </motion.button>
            <motion.button
              whileTap={{ scale:0.88 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center border relative"
              style={{ background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.08)" }}
            >
              <IconBell size={18} color="rgba(255,255,255,0.55)" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </motion.button>
          </div>
        </motion.header>

        {/* ── Search bar ── */}
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
              <input
                type="text"
                placeholder="Search sermons, events, prayers…"
                className="w-full outline-none rounded-xl px-4 py-3"
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#F0EDE8", fontFamily:"var(--font-inter)", fontSize:"13px" }}
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero ── */}
        <HeroParallax />

        {/* ── Quick Actions ── */}
        <div className="mt-6">
          <QuickGrid />
        </div>

        {/* ── Scripture ── */}
        <div className="mt-7">
          <ScriptureCard />
        </div>

        {/* ── Events ── */}
        <div className="mt-8">
          <EventsStrip />
        </div>

        {/* ── Gallery header ── */}
        <div className="mt-9 px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconDove size={18} color="#C9A84C" />
            <h3 style={{ fontFamily:"var(--font-bebas)", fontSize:"22px", color:"white", letterSpacing:"0.08em" }}>
              CHURCH LIFE
            </h3>
          </div>
          <Link
            href="/community"
            style={{ fontFamily:"var(--font-inter)", fontSize:"10px", color:"#C9A84C", letterSpacing:"0.14em" }}
            className="uppercase"
          >
            Gallery →
          </Link>
        </div>

        {/* ── Category Filter ── */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* ── Pinterest Grid ── */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.22 }}
            >
              <MasonryGrid cards={filteredCards} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer Banner ── */}
        <FooterBanner />
      </div>

      <MobileBottomNav />
    </div>
  );
}
