# Modern Rebuild Specification

## Product Vision

Build a modern new-home sales platform that lets buyers explore communities, compare plans, configure elevations/options/finishes, select lots or inventory homes, estimate pricing, save favorites, and submit qualified leads to the builder.

The platform should support multiple builders and communities, with a builder admin workflow for maintaining catalog, pricing, media, lots, inventory, and lead routing.

## Buyer-Facing Flow

1. Community Landing
   - Show builder branding, community overview, location, availability, and calls to action.

2. Plan Discovery
   - Browse plans and inventory homes.
   - Filter by price, sqft, beds, baths, floors, garage/cars, home type, move-in status, and tags.
   - Sort by name, price, sqft, popularity, or availability.

3. Plan Detail
   - View plan description, specs, included features, elevations, photos, videos, and floorplans.

4. Elevation Selection
   - Compare elevations with pricing, thumbnails, and availability by community/lot.

5. Floorplan And Structural Options
   - View floorplans.
   - Select structural options.
   - Show option cost and dependency rules.

6. Exterior/Interior Finishes
   - Select color packages, palettes, finishes, and room options where supported.

7. Homesite Or Inventory Selection
   - View interactive siteplan.
   - Filter lots by status.
   - Select lot or quick move-in home.

8. Review And Save
   - Show estimated price, selected plan/elevation/options/lot.
   - Save favorite or create account.
   - Generate brochure/shareable summary.

9. Lead Capture
   - Submit inquiry, request appointment, or send configured home to sales team/CRM.

## Builder Admin Flow

1. Builder Setup
   - Manage builder profile, branding, logos, contacts, disclaimer, CRM settings.

2. Community Management
   - Create communities.
   - Add location, description, imagery, standard features, agents, labels, and display rules.

3. Plan Catalog
   - Add plans, specifications, descriptions, photos, videos, floorplans, and elevations.
   - Assign plans to communities.

4. Pricing
   - Manage base plan pricing, elevation premiums, lot premiums, option pricing, inventory pricing, and effective dates.

5. Lot And Inventory Management
   - Upload or draw siteplans.
   - Maintain lot geometry, statuses, exclusions, premiums, and assigned inventory homes.

6. Options And Finishes
   - Manage structural options, groups, dependencies, exclusions, render order, and option imagery.
   - Manage color schemes, palettes, vendors, and finish selections.

7. Media And Rendering
   - Upload thumbnails, render layers, floorplans, photos, brochures, and generated composites.

8. Leads And Favorites
   - View buyer sessions, saved homes, inquiries, and brochure downloads.
   - Route leads to agents or CRM.

9. Publishing
   - Preview changes.
   - Publish by community, plan, or full builder catalog.
   - Roll back recent changes.

## Data Model

Core entities:

- `builders`
- `builder_settings`
- `communities`
- `locations`
- `agents`
- `standard_features`
- `plans`
- `elevations`
- `floorplans`
- `floorplan_options`
- `option_groups`
- `option_dependencies`
- `lots`
- `inventory_homes`
- `pricing_rules`
- `color_vendors`
- `colors`
- `palettes`
- `schemes`
- `scheme_elements`
- `finish_categories`
- `finish_options`
- `media_assets`
- `buyers`
- `favorites`
- `favorite_selections`
- `leads`
- `crm_integrations`
- `audit_logs`

Recommended database approach:

- PostgreSQL for relational catalog, pricing, lots, users, and leads.
- Object storage for media and render assets.
- Search index or materialized views for fast plan/inventory filtering.

## API Structure

Use a modern JSON API with versioning:

- `GET /api/v1/builders/{builderSlug}`
- `GET /api/v1/builders/{builderSlug}/communities`
- `GET /api/v1/communities/{communityId}`
- `GET /api/v1/communities/{communityId}/summary`
- `GET /api/v1/communities/{communityId}/plans`
- `GET /api/v1/plans/{planId}`
- `GET /api/v1/plans/{planId}/elevations`
- `GET /api/v1/elevations/{elevationId}`
- `GET /api/v1/elevations/{elevationId}/floorplans`
- `GET /api/v1/elevations/{elevationId}/options`
- `GET /api/v1/communities/{communityId}/lots`
- `GET /api/v1/communities/{communityId}/inventory`
- `GET /api/v1/finish-schemes?communityId=&elevationId=`
- `POST /api/v1/favorites`
- `PATCH /api/v1/favorites/{favoriteId}`
- `POST /api/v1/leads`
- `POST /api/v1/brochures`

Admin API:

- `POST /api/v1/admin/builders`
- `POST /api/v1/admin/communities`
- `POST /api/v1/admin/plans`
- `POST /api/v1/admin/elevations`
- `POST /api/v1/admin/lots/import`
- `POST /api/v1/admin/media`
- `POST /api/v1/admin/publish`
- `GET /api/v1/admin/audit-log`

Compatibility layer:

- Optional adapter that serves legacy XML/JSON endpoint shapes for archived frontend testing.

## MVP Feature List

Buyer MVP:

- Builder/community landing page.
- Plan catalog with filters and sorting.
- Plan detail page.
- Elevation selection.
- Floorplan display.
- Basic structural options.
- Basic pricing estimate.
- Save favorite in browser/local account.
- Inquiry form and lead email/CRM webhook.
- Download/share summary brochure.

Admin MVP:

- Builder profile and branding.
- Community CRUD.
- Plan/elevation CRUD.
- Floorplan/media upload.
- Basic pricing CRUD.
- Lot list/status management.
- Lead inbox/export.
- Publish/preview workflow.

Technical MVP:

- JSON API.
- PostgreSQL schema.
- Object storage integration.
- Responsive frontend.
- Authentication for admin users.
- Automated smoke tests for buyer flow.

## Future Feature List

Buyer:

- Interactive lot map with SVG/GIS import.
- Real-time inventory and lot availability.
- Full exterior color visualization.
- Interior finish configurator.
- Mortgage/payment estimator.
- Appointment scheduling.
- Buyer account dashboard.
- Side-by-side plan comparison.
- Personalized recommendations.
- Multilingual support.

Builder/Admin:

- Bulk imports from ERP/CRM.
- Pricing effective dates and approval workflow.
- Advanced option dependency engine.
- Render-layer management.
- Multi-community campaign pages.
- Agent assignment rules.
- Analytics dashboard.
- A/B testing for plan/community pages.
- Inventory syndication to listing portals.

Platform:

- Headless CMS integration.
- Webhook framework.
- CRM connectors for Salesforce, HubSpot, Lasso, Follow Up Boss, etc.
- Render service for floorplan/elevation composites.
- CDN image transformations.
- Accessibility and SEO auditing.

## Estimated Rebuild Complexity

Overall complexity: Medium-high.

Why:

- The catalog and buyer flow are straightforward.
- The hard parts are data quality, option dependencies, visual rendering, pricing rules, lot/inventory synchronization, and builder admin usability.

Estimated phases:

- Prototype: 4-8 weeks
  - One builder, one community, seeded sample data, buyer flow, basic admin.

- Production MVP: 3-5 months
  - Robust schema, admin publishing, media handling, pricing, lots, leads, tests.

- Full platform: 6-12 months
  - Multi-builder support, render services, CRM integrations, advanced options, analytics, inventory sync.

Team profile:

- Product/design lead.
- Full-stack engineer.
- Frontend engineer.
- Backend/API engineer.
- QA/automation support.
- Part-time data/content operations.

## Recommended Architecture

- Frontend: Next.js or React SPA with server-rendered community/plan pages.
- Backend: Node/NestJS, Rails, Django, or Laravel with typed JSON APIs.
- Database: PostgreSQL.
- Assets: S3-compatible object storage plus CDN.
- Auth: modern OIDC/passwordless for buyers, role-based auth for admins.
- Rendering: start with static media; later add image composition service.
- Analytics: privacy-aware event tracking.
- CRM: webhook-first integration layer.

## Product Principles

- Keep the guided home-buying flow.
- Make pricing and availability trustworthy.
- Make builder content easy to maintain.
- Treat visualization as progressive enhancement, not a blocker.
- Preserve share/save/lead capture as core business value.
- Avoid hard-coded builder-specific paths in platform code.

