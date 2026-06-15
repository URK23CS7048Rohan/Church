"use client";

import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

export function useNativePlatform() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const isCapacitorNative = Capacitor.isNativePlatform();
    const isQueryNative = typeof window !== 'undefined' && 
      (new URLSearchParams(window.location.search).get("platform") === "native" || 
       new URLSearchParams(window.location.search).get("native") === "true");
    
    setIsNative(isCapacitorNative || isQueryNative);
  }, []);

  return isNative;
}
