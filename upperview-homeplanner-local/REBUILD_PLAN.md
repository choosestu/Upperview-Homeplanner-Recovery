# Rebuild Plan

## Can The System Be Rebuilt?

Yes. The original system can realistically be rebuilt into a usable modern prototype because the frontend reveals the main domain model, endpoint paths, parameter names, and parser expectations. The missing piece is not the application structure; it is the historical UpperView dataset.

## What Is Still Missing?

- Real UpperView plan names and IDs.
- Real Grandview Trail lots, lot geometry, availability, and inventory assignments.
- Real elevation names, IDs, images, floorplan images, and rendering layer images.
- Real color schemes, palettes, finishes, and pricing.
- Real structural options and dependencies.
- Real interior room catalogs.
- User/favorites backend implementation and persisted account records.
- CRM/email/brochure service integrations.

## Modern Prototype Steps

1. Replace mixed XML/PHP endpoints with a typed JSON API.
2. Keep a compatibility layer that can serve the old XML/JSON contracts for the archived frontend.
3. Build a seed dataset using confirmed recovered records where possible and neutral placeholder records where historical records are absent.
4. Implement catalog entities first: clients, neighborhoods, plans, elevations, floorplans, options, palettes, schemes.
5. Implement lots and inventory next, because siteplan behavior depends on lot geometry and statuses.
6. Implement rendering placeholders or a simple image composition service for floorplans/elevations.
7. Add users/favorites as local storage or a small database-backed service.
8. Replace old social/analytics integrations with no-op adapters or modern equivalents.
9. Add automated browser tests for startup, plan list, filter changes, plan selection, floorplan/options, brochure generation, and favorites.

## Prototype Included Here

The current local prototype:

- Boots the original archived frontend.
- Uses the original AJAX paths.
- Serves reconstructed static responses from `data/reconstructed/`.
- Displays one neutral reconstructed sample plan.
- Supports plan filtering/list display.
- Supports selecting the reconstructed plan.
- Reaches the elevation/floorplan/options step.
- Routes the old rendering API to a clearly marked placeholder floorplan.

## Assumptions

- Client ID is treated as `1` because the reconstructed client response uses `id="1"` and the original page used `data-client="upperview"`.
- Neighborhood ID is treated as `1` for the reconstructed Grandview Trail record.
- Sample plan/elevation IDs are reconstructed placeholders: plan `101`, elevation `1001`, floorplan options `2000-2002`.
- The sample plan name is not historical.
- Public real-estate square footage/pricing examples informed only the plausibility of sample numeric values; they are not asserted as exact HomePlanner records.

