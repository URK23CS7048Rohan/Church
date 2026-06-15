"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Users, Heart, BookOpen, Music, Baby, Globe, Clock, MapPin, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Group {
  id: string;
  name: string;
  category: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  max_members: number;
  member_count: number;
  leader: string;
}

const MOCK_GROUPS: Group[] = [
  { id: "1", name: "Young Adults Group", category: "young-adults", meeting_day: "Thursday", meeting_time: "7:00 PM", location: "Room 204", max_members: 30, member_count: 18, leader: "Alex Chen" },
  { id: "2", name: "Married Couples", category: "couples", meeting_day: "Friday", meeting_time: "7:30 PM", location: "Community Room", max_members: 20, member_count: 12, leader: "David & Lisa Morris" },
  { id: "3", name: "Men's Breakfast", category: "men", meeting_day: "Saturday", meeting_time: "7:30 AM", location: "Fellowship Hall", max_members: 25, member_count: 22, leader: "Marcus Thompson" },
  { id: "4", name: "Women of Worth", category: "women", meeting_day: "Tuesday", meeting_time: "6:30 PM", location: "Prayer Room", max_members: 30, member_count: 27, leader: "Pastor Jacoub" },
  { id: "5", name: "Youth Life Study", category: "youth", meeting_day: "Friday", meeting_time: "12:30 PM", location: "Youth Room", max_members: 40, member_count: 38, leader: "James Rivera" },
];

const MINISTRIES = [
  { id: "worship", icon: Music, label: "Worship & Praise", desc: "Join our choir, musicians, or sound team.", spots: "Open" },
  { id: "childrens", icon: Baby, label: "Children's Ministry", desc: "Teach and care for kids during Friday service.", spots: "3 spots left" },
  { id: "prayer", icon: Heart, label: "Prayer & Intercession", desc: "Help pray for requests on the wall.", spots: "Open" },
  { id: "outreach", icon: Globe, label: "Outreach & Missions", desc: "Local food drives and neighborhood service.", spots: "5 spots left" },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  "young-adults": { bg: "rgba(139,92,246,0.15)", text: "#C4B5FD", accent: "#8B5CF6" },
  "couples": { bg: "rgba(236,72,153,0.15)", text: "#FBCFE8", accent: "#EC7299" },
  "men": { bg: "rgba(59,130,246,0.15)", text: "#BFDBFE", accent: "#3B82F6" },
  "women": { bg: "rgba(167,139,250,0.15)", text: "#DDD6FE", accent: "#A78BFA" },
  "youth": { bg: "rgba(16,185,129,0.15)", text: "#A7F3D0", accent: "#10B981" },
};

export function NativeConnect() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"groups" | "serve" | "pastor">("groups");
  
  // Interaction states
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [signedUpMinistries, setSignedUpMinistries] = useState<Set<string>>(new Set());

  const handleJoinGroup = (id: string) => {
    setJoinedGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.error("Left group");
      } else {
        next.add(id);
        toast.success("Successfully joined Small Group! Check your profile for details. 🎉");
      }
      return next;
    });
  };

  const handleServeToggle = (id: string) => {
    setSignedUpMinistries(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.error("Cancelled application");
      } else {
        next.add(id);
        toast.success("Applied to Volunteer! The coordinator will reach out to you. 🙌");
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(196,181,253,0.1)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.06)] to-transparent blur-[70px]" />
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
                CONNECT
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Belong Together
              </span>
            </div>
          </div>
          <Users size={18} className="text-[#C9A84C]" />
        </header>

        {/* Tab Toggle Slider */}
        <div className="px-5 py-4 sticky top-[68px] z-20 bg-[rgba(8,8,18,0.75)] backdrop-blur-md shrink-0">
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/5">
            {[
              { id: "groups", label: "Small Groups" },
              { id: "serve", label: "Volunteer" },
              { id: "pastor", label: "Pastoral Care" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-[#C9A84C] text-[#080812] font-bold shadow-md"
                    : "text-fog hover:text-white"
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <main className="flex-grow px-5 pb-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "groups" && (
              <motion.div
                key="groups"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4"
              >
                <div className="border-b border-white/5 pb-2">
                  <h2 className="text-lg font-bold font-playfair text-white">Find a Small Group</h2>
                  <p className="text-xs text-fog/60">Grow in faith and build lifelong friendships.</p>
                </div>

                <div className="space-y-3">
                  {MOCK_GROUPS.map((g, idx) => {
                    const color = CATEGORY_COLORS[g.category] || { bg: "rgba(255,255,255,0.05)", text: "#fff", accent: "#C9A84C" };
                    const isJoined = joinedGroups.has(g.id);
                    return (
                      <motion.div
                        key={g.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-3xl p-5 border border-white/5 bg-white/[0.02] space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <span 
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: color.bg, color: color.text }}
                          >
                            {g.category}
                          </span>
                          <span className="text-[10px] text-fog/50 font-medium">Led by {g.leader}</span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold font-poppins text-white leading-tight">{g.name}</h3>
                          <div className="flex flex-wrap gap-4 text-[10px] text-fog/70 mt-2">
                            <span className="flex items-center gap-1"><Clock size={11} className="text-[#C9A84C]" /> {g.meeting_day}s at {g.meeting_time}</span>
                            <span className="flex items-center gap-1"><MapPin size={11} className="text-[#C9A84C]" /> {g.location}</span>
                            <span className="flex items-center gap-1"><Users size={11} className="text-[#C9A84C]" /> {g.member_count} members</span>
                          </div>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleJoinGroup(g.id)}
                          className={cn(
                            "w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all",
                            isJoined 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                          )}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {isJoined ? (
                            <>
                              <Check size={13} /> Joined (Leave)
                            </>
                          ) : (
                            <>
                              Join Group <ChevronRight size={13} />
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "serve" && (
              <motion.div
                key="serve"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4"
              >
                <div className="border-b border-white/5 pb-2">
                  <h2 className="text-lg font-bold font-playfair text-white">Serve the Community</h2>
                  <p className="text-xs text-fog/60">Use your God-given talents to impact lives.</p>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {MINISTRIES.map((m, idx) => {
                    const isSignedUp = signedUpMinistries.has(m.id);
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-3xl p-4.5 border border-white/5 bg-[#10101c] flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A84C] shrink-0 border border-white/5">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 justify-between">
                            <h3 className="text-sm font-bold font-poppins text-white truncate">{m.label}</h3>
                            <span className="text-[9px] font-bold text-emerald-400 shrink-0">{m.spots}</span>
                          </div>
                          <p className="text-xs text-fog/60 leading-snug mt-1 font-body">{m.desc}</p>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleServeToggle(m.id)}
                            className={cn(
                              "mt-3 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border w-fit block",
                              isSignedUp
                                ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300"
                                : "border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/5"
                            )}
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {isSignedUp ? "Applied" : "Volunteer Now"}
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "pastor" && (
              <motion.div
                key="pastor"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-8"
              >
                <div className="w-18 h-18 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
                  <Heart size={32} />
                </div>

                <div className="space-y-2 max-w-sm">
                  <h2 className="text-xl font-bold font-playfair text-white">Pastoral Counseling</h2>
                  <p className="text-xs text-fog/75 leading-relaxed font-body">
                    Need someone to pray with, seek biblical guidance, or talk through a difficult life event? Our pastoral team is here to listen and walk with you.
                  </p>
                </div>

                <div className="pt-2 w-full max-w-xs">
                  <Link href="/request-meeting" className="block">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="w-full py-4 rounded-full bg-[#C9A84C] text-[#080812] font-bold text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      REQUEST A MEETING
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
