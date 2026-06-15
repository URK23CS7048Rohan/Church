"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatDate, formatDateShort } from "@/lib/utils";
import type { Event } from "@/types";

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Worship Night",
    description: "An evening of praise, worship, and community under the stars.",
    location: "Agape International Main Auditorium",
    start_time: "2026-06-21T19:00:00Z",
    end_time: "2026-06-21T22:00:00Z",
    cover_image_url: "/church-photos/church-photo-6.jpeg",
    max_attendees: 500,
    category: "service",
    is_featured: true,
    rsvp_count: 287,
    created_at: "2026-06-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Men's Breakfast",
    description: "Monthly gathering for men — food, fellowship, and faith.",
    location: "Fellowship Hall",
    start_time: "2026-06-28T08:00:00Z",
    end_time: "2026-06-28T10:00:00Z",
    cover_image_url: "/church-photos/church-photo-1.jpeg",
    max_attendees: 80,
    category: "men",
    is_featured: false,
    rsvp_count: 34,
    created_at: "2026-06-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Youth Camp Registration",
    description: "Sign your teen up for an unforgettable week of faith and adventure.",
    location: "Blue Ridge Mountain Camp",
    start_time: "2026-07-14T00:00:00Z",
    end_time: "2026-07-19T00:00:00Z",
    cover_image_url: "/church-photos/church-photo-7.jpeg",
    max_attendees: 120,
    category: "youth",
    is_featured: false,
    rsvp_count: 67,
    created_at: "2026-06-01T00:00:00Z",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  service: "Worship",
  youth: "Youth",
  women: "Women",
  men: "Men",
  community: "Community",
  other: "Event",
};

const CATEGORY_COLORS: Record<string, string> = {
  service: "bg-sacred/20 text-sacred",
  youth: "bg-violet/20 text-violet-light",
  women: "bg-pink-500/20 text-pink-300",
  men: "bg-blue-500/20 text-blue-300",
  community: "bg-emerald-500/20 text-emerald-300",
  other: "bg-fog/20 text-fog",
};

interface EventsTeaserProps {
  events?: Event[];
}

export function EventsTeaser({ events = MOCK_EVENTS }: EventsTeaserProps) {
  const [featured, ...rest] = events;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Calendar"
            title="Upcoming"
            titleHighlight="Events"
            align="left"
          />
          <RevealOnScroll direction="left">
            <Link
              href="/events"
              className="font-body text-sm text-sacred hover:text-sacred-light transition-colors hidden sm:block"
            >
              View all events →
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured event — wide */}
          {featured && (
            <RevealOnScroll className="lg:col-span-3">
              <Link href={`/events/${featured.id}`}>
                <div className="group relative rounded-2xl overflow-hidden bg-surface-2 cursor-pointer h-full min-h-[280px]">
                  {featured.cover_image_url && (
                    <img
                      src={featured.cover_image_url}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/40 to-transparent" />
                  <div className="relative flex flex-col justify-end h-full p-6">
                    <span
                      className={`self-start px-2.5 py-1 rounded-full text-xs font-label font-semibold mb-3 ${CATEGORY_COLORS[featured.category]}`}
                    >
                      {CATEGORY_LABELS[featured.category]}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-ivory mb-2 group-hover:text-sacred transition-colors">
                      {featured.title}
                    </h3>
                    <p className="font-body text-fog/80 text-sm mb-4 line-clamp-2">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-fog/70 font-label">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-sacred" />
                        {formatDate(featured.start_time)}
                      </span>
                      {featured.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-sacred" />
                          {featured.location}
                        </span>
                      )}
                      {featured.rsvp_count !== undefined && (
                        <span className="flex items-center gap-1.5">
                          <Users size={12} className="text-sacred" />
                          {featured.rsvp_count} going
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          {/* Side events */}
          <StaggerContainer className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((event) => (
              <StaggerItem key={event.id}>
                <Link href={`/events/${event.id}`}>
                  <div className="group glass rounded-xl p-4 cursor-pointer hover:border-sacred/30 transition-all duration-200">
                    <div className="flex gap-4 items-start">
                      {/* Date block */}
                      <div className="shrink-0 w-12 text-center">
                        <div className="font-label font-bold text-sacred text-xl leading-none">
                          {new Date(event.start_time).getDate()}
                        </div>
                        <div className="font-accent text-[10px] text-fog/60 uppercase tracking-wider mt-0.5">
                          {new Date(event.start_time).toLocaleString("default", { month: "short" })}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-[10px] font-label font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[event.category]}`}
                        >
                          {CATEGORY_LABELS[event.category]}
                        </span>
                        <h4 className="font-heading text-base font-semibold text-ivory group-hover:text-sacred transition-colors mt-1 mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-fog/60">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(event.start_time).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                          {event.rsvp_count !== undefined && (
                            <span className="flex items-center gap-1">
                              <Users size={10} /> {event.rsvp_count} going
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
