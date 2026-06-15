"use client";

import Link from "next/link";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Camera, PlayCircle, Users, MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const QUICK_LINKS = [
  { key: "nav_live", href: "/live" },
  { key: "nav_sermons", href: "/sermons" },
  { key: "nav_give", href: "/give" },
  { key: "nav_events", href: "/events" },
  { key: "nav_prayer", href: "/prayer" },
  { key: "nav_ride", href: "/ride" },
  { key: "nav_connect", href: "/connect" },
  { key: "nav_community", href: "/community" },
  { key: "nav_download_app", href: "/app-release.apk" },
];

const SOCIAL_LINKS = [
  { icon: Camera, href: "https://instagram.com/agapeinternational", label: "Instagram" },
  { icon: PlayCircle, href: "https://youtube.com/@agapeinternational", label: "YouTube" },
  { icon: Users, href: "https://facebook.com/agapeinternational", label: "Facebook" },
  { icon: MessageCircle, href: "https://twitter.com/agapeinternational", label: "Twitter" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-1 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                <img src="/logo.png" alt="Agape International Logo" className="h-6 w-auto object-contain" />
              </div>
              <span className="font-accent text-sm font-bold text-ivory tracking-[0.15em] uppercase">
                {t("nav_logo_title")}
              </span>
            </Link>
            <p className="font-body text-fog text-sm leading-relaxed mb-6">
              {t("footer_desc")}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-fog hover:text-sacred hover:border-sacred/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-label font-semibold text-ivory text-sm tracking-wider uppercase mb-4">
              {t("footer_quick_links")}
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => {
                const isApk = link.href.endsWith(".apk");
                const className = "font-body text-fog text-sm hover:text-sacred transition-colors duration-200";
                return (
                  <li key={link.href} className="text-start">
                    {isApk ? (
                      <a href={link.href} download className={className}>
                        {t(link.key)}
                      </a>
                    ) : (
                      <Link href={link.href} className={className}>
                        {t(link.key)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-label font-semibold text-ivory text-sm tracking-wider uppercase mb-4">
              {t("footer_service_times")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-sacred mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-ivory text-sm font-medium">{t("footer_sunday")}</p>
                  <p className="font-body text-fog text-sm">9:00 AM & 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-sacred mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-ivory text-sm font-medium">{t("footer_wednesday")}</p>
                  <p className="font-body text-fog text-sm">7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-label font-semibold text-ivory text-sm tracking-wider uppercase mb-4">
              {t("footer_find_us")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-sacred mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-fog text-sm">123 Grace Boulevard</p>
                  <p className="font-body text-fog text-sm">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-sacred shrink-0" />
                <p className="font-body text-fog text-sm">(555) 123-4567</p>
              </div>
              <div className="mt-2">
                <p className="font-body text-fog text-sm">{t("footer_led_by")}</p>
                <p className="font-body text-ivory text-sm font-medium">
                  {t("footer_pastors")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <GoldDivider className="mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-fog text-xs">
            © {new Date().getFullYear()} {t("footer_rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-body text-fog text-xs hover:text-sacred transition-colors">
              {t("footer_privacy")}
            </Link>
            <Link href="/terms" className="font-body text-fog text-xs hover:text-sacred transition-colors">
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
