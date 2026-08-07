# M House Website — Progress & Status

> **Read this file at the start of every new session.** It's the living changelog of where the site stands. `README.md` covers the build system; `PRE-LAUNCH.md` is the scope-of-work checklist before launch; `CONTENT.md` is the client-content source of truth. This file covers history, current status and open work.

---

## Current status (2026-07-27)

- **Homepage approved by the client (2026-07-16).**
- Review build live at <https://mhouse.wecomeone.me/> (all crawlers blocked — it's a review build). Production target domain: **mhouse.cy**.
- Hosting: **GitHub Pages** for the review build (serves committed built files from the repo root; no build step on Pages). Custom domain via Cloudflare CNAME, grey-cloud / DNS-only. Production will move to a small Node/Express app on Scala Hosting for the enquiry-form backend — see `PRE-LAUNCH.md` §7.
- All sub-pages built from shared partials: edit `_src/`, run `node build.cjs`, commit the built `*.html` at the repo root. See `README.md`.

## Reminders for the assistant

- **Naming:** "M House" is the brand. Legal entity is **Onkel Properties Ltd** (owner Christian Angell Isaksen). Agency of record: Wecomeone Marketing & Comms.
- **Images are placeholders.** Most on-page imagery is labelled placeholder blocks (`.ph` / `.page-hero__media`), captioned via `data-ph` — the captions double as the shot list. Real photography is awaited from the client.
- **Never invent prices.** Where the client hasn't supplied a rate, the page says "on request" or routes to WhatsApp/email — don't fill in a number.

## Open work

- **🔨 In progress: bookings and CTAs.** Rooms go through **Smoobu** (Option A, instant online booking with Stripe, confirmed by Christian; account and room IDs received and held for the integration). The Work lounge and private offices stay on the enquiry button until the workspace platform is decided (Christian still evaluating **OfficeRnD**, final demo pending). CTA routing is confirmed: rooms to Smoobu, Swim day passes and gatherings via WhatsApp (**done, live**, +357 97 444085), Events keeps "Request a Proposal", general enquiries to hello@mhouse.cy, and a permanent **Book Now** button in the top nav plus below the homepage hero. Stripe is **already connected inside Smoobu** (the current Lovable site already books through it), so payment is sorted. Full dashboard access granted, and the whole-villa booking widget is now **live on Stay** (`#book`) with Book Now wired. Remaining: per room deep links, the homepage Book Now and Check availability, and a real-browser test booking through Stripe. See `PRE-LAUNCH.md` §4 and §6.
- **ℹ️ Booking approach settled: new site is self contained.** Christian runs an interim **Lovable** app (React plus Supabase) for his operations and bookings, and it will be **switched off when this new site launches**. So the new site must handle bookings itself. We use the **Smoobu Booking Tool embed**, which reads the same Smoobu account the Lovable app uses, so Smoobu stays the hub with no dependency on Lovable. The Smoobu API function Christian shared (from Lovable) is for his app's stack, not ours, and is not used here. **Cutover rule:** the new site's booking must be live and tested (a real Stripe test booking) before the Lovable site is turned off, so there is never a window where guests cannot book. Operations after Lovable are handled in Smoobu's own dashboard (Smoobu is a full PMS); reproducing any Lovable operational feature would be new scope.
- **⚠️ Events builder vs. services agreement (needs Christian's decision).** The signed services agreement said the event builder should "display pricing dynamically." Christian's review feedback said the opposite — show no prices. Reconciled for now by making the builder a price-free enquiry selector; the pricing data is preserved in `CONTENT.md` for a quick revert. Andreas to square this with Christian.
- **Client-blocked content:** Wellness & Recovery copy (only the section name supplied), pool day-pass rates, private office pricing, Smoobu embed, Stripe keys, coworking-platform decision, room + courtyard photography, social handles, real guest reviews. Full list in `PRE-LAUNCH.md` §6.
- **Not yet started:** enquiry-form backend (Node/Express on Scala + Resend), SEO/sharing pass (meta titles, Open Graph, schema, sitemap, favicon, lift the robots block). See `PRE-LAUNCH.md` §4–5, §7.

---

## Changelog

### 2026-08-03 — Room bookings live on Stay (Smoobu widget)
Got full Smoobu dashboard access (Christian created a profile) and pulled the Booking Engine embed. Embedded the whole-villa widget (All Accommodations) as a "Book your stay" section on the Stay page (`#book`): guests pick dates, see available rooms and pay through Stripe. Wired the nav Book Now to it, desktop and mobile. Confirmed the tool renders (Arrival, Departure, People, Search) and that framing is allowed (no X-Frame-Options); added a 500px iframe min-height as a fallback for the auto-resize, which the browser pane cannot judge reliably. The embed URL is `login.smoobu.com/en/booking-tool/iframe/1201359`. Next: per room deep links, the homepage Book Now and Check availability, and a real-browser test booking through Stripe.

### 2026-08-03 — WhatsApp booking buttons live on Swim and Gather
Wired the two CTAs that only needed the WhatsApp number. Swim: the "Reserve on WhatsApp" button now carries a prefilled day pass message, and the displayed number was tidied to +357 97 444085. Gather: added a "Book a gathering on WhatsApp" button under the gatherings list, and switched the footer CTA from a mailto to "Message us on WhatsApp" (both prefilled). All point at `wa.me/35797444085`. Deployed and verified live. Rooms and the Book Now button still wait on the Smoobu embed or booking links.

### 2026-08-03 — Christian's Smoobu details and CTA answers received
Christian replied to the requirements email. Smoobu account is active; he sent the accommodation ID and the five room IDs plus the channel IDs (held for the integration, not committed to this public repo). Confirmed: **Option A** instant online booking with **Stripe**, and the existing cancellation policy on all room bookings. CTA routing confirmed: rooms to Smoobu, Swim day passes and gatherings via WhatsApp, Events keeps "Request a Proposal", general enquiries to hello@mhouse.cy, and yes to a permanent **Book Now** button (placement left to us: top nav on every page plus below the homepage hero). Still needed before we can wire it up: Smoobu **dashboard access or the Booking Tool embed code**, Stripe **connected inside Smoobu** on their side, and the **WhatsApp number**. Reply prepared confirming the per room vs whole villa booking interpretation and asking for the Smoobu access or embed. WhatsApp number since received (**+357 97 444085**), so the Swim day passes and gatherings buttons are unblocked.

### 2026-08-03 — Bookings and CTAs kicked off
Client is happy with the review build and approved moving to live bookings. Rooms will run through **Smoobu**; the Work lounge and private offices will use a separate workspace platform that Christian is still evaluating (taking an **OfficeRnD** demo, not yet confirmed). Sent Christian a requirements email covering Smoobu setup (account and plan, five rooms configured, dashboard access or embed code, payment choice of Stripe vs pay on arrival) and the call to action routing across every page. Now waiting on his answers and the Smoobu access. Logged Smoobu, OfficeRnD (workspace) and CTAs as in progress in `PRE-LAUNCH.md` §4 and §6.

### 2026-07-29 — Temporary review photos on all sub-pages
At the client’s request, filled every image placeholder on the sub-pages (Gather, Swim, Stay, Work, Events, Wellness, Contact — 42 in total, including the five room galleries on Stay) with fitting free-licence stock photos, so Christian can review the site with real imagery instead of gradients. Each placeholder’s built-in caption (`data-ph`) was used as the search intent against Unsplash; images are optimised with sharp, self-hosted under `assets/ph/` (~2.9 MB), and shown via a new `.is-photo` class that also hides the caption label. **These are temporary** and get replaced by the real photography before launch. The homepage was left untouched.

### 2026-07-27 — Owner feedback applied to Gather, Work and Events
Christian reviewed the sub-pages and sent feedback. Applied and deployed (commit `e0a2602`):

- **Gather** — reframed so the lead message is that M House is a place to relax, unwind, work casually and socialise. New hero "A place to come together"; section order is now *The everyday* → *A daily ritual* (aperitivo) → *"And there is always something on"*, where the four gatherings (Yaya's Corner, Breakfast & Swim, Sunrise/Water Yoga) are presented as an added pleasure, not the primary reason to visit.
- **Work** — removed the claim that daily aperitivo comes with a dedicated desk; added **Lounge membership (€288/month)** alongside hot desk, dedicated desk and meeting rooms; added a highlighted **Private offices** section (price on request).
- **Events** — simplified per the owner. Now headlines **private and corporate events** (weddings de-headlined); **all pricing removed** (venue hire, minimum spend, bar, catering); catering reduced to one line; add-ons mentioned without prices; the builder is now a **price-free selector** that composes a "Request a proposal" enquiry. Flagged the conflict with the services agreement (see Open work).
- Docs: recorded the changes in `CONTENT.md` (new "Owner revisions" section) and updated `PRE-LAUNCH.md` §6.

### 2026-07-24 → 2026-07-26 — Legal, splash and Events polish
- Added **Privacy Policy** and **Terms of Use** pages, built from the client's legal text via `tools-legal.cjs` (effective 24 July 2026). Marked received in `PRE-LAUNCH.md` §3 (commits `1c94fff`, `d18ecbb`).
- Events builder: added a short description under each add-on service (`a44bd28`).
- Splash: replaced the logo with the new white M House mark, lightened the tagline weight, removed the scrolling indicator line (`0023c8d`, `5facdd4`).
- Homepage logo now links to `/` instead of `/index.html` (`aa58c87`).
- Fixed invisible nav links over the hero — nav links now render in the palm colour and turn dark on scroll (`317e02b`).

### Earlier — build system, sub-pages and homepage migration
- Built the tiny shared-partial build system (`_src/partials/` + `_src/pages/` + `build.cjs`) so nav/footer/CSS/logo live in one place, and migrated the approved homepage onto it (verified: all images and sections preserved).
- Built the sub-pages from client content: `stay` (five rooms, each with its own 5-image sliding gallery), `swim`, `work`, `contact`, `wellness`, `events`, `gather`.
- Fixed a pre-existing bug where an unguarded testimonials-slider reference threw on every sub-page and silently halted all subsequent JS; guarded it.
- Set up the repo, GitHub Pages hosting and the `mhouse.wecomeone.me` review URL; added the mobile hamburger nav and a round of mobile-layout fixes.

*For the detailed pre-launch checklist see `PRE-LAUNCH.md`. For the client-content source of truth see `CONTENT.md`.*
