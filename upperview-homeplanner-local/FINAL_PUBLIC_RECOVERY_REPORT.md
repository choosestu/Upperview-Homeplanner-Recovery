# Final Public Recovery Report

Status: recovery-only final public artifact pass. This report documents public historical artifacts recovered or checked for the HomeBiLDiR / UpperView HomePlanner recovery. It does not modify the app, rebuild anything, create schemas, propose product features, or make QiBiLDiR recommendations.

## Conclusion

Public archive recovery should now be considered: **Mostly complete**.

Reason:

- The original UpperView HomePlanner frontend/runtime is recovered.
- The original UpperView HomePlanner PHP/API backend remains unrecovered after targeted and broad CDX searches.
- The public Grandview Trail sales site was recovered enough to establish strong historical context for the HomePlanner workflow.
- Major public artifacts were recovered: project pages, floorplans page, finishes page/PDF, siteplan image, project imagery, logos, and the Home Builder App promo GIF.
- A few secondary static website assets are still referenced but not downloaded. Those would improve public-site replay fidelity, but they are unlikely to reveal new HomePlanner backend/catalog data.

Further public recovery is not likely to materially improve the HomePlanner backend reconstruction. A small optional static-asset mirroring pass could still be done for completeness.

## What Was Searched

### Targeted HomePlanner Backend/API

Earlier targeted and manual CDX searches covered:

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
- wildcard searches containing `clientId=1`, `nbrhoodIds=1`, `ids=1`, `Grandview`, and `upperview`.

Result: no public Wayback captures were found for the original UpperView PHP/API backend responses.

### Broad Public Artifact CDX Searches

The final media/public search covered:

- `upperviewhomeplanner.com/app/*`
- `upperviewhomeplanner.com/app/upperview/*`
- `upperviewhomeplanner.com/app/upperview/images/*`
- `upperviewhomeplanner.com/*siteplan*`
- `upperviewhomeplanner.com/*floorplan*`
- `upperviewhomeplanner.com/*elevation*`
- `upperviewhomeplanner.com/*Grandview*`
- `rendering.house/app/upperview/*`
- `rendering.house/app/upperview/images/*`
- `upperviewhomes.com/*grandview*`
- `upperviewhomes.com/*Grandview*`
- `grandviewtrail.com/*`
- `www.grandviewtrail.com/*`
- `res.cloudinary.com/*upperview*`
- `res.cloudinary.com/*Grandview*`

Result:

- `grandviewtrail.com/*`: 292 captures.
- `www.grandviewtrail.com/*`: 292 captures.
- `rendering.house/app/upperview/*`: 26 captures.
- UpperView HomePlanner app/media paths, Cloudinary upperview/grandview searches, and Rendering House `app/upperview/images/*`: no useful captures.

## What Was Recovered

Primary recovered public artifacts are saved under:

`upperview-homeplanner-local/data/recovered/grandviewtrail-public-site/`

These were downloaded from Wayback using timestamp `20210127185223` unless noted otherwise.

| Artifact | Source URL | Capture Timestamp | Saved File | Classification | What It Proves |
| --- | --- | --- | --- | --- | --- |
| Project page | `https://grandviewtrail.com/index.php` | `20210127185223` | `grandviewtrail.com_index.php` | Grandview Trail specific | Confirms public project positioning, address, 40'/41' single detached homes, up to 3,200 sq ft, upper-$700s price band, siteplan reference, floorplans page link. |
| Floorplans page | `https://grandviewtrail.com/floorplans.php` | `20210127185223` | `grandviewtrail.com_floorplans.php` | Grandview Trail specific | Confirms the public sales site linked directly to `http://upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`. Describes app coverage: floorplans, layout options, upgrades, pricing, elevation, and colour schemes. |
| Location page | `https://grandviewtrail.com/location.php` | `20210127185223` | `grandviewtrail.com_location.php` | Grandview Trail specific | Confirms public North Oshawa location context and area/amenity positioning. |
| Finishes page | `https://grandviewtrail.com/finishes.php` | `20210127185223` | `grandviewtrail.com_finishes.php` | Grandview Trail specific | Confirms public finishes/features page and links to the finishes PDF. |
| Builder page | `https://grandviewtrail.com/builder.php` | `20210127185223` | `grandviewtrail.com_builder.php` | UpperView general / Grandview Trail public site | Confirms Upperview Homes builder positioning within the Grandview Trail site. |
| Contact/register page | `https://grandviewtrail.com/contact.php` | `20210127185223` | `grandviewtrail.com_contact.php` | Grandview Trail specific | Confirms public register/contact flow and hidden form values `Developer=Upperview`, `Project=Grandview`. |
| Privacy page | `https://grandviewtrail.com/privacy.php` | `20210127185223` | `grandviewtrail.com_privacy.php` | Grandview Trail specific | Confirms public-site privacy page. |
| Siteplan image | `https://grandviewtrail.com/img/siteplan.jpg` | `20210127185223` | `grandviewtrail.com_img_siteplan.jpg` | Grandview Trail specific | Real public siteplan image: 34 lots, lot categories, road/trail context, frontage/depth labels. |
| Finishes PDF | `https://grandviewtrail.com/pdf/GrandView-Trail-Finishes.pdf` | `20210127185223` | `grandviewtrail.com_pdf_GrandView-Trail-Finishes.pdf` | Grandview Trail specific | Confirms public finishes/features language, 9 exterior colour schemes, walkout conditions, Tarion language, and terms/disclaimer language. |
| Home Builder App promo GIF | `https://grandviewtrail.com/img/floorplans-home-builder-app.gif` | `20210127185223` | `grandviewtrail.com_img_floorplans-home-builder-app.gif` | Grandview Trail specific | Public media promoting the contactless Home Builder App. |
| Floorplans banner | `https://grandviewtrail.com/img/floorplans-banner.jpg` | `20210127185223` | `grandviewtrail.com_img_floorplans-banner.jpg` | Grandview Trail specific | Public floorplans-page marketing image. |
| Home rendering | `https://grandviewtrail.com/img/home-rendering.jpg` | `20210127185223` | `grandviewtrail.com_img_home-rendering.jpg` | Grandview Trail specific | Public project rendering. |
| Featured project image | `https://grandviewtrail.com/img/featured-project.jpg` | `20210127185223` | `grandviewtrail.com_img_featured-project.jpg` | Grandview Trail specific | Public project preview image. |
| Featured location image | `https://grandviewtrail.com/img/featured-location.jpg` | `20210127185223` | `grandviewtrail.com_img_featured-location.jpg` | Grandview Trail specific | Public location preview image. |
| Featured floorplans image | `https://grandviewtrail.com/img/featured-floorplans.jpg` | `20210127185223` | `grandviewtrail.com_img_featured-floorplans.jpg` | Grandview Trail specific | Public floorplans preview image. |
| Grandview Trail logo | `https://grandviewtrail.com/img/logo.png` | `20210127185223` | `grandviewtrail.com_img_logo.png` | Grandview Trail specific | Public project branding. |
| Grandview Trail colour logo | `https://grandviewtrail.com/img/logo-clr.png` | `20210127185223` | `grandviewtrail.com_img_logo-clr.png` | Grandview Trail specific | Public project branding. |
| Upperview logo | `https://grandviewtrail.com/img/logo-upperview.png` | `20210127185223` | `grandviewtrail.com_img_logo-upperview.png` | UpperView general / Grandview Trail public site | Confirms Upperview branding on the public site. |

## Key Evidence From Recovered Public Files

### Public Sales Context

Recovered public pages support:

- Grandview Trail was marketed by Upperview Homes.
- The project was in North Oshawa.
- The public address shown was `1986 Grandview Street North, Oshawa, ON`.
- The public site described homes as `40' & 41' Single Detached Homes`.
- The public site advertised homes up to `3,200 Square Feet`.
- The public site advertised pricing as `Starting AT Upper $700's`.
- The project copy described modern/traditional family homes on 40' or 41' lots.
- The site described a ravine/nature-trail context.

### Direct HomePlanner Workflow Link

The recovered public `floorplans.php` page directly links to:

`http://upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`

The page describes the Home Builder App as covering:

- floorplans
- layout options
- upgrades
- pricing
- elevation
- colour schemes

This confirms that the public Grandview Trail sales site and the recovered HomePlanner were part of the same buyer workflow.

### Siteplan Evidence

Recovered file:

`grandviewtrail.com_img_siteplan.jpg`

Observed evidence:

- 2000 x 1451 public siteplan image.
- 34 numbered lots.
- Lot categories:
  - walk-out lots
  - standard lots
  - ravine walk-out lots
- Streets/context shown:
  - Conlin Road East
  - Grandview Street North
  - Don White Court
  - trail areas
  - existing residential context
- The image includes frontage/depth labels such as 40', 41', 43', 80', 98', 101', 102', and 113' depending on lot.

This is stronger public evidence than the current reconstructed 9-lot mock, but it is still not the original `getnbrhoodsdata.php` HomePlanner XML.

### Finishes Evidence

Recovered file:

`grandviewtrail.com_pdf_GrandView-Trail-Finishes.pdf`

Extracted evidence includes:

- architecturally controlled exterior colour schemes, elevations, sitings, and material
- premium exterior selection of 9 colour schemes
- clay brick, stone, and smart trim combinations as per plan
- walkout conditions, grade permitting, including a standard 6' x 7' deck and larger basement windows
- Tarion warranty language
- disclaimer that plans, elevations, specifications, prices, terms, and conditions were subject to change

This supports public finishes/features evidence, not HomePlanner palette/scheme IDs.

## Comparable / Adjacent Rendering House Evidence

Previously recovered under:

`upperview-homeplanner-local/data/recovered/manual-media-pass/`

| Artifact | Source URL | Capture Timestamp | Saved File | Classification | What It Proves |
| --- | --- | --- | --- | --- | --- |
| UpperView app shell | `https://rendering.house/app/upperview/` | `20190718131433` | `rendering_house_upperview_20190718131433.html` | UpperView general | Confirms Rendering House hosted an UpperView builder app shell using `data-client="upperview"`. |
| UpperView app shell | `https://rendering.house/app/upperview/` | `20190919190224` | `rendering_house_upperview_20190919190224.html` | UpperView general | Confirms later UpperView app shell capture. |
| UpperView interiors shell | `http://rendering.house:80/app/upperview/interiors/` | `20180803182759` | `rendering_house_upperview_interiors_20180803182759.html` | Comparable Rendering House evidence | Confirms an UpperView interiors app shell for `data-nbrhood="Baldwin Woods"`. Not Grandview Trail data. |

## Remaining Referenced Public Assets

The recovered pages reference additional static assets not yet mirrored in the primary recovered public-site folder:

- `assets/foundation.css`
- `assets/jquery-3.1.0.min.js`
- `assets/jquery-min.js`
- `bxslider/bxslider.css`
- `bxslider/bxslider-min.js`
- `img/apple-touch-icon.png`
- `img/favicon.ico`
- `img/favicon-16x16.png`
- `img/favicon-32x32.png`
- `img/safari-pinned-tab.svg`
- `img/site.webmanifest`
- `img/arrow-scroll-down.png`
- `img/download.png`
- `img/icon-facebook-wh.png`
- `img/icon-instagram-wh.png`
- `img/icon-twitter-wh.png`
- `img/logo-icon-clr.png`
- `img/logo-upperview-clr.png`
- `img/builder-banner.jpg`
- `img/builder-banner-mobile.jpg`
- `img/builder-banner-tablet.jpg`
- `img/builder-contemporary.jpg`
- `img/builder-home-1.jpg`
- `img/builder-home-2.jpg`
- `img/builder-home-3.jpg`
- `img/builder-traditional.jpg`
- `img/contact-banner.jpg`
- `img/contact-banner-mobile.jpg`
- `img/contact-banner-tablet.jpg`
- `img/finishes-banner.jpg`
- `img/finishes-banner-mobile.jpg`
- `img/finishes-banner-tablet.jpg`
- `img/floorplans-banner-mobile.jpg`
- `img/floorplans-banner-tablet.jpg`
- `img/home-rendering-mobile.jpg`
- `img/home-trees.jpg`
- `img/home-trees-mobile.jpg`
- `img/home-trees-tablet.jpg`
- `img/location-banner.jpg`
- `img/location-banner-mobile.jpg`
- `img/location-banner-tablet.jpg`
- `img/location-map.png`
- `img/location-map-mobile.png`
- `img/siteplan-mobile.jpg`

These are useful if the goal is to preserve a more complete public-site mirror. They are unlikely to reveal original HomePlanner API/catalog records.

## What Remains Missing

Still missing after this final public artifact pass:

- original UpperView HomePlanner PHP backend responses
- original HomePlanner plan IDs, elevation IDs, option IDs, colour IDs, palette IDs, and scheme IDs
- exact original HomePlanner plan/elevation names and pricing tables
- exact original HomePlanner floorplan/elevation rendering asset mappings
- exact original HomePlanner lot status, sold/hold/inventory state, premiums, and plan-to-lot restrictions
- original favorites/session/lead/brochure/CRM PHP behavior
- original private sales-office data or database records

## Is Further Public Recovery Worthwhile?

Further PHP/API recovery is **not worthwhile** unless a new private source, server backup, browser cache, or unsearched archive is discovered.

Further public artifact recovery is only marginally worthwhile:

- Worth doing if the goal is a more complete mirror of the public marketing site.
- Not likely to materially improve the original HomePlanner backend reconstruction.

Recommended stopping point:

- Treat frontend/runtime recovery as complete enough for preservation.
- Treat public collateral recovery as mostly complete.
- Treat original backend/API recovery as unrecovered and likely unavailable from public archives.
- Keep reconstructed prototype data clearly labeled as reconstructed.

## Optional Final Static Asset Mirror

If a complete public-site mirror is desired, download the remaining referenced static assets listed above into:

`upperview-homeplanner-local/data/recovered/final-public-recovery-pass/`

This is optional preservation work, not required for understanding the recovered HomePlanner system.
