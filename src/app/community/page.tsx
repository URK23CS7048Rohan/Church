"use client";

import { NativePageWrapper } from "@/components/layout/NativePageWrapper";
import { useState, useCallback } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Upload, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface MultilingualPhoto {
  id: string;
  image_url: string;
  captionKey?: string;
  caption: string;
  heart_count: number;
  user: string;
  service_date: string;
}

// Mock photo data using local church photos
const MOCK_PHOTOS: MultilingualPhoto[] = [
  { id: "1", image_url: "/church-photos/main-prayer.jpeg", captionKey: "photo_1_caption", caption: "Blessed time of prayer and intercession", heart_count: 94, user: "Agape Media", service_date: "2026-06-08" },
  { id: "2", image_url: "/church-photos/church-photo-1.jpeg", captionKey: "photo_2_caption", caption: "Congregational Worship", heart_count: 88, user: "Brother John", service_date: "2026-06-08" },
  { id: "3", image_url: "/church-photos/church-photo-2.jpeg", captionKey: "photo_3_caption", caption: "Our Sanctuary", heart_count: 72, user: "Sister Sarah", service_date: "2026-06-01" },
  { id: "4", image_url: "/church-photos/church-photo-3.jpeg", captionKey: "photo_4_caption", caption: "Praise & Worship Team", heart_count: 82, user: "Worship Leader", service_date: "2026-06-01" },
  { id: "5", image_url: "/church-photos/church-photo-4.jpeg", captionKey: "photo_5_caption", caption: "Weekly Home Fellowships", heart_count: 65, user: "Group Coordinator", service_date: "2026-05-25" },
  { id: "6", image_url: "/church-photos/church-photo-5.jpeg", captionKey: "photo_6_caption", caption: "Sunday Service Assembly", heart_count: 99, user: "Pastor David", service_date: "2026-05-25" },
  { id: "7", image_url: "/church-photos/church-photo-6.jpeg", captionKey: "photo_7_caption", caption: "Gathered Believers in Fellowship", heart_count: 51, user: "Agape Media", service_date: "2026-05-18" },
  { id: "8", image_url: "/church-photos/church-photo-7.jpeg", captionKey: "photo_8_caption", caption: "Youth Gathering", heart_count: 78, user: "Youth Leader", service_date: "2026-05-18" },
  { id: "9", image_url: "/church-photos/church-photo-8.jpeg", captionKey: "photo_9_caption", caption: "Worship & Praise Service", heart_count: 63, user: "Brother Marcus", service_date: "2026-05-11" },
];

const SERVICE_DATES_RAW = ["all", "2026-06-08", "2026-06-01", "2026-05-25", "2026-05-18", "2026-05-11"];

import { useNativePlatform } from "@/hooks/useNativePlatform";
import { NativeCommunity } from "@/components/community/NativeCommunity";

export default function CommunityPage() {
  const isNative = useNativePlatform();
  const { t, language } = useLanguage();
  const [photos, setPhotos] = useState(MOCK_PHOTOS);
  const [heartedIds, setHeartedIds] = useState<Set<string>>(new Set());

  if (isNative) {
    return <NativeCommunity />;
  }

  const [uploadOpen, setUploadOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");

  const handleHeart = useCallback((id: string) => {
    if (heartedIds.has(id)) return;
    setHeartedIds((prev) => new Set([...prev, id]));
    setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, heart_count: p.heart_count + 1 } : p));
  }, [heartedIds]);

  const filtered = dateFilter === "all" ? photos : photos.filter((p) => {
    return p.service_date === dateFilter;
  });

  return (
    <NativePageWrapper title="Community" accentColor="#86EFAC" mainClassName="min-h-screen pt-32 pb-20 lg:pb-0">
        {/* Hero */}
        <div className="relative pt-32 pb-12 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
          <div className="max-w-7xl mx-auto relative z-10 flex items-end justify-between flex-wrap gap-6">
            <SectionHeader eyebrow={t("community_eyebrow")} title={t("community_title")} titleHighlight={t("community_title_highlight")} subtitle={t("community_subtitle")} align="left" />
            <RevealOnScroll direction="left">
              <Button variant="primary" icon={<Camera size={16} />} onClick={() => setUploadOpen(true)} id="upload-photo-btn">
                {t("community_btn_share")}
              </Button>
            </RevealOnScroll>
          </div>
        </div>

        {/* Date filter pills */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SERVICE_DATES_RAW.map((dateVal) => {
              const label = dateVal === "all" 
                ? t("community_filter_all") 
                : new Date(dateVal).toLocaleDateString(language, { month: "long", day: "numeric" });
              return (
                <button
                  key={dateVal}
                  onClick={() => setDateFilter(dateVal)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-full font-label text-sm font-semibold border transition-all duration-200",
                    dateFilter === dateVal
                      ? "bg-sacred text-midnight border-sacred"
                      : "border-white/10 text-fog hover:text-ivory hover:border-white/20"
                  )}
                  id={`date-filter-${dateVal}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry photo grid */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="masonry">
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="masonry-item"
                >
                  <PhotoCard photo={photo} hearted={heartedIds.has(photo.id)} onHeart={handleHeart} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-fog">{t("community_no_photos")}</p>
            </div>
          )}
        </section>
            {/* Upload Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <PhotoUploadModal
            onClose={() => setUploadOpen(false)}
            onUploaded={(photo) => {
              setPhotos((p) => [photo, ...p]);
              setUploadOpen(false);
              toast.success(t("community_toast_success"));
            }}
          />
        )}
      </AnimatePresence>
    </NativePageWrapper>
  );
}

function PhotoCard({ photo, hearted, onHeart }: { photo: MultilingualPhoto; hearted: boolean; onHeart: (id: string) => void }) {
  const { t, language } = useLanguage();
  const caption = photo.captionKey ? t(photo.captionKey) : photo.caption;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-surface-2 cursor-pointer" onClick={() => onHeart(photo.id)}>
      <img src={photo.image_url} alt={caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-start">
        <p className="font-body text-ivory text-sm font-medium mb-1">{caption}</p>
        <div className="flex items-center justify-between">
          <span className="font-label text-fog/70 text-xs">{photo.user}</span>
          <div className={cn("flex items-center gap-1.5 text-xs font-label", hearted ? "text-red-400" : "text-ivory/70")}>
            <Heart size={13} className={cn("transition-all", hearted ? "fill-red-400 scale-125" : "")} />
            {(photo.heart_count + (hearted ? 1 : 0)).toLocaleString(language)}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoUploadModal({ onClose, onUploaded }: { onClose: () => void; onUploaded: (p: MultilingualPhoto) => void }) {
  const { t } = useLanguage();
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error(t("community_toast_err_img")); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!preview) { toast.error(t("community_toast_err_select")); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    onUploaded({ id: Date.now().toString(), image_url: preview, caption, heart_count: 0, user: "You", service_date: new Date().toISOString().split("T")[0] });
    setLoading(false);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[10vh] md:w-full md:max-w-md z-50 glass-strong rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-ivory">{t("community_modal_title")}</h2>
          <button onClick={onClose} className="w-8 h-8 glass rounded-full flex items-center justify-center text-fog hover:text-ivory"><X size={16} /></button>
        </div>

        {!preview ? (
          <div
            className={cn("upload-zone rounded-2xl p-10 text-center cursor-pointer transition-all", dragging && "drag-over")}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("photo-file-input")?.click()}
          >
            <Upload size={32} className="text-sacred/60 mx-auto mb-3" />
            <p className="font-body text-fog">{t("community_modal_drop")}</p>
            <p className="font-body text-fog/50 text-xs mt-1">{t("community_modal_hint")}</p>
            <input id="photo-file-input" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>
        ) : (
          <div className="mb-4">
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
              <button onClick={() => setPreview(null)} className="absolute top-2 right-2 w-7 h-7 glass rounded-full flex items-center justify-center text-ivory"><X size={14} /></button>
            </div>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={t("community_modal_caption")} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/10 font-body text-ivory placeholder:text-fog/40 focus:outline-none focus:border-sacred/40 transition-colors" id="photo-caption" />
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-fog font-label text-sm hover:text-ivory transition-colors">{t("community_modal_cancel")}</button>
          <Button variant="primary" className="flex-1" loading={loading} onClick={handleSubmit} disabled={!preview}>{t("community_modal_upload")}</Button>
        </div>
      </motion.div>
    </>
  );
}
