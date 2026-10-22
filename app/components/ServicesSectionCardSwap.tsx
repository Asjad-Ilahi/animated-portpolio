"use client"

import type { ComponentType } from "react"
import Image from "next/image"
import clsx from "clsx"
import { useIsMobile } from "../hooks/useMediaQuery"
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCloud,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlinePaintBrush,
} from "react-icons/hi2"
import { SiEthereum } from "react-icons/si"
import CardSwap, { Card } from "./CardSwap/CardSwap"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { Text } from "../ui/Elements"

type ServiceIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>

const services: {
  title: string
  subtitle: string
  image: string
  alt: string
  Icon: ServiceIcon
}[] = [
  {
    title: "AI & ML Engineering",
    subtitle: "Custom models, fine-tuning, and LLM features—trained, evaluated, and shipped to production.",
    image: "/services/ai.svg",
    alt: "AI and machine learning illustration",
    Icon: HiOutlineCpuChip,
  },
  {
    title: "App Development",
    subtitle: "Mobile experiences from discovery through store release.",
    image: "/services/app.svg",
    alt: "App development illustration",
    Icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: "Web Development",
    subtitle: "Fast, accessible sites and apps with modern React stacks.",
    image: "/services/web.svg",
    alt: "Web development illustration",
    Icon: HiOutlineGlobeAlt,
  },
  {
    title: "Blockchain Development",
    subtitle: "Smart contracts, wallets, and secure on-chain integrations.",
    image: "/services/blockchain.svg",
    alt: "Blockchain development illustration",
    Icon: SiEthereum,
  },
  {
    title: "Design & Logo Services",
    subtitle: "Brand systems, UI kits, and marks that scale everywhere.",
    image: "/services/design.svg",
    alt: "Design and branding illustration",
    Icon: HiOutlinePaintBrush,
  },
  {
    title: "SaaS Platform Development",
    subtitle: "Multi-tenant products, billing, auth, and dashboards—shipped end to end.",
    image: "/services/saas.svg",
    alt: "SaaS platform illustration",
    Icon: HiOutlineCloud,
  },
  {
    title: "Consultation",
    subtitle: "Architecture reviews, roadmaps, and hands-on guidance for teams.",
    image: "/services/consultation.svg",
    alt: "Consultation illustration",
    Icon: HiOutlineChatBubbleLeftRight,
  },
]

/** Large stack; section overflow clips bottom + right. */
const CARD_W = 820
const CARD_H = 540

export const ServicesSectionCardSwap: React.FC<{ className?: string }> = ({ className = "" }) => {
  const isBelowLg = useIsMobile(1024)
  const isNarrowPhone = useIsMobile(400)

  const cardDistance = isBelowLg ? (isNarrowPhone ? 48 : 58) : 102
  const verticalDistance = isBelowLg ? (isNarrowPhone ? 54 : 66) : 112
  const skewAmount = isBelowLg ? 3.5 : 5

  return (
    <section
      id="services"
      className={clsx(
        "relative w-full scroll-mt-28 overflow-hidden bg-white md:scroll-mt-32",
        "min-h-0 py-8 sm:py-10 lg:h-[100dvh] lg:min-h-[100dvh] lg:py-0",
        className,
      )}
    >
      {/* Same width + side margins + vertical rules as `layout.tsx`; content stays inside the lines. */}
      <div className="custom:mx-auto relative z-[1] mx-0.5 flex min-h-0 w-full max-w-7xl flex-col overflow-hidden border-gray-200 xxs:border-x md:mx-1 lg:mx-1.5 lg:h-full">
        <div className="grid min-h-0 w-full grid-cols-1 grid-rows-[auto_auto] gap-1.5 px-0 sm:gap-2.5 md:gap-3 lg:h-full lg:grid-cols-[clamp(22rem,28vw,34rem)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-0">
          <aside className="flex max-w-[min(100%,30rem)] flex-col justify-start px-4 pt-0 pb-0 sm:px-6 md:px-8 lg:max-w-none lg:justify-center lg:pr-4 lg:pt-0 lg:pb-0">
            {/* Same structure and default type scale as AboutSectionV2 `<AnimatedH2>` */}
            <AnimatedH2 className="text-slate-900 !text-[clamp(1.65rem,6.5vw,2.15rem)] !leading-tight sm:!text-4xl sm:!leading-none md:!text-5xl md:!leading-13 lg:!text-6xl lg:!leading-15">
              <span className="text-slate-500">Services</span>
              <span className="mt-[0.35em] block text-slate-900">What I build</span>
            </AnimatedH2>
            <Text size="base" className="mt-2 max-w-[min(100%,34rem)] text-pretty text-sm leading-snug text-slate-600 sm:mt-3 sm:text-base sm:leading-relaxed md:mt-6 md:text-lg lg:mt-8">
              Flip the stack—everything I ship, one glance at a time.
            </Text>
          </aside>

          <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-start overflow-visible pt-0 pb-2 sm:pb-3 lg:h-full lg:items-stretch lg:justify-end lg:overflow-hidden lg:pb-0 lg:pt-0">
            <div className="relative w-full max-w-[min(100vw,28rem)] origin-center scale-[0.56] xs:scale-[0.6] xs:max-w-[min(100vw,32rem)] sm:max-w-none sm:scale-[0.66] md:scale-[0.72] md:translate-x-[6%] md:translate-y-[6%] lg:absolute lg:bottom-0 lg:right-0 lg:max-w-none lg:origin-bottom-right lg:translate-x-[14%] lg:translate-y-[16%] lg:scale-[0.92] xl:translate-x-[16%] xl:translate-y-[18%] xl:scale-100">
              <CardSwap
                width={CARD_W}
                height={CARD_H}
                cardDistance={cardDistance}
                verticalDistance={verticalDistance}
                delay={2800}
                pauseOnHover
                skewAmount={skewAmount}
                easing="elastic"
                className="perspective-[1100px]"
              >
                {services.map((s) => {
                  const Icon = s.Icon
                  return (
                  <Card
                    key={s.title}
                    className={clsx(
                      "flex h-full cursor-pointer flex-col overflow-hidden !rounded-2xl !border !border-white/[0.12] !bg-[#0b0b0e] !p-0",
                      "text-left shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85),0_0_1px_rgba(255,255,255,0.06)_inset]",
                    )}
                  >
                    <header className="flex h-10 shrink-0 items-center gap-2 border-b border-white/[0.07] bg-black/35 px-3 backdrop-blur-[2px] sm:h-12 sm:gap-3 sm:px-4">
                      <span className="flex gap-1.5" aria-hidden>
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0 text-white/90 sm:h-4 sm:w-4" aria-hidden />
                      <span className="truncate text-xs font-medium tracking-tight text-white/95 sm:text-sm">{s.title}</span>
                    </header>

                    <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
                      <p className="line-clamp-2 shrink-0 text-[11px] leading-snug text-zinc-500 sm:text-[13px] md:text-sm">{s.subtitle}</p>

                      <div className="relative mt-2 min-h-[176px] flex-1 overflow-hidden rounded-lg border border-white/[0.06] sm:mt-3 sm:min-h-[200px] sm:rounded-xl md:min-h-[260px] lg:min-h-[280px]">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          unoptimized
                          className="object-contain object-center p-4 opacity-[0.92] sm:p-6 md:p-10"
                          sizes="(min-width: 1280px) 820px, 85vw"
                        />

                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0e]/90 via-[#0b0b0e]/25 to-transparent"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </Card>
                  )
                })}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
