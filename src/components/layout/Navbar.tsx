"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useLanguage, Language } from "@/components/providers/LanguageProvider";

interface NavLinkItem {
  key: string;
  href: string;
  hasLiveDot?: boolean;
}

const PRIMARY_LINKS: NavLinkItem[] = [
  { key: "nav_home", href: "/" },
  { key: "nav_live", href: "/live", hasLiveDot: true },
  { key: "nav_sermons", href: "/sermons" },
  { key: "nav_events", href: "/events" },
  { key: "nav_connect", href: "/connect" },
  { key: "nav_prayer", href: "/prayer" },
];

const DROPDOWN_LINKS: NavLinkItem[] = [
  { key: "nav_ride", href: "/ride" },
  { key: "nav_bible", href: "/bible" },
  { key: "nav_songs", href: "/songs" },
  { key: "title_schedule", href: "/schedule" },
  { key: "nav_download_app", href: "/app-release.apk" },
];

const MOBILE_LINKS: NavLinkItem[] = [...PRIMARY_LINKS, ...DROPDOWN_LINKS];

const LANGUAGES = [
  { id: "en", name: "EN" },
  { id: "hi", name: "हिन्दी" },
  { id: "ml", name: "മലയാളം" },
  { id: "ar", name: "العربية" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t, isRTL } = useLanguage();

  // Scroll listener for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check live stream status
  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch("/api/live-status", { next: { revalidate: 60 } });
        if (res.ok) {
          const data = await res.json();
          setIsLive(data.isLive);
        }
      } catch {
        // silent fail
      }
    };
    checkLive();
    const interval = setInterval(checkLive, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong border-b border-surface-3 shadow-[0_4px_20px_rgba(15,30,21,0.04)]"
            : "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-surface-3/30"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Top green announcement banner */}
        {!scrolled && (
          <div className="w-full bg-[#1A2E20] py-2.5 px-4 text-center text-[10px] font-label text-[#FAF8F5] tracking-[0.2em] uppercase font-bold border-b border-[#2E4233] hidden sm:block">
            {t("nav_banner_text")}
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Agape International home"
            >
              <img 
                src="/logo.png" 
                alt="Agape International Logo" 
                className="h-10 w-auto object-contain mix-blend-multiply" 
              />
              <div className="flex flex-col items-start">
                <span className="font-accent text-sm sm:text-base font-bold text-ivory tracking-[0.18em] transition-colors leading-none uppercase">
                  {t("nav_logo_title")}
                </span>
                <span className="font-display text-[8px] sm:text-[9px] text-sacred tracking-[0.12em] uppercase font-bold mt-1 leading-none">
                  {t("nav_logo_subtitle")}
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden xl:flex items-center gap-1.5">
              {PRIMARY_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  isLive={link.hasLiveDot ? isLive : false}
                >
                  {t(link.key)}
                </NavLink>
              ))}

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  className="relative px-3 py-2 font-body text-sm text-fog hover:text-ivory transition-colors duration-200 flex items-center gap-1 cursor-pointer group"
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                >
                  {t("nav_resources")}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-300",
                      resourcesOpen && "rotate-180 text-sacred"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-sacred to-sacred-light",
                      "transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                      resourcesOpen && "scale-x-100"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute top-full left-0 z-50 w-48 glass-strong rounded-2xl p-2 border border-sacred/20 shadow-2xl flex flex-col gap-1 bg-midnight/95 backdrop-blur-xl"
                      )}
                    >
                      {DROPDOWN_LINKS.map((link) => {
                        const isApk = link.href.endsWith(".apk");
                        const active = pathname === link.href;
                        const linkClass = cn(
                          "w-full text-left px-3.5 py-2 rounded-xl text-xs font-label font-medium transition-colors flex items-center justify-between",
                          active
                            ? "bg-sacred/10 text-sacred font-semibold"
                            : "text-fog hover:text-ivory hover:bg-white/5"
                        );

                        if (isApk) {
                          return (
                            <a
                              key={link.href}
                              href={link.href}
                              download
                              className={linkClass}
                            >
                              {t(link.key)}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={linkClass}
                          >
                            {t(link.key)}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA + Language Selector + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-fog hover:text-sacred hover:border-sacred/45 transition-all"
                  aria-label="Language selector"
                >
                  <Globe size={16} />
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={cn(
                        "absolute top-11 z-50 w-28 glass rounded-2xl p-1.5 border border-sacred/20 shadow-2xl flex flex-col gap-1 bg-surface-2",
                        isRTL ? "left-0" : "right-0"
                      )}
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => {
                            setLanguage(lang.id as Language);
                            setLangMenuOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 rounded-lg text-xs font-label transition-colors",
                            language === lang.id
                              ? "bg-gradient-gold text-midnight font-bold"
                              : "text-fog hover:text-ivory hover:bg-white/5"
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/give" className="hidden lg:block">
                <button
                  className="px-5 py-2.5 bg-[#1A2E20] hover:bg-[#2A4232] text-[#FAF8F5] font-label text-[10px] uppercase tracking-[0.15em] rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                  id="nav-give-btn"
                >
                  {t("nav_give")} →
                </button>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-fog hover:text-ivory transition-colors rounded-lg hover:bg-white/5"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-midnight/97 backdrop-blur-2xl flex flex-col"
          >
            {/* Close button area */}
            <div className="flex justify-between items-center px-6 h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                  <img src="/logo.png" alt="Agape International Logo" className="h-6 w-auto object-contain" />
                </div>
                <span className="font-accent text-sm font-bold text-sacred tracking-wider uppercase">
                  {t("nav_logo_title")}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-fog hover:text-ivory transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links with stagger */}
            <div className="flex flex-col justify-center flex-1 px-8 gap-2">
              {MOBILE_LINKS.map((link, i) => {
                const isApk = link.href.endsWith(".apk");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isApk ? (
                      <a
                        href={link.href}
                        download
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 py-3 font-heading text-3xl font-semibold transition-colors text-fog hover:text-ivory"
                        )}
                      >
                        {t(link.key)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 py-3 font-heading text-3xl font-semibold transition-colors",
                          pathname === link.href
                            ? "text-sacred"
                            : "text-fog hover:text-ivory"
                        )}
                      >
                        {t(link.key)}
                        {link.hasLiveDot && isLive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-live" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="px-8 pb-10 pt-4 border-t border-white/10">
              <Link href="/auth/sign-up" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  {t("nav_join_community")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop nav link with sliding gold underline
function NavLink({
  href,
  active,
  isLive,
  children,
}: {
  href: string;
  active: boolean;
  isLive: boolean;
  children: React.ReactNode;
}) {
  const isApk = href.endsWith(".apk");
  const className = cn(
    "relative px-3 py-2 font-body text-sm transition-colors duration-200 group flex items-center gap-1.5",
    active ? "text-ivory" : "text-fog hover:text-ivory"
  );

  if (isApk) {
    return (
      <a href={href} download className={className}>
        {children}
        <span
          className={cn(
            "absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-sacred to-sacred-light",
            "transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
          )}
        />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      {children}
      {isLive && (
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-live shrink-0" />
      )}
      {/* Sliding underline */}
      <span
        className={cn(
          "absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-sacred to-sacred-light",
          "transition-transform duration-300 origin-left",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}
