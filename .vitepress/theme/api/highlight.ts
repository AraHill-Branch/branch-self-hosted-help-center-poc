// Shared Shiki highlighter — one instance, reused across all code blocks.
// Languages are bundled eagerly (small set, ~all we need for API docs).
// Theme is locked to github-dark-default: clean, universally legible, pairs well
// with the site's forced-dark appearance.

import type { Highlighter } from 'shiki'
import { createHighlighter } from 'shiki'

const THEME = 'github-dark-default'
const LANGS = ['bash', 'javascript', 'python', 'php', 'json', 'http'] as const

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGS as unknown as string[],
    })
  }
  return highlighterPromise
}

export function highlight(code: string, lang: string): Promise<string> {
  return getHighlighter().then(hl => {
    const resolvedLang = (LANGS as readonly string[]).includes(lang) ? lang : 'txt'
    return hl.codeToHtml(code, { lang: resolvedLang, theme: THEME })
  })
}

export { THEME as HIGHLIGHT_THEME }
