# M House Website

Bespoke multipage website for **M House**, a boutique social destination in Larnaka old town, Cyprus.

- **Client:** Onkel Properties Ltd (trading as M House) — Christian Angell Isaksen
- **Agency:** Wecomeone Marketing And Comms
- **Production domain:** [mhouse.cy](https://mhouse.cy) (Cloudflare DNS, owned by client) — not live yet
- **Review URL:** GitHub Pages (subdomain TBD, e.g. `mhouse.wecomeone.me`)
- **Repo:** `wecomeone-marketing/mhouse-website`

## Stack

Vanilla **HTML, CSS and JavaScript**. No framework, no CMS, no WordPress, **no build step**. Every page is a self-contained file that can be edited and deployed directly.

## Pages

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Homepage | Complete, approved |
| `gather.html` | Events and private hire | Placeholder |
| `gatherings.html` | Yaya's Corner, Yoga, Aperitivo etc. | Placeholder |
| `swim.html` | Pool day passes | Placeholder |
| `stay.html` | Five rooms + Smoobu widget | Placeholder |
| `work.html` | Work lounge | Placeholder |
| `contact.html` | Contact form, map | Placeholder |
| `privacy.html` | Privacy Policy | Placeholder (awaiting legal content) |
| `terms.html` | Terms of Use | Placeholder (awaiting legal content) |

## Brand system

Design tokens (declared in each page's `:root`):

| Token | Hex | Role |
|-------|-----|------|
| `--w` | `#F5F3EE` | Warm white — primary background |
| `--g1` | `#EDEAE0` | Greige — section breaks |
| `--g2` | `#D8D2C8` | Warm grey — borders |
| `--be` | `#C4A882` | Beige — mid-tone warmth |
| `--ta` | `#8C7B6B` | Taupe — body text, muted |
| `--dk` | `#3D3530` | Dark — headings, nav, footer, CTAs |
| `--ol` | `#7A8C5E` | Olive — primary accent, used sparingly |
| `--olp` | `#D4DCCA` | Olive pale — hover states |

**Type:** Cormorant Garamond (display/headings), Jost (body/UI/nav) — both via Google Fonts.

**Rules to hold to:**
- Capsule buttons everywhere (`border-radius: 50px`). No hard edges.
- Olive is the only accent. No turquoise or blue.
- No dashes in visible copy — use commas, colons or full stops.
- Hierarchy is **Gather · Swim · Stay · Work**, not hotel-first.

### Nav logo swap — DO NOT MODIFY

The nav uses **two separate logo `<img>` tags** toggled by CSS (white over hero, coloured on scroll). Never use `filter: invert` or a single logo with a CSS filter. See `index.html` for the canonical implementation.

## Hosting & deployment

Pure static files, no build step.

- **Review:** GitHub Pages serves this repo. `robots.txt` currently blocks all crawlers because this is a review build — **remove that block before production launch.**
- **Production:** point `mhouse.cy` (Cloudflare) at the host when the client approves. HTTPS via Cloudflare.

To publish a change: edit files here, `git commit`, `git push`. GitHub Pages rebuilds within a minute.

## Outstanding

Homepage is **approved by the client** (2026-07-16). The full remaining work before
launch — pages to build, image replacement, legal, integrations, SEO, and the
production hosting decision — is tracked in **[PRE-LAUNCH.md](PRE-LAUNCH.md)**.

> **Images:** some or all current images are placeholders and will be replaced before
> launch. When replacing one, remove **every** old copy (they are base64-inlined in
> `index.html`, sometimes more than once). See PRE-LAUNCH.md §1.

## Contacts

- **Client:** Christian Angell Isaksen — hello@mhouse.cy — +357 97444085
- **Property:** Stadiou 18, 6020 Larnaka, Cyprus
- **Agency:** Wecomeone Marketing And Comms — hello@wecomeone.me
