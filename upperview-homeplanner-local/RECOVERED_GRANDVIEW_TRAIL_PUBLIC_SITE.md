# Recovered Grandview Trail Public Site Evidence

Status: recovered public marketing evidence. This document records the Grandview Trail public-site files recovered during the final media/public-document sweep. These files are not the missing UpperView HomePlanner PHP backend responses, and they should not be treated as original HomePlanner catalog records.

## Recovery Location

Recovered files are saved under:

`upperview-homeplanner-local/data/recovered/grandviewtrail-public-site/`

Source capture timestamp used for this download pass:

`20210127185223`

Archive URL pattern:

`https://web.archive.org/web/20210127185223id_/https://grandviewtrail.com/{path}`

## Recovery Summary

This pass recovered real public Grandview Trail marketing pages and assets:

- project page HTML
- floorplans page HTML
- location page HTML
- finishes page HTML
- builder page HTML
- contact/register page HTML
- privacy page HTML
- siteplan image
- marketing/project/location/floorplan images
- Home Builder App promo GIF
- Upperview and Grandview Trail logos
- GrandView Trail finishes PDF

This pass did not recover:

- original `getplans.php`
- original `getnbrhoodsdata.php`
- original `getsummary.php`
- original `getclientdata.php`
- original lazy plan/elevation/floorplan endpoint payloads
- original HomePlanner plan IDs, elevation IDs, option IDs, lot IDs, or pricing tables
- original HomePlanner generated floorplan/elevation layer assets

## File Inventory

| File | Type | Size | Status | Recovery Value |
| --- | --- | ---: | --- | --- |
| `grandviewtrail.com_index.php` | HTML | 26,561 | recovered public evidence | Project page with address, pricing band, lot size, square-footage range, siteplan reference, and public floorplan copy. |
| `grandviewtrail.com_floorplans.php` | HTML | 27,286 | recovered public evidence | Confirms the public floorplans page linked directly to `upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`. |
| `grandviewtrail.com_location.php` | HTML | 32,232 | recovered public evidence | Area/location page with neighbourhood context and public amenities text. |
| `grandviewtrail.com_finishes.php` | HTML | 38,282 | recovered public evidence | Finishes page with feature text and link to the finishes PDF. |
| `grandviewtrail.com_builder.php` | HTML | 23,885 | recovered public evidence | Upperview builder/about page. |
| `grandviewtrail.com_contact.php` | HTML | 30,155 | recovered public evidence | Contact/register page with hidden `Developer=Upperview` and `Project=Grandview` fields. |
| `grandviewtrail.com_privacy.php` | HTML | 10,984 | recovered public evidence | Privacy page. |
| `grandviewtrail.com_img_siteplan.jpg` | JPEG | 502,602 | recovered public evidence | Real public siteplan image, 2000 x 1451, showing 34 numbered lots and lot categories. |
| `grandviewtrail.com_img_floorplans-home-builder-app.gif` | GIF | 1,802,920 | recovered public evidence | Public promo GIF for the Grandview Trail Home Builder App, 1080 x 1920. |
| `grandviewtrail.com_img_floorplans-banner.jpg` | JPEG | 243,749 | recovered public evidence | Floorplans page banner, 2500 x 1200. |
| `grandviewtrail.com_img_home-rendering.jpg` | JPEG | 301,724 | recovered public evidence | Public exterior/project rendering, 1700 x 1000. |
| `grandviewtrail.com_img_featured-project.jpg` | JPEG | 117,111 | recovered public evidence | Public project feature image, 1000 x 400. |
| `grandviewtrail.com_img_featured-location.jpg` | JPEG | 95,050 | recovered public evidence | Public location feature image, 1000 x 400. |
| `grandviewtrail.com_img_featured-floorplans.jpg` | JPEG | 57,537 | recovered public evidence | Public floorplans feature image, 1000 x 400. |
| `grandviewtrail.com_img_logo.png` | PNG | 32,932 | recovered public evidence | Grandview Trail logo. |
| `grandviewtrail.com_img_logo-clr.png` | PNG | 32,658 | recovered public evidence | Grandview Trail colour logo. |
| `grandviewtrail.com_img_logo-upperview.png` | PNG | 16,295 | recovered public evidence | Upperview Homes logo. |
| `grandviewtrail.com_pdf_GrandView-Trail-Finishes.pdf` | PDF | 94,152 | recovered public evidence | Real public finishes/features PDF. |

## Public Facts Supported By Recovered Files

The recovered public pages support these facts:

| Fact | Evidence File | Status |
| --- | --- | --- |
| Grandview Trail was marketed by Upperview Homes. | All recovered page metadata and page footers. | recovered public evidence |
| Grandview Trail was located in North Oshawa. | `grandviewtrail.com_index.php`, `grandviewtrail.com_location.php`. | recovered public evidence |
| Public address shown was `1986 Grandview Street North, Oshawa, ON`. | `grandviewtrail.com_index.php`, `grandviewtrail.com_floorplans.php`, map script text. | recovered public evidence |
| Public site described the homes as `40' & 41' Single Detached Homes`. | `grandviewtrail.com_index.php`. | recovered public evidence |
| Public site advertised homes `Up to 3,200 Square Feet`. | `grandviewtrail.com_index.php`. | recovered public evidence |
| Public site advertised pricing as `Starting AT Upper $700's`. | `grandviewtrail.com_index.php`. | recovered public evidence |
| Public site described floorplans as named after members of the Group of Seven. | `grandviewtrail.com_index.php`, `grandviewtrail.com_location.php`. | recovered public evidence |
| Public floorplans page linked users to `http://upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`. | `grandviewtrail.com_floorplans.php`. | recovered public evidence |
| Public floorplans page described the Home Builder App as covering floorplans, layout options, upgrades, pricing, elevations, and colour schemes. | `grandviewtrail.com_floorplans.php`. | recovered public evidence |
| Public finishes material states there were 9 exterior colour schemes. | `grandviewtrail.com_pdf_GrandView-Trail-Finishes.pdf`. | recovered public evidence |

## Siteplan Evidence

Recovered file:

`grandviewtrail.com_img_siteplan.jpg`

Observed from the image:

- The image is a real public Grandview Trail siteplan.
- It shows 34 numbered lots.
- It includes Conlin Road East, Grandview Street North, Don White Court, trail areas, and existing residential context.
- It includes a key/legend for:
  - walk-out lots
  - standard lots
  - ravine walk-out lots
- It shows lot frontage/depth labels such as 40', 41', 43', 80', 98', 101', 102', and 113' depending on lot.

Recovery note:

This is stronger evidence than the current reconstructed 9-lot mock catalog, but it is still public marketing evidence, not the original HomePlanner lot XML. It can support future reconstruction work if the sample catalog is updated, but it should not be treated as a recovered `getnbrhoodsdata.php` payload.

## HomeBuilder App Evidence

The recovered `floorplans.php` page contains direct public calls to the HomePlanner app:

`http://upperviewhomeplanner.com/?nbrhood=Grandview%20Trail`

The page text describes the app as a contactless interactive home builder app that covers:

- floorplans
- layout options
- upgrades
- pricing
- elevation
- colour schemes

Recovery note:

This confirms the intended public buyer-facing role of the recovered HomePlanner application. It does not reveal the missing backend response data.

## Finishes PDF Evidence

Recovered file:

`grandviewtrail.com_pdf_GrandView-Trail-Finishes.pdf`

Extracted public evidence includes:

- architecturally controlled exterior colour schemes, elevations, sitings, and material
- premium exterior selection of 9 colour schemes
- all clay brick, stone, and smart trim combinations as per plan
- 9' main floor ceilings with 8' second floor ceilings, with listed exceptions
- walkout conditions including standard 6' x 7' deck and larger basement windows, grade permitting
- Tarion warranty language
- conditions stating plans, elevations, and specifications were subject to modification
- public disclaimer that prices, specifications, terms, and conditions were subject to change without notice

Recovery note:

This PDF is useful for public finishes/features evidence and can inform reconstructed finish/package assumptions. It does not identify individual HomePlanner scheme IDs, colour IDs, palette IDs, or option IDs.

## Rendering House / UpperView Adjacent Evidence

Previously downloaded files in `manual-media-pass` include:

- `rendering_house_upperview_20190718131433.html`
- `rendering_house_upperview_20190919190224.html`
- `rendering_house_upperview_interiors_20180803182759.html`

Evidence:

- `rendering.house/app/upperview/` confirms an UpperView builder app shell using `data-client="upperview"`.
- `rendering.house/app/upperview/interiors/` identifies `data-client="upperview"` and `data-nbrhood="Baldwin Woods"`.

Recovery note:

These files are UpperView-adjacent evidence and useful for app shell comparison. The interiors capture is not Grandview Trail and must not be treated as Grandview Trail data.

## What Remains Missing

Even after this public-site recovery, the following remain missing:

- original UpperView HomePlanner PHP backend responses
- exact HomePlanner plan names, IDs, elevation IDs, option IDs, lot IDs, and colour package IDs
- exact original HomePlanner pricing tables
- exact original plan/elevation/floorplan media mapping
- exact original HomePlanner lot status, hold/sold/inventory states, and premiums
- exact HomePlanner API responses for favorites, sessions, leads, brochure generation, and CRM

## Recommended Handling

Use these files as recovered public evidence.

Do not overwrite generated or reconstructed HomePlanner payloads automatically.

If the reconstructed demo catalog is later updated, these recovered public facts can safely guide it:

- 34 public lots instead of the current 9 sample lots
- 40' and 41' single detached homes
- upper $700s public starting price band
- up to 3,200 sq ft public size range
- 9 exterior colour schemes
- public siteplan lot categories
- Group of Seven naming theme for floorplans, without inventing exact plan names unless they are recovered elsewhere
