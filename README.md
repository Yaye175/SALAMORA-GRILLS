# Salamora Grills — website prototype

Open-fire grill house, 4 Amisi Musa St, Jabi, Abuja.

Static site. No build step, no dependencies, no server. Open `index.html` or drop
the folder on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

```
index.html
assets/css/styles.css     all styling
assets/css/fonts.css      @font-face declarations (generated — see Fonts)
assets/js/config.js       ← phone, hours, address, socials, delivery areas
assets/js/menu.js         ← menu items, prices, platter-builder options
assets/js/app.js          behaviour
assets/fonts/             self-hosted woff2
assets/favicon.svg
```

---

## ⚠ Read this before the site goes anywhere public

**Nothing on this site was supplied by the business.** The Instagram account
(`@salamoragrills.ng`) was unreachable from the build environment, so no real
menu, pricing, or hours could be pulled. Everything below is invented to make
the layout work and **must be replaced**:

| What | Where | Risk if shipped as-is |
|---|---|---|
| Every price (26 menu items + builder) | `menu.js` | You are publicly quoting prices the kitchen never set |
| Every dish name and description | `menu.js` | Advertising food you may not serve |
| Opening hours, all 7 days | `config.js` → `hours` | The live "Open now" badge will lie to customers |
| Delivery areas | `config.js` → `deliveryAreas` | Implied coverage you may not offer |
| Map pin (`mapQuery` is a text search, not surveyed co-ordinates) | `config.js` → `location` | Google may drop the pin on a neighbouring building |

Confirmed from the brief and left as given: the street address, the phone number
`+234 703 303 3496`, and the Instagram handle. **Verify the phone number
anyway** — it is the only ordering channel on the entire site.

The footer carries a `content & pricing unverified` stamp. Remove it only once
the table above is done.

---

## The one thing that would most improve this site

**Food photography.** Every dish tile currently renders a styled "Photo pending"
placeholder. For a grill house, photos are not decoration — they are the
conversion mechanism. Ten good shots of the signature platters would do more for
orders than any further code.

To add one: put the file in `assets/img/` and set the path in `menu.js`.

```js
{ cat: 'platters', name: 'The Salamora Board', price: 64000,
  img: 'assets/img/salamora-board.jpg', ... }
```

The placeholder disappears and a lazy-loaded `<img>` takes its place. No other
change needed. Shoot landscape, roughly 3:2, and keep files under ~200 KB.

---

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

**Platter builder** → `menu.js` → `builder`. Protein sets the base price, sides
carry an upcharge (`price: 0` shows as "Included"), spice is free. Change
`rules.sidesRequired` to allow a different number of sides — the counter, the
locking, and the validation all follow it.

**Hours** → `config.js` → `hours.week`. 24-hour `"HH:MM"`. Set a day to `null`
for closed. If `close` is earlier than `open` it is treated as closing after
midnight, so Friday `{ open: '12:00', close: '00:30' }` correctly stays "Open
now" at 00:15 on Saturday.

Hours are evaluated in **Africa/Lagos**, not the visitor's timezone — someone
browsing from London sees Abuja's open/closed state. Verified against six cases
including both sides of midnight and a non-Nigerian browser timezone.

**Phone, WhatsApp, Instagram, delivery areas** → `config.js`. The phone appears
in several places and is substituted at runtime; change it once.

---

## Notes on decisions you might want to revisit

**The hero has no video.** The brief asked for a video/carousel banner. No footage
existed, and a hero video is an expensive default for this audience — a 3–5 MB
autoplaying file on Abuja mobile data, before the customer has seen a single
price. What is there instead is a CSS-rendered ember bed (0 KB, animated, honours
`prefers-reduced-motion`) plus a swipeable carousel of signature dishes. If real
footage arrives, the hero is the place to put it — but measure the bounce rate
before and after.

**The map does not load until tapped.** A Google Maps iframe is a heavy
third-party embed that also tracks the visitor. It now loads behind a styled
tap target, and "Get directions" is always live as a plain link — which is what
most people on a phone actually use.

**Menu opens on "Grill Platters & Combos", not "Everything".** Showing all 26
items first produced a 30,000-pixel-tall mobile page. Platters are the
highest-value category; "Everything" is one tap away at the end of the tab row.

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

Anton (display), Manrope (body), JetBrains Mono (prices and labels), self-hosted
from `assets/fonts/` rather than loaded from Google. That removes two
render-blocking third-party round trips on first paint and keeps the typography
if Google Fonts is slow or blocked. Total ~144 KB across three families.

**`latin-ext` is not optional here.** The naira sign ₦ (U+20A6) sits in Google's
`latin-ext` subset, not `latin`. A latin-only build renders every price's
currency symbol from a system fallback font. Both subsets are included, and
`unicode-range` means `latin-ext` is only fetched when a page actually needs it.

To regenerate after a font change, fetch the Google CSS with a modern browser
User-Agent (to get woff2 rather than ttf), keep the `latin` and `latin-ext`
blocks, download each file into `assets/fonts/`, and rewrite `assets/css/fonts.css`
with local `src:` paths. Manrope and JetBrains Mono are variable fonts — one file
covers the whole weight axis, so declare a `font-weight` range instead of
downloading a copy per weight.

---

## Browser support

Modern evergreen browsers. Uses `:has()`, `IntersectionObserver`,
`Intl.DateTimeFormat` with `timeZone`, CSS nesting-free custom properties, and
`scroll-snap`. No polyfills, no transpiler. If a meaningful share of your traffic
is on old Android WebView, the side-selection highlight (`:has()`) degrades to an
unstyled-but-working checkbox — the builder still calculates correctly.

## Verified

Checked in a real browser at 390 px and 1440 px:

- Menu tab filtering, dish → WhatsApp handoff
- Builder maths, the two-side limit and locking, quantity, WhatsApp payload
- Catering form validation (3 required fields)
- Opening-hours logic across midnight and from a non-Nigerian timezone (6 cases)
- ₦ rendering from the self-hosted webfont, not a fallback
- Sticky header, no horizontal overflow at either width
- Map iframe absent until requested
- axe-core WCAG 2.1 AA: 0 violations
