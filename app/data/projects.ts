import type { StaticImageData } from "next/image"
import danaiImg from "@/public/projects/danai.jpg"
import danai2Img from "@/public/projects/danai2.jpg"
import saazgharImg from "@/public/projects/saazghar.jpg"
import saazghar2Img from "@/public/projects/saazghar2.jpg"
import taabaawiImg from "@/public/projects/taabaawi.jpg"
import taabaawi2Img from "@/public/projects/taabaawi2.jpg"
import axoraImg from "@/public/projects/axora.jpg"
import axora2Img from "@/public/projects/axora2.jpg"
import petloveImg from "@/public/projects/PetLove.jpg"
import petlove2Img from "@/public/projects/petlove2.jpg"
import wowcoupleImg from "@/public/projects/wowcouple.webp"
import wowcouple2Img from "@/public/projects/wowcouple2.webp"
import soliImg from "@/public/projects/soli.jpg"
import soli2Img from "@/public/projects/soli2.jpg"
import edubankImg from "@/public/projects/edubank.jpg"
import edubank2Img from "@/public/projects/edubank2.jpg"
import hamrahihubImg from "@/public/projects/hamrahihub.jpg"
import luckycampImg from "@/public/projects/luckycamp.webp"
import luckycamp2Img from "@/public/projects/luckycamp2.webp"

export type ProjectStat = {
  value: string
  label: string
}

export type Project = {
  slug: string
  title: string
  /** Short one-liner shown under the title. */
  tagline: string
  /** Pill label rendered on the card overlay. */
  cardType: string
  /** Gradient color used by the Card overlay. */
  cardColor: string
  /** Year shown above the project title on the detail page. */
  year?: string
  /** Exact timeframe shown next to the year on the detail page, e.g. "Jun 2026 – Jul 2026". */
  period?: string
  /** Preview image used by the home grid and the all-projects grid. */
  preview: StaticImageData
  /** Additional gallery shots rendered on the detail page. */
  gallery: StaticImageData[]
  /** Long-form description rendered on the detail page. */
  description: string
  /** Headline numbers rendered as a stat row on the detail page. */
  stats?: ProjectStat[]
  /** Key outcomes rendered as a list on the detail page. */
  highlights?: string[]
  /** Tech / scope tags rendered on the detail page. */
  tags: string[]
  github?: string
  site?: string
  /** Hugging Face model or space URL. */
  huggingFace?: string
  /** Optional LinkedIn post or announcement URL. */
  linkedInPost?: string
  /** Featured projects appear in the home page `ProjectsGrid`. */
  featured: boolean
}

/**
 * All projects. Used everywhere as the single source of truth.
 *
 * Array order is the display order for the `/projects` page and the "More Projects" carousel.
 * Featured home grid order is `FEATURED_PROJECTS` (not array order in `PROJECTS`).
 */
export const PROJECTS: Project[] = [
  {
    slug: "danai",
    title: "DanAi",
    tagline: "55M reasoning language model.",
    cardType: "Small Language Model",
    cardColor: "#2563eb",
    year: "2026",
    period: "Jun 2026 – Jul 2026",
    preview: danaiImg,
    gallery: [danai2Img],
    description:
      "DanAi (from the Urdu dānā, “wise”) is an open-source 54.5M-parameter small language model I designed and trained from scratch to bring step-by-step reasoning and tool use to edge hardware. I built the full stack myself: data preparation, a 32K-vocabulary BPE tokenizer, a decoder-only Transformer (12 layers, grouped-query attention, RoPE, SwiGLU), the training loop, optimization, checkpointing, evaluation, and quantized export. It reasons inside <think> tokens, emits structured tool calls, and ships as GGUF, Safetensors, and Ollama builds from 13 MB to 104 MB.",
    stats: [
      { value: "54.5M", label: "parameters, trained from scratch" },
      { value: "~3B", label: "training tokens" },
      { value: "1.5K+", label: "downloads on Hugging Face" },
      { value: "13–104 MB", label: "on-device footprint (INT2 → BF16)" },
    ],
    highlights: [
      "Beats OpenAI GPT-2 Small (124M) on ARC-Easy (39.2% vs 35.8%), ARC-Challenge (25.2% vs 21.4%) and MMLU (27.4% vs 26.2%) at less than half the size.",
      "Outperforms EleutherAI Pythia-70M on ARC-Challenge (25.2% vs 18.1%) and MMLU (27.4% vs 25.1%) while being 22% smaller.",
      "Chain-of-thought reasoning in <think> tokens plus native tool calling: structured JSON calls to a calculator and web search.",
      "Released quantized builds from GGUF Q2_K to BF16 and PyTorch INT2/INT4/INT8, with an Ollama Modelfile for one-command local runs at 300+ tokens/s.",
    ],
    tags: ["Python", "PyTorch", "Transformers", "Hugging Face", "Tokenization", "GGUF", "Ollama", "llama.cpp"],
    github: "https://github.com/Asjad-Ilahi/danAI-55M",
    huggingFace: "https://huggingface.co/asjadilahi/danAI-55M-Reasoning",
    featured: true,
  },
  {
    slug: "saazghar",
    title: "Saazghar",
    tagline: "AI pre-construction platform.",
    cardType: "AI Pre-Construction",
    cardColor: "#0f766e",
    year: "2026",
    period: "May 2025 – Feb 2026",
    preview: saazgharImg,
    gallery: [saazgharImg, saazghar2Img],
    description:
      "Saazghar turns natural-language prompts and 2D floor-plan images into editable, structured blueprints and 3D assets, then extracts materials and estimates quantities straight from the plan, with a template and vendor marketplace on top. I fine-tuned Qwen3.5-0.8B with Unsloth on roughly 120K structured blueprint examples, integrated Hunyuan3D-2mini for local prompt- and image-to-3D generation, and built the product on Next.js, Three.js, Python, Node.js, and Supabase.",
    stats: [
      { value: "~120K", label: "structured blueprint training examples" },
      { value: "0.8B", label: "Qwen3.5 model fine-tuned with Unsloth" },
      { value: "2D → 3D", label: "floor plan to editable 3D scene" },
    ],
    highlights: [
      "Prompt-to-blueprint and image-to-blueprint pipelines that output structured, editable plans instead of flat renders.",
      "Local 3D generation with Hunyuan3D-2mini, rendered and edited in a Three.js viewport.",
      "Material extraction and estimation workflows tied directly to the generated blueprint.",
      "Final-year project for my BS in Software Engineering at COMSATS University Islamabad.",
    ],
    tags: ["Python", "Unsloth", "Qwen", "Hunyuan3D", "Next.js", "Three.js", "Node.js", "Supabase", "Figma"],
    github: "https://github.com/Wahab-x78/saazghar-frontend",
    site: "https://saazghar.vercel.app",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_fyp-finalyearproject-softwareengineering-ugcPost-7460015978832089088-S9x6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "hamrahihub",
    title: "HumRahi Hub",
    tagline: "Web3 civic collaboration platform.",
    cardType: "Civic & Web3",
    cardColor: "#0d9488",
    year: "2025",
    period: "Oct 2025 – Dec 2025",
    preview: hamrahihubImg,
    gallery: [hamrahihubImg],
    description:
      "HumRahi Hub turns local problems into structured community action. Members raise an issue, the community debates and votes on proposals, and donations sit in a dedicated smart wallet for that issue, released in milestone-based tranches only after proof of work is submitted. Built with Next.js and Node.js, Privy for embedded auth and smart wallets, and USDC on Base Sepolia so every contribution is transparent on-chain.",
    stats: [
      { value: "1st", label: "place, AI Pakistan AWKUM AGORA 2026" },
      { value: "USDC", label: "on Base Sepolia, per-issue smart wallets" },
    ],
    highlights: [
      "Won 1st place at the AI Pakistan AWKUM AGORA 2026 hackathon for the concept and implementation.",
      "Proposals, voting, and proof submission gate every milestone-based fund release.",
      "Privy smart wallets give each issue its own traceable treasury without crypto onboarding friction.",
    ],
    tags: ["Next.js", "Node.js", "Privy", "Smart Wallets", "Base Sepolia", "USDC", "Figma", "UI/UX"],
    github: "https://github.com/Asjad-Ilahi/humrahiHub",
    site: "https://humrahihub.vercel.app",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_%F0%9D%90%96%F0%9D%90%9E-%F0%9D%90%96%F0%9D%90%A8%F0%9D%90%A7-1%F0%9D%90%AC%F0%9D%90%AD-%F0%9D%90%8F%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%9C%F0%9D%90%9E-%F0%9D%90%9A%F0%9D%90%AD-%F0%9D%90%AD%F0%9D%90%A1-ugcPost-7453397475022819328-yZDh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "petlove",
    title: "PetLove",
    tagline: "Pet care marketplace, Kuwait.",
    cardType: "Pet Care App",
    cardColor: "#db2777",
    year: "2025",
    period: "Feb 2025 – Jun 2025",
    preview: petloveImg,
    gallery: [petloveImg, petlove2Img],
    description:
      "PetLove is a single-vendor marketplace for pet food and accessories in Kuwait: catalog browsing with categories and filters, secure checkout, coupons, multilingual copy, delivery tracking, order history, and in-app chat for support. Built with Flutter and Dart across web and desktop (with mobile store rollouts underway), Firebase for realtime data and product infrastructure, and Laravel with PHP powering commerce APIs, payments, and operational tooling behind the scenes.",
    tags: ["Flutter", "Dart", "Laravel", "PHP", "Firebase", "UI/UX", "Figma", "Google Play"],
    site: "https://petlovekw.com",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_flutter-applaunch-petlove-ugcPost-7289981228722597891-X8t3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: true,
  },
  {
    slug: "taabaawi",
    title: "Taabaawi",
    tagline: "Tactical gear marketplace, Kuwait.",
    cardType: "E-commerce",
    cardColor: "#ca8a04",
    year: "2025",
    period: "Jul 2025 – Sep 2025",
    preview: taabaawiImg,
    gallery: [taabaawi2Img],
    description:
      "Taabaawi is a bilingual (Arabic and English) marketplace for tactical and outdoor gear in Kuwait, live on the web with a Flutter mobile app. I built it full-stack with Flutter, Next.js, Firebase, and Laravel: product catalog and categories, cart, orders, authentication, and checkout, with third-party delivery APIs integrated so orders flow straight into fulfilment.",
    highlights: [
      "Reusable product, cart, order, and account flows shared across the web and mobile clients.",
      "Delivery API integration connecting checkout to third-party logistics.",
      "Right-to-left Arabic layout with an English toggle.",
    ],
    tags: ["Flutter", "Dart", "Next.js", "Firebase", "Laravel", "PHP", "REST APIs"],
    site: "https://taabaawi.com",
    featured: false,
  },
  {
    slug: "soli",
    title: "Soli",
    tagline: "Finance app",
    cardType: "Finance app",
    cardColor: "#0ea5e9",
    year: "2025",
    preview: soliImg,
    /** Detail page gallery below hero — second artboard. */
    gallery: [soli2Img],
    description:
      "Soli is a finance-focused product for invoicing, lightweight KYC checks, and day-to-day money workflows—think clear balances, audit-friendly records, and flows that keep operators and customers aligned. The experience is being refined in real-device testing on iOS while the web surface ships on Next.js and Node.js, with a Flutter build for mobile and Figma-led UI polish across breakpoints.",
    tags: ["Flutter", "Dart", "Next.js", "Node.js", "UI/UX", "Figma", "App Store"],
    site: "https://soli-landing.vercel.app",
    linkedInPost:
      "https://www.linkedin.com/posts/asjad-ilahi_uidesign-uxdesign-figma-ugcPost-7367268235005607937-snaD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvBu0IBD92xPRjKd0pCzLX-GU7skdheHIw",
    featured: false,
  },
  {
    slug: "axora",
    title: "Axora",
    tagline: "Modern product experience.",
    cardType: "Web Application",
    cardColor: "#1d4ed8",
    year: "2025",
    preview: axoraImg,
    gallery: [axoraImg, axora2Img],
    description: "A focused product build with a clean UI, fast performance, and a UX tuned for conversion. Full case study coming soon.",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    featured: false,
  },
  {
    slug: "wowcouple",
    title: "WowCouple",
    tagline: "Matrimony app",
    cardType: "Matrimony app",
    cardColor: "#9333ea",
    year: "2024",
    preview: wowcoupleImg,
    gallery: [wowcoupleImg, wowcouple2Img],
    description:
      "A consumer platform built around couples and wedding planning — curated vendors, planning tools, and a calm visual system. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "UI/UX"],
    featured: false,
  },
  {
    slug: "edubank",
    title: "EduBank",
    tagline: "Knowledge bank for learners.",
    cardType: "Education Platform",
    cardColor: "#f59e0b",
    year: "2024",
    preview: edubankImg,
    gallery: [edubankImg, edubank2Img],
    description: "A learning-focused product with structured content, search, and a friendly study experience. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    slug: "luckycamp",
    title: "LuckyCamp",
    tagline: "Outdoor and camping experiences.",
    cardType: "Travel / Outdoor",
    cardColor: "#16a34a",
    year: "2023",
    preview: luckycampImg,
    gallery: [luckycampImg, luckycamp2Img],
    description: "Discovery and booking flows for camps and outdoor experiences with a clean, photo-led UI. Full case study coming soon.",
    tags: ["Next.js", "Node.js", "UI/UX"],
    featured: false,
  },
]

/** Featured projects on the home `ProjectsGrid` — explicit order: 1 DanAi, 2 Saazghar, 3 HumRahi Hub, 4 PetLove. */
export const FEATURED_PROJECTS: Project[] = (["danai", "saazghar", "hamrahihub", "petlove"] as const)
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is Project => p != null)

/** Lookup by slug. */
export const getProjectBySlug = (slug: string): Project | undefined => PROJECTS.find((p) => p.slug === slug)
