# Recovered UpperView Data Index

Status: recovery evidence index. This document tracks original UpperView / Grandview Trail evidence recovered or checked during the HomeBiLDiR recovery. It does not promote reconstructed data to historical fact.

## Current Result

No new original UpperView HomePlanner backend responses were recovered in the 2026-06-12 evidence pass.

The repository still has:

- recovered UpperView archived HTML/static frontend assets,
- comparable Rendering House backend responses for other clients,
- inferred runtime contracts,
- reconstructed local catalog data,
- mocked late-flow endpoints.

The original UpperView PHP/XML/JSON backend data remains missing.

## Evidence Inventory

| Item | Location / Source | Status Label | Confidence | Notes |
| --- | --- | --- | --- | --- |
| Target Wayback HTML capture | `data/recovered/upperviewhomeplanner.com/20200803093858_upperviewhomeplanner.com_nbrhood=Grandview_20Trail.html` | recovered | High | Original archived page shell for the requested Grandview Trail URL. |
| Other UpperView archived HTML captures | `data/recovered/upperviewhomeplanner.com/` and `.upperviewhomeplanner.com/` | recovered | High | Historical app shell captures from multiple timestamps. |
| UpperView static HomePlanner frontend assets | `data/recovered/upperviewhomeplanner.com_homedesigner/` | recovered | High | Recovered JS/CSS/icon/static assets. |
| Comparable Rendering House backend payloads | `data/recovered/rendering.house_db/` | comparable evidence | Medium | Useful for response shape only; not UpperView data. |
| Comparable Rendering House app bundles | `data/recovered/rendering.house_homedesigner/` | comparable evidence | Medium | Useful for runtime comparison only. |
| Focused CDX search record | `data/recovered/focused-cdx-results.json` | recovered search log | High | Existing focused search log shows no captures for target UpperView PHP endpoints, except one timeout for `*clientId=1*`. |
| Current Upperview Homes Grandview Trail page | `https://www.upperviewhomes.com/communities/grandview-trail-oshawa/` | public corroboration | Medium | Confirms Grandview Trail, Oshawa; completed in 2022; 40 ft single homes; up to 3,200 sq ft. This is not HomePlanner backend data. |
| Current Upperview Homes homepage | `https://www.upperviewhomes.com/` | public corroboration | Medium | Confirms Grandview Trail appears in Upperview community navigation and public marketing copy. |

## Target Backend Searches

Existing `focused-cdx-results.json` records empty results for:

- `upperviewhomeplanner.com/homedesigner/getclientdata.php*`
- `upperviewhomeplanner.com/db/scripts/php/getcolorlib.php*`
- `upperviewhomeplanner.com/db/scripts/php/getsummary.php*`
- `upperviewhomeplanner.com/db/scripts/php/getnbrhoodsdata.php*`
- `upperviewhomeplanner.com/db/scripts/php/getplans.php*`
- `upperviewhomeplanner.com/db/scripts/php/getElevationDetails.php*`
- `upperviewhomeplanner.com/db/scripts/php/getElevationElements.php*`
- `upperviewhomeplanner.com/db/scripts/php/getElevationSchemes.php*`
- `upperviewhomeplanner.com/db/scripts/php/getPlanFloorplans.php*`
- `upperviewhomeplanner.com/db/scripts/php/getelevnbrhoods.php*`
- `upperviewhomeplanner.com/db/scripts/php/getinteriors.php*`
- wildcard searches containing `Grandview`, `UpperView`, `upperview`, `nbrhoodIds=1`, and `ids=1`.

The existing search log also records a timeout for:

- `upperviewhomeplanner.com/*clientId=1*`

## 2026-06-12 Evidence Pass

Attempted direct archive/API recovery from this Codex environment:

- PowerShell request to `https://web.archive.org/cdx?...getplans.php*...` failed with `Unable to connect to the remote server`.
- Node `fetch()` request to the same CDX endpoint failed with `fetch failed`.
- Direct web open attempts for CDX URLs did not return usable content in this environment.
- Search-index queries for the target archived PHP endpoints returned no usable indexed results.

Public web evidence found:

- `https://www.upperviewhomes.com/` confirms Upperview Homes has public community navigation including Grandview Trail.
- `https://www.upperviewhomes.com/communities/grandview-trail-oshawa/` confirms Grandview Trail was an Upperview Homes Oshawa community and gives high-level public marketing facts.

No recovered public source from this pass exposed:

- real HomePlanner plan IDs,
- real elevation IDs,
- real lot IDs or geometry,
- original siteplan image,
- original PHP/XML/JSON endpoint payloads,
- original option/package/color data,
- original inventory records,
- original floorplan/elevation rendering assets.

## Open Recovery Items

The following remain unknown or missing:

- UpperView `getclientdata.php`
- UpperView `getcolorlib.php`
- UpperView `getsummary.php`
- UpperView `getnbrhoodsdata.php`
- UpperView `getplans.php`
- UpperView lazy elevation/floorplan/interior endpoint payloads
- original Grandview Trail lot/siteplan data
- original plan/elevation/option/color/pricing records
- original HomePlanner media assets
- original favorites/session/lead/brochure PHP behavior

## Handling Rule

Only exact UpperView / Grandview Trail HomePlanner captures or original public UpperView assets should be marked `recovered`.

Comparable Rendering House data remains `comparable evidence`.

Current sample catalog data remains `reconstructed`.
