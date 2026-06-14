"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();

      function easeOutQuart(t: number) {
        return 1 - Math.pow(1 - t, 4);
      }

      function tick(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        setCount(Math.round(easedProgress * value * Math.pow(10, decimals)) / Math.pow(10, decimals));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setCount(value);
        }
      }

      requestAnimationFrame(tick);
    }
  }, [inView, value, duration, decimals]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : count.toLocaleString();

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
