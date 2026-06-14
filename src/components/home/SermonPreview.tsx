"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { formatDate, formatDuration, getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/utils";
import type { Sermon } from "@/types";

// Mock data for display when no DB connected
const MOCK_SERMONS: Sermon[] = [
  {
    id: "1",
    title: "When God Moves in the Valley",
    speaker: "Pastor David Mitchell",
    series: "Mountains & Valleys",
    description: "A powerful message about trusting God in your lowest seasons.",
    youtube_url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: null,
    duration_seconds: 2820,
    sermon_date: "2026-06-08",
    tags: ["faith", "valley", "trust"],
    view_count: 1847,
    created_at: "2026-06-08T11:00:00Z",
  },
  {
    id: "2",
    title: "The Power of Community",
    speaker: "Pastor Sarah Mitchell",
    series: "We Are One",
    description: "Why belonging to a church family changes everything.",
    youtube_url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: null,
    duration_seconds: 2340,
    sermon_date: "2026-06-01",
    tags: ["community", "belonging"],
    view_count: 2103,
    created_at: "2026-06-01T09:00:00Z",
  },
  {
    id: "3",
    title: "Radical Generosity",
    speaker: "Pastor David Mitchell",
    series: "Kingdom Economy",
    description: "What the Bible truly says about giving and abundance.",
    youtube_url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: null,
    duration_seconds: 3060,
    sermon_date: "2026-05-25",
    tags: ["giving", "generosity", "stewardship"],
    view_count: 3421,
    created_at: "2026-05-25T09:00:00Z",
  },
];

interface SermonPreviewProps {
  sermons?: Sermon[];
}

export function SermonPreview({ sermons = MOCK_SERMONS }: SermonPreviewProps) {
  const [featured, ...rest] = sermons;

  return (
    <section className="py-20 px-4 bg-surface-1/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Word"
            title="Latest"
            titleHighlight="Sermons"
            align="left"
          />
          <RevealOnScroll direction="left">
            <Link
              href="/sermons"
              className="font-body text-sm text-sacred hover:text-sacred-light transition-colors hidden sm:block"
            >
              View all sermons →
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured sermon */}
          {featured && (
            <RevealOnScroll className="lg:col-span-2">
              <SermonCardFeatured sermon={featured} />
            </RevealOnScroll>
          )}

          {/* Side sermons */}
          <StaggerContainer className="flex flex-col gap-4">
            {rest.slice(0, 2).map((sermon) => (
              <StaggerItem key={sermon.id}>
                <SermonCardCompact sermon={sermon} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile view all */}
        <div className="mt-6 text-center sm:hidden">
          <Link href="/sermons" className="font-body text-sm text-sacred">
            View all sermons →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SermonCardFeatured({ sermon }: { sermon: Sermon }) {
  const videoId = getYouTubeVideoId(sermon.youtube_url);
  const thumbnail = sermon.thumbnail_url ?? (videoId ? getYouTubeThumbnail(videoId, "maxresdefault") : "/placeholder-sermon.jpg");

  return (
    <Link href={`/sermons/${sermon.id}`}>
      <div className="group relative rounded-2xl overflow-hidden glass cursor-pointer h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-surface-2">
          <img
            src={thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-sacred/90 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-sacred shadow-[0_0_32px_rgba(201,168,76,0.4)]">
              <Play size={24} className="text-midnight fill-midnight ml-1" />
            </div>
          </div>
          {sermon.duration_seconds && (
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-midnight/80 backdrop-blur-sm">
              <span className="font-label text-xs text-ivory">
                {formatDuration(sermon.duration_seconds)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          {sermon.series && (
            <span className="font-accent text-xs text-sacred/80 tracking-widest uppercase">
              {sermon.series}
            </span>
          )}
          <h3 className="font-heading text-xl font-bold text-ivory mt-1 mb-1 group-hover:text-sacred transition-colors">
            {sermon.title}
          </h3>
          <p className="font-body text-fog text-sm mb-3">{sermon.speaker}</p>
          <div className="flex items-center gap-4 text-fog/60 text-xs font-label">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {formatDate(sermon.sermon_date)}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} /> {sermon.view_count.toLocaleString()} views
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SermonCardCompact({ sermon }: { sermon: Sermon }) {
  const videoId = getYouTubeVideoId(sermon.youtube_url);
  const thumbnail = sermon.thumbnail_url ?? (videoId ? getYouTubeThumbnail(videoId) : "/placeholder-sermon.jpg");

  return (
    <Link href={`/sermons/${sermon.id}`}>
      <div className="group flex gap-4 p-4 glass rounded-xl cursor-pointer hover:border-sacred/30 transition-all duration-200">
        <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-surface-2 shrink-0">
          <img
            src={thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-midnight/20 group-hover:bg-midnight/10 transition-colors">
            <Play size={14} className="text-sacred fill-sacred" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {sermon.series && (
            <span className="font-accent text-[10px] text-sacred/70 tracking-widest uppercase">
              {sermon.series}
            </span>
          )}
          <h4 className="font-heading text-sm font-semibold text-ivory group-hover:text-sacred transition-colors line-clamp-2 mt-0.5">
            {sermon.title}
          </h4>
          <p className="font-body text-fog text-xs mt-1">{sermon.speaker}</p>
          <p className="font-body text-fog/50 text-xs mt-1">{formatDate(sermon.sermon_date)}</p>
        </div>
      </div>
    </Link>
  );
}
