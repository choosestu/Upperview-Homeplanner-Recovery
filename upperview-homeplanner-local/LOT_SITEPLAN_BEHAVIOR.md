# Lot/Siteplan and Availability Behavior

Status: reconstructed from recovered frontend runtime references plus normalized local config. No original UpperView Grandview Trail lot database or siteplan artwork was recovered.

## Recovered Runtime Behavior

- The recovered HomePlanner runtime keeps a selected lot in buyer workflow state and later reads it through methods such as `getSelectedLot()`, `getLot(lotId)`, `getStatus()`, `getLandId()`, `getName()`, `getLandMls()`, `getSize()`, `getCost()`, and `getLandPhotos()`.
- Inventory/quick move-in views link inventory homes to a `lotId`, then use the selected neighborhood legend through `getLegendName(getLot(lotId).getStatus())`.
- Inventory detail expects address, MLS id, lot name, elevation name, home style, square footage, description, and price/cost fields.
- The recovered UI opens the original siteplan modal with `anewgo.siteplan.viewInModal(..., nbrhood, title, lot)` for inventory homesite viewing.
- Brochure and lead-flow code references the selected lot, lot premiums/costs, land MLS, and land photos.

## Reconstructed Local Behavior

The normalized config now defines a reconstructed Grandview Trail siteplan model:

- `community.siteplan`: metadata for the local legacy coordinate system. The image is intentionally blank because no historical siteplan asset was recovered.
- `community.legend`: available, hold, sold, inventory, and model states with selectable/availability flags.
- `community.lots`: 9 reconstructed homesites with geometry, status, premium, size, address, plan/elevation assignment, plan compatibility, elevation compatibility, restriction reason, model/inventory flags, and availability date.
- `community.inventory`: 3 reconstructed quick move-in examples linked to inventory lots.

## Supported States

| State | Reconstructed Behavior |
| --- | --- |
| `available` | Selectable to-be-built homesites with premiums and plan restrictions. |
| `hold` | Non-selectable homesite retained for legend and unavailable-state behavior. |
| `sold` | Non-selectable homesite retained for legend and sold-state behavior. |
| `inventory` | Selectable quick move-in homesite linked to an inventory home record. |
| `model` | Selectable display/model lot linked to a fixed plan/elevation and marked unavailable for sale. |

## Compatibility Fields

Generated `<lot>` records now include both recovered legacy fields and reconstructed compatibility fields:

- recovered/core: `id`, `x`, `y`, `width`, `height`, `sold`, `planId`, `elevId`, `cost`, `premium`, `address`, `lotType`, `mls`, `photoFolder`
- inferred/reconstructed: `name`, `landId`, `landMls`, `frontage`, `depth`, `size`, `orientation`, `statusLabel`, `selectable`, `available`, `compatiblePlanIds`, `restrictedPlanIds`, `allowedElevationIds`, `restrictionReason`, `quickMoveIn`, `modelHome`, `inventoryId`, `availableDate`, `homeStyle`

## Limitations

- Lot numbers, geometry, premiums, addresses, MLS values, restrictions, availability dates, and quick move-in records are reconstructed placeholders.
- Original UpperView plan-to-lot business rules were not recovered.
- Original siteplan image, polygon geometry, land photos, inventory photos, and MLS media were not recovered.
- This remains a legacy-compatible static data layer, not a modern GIS/map implementation.
