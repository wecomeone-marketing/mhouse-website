# M House Website — Pre-Launch Scope of Work

**Status:** Homepage **approved by client** (2026-07-16). Review build live at
<https://mhouse.wecomeone.me/> (crawlers blocked — review build). Production target: **mhouse.cy**.

Legend: ☐ not started · ◐ in progress · ☑ done

---

## 1. Images — placeholder to final (IMPORTANT)

**Some or all current images are placeholders and will be replaced with final assets before launch.**

When replacing an image:

- **Replace every embedded copy.** Images are **base64-inlined directly in `index.html`**, and some appear in more than one place (for example the logo is embedded separately for nav / splash / footer; the hero photo was previously embedded twice). Search the file for each old image and remove **all** copies so no orphaned base64 is left behind bloating the file.
- After a swap, **re-run the audit** (`scratchpad`-style: extract data URIs, confirm every image is still referenced) to make sure no old/unused image data remains anywhere.
- Keep new images optimised — the page is currently ~3.1 MB, ~98% of which is inline images.

**Placeholders to replace** (from the project brief):

- ☐ About section — 2 portrait images
- ☐ Spaces grid — pool courtyard, rooms
- ☐ Room cards — all 5 rooms (Governors and O Room still missing entirely)
- ☐ Testimonials background
- ☐ Aperitivo background
- ☐ Work lounge — currently an AI-generated placeholder
- ☐ Hero carousel + splash — confirm final selects

**Photography awaited from client:** room photography (all 5 rooms), events / courtyard photography.

---

## 2. Pages to build

Sub-pages are built from shared partials (`_src/` + `node build.cjs`) so the nav/footer/
CSS/logo live in one place. See README → Build.

- ☑ `gather.html` — Events & private hire (built; copy is a first draft, refine)
- ☐ `gatherings.html` — Yaya's Corner, Yoga, Aperitivo, etc.
- ☐ `swim.html` — Pool day passes
- ☐ `stay.html` — Five rooms + Smoobu widget
- ☐ `work.html` — Work lounge
- ☐ `contact.html` — Contact form + map
- ☐ `privacy.html` — awaiting legal content
- ☐ `terms.html` — awaiting legal content
- ☑ **Migrate `index.html` onto the build** — done and verified (20 images preserved,
  all sections + splash/hero/reservation intact). Shared chrome now has a single source.

---

## 3. Legal

- ☐ Privacy Policy content (from client's legal advisor — due ~5 days before launch)
- ☐ Terms of Use content (same)

---

## 4. Integrations

- ☐ **Smoobu** booking widget (embed code from client) — for `stay.html`
- ☐ **Stripe** (account + keys from client)
- ☐ **Contact form + reservation form backend** — **decided:** production runs a small Node/Express server on Scala (see §7) exposing a `/api/contact` (and reservation-enquiry) endpoint that calls **Resend server-side**. The Resend key stays a **server env var**, never in this public repo. Both the homepage "Check availability" form and the contact-page form (currently `onsubmit="return false"`) route through it. Add per-IP rate limiting + a captcha (e.g. Cloudflare Turnstile) for spam protection. **Dependency:** to send *from* `@mhouse.cy`, Resend needs its domain verified via DNS records on `mhouse.cy` (Cloudflare) — needs DNS access, otherwise send from an agency-controlled domain.
- ☐ Coworking booking platform (TBD by client)
- ☐ Google Analytics 4
- ☐ Meta Pixel
- ☐ Google Maps embed (contact page)

---

## 5. SEO

- ☐ Meta titles + descriptions for every page
- ☐ Schema markup (LocalBusiness / Hotel / Event)
- ☐ Image alt-text audit
- ☐ XML sitemap
- ☐ **Lift the `robots.txt` crawl block** — currently blocks all crawlers (review build). Replace with an allow + sitemap for production.
- ☐ Google Search Console setup + verification
- ☐ Canonical URLs
- ☐ Open Graph / social share image + meta (for link previews)
- ☐ Favicon

---

## 6. Content awaited from client (Christian)

- ☐ Legal docs (Privacy, Terms)
- ☐ Smoobu embed code
- ☐ Stripe credentials
- ☐ Coworking platform decision
- ☐ Room photography (5 rooms)
- ☐ Events / courtyard photography
- ☐ Social media handles for footer links
- ☐ Real guest reviews to replace the placeholder testimonials

---

## 7. Production launch / hosting

- **Hosting: Scala Hosting (decided).** Managed VPS with SPanel + NodeJS Manager / PM2.
  The production site runs as a **small Node/Express app** (serves the static pages +
  the `/api/contact` endpoint from §4), not pure-static files. Same pattern as the
  agency's Travio app.
- ☐ Restructure repo for the Node app: add `package.json` + `server.js` (Express serving
  the built site and the API), keep the Resend key in a server `.env` (gitignored).
- ☐ Deploy on Scala: NodeJS Manager → point at `server.js`, set env vars, start (PM2).
- ☐ Point `mhouse.cy` DNS (Cloudflare) at the Scala VPS IP. SPanel handles nginx +
  Let's Encrypt SSL.
- ☐ Lift the `robots.txt` crawl block (see §5).
- ☐ Cross-browser + mobile QA pass.
- ☐ Final proof — confirm no placeholder copy or images remain anywhere.

---

## 8. Minor / nice-to-have

- ☐ Logo consistency — the **splash and footer still use the old mark**; apply the palm there too if a consistent identity is wanted (nav already uses the palm).
- ☑ ~~Remove the leftover `getElementById('heroBg')` JS reference~~ — done.
- ☐ Facebook page description — drafted and ready to post.

---

*This file lives in a **public** repo (needed for GitHub Pages). It contains no credentials, but keep it free of anything sensitive.*
