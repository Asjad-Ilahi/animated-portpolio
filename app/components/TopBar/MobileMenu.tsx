"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  FiArrowUpRight,
  FiBriefcase,
  FiGrid,
  FiLayers,
  FiUser,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi"
import type { IconType } from "react-icons"
import { Link } from "../../utils/Link"
import { SITE_NAP, SITE_SLUGS } from "@/config/siteConfig"

/** `useUI` from Zero UI updates `data-*` on body but does not re-render React; menu visibility needs real state. */
type MobileMenuContextValue = {
  open: boolean
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null)

function syncBodyMobileMenu(open: boolean) {
  if (typeof document === "undefined") return
  document.body.dataset.mobileMenu = open ? "open" : "closed"
}

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false)

  const setOpen = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setOpenState((prev) => {
      const resolved = typeof next === "function" ? (next as (p: boolean) => boolean)(prev) : next
      syncBodyMobileMenu(resolved)
      return resolved
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onMq = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener("change", onMq)
    return () => mq.removeEventListener("change", onMq)
  }, [setOpen])

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen])

  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext)
  if (!ctx) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider")
  }
  return ctx
}

const panelEase = [0.22, 1, 0.36, 1] as const
const springSnappy = { type: "spring", stiffness: 380, damping: 32, mass: 0.7 } as const

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: panelEase },
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: springSnappy },
}

/** Match icon to each nav item by name. Keeps the map local so adding/removing nav links is easy. */
const navIconMap: Record<string, IconType> = {
  Projects: FiGrid,
  Experience: FiBriefcase,
  Services: FiLayers,
  About: FiUser,
}

/** Full-viewport dim layer; must stay inside `<nav>` (not portaled) so it stacks under the bar/panel. */
export const MobileNavBackdrop: React.FC = () => {
  const { open, setOpen } = useMobileMenu()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="nav-backdrop"
          role="presentation"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: panelEase }}
          className="pointer-events-auto fixed inset-0 z-0 bg-transparent md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </AnimatePresence>
  )
}

const socialLinks = [
  { href: SITE_NAP.profiles.github, label: "GitHub", Icon: FiGithub },
  { href: SITE_NAP.profiles.linkedIn, label: "LinkedIn", Icon: FiLinkedin },
  { href: SITE_NAP.profiles.instagram, label: "Instagram", Icon: FiInstagram },
] as const

export const MobileNavPanel: React.FC<{ navItems: readonly { name: string; href: string }[] }> = ({ navItems }) => {
  const { open, setOpen } = useMobileMenu()

  return (
    <div className="relative z-10 w-full overflow-visible md:hidden">
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="mobile-menu-panel"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.38, ease: panelEase }}
            className="relative mt-3 origin-top overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.6)_inset] backdrop-blur-2xl"
          >
            {/* Decorative gradient halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[28px] bg-[radial-gradient(120%_60%_at_0%_0%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(120%_60%_at_100%_0%,rgba(236,72,153,0.16),transparent_55%),radial-gradient(120%_60%_at_50%_100%,rgba(56,189,248,0.14),transparent_55%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
            />

            <m.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="relative flex flex-col gap-1.5 p-3"
            >
              {navItems.map((item) => {
                const Icon = navIconMap[item.name]
                return (
                  <m.li key={item.name} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 text-[16px] font-medium tracking-tight text-[#1d1d1f] transition-all duration-300 hover:bg-white hover:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.18)] active:scale-[0.985]"
                    >
                      <span className="pointer-events-none absolute inset-y-2 left-0 w-1 origin-center scale-y-0 rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-rose-500 transition-transform duration-300 ease-out group-hover:scale-y-100" />
                      {Icon && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200/80 bg-white/90 text-[#1d1d1f] shadow-[inset_0_-1px_0_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-[1px] group-hover:border-gray-300 group-hover:shadow-[0_8px_18px_-8px_rgba(0,0,0,0.18)]">
                          <Icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                      )}
                      <span className="flex-1">{item.name}</span>
                      <FiArrowUpRight
                        aria-hidden
                        className="h-4 w-4 -translate-x-1 text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#1d1d1f] group-hover:opacity-100"
                      />
                    </Link>
                  </m.li>
                )
              })}

              <m.li variants={itemVariants} className="px-1 pt-1">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </m.li>

              <m.li variants={itemVariants} className="px-1 pt-2">
                <Link
                  href={SITE_SLUGS.contact}
                  onClick={() => setOpen(false)}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#1d1d1f] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)] active:scale-[0.985]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span>Get in touch</span>
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </m.li>

              <m.li variants={itemVariants} className="flex items-center justify-between gap-4 px-3 pb-1 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                  Connect
                </span>
                <m.div
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="flex items-center gap-1.5"
                >
                  {socialLinks.map(({ href, label, Icon }) => (
                    <m.a
                      key={label}
                      variants={socialVariants}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      onClick={() => setOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-[#1d1d1f] transition-all duration-300 hover:-translate-y-[1px] hover:border-gray-300 hover:bg-white hover:shadow-[0_8px_18px_-8px_rgba(0,0,0,0.22)] active:scale-95"
                    >
                      <Icon className="h-[15px] w-[15px]" aria-hidden />
                    </m.a>
                  ))}
                </m.div>
              </m.li>
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
