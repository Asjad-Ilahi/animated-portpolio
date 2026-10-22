import { FooterV2 } from "./components/Footer/FooterV2"
import { Geist, Geist_Mono } from "next/font/google"
import "./globalsV2.css"
import { Metadata, Viewport } from "next"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/siteConfig"
import { TopBarV2 } from "./components/TopBar/TopBarV2"
import { MotionWrapper } from "./utils/lazy-ui"
import { Analytics } from "@vercel/analytics/next"
import { bodyAttributes } from "@zero-ui/attributes"
import { ViewTransitions } from "./utils/ViewTransition"
// import { BottomBlurOverlay } from "./ui/BlurBottomOverlay"
// import { LazySplashCursor } from "./utils/lazy-splash-cursor"
import { DesktopCursor } from "./utils/lazy-dot-cursor"
import { siteGraph } from "@/config/schemas"
import { Clarity } from "./components/ui/Clarity"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.siteName, url: DOMAIN_URL }],
  creator: SITE_CONFIG.siteName,
  openGraph: {
    type: "website",
    url: DOMAIN_URL,
    siteName: SITE_CONFIG.siteName,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.title }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body {...bodyAttributes} className="relative min-w-[300px] bg-white font-sans antialiased" data-mobile-menu="closed" data-scrolled="up">
        <MotionWrapper>
          <DesktopCursor />
          <ViewTransitions />

          <div className="custom:mx-auto xxs:mx-1 pointer-events-none absolute inset-0 z-1 max-w-7xl [background-image:url('/assets/framer-noise.png')] bg-size-[128px] bg-repeat opacity-6 md:mx-1.5 lg:mx-2" />
          <div>
            <div className="custom:mx-auto xxs:border-x pointer-events-none absolute inset-0 z-0 mx-0.5 max-w-7xl border-gray-200 md:mx-1 lg:mx-1.5" />
            {/* <BottomBlurOverlay /> */}
            <TopBarV2 />
            {children}

            <script
              id="id-site-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(siteGraph),
              }}
            />
            <FooterV2 />
          </div>
        </MotionWrapper>
        {process.env.NODE_ENV === "production" && (
          <>
            <Clarity />
            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}
export default RootLayout
