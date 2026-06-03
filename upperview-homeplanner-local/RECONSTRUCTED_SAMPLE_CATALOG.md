# Reconstructed Sample Catalog

Status: reconstructed. This is not historical UpperView production data.

The original UpperView PHP catalog responses were not recovered. The normalized config now includes a richer neutral sample catalog so the recovered HomePlanner runtime can demonstrate realistic buyer behavior from generated legacy payloads.

## Contents

| Area | Reconstructed Coverage |
| --- | --- |
| Plans | 3 neutral plans: `Reconstructed Plan A`, `Reconstructed Plan B`, `Reconstructed Plan C`. |
| Elevations | 6 total elevations, 2 per plan. |
| Pricing | Base pricing varies from `734990` to `929990`. |
| Specs | Bedrooms vary from 3 to 5; baths from 2.5 to 4; square footage from 1985 to 3125. |
| Color data | 2 vendors, 8 colors, 3 palettes, 3 color schemes. |
| Options | Base floorplans plus multiple structural/finish options with costs, dependencies, include/exclude fields, and alternates. |
| Lots | 9 reconstructed lots with available, hold, sold, model, and quick move-in states. |
| Inventory | 3 reconstructed quick move-in inventory examples. |
| Filters | Bedrooms, home type, and availability filter categories. |

## Generated Payload Behavior

The generated compatibility layer now emits:

- all plans and elevations in `getplans.generated.xml`
- all reconstructed elevations in lazy elevation/floorplan JSON payloads
- multiple schemes, palettes, colors, and option groups
- lot and inventory examples in neighborhood payloads
- plan-to-lot compatibility, lot-to-plan restrictions, model-home flags, and quick move-in links
- community summary counts matching the richer catalog

## Runtime Limitations

- Plan, elevation, lot, option, and color names are neutral placeholders and must not be treated as recovered historical facts.
- Elevation artwork, floorplan artwork, interior photos, and siteplan images are still placeholders or empty fields.
- Lot geometry, premiums, restrictions, addresses, MLS ids, and availability dates are reconstructed placeholders, not recovered historical UpperView data.
- The static route adapter serves one generated file per legacy endpoint. To keep multi-plan selection viable, lazy detail payloads include all reconstructed elevations rather than query-specific server filtering.
- Favorites, lead capture, CRM, email, brochure, MLS photo, and cloud inventory endpoints remain deferred/no-op work.
