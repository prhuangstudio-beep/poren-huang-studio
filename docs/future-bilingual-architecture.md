# Future bilingual URL architecture

The current site is bilingual at one URL and has self-referencing `zh-Hant`, `en`, and `x-default` hreflang annotations. The existing `data/works.json` already supports a language split because it stores English and Chinese fields together.

1. Run the build twice: Chinese remains at `/works/{slug}` and English is emitted to `/en/works/{slug}`.
2. Add a language switcher derived from the current slug so it opens the matching artwork, not the home page.
3. Generate reciprocal hreflang links between Chinese and English pages, with `x-default` set to the preferred default.
4. Put both language URL sets in `sitemap.xml`.
5. Generate language-specific titles, descriptions, body copy, and `lang` attributes; do not hide a second language with CSS.
