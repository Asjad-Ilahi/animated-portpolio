import { WorkHero } from "./WorkHero"
import { ProjectsStatic } from "./ProjectsStatic"
import { FaqCtaSection } from "@/app/components/FaqCtaSection"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"
import { projectsGraph } from "@/config/schemas"

export const metadata: Metadata = {
  title: "Projects & Case Studies — Asjad Ilahi",
  description:
    "Work by Asjad Ilahi: DanAi, a 55M-parameter language model trained from scratch; Saazghar, an AI pre-construction platform; plus production web, mobile, and Web3 builds.",
  keywords: ["Asjad Ilahi", "Projects", "Case Studies", "DanAi", "Saazghar", "Small Language Model", "Next.js", "Flutter", "PyTorch"],
  alternates: {
    canonical: SITE_SLUGS.projects,
  },
}
const page = () => {
  return (
    <main className="relative z-1 min-w-0 overflow-x-clip">
      <script
        id="id-projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsGraph),
        }}
      />
      <WorkHero />
      <ProjectsStatic />
      <FaqCtaSection />
    </main>
  )
}

export default page
