import clsx from "clsx"
import type { ComponentType } from "react"
import { SiHuawei } from "react-icons/si"
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCodeBracket, HiOutlineTrophy } from "react-icons/hi2"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { AnimatedElement } from "./ui/AnimatedElement"
import { Text } from "../ui/Elements"

type Role = {
  title: string
  period: string
}

type Experience = {
  company: string
  location: string
  Logo: ComponentType<{ className?: string }>
  logoClass: string
  /** One or more roles at the same company, newest first. */
  roles: Role[]
  current?: boolean
  points: string[]
  tags: string[]
}

const experience: Experience[] = [
  {
    company: "Huawei Technologies",
    location: "Islamabad",
    Logo: SiHuawei,
    logoClass: "bg-[#cf0a2c] text-white",
    roles: [{ title: "AI Engineer Intern · Management Trainee Officer (MTO)", period: "Jul 2026 – Present" }],
    current: true,
    points: [
      "Building practical AI/ML engineering depth across model development, experimentation, evaluation, inference, and AI solution design in Huawei’s MTO program.",
      "Built DanAi, a 54.5M-parameter small language model trained from scratch, covering architecture, tokenization, training, optimization, inference, evaluation, and Hugging Face release.",
      "Implemented neural networks, backpropagation, MLPs, computational graphs, and Transformer components from scratch in Python and PyTorch.",
    ],
    tags: ["Python", "PyTorch", "Transformers", "Hugging Face", "Model Evaluation"],
  },
  {
    company: "DH Solutions",
    location: "Islamabad",
    Logo: HiOutlineCodeBracket,
    logoClass: "bg-slate-900 text-white",
    roles: [
      { title: "Associate Software Engineer", period: "Jan 2025 – Nov 2025" },
      { title: "Software Development Intern · AI / Backend", period: "Sep 2024 – Dec 2024" },
    ],
    points: [
      "Contributed to production web and mobile projects using Python, backend services, APIs, and application architecture.",
      "Implemented backend logic, reusable components, system integrations, debugging, testing, and deployment workflows in an agile team.",
      "Worked across frontend and backend layers to own data flow, service integration, and production delivery.",
    ],
    tags: ["Python", "REST APIs", "Next.js", "Flutter", "Laravel", "Firebase"],
  },
  {
    company: "Freelance",
    location: "Remote",
    Logo: HiOutlineBriefcase,
    logoClass: "bg-slate-100 text-slate-700 ring-1 ring-gray-200",
    roles: [{ title: "Freelance Software Developer", period: "Feb 2023 – Dec 2024" }],
    points: [
      "Designed and shipped web and mobile products for clients end to end, from Figma systems through production APIs and deployment.",
    ],
    tags: ["Next.js", "Flutter", "MERN", "Figma"],
  },
]

const education = [
  {
    school: "COMSATS University Islamabad",
    degree: "BS Software Engineering",
    detail: "CGPA 3.5 / 4.0",
    period: "2022 – 2026",
  },
  {
    school: "The Orbit Group of School and College",
    degree: "FSc Pre-Engineering",
    detail: "Tandkoi, Swabi",
    period: "2020 – 2022",
  },
]

const recognition = [
  { title: "1st place, AI Pakistan AWKUM AGORA 2026", detail: "Hackathon win for HumRahi Hub, a Web3 civic collaboration platform." },
  { title: "1,500+ Hugging Face downloads", detail: "For DanAi-55M-Reasoning, open-sourced under Apache 2.0." },
]

const cardClass = "rounded-2xl border border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"

export function ExperienceSection({ className = "" }: { className?: string }) {
  return (
    <section id="experience" className={clsx("scroll-mt-20 border-t border-gray-200 bg-white", className)}>
      <div className="inside-container relative z-2">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-20">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 md:gap-6">
            <AnimatedH2 className="text-slate-900 !text-[clamp(1.7rem,6.5vw,2.2rem)] !leading-tight sm:!text-4xl sm:!leading-none md:!text-5xl md:!leading-13 lg:!text-6xl lg:!leading-15">
              <span className="text-slate-500">Experience</span>
              <span className="mt-[0.35em] block text-slate-900">Where I&apos;ve worked</span>
            </AnimatedH2>
            <Text size="base" className="max-w-md text-pretty text-slate-600">
              From shipping client products to training language models: the teams and work that shaped how I build.
            </Text>
          </div>

          <ol className="relative flex min-w-0 flex-col gap-4">
            {/* Timeline rail, visible in the gaps between cards and aligned with the logo badges. */}
            <span aria-hidden className="absolute top-8 bottom-8 left-[2.625rem] w-px bg-gray-200 md:left-12" />
            {experience.map((item, index) => (
              <AnimatedElement
                key={item.company}
                element="li"
                delay={0.05 + index * 0.08}
                fadeDirection="bottom"
                offsetPx={24}
                className={clsx(cardClass, "relative p-5 md:p-6")}
              >
                <div className="flex items-start gap-4">
                  <span className={clsx("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12", item.logoClass)}>
                    <item.Logo className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">{item.company}</h3>
                      <span className="text-sm text-slate-400">{item.location}</span>
                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                          Current
                        </span>
                      )}
                    </div>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {item.roles.map((role) => (
                        <li key={role.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <span className="text-sm font-medium text-slate-700 md:text-[15px]">{role.title}</span>
                          <span className="shrink-0 font-mono text-xs text-slate-400 tabular-nums">{role.period}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ul className="mt-4 flex flex-col gap-2 pl-0 text-sm leading-relaxed text-slate-600 md:mt-5 md:pl-16 md:text-[15px]">
                  {item.points.map((point) => (
                    <li key={point} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-slate-400">
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5 md:pl-16">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 md:text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              </AnimatedElement>
            ))}
          </ol>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatedElement element="div" delay={0.05} fadeDirection="bottom" offsetPx={24} className={clsx(cardClass, "p-5 md:p-6")}>
            <div className="mb-4 flex items-center gap-2.5 text-sm font-medium tracking-wider text-slate-500 uppercase">
              <HiOutlineAcademicCap className="h-4.5 w-4.5" aria-hidden />
              Education
            </div>
            <ul className="flex flex-col divide-y divide-gray-100">
              {education.map((item) => (
                <li key={item.school} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold tracking-tight text-slate-900">{item.degree}</p>
                    <p className="text-sm text-slate-500">
                      {item.school} · {item.detail}
                    </p>
                  </div>
                  <span className="shrink-0 pt-0.5 font-mono text-xs text-slate-400 tabular-nums">{item.period}</span>
                </li>
              ))}
            </ul>
          </AnimatedElement>

          <AnimatedElement element="div" delay={0.15} fadeDirection="bottom" offsetPx={24} className={clsx(cardClass, "p-5 md:p-6")}>
            <div className="mb-4 flex items-center gap-2.5 text-sm font-medium tracking-wider text-slate-500 uppercase">
              <HiOutlineTrophy className="h-4.5 w-4.5" aria-hidden />
              Recognition
            </div>
            <ul className="flex flex-col divide-y divide-gray-100">
              {recognition.map((item) => (
                <li key={item.title} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-[15px] font-semibold tracking-tight text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.detail}</p>
                </li>
              ))}
            </ul>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
