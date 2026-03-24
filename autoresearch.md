# Autoresearch: Reduce Client-Side Bundle Size

## Objective

Reduce the total gzipped client-side JavaScript bundle size of this Next.js + Payload CMS blog application without affecting end-user behavior. The current bundle is 1.8 MB gzipped (5.7 MB raw), which is heavy for a blog. Key optimization targets include the motion library (always loaded), icon libraries, calendar/carousel components, and large inline SVGs.

## Metric

- **Primary**: total gzipped client JS (bytes) — lower is better
- **Secondary**: build must compile successfully; no visual or functional regressions

## Command

```bash
./autoresearch.sh
```

## Checks Command

```bash
./autoresearch.checks.sh
```

## Files in Scope

- `src/components/**`
- `src/app/(frontend)/**`
- `src/assets/**`
- `src/utils/**`
- `src/app/lenis.tsx`
- `package.json`
- `next.config.ts`

## Off Limits

- `src/app/(payload)/**` (CMS admin — separate route group)
- `src/collections/**` (CMS schemas — server only)
- `src/migrations/**` (DB migrations)
- `src/payload.config.ts` (CMS config)
- `src/endpoints/**` (server-only endpoints)

## Constraints

- No behavior changes for end users
- All visual/functional behavior preserved
- Build must compile successfully
- Payload CMS admin must remain functional

## Baseline

- **Value**: 1,858,622 bytes (1,815.0 KB gzipped)
- **Date**: 2026-03-24

## What's Been Tried

- **Run #6**: Simplify globe.json (precision + strip) — **KEPT: 1,858,622 → 1,732,495 (6.8%)**
- **Run #8**: Globe.json 0dp precision — **KEPT: → 1,712,980 (1.1%)**
- **Run #9**: Deduplicate consecutive coords — **KEPT: → 1,711,899 (0.1%)**
- **Run #15**: Footer + Logo → server components — **KEPT: → 1,690,636 (1.2%)**
- **Run #16**: BlogCard + StatusTag → server components — **KEPT: → 1,686,976 (0.2%)**
- Runs #2-5,7,10-14,17: Various attempts that were discarded (see Dead Ends)

## Current Best

- **Value**: 1,686,976 bytes (1,647.4 KB gzipped)
- **Total bundle improvement**: 171,646 bytes (9.2%)

## Loading Performance Improvements (non-bundle)

- **Run #18**: BlogMeta featured image priority={true} (fixes LCP), nav-submenu images lazy
- **Run #20**: Strip content/seo/excerpt from home page RSC payload (reduces RSC transfer)

## Dead Ends

- Tree-shaken dependency removal (date-fns, lucide-react) has no effect
- optimizePackageImports — no effect, Next.js already optimizes
- Dynamic imports don't reduce total JS, just rearrange chunks
- Direct module imports vs barrel exports — no difference
- Webpack optimization flags — all already enabled
- Removing motion from frontend — only 4.7 KB gain, loses layout animation
