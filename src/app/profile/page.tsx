"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { formatCurrency, getInitials } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Heart, Calendar, HandHeart, Settings, LogOut, FileText, Gift, Clock, Quote, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

import { useNativePlatform } from "@/hooks/useNativePlatform";
import { NativeProfile } from "@/components/profile/NativeProfile";

export default function ProfilePage() {
  const isNative = useNativePlatform();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  if (isNative) {
    return <NativeProfile />;
  }

  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Lists
  const [giving, setGiving] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [prayers, setPrayers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // Fallback mockup
          setProfile({
            full_name: "Jordan Williams",
            avatar_url: null,
            member_since: "2022-03-15",
            role: "member",
            phone: "+1 (555) 234-5678",
            birthday: "1994-06-15",
          });
          setFullName("Jordan Williams");
          setPhone("+1 (555) 234-5678");
          setBirthday("1994-06-15");
          setGiving([
            { id: "1", fund: "tithe", amount_cents: 50000, frequency: "Monthly", created_at: "2026-06-01T00:00:00Z", status: "succeeded" },
            { id: "2", fund: "missions", amount_cents: 5000, frequency: "One-time", created_at: "2026-05-18T00:00:00Z", status: "succeeded" },
          ]);
          setEvents([{ id: "1", titleKey: "event_1_title", date: "2026-06-21" }]);
          setPrayers([{ id: "2", titleKey: "prayer_2_title", pray_count: 23, created_at: "2026-06-10T00:00:00Z" }]);
          setGroups([{ id: "1", nameKey: "group_1_name", role: "Member", dayKey: "Thursday" }]);
          setTestimonies([{ id: "1", title: "Job Breakthrough", content: "Praise God, I got a new job!", created_at: "2026-06-12" }]);
          setMeetings([{ id: "1", reason: "Pastoral Counseling", preferred_date: "2026-06-18", status: "pending" }]);
          setLoading(false);
          return;
        }

        // Load profile from Supabase
        const { data: prof, error: profErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profErr) throw profErr;

        setProfile(prof);
        setFullName(prof.full_name ?? "");
        setPhone(prof.phone ?? "");
        setBirthday(prof.birthday ?? "");

        // Load other tables
        const { data: giv } = await supabase.from("donations").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        setGiving(giv || []);

        const { data: prs } = await supabase.from("prayer_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        setPrayers(prs || []);

        const { data: tsts } = await supabase.from("testimonies").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        setTestimonies(tsts || []);

        const { data: mtgs } = await supabase.from("meeting_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        setMeetings(mtgs || []);

        // Load RSVPs
        const { data: rsvps } = await supabase.from("event_rsvps").select("*, event:events(title, date)").eq("user_id", user.id);
        const mappedEvents = (rsvps || []).map((r: any) => ({
          id: r.event_id,
          title: r.event?.title ?? "Church Event",
          date: r.event?.date ?? ""
        }));
        setEvents(mappedEvents);

        // Group fallback mock
        setGroups([{ id: "1", nameKey: "group_1_name", role: "Member", dayKey: "Thursday" }]);

      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(t("profile_toast_auth") || "You must be logged in to update your profile.");
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone,
          birthday: birthday || null
        })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prev: any) => ({
        ...prev,
        full_name: fullName,
        phone,
        birthday
      }));
      setIsEditing(false);
      toast.success(t("profile_save_success"));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const totalGiven = giving.reduce((sum, d) => sum + d.amount_cents, 0);

  const getLocalizedDay = (day: string) => {
    const daysMap: Record<string, Record<string, string>> = {
      Sunday: { en: "Sundays at 9 AM & 11 AM", hi: "रविवार सुबह 9 और 11 बजे", ml: "ഞായറാഴ്ചകളിൽ രാവിലെ 9 നും 11 നും", ar: "الآحاد 9 صباحاً و 11 صباحاً" },
      Thursday: { en: "Thursdays at 7 PM", hi: "गुरुवार शाम 7 बजे", ml: "വ്യാഴാഴ്ചകളിൽ വൈകുന്നേരം 7 ന്", ar: "الخميس 7 مساءً" },
    };
    return daysMap[day]?.[language] ?? day;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sacred border-t-transparent animate-spin" />
        <p className="font-label text-sm text-fog">Loading profile...</p>
      </div>
    );
  }

  return (
    <NativePageWrapper title="My Profile" accentColor="#E2D06D" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto">
          {/* Member Card */}
          <RevealOnScroll>
            <div className="glass rounded-3xl p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sacred to-sacred-dark flex items-center justify-center text-midnight font-heading text-3xl font-bold shadow-[0_0_32px_rgba(201,168,76,0.3)]">
                  {getInitials(profile?.full_name || "M")}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-midnight">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>

              {/* Info or Edit Form */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                {isEditing ? (
                  <div className="space-y-3 max-w-sm">
                    <div className="text-start">
                      <label className="block text-[10px] font-label text-fog uppercase tracking-wider mb-1">{t("profile_fullname_label")}</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full glass bg-midnight text-ivory px-3 py-1.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                      />
                    </div>
                    <div className="text-start">
                      <label className="block text-[10px] font-label text-fog uppercase tracking-wider mb-1">{t("profile_phone_label")}</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full glass bg-midnight text-ivory px-3 py-1.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                      />
                    </div>
                    <div className="text-start">
                      <label className="block text-[10px] font-label text-fog uppercase tracking-wider mb-1">{t("profile_birthday_label")}</label>
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full glass bg-midnight text-ivory px-3 py-1.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={handleSaveProfile} disabled={saving}>
                        {saving ? t("profile_saving") : t("profile_save_btn").split(" ")[0]}
                      </Button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1.5 text-xs font-label text-fog hover:text-ivory"
                      >
                        {t("community_modal_cancel")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="font-heading text-3xl font-bold text-ivory mb-1">{profile?.full_name}</h1>
                    <p className="font-label text-sm text-sacred capitalize">{profile?.role || "member"}</p>
                    
                    <div className="text-xs font-label text-fog/75 space-y-1 mt-2 text-start">
                      {profile?.phone && <p className="flex items-center gap-1.5"><Phone size={12} className="text-sacred" /> {profile.phone}</p>}
                      {profile?.birthday && <p className="flex items-center gap-1.5"><Gift size={12} className="text-sacred" /> {t("profile_birthday_label")}: {new Date(profile.birthday).toLocaleDateString(language, { month: "long", day: "numeric", year: "numeric" })}</p>}
                    </div>

                    <div className="flex gap-4 mt-6 justify-center sm:justify-start">
                      <div className="text-center">
                        <div className="font-label font-bold text-sacred text-lg">{formatCurrency(totalGiven)}</div>
                        <div className="font-body text-fog/60 text-xs">{t("profile_total_contributed")}</div>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="text-center">
                        <div className="font-label font-bold text-sacred text-lg">{events.length}</div>
                        <div className="font-body text-fog/60 text-xs">{t("profile_events_rsvped")}</div>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="text-center">
                        <div className="font-label font-bold text-sacred text-lg">{groups.length}</div>
                        <div className="font-body text-fog/60 text-xs">{t("profile_groups_count")}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2.5 glass rounded-xl text-fog hover:text-ivory transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={18} />
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2.5 glass rounded-xl text-fog hover:text-ember transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Giving History */}
            <RevealOnScroll>
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-lg font-bold text-ivory flex items-center gap-2">
                    <Heart size={16} className="text-sacred" /> {t("profile_offering_records")}
                  </h2>
                  <Link href="/give" className="font-body text-xs text-sacred hover:text-sacred-light transition-colors">{t("nav_give")} →</Link>
                </div>
                <div className="space-y-3 flex-grow max-h-60 overflow-y-auto pr-1">
                  {giving.length > 0 ? (
                    giving.map((d) => (
                      <div key={d.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="text-start">
                          <p className="font-label text-sm font-semibold text-ivory capitalize">{t(`give_fund_${d.fund.toLowerCase()}`)}</p>
                          <p className="font-body text-fog/60 text-xs">{new Date(d.created_at).toLocaleDateString(language, { month: "short", day: "numeric", year: "numeric" })} · {t(`give_freq_${d.frequency.toLowerCase().replace("-", "_")}`)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-label font-semibold text-sacred">{formatCurrency(d.amount_cents)}</p>
                          <p className="font-body text-emerald-400 text-xs capitalize">{d.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs font-body text-fog py-6 text-center">{t("profile_no_giving")}</p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between">
                  <span className="font-label text-sm text-fog">{t("profile_total_contributed")}</span>
                  <span className="font-label font-bold text-sacred">{formatCurrency(totalGiven)}</span>
                </div>
                <button className="mt-3 w-full py-2.5 rounded-xl border border-sacred/30 text-sacred font-label text-sm hover:bg-sacred/5 transition-colors flex items-center justify-center gap-2">
                  <FileText size={14} /> {t("profile_download_tax")}
                </button>
              </div>
            </RevealOnScroll>

            {/* Events */}
            <RevealOnScroll delay={0.1}>
              <div className="glass rounded-2xl p-6 h-full">
                <h2 className="font-heading text-lg font-bold text-ivory flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-sacred" /> {t("profile_rsvps_title")}
                </h2>
                {events.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {events.map((e, idx) => {
                      const eventDate = e.date ? new Date(e.date) : new Date();
                      return (
                        <div key={idx} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                          <div className="w-10 h-10 rounded-xl bg-surface-3 flex flex-col items-center justify-center shrink-0">
                            <span className="font-label font-bold text-sacred text-sm leading-none">{eventDate.getDate().toLocaleString(language)}</span>
                            <span className="font-accent text-[9px] text-fog/60 uppercase">{eventDate.toLocaleString(language, { month: "short" })}</span>
                          </div>
                          <p className="font-body text-ivory text-sm text-start">{e.titleKey ? t(e.titleKey) : e.title}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-body text-fog text-sm py-6 text-center">{t("profile_no_rsvps")}</p>
                )}
                <Link href="/events" className="block mt-4 font-body text-xs text-sacred hover:text-sacred-light transition-colors text-start">{t("profile_browse_events")}</Link>
              </div>
            </RevealOnScroll>

            {/* Prayer Requests */}
            <RevealOnScroll delay={0.2}>
              <div className="glass rounded-2xl p-6 h-full">
                <h2 className="font-heading text-lg font-bold text-ivory flex items-center gap-2 mb-4">
                  <HandHeart size={16} className="text-sacred" /> {t("profile_my_prayers")}
                </h2>
                {prayers.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {prayers.map((p) => {
                      const title = p.titleKey ? t(p.titleKey) : p.title;
                      return (
                        <div key={p.id} className="py-2 border-b border-white/5 last:border-0 text-start">
                          <p className="font-body text-ivory text-sm line-clamp-2">{title}</p>
                          <p className="font-body text-fog/60 text-xs mt-1">🙏 {p.pray_count || 0} {t("prayer_card_prayed")} · {t("meeting_label_purpose")}: {t("profile_status_approved")}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-body text-fog text-sm py-6 text-center">{t("profile_no_prayers")}</p>
                )}
                <Link href="/prayer" className="block mt-4 font-body text-xs text-sacred hover:text-sacred-light transition-colors text-start">{t("profile_submit_prayer")}</Link>
              </div>
            </RevealOnScroll>

            {/* Testimonies & 1-to-1 Meetings */}
            <RevealOnScroll delay={0.3}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col gap-6">
                <div>
                  <h2 className="font-heading text-lg font-bold text-ivory flex items-center gap-2 mb-3">
                    <Quote size={16} className="text-sacred" /> {t("profile_my_testimonies")}
                  </h2>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {testimonies.length > 0 ? (
                      testimonies.map((tItem) => (
                        <div key={tItem.id} className="p-3 bg-surface-2/40 rounded-xl border border-white/5 text-xs text-start">
                          <span className="font-bold text-ivory">{tItem.title}</span>
                          <p className="text-fog italic mt-1 line-clamp-2">"{tItem.content}"</p>
                          <span className="text-[10px] text-sacred block mt-2">{t("meeting_label_purpose")}: {tItem.is_approved ? t("profile_status_approved") : t("profile_status_pending")}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs font-body text-fog py-2">{t("profile_no_testimonies")}</p>
                    )}
                  </div>
                  <Link href="/testimonies" className="block mt-2 font-body text-xs text-sacred hover:text-sacred-light transition-colors text-start">{t("profile_share_testimony")}</Link>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h2 className="font-heading text-lg font-bold text-ivory flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-sacred" /> {t("profile_meetings_title")}
                  </h2>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {meetings.length > 0 ? (
                      meetings.map((m) => (
                        <div key={m.id} className="flex justify-between items-center p-3 bg-surface-2/40 rounded-xl border border-white/5 text-xs text-start">
                          <div>
                            <span className="font-bold text-ivory">{m.reason.split(" - ")[0]}</span>
                            <p className="text-fog text-[10px] mt-0.5">{t("meeting_label_date")}: {new Date(m.preferred_date).toLocaleDateString(language, { month: "short", day: "numeric", year: "numeric" })}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            m.status === "scheduled" ? "bg-emerald-500/20 text-emerald-400" : "bg-sacred/20 text-sacred"
                          }`}>
                            {m.status === "scheduled" ? t("profile_status_scheduled").toUpperCase() : t("profile_status_pending").toUpperCase()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs font-body text-fog py-2">{t("profile_no_meetings")}</p>
                    )}
                  </div>
                  <Link href="/request-meeting" className="block mt-2 font-body text-xs text-sacred hover:text-sacred-light transition-colors text-start">{t("profile_book_meeting")}</Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </NativePageWrapper>
  );
}
