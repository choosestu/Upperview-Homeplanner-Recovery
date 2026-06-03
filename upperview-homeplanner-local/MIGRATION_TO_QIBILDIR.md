# Migration To QibilDir

Status: proposed migration plan. `QibilDir` is treated here as the target reusable new-home sales platform directory/application.

## Goal

Turn the recovered UpperView HomePlanner prototype into a portable platform module that can power multiple builders, communities, catalogs, and buyer workflows through structured configuration rather than hard-coded project files.

## Source Layers To Bring Forward

| UpperView Prototype Layer | QibilDir Target |
| --- | --- |
| `HomePlannerConfig.builder` | Builder profile configuration |
| `HomePlannerConfig.project` | Sales project/site configuration |
| `HomePlannerConfig.communities` | Community records and geography |
| `HomePlannerConfig.catalog.plans` | Plan catalog service |
| `HomePlannerConfig.catalog.elevations` implied under plans | Elevation/media service |
| `HomePlannerConfig.catalog.colorPackages` | Finish/package library |
| `HomePlannerConfig.catalog.options` | Structural/design option catalog |
| `HomePlannerConfig.workflow` | Buyer session state model |
| `HomePlannerConfig.api.routes` | Legacy compatibility adapter |

## Recommended QibilDir Directory Shape

```text
qibildir/
  apps/
    buyer/
    admin/
  packages/
    homeplanner-core/
    homeplanner-api-contracts/
    homeplanner-legacy-adapter/
    homeplanner-ui/
  data/
    builders/
      upperview/
        builder.json
        projects/grandview-trail.json
        communities/grandview-trail.json
        catalog/plans.json
        catalog/elevations.json
        catalog/options.json
        catalog/color-packages.json
```

## Migration Phases

### Phase 1: Compatibility Package

Move these files into a `homeplanner-legacy-adapter` package:

- `app/platform/static-api-router.js`
- `app/platform/config-bootstrap.js`
- `API_CONTRACTS.md`
- `ENDPOINT_INVENTORY.md`

Keep the recovered frontend running unchanged for regression tests.

### Phase 2: Normalized Data

Convert `app/config/upperview-project.config.js` into normalized JSON files:

- `builder.json`
- `project.json`
- `communities.json`
- `plans.json`
- `elevations.json`
- `color-packages.json`
- `options.json`

Then generate legacy XML/JSON payloads from those normalized records.

### Phase 3: Modern Buyer App

Rebuild the buyer-facing UI as components backed by normalized API resources:

- community selection
- plan catalog
- filters
- elevation selector
- color/package selector
- floorplan options
- pricing summary
- favorites
- lead capture

Use the recovered UI only as behavioral reference, not as a permanent technical foundation.

### Phase 4: Builder Admin

Add admin tools for:

- builder profile and branding
- communities and siteplans
- lots and availability
- plan/elevation media
- color packages and finish libraries
- options and dependencies
- pricing and incentives
- lead/favorite exports

### Phase 5: Retire Legacy Runtime

When the modern buyer app matches the recovered flow, retire `homebuilder.min.js` from production. Keep it in an archive/regression-test folder with the compatibility adapter.

## QibilDir API Direction

Prefer modern resource endpoints:

```text
GET /api/builders/{builderKey}
GET /api/projects/{projectKey}
GET /api/projects/{projectKey}/communities
GET /api/communities/{communityId}/plans
GET /api/plans/{planId}
GET /api/elevations/{elevationId}
GET /api/elevations/{elevationId}/color-packages
GET /api/plans/{planId}/floorplans
GET /api/plans/{planId}/options
POST /api/buyer-sessions
PATCH /api/buyer-sessions/{sessionId}
POST /api/leads
```

Keep a compatibility namespace only as needed:

```text
GET /legacy/db/scripts/php/getplans.php
GET /legacy/db/scripts/php/getnbrhoodsdata.php
GET /legacy/db/scripts/php/getsummary.php
```

## What Can Be Reused Directly

- The recovered endpoint contracts.
- The concept of a buyer workflow moving from community to plan to elevation to options.
- The local static replay adapter.
- The reconstructed sample catalog as a test fixture.

## What Should Be Replaced

- Minified monolithic frontend bundle.
- PHP-shaped endpoint naming in new production APIs.
- Deprecated social login/share integrations.
- Google Analytics Universal tracking.
- Hard-coded Rendering House asset paths.

## Open Assumptions

- QibilDir will support multiple builders and projects.
- The platform should keep a legacy compatibility adapter for archive validation.
- UpperView historical production data remains unavailable unless recovered later.
- Reconstructed sample data must remain clearly marked and should not be treated as real sales content.
