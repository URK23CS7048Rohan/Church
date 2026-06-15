"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Calendar, MapPin, Users, Clock, Grid3x3, CalendarDays } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Event, EventCategory } from "@/types";

interface MultilingualEvent {
  id: string;
  titleKey: string;
  descKey: string;
  location: string;
  start_time: string;
  end_time: string;
  cover_image_url: string | null;
  max_attendees: number | null;
  category: EventCategory;
  is_featured: boolean;
  rsvp_count: number;
}

const MOCK_EVENTS: MultilingualEvent[] = [
  { id: "1", titleKey: "event_1_title", descKey: "event_1_desc", location: "Agape International Main Auditorium", start_time: "2026-06-21T19:00:00Z", end_time: "2026-06-21T22:00:00Z", cover_image_url: "/church-photos/church-photo-6.jpeg", max_attendees: 500, category: "service", is_featured: true, rsvp_count: 287 },
  { id: "2", titleKey: "event_2_title", descKey: "event_2_desc", location: "Fellowship Hall", start_time: "2026-06-28T08:00:00Z", end_time: "2026-06-28T10:00:00Z", cover_image_url: "/church-photos/church-photo-1.jpeg", max_attendees: 80, category: "men", is_featured: false, rsvp_count: 34 },
  { id: "3", titleKey: "event_3_title", descKey: "event_3_desc", location: "Blue Ridge Mountain Camp", start_time: "2026-07-14T00:00:00Z", end_time: "2026-07-19T00:00:00Z", cover_image_url: "/church-photos/church-photo-7.jpeg", max_attendees: 120, category: "youth", is_featured: false, rsvp_count: 67 },
  { id: "4", titleKey: "event_4_title", descKey: "event_4_desc", location: "Agape International Campus", start_time: "2026-07-25T09:00:00Z", end_time: "2026-07-26T17:00:00Z", cover_image_url: "/church-photos/church-photo-3.jpeg", max_attendees: 300, category: "women", is_featured: false, rsvp_count: 142 },
  { id: "5", titleKey: "event_5_title", descKey: "event_5_desc", location: "Grace Park Community Center", start_time: "2026-08-02T09:00:00Z", end_time: "2026-08-02T15:00:00Z", cover_image_url: "/church-photos/church-photo-5.jpeg", max_attendees: 200, category: "community", is_featured: false, rsvp_count: 89 },
  { id: "6", titleKey: "event_6_title", descKey: "event_6_desc", location: "Online & In-Person", start_time: "2026-08-10T00:00:00Z", end_time: "2026-08-17T00:00:00Z", cover_image_url: null, max_attendees: null, category: "service", is_featured: false, rsvp_count: 203 },
  { id: "7", titleKey: "event_7_title", descKey: "event_7_desc", location: "Downtown Plaza", start_time: "2026-06-25T17:00:00Z", end_time: "2026-06-25T20:00:00Z", cover_image_url: null, max_attendees: 50, category: "outreach", is_featured: false, rsvp_count: 12 },
];

const CATEGORY_FILTERS: { id: EventCategory | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "events_filter_all" },
  { id: "service", labelKey: "events_filter_service" },
  { id: "youth", labelKey: "events_filter_youth" },
  { id: "women", labelKey: "events_filter_women" },
  { id: "men", labelKey: "events_filter_men" },
  { id: "community", labelKey: "events_filter_community" },
  { id: "outreach", labelKey: "events_filter_outreach" },
];

const CATEGORY_COLORS: Record<string, string> = {
  service: "bg-sacred/10 text-sacred-dark border border-sacred/20",
  youth: "bg-violet/10 text-violet border border-violet/20",
  women: "bg-pink-500/10 text-pink-700 border border-pink-500/20",
  men: "bg-blue-500/10 text-blue-800 border border-blue-500/20",
  community: "bg-emerald-500/10 text-emerald-800 border border-emerald-500/20",
  outreach: "bg-teal-500/10 text-teal-800 border border-teal-500/20",
  other: "bg-fog/10 text-fog border border-fog/20",
};

export default function EventsPage() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<EventCategory | "all">("all");
  const [view, setView] = useState<"grid" | "calendar">("grid");

  const filtered = filter === "all" ? MOCK_EVENTS : MOCK_EVENTS.filter((e) => e.category === filter);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 lg:pb-0">
        {/* Hero */}
        <div className="relative pt-32 pb-12 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,45,142,0.12) 0%, transparent 70%)" }} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between flex-wrap gap-4">
                <SectionHeader eyebrow={t("events_eyebrow")} title={t("events_title")} titleHighlight={t("events_title_highlight")} subtitle={t("events_subtitle")} align="left" />
                {/* View toggle */}
                <div className="flex gap-1 p-1 glass rounded-xl">
                  <button onClick={() => setView("grid")} className={cn("p-2 rounded-lg transition-colors", view === "grid" ? "bg-sacred text-midnight" : "text-fog hover:text-ivory")} id="events-grid-view"><Grid3x3 size={16} /></button>
                  <button onClick={() => setView("calendar")} className={cn("p-2 rounded-lg transition-colors", view === "calendar" ? "bg-sacred text-midnight" : "text-fog hover:text-ivory")} id="events-calendar-view"><CalendarDays size={16} /></button>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 max-w-2xl">
                <p className="font-body text-fog italic text-sm">
                  "{t("events_scripture")}"
                </p>
                <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
                  {t("events_scripture_ref")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button key={cat.id} onClick={() => setFilter(cat.id)} className={cn("shrink-0 px-4 py-2 rounded-full font-label text-sm font-semibold border transition-all duration-200", filter === cat.id ? "bg-sacred text-midnight border-sacred" : "border-white/10 text-fog hover:text-ivory hover:border-white/20")} id={`event-filter-${cat.id}`}>
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-fog font-body">{t("events_no_results")}</div>
          ) : view === "grid" ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <CalendarView events={filtered} />
          )}
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

function EventCard({ event }: { event: MultilingualEvent }) {
  const { t, language } = useLanguage();
  const [rsvped, setRsvped] = useState(false);

  // Parse date and construct strings localized automatically or via dictionary
  const eventDate = new Date(event.start_time);
  const formattedDayNum = eventDate.toLocaleString(language, { day: "numeric" });
  const formattedMonthShort = eventDate.toLocaleString(language, { month: "short" });

  const categoryLabel = t(`events_filter_${event.category}`);

  return (
    <div className="group glass rounded-2xl overflow-hidden hover:border-sacred/30 transition-all duration-200">
      {event.cover_image_url && (
        <div className="relative h-48 overflow-hidden">
          <img src={event.cover_image_url} alt={t(event.titleKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={cn("px-2.5 py-1 rounded-full text-xs font-label font-semibold", CATEGORY_COLORS[event.category])}>
              {categoryLabel}
            </span>
          </div>
          {/* Date overlay */}
          <div className="absolute bottom-3 left-3 glass px-3 py-2 rounded-xl">
            <div className="font-label font-bold text-sacred text-lg leading-none">{formattedDayNum}</div>
            <div className="font-accent text-[10px] text-ivory/70 uppercase tracking-wider">{formattedMonthShort}</div>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-ivory mb-1 group-hover:text-sacred transition-colors">{t(event.titleKey)}</h3>
        <p className="font-body text-fog text-sm mb-3 line-clamp-2">{t(event.descKey)}</p>
        <div className="space-y-1.5 mb-4">
          {event.location && (
            <div className="flex items-center gap-2 text-xs text-fog/70 font-label">
              <MapPin size={11} className="text-sacred shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-fog/70 font-label">
            <Clock size={11} className="text-sacred shrink-0" />
            <span>{eventDate.toLocaleTimeString(language, { hour: "numeric", minute: "2-digit" })}</span>
          </div>
          {event.rsvp_count !== undefined && (
            <div className="flex items-center gap-2 text-xs text-fog/70 font-label">
              <Users size={11} className="text-sacred shrink-0" />
              <span>{event.rsvp_count} {t("events_going_label")}{event.max_attendees ? ` ${t("events_of_label")} ${event.max_attendees}` : ""}</span>
            </div>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setRsvped((v) => !v)}
          className={cn("w-full py-2.5 rounded-xl font-label text-sm font-semibold transition-all duration-200", rsvped ? "bg-sacred/15 text-sacred border border-sacred/30" : "bg-sacred text-midnight hover:bg-sacred-light")}
          id={`rsvp-${event.id}`}
        >
          {rsvped ? `✓ ${t("events_card_going")}` : t("events_card_rsvp")}
        </motion.button>
      </div>
    </div>
  );
}

function CalendarView({ events }: { events: MultilingualEvent[] }) {
  const { t, language } = useLanguage();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleString(language, { month: "long" });

  const eventsByDay: Record<number, MultilingualEvent[]> = {};
  events.forEach((e) => {
    const d = new Date(e.start_time);
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(e);
    }
  });

  // Localized weekdays
  const baseDate = new Date(2026, 0, 4); // A Sunday
  const weekdays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return d.toLocaleString(language, { weekday: "short" });
  });

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-heading text-xl font-bold text-ivory mb-6">{monthName} {year}</h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((d, i) => (
          <div key={i} className="text-center font-label text-xs text-fog/60 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = eventsByDay[day] ?? [];
          const isToday = day === today.getDate();
          return (
            <div key={day} className={cn("min-h-[56px] p-1.5 rounded-lg transition-colors", isToday ? "bg-sacred/15 ring-1 ring-sacred/50" : "hover:bg-surface-2")}>
              <span className={cn("font-label text-xs font-semibold block mb-1", isToday ? "text-sacred" : "text-fog/70")}>{day.toLocaleString(language)}</span>
              {dayEvents.map((e) => (
                <div key={e.id} className={cn("text-[9px] px-1 py-0.5 rounded truncate font-label", CATEGORY_COLORS[e.category])}>{t(e.titleKey)}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
