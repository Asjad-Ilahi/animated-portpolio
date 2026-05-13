import { HeroV2 } from "../components/HeroV2"
import { ProjectsSection } from "../components/ProjectsSection"
import { AboutSectionV2 } from "../components/AboutSectionV2"
import { ServicesSectionCardSwap } from "../components/ServicesSectionCardSwap"
import { PostServicesShowcase } from "../components/PostServicesShowcase"
import { FaqCtaSection } from "../components/FaqCtaSection"
import { TechSliderSection } from "../components/TechSliderSection"
import { Metadata } from "next"
import { SITE_CONFIG, SITE_SLUGS } from "@/config/siteConfig"
import { homeGraph } from "@/config/schemas"

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description:
    "Portfolio of Asjad Ilahi—software product developer in Islamabad. Production web and mobile with Next.js, Flutter, MERN, and Laravel; case studies, stack, and booking.",
  authors: [{ name: "Asjad Ilahi" }],
  creator: "Asjad Ilahi",
  alternates: {
    canonical: SITE_SLUGS.home,
  },
}

const PortfolioPage: React.FC = () => {
  return (
    <main className="min-w-0 overflow-x-clip">
      <script
        id="id-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeGraph),
        }}
      />
      <HeroV2 />
      <TechSliderSection />
      <ProjectsSection />
      <AboutSectionV2 />
      <ServicesSectionCardSwap />
      <PostServicesShowcase />
      <FaqCtaSection />
    </main>
  )
}
export default PortfolioPage
