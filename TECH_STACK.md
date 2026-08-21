# Tech Stack & Build Doc — Kolkata Startup Map (v1)

Companion to `PRD.md`. This is the doc to drop into Antigravity as project context.

## 1. Stack decision

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React | Faster dev loop than Next.js, no need for server routes since there's no backend for v1 |
| Styling | Tailwind CSS | Fast to build filter bars / cards / responsive layout without writing custom CSS |
| Map | `react-leaflet` (wraps Leaflet.js) | Free, no API key, same engine the reference site uses |
| Map tiles | OpenStreetMap (via Leaflet default or CARTO basemap) | Free, no key required. Keep the "© OpenStreetMap contributors" attribution visible — required by their license |
| Data | Static `startups.json` in the repo | No database needed at 50–150 entries; edits = git push = redeploy |
| Submissions | Google Form (linked, not embedded initially) | Zero backend, zero moderation risk, responses land in a Sheet for manual review |
| Hosting | Vercel (free tier) | One-command deploy from GitHub, free SSL, instant preview URLs |
| Domain | `<something>.vercel.app` for launch | Buy a real domain later only if the project proves worth it (~₹700–900/yr) |

**No backend server, no database, no auth for v1.** This is intentional — see PRD non-goals.

## 2. Why no backend right now
A backend earns its cost when you need: live writes from untrusted users, private data, or server-side logic. v1 has none of that — it's a read-only map over a JSON file, plus an outbound link to a Google Form. Adding Node/Express + a DB + hosting for it this weekend would burn the time you don't have and add zero user-visible value over the JSON approach. Revisit this in v2 once submissions volume makes manual JSON edits annoying.

## 3. Data schema — `startups.json`

```json
[
  {
    "id": "swiggy-kol-01",
    "name": "Example Startup",
    "type": "startup",           // "startup" | "vc"
    "sector": "fintech",         // ai | consumer | d2c | deeptech | edtech | fintech | gaming | healthtech | logistics | saas | other
    "stage": "seed",             // pre-seed | seed | bootstrapped | series-a | series-b | series-c | series-c+ | public | acquired
    "area": "salt-lake",         // see area list below
    "lat": 22.5726,
    "lng": 88.3639,
    "website": "https://example.com",
    "logoUrl": "",                // optional — leave blank to use fallback initial circle
    "colorSeed": "F"              // first letter used for the fallback circle + a consistent color
  }
]
```

Suggested Kolkata `area` list to seed the filter (adjust as you gather real data and see where startups cluster):
Salt Lake (Sector V), New Town / Rajarhat, Park Street, Ballygunge, Alipore, Behala, Howrah, Dum Dum, Garia, Jadavpur, EM Bypass, Other.

Sector and stage lists mirror the reference site's dropdowns (already in the PRD) — reuse the same values so filtering logic stays simple.

## 4. Component breakdown

```
App
├── Header
│   ├── Logo / Title ("Kolkata Startup Map")
│   ├── SearchBar (filters by name, client-side)
│   ├── FilterDropdown x4 (Type, Area, Stage, Sector)
│   ├── ViewToggle (Map / Grid)
│   └── SubmitButton (→ opens Google Form in new tab)
├── ResultCount ("N results")
├── MapView (shown when view === 'map')
│   └── react-leaflet MapContainer
│       └── Marker (one per filtered startup, colored circle + initial)
│           └── Popup (name, sector, stage, area, website link)
└── GridView (shown when view === 'grid')
    └── StartupCard x N (same data as popup, in a responsive grid)
```

State lives in the top-level `App` component: `searchQuery`, `filters {type, area, stage, sector}`, `view`. Everything below just reads filtered data — no routing, no global state library needed at this size (skip Redux/Zustand, plain `useState` is enough).

## 5. Marker styling
Match the reference pattern: solid colored circle, single-letter initial (first letter of sector or startup name), white text, subtle shadow. Assign colors either by sector (consistent color per sector = pins double as a visual sector legend) or by a fixed palette cycling per entry. Sector-based coloring is more useful for scanning the map at a glance — recommended.

## 6. Build order (maps to the day-by-day plan)

1. **Scaffold:** `npm create vite@latest` → React + JS template. Install `tailwindcss`, `react-leaflet`, `leaflet`.
2. **Static shell:** Header with non-functional filter buttons, empty map centered on Kolkata (`22.5726, 88.3639`, zoom ~12).
3. **Data wiring:** Load `startups.json`, render one marker per entry, popup on click.
4. **Filters + search:** Wire dropdowns and search input to filter the in-memory array before rendering markers/cards.
5. **Grid view:** Build `StartupCard`, toggle between map/grid.
6. **Submit button:** Link to Google Form (open in new tab).
7. **Polish:** Mobile responsiveness, result count, empty-state ("no results match your filters"), favicon, page title/meta description.
8. **Deploy:** Push to GitHub, connect repo to Vercel, deploy.

## 7. Deployment steps (Vercel)
1. Push the project to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite (auto-detected). No environment variables needed for v1.
4. Deploy. You get a `*.vercel.app` URL immediately.
5. Every subsequent `git push` to `main` auto-redeploys — this is how you'll "update the database" (edit `startups.json`, push, live in ~30s).

## 8. Attribution / legal note
Leaflet + OpenStreetMap tiles are free but require visible attribution ("© OpenStreetMap contributors") on the map — this is a license condition, not optional. `react-leaflet`'s default `TileLayer` attribution prop handles this; don't remove it.

## 9. What changes in v2 (not now)
When you're ready to add live submissions/newsletter/boost: introduce Supabase (free tier, generous limits, Postgres + simple client SDK) and a couple of Vercel serverless functions for form handling. That's a clean, still-cheap upgrade path from this exact stack — no rewrite needed, just additive.
