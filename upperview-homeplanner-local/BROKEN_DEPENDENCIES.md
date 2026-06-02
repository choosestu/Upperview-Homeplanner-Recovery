# Broken or Missing Dependencies Found

- Wayback replay wrapper scripts: caused the archived replay environment/popup risk, removed by using the raw `id_` capture and local HTML.
- `../../db/scripts/php/getcolorlib.php?client=upperview`: not captured by Wayback; reconstructed as `data/reconstructed/db/scripts/php/getcolorlib.reconstructed.xml`.
- `../../homedesigner/getclientdata.php?client=upperview`: not captured by Wayback; reconstructed as `data/reconstructed/homedesigner/getclientdata.reconstructed.xml`.
- `../../db/scripts/php/getsummary.php?clientId=1`: not captured by Wayback; reconstructed as `data/reconstructed/db/scripts/php/getsummary.reconstructed.json`.
- `../../db/scripts/php/getnbrhoodsdata.php?clientId=1&nbrhoodIds=1`: not captured by Wayback; reconstructed as `data/reconstructed/db/scripts/php/getnbrhoodsdata.reconstructed.xml`.
- `../../db/scripts/php/getplans.php?clientId=1&ids=1`: not captured by Wayback; reconstructed as `data/reconstructed/db/scripts/php/getplans.reconstructed.xml`.
- Lazy plan/elevation endpoints such as `getElevationDetails.php`, `getPlanFloorplans.php`, and the old Rendering House floorplan render API: not captured as UpperView data; reconstructed under `data/reconstructed/`.
- Google Maps API script: external API/key no longer suitable for local replay; replaced with `local-mocks/google-maps-stub.js`.
- Google Analytics, Facebook SDK, Google Plus, Pinterest: external/social scripts not required for local viewing; replaced with local stubs.
- Font Awesome webfonts: required by local Font Awesome CSS; downloaded into `vendor/font-awesome/fonts/`.
- `homedesigner/images/apple-touch-icon-114x114.png`: not found in Wayback; substituted with the recovered 72px touch icon and documented here.
- Cloudinary equal-housing logo: downloaded as `local-mocks/eho-logo.png` and the hard-coded bundle URL was rewritten locally.
