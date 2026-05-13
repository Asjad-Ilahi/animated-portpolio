import type { StaticImageData } from "next/image"
import saazgharImg from "@/public/projects/saazghar.jpg"
import saazghar2Img from "@/public/projects/saazghar2.jpg"
import axoraImg from "@/public/projects/axora.jpg"
import axora2Img from "@/public/projects/axora2.jpg"
import petloveImg from "@/public/projects/PetLove.jpg"
import petlove2Img from "@/public/projects/petlove2.jpg"
import wowcoupleImg from "@/public/projects/wowcouple.webp"
import wowcouple2Img from "@/public/projects/wowcouple2.webp"
import soliImg from "@/public/projects/soli.jpg"
import soli2Img from "@/public/projects/soli2.jpg"
import edubankImg from "@/public/projects/edubank.jpg"
import edubank2Img from "@/public/projects/edubank2.jpg"
import hamrahihubImg from "@/public/projects/hamrahihub.jpg"
import luckycampImg from "@/public/projects/luckycamp.webp"
import luckycamp2Img from "@/public/projects/luckycamp2.webp"

export type Project = {
  slug: string
  title: string
  /** Short one-liner shown under the title. */
  tagline: string
  /** Pill label rendered on the card overlay. */
  cardType: string
  /** Gradient color used by the Card overlay. */
  cardColor: string
  /** Year shown above the project title on the detail page. */
  year?: string
  /** Preview image used by the home grid and the all-projects grid. */
  preview: StaticImageData
  /** Additional gallery shots rendered on the detail page. */
  gallery: StaticImageData[]
  /** Long-form description rendered on the detail page. */
  description: string
  /** Tech / scope tags rendered on the detail page. */
  tags: string[]
  github?: string
  site?: string
  /** Optional LinkedIn post or announcement URL. */
  linkedInPost?: string
  /** Featured projects appear in the home page `ProjectsGrid`. */
  featured: boolean
}

/**
 * All projects. Used everywhere as the single source of truth.
 *
 * Order is the source order for the `/projects` page (soli first, then saazghar, then the rest).
 * Featured home grid order is `FEATURED_PROJECTS` (not array order in `PROJECTS`).
 */
export const PROJECTS: Project[] = [
  {
    slug: "soli",
    title: "Soli",
    tagline: "Finance app",
    cardType: "Finance app",
    cardColor: "#0ea5e9",
    year: "2025",
    preview: soliImg,
    /** Detail page gallery below hero — second artboard. */
    gallery: [soli2Img],
    description:
      "Soli is a finance-focused product for invoicing, lightweight KYC checks, and day-to-day money workflows—think clear balances, audit-friendly records, and flows that keep operators and customers aligned. The experience is being refined in real-device testing on iOS while the web surface ships on Next.js and Node.js, with a Flutter build for mobile and Figma-led UI polish across breakpoints.",
    tags: ["Flutter", "Dart", "Next.js", "Node.js", "UI/UX", "Figma", "App Store"],
    site: "https://soli-landing.vercel.app",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_uidesign-uxdesign-figma-ugcPost-7367268235005607937-snaD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "saazghar",
    title: "Saazghar",
    tagline: "2D-3D house visualizer.",
    cardType: "2D-3D House Visualizer",
    cardColor: "#0f766e",
    year: "2025",
    preview: saazgharImg,
    gallery: [saazgharImg, saazghar2Img],
    description:
      "Web and desktop based 2D-to-3D blueprint generator with real-time material estimation, prompt-to-3D, template and vendor marketplace. Built end-to-end with a Next.js front-end, a Node.js services layer, Three.js for the 3D viewport, and an Ollama-powered AI pipeline that turns user prompts and floor plans into editable 3D scenes.",
    tags: ["Figma", "Three.js", "Next.js", "Node.js", "AI", "Ollama"],
    github: "https://github.com/Wahab-x78/saazghar-frontend",
    site: "https://saazghar-frontend.vercel.app",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_fyp-finalyearproject-softwareengineering-ugcPost-7460015978832089088-S9x6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "axora",
    title: "Axora",
    tagline: "Modern product experience.",
    cardType: "Web Application",
    cardColor: "#1d4ed8",
    year: "2025",
    preview: axoraImg,
    gallery: [axoraImg, axora2Img],
    description: "A focused product build with a clean UI, fast performance, and a UX tuned for conversion. Full case study coming soon.",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    featured: false,
  },
  {
    slug: "petlove",
    title: "PetLove",
    tagline: "Pet care, simplified.",
    cardType: "Pet Care App",
    cardColor: "#db2777",
    year: "2024",
    preview: petloveImg,
    gallery: [petloveImg, petlove2Img],
    description:
      "PetLove is a single-vendor marketplace for pet food and accessories—catalog browsing with categories and filters, secure checkout, coupons, multilingual copy, delivery tracking, order history, and in-app chat for support. Built with Flutter and Dart across web and desktop (with mobile store rollouts underway), Firebase for realtime data and product infrastructure, and Laravel with PHP powering commerce APIs, payments, and operational tooling behind the scenes.",
    tags: ["Flutter", "Dart", "Laravel", "PHP", "Firebase", "UI/UX", "Figma", "Google Play"],
    site: "https://petlovekw.com",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_flutter-applaunch-petlove-ugcPost-7289981228722597891-X8t3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "wowcouple",
    title: "WowCouple",
    tagline: "Matrimony app",
    cardType: "Matrimony app",
    cardColor: "#9333ea",
    year: "2024",
    preview: wowcoupleImg,
    gallery: [wowcoupleImg, wowcouple2Img],
    description:
      "A consumer platform built around couples and wedding planning — curated vendors, planning tools, and a calm visual system. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "UI/UX"],
    featured: false,
  },
  {
    slug: "edubank",
    title: "EduBank",
    tagline: "Knowledge bank for learners.",
    cardType: "Education Platform",
    cardColor: "#f59e0b",
    year: "2024",
    preview: edubankImg,
    gallery: [edubankImg, edubank2Img],
    description: "A learning-focused product with structured content, search, and a friendly study experience. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    slug: "hamrahihub",
    title: "Hamrahi Hub",
    tagline: "Blockchain-based community website",
    cardType: "Civic & Web3",
    cardColor: "#0d9488",
    year: "2026",
    preview: hamrahihubImg,
    gallery: [hamrahihubImg],
    description:
      "A community welfare platform where members can surface local issues, create a dedicated wallet for each issue, receive transparent on-chain donations, and coordinate execution until the problem is resolved.",
    tags: ["Figma", "UI/UX", "Blockchain", "Next.js", "Node.js"],
    github: "https://github.com/Asjad-Ilahi/humrahiHub",
    site: "https://humrahi-hub-ul1q.vercel.app/",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_%F0%9D%90%96%F0%9D%90%9E-%F0%9D%90%96%F0%9D%90%A8%F0%9D%90%A7-1%F0%9D%90%AC%F0%9D%90%AD-%F0%9D%90%8F%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%9C%F0%9D%90%9E-%F0%9D%90%9A%F0%9D%90%AD-%F0%9D%90%AD%F0%9D%90%A1-ugcPost-7453397475022819328-yZDh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "luckycamp",
    title: "LuckyCamp",
    tagline: "Outdoor and camping experiences.",
    cardType: "Travel / Outdoor",
    cardColor: "#16a34a",
    year: "2023",
    preview: luckycampImg,
    gallery: [luckycampImg, luckycamp2Img],
    description: "Discovery and booking flows for camps and outdoor experiences with a clean, photo-led UI. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "UI/UX"],
    featured: false,
  },
]

/** Featured projects on the home `ProjectsGrid` — explicit order: 1 Saazghar, 2 Hamrahi Hub, 3 PetLove, 4 Soli. */
export const FEATURED_PROJECTS: Project[] = (["saazghar", "hamrahihub", "petlove", "soli"] as const)
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is Project => p != null)

/** Lookup by slug. */
export const getProjectBySlug = (slug: string): Project | undefined => PROJECTS.find((p) => p.slug === slug)
