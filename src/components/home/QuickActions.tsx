"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Play, Car, Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ACTIONS = [
  {
    id: "give",
    icon: Heart,
    labelKey: "nav_give",
    descKey: "action_give_desc",
    href: "/give",
    gradient: "from-sacred/20 to-sacred/5",
    iconColor: "text-sacred",
    border: "border-sacred/20 hover:border-sacred/50",
  },
  {
    id: "pray",
    icon: Sparkles,
    labelKey: "nav_prayer",
    descKey: "action_pray_desc",
    href: "/prayer",
    gradient: "from-violet/20 to-violet/5",
    iconColor: "text-violet-light",
    border: "border-violet/20 hover:border-violet/50",
  },
  {
    id: "ride",
    icon: Car,
    labelKey: "nav_ride",
    descKey: "action_ride_desc",
    href: "/ride",
    gradient: "from-ember/15 to-ember/5",
    iconColor: "text-ember",
    border: "border-ember/20 hover:border-ember/50",
  },
  {
    id: "watch",
    icon: Play,
    labelKey: "nav_live",
    descKey: "action_watch_desc",
    href: "/sermons",
    gradient: "from-surface-3 to-surface-2",
    iconColor: "text-fog",
    border: "border-white/10 hover:border-white/20",
  },
];

export function QuickActions() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4">
      <StaggerContainer className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTIONS.map((action) => (
          <StaggerItem key={action.id}>
            <Link href={action.href} id={`quick-action-${action.id}`}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl",
                  "border transition-all duration-300 cursor-pointer group",
                  `bg-gradient-to-br ${action.gradient}`,
                  action.border
                )}
              >
                {/* Icon circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full glass flex items-center justify-center",
                    "group-hover:scale-110 transition-transform duration-300"
                  )}
                >
                  <action.icon
                    size={22}
                    className={cn(action.iconColor, "transition-colors")}
                  />
                </div>

                <div>
                  <p className="font-label font-semibold text-ivory text-sm mb-1">
                    {t(action.labelKey)}
                  </p>
                  <p className="font-body text-fog text-xs leading-relaxed hidden sm:block">
                    {t(action.descKey)}
                  </p>
                </div>

                {/* Hover arrow */}
                <span className="absolute top-4 right-4 text-fog/40 group-hover:text-ivory/60 transition-all duration-200 group-hover:translate-x-0.5 -translate-x-1 opacity-0 group-hover:opacity-100 text-xs">
                  →
                </span>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
