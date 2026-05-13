import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PROJECTS, getProjectBySlug } from "@/app/data/projects"
import { UniversalProjectDisplay } from "@/app/components/ProjectSection/UniversalProjectDisplay"
import { SITE_SLUGS } from "@/config/siteConfig"
import { buildProjectGraphMinimal } from "@/config/schemas"

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const description = project.description || project.tagline

  return {
    title: `${project.title} — Asjad Ilahi`,
    description,
    alternates: { canonical: `${SITE_SLUGS.projects}/${project.slug}` },
    openGraph: {
      title: `${project.title} — Asjad Ilahi`,
      description,
      type: "article",
    },
  }
}

const ProjectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <script
        id="id-project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProjectGraphMinimal(project)) }}
      />
      <UniversalProjectDisplay project={project} />
    </>
  )
}

export default ProjectPage
