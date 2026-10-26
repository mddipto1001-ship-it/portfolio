# Shalman Dipto — Portfolio

A small personal website made with plain HTML, CSS and a little JavaScript.
No frameworks, no build tools. The whole site is only about 20 KB.

## How to view it
- Double-click `index.html` to open it in your browser, **or**
- run `python3 -m http.server` in this folder and visit http://localhost:8000

## Files
| File | What it does |
|------|--------------|
| `index.html` | All the page content (text, sections, links) |
| `css/style.css` | All the look: colors, layout, light/dark themes |
| `js/main.js` | Theme button, mobile menu, footer year |
| `favicon.svg` | The little "SD" icon in the browser tab |

## Things to fill in (search for `TODO` in `index.html`)
1. **Email**: replace `your-email@example.com`
2. **WhatsApp**: replace `8801XXXXXXXXX` with your number (country code, no `+` or spaces)
3. **About**: write your own two paragraphs
4. **Projects**: change the title, text, tags and the two links on each of the 3 cards

## Check for mistakes (optional)
Node.js is installed in `~/.local/node`. To check your HTML and CSS:
```
export PATH="$HOME/.local/node/bin:$PATH"
npm run lint
```
`node_modules/`, `package.json` and the dot-files are tools only. Don't upload them with the site.

## Change the main color
In `css/style.css`, edit `--accent` near the top (once for light, twice for dark).

## Put it online for free
Upload this folder to GitHub Pages, Netlify or Cloudflare Pages. No setup needed.
