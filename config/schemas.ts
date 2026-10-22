import { PROJECTS, type Project } from "@/app/data/projects"
import { DOMAIN_URL, SITE_CONFIG, SITE_NAP, SITE_SLUGS } from "./siteConfig"
import type { Graph, ItemList } from "schema-dts"

interface ProjectItem {
  name: string
  url: string // your case-study URL (internal) OR absolute external URL
  date: string
  description: string
  external?: string // when you host the case study, put the client URL here
  type?: "SoftwareSourceCode" | "SoftwareApplication" | "WebSite" | "WebApplication" | "CreativeWork"
}

// Project data for schema (derived from the single project source of truth)
const projectsData: ProjectItem[] = PROJECTS.map((p) => ({
  name: p.title,
  url: `${SITE_SLUGS.projects}/${p.slug}`,
  external: p.site,
  date: p.year ?? "2025",
  description: p.tagline,
  type: "WebSite",
}))

const SITE = DOMAIN_URL.replace(/\/$/, "")
const PERSON_ID = `${SITE}/#asjad-ilahi`

export function buildProjectGraphMinimal(project: Project, type = "CreativeWork" as const): Graph {
  const id = `${SITE}${SITE_SLUGS.projects}/${project.slug}`
  const image = typeof project.preview === "string" ? project.preview : project.preview?.src
  const sameAs = [project.site, project.huggingFace, project.github, project.linkedInPost].filter(Boolean) as string[]

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": id,
        url: id,
        name: project.title,
        description: project.description || project.tagline,
        ...(image ? { image: image.startsWith("/") ? `${SITE}${image}` : image } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        mainEntityOfPage: id,
        isPartOf: { "@id": `${SITE}${SITE_SLUGS.projects}#page` },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}${SITE_SLUGS.projects}` },
          { "@type": "ListItem", position: 3, name: project.title, item: id },
        ],
      },
    ],
  }
}

const itemList: ItemList = {
  "@type": "ItemList",
  "@id": `${SITE}${SITE_SLUGS.projects}#list`,
  itemListOrder: "Descending",
  numberOfItems: projectsData.length,
  itemListElement: projectsData.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@id": p.url.startsWith("/") ? `${SITE}${p.url}` : p.url },
  })),
}

// 2) Include the ItemList node inside @graph, then reference it from CollectionPage.mainEntity
export const projectsGraph: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    itemList,
    {
      "@type": "CollectionPage",
      "@id": `${SITE}${SITE_SLUGS.projects}#page`,
      url: `${SITE}${SITE_SLUGS.projects}`,
      name: "Projects - Asjad Ilahi",
      isPartOf: { "@id": `${SITE}#website` },
      mainEntity: { "@id": `${SITE}${SITE_SLUGS.projects}#list` }, // <-- REFERENCES ABOVE
      mainEntityOfPage: `${SITE}${SITE_SLUGS.projects}`,
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}${SITE_SLUGS.projects}` },
      ],
    },
  ],
}

export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}#home`,
      url: SITE,
      name: SITE_CONFIG.title,
      isPartOf: { "@id": `${SITE}#website` },
      mainEntityOfPage: SITE,
      mainEntity: {
        "@type": "ItemList",
        name: "Featured projects",
        itemListElement: projectsData.slice(0, 4).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@id": p.url.startsWith("/") ? `${SITE}${p.url}` : p.url }, // reference-only
        })),
      },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }],
    },
  ],
}

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Asjad Ilahi",
      url: SITE,
      jobTitle: "AI Engineer",
      description: SITE_CONFIG.description,
      image: { "@id": `${SITE}#headshot` },
      worksFor: { "@type": "Organization", name: "Huawei Technologies" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "COMSATS University Islamabad" },
      address: { "@type": "PostalAddress", addressLocality: SITE_NAP.city, addressCountry: "PK" },
      knowsAbout: ["Machine Learning", "Large Language Models", "PyTorch", "Hugging Face", "Fine-Tuning", "Next.js", "Flutter"],
      knowsLanguage: ["en", "ur", "ps"],
      sameAs: Object.values(SITE_NAP.profiles),
      email: SITE_NAP.email,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#website`,
      url: SITE,
      name: SITE_CONFIG.title,
      publisher: { "@id": PERSON_ID },
      inLanguage: "en",
    },
    { "@type": "ImageObject", "@id": `${SITE}#headshot`, url: `${SITE}/logo.png` },
  ],
}
