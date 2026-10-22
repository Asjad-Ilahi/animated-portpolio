import { Card } from "@/app/components/ProjectCard/Card"
import { Link } from "@/app/utils/Link"
import { PROJECTS, type Project } from "@/app/data/projects"

/**
 * Card-link metadata shared by the all-projects grid and the in-page "More Projects" carousel.
 * `id` is the canonical project slug; `href` always points to the universal detail page.
 */
export type StaticProject = {
  id: string
  src: Project["preview"]
  alt: string
  color: string
  type: string
  text: string
  href: string
  dataText: string
  ariaLabel: string
  /** Always false now — every project routes through the internal universal page. */
  isExternal: false
}

const toStatic = (p: Project): StaticProject => ({
  id: p.slug,
  src: p.preview,
  alt: `${p.title} Preview`,
  color: p.cardColor,
  type: p.cardType,
  text: "View Project",
  href: `/projects/${p.slug}`,
  dataText: "View Project",
  ariaLabel: `View ${p.title} case study`,
  isExternal: false,
})

/** Ordering follows the `PROJECTS` array in `app/data/projects.ts`. */
export const STATIC_PROJECTS: StaticProject[] = PROJECTS.map(toStatic)

export const ProjectsStatic: React.FC = () => {
  return (
    <section className="border-t border-slate-200">
      <div className="inside-container-small">
        <div className="relative z-4 grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {STATIC_PROJECTS.map((project) => (
            <Link key={project.id} href={project.href} data-text={project.dataText} aria-label={project.ariaLabel} prefetch={true}>
              <Card src={project.src} alt={project.alt} color={project.color} type={project.type} reveal={false} text={project.text} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
