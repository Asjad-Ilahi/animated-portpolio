export const DOMAIN_URL = "https://www.austinserb.com"

/** Cal.com booking — single URL used for hero CTA, FAQ, and anywhere else we link to Cal. */
export const CAL_BOOKING_URL = "https://cal.com/asjad-ilahi" as const

export const SITE_CONFIG = {
  title: "Asjad Ilahi — Software Product Developer",
  description:
    "Portfolio of Asjad Ilahi, Islamabad-based software product developer. End-to-end web and mobile with Next.js, Flutter, MERN, and Laravel—plus UI/UX in Figma.",
  url: DOMAIN_URL ?? "http://localhost:3000",
  siteName: "Asjad Ilahi",
  keywords: [
    "Asjad Ilahi",
    "Software Product Developer",
    "Next.js",
    "Flutter",
    "MERN",
    "Laravel",
    "Islamabad",
    "COMSATS",
    "DH Solutions",
  ],
  ogImage: "/assets/bg-home-poster-optimized.webp",
  logo: "/logo.png",
} as const

export const SITE_NAP = {
  name: "Asjad Ilahi",
  googleBusinessType: "LocalBusiness" as const,
  contact: "Asjad Ilahi",
  contactTitle: "Software Product Developer",
  email: "asjadilahi01@gmail.com",
  phone: "",
  formattedPhone: "",
  addressLink: "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
  street: "COMSATS University Islamabad",
  city: "Islamabad",
  state: "PK",
  zipCode: "",
  openingHours: [{ days: "Mon - Sat", hours: "9am - 6pm" }] as const,
  googleReviewLink: "",
  profiles: {
    linkedIn: "https://www.linkedin.com/in/asjad-ilahi/",
    github: "https://github.com/asjad-ilahi",
    x: "https://x.com/asjad13851",
    instagram: "https://www.instagram.com/asjad__ilahi/",
  } as const,
  logo: "/logo.png",
  favicon: "/logo.png",
  images: [`${DOMAIN_URL}/logo.png`, `${DOMAIN_URL}/assets/bg-home-poster-optimized.webp`],
} as const

export const SITE_SLUGS = {
  home: "/",
  projects: "/projects",
  contact: "/#contact",
  about: "/#about-asjad-ilahi",
  projectLinks: {
    saazghar: "/projects/saazghar",
    axora: "/projects/axora",
    petlove: "/projects/petlove",
    wowcouple: "/projects/wowcouple",
    soli: "/projects/soli",
    edubank: "/projects/edubank",
    hamrahihub: "/projects/hamrahihub",
    luckycamp: "/projects/luckycamp",
  },
} as const

/** Build a `/projects/{slug}` URL for any project. */
export const projectSlugPath = (slug: string) => `/projects/${slug}` as const

/** Navbar + footer: in-page sections from `app/(site)/page.tsx` (hash routes on home). */
export const SITE_NAV_LINKS = [
  { name: "Projects", href: "/#projects-grid" },
  { name: "Services", href: "/#services" },
  { name: "About", href: SITE_SLUGS.about },
] as const

export const SITE_FOOTER_NAV = [
  { name: "Home", href: SITE_SLUGS.home },
  ...SITE_NAV_LINKS,
  { name: "Contact", href: SITE_SLUGS.contact },
] as const

export const externalLinks = {
  vetsChoice: "https://vetschoiceinsurance.com/",
  zeroIconSprite: "https://github.com/react-zero-ui/icon-sprite",
  zeroCore: "https://github.com/react-zero-ui/core",
  entitled: "https://be-entitled.com/",
} as const

const flattenSlugs = (obj: Record<string, string | Record<string, string>>): string[] => {
  return Object.values(obj).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
}

export const ALL_PAGES: string[] = Object.values(SITE_SLUGS).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
