"use client"
import clsx from "clsx"
import { useMotionValueEvent } from "motion/react"
import { useScroll } from "motion/react"
import { useIsMobile } from "../../hooks/useMediaQuery"
import { DotMenuIcon } from "./DotMenuIcon"
import { BurgerIcon } from "./BurgerIcon"
import { useUI } from "@react-zero-ui/core"
import { useMobileMenu } from "./MobileMenu"

export const MobileMenuButton: React.FC = () => {
  const [, setScrolled] = useUI<"up" | "down">("scrolled", "up")
  const { open, setOpen } = useMobileMenu()

  const { scrollY } = useScroll()
  const isDesktop = !useIsMobile(768)

  useMotionValueEvent(scrollY, "change", (current) => {
    if (!isDesktop) return
    const previous = scrollY.getPrevious() ?? current
    const diff = current - previous

    if (Math.abs(diff) < 1) return
    setScrolled(diff < 0 ? "up" : "down")
  })

  const toggleMenu = () => setOpen((o) => !o)

  return (
    <>
      {/* CSS breakpoint controls which control is active — avoids SSR/hydration treating mobile as desktop */}
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={toggleMenu}
        className={clsx(
          "relative z-20 flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full text-sm transition-all duration-250 ease-out hover:bg-black/[0.04] hover:cursor-pointer active:scale-[0.97] md:hidden",
        )}
      >
        <BurgerIcon open={open} />
      </button>
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => setScrolled("up")}
        className={clsx(
          "hidden h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm transition-all duration-250 ease-out hover:cursor-pointer active:scale-[0.97] md:flex md:hover:bg-transparent md:scrolled-up:pointer-events-none md:scrolled-up:w-0 md:scrolled-up:opacity-0 md:scrolled-down:w-6 md:scrolled-down:opacity-100",
        )}
      >
        <DotMenuIcon />
      </button>
    </>
  )
}
