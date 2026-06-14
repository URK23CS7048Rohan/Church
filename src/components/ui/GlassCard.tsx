"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  padding = "md",
}: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "glass rounded-2xl",
        paddingClasses[padding],
        hover &&
          "transition-all duration-300 hover:border-sacred/30 hover:bg-slate/80 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        glow && "hover:shadow-[0_0_32px_rgba(201,168,76,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
