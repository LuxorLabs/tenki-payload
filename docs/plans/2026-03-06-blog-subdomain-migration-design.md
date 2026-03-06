# Blog Subdomain Migration Design

## Goal

Serve the Payload CMS blog at `blog.tenki.cloud` with flat URLs (`/my-post` instead of `/blog/my-post`).

## Approach

Move route files from `src/app/(frontend)/blog/` up to `src/app/(frontend)/` so the file structure matches the desired URL structure. No middleware or rewrites needed.

## Route Changes

| Current Path | New Path | File Move |
|---|---|---|
| `/` (welcome page) | removed | Replace with blog listing |
| `/blog` | `/` | `blog/page.tsx` → `page.tsx` |
| `/blog/[slug]` | `/[slug]` | `blog/[slug]/` → `[slug]/` |
| `/blog/category/[slug]` | `/category/[slug]` | `blog/category/` → `category/` |
| `/blog/tag/[slug]` | `/tag/[slug]` | `blog/tag/` → `tag/` |
| `/admin` | `/admin` | No change |

## File Changes

1. Move contents of `src/app/(frontend)/blog/` up to `src/app/(frontend)/`
2. Replace `src/app/(frontend)/page.tsx` (welcome page) with blog listing
3. Merge `blog/layout.tsx` Nav/Footer into `(frontend)/layout.tsx` if needed
4. Update `/blog/...` references in:
   - `src/collections/Posts.ts`
   - `src/components/blog/BlogCard.tsx`
   - Any category/tag link components
5. Update `NEXT_PUBLIC_SITE_URL` to `https://blog.tenki.cloud`

## Cloudflare Setup (manual)

- Add CNAME: `blog` → `tenki-blog.<account>.workers.dev`
- Add custom domain route in Workers dashboard

## Risks

- `[slug]` dynamic route could conflict with other `(frontend)` routes, but admin is in a separate `(payload)` group and category/tag are explicit paths, so no conflict.
