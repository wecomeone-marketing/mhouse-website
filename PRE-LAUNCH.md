# M House Website — Pre-Launch Scope of Work

**Status: LIVE at <https://mhouse.cy/>** (launched 2026-10-14, GitHub Pages, SSL active). Remaining: enable Enforce HTTPS in the repo Pages settings, submit the sitemap to Search Console, decommission the old Lovable site.

Legend: ☐ not started · ◐ in progress · ☑ done

---

## 1. Images — placeholder to final (IMPORTANT)

**Final photography is in (2026-10-14).** The 38 site images are real, delivered as WebP in `assets/img/` (home images are now file references, not base64, so `index.html` dropped from ~2.4MB to ~243KB). The only placeholders left are the two on the parked Wellness page.

When replacing an image:

- **Replace every embedded copy.** Images are **base64-inlined directly in `index.html`**, and some appear in more than one place (for example the logo is embedded separately for nav / splash / footer; the hero photo was previously embedded twice). Search the file for each old image and remove **all** copies so no orphaned base64 is left behind bloating the file.
- After a swap, **re-run the audit** (`scratchpad`-style: extract data URIs, confirm every image is still referenced) to make sure no old/unused image data remains anywhere.
- Keep new images optimised — the page is currently ~3.1 MB, ~98% of which is inline images.

☑ **All placeholders replaced with final photography (2026-10-14).** The 38 site images are
real WebP in `assets/img/`; the home images are file references (no longer base64). The only
placeholder images left anywhere are the two on the parked Wellness page.

---

## 2. Pages to build

The homepage About section now carries the client's official Mette story and vision wording.

Sub-pages are built from shared partials (`_src/` + `node build.cjs`) so the nav/footer/
CSS/logo live in one place. See README → Build.

- ☑ `events.html` — Events, built from client content (capacity, venue hire, open bar, catering + terms)
- ☑ `gather.html` (renamed from gatherings.html) — Yaya's Corner, Breakfast & Swim, Sunrise/Water Yoga, Aperitivo (built from client content: durations, capacities, prices, inclusions)
- ☑ `swim.html` — Pool & day passes, built (rates pending, see §6); bookings route to WhatsApp
- ☑ `stay.html` — Five rooms, each with a 2 image sliding gallery (real photography in). Smoobu booking widget embedded (`#book`).
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

- ◐ **Smoobu** booking widget (room bookings). **Stay page done and live:** the whole-villa Booking Engine (All Accommodations) is embedded as the "Book your stay" section on `stay.html` (`#book`); nav **Book Now** points to it (desktop and mobile); the per-room **"Book this room"** buttons were **removed 2026-10-07 at the client's request** (individual room pages not needed for now; `book.html` is **parked**: source in `_src/hidden/book.html`, no built file, so the URL 404s and cannot be crawled; easy to restore later). A second copy of the booking widget was briefly added at the bottom of the Stay page (client request), then **removed 2026-10-07**: two Smoobu Booking Tool iframes on one page render with the **same iframe id** (`booking-tool-iFrame-allApartments`), which breaks iframe-resizer, so neither auto-sized (the bottom collapsed to 16px, the top stopped growing and clipped the datepicker on mobile). The widget cannot be embedded twice on one page. The existing "Stay with us / Check availability" CTA before the footer already scrolls visitors to the `#book` widget, so bottom-of-page booking access is covered. Booking Engine Enabled, EUR, Stripe connected (Option A). Widget **styled to brand** via Smoobu Custom CSS (olive Search button, confirmed live) and **auto-resizes** on search (confirmed). Iframe min-height 120px. Note: date prefill via URL is not supported, so a search form cannot pass dates into the widget. **Homepage done too:** the placeholder "Check availability" form is replaced with the real Smoobu widget (Option 2, white card on the dark band), and the hero "Book a room" button now leads to the dedicated Stay page. Booking is now live across the site. **Still to do:** one real test booking through Stripe before launch, and Andreas to confirm the homepage widget reads well in the two-column band (easy switch to full width if not).
- ☑ **Stripe** — connected inside Smoobu (bookings pay through it). Reconfirm during the launch test booking.
- ☑ **Contact / reservation backend — not needed.** The site has **no on-site forms**: every booking and enquiry routes to Smoobu (rooms), OfficeRnD (work + pool), WhatsApp (gatherings), or email (hello@mhouse.cy). So no server, no Resend integration and no `/api` endpoint is required, which is why hosting is now plain static GitHub Pages (see §7). If an on-site contact form is wanted later, that one feature would need a small backend.
- ☑ **Workspace and pool booking via OfficeRnD (done, live 2026-10-02).** Work has a Book button on each option (Hot Desk day and monthly, Lounge Access, Dedicated Desk, Meeting Room); Swim has Pool Day Pass and Monthly Pass; Contact has the pool quick-link and the parking menu. All open OfficeRnD in a new tab, and a small script rewrites the baked booking date to the current day. Private offices stay as the email enquiry (all taken for the next year). The phone room is a subscriber add on, not listed.
- ☑ **Call to action buttons across the site (done).** Rooms book via the Smoobu widget (homepage, Stay top and bottom, and the Book Now button). Work lounge and the pool book via **OfficeRnD** (date set to today); private offices stay on the enquiry button. The **gatherings** on Gather stay on **WhatsApp**. Events keeps "Request a Proposal"; general enquiries go to **hello@mhouse.cy**. Parking books via OfficeRnD from the Contact page.
- ☐ Google Analytics 4
- ☐ Meta Pixel
- ☑ Google Maps (contact page) — the "Open in Google Maps" link points at the pinned location (`https://maps.app.goo.gl/cfKZP2kmA4cHcBPF7`). A visual embed could be added later if wanted.

---

## 5. SEO

**Non-image SEO is done (2026-10-07).** The image-dependent pieces wait for the real photography (see §2) so they are not done twice.

- ☑ Meta titles + descriptions for every page (front-matter in each `_src/pages/*.html`, injected by the build)
- ☑ Schema markup. `LodgingBusiness` JSON-LD in `_src/layout.html`, site-wide (name, description, url, telephone, email, postal address, IG + FB `sameAs`, priceRange). **Add at launch:** `image` (the OG image URL) and `geo` (lat/long for Stadiou 18); both marked with a comment in the layout.
- ☑ XML sitemap. `sitemap.xml`, **auto-generated by `build.cjs`** from the page list so it never drifts (9 pages; `book.html` / `wellness.html` parked). Home is `https://mhouse.cy/` (the root) at priority 1.0; sections 0.8, contact 0.7, legal 0.3.
- ☑ Canonical URLs. Self-referential per page via `{{CANONICAL}}` in the layout; the home is `https://mhouse.cy/` (root).
- ☑ Open Graph + Twitter meta, including **`og:image`**: a 1200x630 JPG social card (`assets/img/og-image.jpg`, generated from the hero) plus `twitter:image` and schema `image` (2026-10-14).
- ☑ Favicon. Real brand `favicon.ico` (16/32px, the M House palm mark), supplied by the client and live (2026-10-15). **Optional:** an `apple-touch-icon.png` (180x180, for the iOS home-screen icon) would need a higher-res logo PNG, since the .ico maxes at 32px.
- ◐ **Image alt-text** — the home `<img>` photos carry alt text (courtyard, pool, the three rooms, work lounge, etc.). The page hero and section photos are CSS background images (`.ph` / `.page-hero__media`), which have no alt by design; describing those for SEO/accessibility would mean turning them into `<img>` tags (a refactor). Revisit if needed at launch.
- ☑ **Open Graph / social share image** — 1200x630 card (`assets/img/og-image.jpg`) wired as `og:image`, `twitter:image` and schema `image` (2026-10-14).
- ☐ **Lift the `robots.txt` crawl block** — still blocking all crawlers (review build). The file now carries the exact production replacement (allow + disallow parked pages + `Sitemap:` line) as a comment; paste it at launch.
- ☐ Google Search Console setup + verification (submit `sitemap.xml` after launch).
- ☑ **Home now lives at the root `/` (2026-10-12).** The splash was folded into the home page as a dismissible intro overlay, so `https://mhouse.cy/` is the home Google ranks, with the splash experience kept. The separate `/home.html` page is gone; `home.html` is now a small redirect stub to `/` (noindex) so any old review links still work. The splash shows once per browser session (sessionStorage), so returning to home via the logo does not replay it. Nav logo and all internal home links point to `/`. (Supersedes the earlier "keep the splash gate at /home.html" decision.)

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
- ☑ **Pool passes now book via OfficeRnD** (Pool Day Pass and Monthly Pass), so rates live in OfficeRnD. The WhatsApp route is retired for the pool (gatherings still use WhatsApp).
- ☑ Smoobu dashboard access granted (Christian created a full-access profile); whole-villa Booking Engine embed obtained and live on Stay
- ☐ **Confirm max guests per room with Christian.** The booking widget offers up to 2 guests because every room is a Deluxe Double (Smoobu "Max. number of guests: 2"). Confirm 2 is the real maximum, or whether any room should allow a third guest (extra bed). If so, Christian raises "Max. number of guests" and "Extra guests / night" in Smoobu, Booking Engine, Accommodation settings, and it flows through to the site automatically. Not a website change.
- ☐ **Rename the five rooms in Smoobu to match the website.** The booking widget shows Smoobu's names, which do not match the site (e.g. clicking Governors Room opens a widget titled "Deluxe Double Room with Balcony"; the general search lists "The Governors - Deluxe Double Room with Balcony"). Christian to set each room's name/Marketing title in Smoobu to: **Governors Room** (2675529), **Duchess Room** (2675534), **The O Room** (2675544), **Shorty's Room** (2675539), **The Bungalow** (2675524). Sent in his email. Fallback if he cannot: rename the rooms on the site to match Smoobu.
- ☐ **Complete room data in Smoobu (descriptions + amenities), consistently across all five rooms.** The booking results show no descriptions, and amenity icons only on the Duchess. Christian to fill a short description and the amenities per room (reuse the site descriptions). Content in his Smoobu account, not a website change. Note: Smoobu already holds real room photos.
- ☑ Stripe already connected inside Smoobu (the Lovable site already books through it); reconfirm during the launch test booking
- ☑ Workspace platform: **OfficeRnD confirmed** and wired into Work, Swim and Contact
- ☑ WhatsApp number received (+357 97 444085) for the Swim day passes and gatherings buttons; general enquiries confirmed as hello@mhouse.cy
- ☐ Room photography (5 rooms)
- ☐ Events / courtyard photography
- ☑ Social media handles received and wired to the footer (Instagram and Facebook, @mhouselarnaka)
- ☑ Real guest reviews in (2026-10-14): three real reviews (Eylem, Silvio, Matt) replace the fabricated testimonials; invented dates dropped. Silvio's and Matt's "The Colonial" references were changed to "M House" per Andreas.

---

## 7. Production launch / hosting

- **Hosting: GitHub Pages (decided 2026-10-14).** The site is **fully static** (no on-site forms; all bookings and enquiries route to Smoobu / OfficeRnD / WhatsApp / email), so no server, Node app or VPS is needed. The agency repo `wecomeone-marketing/mhouse-website` already serves the review build on GitHub Pages at `mhouse.wecomeone.me`; production is the same setup pointed at `mhouse.cy`.

**Go-live steps (in order):**

- ☑ Lift the crawl block: replace `robots.txt` with the production version (allow all, disallow `/book.html` and `/wellness.html`, add `Sitemap: https://mhouse.cy/sitemap.xml`). Commit + push.
- ☑ Point the domain: change the `CNAME` file from `mhouse.wecomeone.me` to `mhouse.cy`. Commit + push.
- ☑ Cloudflare DNS for `mhouse.cy`: add the four GitHub Pages apex A records (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `www` CNAME to the github.io host, all **DNS only (grey cloud)** so GitHub can issue the Let's Encrypt certificate.
- ◐ Repo → Settings → Pages: custom domain set to `mhouse.cy` (via the CNAME file) and SSL cert issued. **Still to do:** tick **Enforce HTTPS**.
- ☑ Add the business `geo` (lat/long for Stadiou 18) to the schema in `_src/layout.html`.
- ☑ Verify: `https://mhouse.cy/` loads over HTTPS, robots allows crawling, `sitemap.xml` resolves.
- ☐ Google Search Console: add `mhouse.cy`, verify by DNS TXT, submit the sitemap.
- ☐ Cross-browser + mobile QA pass.
- ☐ **Booking cutover.** Confirm the Smoobu flow works end to end (one real Stripe test booking) **before** Christian turns off the interim Lovable site, so guests can always book. Day to day operations then live in Smoobu's own dashboard (a full PMS).
- ☐ Final proof — confirm no placeholder copy, images or fabricated reviews remain anywhere.

---

## 8. Minor / nice-to-have

- ☐ Logo consistency — the **splash and footer still use the old mark**; apply the palm there too if a consistent identity is wanted (nav already uses the palm).
- ☑ ~~Remove the leftover `getElementById('heroBg')` JS reference~~ — done.
- ☐ Facebook page description — drafted and ready to post.

---

*This file lives in a **public** repo (needed for GitHub Pages). It contains no credentials, but keep it free of anything sensitive.*
