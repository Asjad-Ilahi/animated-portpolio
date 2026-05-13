"use client"

import Image from "next/image"
import clsx from "clsx"
import type { ReactNode } from "react"
import { Project } from "@/app/data/projects"
import { AnimatedH2 } from "../ui/AnimatedH2"
import { AnimatedElement } from "../ui/AnimatedElement"
import { Text } from "@/app/ui/Elements"
import { Icon } from "../Icon"
import { Link } from "@/app/utils/Link"
import { SITE_SLUGS } from "@/config/siteConfig"
import { MoreProjectsSection } from "./MoreProjectsSection"
import { FaqCtaSection } from "../FaqCtaSection"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { HiOutlineGlobeAlt, HiOutlinePaintBrush, HiOutlineSparkles, HiOutlineCommandLine } from "react-icons/hi2"
import {
  SiAppstore,
  SiDart,
  SiFirebase,
  SiEthereum,
  SiFigma,
  SiFlutter,
  SiGoogleplay,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiStripe,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si"

const tagIconClass = "h-3.5 w-3.5 shrink-0 text-slate-600"

function TechTagIcon({ tag }: { tag: string }) {
  const t = tag.trim().toLowerCase()
  const icon = (() => {
    if (t.includes("next")) return <SiNextdotjs className={tagIconClass} aria-hidden />
    if (t.includes("react") && !t.includes("next")) return <SiReact className={tagIconClass} aria-hidden />
    if (t.includes("typescript") || t === "ts") return <SiTypescript className={tagIconClass} aria-hidden />
    if (t.includes("stripe")) return <SiStripe className={tagIconClass} aria-hidden />
    if (t.includes("node")) return <SiNodedotjs className={tagIconClass} aria-hidden />
    if (t.includes("blockchain") || t.includes("web3")) return <SiEthereum className={tagIconClass} aria-hidden />
    if (t.includes("laravel")) return <SiLaravel className={tagIconClass} aria-hidden />
    if (t === "php" || (t.includes("php") && !t.includes("phpstorm"))) return <SiPhp className={tagIconClass} aria-hidden />
    if (t.includes("dart") && !t.includes("darty")) return <SiDart className={tagIconClass} aria-hidden />
    if (t.includes("google play") || t.includes("play store") || t.includes("playstore"))
      return <SiGoogleplay className={tagIconClass} aria-hidden />
    if (t.includes("app store") || t === "appstore") return <SiAppstore className={tagIconClass} aria-hidden />
    if (t.includes("figma")) return <SiFigma className={tagIconClass} aria-hidden />
    if (t.includes("three")) return <SiThreedotjs className={tagIconClass} aria-hidden />
    if (t.includes("flutter")) return <SiFlutter className={tagIconClass} aria-hidden />
    if (t.includes("firebase")) return <SiFirebase className={tagIconClass} aria-hidden />
    if (t.includes("mongo")) return <SiMongodb className={tagIconClass} aria-hidden />
    if (t.includes("postgres")) return <SiPostgresql className={tagIconClass} aria-hidden />
    if (t.includes("ollama")) return <SiOllama className={tagIconClass} aria-hidden />
    if (t === "ai" || t.includes("machine learning")) return <HiOutlineSparkles className={tagIconClass} aria-hidden />
    if (t.includes("ui") || t.includes("ux") || t.includes("design")) return <HiOutlinePaintBrush className={tagIconClass} aria-hidden />
    return <HiOutlineCommandLine className={tagIconClass} aria-hidden />
  })()
  return icon
}

function ExternalHeroButton({
  href,
  label,
  icon,
  ariaLabel,
  className,
}: {
  href: string
  label: string
  icon: ReactNode
  ariaLabel: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label={ariaLabel}
      className={clsx(
        "group relative z-0 flex min-h-[3.25rem] w-full items-center gap-3 overflow-hidden rounded-full border border-white/25 bg-black px-3.5 py-3.5 text-[13px] font-semibold tracking-tight text-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_28px_-8px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:min-w-[12rem] sm:gap-3.5 sm:px-5 sm:text-sm",
        "hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_36px_-12px_rgba(0,0,0,0.55)] active:translate-y-0 active:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_10px_24px_-10px_rgba(0,0,0,0.45)] active:duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-[2px] -z-10 rounded-full border border-white/12" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0.5 -z-10 rounded-full bg-repeat opacity-[0.11] [background-image:url('/assets/framer-noise.png')] [background-size:164px]"
        aria-hidden
      />
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.12] text-white ring-1 ring-white/20 transition-[background-color,transform] duration-300 group-hover:scale-105 group-hover:bg-white/[0.18] [&_svg]:shrink-0">
        {icon}
      </span>
      <span className="relative z-10 min-w-0 flex-1 text-left leading-snug">{label}</span>
      <span
        className="relative z-10 mr-0.5 shrink-0 text-white/35 opacity-0 transition-[opacity,transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-white/90 group-hover:opacity-100"
        aria-hidden
      >
        <Icon name="arrow-right" className="h-4 w-4" />
      </span>
    </a>
  )
}

function ProjectHeroLinks({ project }: { project: Project }) {
  const { title, github, site, linkedInPost } = project
  const items: {
    key: string
    href: string
    label: string
    icon: ReactNode
    aria: string
  }[] = []

  if (github) {
    items.push({
      key: "github",
      href: github,
      label: "GitHub",
      icon: <FaGithub className="text-[1.15rem] text-white" aria-hidden />,
      aria: `View ${title} on GitHub`,
    })
  }
  if (site) {
    items.push({
      key: "site",
      href: site.startsWith("http") ? site : `https://${site}`,
      label: "Live site",
      icon: <HiOutlineGlobeAlt className="text-xl text-white" aria-hidden />,
      aria: `Visit ${title} live site`,
    })
  }
  if (linkedInPost) {
    items.push({
      key: "linkedin",
      href: linkedInPost,
      label: "LinkedIn post",
      icon: <FaLinkedinIn className="text-[1.1rem] text-white" aria-hidden />,
      aria: `${title} on LinkedIn`,
    })
  }

  if (items.length === 0) return null

  /** Horizontal stagger for the angled stack. */
  const staggerPad = (i: number, n: number) => {
    if (n <= 1) return ""
    if (n === 2) return i === 1 ? "sm:pl-10 md:pl-12 lg:pl-14" : "sm:pr-2"
    return i === 0
      ? "sm:pr-1 md:pr-0"
      : i === 1
        ? "sm:pl-9 md:pl-11 lg:pl-[3.25rem]"
        : "sm:pl-4 md:pl-6 lg:pl-8"
  }

  const cardAngle = (i: number, n: number) => {
    if (n <= 1) return ""
    if (n === 2) return i === 0 ? "md:-rotate-[3deg] md:origin-center" : "md:rotate-[2.75deg] md:origin-center"
    if (i === 0) return "md:-rotate-[3.25deg] md:origin-center"
    if (i === 1) return "md:rotate-[2.5deg] md:origin-center"
    return "md:-rotate-[2deg] md:origin-center"
  }

  return (
    <div className="flex min-w-0 w-full flex-col items-center pt-1 lg:justify-self-center">
      <div className="relative mx-auto w-full max-w-[21rem]">
        <AnimatedElement element="div" delay={0.32} className="flex flex-col gap-4 md:gap-[1.15rem]">
          {items.map((item, i) => (
            <div
              key={item.key}
              className={clsx(
                "relative transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:z-20 md:hover:scale-[1.02] md:hover:!rotate-0",
                staggerPad(i, items.length),
                cardAngle(i, items.length),
              )}
            >
              <ExternalHeroButton
                href={item.href}
                label={item.label}
                icon={item.icon}
                ariaLabel={item.aria}
                className="sm:shadow-black/40"
              />
            </div>
          ))}
        </AnimatedElement>
      </div>
    </div>
  )
}

export const UniversalProjectDisplay: React.FC<{ project: Project }> = ({ project }) => {
  const { title, tagline, year, description, tags, preview, gallery } = project
  const galleryShots = (gallery ?? []).filter((img) => img !== preview)

  return (
    <main className="min-w-0 overflow-x-clip">
      <section className="inside-container-large relative z-2">
        <div className="flex flex-col gap-10 md:gap-14">
          <AnimatedElement element="div" delay={0.05} className="-mb-2 md:-mb-4">
            <Link
              href={SITE_SLUGS.projects}
              prefetch
              data-text="Back to projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              <Icon name="arrow-right" className="h-3.5 w-3.5 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </Link>
          </AnimatedElement>

          {/* Hero: tagline (large, was year), title, tags + link buttons */}
          <div
            className={clsx(
              "grid grid-cols-1 gap-10",
              (project.github || project.site || project.linkedInPost) &&
                "lg:grid-cols-[minmax(0,1fr)_minmax(12.5rem,22rem)] lg:items-start lg:gap-12 xl:gap-16",
            )}
          >
            <div className="flex min-w-0 flex-col gap-6">
              <AnimatedH2 className="text-slate-900">
                <span className="block text-balance text-slate-500">{tagline}</span>
                <span className="mt-[0.35em] block text-balance">{title}</span>
              </AnimatedH2>

              {year ? (
                <p className="-mt-2 text-sm font-medium tracking-wide text-slate-400">{year}</p>
              ) : null}

              {tags.length > 0 && (
                <AnimatedElement element="ul" delay={0.25} className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium tracking-tight text-slate-800 shadow-[0_1px_0_rgba(0,0,0,0.03)] md:px-4 md:py-2 md:text-[13px]"
                    >
                      <TechTagIcon tag={tag} />
                      {tag}
                    </li>
                  ))}
                </AnimatedElement>
              )}
            </div>

            <ProjectHeroLinks project={project} />
          </div>

          <AnimatedElement
            element="div"
            delay={0.45}
            fadeDirection="bottom"
            offsetPx={40}
            className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 md:rounded-3xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image src={preview} alt={`${title} – preview`} fill priority className="object-cover" sizes="(min-width: 1024px) 1200px, 100vw" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(0,560px)] md:gap-14">
            <div className="flex flex-col gap-3">
              <Text size="sm" className="font-medium tracking-wider text-slate-500 uppercase">
                About the project
              </Text>
              <h3 className="text-2xl leading-tight font-normal tracking-tight text-slate-900 md:text-3xl md:leading-snug">
                {tagline}
              </h3>
            </div>
            <Text size="base" className="text-slate-700">
              {description}
            </Text>
          </div>

          {galleryShots.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {galleryShots.map((img, i) => (
                <AnimatedElement
                  key={i}
                  element="div"
                  delay={0.1 + i * 0.1}
                  fadeDirection="bottom"
                  offsetPx={32}
                  className="relative overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 md:rounded-3xl"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={img} alt={`${title} – gallery ${i + 1}`} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      <MoreProjectsSection />
      <FaqCtaSection />
    </main>
  )
}
