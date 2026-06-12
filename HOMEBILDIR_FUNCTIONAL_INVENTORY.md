# HomeBiLDiR Functional Inventory

Status: recovery inventory only. This document describes the recovered HomeBiLDiR / UpperView HomePlanner application as it exists today. It does not propose new features, schemas, platform architecture, rewrites, or QiBiLDiR product work.

Evidence reviewed: `upperview-homeplanner-local/index.html`, `app/`, `data/`, `db/`, `ext/`, `homedesigner/`, `local-mocks/`, `reconstructed/`, `scripts/`, `tests/`, `vendor/`, active generated payloads, recovered assets, compatibility tests, and recovery documents including `README.md`, `CURRENT_STATE.md`, `API_CONTRACTS.md`, `ENDPOINT_INVENTORY.md`, `LOT_SITEPLAN_BEHAVIOR.md`, `GENERATED_PAYLOAD_MAPPINGS.md`, `HARD_CODED_DEPENDENCIES.md`, `BROKEN_DEPENDENCIES.md`, `RECOVERY_LOG.md`, `REBUILD_PLAN.md`, and `NEXT_STEPS.md`.

## 1. Executive Summary

HomeBiLDiR appears to be a recovered local replay of a legacy Rendering House / HomeBuilder buyer-facing new-home sales application originally configured for UpperView's Grandview Trail community.

Recovered major capabilities:

- Archived HTML shell boots locally and reaches the legacy app UI past `Loading...`.
- Original minified frontend runtime remains active.
- Legacy PHP/AJAX endpoint paths are known and intercepted locally.
- Active responses are generated XML/JSON/text payloads from reconstructed config.
- Current reconstructed demo catalog has 3 plans, 6 elevations, 7 options, 3 schemes, 3 palettes, 9 lots, and 3 quick move-in inventory examples.
- Late-flow favorites, auth/session, registration, email, CRM, brochure, and inventory photo endpoints resolve through local no-op mocks.

Overall recovery status:

- Frontend runtime, UI shell, static assets, endpoint paths, parser expectations, and compatibility tests are substantially recovered.
- Original UpperView dynamic PHP backend and historical catalog data were not recovered.
- Current behavior is partly recovered and partly reconstructed. It should not be mistaken for historical UpperView production data.

## 2. Screen Inventory

Recovered feature constants include `TRIFECTA_SPLASH`, `LEARNMORE`, `NEIGHBORHOODS`, `NBRHOOD`, `LOCGUIDE`, `PLANS`, `PLAN`, `PLAN_FP`, `ELEVATION`, `FLOORPLAN`, `SITEPLAN`, `INTERIORS`, `BROCHURE`, and `DECISIONGUIDE`. Configured page order is `0,1,2,3,12,5,6,8,9`; exact numeric mapping is not fully proven.

| Screen / View | Purpose | Entry Evidence | Current Status |
| --- | --- | --- | --- |
| Loading | Boot/loading state. | `index.html` `.spinner`, `.loading-text`, `anewgo.homedesign.init()`. | Fully recovered shell; app gets past it. |
| Desktop stage | Main app container. | `#tabdeskStage-container`, `#my-stage`. | Fully recovered shell. |
| Mobile stage | Off-canvas mobile shell. | `#mobileStage-container`, `#navarrow-left`, `#navarrow-right`. | Partially recovered; not recently browser-verified. |
| Splash | Welcome/start/login choices. | `anewgo.splash`, `#splashPage`, strings `Find & Design My Home`, `Browse Our Plans`. | Recovered runtime; entry depends on page order/config. |
| Community selection | Select/browse communities. | `anewgo.nbrhoods`, `#nbrhoodsPage-stage`, `Select Your Community`. | Partially recovered/reconstructed; one community. |
| Location guide | Map/POI/community location view. | `anewgo.locguide`, `#locguidePage-stage`, `Location`. | Partially recovered; maps are stubbed. |
| Neighborhood detail | Community info/features/overview. | `anewgo.learnbrhood`, `#nbrhoodPage-stage`, `Overview`, `Standard Features`. | Partially recovered/reconstructed. |
| Plan catalogue | Browse/filter/sort plans and inventory. | `anewgo.plans`, `Refine Your Search`, `SHOW ME`, sort labels. | Partially recovered/reconstructed. |
| Deprecated plan page | Old `PLAN` feature. | `hdFeatures.PLAN`; docs say `PLAN_FP` is used instead. | Broken/deprecated for current flow. |
| Plan/floorplan configuration | Main plan, elevation, floorplan, option, color flow. | `anewgo.planfp`, `#planPage-stage`, `Select Options`, `Select Color Scheme`. | Partially recovered/reconstructed. |
| Elevation rendering | Draw selected elevation/layers. | `anewgo.elevation`, `anewgo.elevcanvas`, `#elevCanvas`. | Partially recovered; real artwork missing. |
| Floorplan rendering | Show/render floors/options. | `#floorplanPage-stage`, `#fpCanvas`, `/api/v1/fp/`. | Partially recovered; placeholder render URI. |
| Siteplan/homesite | View/select lots and lot insets. | `anewgo.siteplan`, `#siteplanPage-stage`, `#siteCanvas`, `SELECT YOUR HOMESITE`. | Partially recovered/reconstructed; original siteplan missing. |
| Inventory detail | Quick move-in home details. | `anewgo.learnplan`, `Quick Move-in`, `MLS#`, `HOMESITE`, `DIRECTIONS`. | Partially recovered/reconstructed; photos/MLS mocked. |
| Interiors | Interior rooms/selections. | `anewgo.interior`, `#interiorPage-stage`, `getinteriors.php`. | Missing/empty; runtime shell exists. |
| Decision guide | Guided decision flow. | `anewgo.decisionguide`, `#decisionguidePage-stage`. | Unknown. |
| Brochure/summary | Generate/share/email buyer summary. | `anewgo.brochure`, `#brochurePage`, `#brochureCanvas`. | Mocked/partially recovered. |
| Favorites modal | View/compare/edit/remove favorites. | `#favModal`, `anewgo.favorites`, favorites strings. | Mocked/partially recovered. |
| Generic modal | Siteplan/photos/video/MLS/enlarged floorplan/alerts. | `#myModal`. | Recovered shell; content depends on missing/mocked media. |
| Photo reveal modal | Photo gallery. | `#photoRevealModal`, `See Photos`, `Virtual Tour`. | Partially recovered; real media missing. |
| Sign-in/register | Buyer login/register/reset. | `anewgo.signin`, `Login Menu`, `Register`. | Mocked. |
| Filter panel | Numeric/tag plan filtering. | `#commonFiltersContainer`, `Refine Your Search`, filter labels. | Partially recovered/reconstructed. |
| Joyride help | Continue-button helper. | `index.html` `joyride-list`. | Recovered shell; display unverified. |

## 3. Buyer Journey Inventory

| Step | User Action | Result | Dependencies | Current Status |
| --- | --- | --- | --- | --- |
| 1 | Open `index.html?nbrhood=Grandview%20Trail`. | App boots locally. | HTML, CSS/JS, stubs, startup endpoints. | Fully recovered shell. |
| 2 | Runtime reads builder/community config. | UpperView / Grandview Trail stage config is applied. | `config-bootstrap.js`, `HomePlannerConfig`. | Reconstructed/working. |
| 3 | Start workflow. | Splash/community/plan flow begins. | `pageOrder`, `homebuilder.min.js`. | Partially recovered; exact mapping partly unknown. |
| 4 | View/select community. | Grandview Trail is loaded/selected. | `getsummary`, `getnbrhoodsdata`. | Partially recovered/reconstructed. |
| 5 | Browse plans. | Plan tiles/list can show reconstructed plans/inventory. | `getplans`, lazy plan/elevation data. | Partially recovered/reconstructed. |
| 6 | Filter/sort plans. | Runtime supports range/tag filters and sorting. | Plan metadata and filter categories. | Partially recovered; UI interactions not exhaustively verified. |
| 7 | Select plan/elevation. | Selected elevation and pricing/floorplan view update. | Plan/elevation records. | Partially recovered/reconstructed. |
| 8 | Change elevation. | Alternate elevations can be selected. | Elevation detail payloads. | Partially recovered; real art missing. |
| 9 | View floorplans. | Placeholder floorplans display. | Floorplan payloads and render URI. | Partially recovered/reconstructed. |
| 10 | Select options. | Option state toggles and floorplan render updates. | Reconstructed options/groups. | Partially recovered/reconstructed. |
| 11 | Select colors/schemes. | Scheme/palette UI can show reconstructed choices. | Color library, schemes, palettes. | Partially recovered/reconstructed. |
| 12 | View lots/siteplan. | Lot records/statuses/premiums can load. | Reconstructed lots/siteplan XML. | Partially recovered/reconstructed. |
| 13 | View quick move-in inventory. | Inventory detail can show address/status/price/lot links. | Reconstructed inventory records. | Partially recovered/reconstructed. |
| 14 | View photos/video/MLS. | Modal paths exist. | Media fields/endpoints. | Mostly missing/mocked. |
| 15 | Add/view favorites. | Frontend can call favorite endpoints. | Favorites runtime and mocks. | Mocked. |
| 16 | Register/sign in/reset. | Frontend can call user/session endpoints. | Sign-in runtime and mocks. | Mocked. |
| 17 | Send inquiry/CRM/email. | Calls resolve without external sending. | Mail/CRM mocks. | Mocked. |
| 18 | Generate/share brochure. | Calls resolve without real PHP backend. | Brochure runtime and mocks. | Mocked/partially recovered. |

## 4. Site Plan Functionality

Evidence:

- `hdFeatures.SITEPLAN`, `anewgo.siteplan`, `#siteplanPage-stage`, `#siteCanvas`, `#lotCanvas`, `#tmpLotCanvas`, and inventory lot canvases appear in the recovered runtime/shell.
- UI strings include `SELECT YOUR HOMESITE:`, `Select a lot`, `View Siteplan`, `Lot`, `Lot Premium`, and `HOMESITE`.
- `LOT_SITEPLAN_BEHAVIOR.md` documents runtime references to `getSelectedLot()`, `getLot(lotId)`, `getStatus()`, `getLandId()`, `getName()`, `getLandMls()`, `getSize()`, `getCost()`, `getLandPhotos()`, and `anewgo.siteplan.viewInModal(...)`.
- Generated `getnbrhoodsdata.generated.xml` includes `<siteplan>`, `<legend>`, 9 `<lot>` records, and 3 `<inventory>` records.
- Tests assert siteplan metadata exists, lots reference valid plans/elevations, status states include available/inventory/hold/sold/model, sold/hold lots are not selectable, and inventory records link to inventory lots.

Lot interactions:

- Lot records include IDs, names, geometry boxes, status labels, selectable/available flags, premiums, plan/elevation IDs, compatibility fields, restrictions, inventory IDs, model flags, availability dates, and home style.
- Inventory homes link back to lots through `lotId`.
- Runtime supports selected lot state and favorites/brochure flows can reference lot selections.

Availability behavior:

- Current reconstructed states: `available`, `hold`, `sold`, `inventory`, `model`.
- `hold` and `sold` lots are non-selectable in the reconstructed data.
- `inventory` lots link to quick move-in records.
- `model` lot links to a fixed plan/elevation.

Filtering:

- Broad home-type and plan filtering exists.
- Lot compatibility/restriction data exists and is tested for consistency.
- Exact original lot filtering business rules remain Unknown.

Mapping behavior:

- Runtime contains Google Maps/geocoder/marker behavior for community/location maps.
- Local Google Maps is stubbed.
- Original siteplan image, polygons, and lot geometry were not recovered.

Selection behavior:

- Lot state is supported by the runtime.
- Exact original visual lot selection behavior is partially missing because original siteplan assets are missing.

## 5. Plan Catalogue Functionality

Evidence:

- `anewgo.plans` exists in `homebuilder.min.js`.
- UI strings include `Refine Your Search`, `SHOW ME`, `All Homes`, `Quick Move-in`, `Design Your Own`, and sort labels.
- Current config has 3 reconstructed plans, 6 elevations, 3 schemes, 3 palettes, 7 options, 2 floorplan groups.
- Tests validate plan/elevation/scheme/palette/color/option relationships.

Plan browsing:

- Runtime builds plan/inventory tiles from plan/elevation groups.
- Current browsing is against reconstructed data.

Filtering:

- Runtime supports floors, sqft, bedrooms, bathrooms, cars, price, home type, and tag categories.
- Current reconstructed categories are Bedrooms, Home Type, and Availability.

Search:

- No confirmed free-text search evidence was found. Status: Unknown.

Elevations:

- Current reconstructed catalog has 2 elevations per plan.
- Runtime supports alternate elevation selection.
- Original elevation names/artwork/layers are missing.

Pricing displays:

- Runtime supports base price, estimated total, lot premium, option costs, and call-for-pricing states.
- Current prices are reconstructed. Exact original calculations are Unknown.

Configuration behavior:

- Runtime supports floorplan options, option dependencies/alternates, scheme/palette selection, custom scheme/favorite calls, and floorplan/elevation render updates.
- Current behavior uses reconstructed data and placeholder media.

## 6. API Dependency Inventory

Legend: Real means original UpperView response/implementation recovered. Mocked means intercepted no-op. Broken means original behavior cannot run locally. Unknown means full semantics are not proven. Generated/Reconstructed means active local compatibility response, not original production data.

| Endpoint / Path | Purpose | Current Status | Real | Mocked | Broken | Unknown |
| --- | --- | --- | --- | --- | --- | --- |
| `/homedesigner/getclientdata.php` | Client/designer boot config. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getcolorlib.php` | Vendors/colors. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getsummary.php` | Region/location/community summary. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getnbrhoodsdata.php` | Community detail, lots, inventory. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getplans.php` | Plans/elevations/palettes/schemes. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getElevationDetails.php` | Lazy elevation/floorplan/scheme detail. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getElevationElements.php` | Elevation elements/layers. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getElevationSchemes.php` | Valid elevation schemes. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getPlanFloorplans.php` | Floorplans/options/groups. | Generated/Reconstructed | No | No | No | Partial |
| `/db/scripts/php/getelevnbrhoods.php` | Elevation/neighborhood availability summary. | Generated/Reconstructed | No | No | No | Yes |
| `/db/scripts/php/getinteriors.php` | Interior rooms/selections. | Generated empty response | No | No | Partial | Partial |
| `/api/v1/fp/` | Rendering House floorplan URI. | Placeholder text URI | No | No | Partial | Partial |
| `/php/getfavs.php` | Load favorites. | Mocked empty response | No | Yes | No | Partial |
| `/php/uploadDeviceFavs.php` | Sync local device favorites. | Mocked | No | Yes | No | Partial |
| `/php/addfav.php` | Add favorite. | Mocked `OK` | No | Yes | No | Partial |
| `/php/updfav.php` | Update favorite. | Mocked `OK` | No | Yes | No | Partial |
| `/php/delfav.php` | Delete favorite. | Mocked `OK` | No | Yes | No | Partial |
| `/php/addfavfpopt.php` | Add favorite floorplan option. | Mocked `OK` | No | Yes | No | Partial |
| `/php/delfavfpopt.php` | Remove favorite floorplan option. | Mocked `OK` | No | Yes | No | Partial |
| `/php/updfavfp.php` | Update favorite floorplan state. | Mocked `OK` | No | Yes | No | Partial |
| `/php/addfavpalsel.php` | Save palette selection. | Mocked `OK` | No | Yes | No | Partial |
| `/php/addcustomscheme.php` | Save custom scheme. | Mocked `OK` | No | Yes | No | Partial |
| `/php/getfavfp.php` | Load favorite floorplans. | Mocked empty JSON | No | Yes | No | Partial |
| `/php/getfavfpopts.php` | Load favorite options. | Mocked empty JSON | No | Yes | No | Partial |
| `/php/getfavpalsel.php` | Load favorite palette selections. | Mocked empty JSON | No | Yes | No | Partial |
| `/php/getfavcustomscheme.php` | Load favorite custom schemes. | Mocked empty JSON | No | Yes | No | Partial |
| `/php/authenMe.php` | Authenticate buyer. | Mocked unauthenticated JSON | No | Yes | No | Partial |
| `/php/registerMe.php` | Register buyer/lead. | Mocked `OK` | No | Yes | No | Partial |
| `/php/resetMe.php` | Password reset. | Mocked `OK` | No | Yes | No | Yes |
| `/php/findProspectEmail.php` | Check prospect email. | Mocked `exists:false` | No | Yes | No | Partial |
| `/php/sendMail.php` | Send inquiry email. | Mocked `OK` | No | Yes | No | Partial |
| `/php/sendRegMail.php` | Send registration email. | Mocked `OK` | No | Yes | No | Partial |
| `/php/curlCrmSubmission.php` | CRM lead submission. | Mocked `OK` | No | Yes | No | Partial |
| `/php/createBrochureHtml.php` | Create brochure/share file. | Mocked path text | No | Yes | No | Partial |
| `/php/postFiles.php` | Upload generated brochure files. | Mocked `OK` | No | Yes | No | Partial |
| `/php/postFile.php` | Upload generated single file. | Mocked `OK` | No | Yes | No | Partial |
| `/php/getCloudInventoryPhotoFileNames.php` | Load inventory cloud photos. | Mocked empty list | No | Yes | No | Partial |
| `/php/mls/mls.photos.phrets.php` | Load MLS photos. | Mocked empty success | No | Yes | No | Partial |
| `/src/idash/dist/php/getCloudInventoryPhotoFileNames.php` | Alternate inventory photo path. | Mocked empty list | No | Yes | No | Partial |
| `/src/idash/dist/php/mls/mls.photos.phrets.php` | Alternate MLS photo path. | Mocked empty success | No | Yes | No | Partial |
| Google Analytics | Analytics loader. | Local stub | No | Yes | No | No |
| Facebook SDK | Social/auth/share loader. | Local stub | No | Yes | No | Partial |
| Google Maps API | Map/geocoder/markers. | Local stub | No | Yes | Partial | Partial |
| Google Plus / Pinterest | Social loaders. | Local stubs | No | Yes | No | Partial |
| Cloudinary equal-housing logo | External logo asset. | Local replacement image | No | No | No | No |

No original UpperView dynamic PHP endpoint is fully recovered. Comparable Rendering House responses for other clients exist only as schema evidence.

## 7. Configuration Inventory

Configurable items currently present:

- Builder/client identity, website, directory, analytics ID, Facebook app ID.
- Project/community target: Grandview Trail, Oshawa, ON.
- Designer flags: page order, content storage, labels, display/filter flags, splash fields, CRM boot metadata.
- Community data: location, pricing flag, sort/order, lot type, counts/ranges, siteplan metadata, legend, lots, inventory, agent, standard features.
- Catalog data: vendors, colors, filter categories, palettes, schemes, plans, elevations, color packages, options, floorplan groups, interiors, rendering URI.
- Buyer workflow keys: selected community, plan, elevation, scheme, floorplan options, lot, lead profile, favorites.
- Route map: 12 generated runtime routes and 28 mocked late-flow routes.

Hard-coded items still present:

- Fallback UpperView/Grandview Trail stage attributes in `index.html`.
- Static DOM shell and script order in `index.html`.
- Legacy runtime paths and Rendering House URL patterns inside `homebuilder.min.js`.
- Legacy PHP endpoint names.
- Social/auth script scaffolding.
- Reconstructed placeholder IDs and asset paths.

Recovery work completed:

- Wayback wrapper removed.
- Required static assets downloaded/substituted.
- Analytics/social/map scripts stubbed.
- Static route adapter added.
- Generated payload layer added.
- Compatibility tests added.
- Reconstructed catalog expanded.
- Late-flow mocks added.
- Lot/siteplan and availability behavior reconstructed at data/contract level.

## 8. Recovery Coverage Assessment

Fully recovered:

- Static HTML shell boot structure.
- Core minified frontend runtime and supporting static/vendor assets.
- Legacy endpoint path inventory.
- Local route interception.
- Basic startup past `Loading...`.

Partially recovered:

- Community loading/selection.
- Plan catalogue browsing/filtering/sorting.
- Plan/elevation/floorplan/options flow.
- Color scheme/palette flow.
- Lot/siteplan/inventory flow.
- Brochure/favorites/sign-in/lead frontend flows.

Mocked:

- Analytics/social/map third-party scripts.
- Favorites persistence.
- Authentication, registration, password reset.
- Email, CRM, lead capture.
- Brochure HTML/file posting.
- Inventory cloud photo and MLS photo retrieval.

Missing:

- Original UpperView PHP backend.
- Original UpperView dynamic endpoint responses.
- Real plan/elevation/lot/option/color/pricing data.
- Real siteplan image/geometry.
- Real elevation/floorplan/interior/inventory media.
- Real persisted buyer/session/favorites/lead/brochure data.

Unknown:

- Exact historical page order behavior.
- Exact Decision Guide behavior.
- Exact lot filtering/compatibility rules.
- Exact option dependency/pricing/package logic.
- Exact CRM provider configuration and lead routing.
- Exact brochure output format and side effects.
- Exact behavior of old/deprecated `PLAN` and `FLOORPLAN` pages.

## 9. Functional Status Matrix

| Feature | Status | Confidence |
| --- | --- | --- |
| Local archived shell loads | Fully Recovered | High |
| Wayback wrapper/popup removal | Fully Recovered | High |
| Original frontend bundle preserved | Fully Recovered | High |
| Config bootstrap | Partially Recovered | High |
| Static route interception | Fully Recovered | High |
| Generated legacy payloads | Partially Recovered | High |
| Client/designer boot data | Partially Recovered | High |
| Color library | Partially Recovered | High |
| Community summary/detail | Partially Recovered | High |
| Community map/geocoder | Mocked | Medium |
| Community selection UI | Partially Recovered | Medium |
| Location guide | Partially Recovered | Low |
| Neighborhood detail | Partially Recovered | Medium |
| Plan catalogue | Partially Recovered | High |
| Plan filters | Partially Recovered | Medium |
| Free-text plan search | Unknown | Low |
| Plan sorting | Partially Recovered | Medium |
| Elevation selection | Partially Recovered | High |
| Elevation visual rendering | Broken | Medium |
| Floorplan display | Partially Recovered | High |
| Rendering House floorplan service | Broken | High |
| Floorplan options | Partially Recovered | High |
| Option dependency behavior | Partially Recovered | Medium |
| Color schemes/palettes | Partially Recovered | High |
| Custom color persistence | Mocked | Medium |
| Lot/siteplan data loading | Partially Recovered | High |
| Original siteplan visual interaction | Missing | High |
| Lot availability states | Partially Recovered | High |
| Plan-to-lot restrictions | Partially Recovered | Medium |
| Quick move-in/inventory detail | Partially Recovered | High |
| Inventory photos/MLS photos | Mocked | High |
| Interior rooms | Missing | High |
| Photo gallery modal | Partially Recovered | Medium |
| Video/virtual tour modal | Missing | Medium |
| Favorites UI | Partially Recovered | Medium |
| Favorites persistence | Mocked | High |
| Sign-in/auth | Mocked | High |
| Registration | Mocked | High |
| Email inquiry | Mocked | High |
| CRM submission | Mocked | High |
| Brochure generation/sharing | Mocked | Medium |
| Decision guide | Unknown | Low |
| Mobile/off-canvas shell | Partially Recovered | Medium |
| Compatibility tests | Fully Recovered | High |
| Historical UpperView backend data | Missing | High |

## 10. Recommended Recovery Priorities

Recovery tasks only:

1. Recover original UpperView dynamic PHP responses for `clientId=1`, `nbrhoodIds=1`, and `ids=1`.
2. Recover original media assets: elevation layers, thumbnails, exterior photos, floorplans, siteplan image, inventory photos, interior photos, and brochure assets.
3. Recover original Grandview Trail lot/siteplan data: lot IDs, geometry, statuses, premiums, restrictions, availability, and inventory assignments.
4. Recover original plan/elevation catalog: names, IDs, captions, specs, descriptions, prices, and community availability.
5. Recover original floorplan/options data: floorplans, option IDs/names, dependencies, include/exclude rules, pricing, size deltas, render order, and alternates.
6. Recover original color/finish package data: vendors, colors, palettes, schemes, materials, swatches, overlays, and selection rules.
7. Recover or further document interior-room behavior from original `getinteriors.php` responses or runtime evidence.
8. Recover or document Decision Guide behavior: entry conditions, required data, UI states, and endpoint dependencies.
9. Verify recovered UI flows with browser screenshots after recovered-data changes.
10. Preserve additional comparable Rendering House responses only as schema evidence.
11. Keep reconstructed and mocked data clearly labeled so placeholders are not mistaken for historical UpperView records.
