# Branch Help Center

Self-hosted Branch Help Center: [VitePress](https://vitepress.dev) content built
and served on Netlify. This replaces the Document360 site at help.branch.io.

- **Production (POC):** https://boisterous-tanuki-75d338.netlify.app
- **Current live site (Document360, until cutover):** https://help.branch.io

## Repo layout

```
account-hub/          Content, one .md per article, nested by category
marketer-hub/
developer-hub/
apidocs/              API reference — one folder per API with openapi.yaml;
                      operation pages are generated (see scripts/)
.vitepress/           VitePress config, theme, sidebar definitions
public/               Static assets + generated _redirects file
scripts/              Generators and checks (see below)
reports/              Redirect inputs/outputs and fix-later worklists
netlify.toml          Build settings + security headers
```

## Local development

```bash
npm install
npm run docs:dev      # dev server (regenerates API pages + search index first)
npm run docs:build    # production build to .vitepress/dist
```

Other scripts: `search:eval` and `search:audit` test local search quality;
`apidocs:generate` turns each `apidocs/*/openapi.yaml` into one real markdown
page per operation so endpoints are indexed by search.

## CI

Every PR triggers a build check (`build.yml`) and a Netlify deploy preview
(`deploy-preview.yml`). `ignoreDeadLinks` is `true` in the VitePress config
while content is still being migrated; flip it to `false` afterward so broken
internal links fail the build.

## Redirects (Document360 → this site)

Every URL that ever existed on help.branch.io gets a one-hop 301 to its new
home. The rules live in `public/_redirects` (~1,900 lines, served by Netlify).
**Never edit that file by hand** — regenerate it:

```bash
python3 scripts/generate-redirects.py
```

The generator combines four inputs:

1. `redirect-rule-list (19).csv` — Document360's redirect export (legacy
   URLs). Chains like `/v1/docs/a → /docs/b → /marketer-hub/docs/c` are
   flattened to a single hop.
2. The actual `.md` files in the hub folders — ground truth for where content
   lives now.
3. `apidocs/*/operations/` — the old API reference used flat URLs
   (`/apidocs/createqrcode`); these map into the new nested structure.
4. `reports/d360-sitemap-urls.txt` — snapshot of the live D360 sitemap, so
   every URL Google has indexed is either redirected or knowingly dead.
5. `reports/d360-api-articles.csv` — D360's API-workspace article export.
   API operations were renamed during spec cleanup, so old operation URLs
   (`/apidocs/createquicklinkurl`, `/v1-api/docs/en/...`) are matched to
   current operations by token matching within each article's API.
6. `reports/manual-redirects.csv` — hand-added one-offs no input can derive,
   e.g. API operations renamed during spec cleanup (`createquicklinkurl` →
   `createQuickLink`). Add a row here when someone reports a 404 for an old
   URL, then rerun the generator.

Old URLs whose content no longer exists anywhere (retired release notes, old
iOS-14 FAQs, etc.) intentionally 404 — our 404 page turns the slug into a
search. They're listed in `reports/dead-destinations.csv`. To point one at a
real page later, fill in its `target` column and rerun the generator; that one
edit rescues every legacy URL that pointed at it. Rows tagged
`[LIVE: in sitemap]` are pages still live on Document360 that were never
migrated — they double as the checklist for the remaining article-migration
pass, and should get either a migrated article or a manual target before
cutover.

**After migrating more articles, just rerun the generator** — new `.md` files
are picked up automatically and their redirect rules appear.

### Verifying against a deploy

```bash
python3 scripts/verify-redirects.py https://deploy-preview-XX--boisterous-tanuki-75d338.netlify.app
```

Checks every 301, every target, and that dead URLs return a real HTTP 404.
Note: the 404 checks only mean something on a real Netlify deploy —
`netlify dev` serves 200s for unknown paths.
