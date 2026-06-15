"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Search, Plus, HandHeart, X, Globe, Lock, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn, getInitials } from "@/lib/utils";
import toast from "react-hot-toast";
import type { PrayerCategory } from "@/types";

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

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  healing: { bg: "rgba(239, 68, 68, 0.15)", text: "#FCA5A5", border: "rgba(239, 68, 68, 0.3)", accent: "#EF4444" },
  provision: { bg: "rgba(201, 168, 76, 0.15)", text: "#E8D48A", border: "rgba(201, 168, 76, 0.3)", accent: "#C9A84C" },
  guidance: { bg: "rgba(139, 92, 246, 0.15)", text: "#C4B5FD", border: "rgba(139, 92, 246, 0.3)", accent: "#8B5CF6" },
  family: { bg: "rgba(16, 185, 129, 0.15)", text: "#A7F3D0", border: "rgba(16, 185, 129, 0.3)", accent: "#10B981" },
  other: { bg: "rgba(156, 163, 175, 0.15)", text: "#D1D5DB", border: "rgba(156, 163, 175, 0.3)", accent: "#9CA3AF" },
};

const MOCK_PRAYERS: MultilingualPrayerRequest[] = [
  { id: "1", user_id: "u1", titleKey: "prayer_1_title", bodyKey: "prayer_1_body", title: "Healing for my mother", body: "My mother was recently diagnosed with cancer. We're believing God for a miracle and complete healing. Please stand with us in prayer as we trust God through this difficult season.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 47, category: "healing", created_at: new Date(Date.now() - 2 * 3600000).toISOString(), profile: { full_name: "Marcus Thompson", avatar_url: null } },
  { id: "2", user_id: "u2", titleKey: "prayer_2_title", bodyKey: "prayer_2_body", title: "Direction for my career", body: "I've been at a crossroads for months. Asking for clarity, peace, and God's wisdom about which path to take. Should I stay or is He calling me somewhere new?", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 23, category: "guidance", created_at: new Date(Date.now() - 6 * 3600000).toISOString(), profile: { full_name: "Sarah Okafor", avatar_url: null } },
  { id: "3", user_id: "u3", titleKey: "prayer_3_title", bodyKey: "prayer_3_body", title: "Financial breakthrough", body: "Our family is going through a very difficult financial time. Trusting God to open doors and provide for our needs in ways only He can.", is_public: true, is_anonymous: true, is_approved: true, is_answered: false, pray_count: 31, category: "provision", created_at: new Date(Date.now() - 14 * 3600000).toISOString() },
  { id: "4", user_id: "u4", titleKey: "prayer_4_title", bodyKey: "prayer_4_body", title: "Restoration of my marriage", body: "My husband and I have been struggling for the past year. We still love each other but need a breakthrough. Please pray for restoration and reconciliation.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 58, category: "family", created_at: new Date(Date.now() - 22 * 3600000).toISOString(), profile: { full_name: "Diana Chen", avatar_url: null } },
  { id: "5", user_id: "u5", titleKey: "prayer_5_title", bodyKey: "prayer_5_body", title: "Peace during anxiety", body: "I've been struggling with anxiety and depression for the past few months. I need God's peace that surpasses all understanding. Please pray.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 72, category: "healing", created_at: new Date(Date.now() - 30 * 3600000).toISOString(), profile: { full_name: "James Rivera", avatar_url: null } },
  { id: "6", user_id: "u6", titleKey: "prayer_6_title", bodyKey: "prayer_6_body", title: "New job opportunity", body: "I've been job hunting for 3 months. Please pray for doors to open and for the right position to come through. God knows what we need.", is_public: true, is_anonymous: false, is_approved: true, is_answered: false, pray_count: 19, category: "provision", created_at: new Date(Date.now() - 40 * 3600000).toISOString(), profile: { full_name: "Aisha Williams", avatar_url: null } },
];

export function NativePrayer() {
  const { t, language } = useLanguage();
  const [prayers, setPrayers] = useState<MultilingualPrayerRequest[]>(MOCK_PRAYERS);
  const [filter, setFilter] = useState<PrayerCategory | "all">("all");
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  // Form states for bottom sheet
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formCategory, setFormCategory] = useState<PrayerCategory>("other");
  const [formVisibility, setFormVisibility] = useState<"public" | "private" | "anonymous">("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePray = useCallback((id: string) => {
    if (prayedIds.has(id)) return;
    setPrayedIds(prev => new Set([...prev, id]));
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, pray_count: p.pray_count + 1 } : p));
    toast.success("Added to your prayer list! 🙏", { duration: 1500 });
  }, [prayedIds]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formBody) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate API call

    const newRequest: MultilingualPrayerRequest = {
      id: Date.now().toString(),
      user_id: "currentUser",
      title: formTitle,
      body: formBody,
      is_public: formVisibility !== "private",
      is_anonymous: formVisibility === "anonymous",
      is_approved: true,
      is_answered: false,
      pray_count: 1,
      category: formCategory,
      created_at: new Date().toISOString(),
      profile: formVisibility === "anonymous" ? undefined : { full_name: "You", avatar_url: null }
    };

    setPrayers(prev => [newRequest, ...prev]);
    setIsSubmitting(false);
    setIsSubmitOpen(false);
    setFormTitle("");
    setFormBody("");
    toast.success("Prayer request posted successfully! 🙏");
  };

  const filteredPrayers = prayers.filter(p => {
    const matchesCategory = filter === "all" || p.category === filter;
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const col1 = filteredPrayers.filter((_, i) => i % 2 === 0);
  const col2 = filteredPrayers.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(249,168,212,0.15)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.1)] to-transparent blur-[70px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 px-5 pt-12 pb-4 bg-[rgba(8,8,18,0.85)] backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "0.08em", lineHeight: 1 }} className="text-white">
                PRAYER WALL
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Interceding Together
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setSearchVisible(!searchVisible)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
            >
              <Search size={18} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setIsSubmitOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9A84C] text-[#080812] font-bold"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </header>

        {/* Search Input bar */}
        <AnimatePresence>
          {searchVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-3 bg-[#0a0a14] border-b border-white/5 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search prayer wall..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 text-[#F0EDE8] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-[#C9A84C]/50 text-sm font-inter"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scripture Quote */}
        <div className="px-4 py-5 mx-4 mt-4 rounded-3xl border border-white/5 bg-white/[0.02] text-center backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent pointer-events-none" />
          <p className="text-[9px] tracking-[0.22em] text-pink-300 font-semibold mb-2 uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Scripture of Hope
          </p>
          <blockquote className="text-white/90 leading-snug italic mb-1.5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px", fontWeight: 600 }}>
            "Therefore confess your sins to each other and pray for each other so that you may be healed."
          </blockquote>
          <span className="text-[11px] text-[#C9A84C]" style={{ fontFamily: "var(--font-satisfy)" }}>
            — James 5:16
          </span>
        </div>

        {/* Category Pills Slider */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-4 sticky top-[68px] z-20 bg-[rgba(8,8,18,0.7)] backdrop-blur-md">
          {CATEGORIES.map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all",
                  isSelected
                    ? "bg-[#C9A84C] border-[#C9A84C] text-[#080812] font-bold"
                    : "bg-white/5 border-white/5 text-fog active:bg-white/10"
                )}
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {t(cat.labelKey) || cat.id}
              </button>
            );
          })}
        </div>

        {/* Masonry Pinterest Grid */}
        <div className="flex gap-3 px-4 pt-2">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-3">
            {col1.map((p, idx) => (
              <PrayerTile key={p.id} prayer={p} isPrayed={prayedIds.has(p.id)} onPray={handlePray} idx={idx * 2} t={t} />
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-3 pt-4">
            {col2.map((p, idx) => (
              <PrayerTile key={p.id} prayer={p} isPrayed={prayedIds.has(p.id)} onPray={handlePray} idx={idx * 2 + 1} t={t} />
            ))}
          </div>
        </div>

        {filteredPrayers.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-fog text-sm">No prayer requests found.</p>
          </div>
        )}
      </div>

      {/* Kinematic Bottom Sheet for Submitting Prayer */}
      <AnimatePresence>
        {isSubmitOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#0c0c16] rounded-t-[32px] border-t border-white/10 shadow-2xl z-50 overflow-y-auto px-6 pt-5 pb-8 flex flex-col"
            >
              {/* Handlebar */}
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-6 shrink-0" onClick={() => setIsSubmitOpen(false)} />

              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    Submit Prayer Request
                  </h3>
                  <p className="text-xs text-fog/60">Share your burden, let our community lift you up.</p>
                </div>
                <button
                  onClick={() => setIsSubmitOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-fog hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Request Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Healing for Mother, Job Provision..."
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/35 outline-none focus:border-[#C9A84C]/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Prayer Request Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your situation or prayer request..."
                    value={formBody}
                    onChange={e => setFormBody(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/35 outline-none focus:border-[#C9A84C]/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormCategory(cat.id as PrayerCategory)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
                          formCategory === cat.id
                            ? "bg-[#C9A84C] border-[#C9A84C] text-[#080812]"
                            : "border-white/10 text-fog hover:text-white"
                        )}
                        style={{ fontFamily: "var(--font-raleway)" }}
                      >
                        {t(cat.labelKey) || cat.id}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Visibility
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "public", icon: Globe, label: "Public", desc: "Visible to everyone on the prayer wall" },
                      { id: "private", icon: Lock, label: "Private", desc: "Only pastors & leaders will see this" },
                      { id: "anonymous", icon: EyeOff, label: "Anonymous", desc: "Public wall, but author name hidden" },
                    ].map(v => (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => setFormVisibility(v.id as any)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all",
                          formVisibility === v.id
                            ? "bg-[#C9A84C]/10 border-[#C9A84C]/45 text-[#C9A84C]"
                            : "border-white/5 bg-white/[0.02] text-fog hover:text-white hover:border-white/15"
                        )}
                      >
                        <v.icon size={15} />
                        <span className="text-[10px] font-semibold tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#C9A84C] text-[#080812] font-bold tracking-wide text-xs uppercase flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#080812] border-t-transparent animate-spin" />
                    ) : (
                      "POST PRAYER REQUEST"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </div>
  );
}

function PrayerTile({
  prayer,
  isPrayed,
  onPray,
  idx,
  t
}: {
  prayer: MultilingualPrayerRequest;
  isPrayed: boolean;
  onPray: (id: string) => void;
  idx: number;
  t: (key: string) => string;
}) {
  const [burst, setBurst] = useState(false);
  const style = CATEGORY_STYLES[prayer.category] || CATEGORY_STYLES.other;
  const name = prayer.is_anonymous ? "Anonymous" : prayer.profile?.full_name ?? "Member";
  const initials = prayer.is_anonymous ? "🙏" : getInitials(name);

  // Dynamic Fonts for Pinterest experience
  const cardTitleFonts = ["var(--font-playfair)", "var(--font-cormorant)", "var(--font-raleway)"];
  const cardBodyFonts = ["var(--font-inter)", "var(--font-lato)", "var(--font-nunito)"];

  const handlePrayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrayed) return;
    setBurst(true);
    onPray(prayer.id);
    setTimeout(() => setBurst(false), 650);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: (idx % 8) * 0.05 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-[24px] p-4 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Category Indicator Tag */}
      <div className="flex justify-between items-center">
        <span 
          className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
          style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}`, fontFamily: "var(--font-space-grotesk)" }}
        >
          {prayer.category}
        </span>
        <span className="text-[9px] text-fog/40 font-mono">
          {new Date(prayer.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px] text-white">
          {initials}
        </div>
        <span className="text-xs text-white/70 font-semibold" style={{ fontFamily: "var(--font-inter)" }}>{name}</span>
      </div>

      {/* Message content */}
      <div>
        <h4 
          className="text-[14px] font-bold text-white mb-1.5 leading-tight" 
          style={{ fontFamily: cardTitleFonts[idx % cardTitleFonts.length] }}
        >
          {prayer.title}
        </h4>
        <p 
          className="text-xs text-fog/70 leading-relaxed line-clamp-5"
          style={{ fontFamily: cardBodyFonts[idx % cardBodyFonts.length] }}
        >
          {prayer.body}
        </p>
      </div>

      {/* Interaction Wall Action */}
      <div className="border-t border-white/5 pt-3 mt-1 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrayClick}
          disabled={isPrayed}
          className={cn(
            "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all border",
            isPrayed
              ? "bg-[#C9A84C]/15 border-[#C9A84C]/25 text-[#C9A84C]"
              : "border-white/5 hover:border-white/10 text-fog/80 hover:text-white"
          )}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <AnimatePresence>
            {burst && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A84C] pointer-events-none"
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: (i - 2.5) * 18,
                      y: -(22 + i * 4),
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
          <HandHeart size={13} className={isPrayed ? "text-[#C9A84C]" : "text-fog"} />
          {isPrayed ? "Prayed" : "Pray"}
        </motion.button>

        <span className="text-[10px] text-white/30 font-medium">
          {prayer.pray_count} praying
        </span>
      </div>
    </motion.div>
  );
}
