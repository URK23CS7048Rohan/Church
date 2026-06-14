"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Radio, Heart, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/components/providers/LanguageProvider";

const MOBILE_NAV = [
  { icon: Home, key: "nav_home", href: "/" },
  { icon: Radio, key: "nav_live", href: "/live" },
  { icon: Heart, key: "nav_give", href: "/give" },
  { icon: Bookmark, key: "nav_prayer", href: "/prayer" },
  { icon: User, key: "nav_profile", href: "/profile" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-sacred/10 pb-safe"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV.map(({ icon: Icon, key, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] justify-center",
                active
                  ? "text-sacred"
                  : "text-fog hover:text-ivory"
              )}
              aria-label={t(key)}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-label font-medium tracking-wide">
                {t(key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
