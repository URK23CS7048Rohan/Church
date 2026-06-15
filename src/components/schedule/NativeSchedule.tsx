"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar, Clock, MapPin, Download, Heart, Users, Compass, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  location: string;
  category: "service" | "prayer" | "outreach" | "bible-study";
  tag?: string;
}

const WEEKLY_SCHEDULE = [
  {
    day: "Sunday",
    items: [
      { time: "9:00 AM", title: "First Service", desc: "Traditional worship, liturgy, choral music.", location: "Agape Worship Hall", category: "service", tag: "Main" },
      { time: "11:00 AM", title: "Second Service", desc: "Contemporary worship service, youth ministry.", location: "Agape Worship Hall", category: "service", tag: "Main" },
      { time: "12:30 PM", title: "Youth Service", desc: "Biblical messages geared towards teens.", location: "Youth Room 302", category: "service", tag: "Youth" },
    ]
  },
  {
    day: "Wednesday",
    items: [
      { time: "7:00 PM", title: "Prayer Meeting", desc: "Intercessory prayer and fasting devotion.", location: "Chapel Hall", category: "prayer", tag: "Prayer" },
      { time: "7:00 PM", title: "Mid-Week Bible Study", desc: "Diving deep into scripture expository study.", location: "Kids Wing", category: "bible-study" }
    ]
  },
  {
    day: "Friday",
    items: [
      { time: "7:30 PM", title: "Home Fellowship", desc: "Small groups meeting in nearby residences.", location: "Various Host Homes", category: "bible-study", tag: "Home cell" }
    ]
  }
];

const MONTHLY_SPECIALS = [
  { date: "1st Sunday", title: "Communion Service", time: "9:00 AM & 11:00 AM", location: "Main Sanctuary", desc: "Special celebration of the Holy Eucharist.", category: "service" },
  { date: "1st Friday", title: "Night Vigil", time: "10:00 PM - 2:00 AM", location: "Agape Chapel", desc: "All night corporate prayer and intercession.", category: "prayer" },
  { date: "2nd Saturday", title: "Street Outreach", time: "9:00 AM", location: "Outreach Center", desc: "Serving the local homeless with meals and clothes.", category: "outreach" },
];

export function NativeSchedule() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  const handleDownload = () => {
    toast.success("Downloading schedule PDF... 📄");
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "service": return { bg: "rgba(201,168,76,0.15)", text: "#E8D48A", dot: "#C9A84C" };
      case "prayer": return { bg: "rgba(244,114,182,0.15)", text: "#FBCFE8", dot: "#F472B6" };
      case "outreach": return { bg: "rgba(52,211,153,0.15)", text: "#A7F3D0", dot: "#34D399" };
      case "bible-study": return { bg: "rgba(167,139,250,0.15)", text: "#DDD6FE", dot: "#A78BFA" };
      default: return { bg: "rgba(255,255,255,0.05)", text: "#fff", dot: "#C9A84C" };
    }
  };

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(147,197,253,0.08)] to-transparent blur-[70px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.06)] to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 px-5 pt-12 pb-4 bg-[rgba(8,8,18,0.85)] backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "0.08em", lineHeight: 1 }} className="text-white">
                SCHEDULE
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Our Gatherings
              </span>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleDownload}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#C9A84C]"
          >
            <Download size={16} />
          </motion.button>
        </header>

        {/* Tab Toggle */}
        <div className="px-5 py-4 sticky top-[68px] z-20 bg-[rgba(8,8,18,0.75)] backdrop-blur-md shrink-0">
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/5">
            <button
              onClick={() => setActiveTab("weekly")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                activeTab === "weekly" ? "bg-[#C9A84C] text-[#080812] font-bold shadow-md" : "text-fog"
              )}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Weekly Schedule
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                activeTab === "monthly" ? "bg-[#C9A84C] text-[#080812] font-bold shadow-md" : "text-fog"
              )}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Monthly Specials
            </button>
          </div>
        </div>

        {/* Schedule list */}
        <main className="flex-grow px-5 pb-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "weekly" ? (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {WEEKLY_SCHEDULE.map((dayGroup, idx) => (
                  <div key={dayGroup.day} className="space-y-3 text-start">
                    <h3 className="text-sm font-bold tracking-wider text-[#C9A84C] uppercase font-space-grotesk px-1">{dayGroup.day}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {dayGroup.items.map((item, itemIdx) => {
                        const style = getCategoryColor(item.category);
                        return (
                          <div 
                            key={itemIdx}
                            className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] flex flex-col gap-2 relative overflow-hidden"
                          >
                            <div className="flex justify-between items-start">
                              <span 
                                className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                                style={{ background: style.bg, color: style.text }}
                              >
                                {item.category}
                              </span>
                              {item.tag && (
                                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] text-white/55 font-medium uppercase font-inter">
                                  {item.tag}
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className="text-base font-bold text-white font-poppins">{item.title}</h4>
                              <p className="text-xs text-fog/60 leading-snug mt-1 font-body">{item.desc}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-[10px] text-white/40 pt-2 border-t border-white/[0.03] mt-2">
                              <span className="flex items-center gap-1"><Clock size={11} className="text-[#C9A84C]" /> {item.time}</span>
                              <span className="flex items-center gap-1"><MapPin size={11} className="text-[#C9A84C]" /> {item.location}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3.5 text-start"
              >
                {MONTHLY_SPECIALS.map((item, idx) => {
                  const style = getCategoryColor(item.category);
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={idx}
                      className="rounded-3xl p-4.5 border border-white/5 bg-[#10101c] flex items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex flex-col items-center justify-center shrink-0 border border-white/5 text-center px-1">
                        <span className="text-[8px] font-bold text-sacred tracking-wider uppercase leading-none">Occur</span>
                        <span className="text-[10px] font-bold text-white/80 mt-1 leading-tight">{item.date}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold text-white truncate font-poppins">{item.title}</h4>
                          <span 
                            className="px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-wider shrink-0"
                            style={{ background: style.bg, color: style.text }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-fog/60 leading-snug mt-1 font-body line-clamp-2">{item.desc}</p>
                        <div className="flex gap-4 text-[10px] text-white/45 mt-2.5">
                          <span className="flex items-center gap-1"><Clock size={11} className="text-[#C9A84C]" /> {item.time}</span>
                          <span className="flex items-center gap-1"><MapPin size={11} className="text-[#C9A84C]" /> {item.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
