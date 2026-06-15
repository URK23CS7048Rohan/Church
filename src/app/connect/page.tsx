"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { Users, MapPin, Clock, ChevronRight, Mic, Heart, Globe, Baby, BookOpen, Music } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Group } from "@/types";

const MOCK_GROUPS: (Group & { member_count: number })[] = [
  { id: "1", name: "Young Adults", description: "", leader_id: "u1", category: "young-adults", meeting_day: "Thursday", meeting_time: "7:00 PM", location: "Room 204", max_members: 30, cover_image_url: null, is_open: true, created_at: "", member_count: 18, leader: { full_name: "Alex Chen", avatar_url: null } },
  { id: "2", name: "Married Couples", description: "", leader_id: "u2", category: "couples", meeting_day: "Friday", meeting_time: "7:30 PM", location: "Community Room", max_members: 20, cover_image_url: null, is_open: true, created_at: "", member_count: 12, leader: { full_name: "David & Lisa Morris", avatar_url: null } },
  { id: "3", name: "Men's Group", description: "", leader_id: "u3", category: "men", meeting_day: "Saturday", meeting_time: "7:30 AM", location: "Fellowship Hall", max_members: 25, cover_image_url: null, is_open: true, created_at: "", member_count: 22, leader: { full_name: "Marcus Thompson", avatar_url: null } },
  { id: "4", name: "Women of Worth", description: "", leader_id: "u4", category: "women", meeting_day: "Tuesday", meeting_time: "6:30 PM", location: "Prayer Room", max_members: 30, cover_image_url: null, is_open: true, created_at: "", member_count: 27, leader: { full_name: "Sarah Mitchell", avatar_url: null } },
  { id: "5", name: "Seniors Fellowship", description: "", leader_id: "u5", category: "seniors", meeting_day: "Wednesday", meeting_time: "10:00 AM", location: "Room 101", max_members: 20, cover_image_url: null, is_open: true, created_at: "", member_count: 14, leader: { full_name: "Ruth Anderson", avatar_url: null } },
  { id: "6", name: "Youth Life", description: "", leader_id: "u6", category: "youth", meeting_day: "Sunday", meeting_time: "12:30 PM", location: "Youth Room", max_members: 40, cover_image_url: null, is_open: false, created_at: "", member_count: 38, leader: { full_name: "James Rivera", avatar_url: null } },
  { id: "7", name: "Romans Inductive Study", description: "", leader_id: "u7", category: "bible-study", meeting_day: "Monday", meeting_time: "7:00 PM", location: "Room 105", max_members: 15, cover_image_url: null, is_open: true, created_at: "", member_count: 10, leader: { full_name: "Pastor David Mitchell", avatar_url: null } },
  { id: "8", name: "Brooklyn Home Fellowship", description: "", leader_id: "u8", category: "home-meeting", meeting_day: "Friday", meeting_time: "7:30 PM", location: "Mitchell Residence", max_members: 12, cover_image_url: null, is_open: true, created_at: "", member_count: 8, leader: { full_name: "John & Sarah Mitchell", avatar_url: null } },
];

const MINISTRIES = [
  { id: "worship", icon: Music, labelKey: "ministry_worship_label", descKey: "ministry_worship_desc", spotsKey: "connect_spots_open" },
  { id: "childrens", icon: Baby, labelKey: "ministry_childrens_label", descKey: "ministry_childrens_desc", spotsKey: "connect_spots_left", spotsCount: 3 },
  { id: "prayer", icon: Heart, labelKey: "ministry_prayer_label", descKey: "ministry_prayer_desc", spotsKey: "connect_spots_open" },
  { id: "outreach", icon: Globe, labelKey: "ministry_outreach_label", descKey: "ministry_outreach_desc", spotsKey: "connect_spots_left", spotsCount: 5 },
  { id: "usher", icon: Users, labelKey: "ministry_usher_label", descKey: "ministry_usher_desc", spotsKey: "connect_spots_open" },
  { id: "teaching", icon: BookOpen, labelKey: "ministry_teaching_label", descKey: "ministry_teaching_desc", spotsKey: "connect_spots_left", spotsCount: 2 },
];

const CATEGORY_ICONS: Record<string, typeof Users> = {
  "young-adults": Users,
  "couples": Heart,
  "men": Users,
  "women": Heart,
  "seniors": BookOpen,
  "youth": Music,
  "bible-study": BookOpen,
  "home-meeting": Users,
};

const CATEGORY_COLORS: Record<string, string> = {
  "young-adults": "from-violet/20 to-violet/5 border-violet/20",
  "couples": "from-pink-500/20 to-pink-500/5 border-pink-500/20",
  "men": "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  "women": "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  "seniors": "from-sacred/20 to-sacred/5 border-sacred/20",
  "youth": "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  "bible-study": "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  "home-meeting": "from-teal-500/20 to-teal-500/5 border-teal-500/20",
};

const getLocalizedDay = (day: string, lang: string) => {
  const daysMap: Record<string, Record<string, string>> = {
    Sunday: { en: "Sunday", hi: "रविवार", ml: "ഞായറാഴ്ച", ar: "الأحد" },
    Monday: { en: "Monday", hi: "सोमवार", ml: "തിങ്കളാഴ്ച", ar: "الأثنين" },
    Tuesday: { en: "Tuesday", hi: "मंगलवार", ml: "ചൊവ്വാഴ്ച", ar: "الثلاثاء" },
    Wednesday: { en: "Wednesday", hi: "बुधवार", ml: "ബുധനാഴ്ച", ar: "الأربعاء" },
    Thursday: { en: "Thursday", hi: "गुरुवार", ml: "വ്യാഴാഴ്ച", ar: "الخميس" },
    Friday: { en: "Friday", hi: "शुक्रवार", ml: "വെള്ളിയാഴ്ച", ar: "الجمعة" },
    Saturday: { en: "Saturday", hi: "शनिवार", ml: "ശനിയാഴ്ച", ar: "السبت" },
  };
  return daysMap[day]?.[lang] ?? day;
};

export default function ConnectPage() {
  const { t, language } = useLanguage();

  return (
    <NativePageWrapper title="Connect" accentColor="#C4B5FD" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        {/* Hero */}
        <div className="relative pt-32 pb-16 px-4 overflow-hidden text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,45,142,0.12) 0%, transparent 70%)" }} />
          <div className="max-w-2xl mx-auto relative z-10">
            <RevealOnScroll><span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">{t("connect_eyebrow")}</span></RevealOnScroll>
            <RevealOnScroll delay={0.1}><h1 className="font-display text-6xl font-bold text-ivory mt-4 mb-4">{t("connect_title")} <span className="gold-text">{t("connect_title_highlight")}</span></h1></RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-fog text-xl mb-3">{t("connect_subtitle")}</p>
              <p className="font-body text-fog italic text-sm max-w-lg mx-auto">
                "{t("connect_scripture")}"
              </p>
              <p className="font-accent text-[10px] text-sacred/70 tracking-widest mt-1">
                {t("connect_scripture_ref")}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Small Groups */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <SectionHeader eyebrow={t("community_eyebrow")} title={t("connect_groups_title")} titleHighlight="" subtitle={t("connect_groups_subtitle")} className="mb-10" />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_GROUPS.map((group) => {
              const Icon = CATEGORY_ICONS[group.category] ?? Users;
              const colorClass = CATEGORY_COLORS[group.category] ?? "from-surface-2 to-surface-1 border-white/10";
              const nameKey = `group_${group.id}_name`;
              const descKey = `group_${group.id}_desc`;

              return (
                <StaggerItem key={group.id}>
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} className={cn("glass rounded-2xl p-5 border bg-gradient-to-br cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-200", colorClass)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                        <Icon size={18} className="text-sacred" />
                      </div>
                      {!group.is_open && (
                        <span className="px-2 py-0.5 rounded-full bg-ember/20 text-ember text-[10px] font-label font-semibold">{t("connect_group_full")}</span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-ivory mb-1">{t(nameKey)}</h3>
                    <p className="font-body text-fog text-sm mb-4 line-clamp-2">{t(descKey)}</p>
                    <div className="space-y-1.5 text-xs font-label text-fog/70">
                      <div className="flex items-center gap-2"><Clock size={11} className="text-sacred" />{getLocalizedDay(group.meeting_day ?? "Sunday", language)}s at {group.meeting_time}</div>
                      <div className="flex items-center gap-2"><MapPin size={11} className="text-sacred" />{group.location}</div>
                      <div className="flex items-center gap-2"><Users size={11} className="text-sacred" />{group.member_count}{group.max_members ? `/${group.max_members}` : ""} {t("connect_group_members")}</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-label text-xs text-fog/50">{t("connect_group_led_by")} {group.leader?.full_name}</span>
                      {group.is_open && (
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sacred text-midnight font-label text-xs font-semibold hover:bg-sacred-light transition-colors" id={`join-group-${group.id}`}>
                          {t("connect_group_join")} <ChevronRight size={12} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Ministries / Volunteer */}
        <section className="bg-surface-1/50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow={t("connect_serve_eyebrow")} title={t("connect_serve_title")} titleHighlight={t("connect_serve_title_highlight")} subtitle={t("connect_serve_subtitle")} className="mb-12" />
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MINISTRIES.map((m) => {
                const spotsLabel = m.spotsKey === "connect_spots_open" 
                  ? t("connect_spots_open") 
                  : `${m.spotsCount} ${t("connect_spots_left")}`;

                return (
                  <StaggerItem key={m.id}>
                    <GlassCard hover glow className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sacred/15 flex items-center justify-center">
                          <m.icon size={18} className="text-sacred" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-ivory text-base">{t(m.labelKey)}</h3>
                          <span className="font-label text-[10px] text-emerald-400">{spotsLabel}</span>
                        </div>
                      </div>
                      <p className="font-body text-fog text-sm">{t(m.descKey)}</p>
                      <button className="mt-auto px-4 py-2 rounded-xl border border-sacred/30 text-sacred font-label text-sm hover:bg-sacred/10 transition-colors" id={`volunteer-${m.id}`}>
                        {t("connect_btn_signup")}
                      </button>
                    </GlassCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* 1-to-1 Pastoral Counseling Request Section */}
        <section className="py-20 px-4 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <RevealOnScroll>
              <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">{t("connect_pastoral_eyebrow")}</span>
              <h2 className="font-heading text-3xl font-bold text-ivory mt-3 mb-4">{t("connect_pastoral_title")}</h2>
              <p className="font-body text-fog text-base leading-relaxed max-w-xl mx-auto">
                {t("connect_pastoral_desc")}
              </p>
              <div className="pt-6">
                <Link href="/request-meeting">
                  <Button size="lg" className="px-8 font-label tracking-wide uppercase text-xs font-bold">
                    {t("connect_pastoral_btn")}
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </NativePageWrapper>
  );
}
