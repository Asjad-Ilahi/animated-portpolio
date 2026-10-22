"use client"

import Image from "next/image"
import clsx from "clsx"
import { useId, useState } from "react"
import { HiMinus, HiOutlineCalendarDays, HiPlus } from "react-icons/hi2"
import { CAL_BOOKING_URL } from "@/config/siteConfig"
import { AnimatedH2 } from "./ui/AnimatedH2"
import { BlackButtonLink } from "./ui/BlackButtonLink"

const faqs = [
  {
    id: "01",
    question: "Can you build, fine-tune, or train an AI model for our product?",
    answer:
      "Yes. I have trained a 54.5M-parameter language model from scratch (DanAi) and fine-tuned Qwen3.5-0.8B with Unsloth on ~120K structured examples for Saazghar. Depending on the problem, that can mean fine-tuning an open model on your data, wiring an LLM into your product with structured tool calls, or a small model that runs on-device. Evaluation comes first, so we know it actually works before it ships.",
  },
  {
    id: "02",
    question: "How long does a typical build or milestone take?",
    answer:
      "Timelines depend on scope and integrations. A focused MVP slice is often a few weeks; larger marketplace or multi-platform work can run longer. After a discovery call I share a phased plan with milestones, owners, and dates so expectations stay concrete.",
  },
  {
    id: "03",
    question: "Can you work with our existing codebase, Figma files, and APIs?",
    answer:
      "Yes. I regularly plug into current repos—Next.js, Laravel, Flutter, or Firebase backends—and extend Figma-based UI kits or component libraries. I document assumptions, add tests where they add value, and keep diffs reviewable for your team.",
  },
  {
    id: "04",
    question: "What stacks do you prefer for AI, web, and mobile?",
    answer:
      "For AI I work in Python with PyTorch, Hugging Face, and Unsloth, and ship models through GGUF, Ollama, or an API. For web I lean on Next.js and Node when we need SEO, dashboards, or server actions; Laravel when the product already lives there. For mobile I ship Flutter with Firebase or Supabase, and wire third-party logistics or payment APIs when the product needs them.",
  },
  {
    id: "05",
    question: "Do you support releases after launch?",
    answer:
      "Absolutely. I offer post-launch hardening, monitoring hooks, performance passes, and small feature increments—either on a light retainer or scoped tickets—so you are not stuck once users hit production traffic.",
  },
] as const

export function FaqCtaSection({ className = "" }: { className?: string }) {
  const uid = useId()
  const [openId, setOpenId] = useState<string>("")

  return (
    <section id="contact" className={clsx("scroll-mt-20 border-t border-gray-200 bg-white", className)}>
      <div className="xxs:px-5 relative z-2 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-28 lg:py-36">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.75fr)] lg:items-stretch lg:gap-14 xl:gap-20">
          {/* FAQ column */}
          <div className="min-w-0">
            <div className="mb-10 md:mb-14">
              <AnimatedH2 className="text-slate-900">
                <span className="text-slate-500">Your questions</span>
                <span className="mt-[0.35em] block text-slate-900">answered</span>
              </AnimatedH2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((item) => {
                const isOpen = openId === item.id
                const panelId = `${uid}-panel-${item.id}`
                const buttonId = `${uid}-btn-${item.id}`

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? "" : item.id)}
                      className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gray-50/80 md:px-6 md:py-6"
                    >
                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className="tabular-nums text-sm font-medium text-slate-400">{item.id}</span>
                        <span className="ml-3 text-base font-semibold tracking-tight text-slate-900 md:text-[17px]">
                          {item.question}
                        </span>
                      </span>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-900">
                        {isOpen ? <HiMinus className="h-4 w-4" aria-hidden /> : <HiPlus className="h-4 w-4" aria-hidden />}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="border-t border-gray-100"
                    >
                      <p className="px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 md:px-6 md:text-[15px] md:leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA: parent fills stretched grid row so sticky has room to run until section ends */}
          <div className="flex w-full min-w-0 justify-center lg:block lg:h-full lg:min-h-0">
            <div className="w-full max-w-md lg:sticky lg:top-28 lg:w-full lg:max-w-none">
              <aside className="rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.04)] md:p-8">
              <div className="mb-6 flex items-start gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                  <Image src="/logo.png" alt="Asjad Ilahi" fill sizes="48px" className="object-cover" />
                </div>
              </div>

              <p className="text-base font-semibold text-slate-500">Still not sure?</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem] md:leading-snug">
                Book a free discovery call.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                Learn more about how I work and how I can help you and your business take the next step.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BlackButtonLink href={CAL_BOOKING_URL}>
                  <HiOutlineCalendarDays className="h-5 w-5 shrink-0 text-white" aria-hidden />
                  Schedule Now
                </BlackButtonLink>
                <span className="text-sm font-normal text-slate-400">Cal.com</span>
              </div>
            </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
