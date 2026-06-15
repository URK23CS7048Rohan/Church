"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
  className?: string;
  title?: string;
}

export function YouTubeEmbed({
  videoId,
  autoplay = false,
  className,
  title = "Agape International Sermon",
}: YouTubeEmbedProps) {
  const [clicked, setClicked] = useState(autoplay);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!clicked) {
    return (
      <div
        className={cn(
          "relative aspect-video rounded-2xl overflow-hidden bg-surface-2 cursor-pointer group",
          className
        )}
        onClick={() => setClicked(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setClicked(true)}
        aria-label={`Play ${title}`}
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-midnight/30 group-hover:bg-midnight/20 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-sacred/90 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-sacred shadow-[0_0_40px_rgba(201,168,76,0.5)]">
            <Play size={28} className="text-midnight fill-midnight ml-2" />
          </div>
        </div>

        {/* "Click to play" hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 glass rounded-full">
          <span className="font-label text-xs text-ivory">Click to play</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-video rounded-2xl overflow-hidden bg-surface-2", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
