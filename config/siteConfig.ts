export const DOMAIN_URL = "https://animated-portpolio.vercel.app"

/** Cal.com booking — single URL used for hero CTA, FAQ, and anywhere else we link to Cal. */
export const CAL_BOOKING_URL = "https://cal.com/asjad-ilahi" as const

export const SITE_CONFIG = {
  title: "Asjad Ilahi — AI Engineer & Software Product Developer",
  description:
    "Asjad Ilahi is an AI Engineer (Huawei MTO) and software product developer in Islamabad. Creator of DanAi, a 55M-parameter language model trained from scratch, and builder of production web, mobile, and AI products.",
  url: DOMAIN_URL ?? "http://localhost:3000",
  siteName: "Asjad Ilahi",
  keywords: [
    "Asjad Ilahi",
    "AI Engineer",
    "Software Product Developer",
    "Huawei MTO",
    "DanAi",
    "Small Language Model",
    "PyTorch",
    "Hugging Face",
    "LLM Fine-Tuning",
    "Unsloth",
    "Next.js",
    "Flutter",
    "Islamabad",
    "COMSATS",
  ],
  ogImage: "/og.jpg",
  logo: "/logo.png",
} as const

export const SITE_NAP = {
  name: "Asjad Ilahi",
  googleBusinessType: "LocalBusiness" as const,
  contact: "Asjad Ilahi",
  contactTitle: "AI Engineer & Software Product Developer",
  email: "asjadilahi01@gmail.com",
  phone: "",
  formattedPhone: "",
  addressLink: "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
  street: "",
  city: "Islamabad",
  state: "PK",
  zipCode: "",
  openingHours: [{ days: "Mon - Sat", hours: "9am - 6pm" }] as const,
  googleReviewLink: "",
  profiles: {
    linkedIn: "https://www.linkedin.com/in/asjad-ilahi/",
    github: "https://github.com/asjad-ilahi",
    huggingFace: "https://huggingface.co/asjadilahi",
    x: "https://x.com/asjad13851",
    instagram: "https://www.instagram.com/asjad__ilahi/",
  } as const,
  logo: "/logo.png",
  favicon: "/logo.png",
  images: [`${DOMAIN_URL}/logo.png`, `${DOMAIN_URL}/og.jpg`],
} as const

export const SITE_SLUGS = {
  home: "/",
  projects: "/projects",
  contact: "/#contact",
  about: "/#about-asjad-ilahi",
  experience: "/#experience",
  projectLinks: {
    danai: "/projects/danai",
    saazghar: "/projects/saazghar",
    hamrahihub: "/projects/hamrahihub",
    petlove: "/projects/petlove",
    taabaawi: "/projects/taabaawi",
    soli: "/projects/soli",
    axora: "/projects/axora",
    wowcouple: "/projects/wowcouple",
    edubank: "/projects/edubank",
    luckycamp: "/projects/luckycamp",
  },
} as const

/** Build a `/projects/{slug}` URL for any project. */
export const projectSlugPath = (slug: string) => `/projects/${slug}` as const

/** Navbar + footer: in-page sections from `app/(site)/page.tsx` (hash routes on home). */
export const SITE_NAV_LINKS = [
  { name: "Projects", href: "/#projects-grid" },
  { name: "Experience", href: SITE_SLUGS.experience },
  { name: "Services", href: "/#services" },
  { name: "About", href: SITE_SLUGS.about },
] as const

export const SITE_FOOTER_NAV = [
  { name: "Home", href: SITE_SLUGS.home },
  ...SITE_NAV_LINKS,
  { name: "Contact", href: SITE_SLUGS.contact },
] as const

const flattenSlugs = (obj: Record<string, string | Record<string, string>>): string[] => {
  return Object.values(obj).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
}

export const ALL_PAGES: string[] = Object.values(SITE_SLUGS).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
