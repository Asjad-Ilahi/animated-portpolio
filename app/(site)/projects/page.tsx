import { WorkHero } from "./WorkHero"
import { ProjectsStatic } from "./ProjectsStatic"
import { FaqCtaSection } from "@/app/components/FaqCtaSection"
import { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"
import { projectsGraph } from "@/config/schemas"

export const metadata: Metadata = {
  title: "Austin Serb - Projects & Case Studies",
  description: "Featured work by Austin Serb: production Next.js + TypeScript systems, React Zero-UI, and selected client builds. Outcomes, scope, and links.",
  keywords: ["Austin Serb", "Projects", "Case Studies", "React Zero-UI", "Next.js", "React", "TypeScript", "Serbyte", "Seattle"],
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
