"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateCountdown, getNextFriday } from "@/lib/utils";
import type { LiveStreamStatus } from "@/types";

interface LiveWidgetProps {
  initialStatus?: LiveStreamStatus;
}

export function LiveWidget({ initialStatus }: LiveWidgetProps) {
  const [status, setStatus] = useState<LiveStreamStatus>(
    initialStatus ?? {
      isLive: false,
      videoId: null,
      viewerCount: null,
      title: null,
      thumbnailUrl: null,
    }
  );

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Poll live status every 60s
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/live-status");
        if (res.ok) setStatus(await res.json());
      } catch { /* silent */ }
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  const updateCountdown = useCallback(() => {
    if (!status.isLive) {
      setCountdown(calculateCountdown(getNextFriday()));
    }
  }, [status.isLive]);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  if (status.isLive) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #5B2D8E 0%, #3D1F5E 40%, #C9A84C22 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-sacred/10 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
          {/* Live badge + text */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-live" />
                <span className="font-label text-xs font-semibold text-red-400 tracking-wide">LIVE</span>
              </span>
              {status.viewerCount && (
                <span className="flex items-center gap-1 text-fog text-xs">
                  <Eye size={12} />
                  {status.viewerCount.toLocaleString()} watching
                </span>
              )}
            </div>
            <h3 className="font-heading text-xl font-bold text-ivory">
              {status.title ?? "We're Worshipping Now"}
            </h3>
            <p className="font-body text-fog text-sm">
              Join us live — Agape International
            </p>
          </div>

          {/* Thumbnail */}
          {status.thumbnailUrl && (
            <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0 ring-2 ring-sacred/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={status.thumbnailUrl}
                alt="Live stream thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-midnight/30">
                <div className="w-10 h-10 rounded-full bg-sacred/90 flex items-center justify-center">
                  <Radio size={16} className="text-midnight" />
                </div>
              </div>
            </div>
          )}

          {/* Join CTA */}
          <Link
            href="/live"
            className="shrink-0 px-6 py-3 bg-sacred text-midnight font-label font-semibold text-sm rounded-xl hover:bg-sacred-light transition-colors whitespace-nowrap"
          >
            Join Stream →
          </Link>
        </div>
      </motion.div>
    );
  }

  // Offline — countdown timer
  return (
    <div className="glass rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock size={14} className="text-sacred" />
          <span className="font-accent text-xs text-sacred tracking-widest uppercase">
            Next Service
          </span>
        </div>
        <h3 className="font-heading text-2xl text-ivory">
          Friday is Coming
        </h3>
      </div>

      {/* Countdown boxes */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8">
        {[
          { label: "DAYS", value: countdown.days },
          { label: "HOURS", value: countdown.hours },
          { label: "MIN", value: countdown.minutes },
          { label: "SEC", value: countdown.seconds },
        ].map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <div className="glass rounded-xl p-4 min-w-[64px] text-center">
                <span className="font-label font-bold text-sacred text-3xl sm:text-4xl tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-accent text-[10px] text-fog/70 tracking-widest mt-2">
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className="font-label font-bold text-sacred/40 text-2xl mb-5">:</span>
            )}
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
        {[
          { day: "Friday", times: "9:00 AM & 11:00 AM" },
          { day: "Wednesday", times: "7:00 PM" },
        ].map(({ day, times }) => (
          <div key={day} className="flex flex-col gap-0.5">
            <span className="font-label text-xs text-fog/70 uppercase tracking-wider">{day}</span>
            <span className="font-body text-ivory text-sm">{times}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/sermons"
          className="font-body text-sm text-sacred hover:text-sacred-light transition-colors"
        >
          Watch previous sermons →
        </Link>
      </div>
    </div>
  );
}
