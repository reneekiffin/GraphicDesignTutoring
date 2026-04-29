# Renee Kiffin — Graphic Design Tutoring Site

A fast, SEO-friendly, single-page marketing site for Renee Kiffin's online graphic design tutoring. Built with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build step, no `npm install`. Open the files in a text editor, edit, save, and you're done.

---

## How to view the site locally

Just **double-click `index.html`**. It opens in your browser.

(For the smoothest experience — Lunacal calendar embed, in particular — you can also run a tiny local server: `python3 -m http.server` from this folder, then visit `http://localhost:8000`.)

---

## File map

```
/
├── index.html         ← the page itself, all content lives here
├── styles.css         ← all styling
├── script.js          ← menu toggle, FAQ accordion, scroll animations, calendar loader
├── sitemap.xml        ← search engines use this to find pages
├── robots.txt         ← tells search engines what they can crawl
├── images/
│   ├── og-image.jpg     ← preview image when the site is shared on social
│   ├── renee-headshot.jpg ← About section photo
│   └── favicon.ico      ← the tiny icon in browser tabs
└── README.md          ← this file
```

---

## How to edit content

Open `index.html` in **any text editor** — VS Code, Sublime Text, even Notepad or TextEdit. Each big section is wrapped in a clearly-labeled HTML comment like `<!-- ===== HERO ===== -->`. Find the section, change the text between the tags, save, and refresh your browser.

You almost never need to touch `styles.css` or `script.js` to update wording.

### Common edits

#### Update the price (currently $60/hour)

The price appears in a few places. Search for `60` or `$60` and update each:

1. **Hero price line** — `index.html`, look for `<p class="hero-price">`.
2. **Booking section price banner** — `index.html`, look for `<p class="price-banner">`.
3. **FAQ — "How long are sessions?"** — `index.html`, look for `Most sessions are one hour`.
4. **JSON-LD structured data (Service block)** — `index.html`, near the top of the file inside `<script type="application/ld+json">`. Update both `"price": "60"` lines.
5. **SEO meta description** — `index.html` `<meta name="description">` near the top.
6. **Sitemap / OpenGraph descriptions** — search the file for `$60`.

#### Add a new testimonial

In `index.html`, find the `<!-- ===== TESTIMONIALS ===== -->` section. Copy any existing card and paste it inside the same `<ul>`:

```html
<li class="card testimonial reveal">
  <blockquote>
    <p>"Their quote goes here."</p>
  </blockquote>
  <footer><cite>Their Name</cite><span>Their role</span></footer>
</li>
```

#### Add a new subject card

Find `<!-- ===== WHAT YOU CAN LEARN ===== -->`. Copy one of the existing `<li class="card">` blocks and edit the heading, paragraph, and (optionally) the inline SVG icon.

#### Add or edit an FAQ

Find `<!-- ===== FAQ ===== -->`. Copy one `<details class="faq-item reveal">` block and edit the `<summary>` (question) and the paragraph (answer).

> **Important:** if you add or change FAQs, also update the matching block in the JSON-LD `"FAQPage"` script near the top of `index.html` so the FAQ shows up correctly in Google search results.

#### Swap the photo

Replace `images/renee-headshot.jpg` with your new file. Keep the same filename so you don't have to update any code. Aim for a square image (the design displays it as 1:1).

#### Swap the social preview image (Open Graph)

Replace `images/og-image.jpg`. Recommended size: **1200 × 630 pixels**. This is the image that shows up when you paste the site link into Facebook, LinkedIn, Slack, iMessage, etc.

#### Swap the favicon

Replace `images/favicon.ico` with your new icon (16×16 and 32×32 multi-resolution `.ico` is best).

---

## Replace `YOUR-DOMAIN.com` before launching

Before you go live, find-and-replace `YOUR-DOMAIN.com` with the real domain (e.g. `tutoring.reneekiffin.com`). It appears in:

- **`index.html`** — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, and inside all three JSON-LD blocks (look for `"url"`, `"image"`, etc.)
- **`sitemap.xml`** — every `<loc>` line
- **`robots.txt`** — the `Sitemap:` line

Most editors have a "Replace in Files" feature (VS Code: `Cmd+Shift+H` on Mac, `Ctrl+Shift+H` on Windows). Use it once and you're done.

---

## How to deploy

### Easiest — Netlify Drop (drag & drop)

1. Go to **<https://netlify.com/drop>**
2. Drag this entire folder onto the page.
3. Done. Netlify gives you a free `something.netlify.app` URL immediately. You can connect a custom domain from the dashboard.

### Cloudflare Pages

1. Push this folder to a GitHub repo.
2. Sign in at **<https://pages.cloudflare.com>** and connect the repo.
3. When asked for a build command, leave it blank. Set the output directory to `/` (root).

### GitHub Pages

1. Push this folder to a GitHub repo.
2. In the repo settings → Pages → set Source to "Deploy from a branch" → branch `main` → folder `/ (root)`.
3. GitHub gives you a `username.github.io/repo-name` URL.

### Any other static host

Upload the whole folder via FTP, S3, or whatever your host accepts. There is no build step — the files are the site.

---

## The booking calendar

The calendar at the bottom of the page is **Lunacal**, an embedded scheduling widget. The `<div id="my-lunacal-inline-designtutoring">` in `index.html` is the placeholder; the actual widget is loaded by `script.js` only when a visitor scrolls near it (this keeps the page fast).

To change which calendar link is shown, edit `script.js` and update the `calLink: "reneekiffin/designtutoring"` lines.

To change the calendar's colors or styling, edit the `cssVarsPerTheme` block in `script.js`.

---

## Updating colors / branding

Open `styles.css` and look at the very top — the `:root` block defines every color used on the site:

```css
:root {
  --color-primary: #0B0D0E;   /* main text + buttons */
  --color-bg: #FFFFFF;        /* page background */
  --color-muted: #EDEDED;     /* light gray accents */
  --color-cream: #FAF8F5;     /* alternating section background */
  --color-border: #DFDFDF;    /* card borders */
  --color-accent: #000000;
}
```

Change a value, save, refresh — every spot that uses that color updates.

---

## Accessibility & SEO checklist (already built in)

- ✅ Semantic HTML (one `<h1>`, logical heading hierarchy, `<header>`/`<main>`/`<section>`/`<footer>`)
- ✅ Skip-to-content link for keyboard users
- ✅ Hamburger menu with proper ARIA attributes
- ✅ FAQ uses native `<details>`/`<summary>` (works without JavaScript)
- ✅ All images have descriptive `alt` text and explicit dimensions
- ✅ Below-the-fold images are lazy-loaded
- ✅ Respects `prefers-reduced-motion`
- ✅ JSON-LD structured data for Person, Service, and FAQPage
- ✅ OpenGraph + Twitter card meta tags
- ✅ `sitemap.xml` and `robots.txt`
- ✅ Mobile-first CSS, tested at 375 / 390 / 768 / 1024 / 1440px

---

## Questions?

If something on the site breaks after an edit, the most common cause is a missing closing tag (e.g. you deleted `</li>` by accident). Open the file in VS Code — it highlights mismatched tags automatically.

Need anything else changed? Feel free to email a developer with this README in hand — everything they need to know about the site is here.
