"use client"

import { getReview } from "@/app/data/review-data"
import { LargeReview } from "./LargeReview"

/** Testimonial shown after the services stack (heading lives only in `ServicesSectionCardSwap`). */
export function PostServicesShowcase() {
  return <LargeReview {...getReview("dh-solutions")} />
}
