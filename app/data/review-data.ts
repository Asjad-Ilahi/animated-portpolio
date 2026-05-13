import { StaticImageData } from "next/image"

export interface ReviewProps {
  quote: React.ReactNode
  name: string
  title: string
  img: StaticImageData | string
  id?: string
}

export const REVIEWS = [
  {
    id: "entitled",
    img: "/avatars/mudassir.jpg",
    name: "Mudassir",
    title: "CEO, DH Solutions",
    quote:
      "Asjad stepped into fast-moving client work and owned features end to end—from Flutter screens to Next.js dashboards—without us babysitting the details. He debugged production issues calmly, improved our release checklist, and explained trade-offs so stakeholders could decide quickly. He is the kind of engineer you trust with customer-facing delivery.",
  },
  {
    id: "herba-naturals",
    img: "/brands/herba-naturals-logo.png",
    name: "Sami Raheem",
    title: "Owner, Herba Naturals",
    quote:
      "At the time, Austin was working solo, yet he delivered an e-commerce website that exceeded all our expectations. It was fast, user-friendly, and packed with features like automated shipping labels and AI-powered product management. Finding a Seattle web design company that goes beyond the basics is rare-Austin delivered in every way.",
  },
  {
    id: "vets-choice",
    img: "/brands/vets-choice-insurance-logo.png",
    name: "Rob Dow",
    title: "Co-Founder, Vets Choice Insurance",
    quote:
      "The aftercare is unbeatable. Being an insurance company, we had to go through many rounds of revisions to comply with our legal requirements. Austin was always available to help and make sure we were happy with the final product. I highly recommend them for any web design needs.",
  },
  {
    id: "bespoke",
    img: "/client-photos/bespoke-tint-owner-kris-256.webp",
    name: "Kris Meyer",
    title: "Owner, Bespoke Tint",
    quote:
      "Austin took our vision and built a website that makes our business look as professional online as it is in person. We've already seen a huge increase in calls and bookings. Couldn't recommend Austin enough.",
  },
  {
    id: "iao",
    img: "/client-photos/aleksandr-butowicz-iron-oak-profile-photo.jpg",
    name: "Aleks Butokowitz",
    title: "CEO, Iron & Oak",
    quote:
      "Working with Austin felt like working with an in-house team. They took the time to understand our mission and goals, delivering a site that perfectly blended branding and design with seamless functionality. Their expertise as a web design agency was evident in every detail, from performance to aesthetics.",
  },

  {
    id: "automedics",
    name: "Jeff Egbert",
    title: "Owner, Automedics Kirkland",
    quote: "Austin built our website fast and it works flawlessly. He is always available to answer questions or solve problems. Great experience.",
    img: "/assets/automedics-logo-optimized.png",
  },
] as const satisfies readonly ReviewProps[]

// O(1) lookup
export const REVIEW_MAP: Record<string, ReviewProps> = Object.fromEntries(REVIEWS.map((r) => [r.id, r]))

export function getReview(id: string) {
  return REVIEW_MAP[id]
}
