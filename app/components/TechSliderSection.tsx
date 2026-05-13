"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { FaApple, FaJava, FaStar } from "react-icons/fa"
import {
  SiAndroid,
  SiDart,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"

type TechItem = {
  name: string
  Icon: React.ComponentType<{ className?: string }>
}

const techStack: TechItem[] = [
  { name: "Flutter", Icon: SiFlutter },
  { name: "Dart", Icon: SiDart },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "React", Icon: SiReact },
  { name: "React Native", Icon: TbBrandReactNative },
  { name: "iOS", Icon: FaApple },
  { name: "Android", Icon: SiAndroid },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Figma", Icon: SiFigma },
  { name: "Python", Icon: SiPython },
  { name: "Java", Icon: FaJava },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Laravel", Icon: SiLaravel },
]

const clientAvatarSrc = [
  "/avatars/person1.jfif",
  "/avatars/person2.jfif",
  "/avatars/person3.jfif",
  "/avatars/person4.jfif",
] as const

export const TechSliderSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const marqueeItems = useMemo(() => [...techStack, ...techStack], [])

  return (
    <section className="border-y border-gray-200">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:gap-12 md:px-10 md:py-7">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex">
            {clientAvatarSrc.map((src, idx) => (
              <span
                key={src}
                className={clsx(
                  "relative inline-flex h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm",
                  idx > 0 && "-ml-2.5"
                )}
              >
                <Image src={src} alt="" width={36} height={36} className="h-full w-full object-cover" />
              </span>
            ))}
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1 text-black">
              {[0, 1, 2, 3].map((star) => (
                <FaStar key={star} className="h-3.5 w-3.5" />
              ))}
            </div>
            <p className="text-sm font-semibold text-black">10+ Happy clients</p>
          </div>
        </div>

        <div
          className="group relative min-w-0 flex-1 overflow-hidden rounded-full border border-gray-200 bg-white/80 py-2 shadow-sm backdrop-blur-sm cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            setIsDragging(true)
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-16 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-16 bg-linear-to-l from-white to-transparent" />

          <ul
            className="tech-marquee flex w-max items-center gap-8 px-5 text-black"
            style={{ animationPlayState: isDragging ? "paused" : "running" }}
            aria-label="Technology stack slider"
          >
            {marqueeItems.map(({ name, Icon }, index) => (
              <li key={`${name}-${index}`} className="flex shrink-0 items-center gap-2 opacity-90">
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
