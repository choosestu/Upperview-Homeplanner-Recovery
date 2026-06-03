# Endpoint Inventory

Source: `homedesigner/dist/js/homebuilder.min.js`, `index.html`, and the local mock router.

Confidence levels:

- High: endpoint, caller, parameters, and response parsing are visible in frontend code.
- Medium: endpoint is visible and response shape is partly inferred from model constructors or comparable recovered captures.
- Low: endpoint is visible but only used in optional/account/social flows not exercised by the local prototype.

## Startup And Catalog Data

| Path | Method | Query / Body Parameters | Caller | Expected Format | Required Fields | Optional Fields | Local Mock | Confidence |
|---|---:|---|---|---|---|---|---|---|
| `../../homedesigner/getclientdata.php` | GET | `client=upperview` is passed indirectly after color library load | `anewgo.dbfun.init -> t()` | XML | `<client id name dir designApp fbPostUrl>`, `<designers pageOrder contentStorage>` | CRM nodes, labels, display flags, brochure flags | `data/reconstructed/homedesigner/getclientdata.reconstructed.xml` | High |
| `../../db/scripts/php/getcolorlib.php` | GET | `client` | `anewgo.dbfun.init()` | XML | `<vendors><vendor id name>`, `<colors><color id vendorId ident name hex>` | none observed | `data/reconstructed/db/scripts/php/getcolorlib.reconstructed.xml` | High |
| `../../db/scripts/php/getsummary.php` | GET | `clientId` | `anewgo.homedesign.parseData -> bb()` | JSON | `regiondata[]`, `filterCats[]`, `maxPhpInt`; each region has `locations[]`; each location has `nbrhoods[]` | `numInv`, filter tag metadata | `data/reconstructed/db/scripts/php/getsummary.reconstructed.json` | High |
| `../../db/scripts/php/getnbrhoodsdata.php` | GET | `clientId`, optional `nbrhoodIds` comma list | `anewgo.dbfun.loadNbrhoods()` | XML | `<nbrhood id name def salesapp active pricing city state metro>` | agents, stdfeatures, legend, lots, inventory, images, CRM id, color method | `data/reconstructed/db/scripts/php/getnbrhoodsdata.reconstructed.xml` | High |
| `../../db/scripts/php/getplans.php` | GET | `clientId`, `ids` comma list of neighborhood IDs | `anewgo.dbfun.loadPlanData()` | XML | `<nbrhood id>`, `<plan id name>`, child `<elev id cap tag bed bath size cost cars>` | palettes, schemes, interiors, inventory, filters, floorplan options | `data/reconstructed/db/scripts/php/getplans.reconstructed.xml` | High |

## Lazy Plan, Elevation, And Option Data

| Path | Method | Query / Body Parameters | Caller | Expected Format | Required Fields | Optional Fields | Local Mock | Confidence |
|---|---:|---|---|---|---|---|---|---|
| `../../db/scripts/php/getElevationDetails.php` | GET | `clientId`, `nbrhoodId`, optional `metroId`, `retrievedSchemePals`, `retrievedPhotos`, `planId`, optional `elevId` | `anewgo.dbfun.retrieveElevationDetails()` | JSON | `planData.elevations[].id`, `elements[]`, `floorplans[]`; `schemes[]`; `palettes[]` | `planData.imgs`, `fpimgs`, palette overlays, floorplan alternate overlays | `data/reconstructed/db/scripts/php/getElevationDetails.reconstructed.json` | High |
| `../../db/scripts/php/getElevationElements.php` | GET | `clientId`, `nbrhoodId`, optional `metroId`, `planId` | `anewgo.dbfun.retrieveElevationElements()` | JSON | `planData.elevations[].elements[]` | none observed | `data/reconstructed/db/scripts/php/getElevationElements.reconstructed.json` | High |
| `../../db/scripts/php/getElevationSchemes.php` | GET | `clientId`, `nbrhoodId`, `planId`, `elevationId` | `anewgo.dbfun.retrieveElevationSchemes()` | JSON | `schemeIds[]` | none observed | `data/reconstructed/db/scripts/php/getElevationSchemes.reconstructed.json` | High |
| `../../db/scripts/php/getPlanFloorplans.php` | GET | `clientId`, `nbrhoodId`, `planId` | `anewgo.dbfun.retrievePlanFloorplans()` | JSON | `planData.elevations[].floorplans[]` | `opts[].fpAlts[]`, groups | `data/reconstructed/db/scripts/php/getPlanFloorplans.reconstructed.json` | High |
| `../../db/scripts/php/getelevnbrhoods.php` | GET | `clientId`, `planName`, `elevName`, optional `nbrhoodIds` | `anewgo.homedesign.getElevNbrhoodsSumm()` | JSON | array of neighborhood/elevation summary objects | names/status metadata | `data/reconstructed/db/scripts/php/getelevnbrhoods.reconstructed.json` | Medium |
| `../../db/scripts/php/getinteriors.php` | GET | `clientId`, `nbrhoodId`, `planId`, `modelId` | `anewgo.dbfun.retrieveInteriors()` | XML | `<nbrhood><interiors><room planid id name src>` | room linkages, elements, selections | `data/reconstructed/db/scripts/php/getinteriors.reconstructed.xml` | High |
| `//rendering.house/api/v1/fp/...` | GET | URL path contains client, neighborhood, plan, elevation, floor number; query includes `o=uri`, `w`, optional `opts`, `alts` | `anewgo.planfp.renderFloorSR()` | Plain text URI | image URI string | rendered floorplan image service | `data/reconstructed/rendering-api/floorplan-uri.reconstructed.txt` | Medium |

## Inventory And MLS Photo Data

| Path | Method | Query / Body Parameters | Caller | Expected Format | Required Fields | Optional Fields | Local Mock | Confidence |
|---|---:|---|---|---|---|---|---|---|
| `../../src/idash/dist/php/getCloudInventoryPhotoFileNames.php` | GET | `custDir`, `photoFolder` | `Inventory.getCloudPhotoPathsPromise()` | JSON | `fileNames[]` | none observed | in-browser no-op mock | High |
| `../../src/idash/dist/php/mls/mls.photos.phrets.php` | GET | `mls` | `Inventory.getCloudPhotoPathsPromise()` | JSON | object keyed by MLS id with URL arrays | none observed | in-browser no-op mock | High |

## Favorites, Auth, Registration, And CRM

These endpoints are visible in the frontend but are not required for the initial display prototype. They are now covered by local in-browser no-op mocks so late flows do not send real data or fail on missing PHP.

| Path | Method | Parameters | Caller | Expected Format | Local Mock | Confidence |
|---|---:|---|---|---|---|---|
| `php/getfavs.php` | POST/GET | `clientId`, `prospectId` or session data | `anewgo.favorites` | JSON/text favorite records | in-browser no-op mock | Medium |
| `php/uploadDeviceFavs.php` | POST | `maxFavorites`, `clientId`, `prospectId`, `localFavorites` | `anewgo.favorites.uploadDeviceFavs()` | JSON with `data` | in-browser no-op mock | High |
| `php/addfav.php` | POST | client/prospect/neighborhood/plan/elevation/scheme/lot fields | `anewgo.favorites` | text containing `OK` | in-browser no-op mock | High |
| `php/updfav.php` | POST | favorite id and selected option fields | `anewgo.favorites` | text containing `OK` | in-browser no-op mock | High |
| `php/delfav.php` | POST | favorite id or selection key | `anewgo.favorites` | text containing `OK` | in-browser no-op mock | Medium |
| `php/addfavfpopt.php` | POST | `clientId`, `prospectId`, `nbrhoodId`, `planId`, `elevId`, `fpNum`, `fpoptId` | `anewgo.favorites.fpOptAdd()` | text containing `OK` | in-browser no-op mock | High |
| `php/delfavfpopt.php` | POST | same option identity fields | `anewgo.favorites.fpOptRem()` | text containing `OK` | in-browser no-op mock | High |
| `php/updfavfp.php` | POST | favorite floorplan state | older `anewgo.favorites` flows | text containing `OK` | in-browser no-op mock | Medium |
| `php/addfavpalsel.php` | POST | palette/selection identity fields | `anewgo.favorites` | text containing `OK` | in-browser no-op mock | Medium |
| `php/addcustomscheme.php` | POST | `clientId`, `prospectId`, `nbrhoodId`, `planId`, `elevId`, `schemeId`, `elementId`, `colorId`, `palSelId` | `anewgo.favorites.setCustomSchemeColor2()` | text/no-op | in-browser no-op mock | High |
| `php/getfavfp.php` | POST/GET | favorite/prospect identity | older `anewgo.favorites` flows | JSON favorite floorplan records | in-browser no-op mock | Medium |
| `php/getfavfpopts.php` | POST/GET | favorite/prospect identity | older `anewgo.favorites` flows | JSON favorite option records | in-browser no-op mock | Medium |
| `php/getfavpalsel.php` | POST/GET | favorite/prospect identity | older `anewgo.favorites` flows | JSON favorite palette records | in-browser no-op mock | Medium |
| `php/getfavcustomscheme.php` | POST/GET | favorite/prospect identity | older `anewgo.favorites` flows | JSON favorite custom scheme records | in-browser no-op mock | Medium |
| `php/authenMe.php` | POST | provider, email/password or auth fields | `anewgo.signin` | JSON/text auth result | in-browser no-op mock | Low |
| `php/registerMe.php` | POST | `clientId`, `fname`, `lname`, `email`, `phone`, `inquiry`, `passwd`, `srcip`, `provider`, `subscribe`, `sentToCrm` | `anewgo.signin.register()` | text containing `OK` plus JSON user payload | in-browser no-op mock | High |
| `php/resetMe.php` | POST | email/account fields | `anewgo.signin.reset()` | text/status | in-browser no-op mock | Low |
| `php/findProspectEmail.php` | POST/GET | email | `anewgo.signin` validation | text/JSON availability | in-browser no-op mock | Medium |
| `php/sendMail.php` | POST | agent/customer message data | inquiry modal | text alert body | in-browser no-op mock | Medium |
| `php/sendRegMail.php` | POST | registration inquiry data | required registration flow | text containing `OK` | in-browser no-op mock | Medium |
| `php/curlCrmSubmission.php` | POST | CRM question fields and IDs | `sendUserDataToCrm()` | text/status | in-browser no-op mock | Low |
| `php/createBrochureHtml.php` | POST | `title`, `descr`, `tgtDir`, `imageUrl`, `tgtPdf` | Facebook share/brochure flow | URL string | in-browser no-op mock | Low |
| `php/postFiles.php` | POST | generated brochure/image data | brochure generation | text/status | in-browser no-op mock | Low |
| `php/postFile.php` | POST | generated brochure/image data | older brochure generation flow | text/status | in-browser no-op mock | Low |

Detailed late-flow behavior is documented in `LATE_FLOW_MOCK_ENDPOINTS.md`.
