---
name: create-pr
description: >
  Create a pull request with conventional commit title and the repo's PR template.
  Use when: user says "create pr", "open pr", "make pr", "submit pr", "push and pr",
  or after finishing a feature/fix. Accepts optional context as args
  (e.g., `/create-pr fix auth token refresh`).
---

# Create PR

## Usage

- Claude Code: `/create-pr [optional context]`
- Codex: `$create-pr [optional context]`

## Instructions

Create a GitHub pull request with a conventional commit title (validated by CI) and the repo's PR template.

## Steps

### 1. Gather context

Run these in parallel:

- `git status` — check for uncommitted/unstaged changes
- `git log main..HEAD --oneline` — commits on this branch
- `git diff main...HEAD --stat` — changed files summary
- `git branch --show-current` — current branch name
- `git diff main...HEAD` — full diff for understanding changes

If there are uncommitted changes, ask the user if they want to commit first (or offer to run `/commit`).

If HEAD is on `main` with no branch, ask the user for a branch name before proceeding.

### 2. Pre-flight checks

**Changelog check**: if no `.releases/*.md` file is present in the diff, a changelog is needed. CI will reject the PR without one.

- **User-facing changes** (files in `apps/`, `backend/cmd/`, `backend/internal/`, `backend/pkg/`, `proto/`, `packages/shared/`): offer to run `/changelog-add`.
- **Internal-only changes** (CI, docs, tests, tooling, skills): run `changelog add --empty` directly — no user prompt needed.

**Preflight check**: offer to run `/preflight` to ensure codegen, tests, lint, and formatting are all passing before creating the PR. If the user declines, proceed — but note it in the output.

If both are needed, run `/changelog-add` first (it creates a file that should be committed), then `/preflight`.

### 3. Determine PR title

The title **must** follow conventional commits format (validated by `pr-cc.yaml`):

```
<type>(<scope>): <description>
```

**Allowed types**: `build`, `feat`, `fix`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`

**Scope**: use the primary affected area (e.g., `codereview`, `app`, `engine`, `sandbox`, `cli`, `runner`). Omit scope only if changes span many areas.

**Description**: lowercase, imperative mood, concise. No period at end.

Examples:

- `fix(codereview): resolve stale SHA on force-pushed PRs`
- `feat(app): add workspace deletion page`
- `chore(deps): bump go dependencies`
- `refactor(engine): extract runner provisioning logic`

If the user provided context as args, use it to inform the title. Otherwise, infer from the diff/commits.

### 4. Fill the PR template

Use the repo's template (`.github/pull_request_template.md`) structure. Fill in:

- **Summary**: 1-3 sentences describing what changed and why
- **Type of Change**: check the appropriate box(es)
- **Testing**: check what applies based on the changes
- **Documentation**: check "No documentation needed" with reason, unless docs were actually changed
- **Checklist**: check all that apply
- **Related Issues**: link any referenced issues from commits or branch name (e.g., `Fixes #123`)
- **Screenshots**: omit section if not applicable (no UI changes)
- **Additional Notes**: include only if there's useful context for reviewers

Keep it concise. Don't over-fill — empty sections are fine.

### 5. Show preview and get approval

Before pushing or creating the PR, show the user a preview:

```
Title: fix(codereview): resolve stale SHA on force-pushed PRs

Body:
---
## Summary
...

## Type of Change
...
---
```

Wait for the user's explicit approval before proceeding. The user may request changes to the title or body.

**Skip this step only if** the user explicitly said to create the PR without review (e.g., "just push it", "no review needed", "auto-approve").

### 6. Push and create PR

```bash
# Push branch (set upstream if needed)
git push -u origin <branch-name>

# Create PR using gh CLI with the template
gh pr create --title "<conventional-commit-title>" --assignee @me --reviewer LuxorLabs/tenki --body "$(cat <<'EOF'
<filled template>
EOF
)"
```

### 7. Show result

Print the PR URL.

## Interaction style

Use the `AskUserQuestion` tool for **all** confirmation prompts (commit, changelog, preflight, PR approval). Never print numbered lists in chat — always use the tool so the user gets an interactive selection UI.

For the final PR preview approval, show the title + body preview as chat text, then use `AskUserQuestion`:

```
question: "Create this PR?"
options:
  - label: "Yes, create it (Recommended)"
    description: "Push branch and open the PR"
  - label: "No, cancel"
    description: "Abort without creating the PR"
```

The user can always select "Other" to provide custom edits via the tool's built-in free-text option.

## Behavior

- **Conventional commits required**: CI will reject PRs with non-conforming titles. Always use the `type(scope): description` format.
- **User context wins**: if args are provided, use them to determine the title and summary
- **Don't push to main**: never create a PR from main to main. If on main, create a branch first.
