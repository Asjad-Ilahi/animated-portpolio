# Asjad Ilahi — Portfolio

Personal portfolio of **Asjad Ilahi**, AI Engineer (Huawei MTO) and software product developer.

Live: [asjadilahi.vercel.app](https://asjadilahi.vercel.app)

## Stack

- Next.js 16 (App Router, every page statically prerendered) + React 19
- Tailwind CSS v4
- Motion + GSAP for scroll and card animations
- Geist Sans / Geist Mono via `next/font`

## Editing content

| What | Where |
| --- | --- |
| Name, title, SEO, social profiles, nav | `config/siteConfig.ts` |
| Projects (cards + `/projects/[slug]` case studies) | `app/data/projects.ts` |
| Experience, education, recognition | `app/components/ExperienceSection.tsx` |
| About copy and stats | `app/components/AboutSectionV2.tsx` |
| Services stack | `app/components/ServicesSectionCardSwap.tsx` |
| FAQ | `app/components/FaqCtaSection.tsx` |
| Testimonial | `app/data/review-data.ts` |

Project images live in `public/projects/`. The four home-page cards are chosen by `FEATURED_PROJECTS` in `app/data/projects.ts`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Environment variables (optional)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID. Clarity is off when unset. |
