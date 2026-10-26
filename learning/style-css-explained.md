# `style.css` explained, line by line

This guide walks through `css/style.css` from top to bottom. Each piece of code is shown first, then explained in plain English.

Keep `style.css` open next to this file. The best way to learn is to **change one value, save, reload the browser and see what happens**. You can't break anything for good: if something goes wrong, just undo.

---

## First, 5 ideas you need

1. **A CSS rule** looks like this:
   ```css
   p { color: red; }
   ```
   - `p` is the **selector**. It decides *which* elements on the page this rule affects (here, every `<p>` paragraph).
   - `color` is a **property**. It names *what* to change.
   - `red` is the **value**. It says *what to change it to*.
   - Each `property: value;` pair is called a **declaration**, and it ends with `;`.

2. **Selectors you will see:**
   - `p`, `h1`, `a`: an HTML tag name. Matches every element of that kind.
   - `.card`: a dot means a **class**. Matches `<article class="card">`.
   - `#main`: a `#` means an **id**. Matches `<main id="main">`.
   - `.site-nav a`: a space means "inside". Matches `<a>` tags *inside* `.site-nav`.
   - `a:hover`: a colon means a **state**, here "while the mouse is over it".

3. **Comments** look like `/* ... */`. The browser ignores them. They are notes for humans.

4. **Units:**
   - `px`: pixels, a fixed size.
   - `rem`: relative to the browser's base text size (usually 16px). So `1rem` = 16px and `2rem` = 32px. Visitors who set bigger text in their browser get bigger text on your site too, which is good for accessibility.
   - `em`: relative to the *current element's* text size.
   - `%`: a percentage of the parent element.
   - `vw` / `vh`: 1% of the browser window's width / height. `vmax` is 1% of whichever side is bigger.
   - `ch`: about the width of one character, handy for limiting line length.
   - `s`: seconds, used for animations.

5. **The "cascade":** if two rules set the same thing on the same element, the *more specific* selector wins. If they're equally specific, the one written *later* in the file wins. That's why the "bigger screens" rules are at the bottom: they override the phone rules above them.

---

## The header comment

```css
/* =========================================================
   Shalman Dipto — portfolio styles
   Mobile-first: base styles are for phones, media queries
   at the bottom add changes for bigger screens.
   ========================================================= */
```
Just a note. "Mobile-first" means we style for phones first, then *add* changes for bigger screens. Phones get the simplest CSS, and that keeps the site fast.

---

## 1. Colors

```css
:root {
```
`:root` means "the whole page" (the `<html>` element). Things set here can be used anywhere.

```css
  --bg: #fafafa;
```
A name starting with `--` is a **CSS variable** (also called a "custom property"). It's like a labelled box holding a value. `--bg` holds the page background color. `#fafafa` is a color written in **hex**: 2 digits each for red, green and blue. `#fafafa` is almost white.

Later we write `var(--bg)` to use it. **Why use variables?** Change the color here once and every place that uses `var(--bg)` updates. That's also how dark mode works: we just swap what's in the boxes.

```css
  --surface: #ffffff;       /* color for cards, chips and buttons: pure white */
  --surface-alt: #f1f2f6;   /* slightly grey background for every other section */
  --text: #18181b;          /* main text: almost black */
  --muted: #52525b;         /* softer grey for paragraphs */
  --accent: #4338ca;        /* your brand color: indigo. Used for links and buttons */
  --accent-text: #ffffff;   /* text that sits ON the accent color, like the button label */
  --accent-soft: #e6e7fb;   /* very pale indigo for hover backgrounds and tags */
  --border: #e2e3ea;        /* light grey for thin borders */
```
More color boxes. Each one has a job, so you never need to remember "which grey was that?"

```css
  --shadow: 0 6px 20px rgb(15 17 21 / 0.08);
```
A shadow, stored so it can be reused. Read it as: move it 0 sideways, 6px down, blur it 20px, and use a nearly black color at 8% strength (`/ 0.08`). The result is very soft.

```css
  --radius: 14px;
```
How round the card corners are.

```css
  --header-h: 64px;
```
The header's height. It's used in more than one place, so it lives in a variable.

```css
  --hero-1: #c7d2fe; /* soft indigo */
  --hero-2: #fbcfe8; /* soft pink */
  --hero-3: #a5f3fc; /* soft cyan */
```
The three colors of the moving blobs behind your name.

```css
  --name-from: #4338ca;
  --name-to: #be185d;
```
Your name is drawn with a color fade (a **gradient**) from indigo to deep pink.

```css
  color-scheme: light;
}
```
Tells the browser "this page is light". It then draws its *own* parts, like scrollbars and form controls, to match.

### Dark colors, part 1: follow the device

```css
@media (prefers-color-scheme: dark) {
```
A **media query** is an "if" statement for CSS. This one means: *if the visitor's phone or computer is set to dark mode...*

```css
  :root:not([data-theme="light"]) {
```
...and the page has **not** been switched to light with your toggle button...

```css
    --bg: #0f1115;
    --surface: #171a21;
    ... (the rest)
    color-scheme: dark;
  }
}
```
...then refill the same color boxes with dark colors. We don't need to touch any other rule: every `var(--bg)` on the page now gets the dark value automatically.

Look at `--accent`: it's `#8b93ff` here, a *lighter* indigo. On a dark background a color must be lighter to stay readable.

### Dark colors, part 2: when the button is clicked

```css
:root[data-theme="dark"] {
  ... same dark colors ...
}
```
`[data-theme="dark"]` is an **attribute selector**. It matches when the `<html>` tag has `data-theme="dark"` on it. The JavaScript adds that when you click the moon button. The colors are written twice (here and in part 1) because CSS can't say "if device is dark OR button says dark" in one rule.

---

## 2. Base (the basics for every page)

```css
*,
*::before,
*::after { box-sizing: border-box; }
```
`*` means "every element". `::before` and `::after` are invisible extra bits CSS can attach to elements.

`box-sizing: border-box` changes how width is measured. Normally, if you say `width: 100px` and then add padding, the box grows bigger than 100px, which is confusing. With `border-box`, padding and border fit *inside* the 100px. Almost every modern site uses this.

```css
html { scroll-behavior: smooth; }
```
When you click "Projects" in the menu, the page glides down instead of jumping.

```css
body {
  margin: 0;
```
Browsers add a small gap around the page by default. This removes it so we control all the spacing ourselves.

```css
  background: var(--bg);
  color: var(--text);
```
Use our color variables for the page background and the default text color.

```css
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
Which font to use. The browser tries each one in order and uses the first that exists. `system-ui` means "the phone's or computer's own font": San Francisco on iPhone, Segoe UI on Windows, Roboto on Android. **No font has to be downloaded**, which is a big reason this site loads so fast. `sans-serif` at the end is the final backup.

```css
  font-size: 1rem;
```
Normal text size (usually 16px).

```css
  line-height: 1.65;
```
The space between lines is 1.65 × the text size. More space makes text easier to read.

```css
  -webkit-font-smoothing: antialiased;
```
Makes text look a little thinner and crisper on Mac. The `-webkit-` part is a **vendor prefix**: a property that only some browsers understand. Other browsers simply ignore it.

```css
  transition: background-color 0.25s, color 0.25s;
}
```
When the background or text color changes (for example when you switch themes), fade over 0.25 seconds instead of switching instantly.

```css
h1, h2, h3 { line-height: 1.2; margin: 0 0 0.6em; }
```
The commas mean "apply this to all three". Headings get tighter line spacing (big text needs less). `margin: 0 0 0.6em` is a shortcut with 4 values going **clockwise: top, right, bottom, left**. So it means no space above, a little space below.

```css
h2 { font-size: clamp(1.6rem, 4vw, 2.2rem); }
```
`clamp(min, preferred, max)` lets the size *flow* with the screen width. Here it means "try 4% of the window width, but never smaller than 1.6rem and never bigger than 2.2rem". Small on phones, bigger on laptops, with no media query needed.

```css
h3 { font-size: 1.2rem; }
p { margin: 0 0 1em; }
```
Card titles are a bit bigger than normal text. Paragraphs have no space above and one line's worth of space below.

```css
a { color: var(--accent); text-underline-offset: 3px; }
```
Links use the accent color. Their underline sits 3px lower so it doesn't touch letters like "g" and "y".

### Focus ring (important for accessibility)

```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: 6px;
}
```
People who use the **keyboard** (Tab key) instead of a mouse need to see where they are. `:focus-visible` matches the element they're on, and we draw a thick indigo outline around it, 3px away from the edge. The "-visible" part means mouse clicks don't show the ring, only keyboard use does.

```css
main:focus { outline: none; }
```
When the "Skip to main content" link jumps to `<main>`, we don't need a giant outline around the whole page.

### Screen-reader-only text

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```
This is a famous "recipe". It shrinks text to 1 pixel and cuts it off, so it's **invisible on screen but still read aloud by screen readers** (apps blind people use to hear the page). We use it for things like "(opens in new tab)" and "of Project One". You don't need to remember each line, just what the class does.

Why not `display: none`? Because that hides it from screen readers too.

### The container

```css
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}
```
A box that holds each section's content.
- `width: 100%`: fill the screen on phones...
- `max-width: 1100px`: ...but never get wider than 1100px. Very long lines are hard to read.
- `margin: 0 auto`: with 2 values, the first is top/bottom and the second is left/right. `auto` on left and right **centers the box**. This is the classic centering trick.
- `padding: 0 16px`: 16px of breathing room on the left and right, so text never touches the edge of a phone screen.

```css
.container.narrow { max-width: 760px; }
```
`.container.narrow` (no space) means "an element with **both** classes". About and Contact are mostly text, so they use a narrower box.

```css
section { scroll-margin-top: var(--header-h); }
```
The header stays stuck to the top of the screen. Without this line, clicking "About" would scroll the About heading *under* the header, where you can't see it. This leaves room above it.

---

## 3. Skip link

```css
.skip-link {
  position: absolute;
  top: -100px;
```
`position: absolute` lets us place the link exactly where we want. `top: -100px` pushes it 100px *above* the top of the screen, so it's hidden.

```css
  left: 16px;
  z-index: 100;
```
`z-index` controls what's on top when things overlap. Higher numbers sit on top. 100 is higher than anything else, so the link appears above the header.

```css
  padding: 10px 16px;
  background: var(--accent);
  color: var(--accent-text);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}
```
Make it look like a button: some padding, accent background, white text, rounded corners, semi-bold text (`600`; normal is `400`, bold is `700`), and no underline.

```css
.skip-link:focus { top: 12px; }
```
When a keyboard user presses Tab for the first time, the link gets focus and slides down into view. Pressing Enter skips straight past the menu to the main content.

---

## 4. Header & navigation

```css
.site-header {
  position: sticky;
  top: 0;
```
`sticky` with `top: 0` means: scroll normally, but once the header reaches the top of the screen, **stick there**.

```css
  z-index: 50;
```
Stay on top of the page content while scrolling.

```css
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
```
`color-mix` blends the page background with "see-through" (88% background, 12% transparent). `backdrop-filter: blur(8px)` blurs whatever scrolls *behind* the header. Together they give a "frosted glass" effect.

```css
  border-bottom: 1px solid var(--border);
}
```
A thin line under the header.

```css
.header-inner {
  position: relative;
```
Needed so the drop-down menu (further down) is positioned relative to *this* box.

```css
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
}
```
**Flexbox** is a layout tool. `display: flex` puts the children (logo, menu button, nav, theme button) **side by side in a row**.
- `align-items: center` centers them vertically.
- `justify-content: space-between` pushes the first and last items to the edges.

```css
.logo {
  display: grid;
  place-items: center;
```
`display: grid` with `place-items: center` is the shortest way to put something **exactly in the middle** of a box. Here it centers "SD".

```css
  width: 42px; height: 42px;
  border-radius: 10px;
  background: var(--accent);
  color: var(--accent-text);
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 0.5px;
}
```
A 42×42 rounded square in the accent color with extra-bold white letters, no underline, and letters spaced slightly apart.

```css
.icon-btn {
  display: grid;
  place-items: center;
  width: 44px; height: 44px; /* big enough to tap */
```
Shared styles for the two icon buttons (☰ and moon/sun). **44px is the smallest recommended size for something you tap with a finger.**

```css
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}
```
Remove the browser's default button padding, add a thin border, rounded corners and our colors. `cursor: pointer` shows the "hand" mouse pointer.

```css
.icon-btn:hover { border-color: var(--accent); }
```
The border turns indigo when the mouse is over it.

```css
.theme-toggle { margin-left: 8px; }
```
A small gap between the two buttons.

```css
.icon-btn[hidden] { display: none; }
```
The theme button starts with the `hidden` attribute in the HTML, and the JavaScript removes it. So if JavaScript doesn't run, visitors never see a button that does nothing. `display: none` removes the element completely.

```css
.icon-sun { display: none; }
[data-theme="dark"] .icon-sun { display: block; }
[data-theme="dark"] .icon-moon { display: none; }
```
Both icons are in the HTML. In light mode we hide the sun (so you see the moon, meaning "click for dark"). When the page is in dark mode, we show the sun and hide the moon.

```css
.site-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```
The menu is a list (`<ul>`). Remove the bullet points and the default indent.

```css
.site-nav a {
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--text);
  font-weight: 500;
  text-decoration: none;
}
```
Each menu link. `display: block` makes the *whole padded area* clickable, not just the word, which makes it easier to tap.

```css
.site-nav a:hover { background: var(--accent-soft); }
```
A pale indigo background under the mouse.

### The phone menu

```css
.menu-toggle { display: none; margin-left: auto; }
.js .menu-toggle { display: grid; }
```
In a flex row, `margin-left: auto` eats up all the empty space on the left, which **pushes this item (and everything after it) to the right**.

Then a small trick: the HTML file adds the class `js` to `<html>` *only if JavaScript is running*. So the ☰ button is hidden by default and only shown when JavaScript can make it work.

```css
.js .site-nav {
  display: none;
```
On phones (with JavaScript), the menu is hidden until ☰ is pressed...

```css
  position: absolute;
  top: calc(var(--header-h) - 4px);
  left: 16px;
  right: 16px;
```
...and when shown, it floats just below the header. `calc()` does math: 64px − 4px = 60px from the top. `left` and `right` of 16px make it nearly full width.

```css
  padding: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
```
It looks like a floating card.

```css
.js .site-nav.open { display: block; }
```
When the JavaScript adds the class `open`, the menu appears.

---

## 5. Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
```
`inline-flex` is flexbox, but the button sits *in a line* with other content like text does. It centers the icon and the word, with 8px between them (`gap`).

```css
  min-height: 48px;
  padding: 0 22px;
```
At least 48px tall, which is easy to tap, with 22px of space on the left and right.

```css
  border-radius: 999px;
```
A huge radius gives a perfect "pill" shape, whatever the button's size.

```css
  border: 2px solid var(--accent);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, background-color 0.2s, color 0.2s;
}
```
Indigo border, semi-bold text, no underline, and smooth changes on hover.

```css
.btn-primary { background: var(--accent); color: var(--accent-text); }
.btn-ghost { background: transparent; color: var(--accent); }
```
Two styles. **Primary** is filled with color, for the main action. **Ghost** is just an outline, for the second choice.

```css
.btn-ghost:hover { background: var(--accent-soft); }
.btn:hover { transform: translateY(-2px); }
```
On hover the ghost button gets a pale fill, and every button lifts up 2px. `translateY` moves something up or down without disturbing the layout around it.

---

## 6. Hero (the big colourful top section)

```css
.hero {
  position: relative;
  overflow: hidden; /* keeps the blobs inside the hero */
  padding: 72px 0 80px;
  background: var(--bg);
}
```
- `position: relative` makes the blobs (below) position themselves inside the hero.
- `overflow: hidden`: the blobs are bigger than the hero, and this cuts off anything sticking out.
- `padding: 72px 0 80px`: 3 values mean top, left/right, bottom.

```css
.hero-blobs span {
  position: absolute;
```
The blobs are three empty `<span>` tags in the HTML. `position: absolute` lets us place them anywhere inside the hero, and they don't push other content around.

```css
  width: 60vmax;
  height: 60vmax;
  border-radius: 50%;
```
Big squares (60% of the larger side of the screen), and `border-radius: 50%` turns a square into a **circle**.

```css
  filter: blur(60px);
  opacity: 0.7;
```
Blur them heavily so they become soft clouds of color, and make them 70% visible.

```css
  animation: drift 18s ease-in-out infinite alternate;
}
```
Play the animation named `drift` (defined below):
- `18s`: one round takes 18 seconds. Slow means subtle.
- `ease-in-out`: start slow, speed up, slow down. This feels natural.
- `infinite`: never stop.
- `alternate`: go forward, then backward, then forward... so it never "jumps" back to the start.

```css
.hero-blobs span:nth-child(1) { background: var(--hero-1); top: -30vmax; left: -20vmax; }
.hero-blobs span:nth-child(2) { background: var(--hero-2); top: -20vmax; right: -25vmax; animation-delay: -6s; }
.hero-blobs span:nth-child(3) { background: var(--hero-3); bottom: -40vmax; left: 20%; animation-delay: -12s; }
```
`:nth-child(1)` means "the 1st span", and so on. Each blob gets its own color and position. The negative numbers push them partly *outside* the hero, so we only see their soft edges. A **negative** `animation-delay` starts each blob part-way through its animation, so they don't all move in step.

```css
@keyframes drift {
  to { transform: translate(6vmax, 4vmax) scale(1.1); }
}
```
`@keyframes` *defines* an animation. `to` means the end point: move a little right and down, and grow 10%. The browser smoothly fills in every step between the start and this end.

```css
.hero-content {
  position: relative;
```
Without this, the absolute-positioned blobs would be painted *on top of* the text. `position: relative` puts the text back on top.

```css
  animation: fade-up 0.8s ease-out both;
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
```
When the page loads, the text starts invisible and 16px lower, then fades in while sliding up, over 0.8 seconds, once. `both` means "use the `from` look before it starts and keep the `to` look after it ends".

```css
.eyebrow {
  margin: 0 0 0.3em;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.5px;
}
```
The small "Hi, I'm" line above your name. Designers call a little label like this an "eyebrow".

```css
.hero h1 {
  font-size: clamp(2.5rem, 9vw, 4.5rem);
  letter-spacing: -1px;
  margin-bottom: 0.25em;
  color: var(--name-from); /* fallback if gradient text isn't supported */
}
```
Your name: big and fluid (from 40px up to 72px). Letters are pulled 1px closer, which looks better at large sizes. It gets a plain indigo color in case the gradient trick below doesn't work.

```css
@supports (background-clip: text) or (-webkit-background-clip: text) {
```
`@supports` is another "if". This one means *if this browser understands this feature...*

```css
  .hero h1 {
    background: linear-gradient(90deg, var(--name-from), var(--name-to));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
```
...then do the **gradient text trick**:
1. Paint a left-to-right (`90deg`) color fade from indigo to pink as the background.
2. `background-clip: text` means "only show the background *where the letters are*".
3. Make the letters themselves `transparent` so the gradient shows through.

```css
@media (forced-colors: active) {
  .hero h1 { background: none; color: CanvasText; }
}
```
Some people use Windows "High Contrast" mode, which replaces colors with their own. The gradient trick could make your name invisible there, so in that mode we remove it and use the system's normal text color (`CanvasText`).

```css
.tagline {
  max-width: 36ch;
  font-size: clamp(1.1rem, 2.8vw, 1.35rem);
  color: var(--text);
  margin-bottom: 1.8em;
}
```
The tagline. `max-width: 36ch` stops the line at about 36 characters, so it wraps nicely.

```css
.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
```
The two buttons sit side by side. `flex-wrap: wrap` lets them drop to a new line if the screen is too narrow.

```css
.hero .btn-ghost { background: var(--surface); }
.hero .btn-ghost:hover { background: var(--accent-soft); }
```
In the hero, the ghost button gets a solid background. Otherwise a colored blob could drift behind its text and make it hard to read.

---

## 7. Sections

```css
.section { padding: 64px 0; }
.section.alt { background: var(--surface-alt); }
.section p { color: var(--muted); }
```
Every section gets space above and below. Sections with the `alt` class get a slightly different background, so the page has gentle "stripes". Paragraphs use the softer grey.

### Skill chips

```css
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}
```
The skills list: items in a row that wrap onto new lines, 10px apart, with no bullets or indent.

```css
.chips li {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  font-weight: 500;
}
```
Each skill looks like a rounded pill ("chip").

### Project cards

```css
.cards {
  display: grid;
  gap: 20px;
}
```
**CSS Grid** is a layout tool for rows *and* columns. On phones there's 1 column by default. Later, media queries switch it to 2 or 3 columns.

```css
.card {
  display: flex;
  flex-direction: column;
```
Inside each card, things stack top to bottom (`column`).

```css
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
```
Card look: padding inside, white background, thin border, rounded corners, and smooth hover changes.

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--accent);
}
```
On hover the card lifts 4px, gets a shadow, and its border turns indigo.

```css
.tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 0 0 1.2em; padding: 0; }
.tags li { padding: 2px 10px; border-radius: 6px; background: var(--accent-soft); color: var(--text); font-size: 0.85rem; }
```
The small "HTML / CSS" labels on each card. They work like the skill chips, but are smaller.

```css
.card-links {
  display: flex;
  gap: 18px;
  margin: auto 0 0;
}
```
`margin-top: auto` inside a column flexbox **pushes the links to the bottom of the card**. So if one card has a longer description, all the "Live demo" links still line up.

```css
.card-links a {
  display: inline-block;
  padding: 8px 0; /* bigger tap area */
  font-weight: 600;
}
```
Extra padding above and below makes these small links easier to tap on a phone.

### Contact

```css
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1.5em;
}
```
On phones, the Email and WhatsApp buttons are stacked, each full width, so they're easy to tap.

---

## 8. Footer

```css
.site-footer {
  padding: 28px 0;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 0.9rem;
  color: var(--muted);
}
.site-footer p { margin: 0; }
```
Small, grey, centered text with a line above it.

---

## 9. Bigger screens

```css
@media (min-width: 640px) {
```
"If the screen is **at least** 640px wide" (big phones turned sideways, tablets)...

```css
  .cards { grid-template-columns: repeat(2, 1fr); }
```
...show project cards in **2 columns**. `1fr` means "1 share of the free space", so `repeat(2, 1fr)` makes two equal columns.

```css
  .contact-links { flex-direction: row; }
  .hero { padding: 110px 0 120px; }
  .section { padding: 88px 0; }
}
```
Contact buttons go side by side, and everything gets more breathing room.

```css
@media (min-width: 960px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
```
On laptops and desktops: **3 columns** of cards.

```css
  .js .menu-toggle,
  .menu-toggle { display: none; }
```
Hide the ☰ button. There's room for the full menu now.

```css
  .site-nav,
  .js .site-nav {
    display: block;
    position: static;
    padding: 0;
    margin-left: auto;
    margin-right: 12px;
    background: none;
    border: 0;
    box-shadow: none;
  }
```
Undo the "floating drop-down card" styles. `position: static` is the normal, non-floating position, so the menu just sits in the header row. `margin-left: auto` pushes it to the right side, next to the theme button.

```css
  .site-nav ul { display: flex; gap: 4px; }
}
```
Menu links go in a row instead of a column.

```css
@media (max-width: 959px) {
  html:not(.js) .header-inner { flex-wrap: wrap; height: auto; padding-block: 10px; }
  html:not(.js) .site-nav { width: 100%; order: 4; }
  html:not(.js) .site-nav ul { display: flex; flex-wrap: wrap; }
}
```
A backup for the rare visitor whose JavaScript is off on a small screen. `html:not(.js)` means "the page *without* the js class". The menu wraps onto its own line under the logo, so it's always usable. `order: 4` moves it to the end of the flex row. `padding-block` is padding on the top *and* bottom.

---

## 10. Respect "reduce motion"

```css
@media (prefers-reduced-motion: reduce) {
```
Some people get dizzy or sick from movement on screen, so they switch on "Reduce motion" in their phone or computer settings. This block runs only for them.

```css
  html { scroll-behavior: auto; }
```
Jump instead of gliding.

```css
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
```
Turn off **all** transitions and animations everywhere, including the blobs and the fade-in. `!important` makes this win over every other rule. Use `!important` very rarely; this is one of the few good reasons.

```css
  .btn:hover,
  .card:hover { transform: none; }
}
```
No lifting on hover either.

---

## Try these small experiments

1. Change `--accent` at the top to `#0f766e` (teal). Save and reload. Every button and link changes.
2. Change `18s` in the blob animation to `4s`. See how much busier it feels? That's why slow is "subtle". Change it back.
3. In the `@media (min-width: 960px)` block, change `repeat(3, 1fr)` to `repeat(2, 1fr)`.
4. Open your browser's DevTools (press **F12**), click an element, and edit its CSS live. This is the fastest way to learn.
