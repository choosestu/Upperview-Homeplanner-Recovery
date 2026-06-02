# Executive Summary

## 1. What The Original UpperView HomePlanner Did

The UpperView HomePlanner was an interactive new-home sales application for the Grandview Trail community. It let buyers browse a builder-branded catalog, filter available plans, select a plan/elevation, move through floorplan and option steps, view pricing context, explore lots/siteplan information, and likely save or share a configured home.

The app was built on a shared Rendering House/HomeBuilder platform. UpperView supplied client/community data through PHP endpoints, while the frontend handled the buyer flow, filtering, rendering, favorites, registration, brochure, CRM/email, and social sharing interactions.

## 2. What Parts Were Recovered

Recovered from Wayback and public asset URLs:

- The original archived HTML shell for the Grandview Trail page.
- The core frontend bundle: `homebuilder.min.js`.
- Supporting scripts: jQuery, Foundation, map helpers, vendor libraries.
- Main stylesheets and UI assets.
- Historical UpperView page captures from multiple years.
- Historical shared Rendering House app bundles from 2015-2020.
- Comparable Rendering House backend responses for other builders.

The local page now boots without the Wayback replay wrapper or popup.

## 3. What Parts Were Reconstructed

Reconstructed from the frontend contract:

- Missing UpperView PHP responses under `data/reconstructed/`.
- Client configuration, color library, summary, neighborhood, plan, elevation, floorplan, option, and rendering API mock responses.
- One neutral sample catalog entry named `Reconstructed Sample Plan`.
- A placeholder floorplan asset.
- Local routing that maps the original PHP/AJAX paths to static reconstructed data.
- Third-party stubs for analytics, social scripts, and Google Maps.

The reconstructed prototype demonstrates plan loading, filtering/list display, plan selection, elevation/options display, and floorplan navigation.

## 4. What Data Is Still Missing

The real UpperView backend data was not captured. Missing historical data includes:

- Actual UpperView plan names, plan IDs, and descriptions.
- Grandview Trail lot geometry, lot IDs, statuses, and inventory assignments.
- Real elevation names, IDs, thumbnails, render layers, and images.
- Floorplan artwork and rendered floorplan variants.
- Structural options, option dependencies, and option pricing.
- Color packages, palettes, finishes, and material data.
- Real base pricing, lot premiums, inventory pricing, and package pricing.
- Interior room catalogs and selections.
- Buyer accounts, saved homes, favorites, CRM/email records, and brochures.

## 5. What Comparable Rendering House Responses Reveal

Comparable recovered `rendering.house` backend responses show the platform used a consistent schema across builders:

- Initial catalog data was split across XML and JSON PHP endpoints.
- `clientId` and neighborhood IDs drove most data loading.
- Neighborhoods contained agents, lots, standard features, legends, plans, palettes, schemes, and inventory.
- Plans contained elevations; elevations contained bed/bath/sqft/price metadata.
- Lazy endpoints loaded heavier data later: floorplans, options, schemes, palettes, interiors, and rendered image URIs.
- Favorites and account flows were separate PHP endpoints that stored selected elevations, floorplan options, palette choices, custom schemes, and lots.

These responses are not UpperView records, but they validate the inferred contract and make the reconstructed schema credible.

## 6. How This Could Be Rebuilt Today

The system can be rebuilt as a modern new-home sales platform with:

- A typed JSON API instead of mixed XML/PHP responses.
- A structured database for builders, communities, plans, elevations, lots, pricing, options, finishes, and leads.
- A buyer-facing web app for discovery, filtering, configuration, and lead capture.
- A builder admin console for catalog management, pricing updates, lot/inventory status, media uploads, and lead routing.
- A rendering service or asset pipeline for plan/elevation/floorplan visuals.
- CRM integrations, analytics, and saved-home accounts.

The original frontend provides enough behavioral specification to rebuild the product. The missing piece is historical UpperView content, not the product concept.

## 7. Keep, Improve, Replace

Keep:

- Guided buyer flow from community to plan to elevation/options.
- Plan filters for sqft, beds, baths, floors, cars, price, and inventory.
- Builder-branded community pages.
- Siteplan/lot-driven home selection.
- Saved homes/favorites and brochure generation.

Improve:

- Use modern responsive UI and accessibility standards.
- Replace minified monolith code with modular frontend architecture.
- Make pricing, availability, and option dependencies easier to manage.
- Add clearer data provenance and content status indicators.
- Add automated tests for buyer flows and admin publishing.

Replace:

- Legacy PHP endpoint design.
- Mixed XML/JSON contracts.
- Deprecated social login/share scripts.
- Old Google Maps integration pattern.
- Client-side assumptions that fail when optional numeric/XML fields are missing.
- Hard-coded external Rendering House/Cloudinary paths.

## Bottom Line

This is recoverable as a product pattern, but not as exact historical UpperView content. A modern rebuild should treat the recovered frontend as a specification, the comparable Rendering House responses as schema evidence, and the reconstructed catalog as a prototype seed rather than source-of-truth data.

