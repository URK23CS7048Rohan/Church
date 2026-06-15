"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, MessageSquare, Quote, Heart, Send, CheckCircle2, User, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Testimony {
  id: string;
  author_name: string;
  title: string;
  content: string;
  created_at: string;
  hearts: number;
}

const MOCK_TESTIMONIES: Testimony[] = [
  { id: "1", author_name: "Sarah Jenkins", title: "Healed from Chronic Pain", content: "After years of struggling with severe back pain, the prayer team prayed over me at a Sunday service. Two days later, all pain vanished! The doctors are baffled, but I know it's a miracle.", created_at: "2026-06-01", hearts: 34 },
  { id: "2", author_name: "Daniel Miller", title: "Restored Marriage", content: "My wife and I were on the verge of divorce. We joined an Agape Small Group and the support, prayer, and biblical guidance we received helped us forgive each other. Our marriage is stronger than ever.", created_at: "2026-06-05", hearts: 48 },
  { id: "3", author_name: "Grace Mitchell", title: "Provision in Hard Times", content: "I was laid off from my job and didn't know how I'd pay rent. The church rallied around me in prayer, and within a week, I received a job offer with better pay and hours. God is indeed faithful!", created_at: "2026-06-10", hearts: 29 },
];

export function NativeTestimonies() {
  const { t } = useLanguage();
  const [testimonies, setTestimonies] = useState<Testimony[]>(MOCK_TESTIMONIES);
  const [lovedIds, setLovedIds] = useState<Set<string>>(new Set());
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Form states for bottom sheet
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (lovedIds.has(id)) {
      setLovedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setTestimonies(prev => prev.map(item => item.id === id ? { ...item, hearts: item.hearts - 1 } : item));
    } else {
      setLovedIds(prev => new Set([...prev, id]));
      setTestimonies(prev => prev.map(item => item.id === id ? { ...item, hearts: item.hearts + 1 } : item));
      toast.success("AMEN! 🙌", { duration: 1000 });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));

    const newTestimony: Testimony = {
      id: Date.now().toString(),
      author_name: name,
      title,
      content,
      created_at: new Date().toISOString().split("T")[0],
      hearts: 1
    };

    setTestimonies(prev => [newTestimony, ...prev]);
    setLovedIds(prev => new Set([...prev, newTestimony.id]));
    setIsSubmitting(false);
    setIsSubmitOpen(false);
    setName("");
    setTitle("");
    setContent("");
    toast.success("Testimony submitted! Thank you for sharing. ❤️");
  };

  const col1 = testimonies.filter((_, i) => i % 2 === 0);
  const col2 = testimonies.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(251,146,60,0.1)] to-transparent blur-[80px]" />
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
                TESTIMONIES
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Praise Report Wall
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSubmitOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9A84C] text-[#080812] font-bold"
          >
            <Send size={16} />
          </motion.button>
        </header>

        {/* Content Area */}
        <main className="flex-grow px-4 pb-10 overflow-y-auto pt-4">
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-3">
              {col1.map((tItem, idx) => (
                <TestimonyTile key={tItem.id} testimony={tItem} isLoved={lovedIds.has(tItem.id)} onLove={handleLove} idx={idx * 2} />
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-3 pt-6">
              {col2.map((tItem, idx) => (
                <TestimonyTile key={tItem.id} testimony={tItem} isLoved={lovedIds.has(tItem.id)} onLove={handleLove} idx={idx * 2 + 1} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Share Bottom Drawer */}
      <AnimatePresence>
        {isSubmitOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#0c0c16] rounded-t-[32px] border-t border-white/10 shadow-2xl z-50 overflow-y-auto px-6 pt-5 pb-8 flex flex-col"
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-6 shrink-0" onClick={() => setIsSubmitOpen(false)} />

              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    Share Your Story
                  </h3>
                  <p className="text-xs text-fog/60">Tell others how God has moved in your life.</p>
                </div>
                <button
                  onClick={() => setIsSubmitOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-fog hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Testimony Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Healed of Sickness, Provision..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-fog/50 mb-2 font-inter">
                    Your Testimony
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Share what God did in details..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-fog/30 outline-none focus:border-[#C9A84C]/50 resize-none"
                  />
                </div>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#C9A84C] text-[#080812] font-bold tracking-wide text-xs uppercase flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#080812] border-t-transparent animate-spin" />
                    ) : (
                      "SUBMIT PRAISE REPORT"
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

function TestimonyTile({
  testimony,
  isLoved,
  onLove,
  idx
}: {
  testimony: Testimony;
  isLoved: boolean;
  onLove: (id: string, e: React.MouseEvent) => void;
  idx: number;
}) {
  const cardTitleFonts = ["var(--font-playfair)", "var(--font-cormorant)", "var(--font-poppins)"];
  const cardBodyFonts = ["var(--font-inter)", "var(--font-lato)", "var(--font-nunito)"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: (idx % 6) * 0.05 }}
      className="rounded-[24px] p-5 relative overflow-hidden flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Quote className="absolute top-4 right-4 text-white/[0.03] w-12 h-12 shrink-0 pointer-events-none" />

      <div>
        <h4 
          className="text-sm font-bold text-white mb-2 leading-snug"
          style={{ fontFamily: cardTitleFonts[idx % cardTitleFonts.length] }}
        >
          {testimony.title}
        </h4>
        <p 
          className="text-xs text-fog/75 leading-relaxed line-clamp-6"
          style={{ fontFamily: cardBodyFonts[idx % cardBodyFonts.length] }}
        >
          "{testimony.content}"
        </p>
      </div>

      <div className="border-t border-white/5 pt-3 mt-1 flex items-center justify-between">
        <span className="text-[10px] font-bold text-sacred flex items-center gap-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          <User size={10} className="text-[#C9A84C]" /> {testimony.author_name}
        </span>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => onLove(testimony.id, e)}
            className="flex items-center gap-1 text-[10px] text-fog/60 hover:text-white"
          >
            <Heart size={12} className={cn("transition-all", isLoved ? "fill-red-500 text-red-500 scale-110" : "")} />
            <span>{testimony.hearts}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
