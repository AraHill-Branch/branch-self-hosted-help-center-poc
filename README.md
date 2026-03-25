# GitHub Configuration Files for Branch Help Center

These files go in the root of your `branch-help-center` repo. Copy the entire
`.github/` folder as-is.

## What's included

```
.github/
├── workflows/
│   ├── build.yml              # Validates every PR builds successfully
│   └── deploy-preview.yml     # Deploys a preview URL for every PR
└── ISSUE_TEMPLATE/
    └── suggest-edit.yml       # "Suggest an edit" form for anonymous users
```

## Setup steps

### 1. Build validation (build.yml) — works immediately

No setup needed. Once this file is in the repo, every pull request will
automatically trigger a build. If the build fails (broken frontmatter, missing
images, syntax errors), the PR gets a red X.

Your Writer will see this in the PR:
- ✅ Green check = safe to merge
- ❌ Red X = something broke, click "Details" to see what

### 2. Preview deploys (deploy-preview.yml) — choose one option

**Option A: Use Vercel**

Delete `deploy-preview.yml` entirely. Instead:
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Framework preset: "VitePress" (or "Other" → build command: `npm run docs:build`, output: `docs/.vitepress/dist`)
4. Deploy

That's it. Vercel automatically creates a preview URL for every PR and posts
it as a comment. No secrets, no workflow file needed.

### 3. Suggest-an-edit template (suggest-edit.yml) — works immediately

No setup needed. The template is available as soon as it's in the repo.

To link to it from your docs, add this to your VitePress config (see the
"Suggest an edit" section in the migration plan for the full implementation).

### 4. VitePress dead link detection — add to your config

VitePress can catch broken internal links at build time. Add this to your
`.vitepress/config.mts`:

```ts
export default defineConfig({
  // Fail the build if there are dead internal links.
  // Start with 'warn' during migration (lots of links will be broken),
  // switch to 'error' once all content is migrated (Sprint 5+).
  ignoreDeadLinks: false,   // set to true or 'localhostLinks' during early migration
})
```

You'll probably want to set
`ignoreDeadLinks: true` so broken cross-references don't block every PR.
Once all content is migrated, flip it to `false` so broken links fail the build.
