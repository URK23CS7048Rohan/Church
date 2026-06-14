"use client";

import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={cn("flex flex-col gap-3", alignClasses[align], className)}>
      {eyebrow && (
        <RevealOnScroll>
          <span className="font-accent text-xs text-sacred tracking-[0.3em] uppercase">
            {eyebrow}
          </span>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.1}>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-ivory leading-tight">
          {title}{" "}
          {titleHighlight && (
            <span className="gold-text">{titleHighlight}</span>
          )}
        </h2>
      </RevealOnScroll>
      {subtitle && (
        <RevealOnScroll delay={0.2}>
          <p className="font-body text-fog text-lg max-w-2xl">{subtitle}</p>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.3}>
        <div className="w-16 h-0.5 bg-gradient-to-r from-sacred to-sacred-light mt-1" />
      </RevealOnScroll>
    </div>
  );
}
