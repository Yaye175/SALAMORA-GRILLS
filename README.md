# Salamora Grills and Café — website

Grills and café at Dreamland Suites, Jabi Lake, Utako, Abuja.

Static site. No build step and nothing to install to run it — open `index.html`
or drop the folder on any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages). What ships to the browser is HTML, CSS, JS and fonts: zero runtime
dependencies, zero third-party requests.

`package.json` exists only for the accessibility check in CI. Those
dependencies never reach the site.

```
index.html
assets/css/styles.css     all styling
assets/css/fonts.css      @font-face declarations (generated — see Fonts)
assets/js/config.js       ← phone, hours, address, socials, delivery areas
assets/js/menu.js         ← menu items, prices, platter-builder options
assets/js/app.js          behaviour
assets/fonts/             self-hosted woff2
assets/favicon.svg
robots.txt                crawler block — remove at launch

tests/a11y.mjs            accessibility check (dev only)
.github/workflows/        CI
package.json              dev dependencies for the check above — not shipped
```

---

## ⚠ Read this before the site goes anywhere public

Menu content is now **real**. Item names and prices were transcribed from the
menu card published on @salamoragrills.ng ("Mora Menu", 22 June), and the
address is confirmed as Dreamland Suites, Jabi Lake, Utako.

What is still unconfirmed:

| What | Where | Risk if shipped as-is |
|---|---|---|
| Dish descriptions | `menu.js` → `desc` | Written for the site, never checked with the kitchen |
| Delivery areas | `config.js` → `deliveryAreas` | Implied coverage that may not exist |
| Map pin | `config.js` → `mapQuery` | A text search, not surveyed co-ordinates — Google may drop the pin on a neighbouring unit |
| Catering claims | `index.html` | "From 10 guests", "48h notice" were invented and need confirming |

The footer carries a `content & pricing unverified` stamp, and `robots.txt`
plus a `noindex` meta tag keep the site out of search results. Clear the table
above, then remove all three.

**An earlier version of this site carried an entirely fabricated menu** —
seafood platters, suya and asun at ₦18,000–₦64,000 — and the address
"4 Amisi Musa St, Jabi". None of it was real. If any of that resurfaces in a
branch or cache, it is wrong.

## Photography

Ten photographs from the client's Instagram are in `assets/img/`, cropped free
of Instagram UI, resized to 1000px wide and saved as progressive JPEG (73–240KB).

Nine dishes carry a photo. A photo is only attached to the dish it actually
shows — the three wing variants share a recipe but not a preparation, so only
Crispy Wings carries the wings shot. Everything else renders a styled
"Photo pending" placeholder rather than a misleading image.

To add one: drop the file in `assets/img/` and set the path in `menu.js`.

```js
{ cat: 'burgers', name: 'Loaded Fries', price: 8000,
  img: 'assets/img/loaded-fries.jpg', ... }
```

Shoot landscape where you can, and keep files under ~250KB.

## How ordering works

There is **no backend**. Every order path — menu tile, platter builder, catering
form, header/hero/floating buttons, footer quick-chat — opens WhatsApp with the
message already written out, addressed to `config.js` → `contact.whatsapp`.

That was a deliberate choice for a prototype: a form posting to a dead endpoint
loses real enquiries silently, which is worse than no form. The trade-off is
real and you should know it:

- **Nothing is stored.** If a customer fills in the catering form and then
  abandons WhatsApp, that lead is gone. There is no record anywhere.
- **No analytics.** You cannot tell how many people started an order versus sent
  one.
- **Desktop users** need WhatsApp Web or the desktop app; `wa.me` handles this,
  but it is one more step than a phone.

If lead capture matters, the smallest next step is a form endpoint (Formspree,
Basin, or a serverless function) that records the enquiry *and then* hands off to
WhatsApp — so an abandoned chat still leaves you a contact.

---

## Editing content

**Prices, dishes, categories** → `assets/js/menu.js`. Items render automatically
into the right tab; category tabs come from the `categories` array.

**Combo builder** → `menu.js` → `builder`. It mirrors the Mora Meat Combos
section of the real menu: any base plus Mora Meat or Chicken is ₦8,000, the
two-protein "Mixture of 2" adds ₦500, and extras are priced from the Extras
list. Add a base, protein or extra to the arrays and the widget follows.

**Hours** → `config.js` → `hours.week`. Confirmed: Mon–Thu 9am–10pm, Fri–Sun
around the clock.

A day is either `{ allDay: true }` or 24-hour `"HH:MM"` open/close times; `null`
marks it closed. If `close` is earlier than `open` it is treated as closing after
midnight. Consecutive `allDay` days join into one continuous run, so Friday
00:00 through Sunday 24:00 reads as one unbroken stretch and the badge says
"Open 24 hours through Sunday" rather than naming a closing time.

Hours are evaluated in **Africa/Lagos**, not the visitor's timezone — someone
browsing from London sees Abuja's open/closed state. Verified against six cases
including both sides of midnight and a non-Nigerian browser timezone.

**Phone, WhatsApp, Instagram, delivery areas** → `config.js`. The phone appears
in several places and is substituted at runtime; change it once.

---

## Notes on decisions you might want to revisit

**The hero has no video.** The brief asked for a video/carousel banner. No footage
exists, and a hero video is an expensive default for this audience — a 3–5 MB
autoplaying file on Abuja mobile data, before the customer has seen a single
price. What is there instead is a CSS-rendered ember bed (0 KB, animated, honours
`prefers-reduced-motion`) plus a swipeable carousel of the seven signature
dishes, now with real photography. If footage arrives, the hero is the place to
put it — but measure bounce rate before and after.

**The map does not load until tapped.** A Google Maps iframe is a heavy
third-party embed that also tracks the visitor. It now loads behind a styled
tap target, and "Get directions" is always live as a plain link — which is what
most people on a phone actually use.

**Menu opens on "Mora Meat Combos", not "Everything".** It is the signature
line, has the most photography, and keeps the initial mobile page short.
"Everything" sits last in the tab row, one tap away.

**The builder follows the real menu.** An earlier version asked for a protein,
two sides and a pepper level — a structure the kitchen does not sell. It now
mirrors the Mora Meat Combos section exactly.

**The brand orange was split in two.** `#FF5722` as specified is 3.16:1 against
white — below the WCAG AA minimum of 4.5:1 — so small white text on an orange
button was failing accessibility. `--ember` (`#FF5722`) is still the brand accent
everywhere it is decorative, a border, a glow, or orange text on charcoal
(5.92:1). `--ember-fill` (`#C93D12`) is used only as a *background* under small
white text, at 5.05:1. The `#FF5722` glow around each button keeps the colour
reading hot. Audited clean with axe-core (WCAG 2.1 AA, 0 violations, mobile and
desktop).

---

## Fonts

Bricolage Grotesque (display), Public Sans (body), JetBrains Mono (prices and
labels), self-hosted
from `assets/fonts/` rather than loaded from Google. That removes two
render-blocking third-party round trips on first paint and keeps the typography
if Google Fonts is slow or blocked. Total ~284 KB across three families.

Bricolage Grotesque is a variable face. Width and weight are set per use through
three tokens in `styles.css` — `--d-hero` (tall and tight, for headlines),
`--d-title` (wider, for card and section titles) and `--d-ui` (small labels) —
so one file covers every display size without loading extra weights.

**`latin-ext` is not optional here.** The naira sign ₦ (U+20A6) sits in Google's
`latin-ext` subset, not `latin`. A latin-only build renders every price's
currency symbol from a system fallback font. Both subsets are included, and
`unicode-range` means `latin-ext` is only fetched when a page actually needs it.

To regenerate after a font change, fetch the Google CSS with a modern browser
User-Agent (to get woff2 rather than ttf), keep the `latin` and `latin-ext`
blocks, download each file into `assets/fonts/`, and rewrite `assets/css/fonts.css`
with local `src:` paths. All three families are variable fonts — one file
covers the whole weight axis, so declare a `font-weight` range instead of
downloading a copy per weight.

---

## Browser support

Modern evergreen browsers. Uses `:has()`, `IntersectionObserver`,
`Intl.DateTimeFormat` with `timeZone`, CSS nesting-free custom properties, and
`scroll-snap`. No polyfills, no transpiler. If a meaningful share of your traffic
is on old Android WebView, the side-selection highlight (`:has()`) degrades to an
unstyled-but-working checkbox — the builder still calculates correctly.

## Deploying to GitHub Pages

`.github/workflows/pages.yml` publishes the site on every push to `main`, and
on demand from any branch (Actions → Deploy to GitHub Pages → Run workflow).

**One manual step first, which no workflow can do for you:** repo Settings →
Pages → Source → **GitHub Actions**. Until that is set, the deploy job fails
with a "Pages is not enabled" error.

Pages on a private repository requires a paid GitHub plan. On the free tier the
repository has to be public for Pages to work — which puts the source, and the
unverified prices, on the open internet.

**A Pages site is publicly reachable either way.** Making the repository private
does not make the published site private; only GitHub Enterprise Cloud can put
access control in front of Pages. So while the menu and pricing are still
placeholder data, two guards ship with the site:

- `robots.txt` disallows all crawlers
- `index.html` carries `<meta name="robots" content="noindex, nofollow">`

The deploy job asserts both are present and **fails the build if either is
missing**, so unverified content cannot reach a search index by accident.
Delete the file and the tag at launch, once the content is real.

The job publishes `index.html`, `assets/` and `robots.txt` only. `README.md`,
`package.json`, `tests/` and `.github/` stay off the public URL.

## The accessibility check

`.github/workflows/accessibility.yml` runs axe-core against the site on every
pull request to `main`, at two viewports across six states, and fails the build
on any WCAG 2.1 A or AA violation.

```bash
npm ci
npx playwright install chromium
npm run test:a11y
```

It exists for one specific regression. `#FF5722` is 3.16:1 against white, below
the AA minimum of 4.5:1, so small white text sits on `--ember-fill` (`#C93D12`,
5.05:1) instead — see *Notes on decisions* above. That split is easy to undo by
accident: someone restores the brand orange on a button and the site silently
fails AA again. Setting `--ember-fill` back to `#FF5722` turns this check red
across four selectors, naming each one and its measured ratio. That failure path
was tested, not assumed.

It scans more than the landing state, because a load-time-only scan misses the
states people actually sit in: the mobile nav drawer open, a different menu tab,
the builder with selections made, and the catering form showing validation
errors.

Dependency versions are pinned exactly with a committed lockfile and installed
with `npm ci`. A floating axe-core would change rule coverage between runs and
turn the build red with no code change, which is the fastest way to get a check
ignored.

**What it does not cover.** axe-core catches roughly a third to a half of
accessibility problems — the machine-checkable ones. It cannot tell you whether
the tab order makes sense, whether a screen-reader announcement is useful, or
whether an animation is nauseating. Passing this check is a floor, not a
verdict.

## Verified

Checked in a real browser at 390 px and 1440 px:

- Menu tab filtering across 7 categories, dish → WhatsApp handoff
- Combo builder maths (base + protein + extras + quantity) and WhatsApp payload
- Catering form validation (3 required fields)
- Opening-hours logic across 11 cases — every open/close boundary, the Fri–Sun all-day run, and both sides of midnight, from a non-Nigerian timezone
- ₦ rendering from the self-hosted webfont, not a fallback
- Sticky header, no horizontal overflow at either width
- Map iframe absent until requested
- axe-core WCAG 2.1 AA: 0 violations across 6 scenarios, enforced in CI
