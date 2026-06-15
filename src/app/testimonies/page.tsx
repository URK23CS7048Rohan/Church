"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";
import { MessageSquare, Quote, Heart, Send, CheckCircle2, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimony {
  id: string;
  author_name: string;
  title: string;
  content: string;
  created_at: string;
}

export default function TestimoniesPage() {
  const { t } = useLanguage();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Submit Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch approved testimonies
  const fetchTestimonies = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setTestimonies(data || []);
    } catch (err: any) {
      console.error(err);
      // Fallback seed data if table is not loaded yet
      setTestimonies([
        { id: "1", author_name: "Sarah Jenkins", title: "Healed from Chronic Pain", content: "After years of struggling with severe back pain, the prayer team prayed over me at a Sunday service. Two days later, all pain vanished! The doctors are baffled, but I know it's a miracle.", created_at: "2026-06-01" },
        { id: "2", author_name: "Daniel Miller", title: "Restored Marriage", content: "My wife and I were on the verge of divorce. We joined an Agape Small Group and the support, prayer, and biblical guidance we received helped us forgive each other. Our marriage is stronger than ever.", created_at: "2026-06-05" },
        { id: "3", author_name: "Grace Mitchell", title: "Provision in Hard Times", content: "I was laid off from my job and didn't know how I'd pay rent. The church rallied around me in prayer, and within a week, I received a job offer with better pay and hours. God is indeed faithful!", created_at: "2026-06-10" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonies();

    // Check user auth
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser(authUser);
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", authUser.id).single();
        if (profile) setAuthorName(profile.full_name ?? "");
      }
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !authorName) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("testimonies").insert({
        user_id: user?.id ?? null,
        author_name: authorName,
        title,
        content,
        is_approved: false // Set to false so admin can moderate
      });

      if (error) throw error;

      toast.success("Testimony submitted! It will appear on the wall once reviewed by leaders.");
      setTitle("");
      setContent("");
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit testimony.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <NativePageWrapper title="Testimonies" accentColor="#FB923C" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/5 pb-8">
            <div className="max-w-xl">
              <SectionHeader
                eyebrow={t("title_testimonies")}
                title={t("test_title")}
                titleHighlight={t("test_title_highlight")}
                subtitle={t("test_subtitle")}
                className="mb-0 text-left"
              />
              <div className="mt-4">
                <p className="font-body text-fog italic text-sm">
                  "{t("test_scripture")}"
                </p>
                <p className="font-accent text-xs text-sacred/70 tracking-widest mt-1">
                  {t("test_scripture_ref")}
                </p>
              </div>
            </div>
            <Button onClick={() => setModalOpen(true)} className="shrink-0">
              {t("test_share_btn")}
            </Button>
          </div>

          {/* Testimonies list grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-sacred border-t-transparent animate-spin" />
              <p className="font-label text-sm text-fog">{t("test_loading")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {testimonies.map((t, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  key={t.id}
                >
                  <GlassCard className="p-6 md:p-8 border border-white/5 bg-surface-1 flex flex-col h-full hover:border-sacred/30 transition-all duration-300 relative shadow-lg">
                    <Quote className="absolute top-4 right-4 text-sacred/20" size={32} />
                    <h3 className="font-heading text-lg font-bold text-ivory mb-2 pr-6">
                      {t.title}
                    </h3>
                    <p className="font-body text-fog/90 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                      "{t.content}"
                    </p>
                    <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-label text-fog/60">
                      <span className="font-semibold text-sacred flex items-center gap-1">
                        <User size={12} /> {t.author_name}
                      </span>
                      <span>{new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
            {/* Share Testimony Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass bg-surface-1 border border-sacred/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
                <h3 className="font-heading text-lg font-bold text-ivory flex items-center gap-2">
                  <Quote size={18} className="text-sacred" /> {t("test_modal_title")}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-fog hover:text-ivory rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                    {t("test_label_name")} <span className="text-sacred">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("test_placeholder_name")}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full glass bg-midnight text-ivory px-3 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                    {t("test_label_title")} <span className="text-sacred">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("test_placeholder_title")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass bg-midnight text-ivory px-3 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-label text-fog uppercase tracking-wider mb-2">
                    {t("test_label_story")} <span className="text-sacred">*</span>
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder={t("test_placeholder_story")}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full glass bg-midnight text-ivory px-3 py-2.5 rounded-xl text-sm font-body border border-white/10 outline-none focus:border-sacred resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-sm font-label text-fog hover:text-ivory transition-colors"
                  >
                    {t("test_btn_cancel")}
                  </button>
                  <Button type="submit" disabled={submitLoading} className="flex items-center gap-2">
                    <Send size={14} /> {submitLoading ? t("test_submitting") : t("test_btn_submit")}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NativePageWrapper>
  );
}
