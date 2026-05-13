import { CAL_BOOKING_URL } from "@/config/siteConfig"
import Image from "next/image"
import clsx from "clsx"
import type { Variants } from "motion"
import { MotionButton, MotionDiv } from "@/app/utils/lazy-ui"

export const CallToActionButton = () => {
  const buttonVariants: Variants = {
    initial: {
      opacity: 0,
      filter: `blur(5px)`,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: 0.7,
      },
    },
    hover: {
      y: 2,
      transition: {
        duration: 0.2,
      },
    },
  }

  const youVariants: Variants = {
    initial: {
      opacity: 0,
      x: -10,

      width: 0,
    },
    animate: {
      opacity: 0,
      x: -10,

      width: 0,
    },
    hover: {
      opacity: 1,
      x: 0,
      width: 78,

      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        opacity: {
          delay: 0.1,
        },
      },
    },
  }

  return (
    <a href={CAL_BOOKING_URL} target="_blank" rel="noopener" aria-label="Book a call with Asjad Ilahi">
      <MotionButton
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={buttonVariants}
        className="group relative z-1 inline-flex w-max items-center gap-1.5 rounded-full border border-white/25 bg-black px-2.5 py-1.5 text-sm leading-none font-semibold tracking-tight text-white shadow-sm shadow-black/50"
      >
        <div className="pointer-events-none absolute inset-[2px] -z-1 rounded-full border border-white/15" />
        <div className="pointer-events-none absolute inset-0.5 -z-1 rounded-full [background-image:url('/assets/framer-noise.png')] [background-size:164px] bg-repeat opacity-12" />
        <div className="relative flex items-center gap-1">
          <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white/70">
            <Image src="/logo.png" alt="" fill sizes="50px" className="rounded-full object-cover" aria-hidden />
          </div>

          <MotionDiv variants={youVariants} className={clsx("hidden items-center gap-1.5 overflow-hidden md:flex")}>
            <span className="text-2xl leading-none font-medium">+</span>
            <span className="inline-flex h-7 items-center rounded-full bg-white px-2.5 text-sm font-semibold text-black">You</span>
          </MotionDiv>
        </div>
        <span className="pr-1 text-sm">Book a call with me</span>
      </MotionButton>
    </a>
  )
}

// === VARIANTS ===
