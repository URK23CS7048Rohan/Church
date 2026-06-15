"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

// Custom minimal SVG icons (no Lucide dependency)
const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

const NavBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

// Route title map
const PAGE_TITLES: Record<string, string> = {
  "/bible": "Holy Bible",
  "/songs": "Song Lyrics",
  "/ride": "Church Ride",
  "/prayer": "Prayer Wall",
  "/sermons": "Sermons",
  "/events": "Events",
  "/give": "Give",
  "/live": "Watch Live",
  "/testimonies": "Testimonies",
  "/schedule": "Schedule",
  "/connect": "Connect",
  "/community": "Community",
  "/profile": "My Profile",
  "/admin": "Admin Panel",
  "/request-meeting": "Book Meeting",
};

function getTitle(pathname: string): string {
  for (const [key, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(key)) return title;
  }
  return "Agape";
}

interface NativeShellProps {
  children: React.ReactNode;
  /** Override the auto-detected title */
  title?: string;
  /** Show back arrow to go back in history */
  showBack?: boolean;
  /** Tint the header accent; defaults to #C9A84C */
  accentColor?: string;
}

/**
 * Mobile-native layout shell for all sub-pages.
 * Replaces website Navbar + Footer with a dark, slim header + MobileBottomNav.
 */
export function NativeShell({
  children,
  title,
  showBack = true,
  accentColor = "#C9A84C",
}: NativeShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = title ?? getTitle(pathname);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#080812", color: "#F0EDE8" }}
    >
      {/* ─── Sticky header ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="sticky top-0 z-50 flex items-center px-4 py-3 gap-3"
        style={{
          background: "rgba(8,8,18,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Back button */}
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.65)",
            }}
            aria-label="Go back"
          >
            <ArrowLeft />
          </motion.button>
        )}

        {/* Page title */}
        <div className="flex-1 min-w-0">
          <h1
            className="truncate"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "20px",
              letterSpacing: "0.08em",
              background: `linear-gradient(90deg, ${accentColor}, white 60%, ${accentColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {pageTitle}
          </h1>
        </div>

        {/* Notification bell */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="w-9 h-9 flex items-center justify-center rounded-xl relative flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.55)",
          }}
          aria-label="Notifications"
        >
          <NavBell />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#FF4444" }}
          />
        </motion.button>
      </motion.header>

      {/* ─── Page content ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
          className="pb-28"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* ─── Bottom nav ─── */}
      <MobileBottomNav />
    </div>
  );
}
