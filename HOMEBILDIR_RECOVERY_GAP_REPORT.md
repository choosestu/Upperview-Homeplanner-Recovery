# HomeBiLDiR Recovery Gap Report

Status: recovery gap analysis only. This document identifies remaining unknown, missing, mocked, or partially recovered capabilities in the recovered HomeBiLDiR / UpperView HomePlanner application. It does not propose new features, architecture, schemas, platform work, or QiBiLDiR recommendations.

Evidence reviewed: `HOMEBILDIR_FUNCTIONAL_INVENTORY.md`, `upperview-homeplanner-local/README.md`, `CURRENT_STATE.md`, `API_CONTRACTS.md`, `ENDPOINT_INVENTORY.md`, `LOT_SITEPLAN_BEHAVIOR.md`, `GENERATED_PAYLOAD_MAPPINGS.md`, `LEGACY_SCHEMA_COVERAGE.md`, `LATE_FLOW_MOCK_ENDPOINTS.md`, `BROKEN_DEPENDENCIES.md`, `RECOVERY_LOG.md`, `RECONSTRUCTED_SAMPLE_CATALOG.md`, `COMPATIBILITY_TEST_SUITE.md`, `HARD_CODED_DEPENDENCIES.md`, active config in `app/config/upperview-project.config.js`, route adapter code, generated payload mappings, and compatibility tests.

## Summary

The recovered app is functional as a local replay, but it is not a complete historical reproduction. The original frontend runtime, shell, endpoint paths, and parser expectations are substantially recovered. The major remaining gap is the original UpperView backend dataset and server-side behavior.

Current local behavior depends on:

- generated compatibility payloads from reconstructed config,
- neutral sample catalog data,
- placeholder media paths,
- local no-op user/session/lead/favorites/brochure mocks,
- stubs for external maps, analytics, and social scripts.

The highest-value recovery target remains original UpperView dynamic PHP responses and associated media. Without those, exact historical plan, elevation, lot, pricing, option, color, interior, inventory, favorites, CRM, and brochure behavior remains partially reconstructed or unknown.

## Scoring

Importance to original functionality:

- Critical: required to reproduce the original buyer experience accurately.
- High: important to major user flows, but app can still demo without exact historical data.
- Medium: useful for fidelity or late-flow behavior.
- Low: optional or peripheral to the main recovered flow.

Probability of recovery:

- High: likely recoverable from existing repository evidence or nearby archived assets.
- Medium: may be recoverable through broader archive/public-source searches.
- Low: unlikely unless private backups, server exports, or vendor records are found.
- Very Low: probably unrecoverable from public archives.

Recommended recovery effort:

- Small: targeted code/doc/archive inspection.
- Medium: focused recovery pass across Wayback/CDX, assets, and runtime traces.
- Large: broad historical data hunt plus validation.
- Preserve Only: document current state and avoid inventing unsupported behavior.

## Critical Backend And Endpoint Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Original `getclientdata.php` response for UpperView | Reconstructed/generated from config; original not recovered. | Critical | Low | Wayback CDX for `upperviewhomeplanner.com/homedesigner/getclientdata.php`, comparable Rendering House captures, recovered JS parser fields. | Large: repeat endpoint-specific CDX searches across all captures and preserve any exact response found. |
| Original `getcolorlib.php` response for UpperView | Reconstructed/generated; comparable responses exist for other clients only. | Critical | Low | Wayback CDX for `db/scripts/php/getcolorlib.php?client=upperview`, comparable Rendering House color libraries, recovered scheme/palette references. | Large: search all timestamp variants and compare against recovered bundle expectations. |
| Original `getsummary.php` response for UpperView | Reconstructed/generated summary with one community and sample filters. | Critical | Low | Wayback CDX for `clientId=1`, archived startup network traces if any, comparable `getsummary.php` captures. | Large: endpoint-specific archive recovery; validate region/location/community IDs if found. |
| Original `getnbrhoodsdata.php` response for Grandview Trail | Reconstructed/generated community, lots, inventory, legend, features. | Critical | Low | Wayback CDX for `nbrhoodIds=1`, public Grandview Trail material, comparable neighborhood XML. | Large: highest-priority data recovery target after plans. |
| Original `getplans.php` response for Grandview Trail | Reconstructed/generated plan catalog with neutral placeholders. | Critical | Low | Wayback CDX for `ids=1`, archived Rendering House client responses, public UpperView marketing pages. | Large: highest-priority catalog recovery target. |
| Original lazy `getElevationDetails.php` response | Generated static JSON includes all reconstructed elevations. | Critical | Low | Wayback CDX with `planId`, `elevId`, `retrievedSchemePals`, comparable lazy JSON captures, runtime parser code. | Large: search by endpoint plus likely plan/elevation IDs if recovered. |
| Original `getElevationElements.php` response | Generated from reconstructed elevation elements. | High | Low | CDX endpoint searches, recovered elevation asset names, comparable responses. | Medium to Large: depends on recovering real elevation IDs/assets first. |
| Original `getElevationSchemes.php` response | Generated union of reconstructed scheme IDs. | High | Low | CDX endpoint searches, scheme IDs from `getplans` or `getElevationDetails`. | Medium: recover after original scheme/elevation IDs are known. |
| Original `getPlanFloorplans.php` response | Generated from reconstructed floorplans/options. | Critical | Low | CDX endpoint searches, rendering API URLs, comparable floorplan JSON. | Large: needed for exact option/floorplan behavior. |
| Original `getelevnbrhoods.php` response | Generated summary; full semantics only partly understood. | Medium | Low | Runtime calls, comparable captures, CDX query with plan/elevation names. | Medium: recover if exact plan/elevation names become known. |
| Original `getinteriors.php` response | Generated empty or placeholder-capable XML; no real rooms/photos. | High | Low | CDX endpoint searches, interior photo paths, comparable interior XML. | Medium: search after plan/model IDs are known. |
| Original Rendering House floorplan render API output | Replaced with placeholder URI text. | Critical | Low | Archived `rendering.house/api/v1/fp/` URLs, recovered generated floorplan paths, browser cache/screenshots. | Large: likely requires archived image assets or vendor records. |

## Catalog And Content Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Real UpperView plan names and IDs | Missing; replaced by `Reconstructed Plan A/B/C`. | Critical | Medium | Public UpperView pages, archived community pages, real-estate listings, original `getplans.php`, screenshots. | Large: search public/archived marketing and listings; only adopt names with evidence. |
| Real plan specifications | Reconstructed bedrooms, baths, square footage, garage, floors. | Critical | Medium | Public floorplan pages, real-estate listings, brochures, archived images, `getplans.php`. | Large: correlate public listings with recovered app IDs only when evidence supports it. |
| Real plan descriptions and marketing copy | Reconstructed or empty. | Medium | Medium | Archived UpperView site pages, brochure PDFs, cached listing descriptions. | Medium: preserve source citations for every recovered copy block. |
| Real plan pricing | Reconstructed sample base prices. | Critical | Low | Original endpoint responses, archived marketing, sale/listing records around 2020. | Large: prices are time-sensitive and should be recovered with timestamp context only. |
| Real plan filter tags/categories | Reconstructed Bedrooms/Home Type/Availability filters. | High | Low | `getsummary.php`, `getplans.php`, runtime filter code, comparable responses. | Medium: recover original filter IDs and labels from backend captures if available. |
| Real plan sort rules and default ordering | Partially reconstructed with `sort="Name"` and `order="asc"`. | Medium | Low | `getnbrhoodsdata.php`, runtime sort functions, screenshots. | Small to Medium: inspect runtime plus any captured summary/community data. |
| Real elevation IDs/names/captions | Reconstructed IDs and simple A/B captions. | Critical | Low | `getplans.php`, `getElevationDetails.php`, image filenames, screenshots. | Large: depends on original catalog or asset discovery. |
| Real elevation artwork and layer assets | Missing; elevation rendering is partial/broken visually. | Critical | Medium | Wayback assets under `app/upperview/`, Cloudinary URLs, rendering.house app assets, browser cache. | Large: broad media CDX search by client dir, plan/elevation IDs, and image extensions. |
| Real elevation thumbnails/exterior photos | Missing or placeholder/empty. | High | Medium | Archived image URLs, public listings, Cloudinary paths, recovered HTML attributes. | Medium to Large: recover assets and map them to exact plans/elevations. |
| Real floorplan artwork | Missing; placeholder floorplan URI used. | Critical | Medium | Rendering API URLs, archived SVG/PNG/JPG assets, public brochures/listings. | Large: recover original image/render outputs and verify dimensions. |
| Real floor numbers/layout variants | Partially reconstructed with sample floorplan groups/options. | High | Low | `getPlanFloorplans.php`, rendering API requests, screenshots. | Large: recover original floorplan JSON or assets. |
| Real structural option catalog | Reconstructed sample options only. | Critical | Low | `getPlanFloorplans.php`, option labels in screenshots, comparable responses. | Large: recover option IDs, names, groups, costs, render order, dependencies. |
| Real option dependency/include/exclude rules | Partially inferred and reconstructed. | Critical | Low | Lazy floorplan JSON, runtime option handling, comparable client data. | Large: recover exact endpoint payloads; avoid guessing business rules. |
| Real option pricing and size deltas | Reconstructed sample values. | High | Low | Original floorplan payloads, pricing docs, brochures. | Large: recover from original backend or sale package only. |
| Real color vendors and finish library | Reconstructed vendors/colors. | High | Low | `getcolorlib.php`, color package screenshots, comparable Rendering House data. | Medium to Large: original color library is likely endpoint-only. |
| Real palettes, schemes, and finish packages | Reconstructed schemes/palettes. | High | Low | `getplans.php`, `getElevationDetails.php`, color library, screenshots. | Large: recover scheme/palette IDs and element mappings before replacing placeholders. |
| Real swatches, overlays, and color layer images | Missing/empty. | High | Medium | Cloudinary/rendering.house assets, endpoint overlay fields, archived images. | Medium to Large: search media paths after IDs/names are known. |
| Real interior room catalog | Missing/empty endpoint support only. | Medium | Low | `getinteriors.php`, interior photo assets, screenshots. | Medium: recover if endpoint captures or photo folders surface. |
| Real standard features and community feature copy | Reconstructed single placeholder feature. | Medium | Medium | Archived UpperView pages, brochures, community pages, `getnbrhoodsdata.php`. | Medium: recover public copy separately from endpoint data. |
| Real agent/contact details | Empty/reconstructed. | Medium | Medium | Archived pages, community sales material, `getnbrhoodsdata.php`. | Small to Medium: recover public details only if historically timestamped. |

## Siteplan, Lot, And Inventory Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Original Grandview Trail siteplan image | Missing. | Critical | Medium | Wayback image searches, public sales collateral, archived PDFs, `siteplan` fields. | Large: search image/PDF assets by Grandview Trail and client dir. |
| Original lot geometry/polygons | Reconstructed rectangular boxes. | Critical | Low | `getnbrhoodsdata.php`, siteplan image maps, JS siteplan parser, screenshots. | Large: likely requires original XML or image-map data. |
| Original lot IDs/numbers | Reconstructed 1-9. | Critical | Medium | Siteplan image/PDF, listings, `getnbrhoodsdata.php`. | Medium to Large: recover and cross-check against inventory/listing addresses. |
| Original lot statuses | Reconstructed available/hold/sold/inventory/model examples. | Critical | Low | Original neighborhood XML, screenshots from 2020, sales/inventory pages. | Large: status was time-dependent; preserve timestamp if recovered. |
| Original lot premiums | Reconstructed sample premiums. | High | Very Low | Original backend, sales package, archived lot release sheets. | Large: likely private or time-sensitive. |
| Original plan-to-lot restrictions | Reconstructed compatibility/restriction fields. | High | Low | Original lot XML, option/siteplan code, sales package lot-fit tables. | Large: recover endpoint data or documented fit matrix. |
| Original lot-to-elevation restrictions | Reconstructed allowed elevation IDs. | High | Low | Original XML, architectural controls, siteplan rules. | Large: recover only with exact source evidence. |
| Original inventory/quick move-in records | Reconstructed 3 examples. | High | Medium | Archived UpperView inventory pages, public real-estate listings, `inventory` XML. | Large: recover records with dates and avoid mixing later sales data. |
| Original model home records | Reconstructed model-home state only. | Medium | Medium | Community pages, address/listing pages, siteplan, sales centre material. | Medium: likely public but must be tied to app behavior carefully. |
| Original MLS IDs and listing photos | Mocked/reconstructed placeholders. | Medium | Medium | Real-estate listing archives, MLS photo endpoint, public listing mirrors. | Medium: recover media only when license/source permits preservation. |
| Original land photos/photo folders | Empty or mocked. | Medium | Low | Cloud inventory photo endpoints, folder names in original XML, archived cloud paths. | Medium: search once original folder names are known. |
| Exact visual siteplan selection behavior | Partially recovered runtime, original artwork/geometry missing. | High | Low | Runtime code, screenshots, original siteplan assets, endpoint XML. | Medium: document code behavior further; full recovery depends on assets/data. |

## Buyer Workflow And UI Behavior Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Exact page order numeric mapping | Partially known from feature constants and `pageOrder`; exact mapping not fully proven. | Medium | High | Runtime constants, `homebuilder.min.js`, screenshots, comparable bundles. | Small: continue static analysis of page transition code. |
| Splash/start behavior | Runtime recovered; exact original button labels/images partly reconstructed. | Medium | Medium | `getclientdata.php`, archived screenshots, client designer flags. | Medium: recover designer flags/assets. |
| Community selection behavior | Partially recovered with one reconstructed community. | Medium | Medium | `getsummary.php`, screenshots, comparable multi-community responses. | Medium: recover original summary or comparable multi-community examples. |
| Location guide map/POI behavior | Partially recovered; maps stubbed, POI data not recovered. | Medium | Low | Runtime locguide code, Google map config fields, archived screenshots. | Medium: static analysis plus archive search for location assets/data. |
| Neighborhood detail screen content | Partially recovered/reconstructed. | Medium | Medium | `getnbrhoodsdata.php`, archived community pages, images. | Medium: recover content/images. |
| Plan catalogue visual state with real data | Partially recovered using reconstructed catalog. | Critical | Medium | Browser screenshots, original `getplans.php`, plan thumbnails. | Medium to Large: verify after data/media recovery. |
| Plan filters exact behavior | Partially recovered; tests validate data relationships, not all UI interactions. | High | Medium | Runtime filter code, browser tests, screenshots, original filter categories. | Medium: trace and test filter combinations against recovered or reconstructed data. |
| Free-text search | Unknown. | Low | Medium | Runtime search strings/functions, UI screenshots. | Small: static search and browser verification. |
| Plan sorting exact behavior | Partially recovered. | Medium | Medium | Runtime sort functions, `sort/order` endpoint fields, screenshots. | Small to Medium: trace code and verify interactions. |
| Deprecated `PLAN` page behavior | Broken/deprecated in current flow; exact historical use unknown. | Low | Low | Older app bundles, page order variants, Wayback screenshots. | Preserve Only unless evidence shows it was used for UpperView. |
| Separate `FLOORPLAN` page behavior | Partially represented through `PLAN_FP`; old behavior unknown. | Low | Low | Older bundles, `hdFeatures.FLOORPLAN`, screenshots. | Preserve Only unless endpoint/screenshots show active use. |
| Decision Guide behavior | Unknown beyond module/shell evidence. | Medium | Low | `anewgo.decisionguide` code, screenshots, designer flags, endpoint references. | Medium: static trace module and search archived screenshots. |
| Mobile/off-canvas behavior | Shell recovered; not recently fully browser-verified. | Medium | High | Browser responsive tests, screenshots, runtime Foundation off-canvas code. | Small: run viewport verification and document observed behavior. |
| Joyride/help behavior | Shell present; display unverified. | Low | Medium | `index.html` joyride markup, runtime init, screenshots. | Small: browser verification only. |
| Error/loading/no-results states | Partially known through runtime strings; not fully exercised. | Medium | Medium | Runtime code, browser tests with empty payload variants. | Medium: create recovery tests with controlled missing/empty payloads. |

## User, Favorites, Lead, Brochure, And Service Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Favorites persistence | Mocked no-op endpoints; no real records. | High | Very Low | Original PHP code/database, browser calls, comparable implementations. | Preserve Only for real data; continue documenting endpoint payloads from runtime. |
| Favorite floorplan option persistence | Mocked. | High | Very Low | Runtime calls, comparable bundles, original PHP/database. | Medium documentation only; full recovery unlikely publicly. |
| Favorite palette/custom scheme persistence | Mocked. | Medium | Very Low | Runtime calls, comparable bundles, original PHP/database. | Medium documentation only. |
| Buyer authentication/session | Mocked unauthenticated or `OK` responses. | Medium | Very Low | Original PHP/session code, comparable implementations. | Preserve Only; do not infer private account behavior. |
| Registration/prospect creation | Mocked `OK`; no real records sent or stored. | Medium | Very Low | Runtime form fields, original PHP/database, CRM docs. | Medium: document field names from runtime; do not create real submissions. |
| Password reset | Mocked; exact behavior unknown. | Low | Very Low | Original PHP code, runtime strings. | Preserve Only. |
| Prospect email lookup | Mocked `exists:false`; exact semantics unknown. | Medium | Very Low | Runtime calls, original PHP/database. | Preserve Only beyond documenting request/response shape. |
| Email inquiry sending | Mocked. | Medium | Very Low | Original PHP, mail templates, runtime payloads. | Preserve Only unless templates are recovered. |
| Registration email sending | Mocked. | Medium | Very Low | Original PHP/mail templates. | Preserve Only. |
| CRM submission | Mocked; CRM config disabled/empty. | Medium | Low | `getclientdata.php` CRM nodes, runtime CRM payloads, Lasso/CRM field names. | Medium: recover config fields and payload shape only, not live behavior. |
| Brochure HTML/PDF generation | Mocked path text; shell exists. | High | Low | Runtime brochure code, original PHP endpoints, brochure screenshots/assets. | Medium to Large: recover templates/assets if archived. |
| Brochure file upload/posting | Mocked. | Medium | Very Low | Original PHP/server file paths. | Preserve Only unless code is recovered. |
| Inventory cloud photo endpoint | Mocked empty list. | Medium | Low | Photo folder fields, Cloudinary paths, archived photo URLs. | Medium: recover photo folder names first. |
| MLS photo endpoint | Mocked empty response. | Low | Very Low | Original PHRETS configuration, MLS IDs, listing archives. | Preserve Only for service behavior; recover public photos separately if permitted. |
| Google Maps/geocoder | Local stub. | Medium | Medium | Runtime map code, archived screenshots, public coordinates. | Small to Medium: document behavior; exact API key/service behavior is not necessary for historical data. |
| Analytics/social scripts | Local stubs. | Low | Medium | `index.html`, runtime social/share code, archived scripts. | Preserve Only unless needed to explain original sharing behavior. |

## Media And Asset Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Plan thumbnail images | Missing/placeholder/empty fields. | High | Medium | Wayback image CDX, `app/upperview/images`, Cloudinary URLs, public listings. | Medium to Large: search by recovered plan names/IDs once known. |
| Exterior elevation base/layer images | Missing. | Critical | Medium | `getElevationDetails` image fields, rendering.house assets, Cloudinary. | Large: asset recovery plus mapping to elevation elements. |
| Palette overlay images | Missing/empty. | High | Low | Palette/scheme endpoint fields, Cloudinary/rendering assets. | Medium: search after scheme/palette IDs are known. |
| Floorplan render images | Placeholder URI. | Critical | Medium | Rendering API output, archived images/PDFs, endpoint floorplan `src` fields. | Large: recover and verify actual floorplan render behavior. |
| Interior photos | Missing. | Medium | Low | `getinteriors.php`, public galleries, archived image folders. | Medium: only after room/model IDs are known. |
| Inventory/gallery photos | Mocked empty endpoints. | Medium | Medium | Public listings, MLS mirrors, cloud photo folder names. | Medium: recover if source permits preservation. |
| Virtual tour/video links | Missing/unknown. | Low | Low | Inventory records, public listings, runtime modal code. | Small to Medium: search only after inventory records are known. |
| Brochure/export assets | Missing/mocked. | Medium | Low | Original PHP templates, generated brochure HTML, screenshots. | Medium: recover template artifacts if archived. |

## Verification And Evidence Gaps

| Gap | Current Status | Importance | Probability | Potential Evidence Sources | Recommended Recovery Effort |
| --- | --- | --- | --- | --- | --- |
| Exhaustive browser verification of every screen | Partial; current docs confirm core loading and data-route tests. | High | High | Playwright/Puppeteer screenshots, local static server, browser console/network logs. | Medium: run screen-by-screen verification and save screenshots. |
| Console/network inventory after late-flow mocks | Partially documented; active routes are covered by tests. | High | High | Browser devtools logs, router mock log, compatibility tests. | Small to Medium: repeat after each recovered-data update. |
| Query-specific endpoint behavior | Static generated files are route-compatible but not query-filtered like PHP. | High | Medium | Runtime calls with parameters, original PHP responses, route logs. | Medium: document observed query params and compare expected filtering once real data exists. |
| Snapshot coverage for full payload contents | Endpoint list is snapshotted; full payloads intentionally are not. | Medium | High | Generated files, serializer output, compatibility tests. | Small: add evidence snapshots only for recovered originals, not evolving reconstructed data. |
| Historical timestamp alignment | Mixed recovered assets span years; exact 2020 backend state missing. | High | Low | Wayback captures by timestamp, archived URLs, public listing dates. | Large: label all recovered records with capture/source dates. |
| Differentiation between comparable Rendering House data and UpperView data | Documented, but easy to confuse during future recovery. | High | High | `data/recovered`, `RECOVERY_LOG.md`, source URLs. | Small: maintain source labels and never promote comparable data to UpperView fact. |

## Endpoint Gap Index

| Endpoint | Gap Type | Current Local Coverage | Remaining Recovery Need |
| --- | --- | --- | --- |
| `/homedesigner/getclientdata.php` | Missing original | Generated/reconstructed XML | Recover original UpperView client/designer flags and CRM/display/brochure metadata. |
| `/db/scripts/php/getcolorlib.php` | Missing original | Generated/reconstructed XML | Recover original vendor/color IDs, names, hex values. |
| `/db/scripts/php/getsummary.php` | Missing original | Generated/reconstructed JSON | Recover original regions, locations, filter categories, counts. |
| `/db/scripts/php/getnbrhoodsdata.php` | Missing original | Generated/reconstructed XML | Recover original community, lots, siteplan, inventory, features, agent data. |
| `/db/scripts/php/getplans.php` | Missing original | Generated/reconstructed XML | Recover original plans, elevations, schemes, palettes, pricing, specs. |
| `/db/scripts/php/getElevationDetails.php` | Missing original | Generated/reconstructed JSON | Recover original elevation details, floorplans, schemes, palettes, media. |
| `/db/scripts/php/getElevationElements.php` | Missing original | Generated/reconstructed JSON | Recover original elevation layer/element data. |
| `/db/scripts/php/getElevationSchemes.php` | Missing original | Generated/reconstructed JSON | Recover original scheme IDs per elevation. |
| `/db/scripts/php/getPlanFloorplans.php` | Missing original | Generated/reconstructed JSON | Recover original floors, groups, options, alternates, dependencies. |
| `/db/scripts/php/getelevnbrhoods.php` | Partially unknown | Generated/reconstructed JSON | Recover exact response semantics and community availability use. |
| `/db/scripts/php/getinteriors.php` | Missing content | Generated empty/placeholder-capable XML | Recover room/photo/selection records. |
| `/api/v1/fp/` | Missing service output | Placeholder URI text | Recover original floorplan render image output or archived assets. |
| `/php/*favorites*` endpoints | Mocked | Local no-op mock | Recover request/response semantics only; real private records likely unrecoverable. |
| `/php/authenMe.php`, `/php/registerMe.php`, `/php/resetMe.php` | Mocked | Local no-op mock | Recover form field semantics and response shapes; avoid private data assumptions. |
| `/php/sendMail.php`, `/php/sendRegMail.php`, `/php/curlCrmSubmission.php` | Mocked | Local no-op mock | Recover payload shape, CRM config, and templates if available. |
| `/php/createBrochureHtml.php`, `/php/postFiles.php`, `/php/postFile.php` | Mocked | Local no-op mock | Recover brochure generation output/template behavior if archived. |
| Inventory/MLS photo endpoints | Mocked | Empty local JSON | Recover photo folder names, MLS IDs, and allowable public media references. |

## Highest Priority Recovery Tasks

These are recovery tasks only, ordered by expected impact on historical completeness:

1. Search Wayback/CDX again for original UpperView dynamic responses, especially `getplans.php`, `getnbrhoodsdata.php`, `getsummary.php`, `getclientdata.php`, and lazy plan endpoints.
2. Search archived and public sources for Grandview Trail plan names, lot/siteplan images, brochures, PDFs, and real-estate listing remnants.
3. Search media paths broadly for `app/upperview/`, Cloudinary, Rendering House image folders, elevation layers, floorplans, thumbnails, and siteplan assets.
4. Trace `homebuilder.min.js` for the Decision Guide, query-specific lazy endpoint behavior, exact page mapping, filters, and siteplan selection side effects.
5. Run browser verification of every recovered screen and save screenshots for observed current behavior.
6. Preserve every new recovered item under `data/recovered/` with source URL, capture date, and status label.
7. Keep all reconstructed and mocked data clearly labeled until exact historical evidence is recovered.

## Do Not Treat As Recovered

The following currently work only because they are reconstructed or mocked:

- reconstructed plans, elevations, lots, inventory, options, schemes, palettes, and prices,
- placeholder floorplan/rendering URI,
- reconstructed lot geometry and restrictions,
- mocked favorites/auth/registration/session behavior,
- mocked lead/email/CRM/brochure behavior,
- mocked inventory and MLS photo endpoints,
- stubbed Google Maps, analytics, and social scripts.

These are useful for local replay and compatibility testing, but they are not historical UpperView production evidence.
