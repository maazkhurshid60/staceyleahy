import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { VideoProvider } from "@/components/VideoPlayer";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://staceyleahyhomes.com"),
  title: {
    default: "Stacey Leahy Homes | Real Estate With a Point of View",
    template: "%s | Stacey Leahy Homes",
  },
  description:
    "Stacey Leahy, Compass real estate agent in Studio City. Local insight, strategic guidance and real conversations across Los Angeles, Burbank, Toluca Lake and Studio City.",
  openGraph: {
    title: "Stacey Leahy Homes | Real Estate With a Point of View",
    description: "Local insight. Strategic guidance. Real conversations.",
    images: ["/images/home/hero-palms.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2219",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Enable scroll reveals before first paint, unless the visitor prefers reduced motion */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="grain min-h-dvh bg-ivory font-sans text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-forest-950">
          Skip to content
        </a>
        <VideoProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </VideoProvider>
      </body>
    </html>
  );
}
