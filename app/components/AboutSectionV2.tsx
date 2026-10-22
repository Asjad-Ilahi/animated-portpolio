"use client"

import Image from "next/image"
import clsx from "clsx"
import { Text, Typography } from "../ui/Elements"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { MotionDiv, MotionLi } from "../utils/lazy-ui"
import Link from "next/link"
import { SITE_NAP } from "@/config/siteConfig"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiHuggingface } from "react-icons/si"

const profileLinks = [
  { href: SITE_NAP.profiles.linkedIn, label: "LinkedIn", Icon: FaLinkedinIn, highlight: true },
  { href: SITE_NAP.profiles.github, label: "GitHub", Icon: FaGithub },
  { href: SITE_NAP.profiles.huggingFace, label: "Hugging Face", Icon: SiHuggingface },
  { href: SITE_NAP.profiles.instagram, label: "Instagram", Icon: FaInstagram },
  { href: SITE_NAP.profiles.x, label: "X (Twitter)", Icon: FaXTwitter },
]

const stats = [
  { value: "54.5M", label: "parameters in DanAi, trained from scratch" },
  { value: "1.5K+", label: "downloads on Hugging Face" },
  { value: "1st", label: "place, AI Pakistan AWKUM AGORA 2026" },
  { value: "10+", label: "production web & mobile projects shipped" },
]

export const AboutSectionV2 = ({ className = "" }: { className?: string }) => {
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
                <Image src="/logo.png" alt="Asjad Ilahi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
              </div>
              <MotionDiv
                initial={{ x: 42, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute right-3 bottom-3 z-5 flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/28 px-1.5 backdrop-blur-md"
              >
                {profileLinks.map(({ href, label, Icon, highlight }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={clsx(
                      "inline-flex h-7 w-7 items-center justify-center rounded-full text-white transition",
                      highlight ? "bg-white/20 hover:bg-white/28" : "bg-black/45 hover:bg-black/55",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
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
                AI Engineer &amp; Software Product Developer · English, Urdu, Pashto
              </p>
            </MotionDiv>
          </div>
          <Typography
            as="article"
            size="base"
            className="min-w-0 flex-1 space-y-5 text-pretty pr-0 text-[15px] leading-relaxed text-slate-500 sm:space-y-6 sm:text-base sm:leading-relaxed md:max-w-[min(100%,40rem)] md:space-y-8 md:text-lg md:leading-relaxed lg:space-y-10 lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed md:pr-2 lg:pr-4"
          >
            <p>
              <strong className="font-semibold text-slate-900">I build AI systems end to end</strong>, from the tokenizer and training loop to the product
              people actually use. As an AI Engineer Intern in Huawei&apos;s MTO program I work across model development, evaluation, and inference, and on my
              own I trained DanAi, a 54.5M-parameter reasoning model that has passed 1,500 downloads on Hugging Face.
            </p>

            <p>
              <strong className="font-semibold text-slate-900">Before models, I shipped products.</strong> 10+ production projects and 12+ personal builds
              across Next.js, Flutter, Laravel, Firebase, and Supabase taught me to scope clearly, iterate with stakeholders, and leave code the next
              engineer can move fast in. That product instinct is what I bring to AI work: models that are useful, measurable, and shipped.
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

        <ul className="grid w-full grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <MotionLi
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-5 md:p-6"
            >
              <span className="text-[1.75rem] leading-none font-medium tracking-tighter text-slate-900 tabular-nums sm:text-4xl md:text-5xl">{stat.value}</span>
              <span className="text-xs leading-snug text-slate-500 sm:text-sm">{stat.label}</span>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  )
}
