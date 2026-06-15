"use client";

import { useState } from "react";
import Link from "next/link";
import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { YouTubeEmbed } from "@/components/live/YouTubeEmbed";
import { SermonNotes } from "@/components/live/SermonNotes";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { formatDate, formatDuration, getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/utils";
import { Clock, Eye, Calendar, Share2, Copy, ChevronLeft, Tag } from "lucide-react";
import { MOCK_SERMONS } from "@/lib/sermonData";

export default function SermonDetailPage({ params }: { params: { id: string } }) {
  // Find the sermon or fallback to first
  const sermon = MOCK_SERMONS.find(s => s.id === params.id) || MOCK_SERMONS[0];
  const videoId = getYouTubeVideoId(sermon.youtube_url);
  
  // Get related sermons (just other ones from the list)
  const related = MOCK_SERMONS.filter(s => s.id !== sermon.id).slice(0, 3);

  return (
    <NativePageWrapper title="Sermons" accentColor="#C9A84C" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back link */}
          <RevealOnScroll>
            <Link href="/sermons" className="inline-flex items-center gap-1.5 font-body text-sm text-fog hover:text-sacred transition-colors mb-6">
              <ChevronLeft size={16} /> Back to Sermons
            </Link>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <RevealOnScroll>
                {videoId ? (
                  <YouTubeEmbed videoId={videoId} title={sermon.title} />
                ) : (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-2 flex items-center justify-center">
                    <p className="font-label text-fog">Video unavailable</p>
                  </div>
                )}
              </RevealOnScroll>

              <RevealOnScroll>
                <div>
                  {sermon.series && (
                    <span className="font-label text-xs text-violet-light bg-violet/20 px-3 py-1 rounded-full">
                      {sermon.series}
                    </span>
                  )}
                  <h1 className="font-display text-4xl font-bold text-ivory mt-3 mb-2">{sermon.title}</h1>
                  <p className="font-body text-fog text-lg mb-1">{sermon.speaker}</p>
                  <div className="flex flex-wrap gap-4 text-xs font-label text-fog/60 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(sermon.sermon_date)}</span>
                    {sermon.duration_seconds && <span className="flex items-center gap-1"><Clock size={11} /> {formatDuration(sermon.duration_seconds)}</span>}
                    <span className="flex items-center gap-1"><Eye size={11} /> {sermon.view_count.toLocaleString()} views</span>
                  </div>
                  <GoldDivider className="mb-4" />
                  <p className="font-body text-fog/90 text-base leading-relaxed">{sermon.description}</p>
                </div>
              </RevealOnScroll>

              {/* Tags */}
              {sermon.tags && sermon.tags.length > 0 && (
                <RevealOnScroll>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={14} className="text-sacred/60" />
                    {sermon.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-surface-2 border border-white/10 font-label text-xs text-fog">
                        {tag}
                      </span>
                    ))}
                  </div>
                </RevealOnScroll>
              )}

              {/* Share */}
              <RevealOnScroll>
                <div className="flex items-center gap-3">
                  <span className="font-label text-xs text-fog/60 uppercase tracking-wider">Share</span>
                  {[
                    { label: "Copy Link", icon: Copy, action: () => navigator.clipboard.writeText(window.location.href) },
                    { label: "WhatsApp", icon: Share2, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(sermon.title + " — " + window.location.href)}`) },
                  ].map(({ label, icon: Icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-fog hover:text-ivory text-xs font-label transition-colors"
                    >
                      <Icon size={12} /> {label}
                    </button>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notes */}
              <RevealOnScroll delay={0.1}>
                <div className="glass rounded-2xl overflow-hidden">
                  <SermonNotes sermonId={sermon.id} />
                </div>
              </RevealOnScroll>

              {/* Related */}
              <RevealOnScroll delay={0.2}>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ivory mb-4">Related Sermons</h3>
                  <div className="space-y-3">
                    {related.map((r) => {
                      const vid = getYouTubeVideoId(r.youtube_url);
                      const thumb = r.thumbnail_url ?? (vid ? getYouTubeThumbnail(vid) : "");
                      
                      return (
                        <Link key={r.id} href={`/sermons/${r.id}`}>
                          <div className="group flex gap-3 glass rounded-xl p-3 hover:border-sacred/30 transition-all">
                            <div className="relative w-20 aspect-video rounded-lg overflow-hidden bg-surface-2 shrink-0">
                              {thumb && <img src={thumb} alt={r.title} className="w-full h-full object-cover" />}
                            </div>
                            <div>
                              <p className="font-heading text-sm font-semibold text-ivory group-hover:text-sacred transition-colors line-clamp-2">{r.title}</p>
                              <p className="font-body text-fog/60 text-xs mt-1">{r.speaker}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
    </NativePageWrapper>
  );
}
