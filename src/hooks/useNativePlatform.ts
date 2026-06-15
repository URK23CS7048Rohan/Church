"use client";

import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

export function useNativePlatform() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  return isNative;
}
