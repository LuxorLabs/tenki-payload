/**
 * Production blog seed data scraped from https://tenki.cloud/blog
 * Last updated: 2026-03-25
 *
 * This file contains all blog content needed to replicate the production blog 1:1.
 * Used by seed.ts to populate the Payload CMS database via the local API.
 */

// ─── Authors ────────────────────────────────────────────────────────────────

export const authors = [
  {
    name: 'Eddie Wang',
    email: 'eddie@tenki.cloud',
    role: 'engineering' as const,
    socialLinks: {
      twitter: 'https://x.com/eddiewang',
      github: 'https://github.com/eddiewang',
    },
    avatar: {
      filename: 'eddie-av.webp',
      alt: 'Eddie Wang avatar',
      sourceUrl: 'https://assets.blog.tenki.cloud/eddie-av.webp',
    },
  },
  {
    name: 'Marina Rivosecchi',
    email: 'marina.rivosecchi@tenki.cloud',
    role: 'marketing' as const,
    socialLinks: {
      twitter: 'https://x.com/marinarivosec',
      linkedin: 'https://www.linkedin.com/in/marina-rivosecchi/',
    },
    avatar: {
      filename: 'marina-avatar.jpeg',
      alt: 'Marina Rivosecchi avatar',
      sourceUrl: 'https://assets.blog.tenki.cloud/marina-avatar.jpeg',
    },
  },
  {
    name: 'Hayssem Vazquez-Elsayed',
    email: 'hayssem@tenki.cloud',
    role: 'product' as const,
    socialLinks: {},
    avatar: {
      filename: 'hayssem-avatar.png',
      alt: 'Hayssem Vazquez-Elsayed avatar',
      sourceUrl: 'https://assets.blog.tenki.cloud/hayssem-avatar.png',
    },
  },
]

// ─── Categories ─────────────────────────────────────────────────────────────

export const categories = [
  {
    name: 'AI Code Review',
    slug: 'ai-code-review',
    description: 'AI-powered code review tools, techniques, and best practices',
  },
  {
    name: 'Code Quality',
    slug: 'code-quality',
    description: 'Software quality practices, review processes, and engineering standards',
  },
  {
    name: 'CI/CD',
    slug: 'ci-cd',
    description: 'Continuous integration and continuous delivery workflows, pipelines, and tooling',
  },
]

// ─── Tags ───────────────────────────────────────────────────────────────────

export const tags = [
  { name: 'AI Code Review', slug: 'ai-code-review' },
  { name: 'Code Quality', slug: 'code-quality' },
  { name: 'Engineering Metrics', slug: 'engineering-metrics' },
  { name: 'ROI', slug: 'roi' },
  { name: 'CI/CD', slug: 'ci-cd' },
  { name: 'Developer Experience', slug: 'developer-experience' },
  { name: 'GitHub Actions', slug: 'github-actions' },
  { name: 'Ubuntu', slug: 'ubuntu' },
  { name: 'Runner Images', slug: 'runner-images' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Monorepo', slug: 'monorepo' },
  { name: 'Turborepo', slug: 'turborepo' },
  { name: 'Nx', slug: 'nx' },
  { name: 'Cost Optimization', slug: 'cost-optimization' },
  { name: 'Security', slug: 'security' },
  { name: 'Supply Chain Security', slug: 'supply-chain-security' },
  { name: 'SLSA', slug: 'slsa' },
  { name: 'SBOM', slug: 'sbom' },
  { name: 'Merge Queue', slug: 'merge-queue' },
  { name: 'GITHUB_TOKEN', slug: 'github-token' },
  { name: 'OpenID Connect', slug: 'openid-connect' },
  { name: 'Tenki', slug: 'tenki' },
  { name: 'Custom Actions', slug: 'custom-actions' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Container Registry', slug: 'container-registry' },
  { name: 'Caching', slug: 'caching' },
  { name: 'OIDC', slug: 'oidc' },
]

// ─── Featured Images ────────────────────────────────────────────────────────

export const featuredImages = [
  {
    filename: 'Measuring AI Code Review ROI the Right Way.png',
    alt: 'Measuring AI Code Review ROI the Right Way',
    sourceUrl: 'https://assets.blog.tenki.cloud/Measuring%20AI%20Code%20Review%20ROI%20the%20Right%20Way.png',
  },
  {
    filename: 'PR Review and CI Are Two Different Systems.png',
    alt: 'Diagram illustrating the difference between pull request review and CI systems, showing how code review and automated testing workflows operate separately',
    sourceUrl:
      'https://assets.blog.tenki.cloud/PR%20Review%20and%20CI%20Are%20Two%20Different%20Systems.png',
  },
  {
    filename: 'ubuntu-latest is Ubuntu 24.04_ What to Audit.png',
    alt: 'Guide on auditing changes when ubuntu-latest updates to Ubuntu 24.04 in CI environments',
    sourceUrl:
      'https://assets.blog.tenki.cloud/ubuntu-latest%20is%20Ubuntu%2024.04_%20What%20to%20Audit.png',
  },
  {
    filename: 'GitHub Agentic Workflows Explained.png',
    alt: 'Explanation of GitHub agentic workflows and how autonomous agents automate development tasks',
    sourceUrl:
      'https://assets.blog.tenki.cloud/GitHub%20Agentic%20Workflows%20Explained.png',
  },
  {
    filename: 'Monorepo CI with GitHub Actions_ Selective Builds Done Right.png',
    alt: 'Guide to optimizing monorepo CI with GitHub Actions using selective builds for efficiency',
    sourceUrl:
      'https://assets.blog.tenki.cloud/Monorepo%20CI%20with%20GitHub%20Actions_%20Selective%20Builds%20Done%20Right.png',
  },
  {
    filename: 'GitHub_Actions_Cost_Optimization_Cut_Your_Billable_Minutes_by_40-70.png',
    alt: 'Visual guide on GitHub Actions cost optimization, showing strategies to reduce billable CI/CD minutes by 40-70%',
    sourceUrl:
      'https://assets.blog.tenki.cloud/GitHub_Actions_Cost_Optimization_Cut_Your_Billable_Minutes_by_40-70.png',
  },
  {
    filename: 'GitHub Actions Artifact Attestations_ SLSA Provenance and Supply Chain Defaults.png',
    alt: 'Overview of GitHub Actions artifact attestations, SLSA provenance, and supply chain security defaults',
    sourceUrl:
      'https://assets.blog.tenki.cloud/GitHub%20Actions%20Artifact%20Attestations_%20SLSA%20Provenance%20and%20Supply%20Chain%20Defaults.png',
  },
  {
    filename: 'GitHub Merge Queue in 2026.png',
    alt: 'Diagram showing GitHub Actions using merge queue for handling flaky required status checks',
    sourceUrl:
      'https://assets.blog.tenki.cloud/GitHub%20Actions%20OIDC%20Custom%20Properties_%20ABAC%20Cloud%20Access.png',
  },
  {
    filename: 'GitHub Actions Permissions_ Lock Down GITHUB_TOKEN.png',
    alt: 'Guide on securing GitHub Actions by locking down GITHUB_TOKEN permissions',
    sourceUrl:
      'https://assets.blog.tenki.cloud/GitHub%20Actions%20Permissions_%20Lock%20Down%20GITHUB_TOKEN.png',
  },
  {
    filename: 'AI Made Writing Code Cheap. Judgment Didn\u2019t Scale.png',
    alt: 'Illustration showing how AI reduces the cost of writing code but human judgment in reviewing it does not scale',
    sourceUrl:
      'https://assets.blog.tenki.cloud/AI%20Made%20Writing%20Code%20Cheap.%20Judgment%20Didn%E2%80%99t%20Scale.png',
  },
  {
    filename: 'Custom GitHub Actions_ JavaScript, Docker, and Composite.png',
    alt: 'Guide to creating custom GitHub Actions using JavaScript, Docker, and composite actions',
    sourceUrl:
      'https://assets.blog.tenki.cloud/Custom%20GitHub%20Actions_%20JavaScript,%20Docker,%20and%20Composite.png',
  },
  {
    filename: 'Build and Push Docker Images with GitHub Actions.png',
    alt: 'Guide showing how to build and push Docker images using GitHub Actions workflows',
    sourceUrl:
      'https://assets.blog.tenki.cloud/Build%20and%20Push%20Docker%20Images%20with%20GitHub%20Actions.png',
  },
]

// ─── Posts ───────────────────────────────────────────────────────────────────

export interface PostSeedData {
  title: string
  slug: string
  excerpt: string
  status: 'published'
  publishedAt: string
  readingTime: number
  /** Author email — resolved to author ID at seed time */
  authorEmail: string
  /** Category slug — resolved to category ID at seed time */
  categorySlug: string
  /** Tag slugs — resolved to tag IDs at seed time */
  tagSlugs: string[]
  /** Index into featuredImages array */
  featuredImageIndex: number
  seo: {
    metaTitle?: string
    metaDescription?: string
    noIndex: boolean
    keywords: string[]
  }
  /**
   * Full article content as markdown-like text.
   * The seed script converts this to Lexical JSON at insertion time.
   */
  content: string
}

export const posts: PostSeedData[] = [
  // ── 1. Measuring AI Code Review ROI the Right Way ───────────────────────
  {
    title: 'Measuring AI Code Review ROI the Right Way',
    slug: 'ai-code-review-roi-metrics',
    excerpt:
      'Most teams adopt AI code review tools without baselines, making ROI impossible to measure. Here\u2019s a framework for tracking defect escape rates, review time, and the metrics that actually matter.',
    status: 'published',
    publishedAt: '2026-03-24T00:00:00.000Z',
    readingTime: 14,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ai-code-review',
    tagSlugs: ['ai-code-review', 'code-quality', 'engineering-metrics', 'roi'],
    featuredImageIndex: 0,
    seo: {
      metaDescription:
        'Most teams adopt AI code review tools without baselines, making ROI impossible to measure. A framework for tracking defect escape rates and review time.',
      noIndex: false,
      keywords: ['AI code review', 'ROI', 'defect escape rate', 'engineering metrics'],
    },
    content: `## TL;DR

Most teams adopt AI code review tools without baselines, making ROI impossible to measure. Framework for tracking defect escape rates, review time, and outcome metrics is essential.

Your team just rolled out an AI code review tool. Two months later, someone asks: "Is it working?" Nobody can answer, because nobody measured anything before turning it on.

This happens constantly. Teams adopt AI review tools because demos look compelling and vendors quote impressive accuracy numbers. But accuracy on benchmarks doesn't indicate whether the tool catches real bugs in your codebase, or whether reviewers trust it enough to act on suggestions. Without baselines, you're flying blind.

Here's a practical framework for measuring what actually matters, from defect escape rates to reviewer cognitive load, so you can determine whether your AI code review investment is paying off or just generating noise.

## The Metrics That Actually Matter

Most AI code review vendors showcase "comments generated per PR" or "lines of code scanned." These are vanity metrics measuring activity, not outcomes. A tool leaving 47 comments on every pull request isn't necessarily catching bugs\u2014it might be drowning reviewers in nitpicks about import ordering.

Four metrics actually tell you whether AI review makes your team better at shipping reliable software:

### 1. Defect escape rate

This matters most. Defect escape rate measures how many bugs make it past code review and into production (or staging). Calculate it as: (post-release defects / total defects found) \u00d7 100%.

If your defect escape rate was 35% before AI review and drops to 22% after a month, that's a real signal. If it stays flat or climbs, the tool isn't catching the bugs that matter.

Track this by tagging bugs in your issue tracker with discovery location: in review, in QA, in staging, or in production. You probably should have been doing this already, AI tool or not.

### 2. Mean time to first review

One legitimate promise of AI code review is faster feedback loops. If a bot flags obvious issues within seconds of a PR opening, the human reviewer spends less time on mechanical checks and can focus on architecture, logic, and design.

Measure the time from PR creation to the first substantive review comment (human or bot). Then separately track how long it takes for a human reviewer to leave their first comment. If AI review consistently provides useful initial feedback within minutes, you should see human reviewers starting their reviews faster too, because the easy stuff is already flagged.

Watch for the opposite effect, though. If AI comments are noisy, human reviewers may start ignoring the PR until the bot finishes spamming, which actually increases time to first human review.

### 3. False positive ratio

This metric determines whether your team will keep using the tool or silently start ignoring it. False positive ratio is the percentage of AI-generated review comments that get dismissed, resolved without action, or explicitly marked as unhelpful.

A false positive rate above 30-40% is a serious problem. Developers build habits quickly. If more than a third of AI comments are wrong or irrelevant, reviewers stop reading them. Once that trust erodes, even the tool's genuinely useful findings get ignored. You've created a boy-who-cried-wolf dynamic in your review workflow.

Track this by adding simple thumbs-up/thumbs-down reaction conventions on AI comments, or by monitoring which AI suggestions lead to code changes versus which get dismissed.

### 4. Reviewer cognitive load

This one's harder to quantify but arguably just as important. Cognitive load is about how much mental effort your reviewers spend per PR. You can approximate it through proxy measurements: total review time per PR, number of review passes before approval, and the ratio of human comments to AI comments (are humans supplementing the AI's findings or duplicating them?).

The goal is for AI to reduce cognitive load by handling mechanical checks (null pointer risks, missing error handling, unused imports) so humans can focus on higher-order concerns. If total review time per PR goes up after adopting AI review, something's wrong. Either the AI is creating more work by generating noise, or reviewers are spending time evaluating AI suggestions instead of reviewing the actual code.

A quick developer survey every quarter can fill in what the numbers miss. Ask reviewers directly: "Does the AI tool make reviews easier, harder, or about the same?" The qualitative signal matters.

## Baseline Before You Roll Out

The single biggest mistake teams make is skipping the baseline. You can't measure improvement without a starting point. Retrofitting a baseline after the tool is already running is unreliable at best.

Before enabling the AI review tool on any repos, spend two to four weeks collecting data on your current review process. Here's what to capture:

- **Defect escape rate** over the prior 90 days. Pull bug reports from your issue tracker and classify each by where it was caught.
- **Mean time to first review** across all PRs. Most Git platforms expose this in their API or analytics dashboards.
- **Review cycles per PR**: how many rounds of review before merge? If a PR typically gets approved in one pass versus three, that tells you a lot about your current review effectiveness.
- **Reviewer satisfaction**: a short survey (5 questions, takes 2 minutes) asking reviewers how they feel about the current process. You'll want this as a reference point.
- **Code churn rate**: the percentage of lines changed within two weeks of being written. GitClear's research on 211 million changed lines found code churn roughly doubled between 2021 and 2024 as AI coding assistants gained adoption. Your own churn baseline matters because it reflects the code quality your team produces before AI review enters the picture.

Collect this data for at least two full sprint cycles. One sprint isn't enough; you need to account for variation between feature work, bug fixes, and refactoring sprints.

## Vanity Metrics vs. Outcome Metrics

AI code review vendors have a strong incentive to steer you toward metrics that make their tool look good. Here's how to tell the difference.

**Vanity metrics** measure tool activity: comments generated, lines scanned, PRs analyzed, suggestions offered. They go up and to the right no matter what. A tool that flags every single line of code as potentially problematic would score perfectly on these metrics while being completely useless.

**Outcome metrics** measure what changed in your engineering process: fewer bugs reaching production, faster review cycles, lower reviewer fatigue. These can go down, which is why vendors don't highlight them.

Here's a quick reference for which is which:

- "AI left 200 comments this week" \u2192 vanity. Says nothing about whether any of them were right.
- "AI caught 4 bugs that would have reached production" \u2192 outcome. Now you're talking.
- "Scanned 50,000 lines of code" \u2192 vanity. A linter does the same thing.
- "Review cycle time dropped from 26 hours to 18 hours" \u2192 outcome. That's measurable throughput improvement.
- "85% suggestion acceptance rate" \u2192 depends. If "accepted" means the reviewer clicked a button rather than actively implementing the change, it's vanity. If it means the suggestion led to a code change, it's closer to outcome.

## The Pre/Post Measurement Framework

Here's a concrete timeline for measuring AI code review ROI in your organization.

### Weeks 1: Baseline snapshot

Pull existing metrics from your Git platform API, time-to-review, defect escape rates, bug discovery stages. Run a quick developer survey. One week of historical data plus API pulls is enough to establish a baseline.

### Weeks 2-3: Pilot rollout

Enable the AI tool on two or three repos, keep the rest as controls. Track the same baseline metrics plus false positive ratio and suggestion acceptance rate. Have devs flag AI comments as helpful/unhelpful with emoji reactions.

### Weeks 4: First comparison

Compare pilot repos against baseline and control repos across your core metrics. Re-run the developer survey. You're looking for directionality\u2014are things trending the right way? Two weeks of pilot data won't move defect escape rates dramatically, but you'll see signals in review speed, false positive rates, and developer sentiment.

### Week 4+: Expand or cut

Promising data? Roll out broadly and keep measuring. Ambiguous? Extend the pilot another two weeks. Clearly negative? Cut the tool. That's a valid, data-backed conclusion.

## What Teams That Measured Found

The patterns from teams that actually measured before and after tend to cluster around a few recurring themes.

**AI review catches different bugs than humans.** The most consistent finding is that AI tools are good at spotting mechanical issues: null reference risks, missing error handling, race conditions in well-known patterns, and security anti-patterns like SQL injection vectors. They're much weaker at catching logic errors, business rule violations, and architectural problems. This makes them genuinely complementary to human review when the false positive rate is manageable.

**Time-to-first-review improves, but total merge time often doesn't.** Developers get faster initial feedback, which is real value. But the total time from PR creation to merge often stays about the same, because the bottleneck was never "waiting for someone to spot a null check." It was waiting for a human with the right context to evaluate the overall approach.

**The biggest ROI shows up in large, distributed teams.** Teams spread across time zones see the most benefit, because AI review provides instant feedback during off-hours when human reviewers aren't available. A developer in Singapore opening a PR at 4 PM their time doesn't have to wait until their London colleagues wake up to get initial feedback. For co-located teams working the same hours, the speed advantage is less significant.

**Configuration quality determines everything.** Teams that invested time configuring their AI review tool (suppressing noisy rule categories, tuning severity thresholds, adding custom rules for their domain) saw dramatically better results than teams that turned it on with default settings. The out-of-box experience for most tools is mediocre at best. You should budget real engineering time for configuration and tuning, not just flip a switch and hope.

## When AI Review Is Net Negative

Not every team benefits from AI code review, and pretending otherwise doesn't help anyone. There are clear patterns where AI review becomes a net drag on your team.

**High false positive rates erode trust.** Once developers learn to ignore AI comments, they don't selectively start reading them again when the tool improves. The damage compounds. Teams that hit a 50%+ false positive rate in the first two weeks of a pilot tend to never recover engagement with the tool, even after tuning.

**Alert fatigue cascades into human review quality.** This is the insidious one. When a PR has 30 AI comments on it, human reviewers start skimming the whole PR, not just the AI comments. The cognitive overhead of distinguishing signal from noise contaminates the entire review. Counterintuitively, adding AI review can make human reviewers less thorough.

**It creates a false sense of security.** This one's the hardest to measure but the most dangerous. If your team starts thinking "the AI will catch it," they may unconsciously reduce their own review rigor. You might see this show up as shorter review sessions, fewer human comments per PR, or faster approvals. All of which look like efficiency gains until defect escape rate climbs.

GitClear's research found that code churn (lines reverted or substantially rewritten within two weeks) has been trending upward as AI coding tools see wider adoption. Their analysis of 211 million changed lines showed churn projected to double from its 2021 baseline. AI review tools are supposed to counteract this trend by catching low-quality code before it merges. If your churn rate isn't improving after adopting AI review, the tool may not be examining the right things.

## Building the ROI Calculation

Once you have baseline and post-rollout data, you can build an actual ROI calculation. The formula isn't complicated, but it requires honest inputs.

On the cost side, include the tool's license fees, engineering time spent on initial configuration and ongoing tuning, any increase in CI minutes from the tool running on every PR, and the cognitive cost of false positives (estimated as: false positive rate \u00d7 average time to evaluate a comment \u00d7 number of comments per week).

On the benefit side, estimate the value of bugs caught before production. One common approach: multiply the number of escaped defects prevented by the average cost of a production incident at your organization. If your average production bug takes 4 hours of engineering time to diagnose, fix, and deploy, and the AI tool prevents 3 such bugs per month, that's 12 hours of engineering time saved. Compare that against the total cost of the tool.

Don't forget the second-order costs. If the tool generates enough false positives that reviewers spend 20 minutes per day evaluating and dismissing AI comments, that's about 7 hours per reviewer per month. For a team of eight, that's 56 hours. If the tool's license costs $500/month but it costs your team 56 hours of engineering time in false positive overhead, the math doesn't work regardless of how many bugs it catches.

## Making the Decision

The whole point of this framework is to replace gut feelings with data. After 12 weeks of structured measurement, you should be able to answer three questions:

1. Is the tool catching bugs that humans were missing? (Defect escape rate)
2. Is it making the review process faster or slower? (Time to review, total merge time)
3. Do your developers trust it? (False positive ratio, survey responses)

If you get a clear yes on all three, expand the rollout. If it's mixed, invest in tuning before expanding. And if the tool fails on two or more, drop it. The worst outcome is paying for a tool that makes your reviews worse while everyone assumes it's helping because nobody's looking at the data.`,
  },

  // ── 2. PR Review and CI Are Two Different Systems ───────────────────────
  {
    title: 'PR Review and CI Are Two Different Systems',
    slug: 'pr-review-ci-two-different-systems',
    excerpt:
      'CI validates what the code does. Review validates what the code means. Conflating them is why bugs pass both gates undetected.',
    status: 'published',
    publishedAt: '2026-03-20T00:00:00.000Z',
    readingTime: 9,
    authorEmail: 'marina.rivosecchi@tenki.cloud',
    categorySlug: 'ai-code-review',
    tagSlugs: ['code-quality', 'ai-code-review', 'ci-cd', 'developer-experience'],
    featuredImageIndex: 1,
    seo: {
      metaDescription:
        'CI validates what the code does. Review validates what the code means. Conflating them is why bugs pass both gates undetected.',
      noIndex: false,
      keywords: ['code review', 'CI/CD', 'AI code review', 'developer experience'],
    },
    content: `## TL;DR

CI validates what the code does. Review validates what the code means. Conflating them is why bugs pass both gates undetected.

Every pull request passes through two distinct gates before reaching main. CI executes tests, linters, and type checks. A reviewer examines the diff, provides feedback, and approves. Both serve quality purposes but address fundamentally different problem categories.

## What CI Actually Checks

CI operates as a deterministic system accepting inputs and producing binary outputs. Tests either pass or fail; types either check or don't; linters approve or reject.

CI excels at:

- Correctness against known test cases
- Type safety and interface matching
- Style enforcement via linters
- Security scanning and dependency audits
- Build artifact verification

All require boolean answers independent of business context.

## What Review Actually Checks

Code review functions as a judgment system, producing opinions about change quality and necessity.

Human reviewers evaluate:

- Design intent and abstraction boundaries
- Semantic correctness (code compiles but solves wrong problem)
- Future maintenance costs and readability
- Missing edge cases and error handling
- Organizational knowledge from prior attempts

These resist pass/fail reduction; they require understanding team goals and codebase history.

## The Overlap Gap

While narrow overlaps exist, significant dangers lurk between systems. A PR can pass all tests, type checks, and linting while introducing problematic caching under concurrent writes. This "semantic bug" remains invisible to CI by design.

## Automating Review Inside CI: A Category Error

The industry repeatedly embeds AI review in CI pipelines as GitHub Actions or pipeline steps, producing binary pass/fail results.

Problems arise:

- **False confidence:** Developers trust green CI, missing contextual issues
- **Trust erosion:** High-signal noise generates mountains of dismissible comments
- **Wrong failure model:** Binary review blocks don't accommodate nuance
- **Pipeline slowdown:** LLM evaluation adds significant latency

Microsoft's internal approach proves instructive: their AI-powered tool operates separately, leaving comments like humans rather than blocking merges\u2014enabling context-aware review without deterministic constraints.

## Scale Problem Amplification

Per Faros AI data covering 10,000+ developers across 1,255 teams, high-AI-adoption teams complete 21% more tasks and merge 98% more PRs. However, "PR review time increased by 91%."

Volume explodes while review doesn't scale computationally. Industry responses automating review into CI eliminate judgment-based review entirely, creating two CI systems with zero review.

## Architectural Separation

If CI and review solve different problems, they require separate systems.

**CI should:**
- Run quickly (minutes)
- Produce unambiguous pass/fail results
- Block merges on failure
- Cover tests, types, linting, security, build verification
- Never generate opinions

**Review should:**
- Operate conversationally, not as gates
- Maintain codebase context and team pattern knowledge
- Focus on design, semantics, implications
- Remain silent when nothing meaningful surfaces
- Never slow pipelines

Tenki positions its AI review outside CI pipelines, providing codebase-level context without deterministic constraints.

## Maximum-Signal Structure

**Move deterministic checks into CI.** If humans spend review cycles on formatting or type errors, strengthen CI. Linters, type checkers, security scanners should catch mechanical issues.

**Don't make review binary like CI.** CI failures are objective; review comments are subjective arguments. Review should be mandatory but non-blocking, allowing follow-up PRs for author responses.

**Use AI as force multiplier.** AI handles mechanical gaps (null references, error handling, pattern inconsistencies), freeing humans for architectural and design evaluation.

**Separate feedback loops.** CI feedback appears in checks tabs; review appears as comments. Developers immediately distinguish objective breakage from discussion points.

**Measure differently.** CI health tracks pass rates, flakiness, duration. Review quality tracks first-review timing, review cycles, post-merge defect rates.

## Two Systems, Two Jobs

CI and PR review aren't two versions of the same thing. They're two different systems making two different guesses about code quality. CI guesses whether the code works. Review guesses whether the code is right.

Most AI review tools collapse this distinction through CI embedding, sacrificing signal quality. Strongest setups treat each system distinctly: CI remains fast, deterministic, and binary; review stays contextual, conversational, meaning-focused.`,
  },

  // ── 3. ubuntu-latest is Ubuntu 24.04: What to Audit ─────────────────────
  {
    title: 'ubuntu-latest is Ubuntu 24.04: What to Audit',
    slug: 'ubuntu-latest-now-24-04-audit',
    excerpt:
      "GitHub's ubuntu-latest label now resolves to Ubuntu 24.04, removing Python 2, shipping OpenSSL 3, and changing default tool versions across runner images.",
    status: 'published',
    publishedAt: '2026-03-13T00:00:00.000Z',
    readingTime: 8,
    authorEmail: 'hayssem@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'ubuntu', 'runner-images', 'devops'],
    featuredImageIndex: 2,
    seo: {
      metaDescription:
        "GitHub's ubuntu-latest label now resolves to Ubuntu 24.04, removing Python 2, shipping OpenSSL 3, and changing default tool versions across runner images.",
      noIndex: false,
      keywords: ['ubuntu-latest', 'Ubuntu 24.04', 'GitHub Actions', 'runner images'],
    },
    content: `## TL;DR

GitHub's ubuntu-latest label now resolves to Ubuntu 24.04, removing Python 2, shipping OpenSSL 3, and changing default tool versions across runner images.

## Key Changes in Ubuntu 24.04

The migration from 22.04 involves critical shifts:

**Python:** Python 2 is no longer on the image at all. The system Python is now 3.12 (up from 3.10 on 22.04).

**OpenSSL:** Upgraded from 1.1 to 3.0.13, causing "symbol lookup error" failures in binaries compiled against older versions.

**Compiler:** GCC defaults moved to version 14, introducing stricter warning enforcement.

**Node.js & Runtime Defaults:** Node 18\u219220, Ruby 3.0\u21923.2, Java 11\u219217.

**Removed Tools:** Terraform, Heroku CLI, Netlify CLI, Mono, R, SVN, and cached Docker images eliminated.

## Breakage Patterns

1. **pip install failures** on system Python (PEP 668 externally-managed constraint)
2. **Ruby gem segfaults** from OpenSSL 1.1\u21923.0 incompatibility
3. **Docker pull slowdown** due to eliminated image caching
4. **Binary compatibility issues** with precompiled tools

## Version Reference Table

| Tool | Old (22.04) | New (24.04) |
|------|-------------|-------------|
| Python | 3.10 | 3.12 |
| Node.js | 18 | 20 |
| GCC | 9-13 | 12-14 |
| OpenSSL | 1.1 | 3.0.13 |
| PostgreSQL | 14 | 16 |

## Migration Strategy

**Step 1:** Pin workflows to ubuntu-22.04 immediately.

**Step 2:** Add ubuntu-24.04 as non-blocking matrix leg.

**Step 3:** Test locally using the \`act\` tool.

**Step 4:** Fix issues, then switch to pinned ubuntu-24.04 (avoid ubuntu-latest).

## Stop Using ubuntu-latest for Production Workflows

Pin explicit versions to prevent unexpected environment shifts during GitHub's future OS transitions. The label \`ubuntu-latest\` is convenient for experimentation but dangerous for production CI. When GitHub changes what it resolves to, your builds break without any code change on your end.`,
  },

  // ── 4. GitHub Agentic Workflows Explained ───────────────────────────────
  {
    title: 'GitHub Agentic Workflows Explained',
    slug: 'github-agentic-workflows',
    excerpt:
      "GitHub Agentic Workflows replace YAML with Markdown and hand execution to an AI agent. Here's the security model, tradeoffs, and whether to adopt now.",
    status: 'published',
    publishedAt: '2026-03-11T00:00:00.000Z',
    readingTime: 12,
    authorEmail: 'marina.rivosecchi@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'devops'],
    featuredImageIndex: 3,
    seo: {
      metaTitle: 'GitHub Agentic Workflows Explained',
      metaDescription:
        "GitHub Agentic Workflows replace YAML with Markdown and hand execution to an AI agent. Here's the security model, tradeoffs, and whether to adopt now.",
      noIndex: false,
      keywords: ['GitHub Agentic Workflows', 'AI agent', 'GitHub Actions', 'Continuous AI'],
    },
    content: `## TL;DR

GitHub Agentic Workflows replace YAML with Markdown and hand execution to an AI agent. Here's the security model, tradeoffs, and whether to adopt now.

On February 13, 2026, GitHub launched GitHub Agentic Workflows in technical preview. These workflows enable repository task automation by describing objectives in plain Markdown, then delegating execution to an AI agent. This represents GitHub's inaugural production feature embedding a coding agent directly within Actions runtime, featuring an explicit security model designed from inception for continuous unattended execution.

## Markdown instead of YAML: what actually changes

Standard GitHub Actions workflows use YAML files with explicit steps. Each branch contains predetermined steps, producing deterministic outcomes\u2014identical inputs yield identical execution.

Agentic workflows differ fundamentally. A \`.md\` file placed in \`.github/workflows/\` contains two components: YAML frontmatter declaring triggers, permissions, tools, and permitted write operations; and Markdown body describing tasks in natural language. At runtime, a coding agent interprets these instructions and determines fulfillment methods.

\`\`\`yaml
---
on:
  schedule: daily
permissions:
  contents: read
  issues: read
  pull-requests: read
safe-outputs:
  create-issue:
    title-prefix: "[repo status] "
    labels: [report]
tools:
  github:
---

# Daily Repo Status Report

Create a daily status report for maintainers. Include:

- Recent repository activity (issues, PRs, discussions, releases, code changes)
- Progress tracking, goal reminders and highlights
- Project status and recommendations
- Actionable next steps for maintainers

Keep it concise and link to the relevant issues/PRs.
\`\`\`

The frontmatter is precise and declarative\u2014daily trigger, read-only access to issues and PRs, creation of issues only (no code pushes, PR opens, or existing issue comments), utilizing GitHub MCP server as the tool. The Markdown body remains intentionally vague, describing goals rather than procedures.

This represents fundamental shift: standard Actions workflows involve programming; agentic workflows involve delegation. The tradeoff: enhanced flexibility and expressiveness impossible to encode in YAML, but sacrificed predictability. Tuesday's agent output may differ from Monday's despite identical repository state.

## The security model: why it's more than a disclaimer

Placing an AI agent in CI pipelines with repository access presents genuine security concerns. GitHub's architecture features three explicit layers containing failures from above.

### Layer 1: Substrate isolation

The agent operates within a Docker container with restricted egress. An Agent Workflow Firewall (AWF) employs \`iptables\` to route all HTTP/HTTPS traffic through a Squid proxy container, enforcing configurable domain allowlisting. The agent lacks direct internet access\u2014only to explicitly permitted domains.

The agent's LLM API key never resides in the agent container. An API proxy holds it; agent LLM traffic routes through this proxy. MCP servers operate in separate containers, accessible exclusively through an MCP gateway.

### Layer 2: Compilation-time constraints

Before agentic workflow execution, compilation is required. The \`gh aw compile\` command produces a \`.lock.yml\` file alongside the Markdown file. During compilation, the compiler pins all action dependencies to specific SHAs (not tags), validates frontmatter schema, and executes three security scanners: \`actionlint\` for workflow linting, \`zizmor\` for privilege escalation vulnerabilities, and \`poutine\` for supply chain risks.

### Layer 3: Safe outputs and the vetting pipeline

The agent maintains read-only GitHub state access via GitHub MCP server. It cannot write anything directly. Instead, buffering actions through the Safe Outputs MCP server. Between agent job and write jobs sits a threat detection job. A second AI agent analyzes buffered outputs, seeking secret leaks, malicious code patterns, and policy violations.

## Getting started: install, write, compile, run

Entry point: the \`gh-aw\` CLI extension.

\`\`\`shell
gh extension install github/gh-aw
\`\`\`

Once a \`.md\` file exists in \`.github/workflows/\`, compile it:

\`\`\`shell
# Compile the Markdown workflow to a lock file
gh aw compile

# Or with added security scanners
gh aw compile --actionlint --zizmor --poutine
\`\`\`

Compilation produces \`workflow-name.lock.yml\` alongside the \`.md\`. Both files go into the repository.

\`\`\`shell
gh aw logs           # Download and analyze recent run logs
gh aw audit <run-id> # Investigate a specific run's prompts and outputs
gh aw status         # Check workflow health
\`\`\`

## Agent flexibility: Copilot vs. Claude vs. Codex

GitHub Copilot CLI serves as the default engine. For teams already using Claude Code or OpenAI Codex, switching requires only a single frontmatter line. Different workflows in the same repository can employ different engines.

## What you can realistically build

GitHub published over 50 example workflows across six categories:

- **Continuous triage:** Automatically read new issues, determine proper labels and assignees
- **CI failure analysis:** Trigger on failed workflow runs, read logs, reason about root causes
- **Documentation maintenance:** Upon PR merge, assess whether docs need updating
- **Code simplification:** Weekly schedules identify duplicated logic or overly complex functions
- **Status reports:** Daily or weekly repository activity digests

## Current limitations and what to watch

- **Cost isn't free:** Each agentic workflow run consumes approximately two Copilot premium requests
- **The lock file workflow adds friction:** Each Markdown change requires recompilation
- **Non-determinism is real:** Agents hallucinate, misinterpret instructions, occasionally perform unexpectedly
- **PRs are never auto-merged:** Intentional and documented
- **Copilot billing is per-user:** Automated usage currently attributes to user accounts

## Should you adopt it now?

For individual developers or small teams: yes, try immediately. Select one low-stakes workflow and run for a week.

For larger organization platform teams: proceed thoughtfully. The security model proves solid for technical preview, but per-user billing attribution, scale costs, and lock file maintenance deserve evaluation.`,
  },

  // ── 5. Monorepo CI with GitHub Actions: Selective Builds Done Right ─────
  {
    title: 'Monorepo CI with GitHub Actions: Selective Builds Done Right',
    slug: 'monorepo-ci-github-actions-selective-builds',
    excerpt:
      'Naive path filters miss cross-package dependencies. Dependency-aware selective builds with Turborepo, Nx, and conditional job execution fix monorepo CI without over-building or under-building.',
    status: 'published',
    publishedAt: '2026-03-06T00:00:00.000Z',
    readingTime: 9,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'devops', 'monorepo', 'turborepo', 'nx'],
    featuredImageIndex: 4,
    seo: {
      metaDescription:
        'Dependency-aware selective builds with Turborepo, Nx, and conditional job execution fix monorepo CI.',
      noIndex: false,
      keywords: ['monorepo', 'GitHub Actions', 'Turborepo', 'Nx', 'selective builds'],
    },
    content: `## TL;DR

Naive path filters miss cross-package dependencies. Dependency-aware selective builds with Turborepo, Nx, and conditional job execution fix monorepo CI without over-building or under-building.

## Why Naive Path Filters Break in Monorepos

GitHub Actions supports workflow-level path filtering but cannot control individual jobs. More critically, path filters ignore dependency relationships between packages. Consider this structure:

\`\`\`
packages/
  api/          # depends on utils, db
  web/          # depends on utils, ui
  utils/        # shared utilities, no deps
  db/           # database layer, depends on utils
  ui/           # component library, no deps
\`\`\`

Changing \`utils\` requires testing \`api\`, \`web\`, and \`db\`\u2014yet path filters on \`packages/api/**\` won't capture this.

## Job-Level Filtering with dorny/paths-filter

Move change detection into the workflow itself using conditional job execution:

\`\`\`yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      api: \${{ steps.filter.outputs.api }}
      web: \${{ steps.filter.outputs.web }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v4
        id: filter
        with:
          filters: |
            api:
              - 'packages/api/**'
              - 'packages/utils/**'
              - 'packages/db/**'
            web:
              - 'packages/web/**'
              - 'packages/utils/**'
              - 'packages/ui/**'

  test-api:
    needs: detect-changes
    if: needs.detect-changes.outputs.api == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test --workspace=packages/api

  test-web:
    needs: detect-changes
    if: needs.detect-changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test --workspace=packages/web
\`\`\`

## Dependency-Aware Builds with Turborepo

Turborepo reads the package manager's workspace configuration and the \`--affected\` flag compares the current commit against the base:

\`\`\`yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npx turbo run lint test build --affected
\`\`\`

**Critical:** Use \`fetch-depth: 0\` for full git history.

### Layering with Remote Cache

\`\`\`yaml
      - run: npx turbo run lint test build --affected
        env:
          TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: \${{ vars.TURBO_TEAM }}
\`\`\`

## The Nx Approach: Affected and Task Distribution

Nx uses the \`nrwl/nx-set-shas\` action to find the last successful CI run on \`main\`:

\`\`\`yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

permissions:
  actions: read
  contents: read

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          filter: tree:0
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - uses: nrwl/nx-set-shas@v4
      - run: npx nx affected -t lint test build
\`\`\`

## Combining Path Filters with Build-Tool Filtering

Turborepo's \`turbo-ignore\` command runs before dependency installation:

\`\`\`yaml
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - name: Check for changes
        id: check
        run: |
          npx turbo-ignore api \\
            && echo "skip=true" >> \$GITHUB_OUTPUT \\
            || echo "skip=false" >> \$GITHUB_OUTPUT
      - if: steps.check.outputs.skip != 'true'
        run: npm ci
      - if: steps.check.outputs.skip != 'true'
        run: npx turbo run build deploy --filter=api
\`\`\`

## Dynamic Matrix Strategies from Changed Packages

\`\`\`yaml
jobs:
  detect:
    runs-on: ubuntu-latest
    outputs:
      packages: \${{ steps.filter.outputs.changes }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v4
        id: filter
        with:
          filters: |
            api:
              - 'packages/api/**'
            web:
              - 'packages/web/**'
            ui:
              - 'packages/ui/**'

  test:
    needs: detect
    if: needs.detect.outputs.packages != '[]'
    strategy:
      matrix:
        package: \${{ fromJson(needs.detect.outputs.packages) }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npm test --workspace=packages/\${{ matrix.package }}
\`\`\`

## Choosing Your Approach

**2-3 packages with minimal cross-dependencies:** \`dorny/paths-filter\` with manual dependency paths.

**5-15 packages with shared libraries:** Turborepo's \`--affected\` flag.

**15+ packages or polyglot repos:** Nx with its project graph and task distribution.`,
  },

  // ── 6. GitHub Actions Cost Optimization ─────────────────────────────────
  {
    title: 'GitHub Actions Cost Optimization: Cut Your Billable Minutes by 40\u201370%',
    slug: 'github-actions-cost-optimization',
    excerpt:
      "Most teams treat their GitHub Actions bill as a fixed cost. It isn't. Path filters, concurrency cancellation, job splitting, and runner selection routinely cut billable minutes by 40\u201370%.",
    status: 'published',
    publishedAt: '2026-03-04T00:00:00.000Z',
    readingTime: 12,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'cost-optimization', 'devops'],
    featuredImageIndex: 5,
    seo: {
      metaTitle: 'GitHub Actions Cost Optimization: Cut Billable Minutes',
      metaDescription:
        'Path filters, concurrency cancellation, job splitting, and runner selection routinely cut GitHub Actions billable minutes by 40\u201370%.',
      noIndex: false,
      keywords: ['GitHub Actions', 'cost optimization', 'billable minutes', 'CI/CD'],
    },
    content: `## TL;DR

Most teams treat their GitHub Actions bill as a fixed cost. It isn't. Path filters, concurrency cancellation, job splitting, and runner selection routinely cut billable minutes by 40\u201370%.

Your GitHub Actions bill likely exceeds necessary spend\u2014not due to errors, but because defaults prioritize generosity. Every push triggers all workflows. Stale runs persist on force-pushed branches. macOS and Windows jobs cost 10x and 2x Linux respectively.

## How GitHub Actions Billing Actually Works

GitHub charges for Actions via billable minutes, though not all minutes carry equal weight.

Per-minute rates for GitHub-hosted overage:
- **Linux:** $0.008/min (1x multiplier)
- **Windows:** $0.016/min (2x multiplier)
- **macOS:** $0.08/min (10x multiplier)

A 10-minute macOS job consumes 100 minutes, not ten. GitHub rounds each job duration upward to the nearest minute.

## Path Filters: Stop Building When Only Docs Changed

\`\`\`yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - 'docs/**'
      - '*.md'
      - '.github/ISSUE_TEMPLATE/**'
      - 'LICENSE'
  pull_request:
    branches: [main]
    paths-ignore:
      - 'docs/**'
      - '*.md'
      - '.github/ISSUE_TEMPLATE/**'
      - 'LICENSE'
\`\`\`

## Concurrency: Kill Stale Runs Automatically

\`\`\`yaml
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
\`\`\`

Safer approach for default branches:

\`\`\`yaml
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: \${{ github.ref != 'refs/heads/main' }}
\`\`\`

On busy teams with 20+ concurrent PRs, concurrency cancellation alone saves 20\u201330% total minutes.

## Environment Gates: Stop Expensive Jobs From Running on Every PR

\`\`\`yaml
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  e2e-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test
\`\`\`

## Job Splitting and Matrix Strategy

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx vitest --shard=\${{ matrix.shard }}/4
\`\`\`

## Timeout and Fail-Fast

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - run: npm test
\`\`\`

## Runner Selection: Stop Paying the macOS Tax

Run full test suites on Linux for every PR; run macOS/Windows matrices only on main pushes or release tags.

## Monitoring Spend

\`\`\`shell
# Get org-level Actions billing summary
curl -s -H "Authorization: Bearer \$GITHUB_TOKEN" \\
  https://api.github.com/orgs/YOUR_ORG/settings/billing/actions | jq .
\`\`\`

## Optimization Checklist

1. **Add concurrency cancellation.** Three lines, instant savings, zero coverage risk.
2. **Set job timeouts.** Prevents runaway jobs silently draining budgets.
3. **Add path filters.** Keeps CI from running on documentation-only changes.
4. **Audit runner OS usage.** Move anything not strictly requiring macOS or Windows to Linux.
5. **Gate expensive jobs.** Use environment protection rules.
6. **Set up monitoring.** Weekly usage checks via billing API with Slack alerts.
7. **Evaluate matrix splitting.** Run numbers against actual test durations.
8. **Consider self-hosted runners.** Only after earlier optimizations.`,
  },

  // ── 7. GitHub Actions Artifact Attestations ─────────────────────────────
  {
    title: 'GitHub Actions Artifact Attestations: SLSA Provenance and Supply Chain Defaults',
    slug: 'github-actions-artifact-attestations-slsa',
    excerpt:
      "GitHub's artifact attestation feature uses Sigstore to generate SLSA provenance for your builds. Here's how it works, what it proves, and what changes as defaults tighten.",
    status: 'published',
    publishedAt: '2026-02-27T00:00:00.000Z',
    readingTime: 11,
    authorEmail: 'hayssem@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'security', 'supply-chain-security', 'slsa', 'sbom'],
    featuredImageIndex: 6,
    seo: {
      metaTitle: 'GitHub Actions Artifact Attestations: SLSA Provenance',
      metaDescription:
        "GitHub\u2019s artifact attestation uses Sigstore to generate SLSA provenance for builds. How it works, what it proves, and what changes as defaults tighten.",
      noIndex: false,
      keywords: [
        'artifact attestation',
        'SLSA',
        'Sigstore',
        'supply chain security',
        'SBOM',
      ],
    },
    content: `## TL;DR

GitHub's artifact attestation feature uses Sigstore to generate SLSA provenance for your builds. Here's how it works, what it proves, and what changes as defaults tighten.

Every GitHub Actions workflow producing binaries, container images, or packages faces a downstream verification challenge. GitHub's attestation approach generates cryptographically signed provenance statements tying artifacts to specific workflow runs, commits, and repositories using ephemeral certificates valid for ten minutes, with proof stored on immutable transparency logs.

## What Attestations Prove (and What They Don't)

An artifact attestation is a signed statement that says: this artifact, identified by its SHA-256 digest, was produced by this specific GitHub Actions workflow run, in this repository, from this commit.

**Critical limitations:** Attestations don't prove source code safety, dependency vulnerability freedom, or hardened build processes. They're audit trails enabling policy decisions, not security audits themselves.

## How Sigstore Powers the Signing Pipeline

1. The attestation action requests the GitHub Actions OIDC token
2. A fresh keypair generates in memory; Fulcio issues a short-lived X.509 certificate (valid 10 minutes)
3. The client computes the artifact's SHA-256 digest and writes an in-toto statement with SLSA provenance predicate
4. The private key signs the statement inside a DSSE envelope, then is discarded
5. Everything bundles into a Sigstore bundle and stores in GitHub's attestation store

## Adding Attestations to Your Workflow

\`\`\`yaml
permissions:
  id-token: write
  contents: read
  attestations: write

steps:
  - name: Build
    run: make build

  - name: Generate artifact attestation
    uses: actions/attest-build-provenance@v3
    with:
      subject-path: 'dist/my-binary'
\`\`\`

## Attesting Container Images Pushed to GHCR

\`\`\`yaml
permissions:
  id-token: write
  contents: read
  attestations: write
  packages: write

steps:
  - name: Build and push image
    id: push
    uses: docker/build-push-action@v6
    with:
      push: true
      tags: ghcr.io/my-org/my-app:latest

  - name: Generate artifact attestation
    uses: actions/attest-build-provenance@v3
    with:
      subject-name: ghcr.io/my-org/my-app
      subject-digest: \${{ steps.push.outputs.digest }}
      push-to-registry: true
\`\`\`

## SBOM Attestations and Dependency Tracking

\`\`\`yaml
- uses: anchore/sbom-action@v0
  with:
    path: ./build/
    format: 'spdx-json'
    output-file: 'sbom.spdx.json'

- uses: actions/attest-sbom@v2
  with:
    subject-path: 'dist/my-binary'
    sbom-path: 'sbom.spdx.json'
\`\`\`

## Verifying Attestations

\`\`\`shell
gh attestation verify ./my-binary -R my-org/my-repo

docker login ghcr.io
gh attestation verify oci://ghcr.io/my-org/my-app:v1.2.0 -R my-org/my-repo
\`\`\`

## SLSA Levels

GitHub's artifact attestations achieve **SLSA v1.0 Build Level 2** out of the box. Build L3 requires using reusable workflows.

## Practical Recommendations

1. Add build provenance attestations to release workflows first
2. Add SBOM generation and attestation to the same workflow
3. Set up verification in deployment pipelines
4. Evaluate reusable workflows for L3
5. Pin attestation action references to full commit SHAs`,
  },

  // ── 8. GitHub Merge Queue in 2026 ──────────────────────────────────────
  {
    title: 'GitHub Merge Queue in 2026: How It Works & Handling Flaky Required Status Checks',
    slug: 'github-merge-queue-setup',
    excerpt:
      "GitHub's merge queue prevents broken merges on busy branches, but common gaps trip up most teams who enable it. Here's how the queue actually works, how to configure it properly, and how to stop flaky tests from blocking your entire pipeline.",
    status: 'published',
    publishedAt: '2026-02-25T00:00:00.000Z',
    readingTime: 12,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'merge-queue'],
    featuredImageIndex: 7,
    seo: {
      metaDescription:
        'GitHub merge queue prevents broken merges on busy branches. How to configure it and stop flaky tests from blocking your pipeline.',
      noIndex: false,
      keywords: ['merge queue', 'GitHub Actions', 'flaky tests', 'CI/CD'],
    },
    content: `## TL;DR

GitHub's merge queue prevents broken merges on busy branches, but common gaps trip up most teams who enable it. Here's how the queue actually works, how to configure it properly, and how to stop flaky tests from blocking your entire pipeline.

## How the merge queue actually works

When you enable merge queue on a branch, the "Merge" button on a PR changes to "Merge when ready." GitHub creates a temporary branch\u2014a speculative merge commit\u2014that combines the target branch, all PRs already ahead in the queue, and the new PR.

The key insight is the **speculative merge commit**. If PRs A, B, and C are queued in that order, the queue tests A against main, B against main+A, and C against main+A+B.

### Grouping and batching

You set a maximum group size, and the queue batches PRs into a single speculative merge commit. If the batch fails, the queue bisects automatically.

### What happens when a queued PR fails

Every PR behind the failed one gets a new speculative merge commit. All those CI runs restart. This cascading restart is the single biggest source of frustration with merge queues.

## Setting it up

Navigate to branch protection settings, check "Require merge queue":

- **Merge method** \u2014 Squash, merge commit, or rebase
- **Maximum group size** \u2014 Start with 5
- **Minimum group size and wait time** \u2014 Set to 1 and 0 unless processing 20+ PRs daily
- **Status check timeout** \u2014 Set to roughly 2x your CI duration

## Workflow triggers: pull_request vs. merge_group

\`\`\`yaml
name: CI
on:
  pull_request:
    branches: [main]
  merge_group:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
\`\`\`

## The flaky check problem

### 1. Separate required checks from informational checks

\`\`\`yaml
# .github/workflows/required-checks.yml
name: Required Checks
on:
  pull_request:
    branches: [main]
  merge_group:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run typecheck
\`\`\`

### 2. Quarantine known flaky tests

Tag flaky tests and exclude them from the required CI run.

### 3. Add retry logic

\`\`\`json
{
  "jest": {
    "retryTimes": 2,
    "retryImmediately": true
  }
}
\`\`\`

### 4. Reduce your required check surface area

## When merge queue helps vs. when it hurts

**Merge queue makes sense when:**
- Your team merges 10+ PRs per day
- You've had incidents where main broke from conflicting PRs
- You deploy from main continuously
- Your monorepo has cross-package dependencies

**Merge queue probably isn't worth it when:**
- Your team is under 5 people
- You have a polyrepo setup
- Your CI is slow (30+ minutes) with known flakiness
- You merge a few PRs a week

## A practical rollout plan

1. Audit your flaky tests first
2. Add the merge_group trigger
3. Separate required from informational checks
4. Enable on a low-traffic repo first
5. Roll out to your main repo with group size 3-5
6. Monitor the queue`,
  },

  // ── 9. GitHub Actions Permissions: Lock Down GITHUB_TOKEN ──────────────
  {
    title: 'GitHub Actions Permissions: Lock Down GITHUB_TOKEN',
    slug: 'github-actions-permissions-model',
    excerpt:
      "Default GITHUB_TOKEN permissions are dangerously broad. Here's how to scope every job to minimum access and eliminate static cloud credentials with OIDC.",
    status: 'published',
    publishedAt: '2026-02-22T00:00:00.000Z',
    readingTime: 9,
    authorEmail: 'hayssem@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'security', 'github-token', 'openid-connect'],
    featuredImageIndex: 8,
    seo: {
      metaTitle: 'GitHub Actions Permissions: Lock Down GITHUB_TOKEN',
      metaDescription:
        'Default GITHUB_TOKEN permissions are dangerously broad. Here\u2019s how to scope every job to minimum access and eliminate static cloud credentials with OIDC.',
      noIndex: false,
      keywords: ['GITHUB_TOKEN', 'permissions', 'OIDC', 'GitHub Actions security'],
    },
    content: `## TL;DR

Default GITHUB_TOKEN permissions are dangerously broad. Here's how to scope every job to minimum access and eliminate static cloud credentials with OIDC.

Every GitHub Actions workflow receives a token called GITHUB_TOKEN capable of reading code, writing to repositories, pushing packages, closing issues, and creating deployments.

## How GITHUB_TOKEN Actually Works

Before each job begins, GitHub creates a short-lived installation access token limited to the repository. Key aspects:

- **Per-job lifetime:** A fresh token is generated for each job
- **Implicit access:** Actions can access the token through the github.token context
- **No recursive triggers:** Events triggered by the token won't initiate new workflow runs
- **Repository-scoped:** The token can only access the containing repository

## The Default Permissions Problem

Two default permission modes:

- **Permissive (read and write)** \u2014 Read/write access to most scopes by default
- **Restricted (read-only)** \u2014 Only read access to contents and metadata

## The Permissions Key

Critical behavior: when you specify any individual permission, all unspecified permissions are set to none.

## Job-Level Permissions in Practice

\`\`\`yaml
name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  release:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}

  label-pr:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/labeler@v5
\`\`\`

## The pull_request_target Trap

pull_request_target executes in the base repository context with base repo secrets and read/write GITHUB_TOKEN, even when the PR originates from a fork.

\`\`\`yaml
# DANGEROUS: do not do this
on: pull_request_target

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - run: npm ci && npm test # executes attacker-controlled code
\`\`\`

Correct pattern: never check out or execute PR head refs with pull_request_target.

## OIDC: Replacing Static Cloud Credentials

\`\`\`yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-deploy
          aws-region: us-east-1
      - run: aws s3 sync ./dist s3://my-bucket
\`\`\`

## Auditing Your Workflows

1. Set the org/repo default to restricted
2. Grep for write-all and missing permissions keys
3. Move permissions to job level
4. Search for pull_request_target
5. Migrate cloud credentials to OIDC
6. Pin third-party actions to commit SHAs
7. Use CODEOWNERS for .github/workflows/`,
  },

  // ── 10. AI Made Writing Code Cheap. Judgment Didn't Scale. ─────────────
  {
    title: "AI Made Writing Code Cheap. Judgment Didn't Scale.",
    slug: 'ai-code-judgment-didnt-scale',
    excerpt:
      "AI writes code faster than ever, but review quality is falling behind. The gap between velocity and judgment is the real risk most teams haven't named yet.",
    status: 'published',
    publishedAt: '2026-02-21T00:00:00.000Z',
    readingTime: 9,
    authorEmail: 'marina.rivosecchi@tenki.cloud',
    categorySlug: 'ai-code-review',
    tagSlugs: ['ai-code-review', 'code-quality', 'tenki'],
    featuredImageIndex: 9,
    seo: {
      metaDescription:
        "AI writes code faster than ever, but review quality is falling behind. The gap between velocity and judgment is the real risk most teams haven't named yet.",
      noIndex: false,
      keywords: ['AI code review', 'code quality', 'judgment', 'code review scaling'],
    },
    content: `Here's the productivity story everyone tells: AI coding tools made your team faster. PRs per developer are up. Cycle times are down. Velocity charts look great in the quarterly review.

Here's the story nobody tells: your senior engineers are drowning in review queues, rubber-stamping diffs they don't have time to read, and subtle bugs are reaching production because the one part of the process that requires human judgment didn't get any faster.

AI made writing code cheap. It didn't make judgment cheap. And the gap between those two is where real engineering risk now lives.

## The Numbers Are Lopsided

AI coding assistants now contribute to roughly 41-46% of all new code per multiple industry reports from late 2025 and early 2026. GitHub reported a 29% year-over-year increase in merged pull requests. Salesforce's engineering team experienced a 30% code volume jump, with PRs regularly exceeding 20 files and 1,000 lines of change.

Meanwhile, review metrics move oppositely. Faros AI analyzed data from over 10,000 developers across 1,255 teams and discovered teams with high AI adoption completed 21% more tasks and merged 98% more PRs, but "PR review time increased 91%". CodeRabbit's analysis found AI-generated PRs contain 1.7x more issues per pull request compared to human-written code.

The output doubled, the defect rate went up, and the review bottleneck got worse. That's not a productivity gain. That's quality debt accumulating in the one place teams can least afford it.

## What Judgment Actually Means in Code Review

Most discussions about AI code review treat it as pattern-matching. Flag unused imports, identify missing null checks, suggest more idiomatic function names. Linters perform this for years. LLMs do it somewhat better.

However, factors making senior engineer reviews valuable have little to do with pattern matching:

- This PR touches the payment flow. We had an incident here six months ago. Does this change reintroduce that risk?
- This refactor looks clean in isolation, but it breaks an assumption three other services rely on.
- This new dependency has a permissive license. Legal hasn't approved it.
- The code is correct, but the approach contradicts a decision we made deliberately two quarters ago.

None of these are syntax problems. They require context: the history of the codebase, the architecture of the system, the organizational decisions that shaped it, and the consequences of getting it wrong.

## Why Most AI Reviewers Can't Do This

First-generation AI code review tools work like this: receive a diff, send it to an LLM, post the comments. Structurally, they share the same limitation: they don't know your codebase.

An LLM reviewing a diff in isolation is like asking a contractor to evaluate plumbing changes without showing them the floor plan. They can tell you whether a pipe joint looks wrong. They can't tell you it's going to flood the basement.

Most AI review tools operate on the diff, not the codebase. They have no memory of past PRs, no awareness of recent incidents, no model of architecture.

## The Three Things a Reviewer Needs That Most Tools Skip

**Codebase awareness.** The reviewer needs to understand how changed files relate to the rest of the system. The call graph, the data flow, the modules that depend on what's changing.

**Risk calibration.** Not all code changes carry the same risk. Good reviewers triage instinctively. Most AI reviewers comment uniformly across the entire diff.

**Signal discipline.** The best reviewers say less, not more. They identify the one or two things that actually matter. A review tool that posts fifteen nitpicks and buries the one real bug is actively making things worse.

## How Tenki Approaches the Judgment Problem

Tenki's Code Reviewer was built around a different premise: review comments are only useful if they're informed by the full codebase, not just the diff.

When you connect a repository, Tenki indexes the entire codebase: file relationships, architectural patterns, dependencies between modules. It evaluates the change against a model of your system.

Tenki also accepts custom context: team-specific guidelines, architectural decisions, areas of the codebase flagged as high-risk.

Crucially, Tenki filters for severity. It doesn't dump a wall of comments on every PR. It raises critical and high-severity issues and stays quiet on the rest.

## What Good Review Looks Like at Scale

- **Low-risk PRs** get reviewed automatically with high confidence
- **Medium-risk PRs** get a focused summary with specific areas flagged for human attention
- **High-risk PRs** get elevated with file- and line-level references

## The Risk You're Not Measuring

If you're a CTO looking at DORA metrics and celebrating faster lead times, ask yourself: has review time per line of code changed? Are your senior engineers spending more or less time per PR? Are incident rates for AI-assisted changes tracking differently?

## Code Got Cheap. Make Sure Judgment Doesn't Get Ignored.

The next generation of review tools won't succeed by generating more comments. They'll succeed by understanding your codebase deeply enough to generate fewer, better ones. The ones that surface the risks your team would have caught if they had unlimited time and perfect memory.

That's what scaling judgment actually looks like. Not automating away the human. Giving the human what they need to be effective at the speed the code now moves.`,
  },

  // ── 11. Custom GitHub Actions: JavaScript, Docker, and Composite ───────
  {
    title: 'Custom GitHub Actions: JavaScript, Docker, and Composite',
    slug: 'custom-github-actions-javascript-docker-composite',
    excerpt:
      'JavaScript actions start fast and run everywhere, Docker actions control the full environment, and composite actions glue shell steps together.',
    status: 'published',
    publishedAt: '2026-02-20T00:00:00.000Z',
    readingTime: 11,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'devops', 'custom-actions'],
    featuredImageIndex: 10,
    seo: {
      metaDescription:
        'JavaScript actions start fast and run everywhere, Docker actions control the full environment, and composite actions glue shell steps together.',
      noIndex: false,
      keywords: [
        'custom GitHub Actions',
        'JavaScript actions',
        'Docker actions',
        'composite actions',
      ],
    },
    content: `## TL;DR

JavaScript actions start fast and run everywhere, Docker actions control the full environment, and composite actions glue shell steps together.

## When a Reusable Workflow Isn't Enough

Reusable workflows operate at the job level rather than the step level. Custom actions function as step-level abstractions that can access workspace files, modify environment variables, and produce outputs for subsequent steps.

## The action.yml Metadata File

All three action types require an \`action.yml\` file at the repository root declaring name, description, inputs, outputs, and execution parameters.

## JavaScript Actions: Fast Startup, Cross-Platform

JavaScript actions execute directly on runner Node.js runtimes without container overhead. The \`runs\` section specifies \`using: 'node20'\`.

### The Actions Toolkit

GitHub provides npm packages including \`@actions/core\` for input/output management and \`@actions/github\` for authenticated API access.

### The Bundling Requirement

Runners don't execute \`npm install\` for actions. Code must be bundled into single files using tools like \`@vercel/ncc\` or \`rollup\`.

### Platform Support and Constraints

JavaScript actions run on Ubuntu, macOS, and Windows runners. Code must be pure JavaScript without native binary dependencies.

## Docker Actions: Full Environment Control

Docker container actions package complete runtime environments. The \`runs\` section specifies \`using: 'docker'\` with image references.

### The Cold-Start Penalty

Building local images on every run adds 10-15 seconds for Alpine-based images or 30+ seconds for larger base images.

### Linux Only

Docker actions function exclusively on Linux runners.

## Composite Actions: Shell Steps, No Runtime

Composite actions define sequences of shell commands and action calls directly in \`action.yml\`. Zero overhead beyond standard step execution.

### What Composite Actions Can't Do

No \`pre:\` and \`post:\` lifecycle hooks. No action-level conditionals (though individual steps may use \`if:\`).

## Side-by-Side Comparison

| Dimension | JavaScript | Composite | Docker |
|-----------|-----------|-----------|--------|
| Cold Start | Near-instant | Zero overhead | 10-60 seconds |
| Platform Support | Linux, macOS, Windows | Linux, macOS, Windows | Linux only |
| Language | Node.js required | Shell/other actions | Any language |
| Environment Isolation | Runner shared | Runner shared | Full isolation |
| Lifecycle Hooks | Supported | Not supported | Not supported |
| Maintenance Cost | Build/bundling required | Lowest (YAML only) | Dockerfile maintenance |

## Testing Strategies for Each Type

**JavaScript Actions:** Testable as standard Node.js modules using Jest or Vitest.

**Docker Actions:** Test containers locally with environment variables matching GitHub's setup.

**Composite Actions:** Integration test workflows in the action's repository.

## Picking the Right Type

Start with composite actions for basic command sequences. Choose JavaScript for complex logic, API interactions, or lifecycle hooks. Select Docker for specialized runtime environments.`,
  },

  // ── 12. Build and Push Docker Images with GitHub Actions ───────────────
  {
    title: 'Build and Push Docker Images with GitHub Actions',
    slug: 'github-actions-docker-build-push',
    excerpt:
      'A complete guide to building, tagging, caching, and pushing Docker images to GHCR, ECR, and Docker Hub from GitHub Actions workflows.',
    status: 'published',
    publishedAt: '2026-02-18T00:00:00.000Z',
    readingTime: 9,
    authorEmail: 'eddie@tenki.cloud',
    categorySlug: 'ci-cd',
    tagSlugs: ['github-actions', 'ci-cd', 'devops', 'docker', 'container-registry', 'caching', 'security', 'oidc'],
    featuredImageIndex: 11,
    seo: {
      metaTitle: 'Build and Push Docker Images with GitHub Actions',
      metaDescription:
        'A complete guide to building, tagging, caching, and pushing Docker images to GHCR, ECR, and Docker Hub from GitHub Actions workflows.',
      noIndex: false,
      keywords: ['Docker', 'GitHub Actions', 'GHCR', 'ECR', 'container CI'],
    },
    content: `Getting a Docker build to work in GitHub Actions takes about ten minutes. Getting it to run fast, authenticate securely to multiple registries, produce multi-arch images, and reject vulnerable base layers before anything reaches production takes considerably longer.

## The Foundations: Context, Dockerfile, Tags, and Push Conditions

Three official Docker actions:

- \`docker/setup-buildx-action@v4\` creates a BuildKit builder instance
- \`docker/build-push-action@v7\` runs the actual build
- \`docker/login-action@v4\` authenticates to a container registry

Minimal workflow:

\`\`\`yaml
name: Build and push
on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v4
        with:
          username: \${{ vars.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v7
        with:
          push: true
          tags: myorg/myapp:latest
\`\`\`

Gate pushes on pull requests:

\`\`\`yaml
      push: \${{ github.event_name != 'pull_request' }}
\`\`\`

## Registry Authentication: GHCR, ECR, and Docker Hub

### GHCR

\`\`\`yaml
permissions:
  packages: write

steps:
  - name: Login to GHCR
    uses: docker/login-action@v4
    with:
      registry: ghcr.io
      username: \${{ github.actor }}
      password: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

### Amazon ECR with OIDC

\`\`\`yaml
permissions:
  id-token: write
  contents: read

steps:
  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789012:role/github-actions-ecr
      aws-region: us-east-1

  - name: Login to Amazon ECR
    id: ecr-login
    uses: aws-actions/amazon-ecr-login@v2

  - name: Build and push
    uses: docker/build-push-action@v7
    with:
      push: true
      tags: \${{ steps.ecr-login.outputs.registry }}/myapp:\${{ github.sha }}
\`\`\`

## Layer Caching Strategies

### GitHub Actions Cache (type=gha)

\`\`\`yaml
- name: Build and push
  uses: docker/build-push-action@v7
  with:
    push: true
    tags: myorg/myapp:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
\`\`\`

### Registry Cache (type=registry)

\`\`\`yaml
    cache-from: type=registry,ref=myorg/myapp:buildcache
    cache-to: type=registry,ref=myorg/myapp:buildcache,mode=max
\`\`\`

## Multi-Platform Builds

\`\`\`yaml
steps:
  - name: Set up QEMU
    uses: docker/setup-qemu-action@v4

  - name: Set up Docker Buildx
    uses: docker/setup-buildx-action@v4

  - name: Build and push
    uses: docker/build-push-action@v7
    with:
      platforms: linux/amd64,linux/arm64
      push: true
      tags: myorg/myapp:latest
      cache-from: type=gha
      cache-to: type=gha,mode=max
\`\`\`

## Tagging Strategies

\`\`\`yaml
steps:
  - name: Docker meta
    id: meta
    uses: docker/metadata-action@v6
    with:
      images: |
        myorg/myapp
        ghcr.io/myorg/myapp
      tags: |
        type=ref,event=branch
        type=ref,event=pr
        type=semver,pattern={{version}}
        type=semver,pattern={{major}}.{{minor}}
        type=sha
\`\`\`

## Security Scanning Before Push

\`\`\`yaml
steps:
  - name: Build image (no push)
    uses: docker/build-push-action@v7
    with:
      load: true
      tags: myorg/myapp:scan
      cache-from: type=gha
      cache-to: type=gha,mode=max

  - name: Scan for vulnerabilities
    uses: aquasecurity/trivy-action@master
    with:
      image-ref: myorg/myapp:scan
      format: table
      exit-code: 1
      severity: HIGH,CRITICAL
\`\`\`

Build, scan, then push only if the scan passes. Swap \`type=gha\` for \`type=registry\` when you outgrow the 10 GB cache budget.`,
  },
]
