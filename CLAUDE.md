# CLAUDE.md — Moment Lab Website

**Single source of truth for building momentlab.co.uk.**
Read this file in full at the start of every session. It contains project rules, brand system, site structure, and all page copy.

---

## 0. Project Overview

**What we're building:** A multi-page marketing website for Moment Lab — a premium photobooth service in Newcastle & the North East.

**Stack:**
- Static HTML, one file per page
- Shared CSS via `/assets/styles.css`
- Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>`) for utility classes only — brand colors/fonts come from CSS variables, NOT default Tailwind palette
- Vanilla JavaScript where needed (no frameworks)
- Google Fonts (Cormorant Garamond, Josefin Sans, Dancing Script)
- No build step — can be deployed directly

**Deployment:** Cloudflare Pages (static hosting). No build command needed. Just push the folder to a GitHub repo and connect it to Cloudflare Pages, or drag-and-drop the folder into the Cloudflare Pages dashboard.

---

## 1. Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read this entire CLAUDE.md** before making changes. It is the source of truth.

---

## 2. Project Structure

```
moment-lab/
├── CLAUDE.md                          ← this file
├── index.html                         ← homepage
├── the-studio.html                    ← The Studio page
├── the-looking-glass.html             ← The Looking Glass page
├── faqs.html                          ← FAQs page
├── contact.html                       ← Contact page
├── blog.html                          ← Blog (The Journal) landing
├── relive-the-moment.html             ← Gallery access page
├── /assets/
│   ├── styles.css                     ← shared CSS (brand variables, typography, components)
│   ├── main.js                        ← shared JS (nav, forms, etc.)
│   └── /images/                       ← site imagery (add as needed)
├── /brand_assets/
│   ├── moment-lab-primary.svg         ← primary logo
│   └── moment-lab-brand-book.html     ← brand book (reference only)
├── /temporary screenshots/            ← auto-created by screenshot.mjs
├── serve.mjs                          ← local dev server
└── screenshot.mjs                     ← Puppeteer screenshot tool
```

---

## 3. Brand System

### 3.1 Colors (use these exact hex values — do not invent)

| Token | Hex | Use |
|---|---|---|
| `--obsidian` | `#0A0A0A` | Primary dark background |
| `--smoke` | `#1A1814` | Alt dark background |
| `--coal` | `#2A2823` | Borders on dark |
| `--gilt` | `#C9A84C` | Primary gold — accents, italic words, CTAs |
| `--gilt-soft` | `#D9BC68` | Lighter gold — hover states, subtle highlights |
| `--gilt-deep` | `#8F7530` | Deeper gold — pressed states, fine lines |
| `--bone` | `#F4EEE2` | Primary light background |
| `--paper` | `#EAE2D0` | Alt warm background |
| `--ivory` | `#FBF7EE` | Lightest warm — cards, surfaces |
| `--stone` | `#918877` | Muted text, captions |

**Never** use default Tailwind palette (indigo-500, blue-600, sky, emerald, etc.). Brand colors only.

### 3.2 Typography

Google Fonts import (put this in `<head>` of every page):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Dancing+Script:wght@400;500&display=swap" rel="stylesheet">
```

**Font stack:**
- `--serif: 'Cormorant Garamond', 'Times New Roman', serif;` → all headings, lead paragraphs, italic display words
- `--sans: 'Josefin Sans', 'Helvetica Neue', sans-serif;` → body text, buttons, nav, labels, eyebrows
- `--script: 'Dancing Script', cursive;` → used sparingly for signature-style accents (rare — use with intention)

**Body defaults:**
- Base font: `--sans`, 15px, weight 300, line-height 1.65
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

**Heading scale (mobile-first, fluid):**
- `h1.hero` — serif, weight 300, `clamp(3.5rem, 10vw, 8.5rem)`, line-height 0.92, tracking -0.02em. `<em>` words inside render italic + `--gilt`.
- `h2.display` — serif, weight 300, `clamp(2.5rem, 6.5vw, 5rem)`, line-height 1, tracking -0.015em.
- `h3.sub` — serif, weight 400, `clamp(1.75rem, 3vw, 2.5rem)`, line-height 1.15.
- `h4.eyebrow` — sans, 10px, letter-spacing 0.35em, uppercase, weight 400, with a 24×1px `--gilt` line before it.
- `h5.label` — sans, 10px, letter-spacing 0.3em, uppercase, weight 500, color `--stone`.

**Paragraph styles:**
- Default `<p>` — max-width 60ch, weight 300.
- `p.lead` — serif, `clamp(1.35rem, 2.4vw, 1.9rem)`, line-height 1.35, italic, max-width 30ch.
- `p.body-large` — 17px, line-height 1.7, max-width 58ch.

**Rules for italics:**
- Italic words inside headings = `--gilt` color. This is the brand's signature gesture. Use it sparingly — usually one italic phrase per heading.
- Example: `<h1 class="hero">Your <em>Moment</em>. Beautifully Captured.</h1>`

### 3.3 Layout

- Page padding: `90px 8vw 110px` on desktop, `60px 6vw 80px` on mobile
- Grid gaps: 48px default, 80px on spacious layouts, 24px on tight card grids
- Generous whitespace is the brand. Never compress.

### 3.4 Logo usage

- Primary logo: `brand_assets/moment-lab-primary.svg` (gilt wordmark on obsidian)
- On dark backgrounds: use as-is
- On light backgrounds: the logo needs a dark background panel OR use an inverted version (to be created later — for now, default to placing it on a dark area)
- Minimum width: 120px
- Clear space around logo: at least 1x the "M" height on all sides

### 3.5 Voice & tone

- Warm, confident, premium — never salesy or over-the-top
- Short sentences. Fragments welcome. Em dashes — used — often.
- British English spelling ("personalised", "colour", "favourite")
- No pricing anywhere on the site
- Italics in headings carry the gold — so the italic word matters. Pick it with care.

---

## 4. Local Dev Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

---

## 5. Screenshot Workflow
- Puppeteer is installed as a local dependency in `./node_modules/` (via `npm install`). No global install needed.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- For individual pages: `node screenshot.mjs http://localhost:3000/the-studio.html studio`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- **Reference to compare against:** use the brand book layout (`brand_assets/moment-lab-brand-book.html`) as the visual language benchmark.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- **Do at least 2 comparison rounds** before declaring a section done.

---

## 6. Output Defaults
- Multi-page static site. One HTML file per page (see Project Structure).
- Shared styles live in `/assets/styles.css` — define CSS variables there, plus base typography, buttons, nav, footer.
- Tailwind via CDN: `<script src="https://cdn.tailwindcss.com"></script>` — use for layout utilities only (flex, grid, spacing, responsive breakpoints). Colors and fonts come from CSS variables.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT/0A0A0A/C9A84C` (use obsidian bg + gilt text to stay on-brand)
- Mobile-first responsive

---

## 7. Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette. Use only the brand tokens from Section 3.1.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity. Example: `box-shadow: 0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.08);`
- **Typography:** Never use the same font for headings and body. Cormorant Garamond for headings, Josefin Sans for body. Apply tight tracking (`-0.02em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth on hero and feature backgrounds.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for UI, `cubic-bezier(0.22, 1, 0.36, 1)` for scroll reveals.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a subtle gradient overlay (`bg-gradient-to-t from-black/40`) on hero/feature images to ensure text contrast.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps. Prefer a scale of 8, 16, 24, 32, 48, 64, 80, 120 px.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

---

## 8. Hard Rules
- Do not add sections, features, or content not specified in this document
- Do not "improve" brand decisions — match the brand book's visual language
- Do not stop after one screenshot pass (minimum 2 rounds of compare-and-fix)
- Do not use `transition-all`
- Do not use default Tailwind palette as brand color
- Do not display pricing anywhere on the site
- Do not build sections out of order — follow the user's instructions on which section to build next
- Do not commit to doing multiple pages in one prompt unless explicitly asked

---

## 9. Site Structure

### 9.1 Main Navigation
Order: **Our Booths ▾ · Relive the Moment · Blog · FAQs · Contact · [Enquire Now]**

The "Our Booths" dropdown contains: **The Studio · The Looking Glass**

The **[Enquire Now]** is a gilt button, visually distinct from the rest of the nav items.

### 9.2 Pages (and their URL paths)

| # | Page | Path |
|---|---|---|
| 1 | Homepage | `/` (index.html) |
| 2 | The Studio | `/the-studio.html` |
| 3 | The Looking Glass | `/the-looking-glass.html` |
| 4 | FAQs | `/faqs.html` |
| 5 | Contact | `/contact.html` |
| 6 | Blog (The Journal) | `/blog.html` |
| 7 | Relive the Moment | `/relive-the-moment.html` |

### 9.3 Shared Components (build once, reuse on every page)
- **Top nav** — sticky, obsidian background, gilt logo on left, links center/right, Enquire Now button on far right
- **Footer** — obsidian background, gilt accents, three columns (brand/tagline, explore, contact), legal strip at bottom
- **Enquiry CTA block** — reusable closing section with "Ready to Plan Your Moment?" prompt + button

---

# 10. PAGE COPY

The exact copy for every page. Do not paraphrase. Do not add content not listed here.

---

## 10.1 Homepage (`index.html`)

### Hero
**Your <em>Moment</em>. Beautifully Captured.**

Premium photobooth experiences across Newcastle and the North East. Pro-grade cameras, instant keepsake prints, and backdrops designed to make every guest look incredible.

[Enquire Now]   [See Our Booths]

### Intro Strip
*One-line sub-hero, centered, italic serif.*

Photobooths, reimagined. Every detail considered. Every moment worth keeping.

### Our Booths

**Two Booths. One Standard.**

Every Moment Lab booth is built around the same promise — professional-quality photos, printed in seconds, delivered with care. Choose the experience that suits your event.

**The Studio**
Our signature open-air booth. Crafted from natural wood, fitted with a professional DSLR and studio ring light. Portrait-quality photos in a setup that looks as good as the pictures it takes.
[Explore The Studio →]

**The Looking Glass** *(Coming Soon)*
A full-length interactive mirror booth wrapped in a vintage-inspired wooden frame. Part photobooth, part performance — an experience your guests won't forget.
[Register Your Interest →]

### What's Included

**Everything You Need. Nothing You Don't.**

Every booking includes the full Moment Lab experience — no hidden extras, no surprises. Just a beautifully run booth and keepsakes your guests will actually want to take home.

**Unlimited Keepsake Prints**
Classic strip or postcard format, printed on-site in seconds using professional dye-sublimation technology. Fridge-worthy, not disposable.

**Instant Digital Sharing**
A quick QR scan sends photos straight to your guests' phones — ready to share wherever the moment takes them.

**Premium Backdrop**
A curated collection of luxury backdrops to complement your event's style, from elegant neutrals to champagne shimmer.

**Themed Props**
Carefully selected pieces that match the vibe. No cheap plastic — just props your guests will actually want to pose with.

**Personalised Welcome Screen**
Your names, date, logo, or message displayed on the booth screen — setting the tone from the very first photo.

**Dedicated Booth Attendant**
A friendly, professional Moment Lab attendant on-site throughout your event, keeping things running and making sure every shot looks perfect.

**Full Setup & Breakdown**
We arrive early, set up everything, and pack down at the end. You don't lift a finger.

**Live Photo Display**
A real-time gallery showing photos as they're taken — guests love watching the feed, and it draws more people to the booth.

**Digital Gallery for You**
After your event, you'll receive every photo in full resolution — delivered digitally, ready to share, print, or keep forever.

### How to Book

**Booking Moment Lab is simple.**
Three steps from first enquiry to the moment we arrive at your venue.

**01 · Get in Touch**
Fill out our enquiry form and we'll put together a bespoke package tailored to your event. Once you're happy, secure your date with a deposit and signed contract.

**02 · Plan the Details**
As your event approaches, we'll be in touch to finalise everything — your backdrop, print design, setup times, and any personal touches.

**03 · Enjoy Your Event**
On the day, we handle it all — setup, booth, attendant, prints, and packdown. You just enjoy the moment.

### Gallery Strip

**A Few Recent Moments.**
Every event tells its own story. Here's a glimpse of ours.

*[Grid of 6–8 event photos — use placeholders until real images are added]*

[Explore the Gallery →]

### Testimonials

**Kind Words from Lovely People.**
*[Carousel of 3–5 client testimonials — use placeholder testimonials for now, format: quote + name + event descriptor]*

### Instagram Feed

**Follow the Moments.**
See the latest from our booth on Instagram — real events, real guests, real keepsakes.

[@momentlab.co →]

*[Live feed of 6–8 most recent Instagram posts — placeholder grid for now]*

### Closing CTA

**Ready to Plan Your Moment?**
Tell us a little about your event and we'll come back to you with a tailored quote — usually within 24 hours.

[Enquire Now]

### Footer (shared across all pages)

**Moment Lab**
Premium photobooth experiences across Newcastle & the North East.
Weddings · Corporate Events · Celebrations

**Explore**
Our Booths · Relive the Moment · Blog · FAQs · Contact

**Get in Touch**
hello@momentlab.co.uk
+44 7345 686762
Instagram · TikTok

*© Moment Lab 2026. All rights reserved.*
Privacy Policy · Terms & Conditions · Cookie Policy

---

## 10.2 The Studio (`the-studio.html`)

### Hero
**The Studio**
*Our signature open-air booth.*

Crafted from natural wood. Built around a professional DSLR. Designed to make every guest look their best.

[Enquire About The Studio]

*[Hero image placeholder: The Studio in a beautifully styled venue]*

### Intro

**Photobooth quality, reimagined.**

Most photobooths settle for "good enough." The Studio doesn't. Behind its warm wooden frame sits a professional DSLR camera and a studio-grade ring light — the same kit used by portrait photographers. Guests step up, the light does the work, and the result is a beautifully lit, professional-grade photo, printed in seconds and shared instantly.

It's the kind of booth people queue for. And the kind of photo they actually keep.

### Why The Studio

**Designed with Every Detail in Mind.**

**A Booth That Belongs in the Room**
Hand-crafted from natural wood with a warm, timeless finish — The Studio blends into any venue without overpowering the space. No bulky plastic. No distracting branding. Just a beautifully made piece that belongs wherever it's placed.

**Portrait-Quality Photos**
A professional DSLR camera paired with a studio ring light delivers crisp, flattering images — far beyond what a typical photobooth can offer. Every shot is sharp, well-lit, and print-ready.

**Open-Air Design**
No curtains, no cramped boxes. The open-air setup means groups of any size can jump in together — the more, the better. It also invites spectators, which keeps the energy around the booth high all night.

**Prints in Seconds**
Photos are printed on-site in seconds using professional dye-sublimation technology. Choose from classic strip (2x6) or postcard (4x6) format — both printed on premium, smudge-proof photo paper built to last.

**Instant Digital Sharing**
A quick QR scan and the photos land straight on your guests' phones — ready for the group chat, the story, or the camera roll.

### What's Included

**The Studio, fully loaded.**

Every Studio booking includes the full Moment Lab experience:
- Unlimited keepsake prints
- Instant digital sharing via QR code
- Premium backdrop of your choice
- Curated prop selection
- Personalised welcome screen
- Dedicated booth attendant throughout
- Full setup and breakdown
- Live photo display
- Full-resolution digital gallery after your event

### The Specs

**Built Properly. Runs Beautifully.**

- **Camera** — Professional DSLR
- **Lighting** — Studio-grade ring light
- **Prints** — Dye-sublimation, strip (2x6) or postcard (4x6)
- **Format** — Open-air, wooden frame
- **Footprint** — Approx. 2m x 2m of floor space
- **Power** — One standard plug socket within 5m
- **Setup Time** — 60–90 minutes before guests arrive

### Gallery

**The Studio in the Wild.**
A look at real events, real guests, and the kind of photos The Studio delivers.

*[Grid of 8–12 image placeholders]*

[Explore the Full Gallery →]

### Testimonial Feature

> "Every one of our guests walked away with a print. Weeks later, people are still talking about it."
>
> **— [Client Name], [Venue / Event descriptor]**

### Closing CTA

**Let's Plan Your Moment.**
Tell us a little about your event and we'll come back to you with a tailored package — usually within 24 hours.

[Enquire About The Studio]

Prefer to see the other option? [Meet The Looking Glass →]

---

## 10.3 The Looking Glass (`the-looking-glass.html`)

### Hero
*Coming Soon*

**The Looking Glass**
*A photobooth, reimagined as an experience.*

[Register Your Interest]

*[Hero image placeholder: styled shot of The Looking Glass mirror booth]*

### Intro

**Something special is on its way.**

The Looking Glass is our next chapter — a full-length interactive mirror booth wrapped in a vintage-inspired wooden frame. It doesn't just take photos. It invites guests into a moment.

Touch the mirror. Follow the prompts. Watch animations play across the glass as the booth guides you through the perfect shot. Then — a beautifully printed keepsake, seconds later.

It's part photobooth. Part performance. Entirely unforgettable.

### What Makes It Different

**More Than a Photo. A Moment to Step Into.**

**An Interactive Mirror**
A full-length touchscreen mirror that responds to every tap. Guests see themselves, the prompts, and the animations all in one — an experience that feels closer to magic than technology.

**Guided by Design**
On-screen animations and playful prompts walk guests through the shot — so every photo feels considered, not rushed. Even the guests who say they don't like photobooths tend to stay for a second round.

**A Frame That Belongs**
Housed in a vintage-inspired wooden frame, hand-finished to match the warmth of The Studio. The Looking Glass isn't a piece of tech dropped into your venue — it's a design piece that earns its place.

**The Same Moment Lab Standard**
Professional-grade capture. Instant keepsake prints. Digital sharing. A dedicated attendant. The Looking Glass delivers everything you'd expect from Moment Lab — with an experience layered on top.

### The Experience

**What Your Guests Will Remember.**

Walk up. The mirror lights up as you approach. A warm message greets you by name, or by the words you've chosen for the day. Prompts appear — playful, easy, no guesswork. The countdown begins, animations dance across the glass, and the shot is captured.

Seconds later, a beautifully printed keepsake slides out. A QR code sends the digital version straight to your phone.

Then someone else steps up — and the whole thing begins again.

### Be the First to Book

**The Looking Glass lands soon.**

We're accepting early interest now — and a small number of dates will be available ahead of the public launch. Register below and we'll be in touch the moment bookings open, with first access to your preferred date.

*[Register Interest Form]*
- Your name
- Email address
- Phone number
- Estimated event date
- Venue or location *(if known)*
- Anything you'd like us to know

[Register Your Interest]

### Closing

**In the meantime, meet The Studio.**
Our signature open-air booth is ready to book now — professional DSLR, studio lighting, and the same Moment Lab standard from start to finish.

[Discover The Studio →]

---

## 10.4 FAQs (`faqs.html`)

### Hero
**Frequently Asked Questions**
Everything you need to know before you book — from setup to space requirements to what happens on the day. Can't find what you're looking for? [Get in touch →]

### Booking & Planning *(accordion group)*

**How far in advance should I book?**
We'd recommend getting in touch as early as possible — popular dates, especially in peak season (May–September and December), tend to book up 6–12 months ahead. That said, we do our best to accommodate shorter notice wherever we can, so it's always worth asking.

**How do I secure my date?**
Once you're happy with your bespoke package, your date is secured with a deposit and a signed contract. Until then, dates are held on a first-come, first-served basis.

**Do you offer packages?**
Every Moment Lab booking is tailored to the event. We'll put together a bespoke package based on your date, venue, guest count, and any add-ons you'd like — so you only pay for what suits your day.

**Can I make changes after I've booked?**
Of course. Life happens, plans shift. As long as we have enough notice, we're happy to adjust timings, backdrops, or add-ons in the lead-up to your event.

**Do you travel outside Newcastle?**
Yes — we cover Newcastle and the wider North East as standard, and we're happy to travel further for the right event. Just mention your venue in your enquiry and we'll confirm.

### On the Day *(accordion group)*

**How long does setup take?**
We arrive 60–90 minutes before your booth is due to open, fully set up, test everything, and make sure it's ready to go before your guests arrive. Packdown takes around 45 minutes at the end of the hire.

**How much space do you need?**
Roughly 2m x 2m of floor space, with a ceiling height of at least 2.2m. If your venue is tighter than that, get in touch — we can usually work something out.

**What about power?**
A single standard plug socket within 5m of the setup location is all we need.

**Will someone be with the booth the whole time?**
Yes — every booking includes a dedicated Moment Lab attendant on-site throughout your hire. They'll run the booth, help guests, keep prints flowing, and make sure every shot looks its best.

**Can we have the booth set up earlier than it starts?**
Absolutely. If your venue has access restrictions or you'd like the booth styled and ready well before guests arrive, let us know — we'll build it into the plan.

### Photos & Prints *(accordion group)*

**How many prints do guests get?**
Unlimited. Every guest in every photo walks away with their own print — no restrictions, no "one per group."

**What size are the prints?**
You choose — classic strip (2x6) or postcard (4x6). Both are printed on premium photo paper using professional dye-sublimation technology, which means they're smudge-proof, water-resistant, and built to last.

**Can we personalise the prints?**
Yes. Every print includes a custom design — your names, date, event, logo, or whatever you'd like. We'll share proofs with you before the day.

**How do guests get the digital versions?**
A QR code on the booth screen sends their photo straight to their phone within seconds — ready to share however they like.

**When do we get all the photos?**
Your full digital gallery is delivered within 72 hours of your event. Every photo, full resolution, yours to keep and share.

### The Unexpected *(accordion group)*

**What happens if something goes wrong with the equipment?**
Our kit is professional-grade and maintained between every event, but we also travel with full backup equipment — cameras, printers, lighting — so if anything ever needs swapping out, your guests won't notice.

**What if we need to cancel?**
We'll always do our best to work with you. Our full cancellation and rescheduling terms are outlined in your contract — if you'd like more detail before booking, just ask.

**Do you have insurance?**
Yes — we hold full public liability insurance, and we're happy to share documentation with your venue if they require it.

### Closing

**Still have a question?**
If there's something we haven't covered, we'd love to hear from you. Drop us a line and we'll come back with an answer.

[Get in Touch →]

---

## 10.5 Contact (`contact.html`)

### Hero
**Let's Plan Your Moment.**
Tell us a little about your event and we'll come back to you with a tailored quote — usually within 24 hours.

### Enquiry Form

*Form fields:*
- Your name
- Email address
- Phone number
- Event date *(or estimated date)*
- Venue or location
- Approximate guest count
- Which booth are you interested in? *(The Studio / The Looking Glass / Not sure yet)*
- Anything else you'd like us to know?

[Send Enquiry]

*Small print below button:*
We'll be in touch within 24 hours. Your details stay with us — we'll never share them with anyone else.

### Other Ways to Reach Us

**Prefer email?**
hello@momentlab.co.uk

**Prefer to talk?**
+44 7345 686762
*Available Monday–Friday, 9am–6pm. Outside these hours, drop us a message and we'll call you back.*

**Find us on social:**
Instagram · TikTok

### Reassurance Strip

**What happens next.**
Once your enquiry lands, we'll take a look and come back to you within 24 hours — usually sooner. You'll get a tailored package based on your date, venue, and the booth you're after. No pressure, no hard sell. Just a clear proposal and space to ask anything you'd like.

---

## 10.6 Blog / The Journal (`blog.html`)

### Hero
**The Journal**
Stories from behind the booth — real events, thoughtful planning advice, and the occasional look at what we're up to at Moment Lab.

### Intro
**Notes, moments, and the details that make a great event.**
A quieter corner of the site, where we share what we've learned from running booths at some of the North East's most beautiful events — from the questions couples always ask us, to the venues that left us speechless, to the little details that turn a good night into a memorable one.

### Featured Post *(single full-width card at top)*
*[Featured post image]*
*[Category tag] · [Read time]*
**[Post Title]**
A short one-to-two-line excerpt that draws the reader in without giving everything away.
[Read the Post →]

### Post Grid
*Three-column grid of post cards (image, category, title, one-line excerpt, read time)*

**Categories to browse:**
All · Real Events · Planning Notes · Behind the Booth · Venues We Love

*[Grid of 6–9 post card placeholders, paginated below]*

### Subscribe Strip

**Stay in the loop.**
The occasional email — new posts, seasonal availability, and the odd behind-the-scenes look. No spam, ever. Unsubscribe anytime.

*[Email field]*   [Subscribe]

### Closing CTA
**Planning an event of your own?**
We'd love to hear about it.
[Enquire Now]

---

## 10.7 Relive the Moment (`relive-the-moment.html`)

### Hero
**Relive the Moment.**
Your event gallery, ready when you are. Every photo, full resolution, yours to download and share.

### Intro
**Welcome back.**
Whether you're the host reliving your big day, or a guest looking for the photos from the night, you'll find everything here. Enter your event details below to access your gallery.

### Gallery Access

**Find Your Gallery.**
*[Form fields]*
- Event date
- Host name *(the person who booked the event)*
- Access code *(sent to you by email after your event)*

[View Gallery]

*Small print:*
Can't find your access code? [Get in touch →] and we'll send it over.

### What to Expect

**Everything from the night, in one place.**
Your gallery includes every photo taken at the booth during your event — in full resolution, untouched, and ready to download individually or all at once as a zip file.

- **Download individual photos** straight to your phone or computer
- **Download the full gallery** as a single zip file
- **Share the link** with guests, friends, and family
- **Order prints** through our recommended print partner *(optional)*

Galleries stay live for **12 months** from your event date. If you'd like yours extended, just let us know.

### For Guests

**Were you at the event?**
If you're a guest looking for photos from a night you were at, you'll need the event date and access code from the host. Get in touch with whoever booked the event — they'll have it. Once you're in, every photo is free to download and share, no watermarks, no restrictions.

### A Note on Your Photos

**Your photos, your privacy.**
Every gallery is password-protected and only accessible to people with your event's unique access code. We'll never share your photos, publish them, or use them for marketing without asking you first — and if we ever do ask, it's only because something looked particularly beautiful and we wanted permission to share it.

If you'd like your gallery taken offline at any point, just email us and it's done.

### Closing CTA
**Loved the booth? Planning another event?**
Get in touch — we'd love to run it back.
[Enquire Now]

---

# 11. Developer Notes

- **No pricing** anywhere on the site
- **Enquiry form** should auto-send a confirmation email to the client (will be wired up post-deploy via a form handler like Cloudflare Pages Functions, Formspree, or Web3Forms)
- **The Looking Glass** is styled as "Coming Soon" until the booth is ready. Keep it in the nav but with a subtle "Coming Soon" label next to it
- **Relive the Moment** requires backend logic for gallery access — for launch, use per-event password-protected pages (simpler) and add proper auth later
- **Galleries** live for 12 months by default
- **All links** to pages not yet built should still work structurally (create empty HTML files as placeholders)
- **British English** spelling throughout ("personalised", "colour", "favourite", "recognise")

---

# 12. Cloudflare Pages Deployment

Once the site is built and working locally:

1. Create a GitHub repo and push the project folder to it
2. Log in to the Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
3. Select the repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave blank)
   - **Build output directory:** `/` (or blank)
5. Click "Save and Deploy"
6. Cloudflare gives you a `*.pages.dev` URL immediately
7. To use `momentlab.co.uk`, add the custom domain in Cloudflare Pages → Custom domains, and point the domain's DNS to Cloudflare

The site will redeploy automatically every time the GitHub repo is updated.

---

*End of CLAUDE.md.*
