// app/_components/DotCursor.tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { frame, useSpring } from "motion/react"
import { MotionDiv, MotionSpan } from "../utils/lazy-ui"

const BASE_W = 20
const BASE_H = 20
const HOVER_H = 36
const PAD_X = 16
const MIN_HOVER_W = 120
const MAX_W = 260
const spring = { stiffness: 400, damping: 50, restDelta: 0.001 }

export function DotCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const lastTargetRef = useRef<HTMLElement | null>(null)

  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const w = useSpring(BASE_W, spring)
  const h = useSpring(BASE_H, spring)
  const labelOpacity = useSpring(0, { stiffness: 300, damping: 40 })

  useEffect(() => {
    const isFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isFinePointer || reduceMotion) return
    setEnabled(true)

    const onMove = (ev: PointerEvent) => {
      const { clientX, clientY } = ev
      frame.read(() => {
        x.set(clientX)
        y.set(clientY)
      })

      const el = (ev.target as Element | null)?.closest?.<HTMLElement>("[data-text]") ?? null
      lastTargetRef.current = el

      const text = el?.getAttribute("data-text") ?? ""
      const revealStarted = typeof document !== "undefined" && document.body.dataset.reveal === "true"
      const inLatestProjectsSection = !!el?.closest("#projects-grid")
      const span = labelRef.current

      if (!el || !text || !revealStarted || !inLatestProjectsSection) {
        setActive(false)
        if (span) span.textContent = ""
        frame.read(() => {
          labelOpacity.set(0)
          w.set(BASE_W)
          h.set(BASE_H)
        })
        return
      }

      setActive(true)
      if (span) {
        labelOpacity.set(0)
        span.textContent = text
        const textW = Math.ceil(span.scrollWidth)
        const targetW = Math.min(Math.max(MIN_HOVER_W, textW + PAD_X * 2), MAX_W)
        frame.read(() => {
          w.set(targetW)
          h.set(HOVER_H)
        })
        frame.update(() => labelOpacity.set(1))
      }
    }

    const onLeaveWindow = () => {
      lastTargetRef.current = null
      setActive(false)
      if (labelRef.current) labelRef.current.textContent = ""
      frame.read(() => {
        labelOpacity.set(0)
        w.set(BASE_W)
        h.set(BASE_H)
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeaveWindow)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeaveWindow)
    }
  }, [enabled, h, labelOpacity, w, x, y])

  if (!enabled) return null

  return (
    <MotionDiv
      style={{
        x,
        y,
        width: w,
        height: h,
        willChange: "transform, width, height",
      }}
      className={
        active
          ? "pointer-events-none fixed top-0 left-0 z-[60] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-black/60 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md"
          : "pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      }
    >
      <MotionSpan ref={labelRef} style={{ opacity: labelOpacity }} className="px-4 text-[11px] leading-none font-semibold tracking-tight whitespace-nowrap select-none" />
    </MotionDiv>
  )
}
