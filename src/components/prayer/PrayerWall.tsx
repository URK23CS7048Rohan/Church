"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { PrayerRequest, PrayerCategory } from "@/types";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface MultilingualPrayerRequest {
  id: string;
  user_id: string;
  titleKey?: string;
  bodyKey?: string;
  title: string;
  body: string;
  is_public: boolean;
  is_anonymous: boolean;
  is_approved: boolean;
  is_answered: boolean;
  pray_count: number;
  category: PrayerCategory;
  created_at: string;
  profile?: {
    full_name: string;
    avatar_url: string | null;
  };
}

const CATEGORIES: { id: PrayerCategory | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "prayer_cat_all" },
  { id: "healing", labelKey: "prayer_cat_healing" },
  { id: "provision", labelKey: "prayer_cat_provision" },
  { id: "guidance", labelKey: "prayer_cat_guidance" },
  { id: "family", labelKey: "prayer_cat_family" },
  { id: "other", labelKey: "prayer_cat_other" },
];

const CATEGORY_STYLES: Record<string, string> = {
  healing: "bg-red-500/10 text-red-800 border-red-500/20",
  provision: "bg-sacred/10 text-sacred-dark border border-sacred/20",
  guidance: "bg-violet/10 text-violet border-violet/20",
  family: "bg-emerald-500/10 text-emerald-800 border-emerald-500/20",
  other: "bg-fog/10 text-fog border-fog/20",
};

// Mock data with translation keys
const MOCK_PRAYERS: MultilingualPrayerRequest[] = [
  { id: "1", user_id: "u1", titleKey: "prayer_1_title", bodyKey: "prayer_1_body", title: "Healing for my mother", body: "My mother was recently diagnosed with cancer. We're believing God for a miracle and complete healing. Please stand with us in prayer as we trust God through this difficult season.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 47, category: "healing", created_at: new Date(Date.now() - 2 * 3600000).toISOString(), profile: { full_name: "Marcus Thompson", avatar_url: null } },
  { id: "2", user_id: "u2", titleKey: "prayer_2_title", bodyKey: "prayer_2_body", title: "Direction for my career", body: "I've been at a crossroads for months. Asking for clarity, peace, and God's wisdom about which path to take. Should I stay or is He calling me somewhere new?", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 23, category: "guidance", created_at: new Date(Date.now() - 6 * 3600000).toISOString(), profile: { full_name: "Sarah Okafor", avatar_url: null } },
  { id: "3", user_id: "u3", titleKey: "prayer_3_title", bodyKey: "prayer_3_body", title: "Financial breakthrough", body: "Our family is going through a very difficult financial time. Trusting God to open doors and provide for our needs in ways only He can.", is_public: true, is_anonymous: true, is_approved: true, is_answered: false, pray_count: 31, category: "provision", created_at: new Date(Date.now() - 14 * 3600000).toISOString() },
  { id: "4", user_id: "u4", titleKey: "prayer_4_title", bodyKey: "prayer_4_body", title: "Restoration of my marriage", body: "My husband and I have been struggling for the past year. We still love each other but need a breakthrough. Please pray for restoration and reconciliation.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 58, category: "family", created_at: new Date(Date.now() - 22 * 3600000).toISOString(), profile: { full_name: "Diana Chen", avatar_url: null } },
  { id: "5", user_id: "u5", titleKey: "prayer_5_title", bodyKey: "prayer_5_body", title: "Peace during anxiety", body: "I've been struggling with anxiety and depression for the past few months. I need God's peace that surpasses all understanding. Please pray.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 72, category: "healing", created_at: new Date(Date.now() - 30 * 3600000).toISOString(), profile: { full_name: "James Rivera", avatar_url: null } },
  { id: "6", user_id: "u6", titleKey: "prayer_6_title", bodyKey: "prayer_6_body", title: "New job opportunity", body: "I've been job hunting for 3 months. Please pray for doors to open and for the right position to come through. God knows what we need.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 19, category: "provision", created_at: new Date(Date.now() - 40 * 3600000).toISOString(), profile: { full_name: "Aisha Williams", avatar_url: null } },
];

interface PrayerWallProps {
  initialPrayers?: MultilingualPrayerRequest[];
}

const getLocalizedRelativeTime = (dateStr: string, lang: string) => {
  try {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "always" });
      return rtf.format(-diffMins, "minute");
    } else if (diffHours < 24) {
      const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "always" });
      return rtf.format(-diffHours, "hour");
    } else if (diffDays < 7) {
      const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "always" });
      return rtf.format(-diffDays, "day");
    } else {
      return date.toLocaleDateString(lang, { month: "short", day: "numeric", year: "numeric" });
    }
  } catch {
    return dateStr;
  }
};

export function PrayerWall({ initialPrayers = MOCK_PRAYERS }: PrayerWallProps) {
  const [prayers, setPrayers] = useState<MultilingualPrayerRequest[]>(initialPrayers);
  const [filter, setFilter] = useState<PrayerCategory | "all">("all");
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  const filtered = filter === "all"
    ? prayers
    : prayers.filter((p) => p.category === filter);

  const handlePray = useCallback(async (prayerId: string) => {
    if (prayedIds.has(prayerId)) return;

    setPrayedIds((prev) => new Set([...prev, prayerId]));
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === prayerId ? { ...p, pray_count: p.pray_count + 1 } : p
      )
    );

    try {
      await fetch(`/api/prayer/${prayerId}/pray`, { method: "POST" });
    } catch {
      // Optimistic update
    }
  }, [prayedIds]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full font-label text-sm font-semibold transition-all duration-200 border",
              filter === cat.id
                ? "bg-sacred text-midnight border-sacred"
                : "border-white/10 text-fog hover:text-ivory hover:border-white/20"
            )}
            id={`prayer-filter-${cat.id}`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Prayer cards — masonry */}
      <div className="masonry">
        <AnimatePresence>
          {filtered.map((prayer, i) => (
            <motion.div
              key={prayer.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="masonry-item"
            >
              <PrayerCard
                prayer={prayer}
                hasPrayed={prayedIds.has(prayer.id)}
                onPray={handlePray}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-fog text-lg">{t("prayer_no_requests")}</p>
        </div>
      )}
    </div>
  );
}

function PrayerCard({
  prayer,
  hasPrayed,
  onPray,
}: {
  prayer: MultilingualPrayerRequest;
  hasPrayed: boolean;
  onPray: (id: string) => void;
}) {
  const [burst, setBurst] = useState(false);
  const { t, language } = useLanguage();

  const handleClick = () => {
    if (hasPrayed) return;
    setBurst(true);
    onPray(prayer.id);
    setTimeout(() => setBurst(false), 600);
    toast.success(t("prayer_card_prayed") + " 🙏", { duration: 2000 });
  };

  const name = prayer.is_anonymous ? t("prayer_card_anonymous") : prayer.profile?.full_name ?? t("prayer_card_member");
  const initials = prayer.is_anonymous ? "🙏" : getInitials(name);

  // Map translations dynamically or fallback to database values
  const title = prayer.titleKey ? t(prayer.titleKey) : (t(`prayer_${prayer.id}_title`) !== `prayer_${prayer.id}_title` ? t(`prayer_${prayer.id}_title`) : prayer.title);
  const body = prayer.bodyKey ? t(prayer.bodyKey) : (t(`prayer_${prayer.id}_body`) !== `prayer_${prayer.id}_body` ? t(`prayer_${prayer.id}_body`) : prayer.body);

  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-4 hover:border-sacred/20 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-surface-3 flex items-center justify-center text-xs font-label font-semibold text-ivory shrink-0">
            {prayer.is_anonymous ? "🙏" : initials}
          </div>
          <div className="text-start">
            <p className="font-label text-xs font-semibold text-ivory leading-tight">{name}</p>
            <p className="font-body text-[11px] text-fog/60">{getLocalizedRelativeTime(prayer.created_at, language)}</p>
          </div>
        </div>
        <span className={cn("shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-label capitalize", CATEGORY_STYLES[prayer.category] ?? CATEGORY_STYLES.other)}>
          {t(`prayer_cat_${prayer.category}`)}
        </span>
      </div>

      {/* Content */}
      <div className="text-start">
        <h4 className="font-heading text-sm font-bold text-ivory mb-2">{title}</h4>
        <p className="font-body text-fog text-sm leading-relaxed line-clamp-4">{body}</p>
      </div>

      {/* Pray button */}
      <div className="border-t border-white/5 pt-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          disabled={hasPrayed}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-label font-semibold transition-all duration-200",
            hasPrayed
              ? "bg-sacred/15 text-sacred border border-sacred/25"
              : "text-fog hover:text-ivory hover:bg-white/5"
          )}
          id={`pray-btn-${prayer.id}`}
        >
          <AnimatePresence>
            {burst && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-sacred pointer-events-none"
                    style={{
                      "--tx": `${(i - 2) * 20}px`,
                      "--ty": `-${20 + i * 5}px`,
                    } as React.CSSProperties}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: (i - 2) * 25,
                      y: -(30 + i * 8),
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
          <HandHeart size={15} />
          {hasPrayed ? t("prayer_card_prayed") : t("prayer_card_pray")} · {prayer.pray_count.toLocaleString(language)}
        </motion.button>
      </div>
    </div>
  );
}
