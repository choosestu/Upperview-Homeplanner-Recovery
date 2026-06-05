# Current State

Status: practical technical snapshot of the recovered UpperView HomePlanner prototype as of the current working tree.

## What Works Right Now

The local prototype loads the archived UpperView HomePlanner page without the Wayback wrapper, without the Wayback JavaScript/license popup, and past the original `Loading...` screen into the Grandview Trail HomePlanner UI.

The recovered legacy frontend is still the active runtime. The UI has not been redesigned, and the legacy engine has not been replaced. Missing backend responses are supplied through a static compatibility layer generated from normalized project config.

The current local app can demonstrate:

- Grandview Trail startup and client/community loading.
- Plan list loading with 3 reconstructed plans.
- Elevation loading with 6 reconstructed elevations.
- Plan/elevation selection.
- Floorplan/options flow using reconstructed options.
- Color scheme/palette flow using reconstructed color data.
- Lot/siteplan data loading with 9 reconstructed homesites.
- Availability states for available, hold, sold, inventory, and model lots.
- Quick move-in/inventory examples linked to lots, plans, and elevations.
- Late-flow user/session/favorite/lead/brochure calls without external network submission.

## Confirmed Recovered

These pieces come from the archived frontend and local repair work:

- Original archived HTML shell, with Wayback replay scripts removed.
- Original downloaded JavaScript/CSS/assets required for local runtime boot.
- Legacy frontend behavior and data expectations from the recovered JavaScript.
- Legacy endpoint paths referenced by the runtime.
- Legacy response shapes inferred from frontend parsers and comparable recovered data.
- Original app page order and major buyer-flow concepts: community, plan/elevation, floorplan options, color schemes, lots/siteplan, inventory, favorites, registration/lead/brochure hooks.
- Runtime references for lot behavior, including selected lot, lot status, legend lookup, lot MLS/size/cost, inventory `lotId`, homesite modal, and directions link behavior.
- The local static routing layer successfully intercepts and rewrites legacy backend requests.

## Inferred

These are inferred from the frontend code and endpoint usage, not recovered from UpperView server data:

- Required XML/JSON field sets for legacy endpoints.
- Entity relationships between clients, neighborhoods, plans, elevations, schemes, palettes, options, lots, inventory, favorites, and lead/session state.
- Lot/siteplan behavior: lot status lookup, status legend meaning, inventory-to-lot linkage, model/quick move-in treatment, plan-to-lot restrictions.
- Original PHP endpoint intent for favorites, lead capture, registration, email, CRM, brochure generation, MLS photos, and cloud inventory photo lookups.
- Normalized config schema needed to generate route-compatible legacy payloads.

## Reconstructed

These are intentionally neutral local sample records. They are not historical UpperView data:

- 3 reconstructed plans.
- 6 reconstructed elevations.
- Multiple reconstructed color schemes and palettes.
- Reconstructed color library/vendor records.
- Reconstructed floorplan option groups and options.
- Reconstructed placeholder floorplan image URI.
- 9 reconstructed homesites with geometry, premiums, status, selectable flags, plan compatibility, restricted plans, allowed elevations, model/inventory flags, and availability dates.
- 3 reconstructed quick move-in inventory homes.
- Reconstructed community summary counts and filter categories.
- Reconstructed standard features and agent shell data.
- Generated legacy XML/JSON/text payloads under `data/generated/`.

## Mocked

These routes are local no-op mocks. They do not send external requests and should not be treated as real integrations:

- Favorites: get/add/update/delete favorites, favorite floorplan/options/palette/custom scheme calls.
- User/session: authentication, registration, password reset, prospect email lookup.
- Lead/email/CRM: mail, registration mail, CRM submission.
- Brochure/share: brochure HTML creation and file post endpoints.
- Inventory media: cloud inventory photo file lookup and MLS photo endpoints.

Mock submissions may be logged in-memory by the local router for debugging, but no real user data should be collected or transmitted.

## Still Missing

The historical UpperView backend data was not recovered. Missing items include:

- Real UpperView plan names, plan IDs, elevation IDs, and option IDs.
- Real Grandview Trail lots, siteplan image, lot geometry, lot premiums, restrictions, holds, sold state, and availability data.
- Real inventory/quick move-in homes, MLS IDs, addresses, inventory photos, and listing data.
- Real elevation artwork, image layers, exterior photos, interior photos, and floorplan artwork.
- Real color package/finish library and vendor selections.
- Real structural option catalog, dependency rules, pricing, and availability.
- Real CRM configuration, lead routing, registration/session data, favorites, saved homes, and brochure output.
- Original PHP application/database code.

## Operational Buyer Flow

Currently operational enough for local prototype testing:

1. Load `index.html?nbrhood=Grandview%20Trail`.
2. Boot client/designer config from generated XML.
3. Load summary/community data.
4. Load plans and elevations.
5. Select a reconstructed plan/elevation.
6. View reconstructed floorplan/options data.
7. View reconstructed color scheme/palette data.
8. Load reconstructed lot/siteplan/inventory data.
9. Exercise quick move-in/model/sold/hold/available availability states at the data layer.
10. Trigger late-flow calls safely through local mocks.

Not fully proven as historical behavior:

- Exact original visual siteplan interaction, because original siteplan artwork and lot geometry were not recovered.
- Exact option dependency semantics.
- Exact brochure/favorites/lead side effects.
- Exact pricing calculations beyond reconstructed sample values.

## Covered Routes And Endpoints

Generated active catalog/runtime routes:

- `/homedesigner/getclientdata.php`
- `/db/scripts/php/getcolorlib.php`
- `/db/scripts/php/getsummary.php`
- `/db/scripts/php/getnbrhoodsdata.php`
- `/db/scripts/php/getplans.php`
- `/db/scripts/php/getElevationDetails.php`
- `/db/scripts/php/getElevationElements.php`
- `/db/scripts/php/getElevationSchemes.php`
- `/db/scripts/php/getPlanFloorplans.php`
- `/db/scripts/php/getelevnbrhoods.php`
- `/db/scripts/php/getinteriors.php`
- `/api/v1/fp/`

Mocked late-flow routes:

- `/php/getfavs.php`
- `/php/uploadDeviceFavs.php`
- `/php/addfav.php`
- `/php/updfav.php`
- `/php/delfav.php`
- `/php/addfavfpopt.php`
- `/php/delfavfpopt.php`
- `/php/updfavfp.php`
- `/php/addfavpalsel.php`
- `/php/addcustomscheme.php`
- `/php/getfavfp.php`
- `/php/getfavfpopts.php`
- `/php/getfavpalsel.php`
- `/php/getfavcustomscheme.php`
- `/php/authenMe.php`
- `/php/registerMe.php`
- `/php/resetMe.php`
- `/php/findProspectEmail.php`
- `/php/sendMail.php`
- `/php/sendRegMail.php`
- `/php/curlCrmSubmission.php`
- `/php/createBrochureHtml.php`
- `/php/postFiles.php`
- `/php/postFile.php`
- `/php/getCloudInventoryPhotoFileNames.php`
- `/php/mls/mls.photos.phrets.php`
- `/src/idash/dist/php/getCloudInventoryPhotoFileNames.php`
- `/src/idash/dist/php/mls/mls.photos.phrets.php`

Current route coverage:

- 40 active routes total.
- 12 generated data/runtime routes.
- 28 local no-op mocked late-flow routes.

## Tests That Exist

Primary test file:

- `tests/compatibility.test.js`

The suite currently verifies:

- Generated payload file list is stable.
- Generated files match serializer output.
- All generated endpoint files exist.
- Route manifest remains compatible.
- Mock endpoints resolve without external network.
- XML payloads are well-formed enough for jQuery traversal.
- JSON payloads parse.
- Client boot XML required fields.
- Color library vendor/color relationships.
- Summary JSON region/location/community shape.
- Neighborhood XML required fields.
- Lot/siteplan required fields and valid plan/elevation references.
- Lot status coverage: available, inventory, hold, sold, model.
- Inventory-to-lot, lot-to-plan, and lot-to-elevation relationships.
- Plan/elevation/scheme/palette/color relationships.
- Lazy elevation JSON structures.
- Floorplan option/group/dependency relationships.
- Interiors and rendering URI endpoints.
- Expanded schema serialization for optional legacy fields.

Recent verification commands:

```powershell
node scripts\generate-legacy-payloads.js
node tests\compatibility.test.js
```

Additional local route verification confirmed all 12 generated routes resolve through a temporary static server and that the generated neighborhood payload contains 9 lots and 3 inventory homes.

## What Should Not Be Built Yet

Do not build modern product features until the legacy compatibility layer is stable and the historical/reconstructed boundary remains clear.

Specifically, do not build yet:

- A redesigned UI.
- A replacement frontend runtime.
- A modern GIS/map/siteplan system.
- Real CRM/email/lead submission.
- Real account registration or authentication.
- Real favorites persistence tied to personal data.
- Real MLS/photo scraping or third-party listing integrations.
- Real pricing/quote/contract workflows.
- A production database schema migration.
- Builder admin screens.
- Marketing/landing-page features.
- Payment, reservation, deposit, or legal agreement flows.

The next useful work should stay focused on compatibility, documentation, data recovery, asset normalization, and clean separation between reusable QiBiLDiR platform logic and project-specific reconstructed UpperView sample data.
