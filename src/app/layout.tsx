import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Space_Grotesk,
  Cinzel,
  Bebas_Neue,
  Oswald,
  Anton,
  Raleway,
  Montserrat,
  Abril_Fatface,
  Dancing_Script,
  Pacifico,
  Satisfy,
  Righteous,
  Nunito,
  Poppins,
  Inter,
  Roboto_Slab,
  Lato,
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

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
      className={`
        ${cormorant.variable} ${playfair.variable} ${dmSans.variable}
        ${spaceGrotesk.variable} ${cinzel.variable} ${bebasNeue.variable}
        ${oswald.variable} ${anton.variable} ${raleway.variable}
        ${montserrat.variable} ${abrilFatface.variable} ${dancingScript.variable}
        ${pacifico.variable} ${satisfy.variable} ${righteous.variable}
        ${nunito.variable} ${poppins.variable} ${inter.variable}
        ${robotoSlab.variable} ${lato.variable}
        h-full overflow-x-hidden
      `}
    >
      <body className="min-h-full bg-midnight text-ivory antialiased font-body overflow-x-hidden">
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
