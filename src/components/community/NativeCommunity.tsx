"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Camera, Heart, X, Upload } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface MultilingualPhoto {
  id: string;
  image_url: string;
  caption: string;
  heart_count: number;
  user: string;
  service_date: string;
}

const MOCK_PHOTOS: MultilingualPhoto[] = [
  { id: "1", image_url: "/church-photos/main-prayer.jpeg", caption: "Blessed time of prayer and intercession", heart_count: 94, user: "Agape Media", service_date: "2026-06-08" },
  { id: "2", image_url: "/church-photos/church-photo-1.jpeg", caption: "Congregational Worship", heart_count: 88, user: "Brother John", service_date: "2026-06-08" },
  { id: "3", image_url: "/church-photos/church-photo-2.jpeg", caption: "Our Sanctuary", heart_count: 72, user: "Sister Sarah", service_date: "2026-06-01" },
  { id: "4", image_url: "/church-photos/church-photo-3.jpeg", caption: "Praise & Worship Team", heart_count: 82, user: "Worship Leader", service_date: "2026-06-01" },
  { id: "5", image_url: "/church-photos/church-photo-4.jpeg", caption: "Weekly Home Fellowships", heart_count: 65, user: "Group Coordinator", service_date: "2026-05-25" },
  { id: "6", image_url: "/church-photos/church-photo-5.jpeg", caption: "Sunday Service Assembly", heart_count: 99, user: "Pastor David", service_date: "2026-05-25" },
  { id: "7", image_url: "/church-photos/church-photo-6.jpeg", caption: "Gathered Believers in Fellowship", heart_count: 51, user: "Agape Media", service_date: "2026-05-18" },
  { id: "8", image_url: "/church-photos/church-photo-7.jpeg", caption: "Youth Gathering", heart_count: 78, user: "Youth Leader", service_date: "2026-05-18" },
];

const DATES = ["all", "2026-06-08", "2026-06-01", "2026-05-25", "2026-05-18"];

export function NativeCommunity() {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<MultilingualPhoto[]>(MOCK_PHOTOS);
  const [heartedIds, setHeartedIds] = useState<Set<string>>(new Set());
  const [dateFilter, setDateFilter] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Form upload state
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHeart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (heartedIds.has(id)) {
      setHeartedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, heart_count: p.heart_count - 1 } : p));
    } else {
      setHeartedIds(prev => new Set([...prev, id]));
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, heart_count: p.heart_count + 1 } : p));
      toast.success("Loved this memory! ❤️", { duration: 1000 });
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please choose a photo");
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));

    const newPhoto: MultilingualPhoto = {
      id: Date.now().toString(),
      image_url: selectedImage,
      caption: caption || "Church life snapshot",
      heart_count: 1,
      user: "You",
      service_date: "2026-06-08"
    };

    setPhotos(prev => [newPhoto, ...prev]);
    setHeartedIds(prev => new Set([...prev, newPhoto.id]));
    setIsSubmitting(false);
    setIsUploadOpen(false);
    setCaption("");
    setSelectedImage(null);
    toast.success("Photo uploaded to gallery! 📸");
  };

  const filteredPhotos = photos.filter(p => {
    return dateFilter === "all" || p.service_date === dateFilter;
  });

  const col1 = filteredPhotos.filter((_, i) => i % 2 === 0);
  const col2 = filteredPhotos.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(134,239,172,0.08)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.06)] to-transparent blur-[70px]" />
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
                GALLERY
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Community Moments
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsUploadOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9A84C] text-[#080812] font-bold"
          >
            <Camera size={18} />
          </motion.button>
        </header>

        {/* Date Filter Slider */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-4 sticky top-[68px] z-20 bg-[rgba(8,8,18,0.7)] backdrop-blur-md shrink-0">
          {DATES.map(dateVal => {
            const isSelected = dateFilter === dateVal;
            const label = dateVal === "all" ? "All Photos" : new Date(dateVal).toLocaleDateString(undefined, { month: "short", day: "numeric" });
            return (
              <button
                key={dateVal}
                onClick={() => setDateFilter(dateVal)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full border text-[11px] font-semibold tracking-wide transition-all",
                  isSelected
                    ? "bg-[#C9A84C] border-[#C9A84C] text-[#080812]"
                    : "bg-white/5 border-white/5 text-fog active:bg-white/10"
                )}
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Pinterest Masonry Grid */}
        <main className="flex-grow px-4 pb-10 overflow-y-auto">
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-3">
              {col1.map((p, idx) => (
                <PhotoCard key={p.id} photo={p} isLoved={heartedIds.has(p.id)} onHeart={handleHeart} idx={idx * 2} />
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-3 pt-6">
              {col2.map((p, idx) => (
                <PhotoCard key={p.id} photo={p} isLoved={heartedIds.has(p.id)} onHeart={handleHeart} idx={idx * 2 + 1} />
              ))}
            </div>
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-fog text-sm">No photos found.</p>
            </div>
          )}
        </main>
      </div>

      {/* Upload Bottom Sheet */}
      <AnimatePresence>
        {isUploadOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#0c0c16] rounded-t-[32px] border-t border-white/10 shadow-2xl z-50 overflow-y-auto px-6 pt-5 pb-8 flex flex-col"
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-6 shrink-0" onClick={() => setIsUploadOpen(false)} />

              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    Share a Church Memory
                  </h3>
                  <p className="text-xs text-fog/60">Help build our community photo wall.</p>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-fog hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-5 flex-grow">
                {/* Simulated file picker */}
                {!selectedImage ? (
                  <div
                    onClick={() => setSelectedImage("/church-photos/church-photo-2.jpeg")} // Simulated select
                    className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center cursor-pointer hover:border-white/25 active:bg-white/[0.02] transition-all"
                  >
                    <Upload size={32} className="text-[#C9A84C] mx-auto mb-3" />
                    <span className="text-xs font-semibold text-white block">Tap to Select Photo</span>
                    <span className="text-[10px] text-fog/40 mt-1 block">Supports JPEG, PNG</span>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10">
                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Add a Caption
                  </label>
                  <input
                    type="text"
                    placeholder="Describe this beautiful moment..."
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                  />
                </div>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting || !selectedImage}
                    className="w-full py-3.5 rounded-full bg-[#C9A84C] text-[#080812] font-bold tracking-wide text-xs uppercase flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#080812] border-t-transparent animate-spin" />
                    ) : (
                      "UPLOAD TO WALL"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </div>
  );
}

function PhotoCard({
  photo,
  isLoved,
  onHeart,
  idx
}: {
  photo: MultilingualPhoto;
  isLoved: boolean;
  onHeart: (id: string, e: React.MouseEvent) => void;
  idx: number;
}) {
  // Dynamic height configuration for Pinterest staggered look
  const heights = ["h-48", "h-60", "h-40", "h-56"];
  const height = heights[idx % heights.length];

  // Dynamic Fonts
  const fonts = ["var(--font-lato)", "var(--font-nunito)", "var(--font-inter)"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: (idx % 6) * 0.05 }}
      className="rounded-[24px] overflow-hidden cursor-pointer relative group"
    >
      <div className={cn("w-full overflow-hidden relative", height)}>
        <img src={photo.image_url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Heart icon on tap or overlay */}
        <button
          onClick={(e) => onHeart(photo.id, e)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-75 transition-transform"
        >
          <Heart size={14} className={cn(isLoved ? "fill-red-500 text-red-500" : "text-white/80")} />
        </button>

        {/* Meta Info */}
        <div className="absolute bottom-3 inset-x-3 text-start">
          <p 
            className="text-xs font-medium text-white/90 leading-tight line-clamp-2"
            style={{ fontFamily: fonts[idx % fonts.length] }}
          >
            {photo.caption}
          </p>
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10">
            <span className="text-[9px] font-semibold text-white/50" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {photo.user}
            </span>
            <span className="text-[9px] font-bold text-[#C9A84C] flex items-center gap-1">
              <Heart size={10} className="fill-[#C9A84C]" /> {photo.heart_count}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
