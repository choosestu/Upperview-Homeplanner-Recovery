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
- Routed the missing historical PHP AJAX endpoints to local static reconstructed data files in `data/reconstructed/`.
- Replaced a hard-coded Cloudinary equal-housing logo request with `local-mocks/eho-logo.png`.

## Recovered And Reconstructed Data

Recovered files are under:

- `data/recovered/`

Reconstructed files are under:

- `data/reconstructed/`

The Wayback archive did not contain the dynamic UpperView PHP responses needed by the app. The local prototype therefore uses reconstructed responses and one neutral sample plan named `Reconstructed Sample Plan`.

The sample plan is not historical. It exists so the original frontend can demonstrate plan loading, filtering/list display, selection, next-step navigation, elevation/options display, and a placeholder floorplan.

## Documentation

- `ENDPOINT_INVENTORY.md`
- `API_CONTRACTS.md`
- `DATA_MODEL.md`
- `RECOVERY_LOG.md`
- `REBUILD_PLAN.md`
- `BROKEN_DEPENDENCIES.md`

## Verification

Verified with a local static server and headless Chrome. The final prototype load had:

- No Wayback wrapper scripts.
- No Wayback popup.
- No failed network responses during the tested flow.
- Visible plan-list text including `1 Home Plans`, `Grandview Trail`, and `Reconstructed Sample Plan A`.
- Successful click-through into the elevation/options/floorplan step.

Screenshots:

- `sample-catalog-screenshot.png`
- `screenshots/01-plan-selected.png`
- `screenshots/02-floorplan-options.png`

## Can This Be Rebuilt Into A Modern Prototype?

Yes. The original system can realistically be rebuilt into a usable modern prototype because the frontend exposes the core data model, endpoint paths, query parameters, and expected response shapes.

What is still missing is the historical UpperView dataset: real plan names/IDs, lot geometry, elevation IDs/images, floorplan artwork, structural options, color packages, finishes, pricing, inventory homes, and user/favorite records.
