# PRD — Kolkata Startup Map (v1)

**Owner:** Rishi
**Type:** Side project / weekend build
**Target launch:** Monday
**Budget:** ₹0

## 1. Problem / Motivation
Kolkata's startup ecosystem has no single visual, browsable directory. Bangalore has one (bangalorestartupmap.com) and it clearly gets traction (job alerts, subscribe funnel, "Boost" monetization). Kolkata doesn't have an equivalent. This is a fast, visible way to build a public asset, get founders/recruiters talking about it, and grow Rishi's personal brand alongside Solopreneur Space.

## 2. Goal for v1
Ship a working, good-looking, mobile-friendly map of Kolkata startups by Monday, seeded with 50–100 real entries, with basic filtering and search. Not a full clone of every Bangalore feature — the smallest version that is genuinely useful and shareable.

## 3. Non-goals for v1 (explicitly deferred)
- User accounts / login
- Live database-backed submissions
- "Boost" / paid promotion
- Email subscribe backend (newsletter capture)
- Marker clustering (not needed under ~150 pins)
- Admin dashboard / moderation UI
- Analytics dashboards, founder profiles, funding data feeds

These are all good v2+ ideas once the map has real traffic and a reason to invest more time/money.

## 4. Core user stories (v1)
1. As a visitor, I can open the site and see a map of Kolkata with pins for local startups.
2. As a visitor, I can click a pin and see the startup's name, sector, stage, area, and a link to their site.
3. As a visitor, I can filter pins by type (Startup/VC), area, stage, and sector.
4. As a visitor, I can search by startup name.
5. As a visitor, I can toggle between Map view and Grid/list view.
6. As a founder, I can click "Submit your startup" and fill a form to get added.
7. As a visitor on mobile, the map and filters work without horizontal scrolling or broken layout.

## 5. Feature scope (v1 checklist)

| Feature | In v1? | Notes |
|---|---|---|
| Map with colored pins | Yes | react-leaflet, OpenStreetMap tiles |
| Pin popup (name, sector, stage, area, link) | Yes | |
| Search bar (by name) | Yes | Client-side filter, no backend |
| Filter: type | Yes | Startup / VC |
| Filter: area | Yes | Kolkata-specific list (see Tech doc) |
| Filter: stage | Yes | Seed, Bootstrapped, Series A, etc. |
| Filter: sector | Yes | AI, D2C, Fintech, etc. |
| Map / Grid toggle | Yes | Grid = simple card list |
| Result count | Yes | "N results" |
| Submit button | Yes | Links to Google Form, not a live backend |
| Job alerts CTA | Maybe, if time allows | Low priority, can be a static "coming soon" |
| Boost / paid | No | v2+ |
| Newsletter popup | No | v2+ |
| Logos per startup | Nice-to-have | Fallback to colored initial circle (like Bangalore's) if no logo |

## 6. Data plan
- v1 target: **50–100 startups**, hand-curated + crowdsourced in parallel (LinkedIn post + Google Form).
- Stored as a single `startups.json` file in the repo — no live database for v1.
- New submissions via Google Form are reviewed by Rishi and manually merged into `startups.json` (few minutes of work, can be done daily).
- Full field schema is in `TECH_STACK.md`.

## 7. Success criteria for Monday launch
- Site is live on a public URL, loads correctly on mobile and desktop.
- At least 50 real, verified Kolkata startups on the map.
- Filters and search actually work (no dead UI).
- Submit button works end-to-end (Google Form accepts responses).
- Rishi posts the launch on LinkedIn.

## 8. Risks
- **Data is the bottleneck, not code.** Mitigate by starting sourcing today (Friday), in parallel with build.
- **Scope creep toward the full Bangalore feature set.** Mitigate by keeping this PRD as the source of truth — Boost/newsletter/accounts are out of scope, full stop, for v1.
- **Logo assets missing for most startups.** Mitigate with a fallback: colored circle + first letter, same pattern as the reference site.

## 9. v2+ ideas (parked, not for this weekend)
- Live submission form → serverless function → database (Supabase free tier)
- Marker clustering once pin count grows
- Newsletter signup (Buttondown/ConvertKit free tier)
- "Boost" placement as a small revenue experiment
- Founder-editable listings
- Kolkata-specific categories (e.g., filter by IIM-C/incubator affiliation)
