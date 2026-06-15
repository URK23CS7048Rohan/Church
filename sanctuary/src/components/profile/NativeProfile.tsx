"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Settings, LogOut, Heart, Calendar, Clock, HandHeart, User, Users, Phone, Gift, ShieldAlert, Award } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn, formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export function NativeProfile() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("Jordan Williams");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [birthday, setBirthday] = useState("1994-06-15");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  const handleLogout = () => {
    toast.error("Signing out...");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(232,208,109,0.12)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-[rgba(155,135,245,0.06)] to-transparent blur-[70px]" />
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
                MY PROFILE
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Member Account
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-fog active:scale-90 transition-transform"
            >
              <Settings size={16} />
            </button>
            <button 
              onClick={handleLogout}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-red-400 active:scale-90 transition-transform"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-grow px-5 pb-10 overflow-y-auto space-y-6 pt-4">
          {/* Avatar & Basic Bio Card */}
          <div className="rounded-3xl p-6 bg-white/[0.02] border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
              Verified
            </div>
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9E7C2B] text-midnight flex items-center justify-center text-2xl font-bold font-space-grotesk shadow-lg">
              JW
            </div>

            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-bold text-white font-poppins">{fullName}</h2>
              <p className="text-xs text-[#C9A84C] uppercase tracking-wider font-semibold font-space-grotesk">Active Member</p>
              <p className="text-[10px] text-white/45 font-mono">Member Since: Mar 2022</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 w-full pt-6 mt-6 border-t border-white/5">
              <div className="text-center space-y-1">
                <span className="text-sm font-bold text-white font-space-grotesk">$550.00</span>
                <span className="block text-[9px] text-fog/60 font-medium">Contributed</span>
              </div>
              <div className="text-center space-y-1 border-x border-white/5">
                <span className="text-sm font-bold text-white font-space-grotesk">1</span>
                <span className="block text-[9px] text-fog/60 font-medium">Groups</span>
              </div>
              <div className="text-center space-y-1">
                <span className="text-sm font-bold text-white font-space-grotesk">2</span>
                <span className="block text-[9px] text-fog/60 font-medium">RSVPs</span>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="rounded-3xl p-5 bg-[#12121e] border border-white/10 space-y-4 text-start overflow-hidden"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] font-space-grotesk mb-2">Edit Information</h3>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/55 mb-1.5 font-inter">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-[#F0EDE8] outline-none focus:border-[#C9A84C]/50"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/55 mb-1.5 font-inter">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-[#F0EDE8] outline-none focus:border-[#C9A84C]/50"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/55 mb-1.5 font-inter">Date of Birth</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-[#F0EDE8] outline-none focus:border-[#C9A84C]/50"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-[#C9A84C] text-[#080812] font-bold text-[10px] uppercase tracking-wider"
                  >
                    {saving ? "Saving..." : "Save Details"}
                  </motion.button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-white/5 text-[10px] uppercase text-fog hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Details grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            {/* Giving history */}
            <div className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] font-space-grotesk flex items-center gap-1.5">
                <Heart size={13} className="text-red-400" /> Giving Records
              </h3>
              <div className="space-y-2">
                {[
                  { fund: "Tithe", amount: 500, date: "Jun 1, 2026" },
                  { fund: "Missions", amount: 50, date: "May 18, 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-white/[0.03] last:border-0 text-xs font-inter">
                    <div>
                      <span className="font-semibold text-white">{item.fund}</span>
                      <span className="block text-[10px] text-fog/50 mt-0.5">{item.date}</span>
                    </div>
                    <span className="font-bold text-[#C9A84C]">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small Groups */}
            <div className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] font-space-grotesk flex items-center gap-1.5">
                <Users size={13} className="text-[#8B5CF6]" /> Small Groups
              </h3>
              <div className="space-y-2 font-inter text-xs">
                <div className="py-2 border-b border-white/[0.03] last:border-0 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">Young Adults Group</span>
                    <span className="block text-[10px] text-fog/50 mt-0.5">Thursdays at 7:00 PM</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] text-[9px] font-bold">Member</span>
                </div>
              </div>
            </div>

            {/* Event RSVPs */}
            <div className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] font-space-grotesk flex items-center gap-1.5">
                <Calendar size={13} className="text-[#3B82F6]" /> Event RSVPs
              </h3>
              <div className="space-y-2 font-inter text-xs">
                {[
                  { title: "Friday Celebration Service", date: "Jun 19, 2026" },
                  { title: "Young Adults Camp Retreat", date: "Jul 14, 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="py-2 border-b border-white/[0.03] last:border-0">
                    <span className="font-semibold text-white block truncate">{item.title}</span>
                    <span className="text-[10px] text-[#C9A84C] mt-0.5 block">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Prayers */}
            <div className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] font-space-grotesk flex items-center gap-1.5">
                <HandHeart size={13} className="text-pink-400" /> Prayer Requests
              </h3>
              <div className="space-y-2 font-inter text-xs">
                <div className="py-2 border-b border-white/[0.03] last:border-0">
                  <span className="font-semibold text-white block truncate">Clarity for job interview</span>
                  <span className="text-[10px] text-fog/50 mt-0.5 block">Posted Jun 12 · 8 Praying</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
