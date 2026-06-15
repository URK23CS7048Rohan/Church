import { useState, useEffect, useLayoutEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { usePathname } from 'next/navigation';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useNativePlatform() {
  const [isNative, setIsNative] = useState(false);
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const isCapacitorNative = Capacitor.isNativePlatform();
    const isQueryNative = 
      new URLSearchParams(window.location.search).get("platform") === "native" || 
      new URLSearchParams(window.location.search).get("native") === "true";
    const storedNative = localStorage.getItem("is_native_platform") === "true";
    
    const isQueryWeb = 
      new URLSearchParams(window.location.search).get("platform") === "web" || 
      new URLSearchParams(window.location.search).get("native") === "false";

    if (isQueryWeb) {
      setIsNative(false);
      localStorage.removeItem("is_native_platform");
      document.documentElement.classList.remove("native-dark-theme");
    } else {
      const active = isCapacitorNative || isQueryNative || storedNative;
      setIsNative(active);
      if (active) {
        localStorage.setItem("is_native_platform", "true");
        document.documentElement.classList.add("native-dark-theme");
      } else {
        document.documentElement.classList.remove("native-dark-theme");
      }
    }
  }, [pathname]);

  return isNative;
}


