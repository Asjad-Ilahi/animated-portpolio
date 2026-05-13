"use client"

import Image from "next/image"
import clsx from "clsx"
import { Text, Typography } from "../ui/Elements"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { MotionButton, MotionDiv } from "../utils/lazy-ui"
import Link from "next/link"
import { SITE_NAP } from "@/config/siteConfig"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { HiChevronDown, HiChevronUp } from "react-icons/hi2"
import { useState } from "react"
import { AnimatePresence } from "motion/react"

const workHistory = [
  { company: "DH Solutions", role: "Associate Software Engineer", years: "Jan 2025 – Nov 2025" },
  { company: "DH Solutions", role: "Software Development Intern", years: "Sept 2024 – Dec 2024" },
  { company: "Freelancing", role: "Freelance Software Developer", years: "Feb 2023 – Dec 2024" },
]

export const AboutSectionV2 = ({ className = "" }: { className?: string }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="about-asjad-ilahi" className={clsx("scroll-mt-28 border-y border-gray-200 bg-white md:scroll-mt-32", className)}>
      <div className="inside-container relative z-2">
        <AnimatedH2 className="text-slate-900 !text-[clamp(1.7rem,6.5vw,2.2rem)] !leading-tight sm:!text-4xl sm:!leading-none md:!text-5xl md:!leading-13 lg:!text-6xl lg:!leading-15">
          <span className="text-slate-500">About</span>
          <br />
          Asjad Ilahi
        </AnimatedH2>
        <div className="flex flex-col-reverse gap-8 sm:gap-10 md:flex-row md:items-start md:gap-8 lg:gap-10">
          <div className="flex w-full min-w-0 flex-1 flex-col gap-6 sm:gap-8">
            <div className="relative w-full max-w-[min(100%,560px)] overflow-hidden rounded-2xl md:max-w-[min(100%,600px)]">
              <div className="relative aspect-[5/5.4] w-full">
                <Image src="/logo.png" alt="Asjad Ilahi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" priority />
              </div>
              <MotionDiv
                initial={{ x: 42, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute right-3 bottom-3 z-5 flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/28 px-1.5 backdrop-blur-md"
              >
                <Link
                  href={SITE_NAP.profiles.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/28"
                >
                  <FaLinkedinIn className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={SITE_NAP.profiles.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/55"
                >
                  <FaInstagram className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={SITE_NAP.profiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/55"
                >
                  <FaGithub className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={SITE_NAP.profiles.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/55"
                >
                  <FaXTwitter className="h-3.5 w-3.5" />
                </Link>
              </MotionDiv>
            </div>

            <MotionDiv
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <Text as="h2" size="lg" className="text-lg font-medium sm:text-xl md:text-[1.35rem]">
                Asjad Ilahi
              </Text>
              <p className="text-xs leading-snug text-gray-500 sm:text-sm sm:leading-normal">
                Software Product Developer (Next.js, Flutter &amp; MERN)
              </p>
            </MotionDiv>
          </div>
          <Typography
            as="article"
            size="base"
            className="min-w-0 flex-1 space-y-5 text-pretty pr-0 text-[15px] leading-relaxed text-slate-500 sm:space-y-6 sm:text-base sm:leading-relaxed md:max-w-[min(100%,40rem)] md:space-y-8 md:text-lg md:leading-relaxed lg:space-y-10 lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed md:pr-2 lg:pr-4"
          >
            <p>
              <strong className="font-semibold text-slate-900">I design and ship end-to-end product surfaces</strong>—from Figma systems through production
              APIs and deployment. I have delivered 10+ production-grade projects and 12+ personal builds spanning 8+ web apps and 6+ mobile apps, mastering
              Flutter, Next.js, and the MERN stack on real client work, including architecture, integration, and release.
            </p>

            <p>
              <strong className="font-semibold text-slate-900">I ship v1s quickly and iterate with the team</strong>. I am used to agile ceremonies, code
              review, and pairing with stakeholders to turn ambiguous requirements into working software. Whether it is Laravel and Firebase services, Supabase
              auth, or delivery APIs for marketplaces, I focus on predictable delivery, clear handoffs, and documentation so the next engineer can move fast.
            </p>

            <Image
              src="/signature.png"
              alt="Asjad Ilahi signature"
              width={240}
              height={120}
              className="relative mt-0 -ml-2 h-12 w-auto sm:-ml-3 sm:h-14 md:h-20"
            />
          </Typography>
        </div>

        <div className="mt-0 w-full md:mt-0">
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mx-auto w-full max-w-[min(100%,560px)] md:max-w-[min(100%,600px)]"
          >
            <h3 className="mb-2 text-center text-base font-semibold tracking-tight text-slate-900 sm:text-lg md:text-xl">
              My work history
            </h3>

            <AnimatePresence mode="wait" initial={false}>
              {!showAll ? (
                <MotionButton
                  key="history-stacked"
                  type="button"
                  onClick={() => setShowAll(true)}
                  aria-expanded={false}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative isolate block w-full max-w-full pb-4 text-left sm:pb-6"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-4 bottom-0 z-0 rounded-full border border-gray-200/60 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:top-5"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 top-2 bottom-3 z-10 rounded-full border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:top-3"
                  />
                  <span className="relative z-20 block w-full rounded-full border border-gray-200 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:px-6 sm:py-5">
                    <span className="flex flex-col gap-2.5 sm:gap-3">
                      <span className="text-sm font-semibold leading-tight tracking-tight text-slate-900 sm:text-base sm:leading-none">
                        {workHistory[0].company}
                      </span>
                      <span className="flex items-center justify-between gap-2 text-[11px] font-medium leading-snug text-slate-500 sm:gap-3 sm:text-xs sm:leading-none">
                        <span>{workHistory[0].role}</span>
                        <span className="shrink-0 tabular-nums text-slate-500">{workHistory[0].years}</span>
                      </span>
                    </span>
                  </span>
                </MotionButton>
              ) : (
                <MotionDiv
                  key="history-open"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                  }}
                  className="flex flex-col gap-4"
                >
                  {workHistory.map((item, index) => (
                    <MotionButton
                      key={`${item.company}-${item.role}-${item.years}`}
                      type="button"
                      onClick={() => setShowAll(false)}
                      variants={{
                        closed: {
                          opacity: 0,
                          y: -22 - index * 14,
                          scale: 0.94 - index * 0.025,
                          filter: "blur(6px)",
                          transition: { type: "spring", stiffness: 320, damping: 30, mass: 0.7 },
                        },
                        open: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.85 },
                        },
                      }}
                      whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 24 } }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full rounded-full border border-gray-200 bg-white px-4 py-4 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:px-6 sm:py-5"
                    >
                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        <p className="text-sm font-semibold leading-tight tracking-tight text-slate-900 sm:text-base sm:leading-none">
                          {item.company}
                        </p>
                        <div className="flex items-center justify-between gap-2 text-[11px] font-medium leading-snug text-slate-500 sm:gap-3 sm:text-xs sm:leading-none">
                          <span>{item.role}</span>
                          <span className="shrink-0 tabular-nums text-slate-500">{item.years}</span>
                        </div>
                      </div>
                    </MotionButton>
                  ))}
                </MotionDiv>
              )}
            </AnimatePresence>

            <MotionDiv layout className="mt-5 flex justify-center" transition={{ type: "spring", stiffness: 380, damping: 32 }}>
              <MotionButton
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-[0_6px_16px_rgba(0,0,0,0.06)]"
              >
                {showAll ? "Close" : "Show all"}
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white" aria-hidden>
                  {showAll ? <HiChevronUp className="h-3 w-3" /> : <HiChevronDown className="h-3 w-3" />}
                </span>
              </MotionButton>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
