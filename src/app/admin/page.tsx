"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Heart, HandHeart, Calendar, Radio, MessageSquare, Settings, Upload, CheckCircle, XCircle, ChevronRight, AlertTriangle, PhoneCall } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { cn, formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";

const ADMIN_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "members", label: "Members", icon: Users },
  { id: "giving", label: "Giving", icon: Heart },
  { id: "prayers", label: "Prayers", icon: HandHeart },
  { id: "testimonies", label: "Testimonies", icon: MessageSquare },
  { id: "meetings", label: "Meeting Requests", icon: PhoneCall },
  { id: "sermons", label: "Sermons", icon: Upload },
  { id: "events", label: "Events", icon: Calendar },
  { id: "live", label: "Live Stream", icon: Radio },
];

const STATS = [
  { label: "Total Members", value: 5200, prefix: "", suffix: "+", color: "text-sacred" },
  { label: "Monthly Giving", value: 87400, prefix: "$", suffix: "", color: "text-emerald-400" },
  { label: "Active Prayers", value: 143, prefix: "", suffix: "", color: "text-violet-light" },
  { label: "Approved Testimonies", value: 42, prefix: "", suffix: "", color: "text-blue-400" },
];

const MOCK_PRAYERS_ADMIN = [
  { id: "1", title: "Healing for my mother", user: "Marcus T.", category: "healing", created_at: new Date(Date.now() - 2 * 3600000).toISOString(), approved: true },
  { id: "2", title: "Direction for my career", user: "Anonymous", category: "guidance", created_at: new Date(Date.now() - 6 * 3600000).toISOString(), approved: true },
  { id: "3", title: "Community prayer", user: "Diana C.", category: "family", created_at: new Date(Date.now() - 12 * 3600000).toISOString(), approved: false },
  { id: "4", title: "Healing from anxiety", user: "James R.", category: "healing", created_at: new Date(Date.now() - 18 * 3600000).toISOString(), approved: false },
];

const MOCK_MEMBERS = [
  { id: "1", name: "Marcus Thompson", email: "marcus@email.com", role: "member", joined: "2022-03-15", giving: 50000 },
  { id: "2", name: "Sarah Okafor", email: "sarah@email.com", role: "leader", joined: "2020-08-01", giving: 120000 },
  { id: "3", name: "James Rivera", email: "james@email.com", role: "admin", joined: "2019-01-20", giving: 0 },
  { id: "4", name: "Diana Chen", email: "diana@email.com", role: "member", joined: "2024-01-10", giving: 25000 },
  { id: "5", name: "Aisha Williams", email: "aisha@email.com", role: "member", joined: "2023-06-05", giving: 75000 },
];

const RECENT_DONATIONS = [
  { user: "Marcus T.", fund: "Tithe", amount: 50000, date: "2026-06-01" },
  { user: "Sarah O.", fund: "Missions", amount: 20000, date: "2026-06-01" },
  { user: "Anonymous", fund: "Building Fund", amount: 100000, date: "2026-05-30" },
  { user: "Diana C.", fund: "General Offering", amount: 10000, date: "2026-05-29" },
];

const MOCK_TESTIMONIES_ADMIN = [
  { id: "1", title: "Healed from Chronic Pain", user: "Sarah Jenkins", content: "After years of struggling with severe back pain, the prayer team prayed over me at a Sunday service. Two days later, all pain vanished! The doctors are baffled, but I know it's a miracle.", approved: false },
  { id: "2", title: "Restored Marriage", user: "Daniel Miller", content: "My wife and I were on the verge of divorce. We joined an Agape Small Group and the support, prayer, and biblical guidance we received helped us forgive each other. Our marriage is stronger than ever.", approved: true },
];

const MOCK_MEETINGS_ADMIN = [
  { id: "1", full_name: "Sarah Jenkins", email: "sarah@example.com", phone: "+1 (555) 987-6543", preferred_date: "2026-06-20", reason: "Pastoral Counseling - Notes: Need guidance on family relationship decisions.", status: "pending" },
  { id: "2", full_name: "Michael Chang", email: "michael@example.com", phone: "+1 (555) 123-4567", preferred_date: "2026-06-18", reason: "Spiritual Mentorship - Notes: Looking to grow in daily prayer disciplines.", status: "approved" },
];

type AdminTab = "overview" | "members" | "giving" | "prayers" | "sermons" | "events" | "live" | "testimonies" | "meetings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [prayers, setPrayers] = useState(MOCK_PRAYERS_ADMIN);
  const [testimonies, setTestimonies] = useState(MOCK_TESTIMONIES_ADMIN);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS_ADMIN);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pendingPrayers = prayers.filter((p) => !p.approved).length;
  const pendingTestimonies = testimonies.filter((t) => !t.approved).length;
  const pendingMeetings = meetings.filter((m) => m.status === "pending").length;

  const approvePrayer = (id: string) => {
    setPrayers((prev) => prev.map((p) => p.id === id ? { ...p, approved: true } : p));
  };

  const rejectPrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  const approveTestimony = (id: string) => {
    setTestimonies((prev) => prev.map((t) => t.id === id ? { ...t, approved: true } : t));
  };

  const rejectTestimony = (id: string) => {
    setTestimonies((prev) => prev.filter((t) => t.id !== id));
  };

  const approveMeeting = (id: string) => {
    setMeetings((prev) => prev.map((m) => m.id === id ? { ...m, status: "approved" } : m));
  };

  const rejectMeeting = (id: string) => {
    setMeetings((prev) => prev.map((m) => m.id === id ? { ...m, status: "rejected" } : m));
  };

  const completeMeeting = (id: string) => {
    setMeetings((prev) => prev.map((m) => m.id === id ? { ...m, status: "completed" } : m));
  };

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <aside className={cn("flex flex-col bg-surface-1 border-r border-white/5 transition-all duration-300 shrink-0", sidebarOpen ? "w-60" : "w-16")}>
        {/* Logo */}
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <span className="font-accent text-sacred text-lg shrink-0">✦</span>
          {sidebarOpen && <span className="font-accent text-ivory text-sm tracking-wider">Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label text-sm font-semibold transition-all duration-200",
                activeTab === tab.id
                  ? "bg-sacred/15 text-sacred"
                  : "text-fog hover:text-ivory hover:bg-white/5"
              )}
              id={`admin-tab-${tab.id}`}
            >
              <tab.icon size={18} className="shrink-0" />
              {sidebarOpen && (
                <span className="flex-1 text-left flex items-center justify-between">
                  <span>{tab.label}</span>
                  <div className="flex gap-1 shrink-0">
                    {tab.id === "prayers" && pendingPrayers > 0 && (
                      <span className="inline-flex w-5 h-5 rounded-full bg-ember text-midnight text-[10px] font-bold items-center justify-center">
                        {pendingPrayers}
                      </span>
                    )}
                    {tab.id === "testimonies" && pendingTestimonies > 0 && (
                      <span className="inline-flex w-5 h-5 rounded-full bg-ember text-midnight text-[10px] font-bold items-center justify-center">
                        {pendingTestimonies}
                      </span>
                    )}
                    {tab.id === "meetings" && pendingMeetings > 0 && (
                      <span className="inline-flex w-5 h-5 rounded-full bg-ember text-midnight text-[10px] font-bold items-center justify-center">
                        {pendingMeetings}
                      </span>
                    )}
                  </div>
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5">
          <Link href="/" className={cn("flex items-center gap-3 px-3 py-2 rounded-xl text-fog hover:text-ivory text-sm font-label transition-colors", !sidebarOpen && "justify-center")}>
            <ChevronRight size={16} className="rotate-180 shrink-0" />
            {sidebarOpen && "Back to Site"}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-surface-1/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen((v) => !v)} className="p-2 glass rounded-xl text-fog hover:text-ivory transition-colors" aria-label="Toggle sidebar">
            <LayoutDashboard size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sacred/30 flex items-center justify-center font-label font-bold text-sacred text-sm">A</div>
            <span className="font-label text-sm text-ivory hidden sm:block">Admin</span>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">Dashboard Overview</h1>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {STATS.map(({ label, value, prefix, suffix, color }) => (
                    <div key={label} className="glass rounded-2xl p-5">
                      <p className="font-label text-xs text-fog/70 uppercase tracking-wider mb-2">{label}</p>
                      <div className={cn("font-display text-3xl font-bold", color)}>
                        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pending approvals alert */}
                {pendingPrayers > 0 && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-ember/15 border border-ember/30 mb-6">
                    <AlertTriangle size={18} className="text-ember shrink-0" />
                    <p className="font-body text-ivory text-sm">
                      <strong>{pendingPrayers} prayer request{pendingPrayers > 1 ? "s" : ""}</strong> awaiting approval.{" "}
                      <button onClick={() => setActiveTab("prayers")} className="text-ember underline">Review now →</button>
                    </p>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent donations */}
                  <div className="glass rounded-2xl p-5">
                    <h2 className="font-heading text-lg font-bold text-ivory mb-4">Recent Donations</h2>
                    <div className="space-y-3">
                      {RECENT_DONATIONS.map((d, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className="font-label text-sm font-semibold text-ivory">{d.user}</p>
                            <p className="font-body text-fog/60 text-xs capitalize">{d.fund} · {formatDate(d.date)}</p>
                          </div>
                          <span className="font-label font-semibold text-emerald-400">{formatCurrency(d.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent members */}
                  <div className="glass rounded-2xl p-5">
                    <h2 className="font-heading text-lg font-bold text-ivory mb-4">Recent Members</h2>
                    <div className="space-y-3">
                      {MOCK_MEMBERS.slice(0, 4).map((m) => (
                        <div key={m.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center font-label font-semibold text-ivory text-xs shrink-0">
                            {m.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-label text-sm font-semibold text-ivory truncate">{m.name}</p>
                            <p className="font-body text-fog/60 text-xs truncate">{m.email}</p>
                          </div>
                          <span className={cn("font-label text-xs capitalize px-2 py-0.5 rounded-full", m.role === "admin" ? "bg-sacred/20 text-sacred" : m.role === "leader" ? "bg-violet/20 text-violet-light" : "bg-surface-3 text-fog")}>
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "prayers" && (
              <motion.div key="prayers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">Prayer Requests</h1>
                <div className="space-y-4">
                  {prayers.map((p) => (
                    <div key={p.id} className={cn("glass rounded-xl p-5 flex items-center justify-between gap-4", !p.approved && "border-ember/30")}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!p.approved && <span className="w-2 h-2 rounded-full bg-ember shrink-0" />}
                          <h3 className="font-heading font-semibold text-ivory truncate">{p.title}</h3>
                        </div>
                        <p className="font-body text-fog/70 text-sm">{p.user} · <span className="capitalize">{p.category}</span> · {formatRelativeTime(p.created_at)}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {p.approved ? (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 font-label text-xs font-semibold">
                            <CheckCircle size={12} /> Approved
                          </span>
                        ) : (
                          <>
                            <button onClick={() => approvePrayer(p.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-label text-xs font-semibold transition-colors" id={`approve-prayer-${p.id}`}>
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button onClick={() => rejectPrayer(p.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/15 text-ember hover:bg-ember/25 font-label text-xs font-semibold transition-colors" id={`reject-prayer-${p.id}`}>
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "members" && (
              <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">Members</h1>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-5 px-5 py-3 border-b border-white/10 text-xs font-label text-fog/60 uppercase tracking-wider">
                    <span className="col-span-2">Name</span>
                    <span>Role</span>
                    <span>Joined</span>
                    <span>YTD Giving</span>
                  </div>
                  {MOCK_MEMBERS.map((m, i) => (
                    <div key={m.id} className={cn("grid grid-cols-5 px-5 py-4 items-center", i % 2 === 0 ? "bg-white/[0.02]" : "")}>
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center font-label text-xs font-semibold text-ivory shrink-0">{m.name.charAt(0)}</div>
                        <div>
                          <p className="font-label text-sm font-semibold text-ivory">{m.name}</p>
                          <p className="font-body text-fog/60 text-xs">{m.email}</p>
                        </div>
                      </div>
                      <span className={cn("font-label text-xs capitalize px-2 py-0.5 rounded-full w-fit", m.role === "admin" ? "bg-sacred/20 text-sacred" : m.role === "leader" ? "bg-violet/20 text-violet-light" : "bg-surface-3 text-fog")}>
                        {m.role}
                      </span>
                      <span className="font-body text-fog text-sm">{formatDate(m.joined)}</span>
                      <span className="font-label font-semibold text-emerald-400">{m.giving > 0 ? formatCurrency(m.giving) : "—"}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "giving" && (
              <motion.div key="giving" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">Giving Overview</h1>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "This Month", value: 87400, color: "text-emerald-400" },
                    { label: "YTD Total", value: 2400000, color: "text-sacred" },
                    { label: "Monthly Givers", value: 847, color: "text-violet-light" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="glass rounded-2xl p-5">
                      <p className="font-label text-xs text-fog/70 uppercase tracking-wider mb-2">{label}</p>
                      <p className={cn("font-display text-3xl font-bold", color)}>{label === "Monthly Givers" ? value.toLocaleString() : formatCurrency(value)}</p>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-2xl p-5">
                  <h2 className="font-heading text-lg font-bold text-ivory mb-4">Recent Transactions</h2>
                  <div className="space-y-3">
                    {RECENT_DONATIONS.map((d, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-label text-sm font-semibold text-ivory">{d.user}</p>
                          <p className="font-body text-fog/60 text-xs capitalize">{d.fund} · {formatDate(d.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-label font-semibold text-emerald-400">{formatCurrency(d.amount)}</p>
                          <p className="font-body text-emerald-400/70 text-xs">succeeded</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "testimonies" && (
              <motion.div key="testimonies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">Testimonies Moderation</h1>
                <div className="space-y-4">
                  {testimonies.map((t) => (
                    <div key={t.id} className={cn("glass rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border", !t.approved ? "border-ember/30" : "border-white/5")}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!t.approved && <span className="w-2 h-2 rounded-full bg-ember shrink-0" />}
                          <h3 className="font-heading font-semibold text-ivory">{t.title}</h3>
                        </div>
                        <p className="font-body text-fog/90 text-sm italic my-2">"{t.content}"</p>
                        <p className="font-body text-fog/60 text-xs">Shared by {t.user}</p>
                      </div>
                      <div className="flex gap-2 shrink-0 self-end md:self-center">
                        {t.approved ? (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 font-label text-xs font-semibold">
                            <CheckCircle size={12} /> Approved
                          </span>
                        ) : (
                          <>
                            <button onClick={() => approveTestimony(t.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-label text-xs font-semibold transition-colors" id={`approve-testimony-${t.id}`}>
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button onClick={() => rejectTestimony(t.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/15 text-ember hover:bg-ember/25 font-label text-xs font-semibold transition-colors" id={`reject-testimony-${t.id}`}>
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "meetings" && (
              <motion.div key="meetings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6">1-to-1 Pastoral Counseling Requests</h1>
                <div className="space-y-4">
                  {meetings.map((m) => (
                    <div key={m.id} className={cn("glass rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border", m.status === "pending" ? "border-ember/30" : "border-white/5")}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {m.status === "pending" && <span className="w-2 h-2 rounded-full bg-ember shrink-0" />}
                          <h3 className="font-heading font-semibold text-ivory">{m.full_name}</h3>
                          <span className={cn("text-[10px] font-label font-bold px-2 py-0.5 rounded capitalize", 
                            m.status === "pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                            m.status === "approved" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" :
                            m.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            "bg-white/5 text-fog border border-white/10"
                          )}>
                            {m.status}
                          </span>
                        </div>
                        <p className="font-body text-fog/90 text-sm my-2">{m.reason}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-fog/60 text-xs font-body">
                          <p>Preferred Date: <strong className="text-ivory">{formatDate(m.preferred_date)}</strong></p>
                          <p>·</p>
                          <p>Phone: <strong className="text-ivory">{m.phone || "N/A"}</strong></p>
                          <p>·</p>
                          <p>Email: <strong className="text-ivory">{m.email}</strong></p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0 self-end md:self-center">
                        {m.status === "pending" && (
                          <>
                            <button onClick={() => approveMeeting(m.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 font-label text-xs font-semibold transition-colors" id={`approve-meeting-${m.id}`}>
                              <CheckCircle size={12} /> Schedule
                            </button>
                            <button onClick={() => rejectMeeting(m.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/15 text-ember hover:bg-ember/25 font-label text-xs font-semibold transition-colors" id={`reject-meeting-${m.id}`}>
                              <XCircle size={12} /> Decline
                            </button>
                          </>
                        )}
                        {m.status === "approved" && (
                          <button onClick={() => completeMeeting(m.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-label text-xs font-semibold transition-colors" id={`complete-meeting-${m.id}`}>
                            <CheckCircle size={12} /> Mark Completed
                          </button>
                        )}
                        {(m.status === "completed" || m.status === "rejected") && (
                          <span className="text-fog/50 text-xs font-label italic">Request resolved</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === "sermons" || activeTab === "events" || activeTab === "live") && (
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl font-bold text-ivory mb-6 capitalize">{activeTab === "live" ? "Live Stream Controls" : activeTab}</h1>
                <div className="glass rounded-2xl p-8 text-center">
                  <p className="font-body text-fog text-lg">
                    {activeTab === "sermons" && "Upload and manage sermon videos from YouTube. Connect your YouTube channel in settings."}
                    {activeTab === "events" && "Create and manage church events, RSVPs, and attendance tracking."}
                    {activeTab === "live" && "Start and stop the live stream. Configure YouTube Live integration in settings."}
                  </p>
                  <p className="font-body text-fog/50 text-sm mt-3">Full functionality available after connecting your YouTube channel in Settings.</p>
                  <button className="mt-6 px-6 py-3 rounded-xl bg-sacred text-midnight font-label font-semibold hover:bg-sacred-light transition-colors" id={`admin-${activeTab}-action`}>
                    {activeTab === "sermons" ? "Connect YouTube" : activeTab === "events" ? "Create Event" : "Configure Live Stream"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
