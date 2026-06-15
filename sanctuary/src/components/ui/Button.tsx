"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-label font-semibold rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-sacred disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      primary:
        "bg-sacred text-midnight hover:bg-sacred-light active:scale-95 shadow-lg hover:shadow-[0_0_24px_rgba(201,168,76,0.4)]",
      secondary:
        "bg-surface-2 text-ivory hover:bg-surface-3 border border-white/10 active:scale-95",
      ghost:
        "text-fog hover:text-ivory hover:bg-white/5 active:scale-95",
      outline:
        "border border-sacred/40 text-sacred hover:border-sacred hover:bg-sacred/10 active:scale-95",
      danger:
        "bg-ember text-ivory hover:bg-red-600 active:scale-95",
    };

    const sizes = {
      sm: "text-xs px-3 py-2 h-8",
      md: "text-sm px-5 py-2.5 h-10",
      lg: "text-base px-7 py-3.5 h-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading…
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
