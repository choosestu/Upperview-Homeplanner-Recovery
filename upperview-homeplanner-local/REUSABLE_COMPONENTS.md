# Reusable Components

Status: inferred and partially modularized.

## Reusable Now

| Component | Current Location | Reuse Notes |
| --- | --- | --- |
| Static API router | `app/platform/static-api-router.js` | Can route legacy PHP endpoints to any configured local payload path. |
| Project bootstrap | `app/platform/config-bootstrap.js` | Applies builder/project settings to the recovered DOM shell. |
| Builder/project config | `app/config/upperview-project.config.js` | Can be copied and changed for another builder, community, or catalog. |
| API contracts | `API_CONTRACTS.md`, `ENDPOINT_INVENTORY.md` | Defines the legacy backend surface a modern system must support. |
| Recovered buyer engine | `homedesigner/dist/js/homebuilder.min.js` | Reusable as a black-box compatibility engine if its API shapes are preserved. |
| Recovered UI styles | `homedesigner/dist/css/*.css` | Preserve the original visual language for prototype replay. |
| External service stubs | `local-mocks/*-stub.js` | Useful for local replay without analytics, social, or map dependencies. |

## Reusable Domain Modules To Extract

These behaviors are embedded in the recovered bundle but should become independent modules in a modern framework:

- community browser and map adapter
- plan filters
- plan/elevation catalog browser
- elevation color/package selector
- floorplan option selector
- pricing summary
- lot/siteplan selector
- favorites/saved homes
- buyer lead profile
- brochure/share/export generator
- CRM/email submission adapter

## Configuration Shapes

The new `HomePlannerConfig` separates reusable behavior from project content:

- `builder`: builder identity, analytics, social app IDs
- `project`: active sales project/community launch target
- `communities`: community records, location, pricing, color method
- `catalog.plans`: plans and elevations
- `catalog.colorPackages`: schemes, palettes, finishes
- `catalog.options`: structural and design options
- `workflow`: buyer state keys and page order
- `api.routes`: legacy endpoint-to-local-file routing

## Reusable API Adapter Pattern

The app can run in three modes without changing the UI:

| Mode | Purpose |
| --- | --- |
| `static-reconstructed` | Current local prototype; old PHP calls are routed to local reconstructed files. |
| `static-generated` | Future step; generate XML/JSON compatibility files from normalized config. |
| `live-api` | Future production mode; route the same contracts to a real backend. |

## What Should Stay Reusable

- Buyer workflow concepts.
- Plan/elevation/option/catalog data model.
- API compatibility layer.
- Local static replay mode for demos and regression testing.
- UI flow order, because it matches the recovered product behavior.

## What Should Become Project-Specific Configuration

- builder name, logo, website, CRM settings
- community names, locations, lots, siteplans
- plan/elevation catalog
- images, render layers, floorplan assets
- pricing, availability, incentives
- color/package libraries
- option groups and dependencies
- labels and regional settings
