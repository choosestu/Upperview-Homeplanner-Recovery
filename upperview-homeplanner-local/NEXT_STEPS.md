# Next Steps

Status: platform audit roadmap. This document intentionally prioritizes before adding new features.

## Scoring

Scores use `1` to `5`.

- **HomePlanner importance:** `5` means critical to making the recovered original app fully functional.
- **QiBiLDiR reuse:** `5` means broadly reusable in a modern multi-builder platform.
- **Difficulty:** `1` is easy, `5` is hard.
- **Estimated hours:** rough implementation effort after this audit, not including major historical data discovery surprises.

## Priority Roadmap

| Rank | Task | Class | HomePlanner Importance | QiBiLDiR Reuse | Difficulty | Est. Hours | Why It Matters |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | Generate legacy XML/JSON payloads from normalized config | Refactor | 5 | 5 | 3 | Done | Completed in Phase 1 Task 1; `data/generated` is now produced from `HomePlannerConfig`. |
| 2 | Expand normalized catalog schema to cover every legacy endpoint field | Reconstruct | 5 | 5 | 4 | Done | Completed in Phase 1 Task 2; `LEGACY_SCHEMA_COVERAGE.md` documents supported, ignored, inferred, and unknown fields. |
| 3 | Recover more original UpperView plan, elevation, lot, image, and pricing data | Recover | 5 | 2 | 5 | 20-60 | Most important for historical fidelity, but less reusable because the data is project-specific. |
| 4 | Build a compatibility serializer test suite | Refactor | 5 | 5 | 3 | Done | Completed in Phase 1 Task 3; the suite validates generated files, routes, XML/JSON parseability, required fields, and catalog relationships. |
| 5 | Define buyer workflow state as a serializable model | Refactor | 4 | 5 | 3 | 10-16 | Turns hidden `anewgo.*` runtime state into portable session state for QiBiLDiR. |
| 6 | Add local no-op adapters for favorites, lead capture, email, CRM, and brochure endpoints | Reconstruct | 4 | 4 | 3 | 10-18 | Prevents late-flow failures and documents original user/session behavior without sending real data. |
| 7 | Create a richer reconstructed sample catalog with multiple plans/elevations/options | Reconstruct | 4 | 4 | 2 | Done | Completed in Phase 1 Task 4; the sample catalog now has 3 plans, 6 elevations, multiple options, schemes, lots, and availability states. |
| 8 | Normalize asset manifests for plan images, elevation layers, floorplans, logos, and siteplans | Refactor | 4 | 5 | 3 | 12-20 | Decouples media from hard-coded legacy paths and prepares for a modern rendering/media service. |
| 9 | Document and mock lot/siteplan data | Reconstruct | 4 | 4 | 4 | 14-26 | Lots and availability are central to a new-home sales flow, but the current sample catalog barely exercises them. |
| 10 | Package the legacy adapter as a reusable QiBiLDiR module | Refactor | 3 | 5 | 3 | 8-14 | Moves `static-api-router`, bootstrap, and API contracts toward a clean `homeplanner-legacy-adapter` package. |
| 11 | Replace static route files with a small local data service | Replace | 3 | 5 | 3 | 12-22 | Lets the same data serve legacy XML/JSON and modern resource APIs. |
| 12 | Create modern resource API contracts beside legacy contracts | Refactor | 3 | 5 | 3 | 10-18 | Establishes the future `/api/builders`, `/api/projects`, `/api/plans`, and buyer-session API surface. |
| 13 | Add regression screenshots for core recovered flows | Refactor | 4 | 4 | 2 | 6-10 | Keeps visual behavior stable while internals become configurable. |
| 14 | Extract readable domain modules from the minified recovered bundle | Refactor | 4 | 5 | 5 | 40-90 | High value, but should wait until data contracts and tests are stable. |
| 15 | Rebuild buyer-facing UI as modern components | Replace | 3 | 5 | 5 | 60-120 | Long-term platform direction; not needed before the compatibility/data layer is trustworthy. |
| 16 | Build builder admin tools for catalog/community/content management | Replace | 2 | 5 | 5 | 80-160 | Vital for QiBiLDiR productization, but premature until the data model is settled. |
| 17 | Replace deprecated analytics/social/auth scripts | Replace | 2 | 4 | 2 | 6-12 | Important for production hygiene, not critical to recovered local function. |
| 18 | Keep HTML shell fallback attributes for archive replay | Ignore | 1 | 1 | 1 | 0 | They are harmless compatibility defaults now that config bootstrap overwrites them. |
| 19 | Keep recovered CSS unchanged until component rebuild | Ignore | 2 | 2 | 1 | 0 | Styling should remain stable while the platform/data layers are separated. |
| 20 | Retire `homebuilder.min.js` from production | Replace | 2 | 5 | 5 | 20-40 after rebuild | Correct end state, but only after modern buyer flows fully match the recovered behavior. |

## Recommended Sequence

### Phase 1: Stabilize The Portable Data Boundary

Do these first:

1. Generate legacy XML/JSON from normalized config.
2. Expand normalized schema to cover required legacy fields.
3. Add serializer tests.
4. Add richer reconstructed sample catalog data.

Outcome: the prototype becomes configurable in practice, not just in structure.

### Phase 2: Complete Original Flow Coverage

Do these next:

1. Mock favorites, lead capture, brochure, email, and CRM endpoints.
2. Reconstruct or recover lot/siteplan and availability data.
3. Normalize asset manifests.
4. Add regression screenshots for plan, elevation, option, lot, and lead flows.

Outcome: the recovered HomePlanner can demonstrate the original sales journey without broken late-stage calls.

### Phase 3: Prepare QiBiLDiR Platform Extraction

Do these after the recovered app is stable:

1. Package the legacy adapter.
2. Add modern resource API contracts.
3. Replace static files with a local data service.
4. Define buyer workflow state snapshots and persistence.

Outcome: QiBiLDiR can support both legacy replay and new platform APIs from the same domain model.

### Phase 4: Replace The Old Runtime

Do these last:

1. Extract or rebuild domain modules from `homebuilder.min.js`.
2. Rebuild the buyer UI as modern components.
3. Build the builder admin.
4. Retire the minified runtime from production while preserving it for archive regression tests.

Outcome: a modern multi-builder platform with the recovered HomePlanner preserved as a behavioral reference.

## Classification Summary

| Class | Count | Main Purpose |
| --- | ---: | --- |
| Recover | 1 | Historical fidelity for UpperView-specific content. |
| Reconstruct | 4 | Fill missing backend behavior and test data clearly marked as non-original. |
| Refactor | 9 | Move from archive repair to reusable platform architecture. |
| Replace | 5 | Modernize outdated runtime, APIs, admin, analytics, and UI. |
| Ignore | 2 | Avoid churn where compatibility defaults are harmless. |

## Highest-Leverage Next Task

The next implementation task should be: **recover more original UpperView plan, elevation, lot, image, and pricing data**.

If original data remains unrecoverable, the next best implementation task is a richer clearly reconstructed sample catalog using the expanded schema. That would exercise multiple plans, elevations, lots, filters, inventory states, option dependencies, and image manifests without claiming historical fidelity.

## Risks And Assumptions

- Original UpperView production data may remain unrecoverable; reconstructed data must stay clearly labeled.
- The legacy engine reads exact field names and response shapes, so compatibility tests are more important than visual changes.
- QiBiLDiR should keep the legacy adapter only as a compatibility bridge, not as its long-term production API design.
- New UI features should wait until the data boundary is stable.
