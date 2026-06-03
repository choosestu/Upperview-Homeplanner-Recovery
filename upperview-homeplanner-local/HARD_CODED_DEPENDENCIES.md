# Hard-Coded Dependencies

Status: partially extracted. This file tracks remaining portability blockers.

## Already Extracted Or Wrapped

| Dependency | Previous Location | New Boundary |
| --- | --- | --- |
| Legacy PHP route map | `local-mocks/ajax-route-rewriter.js` | `HomePlannerConfig.api.routes` consumed by `app/platform/static-api-router.js` |
| Builder/client key | `#my-stage data-client="upperview"` | `HomePlannerConfig.builder.key`, applied by `config-bootstrap.js` |
| Target neighborhood | `#my-stage data-tgtNbrhood="Grandview Trail"` | `HomePlannerConfig.project.targetNeighborhood`, applied by `config-bootstrap.js` |
| Analytics ID | `#my-stage data-tid` | `HomePlannerConfig.builder.analyticsId` |
| Facebook app ID | `#my-stage data-fbappid` | `HomePlannerConfig.builder.facebookAppId` |

## Still Hard-Coded In The HTML Shell

| Dependency | Location | Migration |
| --- | --- | --- |
| Fallback stage attributes for UpperView and Grandview Trail | `index.html` | Keep as safe defaults for archive replay; remove when the app has a generated shell. |
| Social/auth script scaffolding | `index.html` | Replace with feature flags and modern auth/share adapters. |
| Recovered DOM structure | `index.html` | Preserve for compatibility; rebuild as components in a modern app. |
| Static script order | `index.html` | Replace with a bundler/entrypoint once the recovered bundle is retired. |

## Still Hard-Coded In Legacy Engine

| Dependency | Evidence | Migration |
| --- | --- | --- |
| Rendering House base URLs | `homebuilder.min.js` calls `//rendering.house/app/` and `/api/v1/fp/` | Keep intercepted in local mode; replace with configurable asset/render service. |
| Legacy PHP endpoint paths | `homebuilder.min.js` | Keep compatibility adapter; modern API should expose equivalent resource endpoints. |
| Buyer workflow internals | `anewgo.*` modules in minified bundle | Extract to a state store with documented events/actions. |
| UI component construction | minified DOM code | Rebuild as component modules after behavior is covered by tests. |
| CRM/email/favorites PHP endpoints | `ENDPOINT_INVENTORY.md` | Implement behind adapters with no-op local mocks. |

## Still Hard-Coded In Reconstructed Payloads

| Content | Files | Migration |
| --- | --- | --- |
| UpperView client ID `1` | reconstructed XML/JSON files | Generate from normalized builder config. |
| Grandview Trail neighborhood ID `1` | reconstructed XML/JSON files | Generate from normalized community config. |
| Reconstructed sample plan ID `101` | plan/elevation/floorplan payloads | Generate from normalized catalog config. |
| Reconstructed sample elevation ID `1001` | plan/elevation/floorplan payloads | Generate from normalized catalog config. |
| Reconstructed option IDs `2000`-`2002` | floorplan payloads | Generate from normalized option config. |
| Placeholder image paths | floorplan payloads | Move to asset manifest. |

## Portability Risk

The largest remaining risk is that the original engine expects exact XML/JSON structures and often reads fields by legacy names. A modern configurable framework should keep a compatibility serializer until the UI is rebuilt against normalized data directly.
