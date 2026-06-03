# Late-Flow Mock Endpoints

Status: mocked local no-op behavior. No real user data is sent or persisted.

The recovered HomePlanner runtime references several user/session endpoints after the initial plan/elevation flow. The original PHP implementations were not recovered. These local mocks prevent late-flow failures while preserving the old frontend's expected success paths.

## Safety Rules

- No external requests are sent.
- No real accounts, emails, CRM records, brochures, or favorites are created.
- Mock submissions are logged only in memory at `window.HomePlannerPlatform.mockLog`.
- Reloading the page clears the mock log.
- Mock route responses are defined in `HomePlannerConfig.api.routes`.
- The browser-side adapter is implemented in `app/platform/static-api-router.js`.

## Endpoint Behavior

| Endpoint | Purpose | Expected Payload Shape | Mock Response | Behavior Status |
| --- | --- | --- | --- | --- |
| `/php/getfavs.php` | Load saved favorites for a prospect/device. | `clientId`, `prospectId`, session/device identity. | JSON `{ status, ok, data: [], favorites: [] }` | inferred, mocked |
| `/php/uploadDeviceFavs.php` | Sync local device favorites after registration/sign-in. | `maxFavorites`, `clientId`, `prospectId`, `localFavorites`. | JSON `{ status, ok, data: [] }` | inferred, mocked |
| `/php/addfav.php` | Save selected home/elevation/scheme/lot as favorite. | client, prospect, neighborhood, plan, elevation, scheme, lot fields. | Text containing `OK`. | inferred, mocked |
| `/php/updfav.php` | Update favorite selections. | favorite id plus selected plan/elevation/options/scheme/lot fields. | Text containing `OK`. | inferred, mocked |
| `/php/delfav.php` | Delete favorite. | favorite id or selection identity. | Text containing `OK`. | inferred, mocked |
| `/php/addfavfpopt.php` | Add selected floorplan option to favorite. | `clientId`, `prospectId`, `nbrhoodId`, `planId`, `elevId`, `fpNum`, `fpoptId`. | Text containing `OK`. | recovered reference, mocked |
| `/php/delfavfpopt.php` | Remove selected floorplan option from favorite. | Same floorplan option identity fields. | Text containing `OK`. | recovered reference, mocked |
| `/php/updfavfp.php` | Update favorite floorplan state in older recovered bundles. | favorite/floorplan option fields. | Text containing `OK`. | recovered reference, mocked |
| `/php/addfavpalsel.php` | Save palette/color selection to favorite. | palette/selection identity fields. | Text containing `OK`. | inferred, mocked |
| `/php/addcustomscheme.php` | Save customized scheme element color. | `clientId`, `prospectId`, `nbrhoodId`, `planId`, `elevId`, `schemeId`, `elementId`, `colorId`, `palSelId`. | Text containing `OK`. | recovered reference, mocked |
| `/php/getfavfp.php` | Load favorite floorplan data in older bundles. | favorite/prospect identity. | JSON `{ status, ok, data: [] }`. | recovered reference, mocked |
| `/php/getfavfpopts.php` | Load favorite floorplan options in older bundles. | favorite/prospect identity. | JSON `{ status, ok, data: [] }`. | recovered reference, mocked |
| `/php/getfavpalsel.php` | Load favorite palette selections in older bundles. | favorite/prospect identity. | JSON `{ status, ok, data: [] }`. | recovered reference, mocked |
| `/php/getfavcustomscheme.php` | Load favorite custom scheme selections in older bundles. | favorite/prospect identity. | JSON `{ status, ok, data: [] }`. | recovered reference, mocked |
| `/php/authenMe.php` | Authenticate a buyer account. | provider and credential/account fields. | JSON with `authenticated: false`, no user. | inferred, mocked |
| `/php/registerMe.php` | Register buyer/lead. | `clientId`, `fname`, `lname`, `email`, `phone`, `inquiry`, `passwd`, `srcip`, `provider`, `subscribe`, `sentToCrm`. | Text containing `OK`. | recovered reference, mocked |
| `/php/resetMe.php` | Password reset flow. | email/account fields. | Text containing `OK`. | inferred, mocked |
| `/php/findProspectEmail.php` | Check email availability/existing prospect. | email. | JSON `{ exists: false, data: [] }`. | inferred, mocked |
| `/php/sendMail.php` | Send inquiry email to agent/builder. | agent/customer/message fields. | Text containing `OK`. | inferred, mocked |
| `/php/sendRegMail.php` | Send registration inquiry email. | registration inquiry fields. | Text containing `OK`. | inferred, mocked |
| `/php/curlCrmSubmission.php` | Submit lead fields to CRM. | CRM question fields and configured IDs. | Text containing `OK`. | inferred, mocked |
| `/php/createBrochureHtml.php` | Create shareable brochure HTML/PDF path. | `title`, `descr`, `tgtDir`, `imageUrl`, `tgtPdf`. | Text `mock-brochure.html`. | inferred, mocked |
| `/php/postFiles.php` | Upload generated brochure/image payloads. | generated brochure files/data URLs. | Text containing `OK`. | inferred, mocked |
| `/php/postFile.php` | Older single-file brochure upload path. | generated file/data URL. | Text containing `OK`. | recovered reference, mocked |
| `/php/getCloudInventoryPhotoFileNames.php` | Load cloud inventory photo filenames. | `custDir`, `photoFolder`. | JSON `{ fileNames: [] }`. | recovered reference, mocked |
| `/php/mls/mls.photos.phrets.php` | Load MLS photos. | `mls`. | Empty JSON success object. | recovered reference, mocked |
| `/src/idash/dist/php/getCloudInventoryPhotoFileNames.php` | Alternate inventory photo path. | `custDir`, `photoFolder`. | JSON `{ fileNames: [] }`. | recovered reference, mocked |
| `/src/idash/dist/php/mls/mls.photos.phrets.php` | Alternate MLS photo path. | `mls`. | Empty JSON success object. | recovered reference, mocked |

## Runtime Notes

The legacy runtime often checks for text containing `OK` on write endpoints. Those mocks intentionally return `OK` strings. Read-style endpoints return empty JSON arrays/objects so the app can continue without fabricating real user/session records.

