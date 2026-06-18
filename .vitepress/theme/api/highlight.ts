// Shared Shiki highlighter — one instance, reused across all code blocks.
//
// Languages cover every code-sample language we generate (codegen.ts
// SAMPLE_LANGS) plus json/http for response bodies. If you add a sample
// language, add its Shiki id here too — scripts/check-highlighter.ts is a
// build-time guard that fails loudly if a language or theme can't load.
//
// Themes: github-light-default + github-dark-default, emitted together via
// Shiki's dual-theme output (defaultColor:false) so code blocks follow the
// site's light/dark appearance through CSS variables instead of a hardcoded
// background. See HighlightedCode.vue for the var → color wiring.

import type { Highlighter } from 'shiki'
import { createHighlighter } from 'shiki'

export const LIGHT_THEME = 'github-light-default'
export const DARK_THEME = 'github-dark-default'

// Keep in sync with codegen.ts SAMPLE_LANGS shiki ids + the response langs.
export const LANGS = [
  'bash', 'javascript', 'python', 'ruby', 'go', 'java', 'csharp', 'php',
  'json', 'http',
] as const

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: LANGS as unknown as string[],
    })
  }
  return highlighterPromise
}

export function highlight(code: string, lang: string): Promise<string> {
  return getHighlighter().then((hl) => {
    // 'txt' is a built-in plaintext grammar — always available.
    const resolvedLang = (LANGS as readonly string[]).includes(lang) ? lang : 'txt'
    return hl.codeToHtml(code, {
      lang: resolvedLang,
      themes: { light: LIGHT_THEME, dark: DARK_THEME },
      // Emit both themes as CSS vars (--shiki-light / --shiki-dark) rather
      // than baking one in, so the rendered block follows site appearance.
      defaultColor: false,
    })
  })
}
