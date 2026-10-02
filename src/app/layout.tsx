import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { ClickTracker } from "@/components/features/ClickTracker";
import { LazyToaster } from "@/components/features/LazyToaster";

const archivo = localFont({
  src: "./fonts/archivo-latin-wght-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { absolute: "Aluminium & Glass Fabrication in Sanchore | JAYSHREE" },
  description: `${site.tagline}. Doors, windows, partitions, kitchen cabinets, glass and mirrors.`,
  applicationName: site.name,
  // No favicon / icons yet: pending the original logo file (no fake version).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = site.analytics.gaId;
  return (
    <html lang="en-IN" className={`${archivo.variable} ${inter.variable}`}>
      <body className="group/page">
        <SkipLink />
        <TopBar />
        <Header />
        {/* Bottom padding keeps content clear of the mobile sticky bar */}
        <div className="pb-[calc(var(--size-sticky-bar)+env(safe-area-inset-bottom))] md:pb-0">
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <StickyContactBar />
        <ClickTracker />
        <LazyToaster />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
