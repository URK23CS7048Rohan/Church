"use client";

import { useNativePlatform } from "@/hooks/useNativePlatform";
import { NativeShell } from "@/components/layout/NativeShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

interface NativePageWrapperProps {
  children: React.ReactNode;
  /** Optional override for the page title shown in native header */
  title?: string;
  /** Accent color for the native header gradient */
  accentColor?: string;
  /** Class added to the <main> element in web mode */
  mainClassName?: string;
}

/**
 * Drop-in replacement for the Navbar/Footer/MobileBottomNav pattern.
 * - On Capacitor (native): wraps in dark NativeShell
 * - On web: renders standard Navbar + Footer + MobileBottomNav
 *
 * Usage in any page:
 *   return (
 *     <NativePageWrapper title="Bible" accentColor="#7EB8F7">
 *       <main className="pt-32 pb-20 lg:pb-0 px-4">
 *         ...page content...
 *       </main>
 *     </NativePageWrapper>
 *   );
 */
export function NativePageWrapper({
  children,
  title,
  accentColor,
  mainClassName,
}: NativePageWrapperProps) {
  const isNative = useNativePlatform();

  if (isNative) {
    return (
      <NativeShell title={title} accentColor={accentColor}>
        {/* In native mode, content fills the screen naturally */}
        {children}
      </NativeShell>
    );
  }

  // Web fallback – standard layout unchanged
  return (
    <>
      <Navbar />
      <main className={mainClassName ?? "min-h-screen pt-32 pb-20 lg:pb-0"}>
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
