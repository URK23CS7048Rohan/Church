"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, Tv, FileText, Send, HelpCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { YouTubeEmbed } from "@/components/live/YouTubeEmbed";

const DEMO_VIDEO_ID = "PLuHk7Bk0R4"; // Real Youtube video ID

export function NativeLive() {
  const { t } = useLanguage();
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState(DEMO_VIDEO_ID);
  const [activeTab, setActiveTab] = useState<"stream" | "notes" | "help">("stream");

  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch("/api/live-status");
        if (res.ok) {
          const data = await res.json();
          setIsLive(data.isLive);
          if (data.videoId) {
            setVideoId(data.videoId);
          }
        }
      } catch {
        // silent
      }
    };
    checkLive();
    const interval = setInterval(checkLive, 60_000);
    return () => clearInterval(interval);
  }, []);
  
  // Sermon notes states
  const [personalNotes, setPersonalNotes] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);

  const handleAddNote = () => {
    if (!personalNotes.trim()) return;
    setNotesList(prev => [...prev, personalNotes]);
    setPersonalNotes("");
    toast.success("Note saved! Check it in your profile. 📝");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard! 🔗");
  };

  return (
    <div className="min-h-screen pb-28 relative bg-[#080812] text-[#F0EDE8] overflow-hidden">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[rgba(110,231,183,0.1)] to-transparent blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-[rgba(201,168,76,0.06)] to-transparent blur-[70px]" />
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
                LIVE STREAM
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Watch Corporate Worship
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform text-fog hover:text-white"
          >
            <Share2 size={16} />
          </button>
        </header>

        {/* Live Indicator Banner */}
        <div className="px-5 py-3 shrink-0 flex items-center justify-between bg-black/40 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", isLive ? "bg-red-500 animate-pulse" : "bg-white/20")} />
            <span className="text-[10px] font-bold tracking-wider uppercase font-space-grotesk">
              {isLive ? "LIVE NOW" : "STREAM OFFLINE"}
            </span>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className="text-[9px] uppercase tracking-wider font-bold text-[#C9A84C] bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
          >
            Toggle Mock Status
          </button>
        </div>

        {/* Main interactive tabs */}
        <div className="px-5 py-3 shrink-0">
          <div className="flex p-0.5 rounded-2xl bg-white/5 border border-white/5">
            <button
              onClick={() => setActiveTab("stream")}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeTab === "stream" ? "bg-white/10 text-white" : "text-fog"
              )}
            >
              <Tv size={13} /> Video
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeTab === "notes" ? "bg-white/10 text-white" : "text-fog"
              )}
            >
              <FileText size={13} /> Notes
            </button>
            <button
              onClick={() => setActiveTab("help")}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeTab === "help" ? "bg-white/10 text-white" : "text-fog"
              )}
            >
              <HelpCircle size={13} /> Info
            </button>
          </div>
        </div>

        {/* Tab display */}
        <main className="flex-grow pb-6 px-5 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "stream" && (
              <motion.div
                key="stream"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="space-y-5 text-start"
              >
                {/* Video Area */}
                <div className="rounded-3xl overflow-hidden aspect-video bg-black border border-white/5 relative">
                  {isLive ? (
                    <YouTubeEmbed videoId={videoId} autoplay />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <Tv size={48} className="text-white/10 animate-bounce" />
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white font-poppins">Next Live Stream</h3>
                        <p className="text-xs text-fog/60">Sunday at 9:00 AM & 11:00 AM</p>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => setIsLive(true)}
                          className="px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#080812] font-bold text-xs uppercase"
                        >
                          Simulate Live Stream
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stream Info details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-lg font-bold font-playfair text-white">Sunday Celebration Worship</h2>
                      <p className="text-xs text-fog/60 leading-snug mt-1">Join us for prayer, worship, and an impactful message from scripture.</p>
                    </div>
                  </div>
                  
                  {/* Offline helper catch up card */}
                  {!isLive && (
                    <div className="rounded-2xl p-4 bg-white/[0.01] border border-white/5 space-y-2 mt-4">
                      <h4 className="text-xs font-bold text-[#C9A84C] font-space-grotesk uppercase tracking-wider">Catch Up on Sermons</h4>
                      <p className="text-xs text-fog/75 font-body">Watch previous recordings from the Agape International pulpit.</p>
                      <Link href="/sermons" className="block text-[11px] font-bold text-[#C9A84C] hover:underline pt-1 font-space-grotesk">
                        Browse Sermons →
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5 text-start"
              >
                <div className="border-b border-white/5 pb-2">
                  <h2 className="text-lg font-bold font-playfair text-white">Sermon Notes</h2>
                  <p className="text-xs text-fog/60">Jot down insights, scripture references, or prayer pointers during the service.</p>
                </div>

                {/* Input area */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Add a personal note..."
                      value={personalNotes}
                      onChange={e => setPersonalNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-[#F0EDE8] outline-none focus:border-[#C9A84C]/50 resize-none pr-10"
                    />
                    <button
                      onClick={handleAddNote}
                      className="absolute right-3.5 bottom-3.5 w-7 h-7 rounded-xl bg-[#C9A84C] text-[#080812] flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </div>

                {/* Saved notes list */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-fog/50 font-space-grotesk">Your Saved Notes ({notesList.length})</h4>
                  {notesList.length === 0 ? (
                    <p className="text-xs text-fog/45 py-4 text-center italic">No notes saved yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {notesList.map((note, index) => (
                        <div key={index} className="p-3.5 rounded-2xl bg-[#10101c] border border-white/5 text-xs text-fog/95 font-body leading-relaxed">
                          {note}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "help" && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-start"
              >
                <div className="border-b border-white/5 pb-2">
                  <h2 className="text-lg font-bold font-playfair text-white">Stream Information</h2>
                  <p className="text-xs text-fog/60">Useful details about the Agape broadcast.</p>
                </div>

                <div className="rounded-3xl p-5 border border-white/5 bg-white/[0.01] space-y-3.5 font-inter text-xs">
                  <div>
                    <span className="font-semibold text-white">Broadcast Schedule</span>
                    <p className="text-fog/60 mt-1 leading-snug">Sundays: 9:00 AM & 11:00 AM EST<br />Wednesdays (Prayer): 7:00 PM EST</p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Need Prayer?</span>
                    <p className="text-fog/60 mt-1 leading-snug">Our prayer team is online during live sessions. Submit a request to the prayer wall directly.</p>
                    <Link href="/prayer" className="inline-block mt-2.5 text-[#C9A84C] font-semibold font-space-grotesk">
                      Submit Request →
                    </Link>
                  </div>
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
