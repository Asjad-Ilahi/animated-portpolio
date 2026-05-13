import { HeroScrollClick } from "./HeroScrollClick"
import { ActivityDot } from "./ui/ActivityDot"
import { AnimatedElement } from "./ui/AnimatedElement"
import { SECTION_HEADING_CLASS } from "./ui/AnimatedH2"
import { CallToActionButton } from "./ui/CallToActionButton"
import clsx from "clsx"

export const HeroV2 = () => {
  return (
    <section className="mx-auto max-w-7xl pb-2 pt-[7.5rem] sm:pt-28 md:pt-32 sm:pb-0">
      <div className="inside relative flex [flex:1.5_0_0px] px-3.5 pb-10 sm:px-4 md:px-8 md:pb-28">
        <div className="flex max-w-lg flex-col gap-7 sm:gap-9 md:min-w-sm md:gap-10">
          <AnimatedElement
            element="span"
            delay={0.6}
            className="z-2 inline-flex items-center gap-2 self-start rounded-full border border-gray-100 bg-white px-3 py-2 text-xs font-medium shadow-sm"
          >
            <ActivityDot />
            Islamabad, PK
          </AnimatedElement>

          <h1 className={clsx(SECTION_HEADING_CLASS, "relative z-5 text-slate-900 max-sm:!text-[clamp(1.85rem,7vw,2.35rem)] max-sm:!leading-[1.08]")}>
            <AnimatedElement element="span" offsetPx={20} fadeDirection="left" className="inline-block">
            Software Product 
            </AnimatedElement>
            <br />
            <AnimatedElement element="span" delay={0.25} offsetPx={20} fadeDirection="left" className="inline-block text-balance text-slate-500">
            Developer
            </AnimatedElement>
          </h1>

          <AnimatedElement
            element="p"
            delay={0.6}
            className="max-w-[19rem] text-[13px] leading-relaxed tracking-tight text-slate-600 sm:max-w-sm sm:text-xs md:max-w-md md:text-[13px] md:leading-snug"
          >
            <strong className="font-semibold text-slate-800">Motivated software engineer</strong> shipping{" "}
            <strong className="font-semibold text-slate-800">web and mobile products</strong>—turning fuzzy problems into{" "}
            <strong className="font-semibold text-slate-800">calm, dependable releases</strong>.
            <br className="hidden sm:block" />
            I care about{" "}
            <strong className="font-semibold text-slate-800">momentum, clear craft, and solutions people trust in production</strong>.
          </AnimatedElement>

          <CallToActionButton />
        </div>
        {/* Don't remove this span */}
        <span data-stack-target-id className="mt-18 ml-[2%] h-1 w-2 shrink-0 xs:ml-[6%] xs:mt-20 [flex:1_0_0px] sm:mt-11 md:ml-[4%] xl:ml-[16%]" />
        <HeroScrollClick />

      </div>
    </section>
  )
}
