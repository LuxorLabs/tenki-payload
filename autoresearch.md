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

(none yet)

## Dead Ends

(none yet)
