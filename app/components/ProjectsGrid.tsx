"use client"
import { AnimatedCard, HeroOffset } from "./ProjectCard/AnimatedCard"
import clsx from "clsx"
import { useOffset } from "../hooks/useOffset"
import { useIsMobile } from "../hooks/useMediaQuery"
import { useRef, useEffect } from "react"
import { useScroll, useSpring } from "motion/react"
import { useUI } from "@react-zero-ui/core"
import { FEATURED_PROJECTS } from "@/app/data/projects"

const ids = FEATURED_PROJECTS.map((p) => p.slug)

export function ProjectsGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawOffsets = useOffset(ids)
  const isMobile = useIsMobile()
  const isSmallScreen = useIsMobile(576)
  /** Very small phones: tighter deck, tucked toward the hero side. */
  const isCompactPhone = useIsMobile(400)
  const responsiveScale = isCompactPhone ? 0.24 : isMobile ? 0.3 : 0.68
  const [, setReveal] = useUI<"true" | "false">("reveal", "false")

  const { scrollYProgress } = useScroll({
    offset: isMobile ? ["start start", "8% start"] : ["start start", "15% start"],
  })
  const stiffness = isMobile ? 140 : 220
  const damping = isMobile ? 52 : 90

  const progress = useSpring(scrollYProgress, { stiffness, damping })

  const mx = isCompactPhone
  const md = isMobile && !isCompactPhone

  /**
   * Per-card stack-to-grid tuning, keyed by grid position (top-left, top-right, bottom-left,
   * bottom-right) so swapping featured projects keeps the bento / hero-stack animation identical.
   */
  const OFFSET_TUNING: Partial<HeroOffset>[] = [
    {
      rot: 9,
      s: responsiveScale,
      dx: mx ? -95 : md ? -175 : 20,
      dy: mx ? -88 : md ? -112 : -40,
    },
    {
      rot: 12,
      s: responsiveScale,
      dx: mx ? -105 : md ? -185 : 0,
      dy: mx ? -82 : md ? -102 : -10,
    },
    {
      rot: 5,
      s: responsiveScale,
      dx: mx ? -100 : md ? -180 : 5,
      dy: mx ? -95 : md ? -118 : -25,
    },
    {
      rot: -5,
      s: responsiveScale,
      dx: mx ? -108 : md ? -188 : -10,
      dy: mx ? -98 : md ? -120 : -40,
    },
  ]

  /** Per-position hover peek classes (carried over from the original four-card layout). */
  const HERO_PEEK: string[] = [
    "reveal-false:group-hover/hero-stack:-translate-y-3 reveal-false:group-hover/hero-stack:-translate-x-6 reveal-false:group-hover/hero-stack:-rotate-4",
    "reveal-false:group-hover/hero-stack:-translate-y-4 reveal-false:group-hover/hero-stack:translate-x-6 reveal-false:group-hover/hero-stack:rotate-5",
    "reveal-false:group-hover/hero-stack:translate-y-4 reveal-false:group-hover/hero-stack:-translate-x-7 reveal-false:group-hover/hero-stack:-rotate-6",
    "reveal-false:group-hover/hero-stack:translate-y-5 reveal-false:group-hover/hero-stack:translate-x-7 reveal-false:group-hover/hero-stack:rotate-6",
  ]

  const offsets = Object.fromEntries(
    ids.map((id, index) => {
      const base = rawOffsets[id]
      const t = OFFSET_TUNING[index]
      return [
        id,
        {
          x: (base?.x ?? 0) + (t?.dx ?? 0),
          y: (base?.y ?? 0) + (t?.dy ?? 0),
          rot: t?.rot ?? 0,
          s: t?.s ?? 1,
        },
      ]
    })
  )

  const triggerProgress = isMobile ? (isSmallScreen ? 0.12 : 0.16) : 0.5
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (latest >= triggerProgress) {
        setReveal("true") // Reveal ON
      } else {
        setReveal("false") // Reveal OFF
      }
    })

    return unsubscribe
  }, [progress, setReveal, triggerProgress])

  return (
    <section id="projects-grid" className={clsx("group/hero-stack relative scroll-mt-36", className)} ref={ref}>
      <div className="relative z-4 mx-auto grid w-full grid-cols-1 grid-rows-1 gap-3 sm:gap-4 max-md:min-h-[min(80dvh,38rem)] md:min-h-0 md:grid-cols-2 md:grid-rows-2">
        {FEATURED_PROJECTS.map((project, index) => (
          <AnimatedCard
            key={project.slug}
            src={project.preview}
            alt={`${project.title} Preview`}
            offset={offsets[project.slug]}
            gridId={project.slug}
            color={project.cardColor}
            type={project.cardType}
            progress={progress}
            dataText="View Project"
            heroPeekClass={HERO_PEEK[index] ?? ""}
          />
        ))}
      </div>
    </section>
  )
}
