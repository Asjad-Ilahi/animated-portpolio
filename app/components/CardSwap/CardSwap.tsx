"use client"

import gsap from "gsap"
import React, {
  Children,
  Fragment,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react"

export interface CardSwapProps {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: "linear" | "elastic"
  children: ReactNode
  className?: string
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white/15 bg-zinc-950 text-white [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${className ?? ""}`.trim()}
  />
))
Card.displayName = "Card"

type CardRef = RefObject<HTMLDivElement | null>

interface Slot {
  x: number
  y: number
  z: number
  zIndex: number
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  })

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
  className = "",
}) => {
  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children])
  const count = childArr.length
  const refs = useMemo<CardRef[]>(() => Array.from({ length: count }, () => createRef<HTMLDivElement>()), [count])

  const order = useRef<number[]>(Array.from({ length: count }, (_, i) => i))
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const container = useRef<HTMLDivElement>(null)

  /** Snap every card transform to `order.current` (fixes interrupted tweens). */
  const syncToOrderLayout = useCallback(() => {
    order.current.forEach((cardIdx, rank) => {
      const el = refs[cardIdx]?.current
      if (!el) return
      gsap.killTweensOf(el)
      placeNow(el, makeSlot(rank, cardDistance, verticalDistance, count), skewAmount)
    })
  }, [cardDistance, verticalDistance, count, refs, skewAmount])

  const swap = useCallback(() => {
    if (order.current.length < 2) return

    tlRef.current?.kill()
    syncToOrderLayout()

    const cfg =
      easing === "elastic"
        ? {
            ease: "elastic.out(0.72, 0.82)",
            durDrop: 1.05,
            durMove: 1.05,
            durReturn: 1.05,
            promoteOverlap: 0.88,
            returnDelay: 0.04,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.45,
            durMove: 0.45,
            durReturn: 0.45,
            promoteOverlap: 0.42,
            returnDelay: 0.12,
          }

    const [front, ...rest] = order.current
    const elFront = refs[front]?.current
    if (!elFront) return

    const tl = gsap.timeline()
    tlRef.current = tl

    tl.to(elFront, {
      y: "+=500",
      duration: cfg.durDrop,
      ease: cfg.ease,
    })

    tl.addLabel("promote", `-=${cfg.durDrop * cfg.promoteOverlap}`)
    rest.forEach((idx, i) => {
      const el = refs[idx]?.current
      if (!el) return
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
      tl.set(el, { zIndex: slot.zIndex }, "promote")
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: cfg.durMove,
          ease: cfg.ease,
        },
        `promote+=${i * 0.07}`,
      )
    })

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
    tl.addLabel("return", `promote+=${cfg.durMove * cfg.returnDelay}`)
    tl.call(() => {
      gsap.set(elFront, { zIndex: backSlot.zIndex })
    }, undefined, "return")
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: cfg.durReturn,
        ease: cfg.ease,
      },
      "return",
    )

    tl.call(() => {
      order.current = [...rest, front]
    })
  }, [cardDistance, verticalDistance, refs, easing, syncToOrderLayout])

  /** Move the clicked card (by child index) to the front with a short shared animation. */
  const bringCardToFront = useCallback(
    (clickedIdx: number) => {
      if (count < 2) return
      const front = order.current[0]
      if (clickedIdx === front) return

      tlRef.current?.kill()
      syncToOrderLayout()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      const o = order.current
      const pos = o.indexOf(clickedIdx)
      if (pos < 1) return

      const newOrder = [...o.slice(pos), ...o.slice(0, pos)]

      const ease = "power2.out"
      const dur = 0.52

      const tl = gsap.timeline({
        onComplete: () => {
          order.current = newOrder
          tlRef.current = null
          if (count >= 2) {
            intervalRef.current = setInterval(swap, delay)
          }
        },
      })
      tlRef.current = tl

      newOrder.forEach((cardIdx, rank) => {
        const el = refs[cardIdx]?.current
        if (!el) return
        const slot = makeSlot(rank, cardDistance, verticalDistance, count)
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            zIndex: slot.zIndex,
            skewY: skewAmount,
            duration: dur,
            ease,
            overwrite: "auto",
          },
          0,
        )
      })
    },
    [cardDistance, verticalDistance, count, delay, refs, skewAmount, swap, syncToOrderLayout],
  )

  useEffect(() => {
    order.current = Array.from({ length: count }, (_, i) => i)

    refs.forEach((r, i) => {
      const el = r.current
      if (!el) return
      placeNow(el, makeSlot(i, cardDistance, verticalDistance, count), skewAmount)
    })

    if (count >= 2) {
      intervalRef.current = setInterval(swap, delay)
    }

    const node = container.current
    const pause = () => {
      tlRef.current?.pause()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    const resume = () => {
      tlRef.current?.play()
      if (count >= 2 && !intervalRef.current) {
        intervalRef.current = setInterval(swap, delay)
      }
    }

    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", pause)
      node.addEventListener("mouseleave", resume)
    }

    return () => {
      if (node && pauseOnHover) {
        node.removeEventListener("mouseenter", pause)
        node.removeEventListener("mouseleave", resume)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      tlRef.current?.kill()
    }
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, count, refs, swap, syncToOrderLayout])

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child) ? (
      <Fragment key={i}>
        {cloneElement(child, {
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e)
            bringCardToFront(i)
            onCardClick?.(i)
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)}
      </Fragment>
    ) : (
      <Fragment key={i}>{child}</Fragment>
    ),
  )

  return (
    <div
      ref={container}
      className={`relative mx-auto flex items-center justify-center perspective-[900px] [transform-style:preserve-3d] ${className}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  )
}

export default CardSwap
