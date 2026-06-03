# Generated Payload Mappings

Status: generated compatibility layer.

The normalized source of truth is:

- `app/config/upperview-project.config.js`

The serializer is:

- `app/platform/legacy-payload-generator.js`

The generation command is:

```powershell
node scripts\generate-legacy-payloads.js
```

The compatibility test command is:

```powershell
node tests\compatibility.test.js
```

## Route Mapping

| Legacy endpoint | Generated file | Normalized source |
| --- | --- | --- |
| `/homedesigner/getclientdata.php` | `data/generated/homedesigner/getclientdata.generated.xml` | `builder`, `designer`, `workflow.defaultPageOrder` |
| `/db/scripts/php/getcolorlib.php` | `data/generated/db/scripts/php/getcolorlib.generated.xml` | `catalog.vendors`, `catalog.colors` |
| `/db/scripts/php/getsummary.php` | `data/generated/db/scripts/php/getsummary.generated.json` | `communities`, `project` |
| `/db/scripts/php/getnbrhoodsdata.php` | `data/generated/db/scripts/php/getnbrhoodsdata.generated.xml` | `communities`, `builder`, `catalog.palettes`, `catalog.schemes` |
| `/db/scripts/php/getplans.php` | `data/generated/db/scripts/php/getplans.generated.xml` | `catalog.plans`, `catalog.palettes`, `catalog.schemes` |
| `/db/scripts/php/getElevationDetails.php` | `data/generated/db/scripts/php/getElevationDetails.generated.json` | `catalog.plans[].elevations`, `catalog.schemes`, `catalog.palettes`, `catalog.options`, `catalog.floorplanGroups` |
| `/db/scripts/php/getElevationElements.php` | `data/generated/db/scripts/php/getElevationElements.generated.json` | `catalog.plans[].elevations[].elements` |
| `/db/scripts/php/getElevationSchemes.php` | `data/generated/db/scripts/php/getElevationSchemes.generated.json` | `catalog.plans[].elevations[].schemeIds` |
| `/db/scripts/php/getPlanFloorplans.php` | `data/generated/db/scripts/php/getPlanFloorplans.generated.json` | `catalog.options`, `catalog.floorplanGroups` |
| `/db/scripts/php/getelevnbrhoods.php` | `data/generated/db/scripts/php/getelevnbrhoods.generated.json` | `communities` |
| `/db/scripts/php/getinteriors.php` | `data/generated/db/scripts/php/getinteriors.generated.xml` | `communities`, `catalog.interiors` |
| `/api/v1/fp/` | `data/generated/rendering-api/floorplan-uri.generated.txt` | `catalog.rendering.floorplanUri` |

## Compatibility Rules

- `data/generated` is the active route target.
- `data/reconstructed` remains preserved evidence and fallback data.
- The recovered frontend and `homebuilder.min.js` are unchanged.
- The static router reads `HomePlannerConfig.api.routes`, so route targets can be swapped by configuration.
- Generated files include `_status: "generated"` or XML comments marking the config source.

## Current Coverage

The generated layer covers the same app path as the previous reconstructed files:

- client boot data
- color library
- community summary
- community detail
- plan/elevation listing
- elevation detail
- elevation elements
- elevation schemes
- floorplan options
- elevation-neighborhood summary
- empty interiors response
- floorplan rendering URI placeholder

## Remaining Gaps

These are intentionally not solved by Phase 1 Task 1:

- real UpperView historical catalog data
- real lot/siteplan geometry
- real elevation/floorplan artwork
- real option dependencies beyond the sample structural option
- favorites, lead capture, email, CRM, and brochure persistence endpoints

Those should be handled by later roadmap tasks.
