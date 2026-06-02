# Recovery Log

## Summary

- The local page repair used the raw Wayback `id_` capture for the August 3, 2020 page.
- Broad Wayback CDX searches recovered original static assets and comparable Rendering House backend responses for other clients.
- No UpperView-specific dynamic PHP backend responses were recovered.
- The current sample catalog is reconstructed, not historical.

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
- `speculative`: plausible business model or missing table not directly required by the frontend.

