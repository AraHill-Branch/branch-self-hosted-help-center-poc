#!/usr/bin/env tsx
/**
 * Build-time guard for the API-docs code highlighter.
 *
 * The highlighter (.vitepress/theme/api/highlight.ts) loads a specific set of
 * Shiki themes + grammars. If a dependency bump ships theme/grammar exports
 * that have no runtime module (this is exactly how shiki@4 silently broke the
 * build against VitePress 1.x), createHighlighter() rejects and EVERY code
 * sample degrades to unhighlighted plaintext — with no error in the build.
 *
 * This script exercises the real highlight() path across every bundled
 * language and fails the build loudly if anything can't load, so the
 * regression can never ship silently again.
 *
 * Wired into `npm run docs:build` ahead of `vitepress build`.
 */

import { highlight, LANGS } from '../.vitepress/theme/api/highlight'

const SAMPLES: Record<string, string> = {
  bash: 'curl https://api2.branch.io/v1/url',
  javascript: 'const x = await fetch(url)',
  python: 'import requests',
  ruby: "require 'net/http'",
  go: 'package main',
  java: 'var client = HttpClient.newHttpClient();',
  csharp: 'using System.Net.Http;',
  php: '<?php $ch = curl_init();',
  json: '{"ok": true}',
  http: 'POST /v1/url HTTP/1.1',
}

async function main() {
  const failures: string[] = []
  for (const lang of LANGS) {
    const code = SAMPLES[lang] ?? 'sample'
    try {
      const html = await highlight(code, lang)
      if (!html || !html.includes('shiki')) {
        failures.push(`${lang}: produced no highlighted output`)
      }
    } catch (e) {
      failures.push(`${lang}: ${(e as Error).message}`)
    }
  }

  if (failures.length) {
    console.error('✖ highlighter smoke check FAILED:')
    for (const f of failures) console.error(`   - ${f}`)
    console.error('\nThe API-docs code highlighter cannot load. Check the shiki version against VitePress, and that the themes/grammars in highlight.ts ship runtime modules.')
    process.exit(1)
  }

  console.log(`✓ highlighter smoke check OK (${LANGS.length} languages, 2 themes)`)
}

main()
