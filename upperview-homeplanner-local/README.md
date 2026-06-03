# UpperView HomePlanner Wayback Local Repair

This folder is a local static repair of:

`https://web.archive.org/web/20200803093858/http://upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`

The page now loads locally without the Wayback replay wrapper and without the Wayback JavaScript/license popup. It renders past `Loading...` into the original app UI for `Grandview Trail`.

The rebuilt prototype now includes a clearly marked reconstructed sample catalog so the app demonstrates the original flow beyond the previous `0 Home Plans` state.

## Run

From this folder:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8765/index.html?nbrhood=Grandview%20Trail
```

If `python` is not on your PATH, use any static file server from this folder.

## What Was Changed

- Downloaded the archived raw HTML with the Wayback wrapper removed.
- Downloaded local CSS, JavaScript, Font Awesome, icons, and required support assets.
- Rewrote asset URLs to local relative paths.
- Stubbed third-party analytics/social/map loaders so the old app can boot locally without external popups or auth scripts.
- Routed the missing historical PHP AJAX endpoints to local static generated data files in `data/generated/`.
- Added a compatibility serializer so legacy XML/JSON/text payloads are generated from `app/config/upperview-project.config.js`.
- Added local no-op mocks for late-flow favorites, lead capture, email, CRM, brochure, and user/session endpoints.
- Replaced a hard-coded Cloudinary equal-housing logo request with `local-mocks/eho-logo.png`.

## Recovered And Reconstructed Data

Recovered files are under:

- `data/recovered/`

Reconstructed files are under:

- `data/reconstructed/`

Generated active route payloads are under:

- `data/generated/`

The Wayback archive did not contain the dynamic UpperView PHP responses needed by the app. The local prototype therefore uses generated responses from a clearly reconstructed neutral sample catalog.

The sample catalog is not historical. It currently includes 3 neutral reconstructed plans, 6 elevations, multiple color schemes, palettes, floorplan options, lots, quick move-in examples, and availability states so the original frontend can demonstrate realistic catalog behavior.

## Documentation

- `ENDPOINT_INVENTORY.md`
- `API_CONTRACTS.md`
- `DATA_MODEL.md`
- `RECOVERY_LOG.md`
- `REBUILD_PLAN.md`
- `BROKEN_DEPENDENCIES.md`
- `GENERATED_PAYLOAD_MAPPINGS.md`
- `RECONSTRUCTED_SAMPLE_CATALOG.md`
- `COMPATIBILITY_TEST_SUITE.md`
- `LATE_FLOW_MOCK_ENDPOINTS.md`

## Generate And Test Legacy Payloads

From this folder:

```powershell
node scripts\generate-legacy-payloads.js
node tests\compatibility.test.js
```

The generated files preserve the old endpoint response shapes while making the normalized config the source of truth.

## Verification

Verified with local payload generation, compatibility tests, and a temporary local static server route check. The current generated route check had:

- 40 active routes.
- 12 catalog/runtime routes resolving from `data/generated`.
- 28 late-flow user/session routes resolving through safe local mocks.
- 3 plans in generated plans XML.
- 6 elevations in generated plans XML.
- 6 elevations in generated lazy elevation details JSON.
- Summary counts matching the reconstructed catalog.

Earlier browser screenshots still document the recovered UI getting past `Loading...`; current headless browser automation was not available in this sandbox, so this pass verified generated route behavior rather than producing a new screenshot.

Screenshots:

- `sample-catalog-screenshot.png`
- `screenshots/01-plan-selected.png`
- `screenshots/02-floorplan-options.png`
- `screenshots/04-generated-payloads.png`

## Can This Be Rebuilt Into A Modern Prototype?

Yes. The original system can realistically be rebuilt into a usable modern prototype because the frontend exposes the core data model, endpoint paths, query parameters, and expected response shapes.

What is still missing is the historical UpperView dataset: real plan names/IDs, lot geometry, elevation IDs/images, floorplan artwork, structural options, color packages, finishes, pricing, inventory homes, and user/favorite records.
