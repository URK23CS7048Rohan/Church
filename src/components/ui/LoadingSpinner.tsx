"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div
      className={cn(
        "rounded-full border-surface-3 border-t-sacred animate-spin",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <span className="font-accent text-sacred/60 text-sm tracking-widest">
          AGAPE INTERNATIONAL
        </span>
      </div>
    </div>
  );
}
