# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hard rules
- Always use plain HTML/CSS/JS. The site must use no frameworks, libraries, CDNs or build steps. npm is only for the dev-time linters in `package.json`, never for code the site loads.
- Keep pages under 500 KB. Count every site file (HTML, CSS, JS, SVG, images). Dev-only files don't count: `.md` notes, dotfiles, `.claude/`, `node_modules/`, `package*.json`. No web fonts: use the system font stack.

## Conventions
- The owner is a beginner: explain changes in simple English and keep code readable over clever.
- Colours live only as CSS variables in `:root`. Dark values are written **twice** in `css/style.css`: inside `@media (prefers-color-scheme: dark)` and in `:root[data-theme="dark"]`. Edit both together.
- New colours must meet WCAG AA contrast (4.5:1 normal text, 3:1 large text) in both themes, including text over the hero blobs.
- Any animation or transition must be switched off by the `prefers-reduced-motion` block at the end of `style.css`.
- The site must still work without JavaScript. The head script adds `.js` to `<html>`; JS-only UI is hidden unless `.js` is present (or via the `hidden` attribute).
- Header DOM order (menu button → nav → theme button) is deliberate, for keyboard tab order. Don't reorder it.
- Content the owner must fill in is marked `<!-- TODO -->` in `index.html`. Keep those markers until real content replaces them.
- `learning/style-css-explained.md` is a beginner walkthrough of `style.css`. Update it whenever `style.css` changes.

## Checking work
- Lint: `npm run lint` (html-validate + stylelint). Node lives in `~/.local/node/bin`, which is **not** on PATH, so prefix commands with `PATH="$HOME/.local/node/bin:$PATH"`.
- Stylelint's cosmetic formatting rules are switched off on purpose: reformatting `style.css` would break the line-by-line guide. Don't run `stylelint --fix`.
- Run `/check-site` after changes. A hook also warns automatically if the site goes over 500 KB.
- Preview: `python3 -m http.server` in this folder, or open `index.html` directly.
