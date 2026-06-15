"use client";

import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  label?: string;
}

export function GoldDivider({ className, label }: GoldDividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sacred/40 to-transparent" />
        <span className="font-accent text-xs text-sacred/70 tracking-widest uppercase">
          {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sacred/40 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-sacred/30 to-transparent",
        className
      )}
    />
  );
}
