"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar, MapPin, Clock, Users, Grid, CalendarDays, X, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface MultilingualEvent {
  id: string;
  titleKey: string;
  descKey: string;
  location: string;
  start_time: string;
  end_time: string;
  cover_image_url: string | null;
  max_attendees: number | null;
  category: "service" | "men" | "youth" | "women" | "community" | "outreach";
  is_featured: boolean;
  rsvp_count: number;
}

const MOCK_EVENTS: MultilingualEvent[] = [
  { id: "1", titleKey: "event_1_title", descKey: "event_1_desc", location: "Agape International Main Auditorium", start_time: "2026-06-19T19:00:00Z", end_time: "2026-06-19T22:00:00Z", cover_image_url: "/church-photos/church-photo-6.jpeg", max_attendees: 500, category: "service", is_featured: true, rsvp_count: 287 },
  { id: "2", titleKey: "event_2_title", descKey: "event_2_desc", location: "Fellowship Hall", start_time: "2026-06-26T08:00:00Z", end_time: "2026-06-26T10:00:00Z", cover_image_url: "/church-photos/church-photo-1.jpeg", max_attendees: 80, category: "men", is_featured: false, rsvp_count: 34 },
  { id: "3", titleKey: "event_3_title", descKey: "event_3_desc", location: "Blue Ridge Mountain Camp", start_time: "2026-07-14T00:00:00Z", end_time: "2026-07-19T00:00:00Z", cover_image_url: "/church-photos/church-photo-7.jpeg", max_attendees: 120, category: "youth", is_featured: false, rsvp_count: 67 },
  { id: "4", titleKey: "event_4_title", descKey: "event_4_desc", location: "Agape International Campus", start_time: "2026-07-25T09:00:00Z", end_time: "2026-07-26T17:00:00Z", cover_image_url: "/church-photos/church-photo-3.jpeg", max_attendees: 300, category: "women", is_featured: false, rsvp_count: 142 },
  { id: "5", titleKey: "event_5_title", descKey: "event_5_desc", location: "Grace Park Community Center", start_time: "2026-08-02T09:00:00Z", end_time: "2026-08-02T15:00:00Z", cover_image_url: "/church-photos/church-photo-5.jpeg", max_attendees: 200, category: "community", is_featured: false, rsvp_count: 89 },
];

const CATEGORIES = ["all", "service", "youth", "women", "men", "community"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  service: { bg: "rgba(201,168,76,0.15)", text: "#E8D48A", dot: "#C9A84C" },
  youth: { bg: "rgba(139,92,246,0.15)", text: "#C4B5FD", dot: "#8B5CF6" },
  women: { bg: "rgba(236,72,153,0.15)", text: "#FBCFE8", dot: "#EC7299" },
  men: { bg: "rgba(59,130,246,0.15)", text: "#BFDBFE", dot: "#3B82F6" },
  community: { bg: "rgba(16,185,129,0.15)", text: "#A7F3D0", dot: "#10B981" },
  outreach: { bg: "rgba(20,184,166,0.15)", text: "#99F6E4", dot: "#20B8A6" },
};

export function NativeEvents() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [rsvpedIds, setRsvpedIds] = useState<Set<string>>(new Set());
  
  // Details bottom sheet
  const [selectedEvent, setSelectedEvent] = useState<MultilingualEvent | null>(null);

  const handleRsvpToggle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setRsvpedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.error("RSVP cancelled");
      } else {
        next.add(id);
        toast.success("RSVP Confirmed! See you there! 🎉");
      }
      return next;
    });
  };

  const filteredEvents = MOCK_EVENTS.filter(e => {
    return filter === "all" || e.category === filter;
  });

  const col1 = filteredEvents.filter((_, i) => i % 2 === 0);
  const col2 = filteredEvents.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(253,230,138,0.08)] to-transparent blur-[70px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-[rgba(155,135,245,0.06)] to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 px-5 pt-12 pb-4 bg-[rgba(8,8,18,0.85)] backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "0.08em", lineHeight: 1 }} className="text-white">
                EVENTS
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Get Connected
              </span>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex p-0.5 rounded-full bg-white/5 border border-white/5">
            <button 
              onClick={() => setView("cards")} 
              className={cn("p-2 rounded-full", view === "cards" ? "bg-white/10 text-white" : "text-fog")}
            >
              <Grid size={15} />
            </button>
            <button 
              onClick={() => setView("calendar")} 
              className={cn("p-2 rounded-full", view === "calendar" ? "bg-white/10 text-white" : "text-fog")}
            >
              <CalendarDays size={15} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto">
          {view === "cards" ? (
            <div className="pb-10">
              {/* Category selector */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-4">
                {CATEGORIES.map(cat => {
                  const isSelected = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={cn(
                        "shrink-0 px-4 py-2 rounded-full border text-[11px] font-semibold uppercase tracking-wider transition-all",
                        isSelected
                          ? "bg-[#C9A84C] border-[#C9A84C] text-[#080812] font-bold"
                          : "bg-white/5 border-white/5 text-fog active:bg-white/10"
                      )}
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Masonry cards */}
              <div className="flex gap-3 px-4">
                <div className="flex-1 flex flex-col gap-3">
                  {col1.map((ev, idx) => (
                    <EventTile 
                      key={ev.id} 
                      event={ev} 
                      isRsvped={rsvpedIds.has(ev.id)}
                      onRsvp={handleRsvpToggle}
                      onClick={() => setSelectedEvent(ev)}
                      idx={idx * 2}
                      t={t}
                    />
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-3 pt-6">
                  {col2.map((ev, idx) => (
                    <EventTile 
                      key={ev.id} 
                      event={ev} 
                      isRsvped={rsvpedIds.has(ev.id)}
                      onRsvp={handleRsvpToggle}
                      onClick={() => setSelectedEvent(ev)}
                      idx={idx * 2 + 1}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Simple native list calendar */
            <div className="px-5 py-6 space-y-6">
              <h2 className="text-xl font-bold font-playfair border-b border-white/5 pb-2">Upcoming Calendar</h2>
              <div className="space-y-4">
                {MOCK_EVENTS.map((ev, idx) => {
                  const date = new Date(ev.start_time);
                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedEvent(ev)}
                      key={ev.id} 
                      className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 active:bg-white/[0.05] transition-colors"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-sacred/10 border border-sacred/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-lg font-bold font-space-grotesk text-[#C9A84C]">{date.getDate()}</span>
                        <span className="text-[9px] uppercase font-bold text-white/50">{date.toLocaleString(language, { month: "short" })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold truncate text-white">{t(ev.titleKey) || ev.titleKey}</h3>
                        <p className="text-xs text-fog/70 mt-1 flex items-center gap-1"><MapPin size={11} className="text-[#C9A84C]" /> {ev.location}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Details Bottom Drawer */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#0c0c16] rounded-t-[32px] border-t border-white/10 shadow-2xl z-50 overflow-y-auto px-6 pt-5 pb-8 flex flex-col"
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-6 shrink-0" onClick={() => setSelectedEvent(null)} />
              
              {selectedEvent.cover_image_url && (
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shrink-0">
                  <img src={selectedEvent.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent" />
                </div>
              )}

              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-2"
                      style={{ 
                        background: CATEGORY_COLORS[selectedEvent.category]?.bg || "rgba(255,255,255,0.1)", 
                        color: CATEGORY_COLORS[selectedEvent.category]?.text || "#fff" 
                      }}
                    >
                      {selectedEvent.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                      {t(selectedEvent.titleKey) || selectedEvent.titleKey}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-fog hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="text-sm text-fog/80 leading-relaxed font-body">
                  {t(selectedEvent.descKey) || selectedEvent.descKey}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A84C]"><Calendar size={14} /></div>
                    <span>{new Date(selectedEvent.start_time).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A84C]"><Clock size={14} /></div>
                    <span>{new Date(selectedEvent.start_time).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A84C]"><MapPin size={14} /></div>
                    <span className="truncate">{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A84C]"><Users size={14} /></div>
                    <span>{selectedEvent.rsvp_count} Attending</span>
                  </div>
                </div>

                <div className="pt-6 shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleRsvpToggle(selectedEvent.id)}
                    className={cn(
                      "w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2",
                      rsvpedIds.has(selectedEvent.id)
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                        : "bg-[#C9A84C] text-[#080812]"
                    )}
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {rsvpedIds.has(selectedEvent.id) ? (
                      <>
                        <Check size={14} /> ATTENDING (CANCEL)
                      </>
                    ) : (
                      "RSVP FOR THIS EVENT"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </div>
  );
}

function EventTile({
  event,
  isRsvped,
  onRsvp,
  onClick,
  idx,
  t
}: {
  event: MultilingualEvent;
  isRsvped: boolean;
  onRsvp: (id: string, e?: React.MouseEvent) => void;
  onClick: () => void;
  idx: number;
  t: (key: string) => string;
}) {
  const color = CATEGORY_COLORS[event.category] || { bg: "rgba(255,255,255,0.05)", text: "#fff", dot: "#C9A84C" };
  const date = new Date(event.start_time);

  // Pinterest fonts
  const cardTitleFonts = ["var(--font-playfair)", "var(--font-cormorant)", "var(--font-poppins)"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: (idx % 6) * 0.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="rounded-[24px] overflow-hidden cursor-pointer relative"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Event image or category default overlay */}
      <div className="relative h-36 bg-gradient-to-br from-[#121226] to-[#08080f] overflow-hidden flex items-center justify-center">
        {event.cover_image_url ? (
          <img src={event.cover_image_url} alt="Cover" className="w-full h-full object-cover opacity-80" />
        ) : (
          <Calendar size={40} className="text-white/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-[#080812]/10 to-transparent" />
        
        {/* Date bubble */}
        <div className="absolute top-3 left-3 bg-[#080812]/70 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/10 flex flex-col items-center">
          <span className="text-xs font-bold leading-none font-space-grotesk text-[#C9A84C]">{date.getDate()}</span>
          <span className="text-[8px] uppercase tracking-wider text-white/50 leading-none mt-0.5">{date.toLocaleString("en", { month: "short" })}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <span 
            className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider inline-block mb-1.5"
            style={{ background: color.bg, color: color.text }}
          >
            {event.category}
          </span>
          <h4 
            className="text-sm font-bold text-white leading-snug line-clamp-2"
            style={{ fontFamily: cardTitleFonts[idx % cardTitleFonts.length] }}
          >
            {t(event.titleKey) || event.titleKey}
          </h4>
        </div>

        <div className="space-y-1 text-[10px] text-fog/60 font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={10} className="text-[#C9A84C]" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={10} className="text-[#C9A84C]" />
            <span>{date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
          </div>
        </div>

        {/* RSVP button */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => onRsvp(event.id, e)}
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
              isRsvped
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "border-white/5 hover:border-white/10 text-fog hover:text-white"
            )}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {isRsvped ? "Going" : "RSVP"}
          </motion.button>
          
          <span className="text-[9px] text-white/20 font-mono">
            {event.rsvp_count} joined
          </span>
        </div>
      </div>
    </motion.div>
  );
}
