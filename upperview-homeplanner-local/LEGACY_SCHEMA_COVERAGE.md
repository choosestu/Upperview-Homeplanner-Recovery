# Legacy Schema Coverage

Status: inferred and reconstructed. This document tracks Phase 1 Task 2 coverage for legacy fields referenced by the recovered HomePlanner runtime.

The normalized source of truth is `app/config/upperview-project.config.js`. The compatibility serializer is `app/platform/legacy-payload-generator.js`.

## Supported Fields

| Area | Normalized Config | Legacy Output | Status | Notes |
| --- | --- | --- | --- | --- |
| Builder identity | `builder.id`, `name`, `key`, `dir`, `website`, `logo`, `altLogo`, `phone`, `email`, `designApp`, `fbPostUrl` | `<client ...>` | supported | Required startup fields. |
| Builder hierarchy/contact | `builder.parentId`, `selfDir`, `disclaimer`, `contact.firstName`, `contact.lastName`, `contact.email` | `<client parentId selfDir disclaimer contact-fname contact-lname contact-email>` | supported | Optional runtime fields found in the client parser. |
| Designer boot flags | `designer.contentStorage`, `pageOrder`, `bgColor`, `displayIntPhotos`, `displayExtPhotos`, labels, splash flags, brochure flags, metric/filter flags | `<designers ...>` | supported | Values are emitted only when defined in config. |
| CRM boot metadata | `designer.crm` | `<crm ...>` | supported, disabled by default | Emitted only when `designer.crm.enabled` is true. |
| Color library | `catalog.vendors`, `catalog.colors` | `<vendor>`, `<color>` | supported | Recovered runtime requires colors for schemes and palettes. |
| Summary filters | `catalog.filterCats` | `filterCats[]` | supported | Reconstructed filters now cover bedrooms, home type, and availability. |
| Community summary | `communities[]` counts, ranges, region/location overrides | `regiondata[].locations[].nbrhoods[]` | supported | Supports plan/elevation/price/bed/bath/square-foot ranges. |
| Community detail | community identity, captions, address, map coords, CRM id, color method, image/site fields | `<nbrhood ...>` | supported | UpperView values remain reconstructed. |
| Agents/features | `community.agent`, `community.standardFeatures` | `<agent>`, `<stdfeatures>` | supported | Feature content is reconstructed. |
| Siteplan legend | `community.legend` | `<legend><entry ...>` | supported | Shape inferred from runtime and comparable Rendering House data. |
| Lots/homesites | `community.siteplan`, `community.lots` | `<siteplan ...>`, `<lot ...>label</lot>` | supported, inferred/reconstructed | Geometry/status fields, selectable flags, size, premiums, plan/elevation compatibility, restrictions, model flags, inventory links, and availability dates are supported; exact UpperView lot records are missing. |
| Inventory | `community.inventory` | `<inventory ...>` | supported as passthrough/reconstructed | Quick move-in records now include lot, plan, elevation, price/cost, MLS placeholder, address, home style, sqft, available date, and included option ids. Exact historical inventory shape remains unknown. |
| Land photos | `community.landPhotos`, `landPhotoFolder` | `<landphoto ...>`, `landPhotoFolder` | supported as passthrough | Optional inventory/photo path support. |
| Plans | `catalog.plans[]` identity, media, filters, tags, pricing/availability status | `<plan ...>` and JSON `planData` | supported | Names remain neutral reconstructed placeholders; current sample includes 3 plans. |
| Elevations | `plans[].elevations[]` identity, specs, media, schemes, elements, overlays, status | `<elev ...>` and lazy JSON | supported | Layer artwork remains missing; current sample includes all 6 elevations in static lazy payloads. |
| Schemes | `catalog.schemes[]` and `elements[]` | `<scheme>`, lazy JSON `schemes[]` | supported | Supports `m` and overlay-related `n` metadata fields. |
| Palettes | `catalog.palettes[]` and `elements[]` | `<palette>`, lazy JSON `palettes[]` | supported | Supports overlay/swatch metadata. |
| Floorplan option groups | `catalog.floorplanGroups[]` | lazy JSON `groups[]` | supported | Used by plan floorplan flow. |
| Floorplan options | `catalog.options[]` | lazy JSON `opts[]` | supported | Supports dependency, include/exclude, pricing/status, and `fpAlts`. |
| Interiors | `catalog.interiors[]` | `<interiors><room ...>` | supported | Empty by default; room and selection passthrough fields are supported. |
| Rendering URI | `catalog.rendering.floorplanUri` | plain text URI | supported | Uses local placeholder image. |

## Ignored Or Deferred Fields

| Area | Classification | Reason |
| --- | --- | --- |
| Favorites endpoints | reconstruct later | Not required for first visible app flow; should become local no-op adapters in a later task. |
| Registration/auth endpoints | reconstruct later | Runtime hooks are visible, but the local app does not require real accounts. |
| Email/CRM submission endpoints | reconstruct later | Should be no-op/local capture adapters for prototype safety. |
| Brochure/post/share endpoints | reconstruct later | Optional late-flow behavior; needs separate compatibility mock. |
| External MLS/cloud photo endpoints | reconstruct later | Referenced by inventory photo logic, but no original UpperView photo data was recovered. |
| Real Rendering House floorplan image service | replace later | The local prototype keeps a static placeholder URI. |

## Still Unknown

- Original UpperView plan IDs, elevation IDs, option IDs, lot IDs, and color package IDs.
- Original Grandview Trail lot geometry, status codes, premiums, quick move-in inventory, address mappings, MLS values, and plan-to-lot restrictions.
- Original elevation layer image filenames, floorplan image filenames, interior room photos, and exterior photo galleries.
- Exact historical option dependency semantics for every structural option.
- Exact CRM provider configuration and lead-routing answers used by UpperView.
- Complete inventory object shape for every optional quick move-in path.

## Test Coverage

`tests/compatibility.test.js` now verifies:

- Generated files match serializer output.
- Active routes point at `data/generated`.
- Required startup, summary, plan, elevation, floorplan, and rendering URI fields are preserved.
- Optional legacy schema fields serialize correctly when present in a richer test config.
- Generated XML and JSON files are parseable.
- Route targets point to existing files.
- Plan/elevation/scheme/palette/color/option/group/lot/inventory relationships remain internally consistent.
- Lot/siteplan behavior covers available, hold, sold, inventory, model, plan restrictions, selectable flags, and inventory-to-lot links.
- `tests/compatibility-snapshots.json` preserves the expected legacy endpoint list and generated payload file list.
- The reconstructed sample catalog remains rich enough for buyer-flow demos.
