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
    id: "dh-solutions",
    img: "/avatars/mudassir.jpg",
    name: "Mudassir",
    title: "CEO, DH Solutions",
    quote:
      "Asjad stepped into fast-moving client work and owned features end to end—from Flutter screens to Next.js dashboards—without us babysitting the details. He debugged production issues calmly, improved our release checklist, and explained trade-offs so stakeholders could decide quickly. He is the kind of engineer you trust with customer-facing delivery.",
  },
] as const satisfies readonly ReviewProps[]

// O(1) lookup
export const REVIEW_MAP: Record<string, ReviewProps> = Object.fromEntries(REVIEWS.map((r) => [r.id, r]))

export function getReview(id: string) {
  return REVIEW_MAP[id]
}
