# Task: Premium Font Migration

## Objective

Migrate the typography stack of the Sentient Retention Engine to a high-end, premium combination to elevate the visual aesthetic of the Cyber SOC HUD-style interface.

### Selected Typography

* **Display / Headings / Large Text**: `Space Grotesk` (Geometric, high-tech display font, replacing `Bebas Neue`).
* **Body / Sans / Interface Text**: `Plus Jakarta Sans` (Refined, premium modern geometric sans-serif, replacing `Inter`).

---

## Migration Roadmap

### Phase 1: HTML Entry Point Font Ingestion

* [x] Modify `frontend/index.html` to ingest the new premium Google Fonts (`Space Grotesk` and `Plus Jakarta Sans`) instead of the default ones (`Inter` and `Bebas Neue`).

### Phase 2: CSS Stylesheet Integration

* [x] Modify `frontend/src/styles/index.css` to update the `@import` url to Google Fonts.
* [x] Map body, base tags, and key custom typography styles (e.g., `body`, `p`, `.font-sans`, `.text-label`, `.italic-serif`) to `'Plus Jakarta Sans'`.
* [x] Map display elements (e.g., `h1, h2, h3, h4`, `.font-display`, `.section-header`, `.text-value`) to `'Space Grotesk'`.

### Phase 3: Tailwind Config Definitions

* [x] Modify `frontend/tailwind.config.js` to extend `fontFamily` mapping:
  * `sans`: `['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']`
  * `display`: `['"Space Grotesk"', 'sans-serif']`

### Phase 4: Canvas Renderer Typography

* [x] Modify custom 2D canvas drawing logic in `frontend/src/pages/Dashboard/Dashboard.jsx` to render node labels and metadata using `Space Grotesk` or `Plus Jakarta Sans` as appropriate.

### Phase 5: Verification & Quality Check

* [ ] Run the lint/typecheck steps on the frontend using `npm run lint`.
* [ ] Start dev preview to verify layout and font loading correctness.
