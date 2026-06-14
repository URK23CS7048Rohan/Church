"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Calendar, Clock, MapPin, Download, Heart, Users, Compass, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface ScheduleItem {
  time: string;
  titleKey: string;
  descKey: string;
  location: string;
  category: "service" | "prayer" | "outreach" | "bible-study";
  tag?: string;
}

const WEEKLY_SCHEDULE: { day: string; items: ScheduleItem[] }[] = [
  {
    day: "Sunday",
    items: [
      { time: "9:00 AM", titleKey: "sched_w_1_title", descKey: "sched_w_1_desc", location: "Agape Worship Hall", category: "service", tag: "Main" },
      { time: "11:00 AM", titleKey: "sched_w_2_title", descKey: "sched_w_2_desc", location: "Agape Worship Hall", category: "service", tag: "Main" },
      { time: "12:30 PM", titleKey: "sched_w_3_title", descKey: "sched_w_3_desc", location: "Youth Room 302", category: "service", tag: "Youth" },
    ]
  },
  {
    day: "Wednesday",
    items: [
      { time: "7:00 PM", titleKey: "sched_w_4_title", descKey: "sched_w_4_desc", location: "Chapel Hall", category: "prayer", tag: "Prayer" },
      { time: "7:00 PM", titleKey: "sched_w_5_title", descKey: "sched_w_5_desc", location: "Kids Wing", category: "bible-study" }
    ]
  },
  {
    day: "Friday",
    items: [
      { time: "7:30 PM", titleKey: "sched_w_6_title", descKey: "sched_w_6_desc", location: "Various Host Homes", category: "bible-study", tag: "Home cell" }
    ]
  }
];

const MONTHLY_SPECIALS: { date: string; titleKey: string; time: string; location: string; descKey: string; category: "service" | "prayer" | "outreach" | "bible-study" }[] = [
  { date: "1st Sunday", titleKey: "sched_m_1_title", time: "9:00 AM & 11:00 AM", location: "Main Sanctuary", descKey: "sched_m_1_desc", category: "service" },
  { date: "1st Friday", titleKey: "sched_m_2_title", time: "10:00 PM - 2:00 AM", location: "Agape Chapel", descKey: "sched_m_2_desc", category: "prayer" },
  { date: "2nd Saturday", titleKey: "sched_m_3_title", time: "9:00 AM", location: "Outreach Center", descKey: "sched_m_3_desc", category: "outreach" },
  { date: "3rd Saturday", titleKey: "sched_m_4_title", time: "8:30 AM", location: "Fellowship Hall", descKey: "sched_m_4_desc", category: "bible-study" },
  { date: "Last Friday", titleKey: "sched_m_5_title", time: "7:00 PM", location: "Main Hall", descKey: "sched_m_5_desc", category: "service" }
];

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

const getLocalizedOccurrence = (dateStr: string, lang: string) => {
  const occurrenceMap: Record<string, Record<string, string>> = {
    "1st Sunday": { en: "1st Sunday", hi: "पहला रविवार", ml: "ഒന്നാം ഞായറാഴ്ച", ar: "الأحد الأول" },
    "1st Friday": { en: "1st Friday", hi: "पहला शुक्रवार", ml: "ഒന്നാം വെള്ളിയാഴ്ച", ar: "الجمعة الأولى" },
    "2nd Saturday": { en: "2nd Saturday", hi: "दूसरा शनिवार", ml: "രണ്ടാം ശനിയാഴ്ച", ar: "السبت الثاني" },
    "3rd Saturday": { en: "3rd Saturday", hi: "तीसरा शनिवार", ml: "മൂന്നാം ശനിയാഴ്ച", ar: "السبت الثالث" },
    "Last Friday": { en: "Last Friday", hi: "अंतिम शुक्रवार", ml: "അവസാന വെള്ളിയാഴ്ച", ar: "الجمعة الأخيرة" },
  };
  return occurrenceMap[dateStr]?.[lang] ?? dateStr;
};

const getLocalizedTag = (tag: string, lang: string) => {
  const tagMap: Record<string, Record<string, string>> = {
    "Main": { en: "Main", hi: "मुख्य", ml: "പ്രധാനം", ar: "الرئيسي" },
    "Youth": { en: "Youth", hi: "युवा", ml: "യുവജനം", ar: "الشباب" },
    "Prayer": { en: "Prayer", hi: "प्रार्थना", ml: "പ്രാർത്ഥന", ar: "صلاة" },
    "Home cell": { en: "Home cell", hi: "गृह संगति", ml: "ഭവന കൂട്ടായ്മ", ar: "اجتماع منزلي" },
  };
  return tagMap[tag]?.[lang] ?? tag;
};

export default function SchedulePage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "service": return <Compass className="text-sacred" size={16} />;
      case "prayer": return <Heart className="text-pink-400" size={16} />;
      case "outreach": return <Users className="text-emerald-400" size={16} />;
      case "bible-study": return <BookOpen className="text-violet" size={16} />;
      default: return <Calendar className="text-sacred" size={16} />;
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case "service": return "border-l-4 border-l-sacred";
      case "prayer": return "border-l-4 border-l-pink-400";
      case "outreach": return "border-l-4 border-l-emerald-400";
      case "bible-study": return "border-l-4 border-l-violet-light";
      default: return "border-l-4 border-l-sacred";
    }
  };

  const occurrenceLabelMap: Record<string, string> = {
    en: "Occurrence",
    hi: "अवसर",
    ml: "അവസരം",
    ar: "التكرار",
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 lg:pb-0 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <SectionHeader
              eyebrow={t("schedule_eyebrow")}
              title={t("schedule_title")}
              titleHighlight={t("schedule_title_highlight")}
              subtitle={t("schedule_subtitle")}
            />
            <p className="font-body text-fog italic text-sm mt-3 max-w-2xl mx-auto">
              "{t("schedule_scripture")}"
            </p>
            <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
              {t("schedule_scripture_ref")}
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex justify-center mt-10 mb-12">
            <div className="glass p-1 rounded-2xl flex border border-white/5">
              <button
                onClick={() => setActiveTab("weekly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-label font-semibold transition-all duration-200 ${
                  activeTab === "weekly"
                    ? "bg-gradient-gold text-midnight shadow-md font-bold"
                    : "text-fog hover:text-ivory"
                }`}
              >
                {t("schedule_tab_weekly")}
              </button>
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-label font-semibold transition-all duration-200 ${
                  activeTab === "monthly"
                    ? "bg-gradient-gold text-midnight shadow-md font-bold"
                    : "text-fog hover:text-ivory"
                }`}
              >
                {t("schedule_tab_monthly")}
              </button>
            </div>
          </div>

          {/* Weekly view */}
          {activeTab === "weekly" ? (
            <div className="space-y-10">
              {WEEKLY_SCHEDULE.map((dayGroup, groupIdx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                  key={dayGroup.day}
                  className="space-y-4"
                >
                  <h3 className="font-heading text-xl font-bold text-sacred flex items-center gap-2 px-2 text-start">
                    <Calendar size={18} /> {getLocalizedDay(dayGroup.day, language)}s
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayGroup.items.map((item, itemIdx) => (
                      <GlassCard
                        key={itemIdx}
                        className={`p-6 border border-white/5 bg-surface-1 text-start ${getCategoryBorder(item.category)}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 text-xs font-label text-fog">
                            <Clock size={12} className="text-sacred" />
                            {item.time}
                          </div>
                          {item.tag && (
                            <span className="px-2 py-0.5 text-[9px] font-label font-semibold rounded bg-white/5 border border-white/10 text-sacred uppercase tracking-wider">
                              {getLocalizedTag(item.tag, language)}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-lg font-bold text-ivory mb-2 flex items-center gap-2">
                          {getCategoryIcon(item.category)} {t(item.titleKey)}
                        </h4>
                        <p className="font-body text-fog text-sm mb-4 leading-relaxed">{t(item.descKey)}</p>
                        <div className="flex items-center gap-1 text-xs font-label text-fog/60">
                          <MapPin size={12} className="text-sacred" />
                          {item.location}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Monthly specials view
            <div className="space-y-6">
              {MONTHLY_SPECIALS.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  key={idx}
                >
                  <GlassCard
                    className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/5 bg-surface-1 hover:border-sacred/30 transition-all duration-200 text-start ${getCategoryBorder(item.category)}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Left Badge Date */}
                      <div className="w-24 h-24 rounded-2xl glass flex flex-col items-center justify-center border border-sacred/20 shrink-0 text-center p-2 bg-sacred/5">
                        <span className="font-accent text-[9px] text-sacred tracking-wider uppercase font-bold">
                          {occurrenceLabelMap[language] ?? occurrenceLabelMap.en}
                        </span>
                        <span className="font-heading text-xs font-bold text-ivory mt-1 leading-tight">{getLocalizedOccurrence(item.date, language)}</span>
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <h4 className="font-heading text-lg font-bold text-ivory flex items-center gap-2">
                          {getCategoryIcon(item.category)} {t(item.titleKey)}
                        </h4>
                        <p className="font-body text-fog text-sm leading-relaxed max-w-xl">{t(item.descKey)}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-label text-fog/60 pt-1">
                          <div className="flex items-center gap-1"><Clock size={12} className="text-sacred" /> {item.time}</div>
                          <div className="flex items-center gap-1"><MapPin size={12} className="text-sacred" /> {item.location}</div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Download CTA */}
          <div className="mt-16 text-center">
            <GlassCard className="p-8 border border-sacred/20 bg-gradient-to-br from-sacred/10 to-transparent max-w-xl mx-auto">
              <h4 className="font-heading text-lg font-bold text-ivory mb-2">{t("schedule_printable_title")}</h4>
              <p className="font-body text-fog text-sm mb-6">{t("schedule_printable_desc")}</p>
              <Button className="flex items-center gap-2 mx-auto">
                <Download size={16} /> {t("schedule_printable_btn")}
              </Button>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
