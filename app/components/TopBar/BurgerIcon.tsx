"use client"

import clsx from "clsx"

/** Hamburger that animates to an X when `open` (mobile nav only). */
export function BurgerIcon({ open, className }: { open: boolean; className?: string }) {
  const bar =
    "block h-0.5 w-5 shrink-0 rounded-full bg-[#1d1d1f] origin-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
  return (
    <span className={clsx("relative flex h-5 w-5 flex-col justify-center gap-[5px]", className)} aria-hidden>
      <span className={clsx(bar, open && "translate-y-[7px] rotate-45")} />
      <span className={clsx(bar, "w-4 self-center", open && "scale-0 opacity-0")} />
      <span className={clsx(bar, open && "-translate-y-[7px] -rotate-45")} />
    </span>
  )
}
