"use client"

import { getReview } from "@/app/data/review-data"
import { LargeReview } from "./LargeReview"
import { TechSliderSection } from "./TechSliderSection"

/** Tech marquee + testimonial (heading lives only in `ServicesSectionCardSwap`). */
export function PostServicesShowcase() {
  return (
    <>
      <TechSliderSection />
      <LargeReview {...getReview("entitled")} />
    </>
  )
}
