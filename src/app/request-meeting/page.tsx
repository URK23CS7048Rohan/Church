"use client";

import React, { useState, useEffect } from "react";
import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";
import { Calendar, MessageSquare, Phone, Mail, User, CheckCircle2 } from "lucide-react";

export default function RequestMeetingPage() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [reason, setReason] = useState("option_pastoral");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser(authUser);
        setEmail(authUser.email ?? "");
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", authUser.id)
          .single();
        
        if (profile) {
          setFullName(profile.full_name ?? "");
          setPhone(profile.phone ?? "");
        }
      }
    };
    getProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !preferredDate) {
      toast.error(t("meeting_toast_fill"));
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("meeting_requests").insert({
        user_id: user?.id ?? null,
        full_name: fullName,
        email,
        phone,
        preferred_date: preferredDate,
        reason: `${t(reason)} - Notes: ${notes}`,
        status: "pending"
      });

      if (error) throw error;

      toast.success(t("meeting_toast_success"));
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativePageWrapper title="Book Meeting" accentColor="#C4B5FD" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0 px-4">
      <div className="max-w-2xl mx-auto">
          <SectionHeader
            eyebrow={t("meeting_eyebrow")}
            title={t("meeting_title")}
            titleHighlight={t("meeting_title_highlight")}
            subtitle={t("meeting_subtitle")}
          />

          <div className="mt-10">
            {submitted ? (
              <GlassCard className="p-8 md:p-12 border border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-sacred/20 text-sacred flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-ivory">{t("meeting_success_title")}</h3>
                <p className="font-body text-fog text-sm leading-relaxed max-w-md mx-auto">
                  {t("meeting_success_desc")}
                </p>
                <div className="pt-4">
                  <Button onClick={() => setSubmitted(false)}>{t("meeting_success_again")}</Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 border border-white/5 bg-surface-1">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="text-start">
                    <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                      {t("meeting_label_name")} <span className="text-sacred">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-3 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                      />
                      <User className="absolute left-3.5 top-3.5 text-fog" size={16} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="text-start">
                      <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                        {t("meeting_label_email")} <span className="text-sacred">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-3 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                        />
                        <Mail className="absolute left-3.5 top-3.5 text-fog" size={16} />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="text-start">
                      <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                        {t("meeting_label_phone")}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="(555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-3 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                        />
                        <Phone className="absolute left-3.5 top-3.5 text-fog" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Preferred Date */}
                    <div className="text-start">
                      <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                        {t("meeting_label_date")} <span className="text-sacred">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-3 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                        />
                        <Calendar className="absolute left-3.5 top-3.5 text-fog" size={16} />
                      </div>
                    </div>

                    {/* Purpose of meeting */}
                    <div className="text-start">
                      <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                        {t("meeting_label_purpose")}
                      </label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full glass bg-midnight text-ivory px-3 py-3 rounded-xl text-sm font-body border border-white/10 focus:border-sacred outline-none"
                      >
                        <option value="option_pastoral" className="bg-surface-2">{t("option_pastoral")}</option>
                        <option value="option_spiritual" className="bg-surface-2">{t("option_spiritual")}</option>
                        <option value="option_theology" className="bg-surface-2">{t("option_theology")}</option>
                        <option value="option_marriage" className="bg-surface-2">{t("option_marriage")}</option>
                        <option value="option_other" className="bg-surface-2">{t("option_other")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="text-start">
                    <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                      {t("meeting_label_notes")}
                    </label>
                    <div className="relative">
                      <textarea
                        rows={4}
                        placeholder={t("meeting_placeholder_notes")}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full glass bg-midnight text-ivory pl-10 pr-4 py-3 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred resize-none"
                      />
                      <MessageSquare className="absolute left-3.5 top-3.5 text-fog" size={16} />
                    </div>
                  </div>

                  {/* Action button */}
                  <Button type="submit" disabled={loading} className="w-full py-3 text-sm font-label font-bold uppercase tracking-wider">
                    {loading ? t("meeting_submitting") : t("meeting_btn_submit")}
                  </Button>
                </form>
              </GlassCard>
            )}
          </div>
        </div>
    </NativePageWrapper>
  );
}
