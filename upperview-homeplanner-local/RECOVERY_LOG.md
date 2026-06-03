# Recovery Log

## Summary

- The local page repair used the raw Wayback `id_` capture for the August 3, 2020 page.
- Broad Wayback CDX searches recovered original static assets and comparable Rendering House backend responses for other clients.
- No UpperView-specific dynamic PHP backend responses were recovered.
- The current sample catalog is reconstructed, not historical.
- Phase 1 Task 1 now generates the active legacy XML/JSON/text endpoint payloads from normalized project configuration.
- Phase 1 Task 2 expanded the normalized schema and serializer to cover the legacy fields currently required or referenced by the recovered runtime.
- Phase 1 Task 3 added a compatibility serializer test suite for generated endpoint files, route compatibility, required legacy fields, parseability, and catalog relationships.
- Phase 1 Task 4 expanded the reconstructed catalog to 3 neutral plans, 6 elevations, multiple color packages, options, lots, inventory examples, and availability states.
- Phase 2 Task 1 added safe local no-op mocks for favorites, registration, lead capture, email, CRM, brochure, and inventory-photo endpoints.

## Searches Performed

- `upperviewhomeplanner.com/*` across all years.
- `*.upperviewhomeplanner.com/*` across all years.
- `upperviewhomeplanner.com/homedesigner/*`.
- `upperviewhomeplanner.com/db/*`.
- URL searches containing `Grandview`, `UpperView`, `upperview`, `clientId=1`, `nbrhoodIds=1`, and `ids=1`.
- Endpoint searches on `upperviewhomeplanner.com`, `www.upperviewhomeplanner.com`, `rendering.house`, and `www.rendering.house`.
- Focused searches for all PHP endpoints discovered in the frontend bundle.
- General web searches for `Grandview Trail`, `UpperView`, and `upperviewhomeplanner.com`.

## Recovered Original Data

Saved under `data/recovered/`:

- Multiple original UpperView HTML captures from 2016, 2018, 2019, 2020, and 2021/2025.
- The target August 3, 2020 `Grandview Trail` HTML capture.
- Original static app assets: `homebuilder.min.js`, `foundation.min.js`, `app.css`, `homebuilder.min.css`, icons, and external scripts.
- Comparable `rendering.house/db/scripts/php` backend responses for other clients, including `getcolorlib.php`, `getsummary.php`, `getnbrhoodsdata.php`, and `getplans.php`. These are useful schema references but are not UpperView data.
- Historical shared `rendering.house/homedesigner` app bundles from 2015-2020.

## Not Recovered

- UpperView `getclientdata.php`.
- UpperView `getcolorlib.php`.
- UpperView `getsummary.php`.
- UpperView `getnbrhoodsdata.php`.
- UpperView `getplans.php`.
- UpperView lazy elevation/floorplan/interior JSON/XML responses.
- Real plan IDs, lot IDs, elevation IDs, option/package IDs, pricing tables, and plan/floorplan artwork from the original backend.

## External Corroboration

General web search confirms `Grandview Trail` was an Upperview Homes community in Oshawa and is now sold out/complete. Some public real-estate pages mention example homes and square footage, but they do not expose the HomePlanner backend schema or exact app catalog records.

## Data Status Labels

- `recovered`: downloaded from Wayback or original public asset URLs.
- `inferred`: schema or behavior derived from frontend code.
- `reconstructed`: local data created to satisfy the inferred schema.
- `generated`: route-compatible legacy payload created from normalized configuration.
- `speculative`: plausible business model or missing table not directly required by the frontend.

## Generated Compatibility Layer

Active local route responses are now saved under `data/generated/`.

They are produced by:

- `app/config/upperview-project.config.js`
- `app/platform/legacy-payload-generator.js`
- `scripts/generate-legacy-payloads.js`

The older `data/reconstructed/` payloads are still retained as preserved fallback/evidence files, but the recovered frontend now routes to generated files through `HomePlannerConfig.api.routes`.

Compatibility coverage is tested by:

- `tests/compatibility.test.js`
- `tests/compatibility-snapshots.json`

Detailed endpoint-to-config mappings are documented in:

- `GENERATED_PAYLOAD_MAPPINGS.md`

Compatibility test coverage is documented in:

- `COMPATIBILITY_TEST_SUITE.md`

Field-level schema coverage is documented in:

- `LEGACY_SCHEMA_COVERAGE.md`

The richer reconstructed sample catalog is documented in:

- `RECONSTRUCTED_SAMPLE_CATALOG.md`

Late-flow user/session mocks are documented in:

- `LATE_FLOW_MOCK_ENDPOINTS.md`

## Phase 1 Task 2 Notes

Task 2 did not recover new original UpperView backend data. It treated the recovered frontend JavaScript as the backend specification and expanded the normalized config/generator boundary to support:

- optional client, designer, and CRM startup fields
- community filter/count/range fields
- community CRM id, legends, lots, land photos, and inventory passthrough
- richer plan/elevation media, filter, status, and pricing metadata
- scheme/palette overlay metadata
- floorplan option dependencies and alternates
- interiors rooms and selections

Compatibility tests now include a richer synthetic config proving these optional fields serialize into route-compatible XML/JSON without replacing the recovered runtime.

## Phase 1 Task 4 Notes

Task 4 did not recover new original UpperView data. It expanded the clearly marked reconstructed catalog so the local prototype can demonstrate more realistic buyer behavior while preserving the recovered runtime.

The generated payloads now include:

- 3 neutral reconstructed plans
- 6 reconstructed elevations
- 3 color schemes and 3 palettes
- multiple floorplan option groups and priced options
- 6 reconstructed lots with available, hold, sold, model, and quick move-in states
- 2 reconstructed quick move-in inventory examples
- summary counts and ranges aligned with the richer sample catalog

Runtime limitations remain:

- Real plan/elevation/lot/option IDs and names are still missing.
- Elevation, floorplan, interior, and siteplan artwork remains unrecovered.
- Lazy static endpoint files now include all reconstructed elevations so multi-plan selection can work without a query-aware PHP backend.
- Real favorites, lead capture, CRM, email, brochure, MLS photo, and cloud inventory integrations remain unrecovered; local no-op mocks now cover those paths.

## Phase 2 Task 1 Notes

Task 1 of Phase 2 did not recover original PHP implementations. It added in-browser local no-op behavior for late-stage endpoints referenced by the recovered runtime:

- favorites read/write/sync endpoints
- favorite floorplan, palette, and custom scheme endpoints from adjacent recovered bundles
- registration, authentication, password reset, and prospect lookup endpoints
- email, registration email, and CRM submission endpoints
- brochure HTML/file upload endpoints
- inventory cloud-photo and MLS photo endpoints

The mocks return simple local success or empty-data responses. They do not send external requests, create real records, or persist real user data. Mock submissions are kept only in memory at `window.HomePlannerPlatform.mockLog` for debugging.
