---
name: autoresearch
description: "Autonomous experiment loop — pick a metric (test speed, bundle size, build time, type-check time, etc.), then iteratively optimize it by making changes, measuring, keeping improvements, and reverting regressions. Usage: /autoresearch [optimization goal]"
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, Agent, AskUserQuestion
---

Run an autonomous experiment loop to optimize `$ARGUMENTS` in this monorepo.

**Important**: this is a Go backend + Next.js frontend monorepo using Nix/direnv. All build/test/lint commands require the Nix environment. If direnv is not active, prefix commands with `direnv exec .`.

---

## Phase 1 — Setup

### 1.1 Gather parameters

If `$ARGUMENTS` is empty or vague, ask the user for:

1. **Goal** — what to optimize (e.g. "codereview test speed", "app bundle size", "go build time", "golint speed")
2. **Command** — the benchmark command to run (e.g. `gotest`, `cd backend/ && go test ./internal/domain/codereview/...`, `cd apps/app && pnpm build`)
3. **Metric** — what number to extract from the output and which direction is better (`lower` or `higher`)
4. **Files in scope** — which directories/files may be changed
5. **Constraints** — things that must NOT break (e.g. "all tests must still pass", "no API changes")

If `$ARGUMENTS` is clear enough, infer reasonable defaults and confirm with the user before proceeding. For example:

- `/autoresearch codereview test speed` → command: `cd backend/ && go test ./internal/domain/codereview/...`, metric: wall-clock seconds (lower is better), scope: `backend/internal/domain/codereview/`
- `/autoresearch app bundle size` → command: `cd apps/app && pnpm build`, metric: bundle size bytes (lower is better), scope: `apps/app/`
- `/autoresearch go build time` → command: `cd backend/ && go build ./...`, metric: wall-clock seconds (lower is better), scope: `backend/`

### 1.2 Check for existing session

Look for `autoresearch.jsonl` and `autoresearch.md` in the repo root (they may be on disk but gitignored from a previous session).

- **If both exist and the goal matches**: this is a **resume**. Read `autoresearch.md` to understand what's been tried, read `autoresearch.jsonl` to reconstruct experiment history. Summarize progress so far, then skip to Phase 2 (the loop). Do NOT re-run setup or overwrite these files.
- **If both exist but the goal is different**: these are leftover files from a previous session. Ask the user:
  - **Archive**: move old files to `.autoresearch/<old-goal-slug>/` for reference, then start fresh
  - **Delete**: remove old files and start fresh
  - **Resume old session**: switch to the previous goal instead
- **If neither exists**: this is a fresh session. Continue with setup below.
- **If only one exists**: warn the user — something is inconsistent. Ask whether to start fresh or attempt recovery.

### 1.3 Create branch

Create a branch for this optimization work. Use the repo's branch-create skill:

```
/branch-create chore/autoresearch-<short-goal-slug>
```

If already on a non-main branch (e.g. resuming), skip branch creation.

### 1.4 Understand the code

Before writing anything, **deeply read** all files in scope. Understand the architecture, patterns, and dependencies. This investment pays off — blind changes waste experiment cycles.

### 1.5 Write session files

Create `autoresearch.md` at the repo root with this template:

```markdown
# Autoresearch: <goal>

## Objective

<one-paragraph description of what we're optimizing and why>

## Metric

- **Primary**: <metric name> (<unit>) — <lower|higher> is better
- **Secondary**: <any secondary metrics to track, e.g. "test count must not decrease">

## Command

\`\`\`bash
<the benchmark command>
\`\`\`

## Checks Command

\`\`\`bash
<correctness checks command, if any — e.g. gotest, golint, cd apps/app && pnpm type-check>
\`\`\`

## Files in Scope

<list of directories/files that may be modified>

## Off Limits

<files/patterns that must not be touched>

## Constraints

<things that must not break>

## Baseline

- **Value**: <filled after first run>
- **Date**: <filled after first run>

## What's Been Tried

<filled as experiments run — keep this updated>

## Dead Ends

<approaches that were tried and reverted — don't repeat these>
```

Create `autoresearch.sh` at the repo root:

```bash
#!/usr/bin/env bash
set -euo pipefail
<the benchmark command>
```

Make it executable: `chmod +x autoresearch.sh`

If the user specified constraints that require correctness validation, also create `autoresearch.checks.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
<the correctness check command(s)>
```

Make it executable: `chmod +x autoresearch.checks.sh`

**Default checks**: if the user doesn't specify a checks command, create a lightweight `autoresearch.checks.sh` scoped to the files being optimized — not `/preflight` (which is too heavy for every iteration). Choose checks that validate correctness without duplicating the benchmark:

- **Go backend scope**: `cd backend/ && go vet ./... && golangci-lint run` (skip `go test` if the benchmark already runs tests)
- **Frontend scope**: `cd apps/app && pnpm type-check` (skip `pnpm build` if the benchmark already builds)
- **Cross-cutting**: `golint` for Go changes, `lint` for frontend changes

Reserve `/preflight` for the periodic full validation (step 2.6) and the final stopping check.

### 1.6 Run baseline

**Warm-up**: run `./autoresearch.sh` once and discard the result. The first run of Go commands is always slower due to compilation cache warming and module resolution. Skipping warm-up inflates the baseline.

Run `./autoresearch.sh` and extract the metric value. Record this as the baseline.

Log the baseline to `autoresearch.jsonl` (one JSON object per line):

```jsonl
{"type":"config","name":"<goal>","metric_name":"<name>","metric_unit":"<unit>","direction":"<lower|higher>","timestamp":"<ISO 8601>"}
{"run":1,"metric":<value>,"status":"keep","description":"baseline","timestamp":"<ISO 8601>"}
```

Update `autoresearch.md` with the baseline value.

Commit these session files:

```bash
git add -f autoresearch.md autoresearch.sh autoresearch.jsonl
git add -f autoresearch.checks.sh 2>/dev/null || true
git commit -m "chore: autoresearch baseline for <goal>"
```

Note: session files are gitignored (`autoresearch.*` in `.gitignore`), so `git add -f` is needed to force-track them during the session. They get untracked at stop time.

---

## Phase 2 — The Experiment Loop

### LOOP FOREVER. Never ask "should I continue?" Never stop unless the user interrupts.

Each iteration:

#### 2.1 Think

- Re-read source files if needed. Study the code to find optimization opportunities.
- Review `autoresearch.md` — especially "What's Been Tried" and "Dead Ends" — to avoid repeating failed approaches.
- Consider: algorithmic improvements, unnecessary work elimination, caching, parallelization, lazy evaluation, dead code removal, dependency reduction, test optimization, query optimization.
- If stuck after 3+ consecutive reverts, step back and think structurally differently. Re-read the source files. Try a completely different angle.

#### 2.2 Change

Make a focused code change. Prefer small, isolated changes — they're easier to reason about and attribute metric changes to.

**Rules:**

- Only modify files listed in "Files in Scope"
- Never touch files in "Off Limits"
- Keep changes minimal and reversible
- One idea per experiment — don't bundle unrelated changes

#### 2.3 Measure

Run the benchmark:

```bash
time ./autoresearch.sh 2>&1
```

Extract the primary metric from the output. Then run correctness checks:

```bash
./autoresearch.checks.sh 2>&1
```

#### 2.4 Decide

Compare the metric to the previous best value:

| Outcome                    | Action                                                    |
| -------------------------- | --------------------------------------------------------- |
| **Metric improved**        | **KEEP** — stage and commit the change                    |
| **Metric equal + simpler** | **KEEP** — less code/complexity at same perf is a win     |
| **Metric equal or worse**  | **DISCARD** — revert all changes                          |
| **Benchmark crashed**      | **DISCARD** — revert all changes                          |
| **Checks failed**          | **DISCARD** — revert all changes, even if metric improved |

**Keep** (metric improved):

```bash
git add -A
git commit -m "perf: <short description of what changed>

Autoresearch run #<N>: <metric_name> <old_value> → <new_value> <unit> (<percentage>% improvement)"
```

**Discard** (anything else):

```bash
git checkout -- .
git clean -fd
```

#### 2.5 Log

Append to `autoresearch.jsonl`:

```jsonl
{"run":<N>,"metric":<value>,"status":"<keep|discard|crash|checks_failed>","description":"<what was tried>","timestamp":"<ISO 8601>"}
```

Update `autoresearch.md`:

- Add entry to "What's Been Tried" with run number, description, metric value, and status
- If discarded after 2+ attempts at similar approaches, add to "Dead Ends"
- Update baseline/best metric if improved

#### 2.6 Periodic preflight

Every 5 kept experiments, run `/preflight` as a full validation pass. This catches accumulated drift in codegen, formatting, or lint that individual checks might miss. If preflight fails, fix the issues and amend the last commit before continuing.

#### 2.7 Repeat

Go back to step 2.1. **Do not stop. Do not ask for permission to continue.**

---

## Behavioral Rules

1. **Primary metric is king.** Improved = keep. Worse = discard. No exceptions.
2. **Simpler is better.** Equal metric + less code/complexity = keep (simplification is valuable). Equal metric + same complexity = discard.
3. **Don't thrash.** If you've reverted the same idea 2+ times, it doesn't work. Move on. Add it to Dead Ends.
4. **Think longer when stuck.** Re-read source files. Study profiling output. Consider fundamentally different approaches.
5. **Never break correctness.** A faster test suite that skips tests is not an improvement. A smaller bundle that drops features is not an improvement.
6. **Track secondary metrics.** Note if test count decreases, if error rates change, or if other important metrics shift — even if the primary metric improves.
7. **Keep `autoresearch.md` current.** This is the session's memory. A fresh agent should be able to resume from this file alone.
8. **Small experiments.** One idea per run. Large multi-change experiments make it impossible to know what helped.
9. **Git is your safety net.** Every kept change is committed. Every failed change is reverted cleanly. The working tree should always be clean between experiments.

---

## Monorepo-Specific Guidance

This is a Go backend + Next.js frontend monorepo using Nix/direnv. Key patterns:

- **Nix environment required**: all commands (`gotest`, `golint`, `bufgen`, etc.) need Nix/direnv. If direnv is not active, prefix with `direnv exec .`
- **Go backend** (`backend/`):
  - Domain structure: `internal/domain/<name>/{service/,worker/,db/,invoke/}`
  - Run all tests: `gotest` (Nix script, runs `go test ./...` from `backend/`)
  - Single domain tests: `cd backend/ && go test ./internal/domain/<name>/...`
  - Integration tests: `cd backend/ && go test -tags=integration ./...`
  - Lint: `golint` / `golint-fix`
  - Build: `cd backend/ && go build ./...`
- **Frontend** (`apps/app/`):
  - Next.js dashboard
  - Tests: `cd apps/app && pnpm test`
  - Build: `cd apps/app && pnpm build`
  - Type-check: `type-check` (Nix script)
  - Lint: `lint` (Nix script)
- **Common optimization targets**:
  - Go test speed: `gotest` or `cd backend/ && go test ./internal/domain/<name>/...`
  - Go build time: `cd backend/ && go build ./...`
  - Go lint speed: `golint`
  - Frontend bundle size: `cd apps/app && pnpm build` → check `.next/` artifacts
  - Frontend type-check speed: `type-check`
- **Go test caching**: Go caches test results. When benchmarking test speed, use `-count=1` to disable caching (e.g. `go test -count=1 ./...`), otherwise metrics will be misleading after unchanged runs
- **Code-gen pipeline**: `bufgen` → `sqlc generate` → `gomocks` (run in order when changing APIs)
- **Off-limits by default**: `db/` dirs (sqlc-generated), `pkg/proto/` (buf-generated), `mock_*.go` (gomocks-generated)
- **Shared packages**: changes to `packages/shared/*` can affect multiple frontend consumers — be cautious
- **Temporal workflows**: if optimizing workflow code, remember versioning constraints (see `backend/AGENTS.md`)

---

## Resume Protocol

When resuming (autoresearch.md + autoresearch.jsonl exist):

1. Read `autoresearch.md` — understand the goal, what's been tried, and dead ends
2. Read `autoresearch.jsonl` — reconstruct the full experiment history and current best metric
3. Read the files in scope to re-orient on the current state of the code
4. Summarize: "Resuming autoresearch for <goal>. <N> experiments so far, <K> kept. Current best: <metric>. Last tried: <description>."
5. Continue the loop from Phase 2

---

## Stopping

The user can interrupt at any time. When they do:

1. Ensure the working tree is clean (revert any in-progress changes if needed)
2. Run `/preflight` to ensure the final state is clean (codegen, lint, format, tests all pass)
3. Save the session history for the PR — read `autoresearch.md` and prepare a summary to include in the PR body (step 7).
4. Exclude session files from the PR but keep them on disk for local reference:
   ```bash
   git rm --cached autoresearch.md autoresearch.sh autoresearch.jsonl
   git rm --cached autoresearch.checks.sh 2>/dev/null || true
   git commit -m "chore: untrack autoresearch session files"
   ```
   The files remain in the working directory (already gitignored via `autoresearch.*` in `.gitignore`). They are also recoverable from earlier commits on the branch via `git show <commit>:autoresearch.md`.
5. Run `/changelog-add` to generate a changelog entry summarizing the optimization work
6. Summarize results to the user:
   - Total experiments run
   - Experiments kept vs discarded
   - Baseline metric → current best metric (total improvement)
   - Top 3 most impactful changes
7. Run `/create-pr` to open a pull request. Include the session history from step 3 as a collapsible `<details>` section in the PR body under "## Autoresearch Log". The `/create-pr` skill will handle conventional commit title and ask for user approval. Since `/preflight` and `/changelog-add` already ran, the create-pr pre-flight checks should pass automatically.
