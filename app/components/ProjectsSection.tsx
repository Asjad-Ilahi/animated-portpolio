import React from "react"
import clsx from "clsx"
import { ProjectsGrid } from "./ProjectsGrid"
import Link from "next/link"
import { Icon } from "./Icon"
import { SITE_SLUGS } from "@/config/siteConfig"

export const ProjectsSection: React.FC = () => {
  return (
    <section className="inside-container bg-white">
      {/* Same type scale as About/Hero; responsive heading avoids overflow on narrow phones. */}
      <div className="pointer-events-none relative z-5 mix-blend-exclusion">
        <h2
          className={clsx(
            "inline-block max-w-full font-light tracking-tighter whitespace-normal text-white subpixel-antialiased",
            "text-[clamp(1.7rem,8vw,2.2rem)] leading-[1.08] sm:text-3xl sm:leading-none md:whitespace-nowrap md:text-4xl md:leading-13 lg:text-6xl lg:leading-15",
          )}
        >
          <span className="text-white/75">Latest</span>
          <br />
          <span className="text-white">Projects</span>
        </h2>
      </div>

      <ProjectsGrid />

      <Link href={SITE_SLUGS.projects} className="group mt-2 flex items-center justify-center gap-2 px-1 sm:mt-0">
        <span className="underline-hover text-base leading-snug tracking-tight text-slate-700 sm:text-lg md:text-xl md:leading-6">
          View More Projects
        </span>
        <Icon name="arrow-right" height={18} width={18} className="group-hover:animate-wiggle-right" strokeWidth={0.5} />
      </Link>
    </section>
  )
}
