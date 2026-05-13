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
import { AnimatePresence, motion } from "motion/react"
import { Link } from "../../utils/Link"
import { SITE_SLUGS } from "@/config/siteConfig"

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

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: panelEase } },
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
        <motion.div
          key="nav-backdrop"
          role="presentation"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="pointer-events-auto fixed inset-0 z-0 bg-black/40 backdrop-blur-[3px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </AnimatePresence>
  )
}

export const MobileNavPanel: React.FC<{ navItems: readonly { name: string; href: string }[] }> = ({ navItems }) => {
  const { open, setOpen } = useMobileMenu()

  return (
    <div className="relative z-10 w-full overflow-hidden md:hidden">
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu-panel"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 440, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: panelEase }}
            className="overflow-hidden rounded-b-2xl border-t border-gray-200/90 bg-white/95 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] max-md:-mt-px"
          >
            <motion.ul variants={listVariants} initial="hidden" animate="show" className="flex flex-col gap-0 px-3 pb-4 pt-1">
              {navItems.map((item) => (
                <motion.li key={item.name} variants={itemVariants} className="border-b border-gray-100/90 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 text-[17px] font-medium tracking-tight text-[#18181b] transition-colors active:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="pt-3">
                <Link
                  href={SITE_SLUGS.contact}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-white py-3 text-[15px] font-semibold text-[#18181b] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12)] transition hover:border-gray-300 active:scale-[0.99]"
                >
                  Contact
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
