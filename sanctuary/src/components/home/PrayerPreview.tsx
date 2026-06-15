"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Clock, Tag } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { formatRelativeTime } from "@/lib/utils";
import type { PrayerRequest } from "@/types";

const MOCK_PRAYERS: PrayerRequest[] = [
  {
    id: "1",
    user_id: "u1",
    title: "Healing for my mother",
    body: "My mother was recently diagnosed with cancer. We're believing God for a miracle and complete healing. Please stand with us in prayer.",
    is_public: true,
    is_anonymous: false,
    is_approved: true,
    is_answered: false,
    pray_count: 47,
    category: "healing",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    profile: { full_name: "Marcus Thompson", avatar_url: null },
  },
  {
    id: "2",
    user_id: "u2",
    title: "Direction for my career",
    body: "I've been at a crossroads with my career for months. Asking for clarity, peace, and God's wisdom about which path to take.",
    is_public: true,
    is_anonymous: false,
    is_approved: true,
    is_answered: false,
    pray_count: 23,
    category: "guidance",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    profile: { full_name: "Anonymous", avatar_url: null },
  },
  {
    id: "3",
    user_id: "u3",
    title: "Financial breakthrough needed",
    body: "Our family is going through a very difficult time financially. Trusting God to open doors and provide for our needs.",
    is_public: true,
    is_anonymous: true,
    is_approved: true,
    is_answered: false,
    pray_count: 31,
    category: "provision",
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    profile: { full_name: "Anonymous", avatar_url: null },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  healing: "bg-red-500/20 text-red-300 border-red-500/20",
  provision: "bg-sacred/20 text-sacred border-sacred/20",
  guidance: "bg-violet/20 text-violet-light border-violet/20",
  family: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
  other: "bg-fog/20 text-fog border-fog/20",
};

interface PrayerPreviewProps {
  prayers?: PrayerRequest[];
}

export function PrayerPreview({ prayers = MOCK_PRAYERS }: PrayerPreviewProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Community"
            title="Prayer"
            titleHighlight="Wall"
            subtitle="Standing together in faith for one another."
            align="left"
          />
          <Link
            href="/prayer"
            className="font-body text-sm text-sacred hover:text-sacred-light transition-colors hidden sm:block"
          >
            See all prayers →
          </Link>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-8">
          {prayers.map((prayer) => (
            <StaggerItem key={prayer.id}>
              <PrayerPreviewCard prayer={prayer} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Link href="/prayer">
            <button className="px-8 py-3.5 border border-sacred/30 text-sacred font-label font-semibold text-sm rounded-xl hover:border-sacred hover:bg-sacred/5 transition-all duration-200">
              Submit a Prayer Request
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PrayerPreviewCard({ prayer }: { prayer: PrayerRequest }) {
  const [prayCount, setPrayCount] = useState(prayer.pray_count);
  const [hasPrayed, setHasPrayed] = useState(false);
  const [burst, setBurst] = useState(false);

  const handlePray = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasPrayed) return;
    setHasPrayed(true);
    setPrayCount((c) => c + 1);
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  };

  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-4 hover:border-sacred/25 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-fog text-xs font-label font-semibold">
            {prayer.is_anonymous || !prayer.profile
              ? "🙏"
              : prayer.profile.full_name.charAt(0)}
          </div>
          <div>
            <p className="font-label text-xs font-semibold text-ivory">
              {prayer.is_anonymous ? "Anonymous" : prayer.profile?.full_name}
            </p>
            <p className="font-body text-[10px] text-fog/60">
              {formatRelativeTime(prayer.created_at)}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full border text-[10px] font-label capitalize ${CATEGORY_COLORS[prayer.category] ?? CATEGORY_COLORS.other}`}
        >
          {prayer.category}
        </span>
      </div>

      {/* Content */}
      <div>
        <h4 className="font-heading text-sm font-semibold text-ivory mb-1.5">
          {prayer.title}
        </h4>
        <p className="font-body text-fog text-sm leading-relaxed line-clamp-3">
          {prayer.body}
        </p>
      </div>

      {/* Pray button */}
      <div className="mt-auto pt-2 border-t border-white/5">
        <motion.button
          onClick={handlePray}
          whileTap={{ scale: 0.92 }}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-label font-semibold transition-all duration-200 ${
            hasPrayed
              ? "bg-sacred/15 text-sacred border border-sacred/30"
              : "text-fog hover:text-ivory hover:bg-white/5"
          }`}
          disabled={hasPrayed}
          id={`pray-btn-${prayer.id}`}
        >
          <AnimatePresence>
            {burst && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HandHeart size={20} className="text-sacred" />
              </motion.span>
            )}
          </AnimatePresence>
          <HandHeart size={16} />
          {hasPrayed ? "Prayed" : "Pray"} · {prayCount}
        </motion.button>
      </div>
    </div>
  );
}
