import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Space_Grotesk,
  Cinzel,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agape International — Where Your Faith Lives",
  description:
    "Agape International is a vibrant community rooted in love, worship, and belonging. Join us Sundays at 9AM & 11AM | Wednesdays at 7PM.",
  keywords: [
    "Agape International",
    "church",
    "worship",
    "community",
    "faith",
    "sermons",
    "prayer",
    "give",
  ],
  openGraph: {
    title: "Agape International — Where Your Faith Lives",
    description: "A community rooted in love, worship, and belonging.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${cinzel.variable} h-full`}
    >
      <body className="min-h-full bg-midnight text-ivory antialiased font-body">
        <LanguageProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </LanguageProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1C1C2E",
              color: "#F8F4ED",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "12px",
              fontFamily: "var(--font-label)",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#C9A84C", secondary: "#0A0A0F" },
            },
            error: {
              iconTheme: { primary: "#C44B2B", secondary: "#F8F4ED" },
            },
          }}
        />
      </body>
    </html>
  );
}
