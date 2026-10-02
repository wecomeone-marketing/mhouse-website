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

**Sub-page image placeholders — now filled with TEMPORARY stock (2026-07-29):** every
sub-page hero (`.page-hero__media`) and image slot (`.ph`) now carries a fitting
free-licence Unsplash photo, added for the client review via the `.is-photo` class + an
inline `background-image` (files in `assets/ph/`). The original shot intent is still in
each `data-ph` caption (the shot list). **To go live:** drop the real photo in at the
matching `assets/ph/<page>-<n>.jpg` filename, or remove `is-photo` to fall back to the
captioned gradient.

---

## 2. Pages to build

The homepage About section now carries the client's official Mette story and vision wording.

Sub-pages are built from shared partials (`_src/` + `node build.cjs`) so the nav/footer/
CSS/logo live in one place. See README → Build.

- ☑ `events.html` — Events, built from client content (capacity, venue hire, open bar, catering + terms)
- ☑ `gather.html` (renamed from gatherings.html) — Yaya's Corner, Breakfast & Swim, Sunrise/Water Yoga, Aperitivo (built from client content: durations, capacities, prices, inclusions)
- ☑ `swim.html` — Pool & day passes, built (rates pending, see §6); bookings route to WhatsApp
- ☑ `stay.html` — Five rooms, each with its own 5 image sliding gallery (placeholder slides double as the shot list). Smoobu widget still to embed.
- ☑ `work.html` — Work lounge, built from client content
- ☑ `contact.html` — Contact and general info, built (all four contact routes, hours, parking, house rules, cancellation). Enquiry form pending the backend; directions are a Google Maps link rather than an embed for now.
- ◐ `wellness.html` — **hidden at the client’s request (2026-10-02)**: removed from the top menu, footer and site. Source parked in `_src/hidden/wellness.html`, restore when the client is ready. Photos remain in `assets/ph/`.
- ☑ `privacy.html` — built from client legal text (effective 24 July 2026)
- ☑ `terms.html` — built from client legal text (effective 24 July 2026)
- ☑ **Migrate `index.html` onto the build** — done and verified (20 images preserved,
  all sections + splash/hero/reservation intact). Shared chrome now has a single source.

---

## 3. Legal

- ☑ Privacy Policy — received and built (effective 24 July 2026)
- ☑ Terms of Use — received and built (effective 24 July 2026)

---

## 4. Integrations

- ◐ **Smoobu** booking widget (room bookings). **Stay page done and live:** the whole-villa Booking Engine (All Accommodations) is embedded as the "Book your stay" section on `stay.html` (`#book`); nav **Book Now** points to it (desktop and mobile); each room has a **"Book this room"** button that opens a **branded on-site page** (`book.html?apartmentId=<id>`) carrying the M House nav, footer and styling, which embeds that room's Smoobu widget and shows the room name in the heading (Shorty's 2675539, Duchess 2675534, Governors 2675529, O Room 2675544, Bungalow 2675524). `book.html` with no param falls back to the all-rooms widget. Same reliable full-page embed pattern as the homepage and Stay general widgets, all constrained to 1000px and centred. Booking Engine Enabled, EUR, Stripe connected (Option A). Widget **styled to brand** via Smoobu Custom CSS (olive Search button, confirmed live) and **auto-resizes** on search (confirmed). Iframe min-height 120px. Note: date prefill via URL is not supported, so a search form cannot pass dates into the widget. **Homepage done too:** the placeholder "Check availability" form is replaced with the real Smoobu widget (Option 2, white card on the dark band), and the hero "Book a room" button points at it (`#book`). Booking is now live across the site. **Still to do:** one real test booking through Stripe before launch, and Andreas to confirm the homepage widget reads well in the two-column band (easy switch to full width if not).
- ☐ **Stripe** (account + keys from client)
- ☐ **Contact form + reservation form backend** — **decided:** production runs a small Node/Express server on Scala (see §7) exposing a `/api/contact` (and reservation-enquiry) endpoint that calls **Resend server-side**. The Resend key stays a **server env var**, never in this public repo. Both the homepage "Check availability" form and the contact-page form (currently `onsubmit="return false"`) route through it. Add per-IP rate limiting + a captcha (e.g. Cloudflare Turnstile) for spam protection. **Dependency:** to send *from* `@mhouse.cy`, Resend needs its domain verified via DNS records on `mhouse.cy` (Cloudflare) — needs DNS access, otherwise send from an agency-controlled domain.
- ◐ **Workspace and pool booking via OfficeRnD (confirmed).** Carina sent the OfficeRnD checkout links for Hot Desk (day and monthly), Lounge Access, Dedicated Desk, Meeting Room, Pool Day Pass, Pool Monthly and Parking. Wiring them into Work and Swim is queued: buttons open OfficeRnD in a new tab, the day and meeting room links get the date set dynamically to the current day, the pool moves off WhatsApp, and parking gets a small block (likely on Contact). **Private offices stay as an email enquiry** (client says all are taken for the next year, no booking link).
- ◐ **Call to action buttons across the site.** Routing confirmed by Christian: rooms to the Smoobu booking tool, Work lounge and private offices stay on the enquiry button for now, Swim day passes and gatherings via **WhatsApp**, Events keeps "Request a Proposal", general enquiries to **hello@mhouse.cy**, and a permanent **Book Now** button in the top nav on every page plus below the homepage hero. **WhatsApp buttons done** (Swim day passes and the Gather gatherings, prefilled messages, +357 97 444085). Still waiting on the Smoobu booking link or embed for the room and Book Now buttons.
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
- ☐ **Home page is at `/home.html`, root is the splash.** Point canonical, sitemap and Open Graph at `/home.html`. Decide whether this is the final structure for launch, or whether the home should sit at root for SEO (search engines will index the root as the splash as it stands).

---

## 6. Content awaited from client (Christian)

- ☑ Legal docs (Privacy, Terms) — received and built
- ◐ **Wellness page hidden at the client’s request (2026-10-02).** They have a plan but it is not a priority now, and will tell us when to show it. Removed from the menu, footer and site; source parked in `_src/hidden/wellness.html`.
- ◐ **Events builder pricing** — per the owner's review, the Events page now shows **no
  prices** and the builder is a price-free selector (pick a package + services -> tailored
  enquiry). This **conflicts with the services agreement** ("display pricing dynamically");
  Andreas to reconcile with Christian. If prices should return, re-add them to the
  PACKAGES/ADDONS config in `_src/pages/events.html`.
- ☑ **Private offices: email enquiry only (confirmed 2026-10-02).** Client says all private offices are taken for the next year, so they stay as an enquiry (the Work page keeps the "Enquire about a private office" button). No OfficeRnD link.
- ☐ **Pool day pass rates** — not included in the client content pack. The Swim page currently routes to WhatsApp for rates instead of quoting a price. Ask the client.
- ☑ Smoobu dashboard access granted (Christian created a full-access profile); whole-villa Booking Engine embed obtained and live on Stay
- ☐ **Confirm max guests per room with Christian.** The booking widget offers up to 2 guests because every room is a Deluxe Double (Smoobu "Max. number of guests: 2"). Confirm 2 is the real maximum, or whether any room should allow a third guest (extra bed). If so, Christian raises "Max. number of guests" and "Extra guests / night" in Smoobu, Booking Engine, Accommodation settings, and it flows through to the site automatically. Not a website change.
- ☐ **Rename the five rooms in Smoobu to match the website.** The booking widget shows Smoobu's names, which do not match the site (e.g. clicking Governors Room opens a widget titled "Deluxe Double Room with Balcony"; the general search lists "The Governors - Deluxe Double Room with Balcony"). Christian to set each room's name/Marketing title in Smoobu to: **Governors Room** (2675529), **Duchess Room** (2675534), **The O Room** (2675544), **Shorty's Room** (2675539), **The Bungalow** (2675524). Sent in his email. Fallback if he cannot: rename the rooms on the site to match Smoobu.
- ☐ **Complete room data in Smoobu (descriptions + amenities), consistently across all five rooms.** The booking results show no descriptions, and amenity icons only on the Duchess. Christian to fill a short description and the amenities per room (reuse the site descriptions). Content in his Smoobu account, not a website change. Note: Smoobu already holds real room photos.
- ☑ Stripe already connected inside Smoobu (the Lovable site already books through it); reconfirm during the launch test booking
- ◐ Workspace platform decision (evaluating OfficeRnD, final demo pending)
- ☑ WhatsApp number received (+357 97 444085) for the Swim day passes and gatherings buttons; general enquiries confirmed as hello@mhouse.cy
- ☐ Room photography (5 rooms)
- ☐ Events / courtyard photography
- ☑ Social media handles received and wired to the footer (Instagram and Facebook, @mhouselarnaka)
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
- ☐ **Booking cutover.** Christian's interim Lovable operations and booking site is switched off when this new site goes live. Confirm the Smoobu booking flow on the new site is fully working and tested (one real test booking through Stripe) **before** Lovable is turned off, so there is never a window where guests cannot book. Day to day operations move to Smoobu's own dashboard (Smoobu is a full PMS); reproducing any Lovable operational feature would be new scope.
- ☐ Final proof — confirm no placeholder copy or images remain anywhere.

---

## 8. Minor / nice-to-have

- ☐ Logo consistency — the **splash and footer still use the old mark**; apply the palm there too if a consistent identity is wanted (nav already uses the palm).
- ☑ ~~Remove the leftover `getElementById('heroBg')` JS reference~~ — done.
- ☐ Facebook page description — drafted and ready to post.

---

*This file lives in a **public** repo (needed for GitHub Pages). It contains no credentials, but keep it free of anything sensitive.*
