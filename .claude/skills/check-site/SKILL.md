---
name: check-site
description: Check the portfolio site for size (under 500 KB), HTML structure, leftover TODO placeholders, accessibility basics and colour contrast, then report in simple English. Use after changing index.html, style.css or main.js, or when asked to "check the site".
---

Run these checks from the project root and report the results as a short beginner-friendly list (✅ pass / ⚠️ problem + how to fix it).

1. **Size**: total bytes of site files (exclude `*.md`, dotfiles, `.claude/`, `node_modules/`, `package*.json`):
   `find . -type f ! -name '*.md' ! -name '.*' ! -name 'package*.json' ! -path './.claude/*' ! -path './node_modules/*' ! -path './.git/*' -printf '%s\n' | awk '{s+=$1} END {print s}'`
   It must be under 512000. List the 3 biggest files.

2. **Linters**: run `PATH="$HOME/.local/node/bin:$PATH" npm run -s lint` and include any errors.

3. **HTML structure**: parse `index.html` with Python's `html.parser` (`python3 -I`) and confirm tags are balanced (ignore void tags like `meta`, `link`, `br`, `img`, `input`, `path`, `circle`). Check there is exactly one `<h1>`, that `<html lang>` is set, and that every `id` is unique.

4. **Placeholders**: list each `TODO` in `index.html` with its line number and what still needs filling in (email, WhatsApp number, About text, project cards).

5. **Accessibility basics**:
   - every `<img>` has `alt`
   - every icon-only `<button>` has `aria-label`
   - decorative `<svg>` has `aria-hidden="true"`
   - `target="_blank"` links have `rel="noopener"` and "(opens in new tab)" sr-only text
   - link text is unique (repeated text like "Live demo" needs an sr-only project name)

6. **Contrast**: for each colour pair in `css/style.css` (text, muted, accent, and accent-text on bg, surface, surface-alt and accent-soft, in **both** light and dark blocks), compute the WCAG contrast ratio with a small inline Python script. Flag anything under 4.5:1 for normal text or 3:1 for large text (hero name, headings).

7. **Theme sync**: confirm the two dark-theme blocks in `style.css` (`@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`) define the same variables with the same values.

8. **Reduced motion**: confirm every `animation`/`transition` in `style.css` is covered by the `prefers-reduced-motion` block.

Don't fix anything unless the user asks. Just report, with the most serious problems first.
