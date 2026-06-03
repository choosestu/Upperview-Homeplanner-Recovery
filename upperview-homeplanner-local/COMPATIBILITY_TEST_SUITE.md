# Compatibility Test Suite

Status: Phase 1 Task 3 complete.

Run:

```powershell
node scripts\generate-legacy-payloads.js
node tests\compatibility.test.js
```

## Purpose

The suite protects the recovered HomePlanner runtime while the normalized config and generated payload layer evolve.

It validates:

- every generated endpoint file exists
- generated files exactly match `legacy-payload-generator.js`
- every active route points to `data/generated`
- late-flow routes are marked as in-browser mocks and include local no-op responses
- the router intercepts mocked XHR requests without hitting the network
- the route manifest still exposes the legacy endpoints expected by `homebuilder.min.js`
- XML files are structurally well formed enough for jQuery XML traversal
- JSON files parse cleanly
- required client, designer, color, summary, neighborhood, plan, elevation, scheme, palette, option, interior, and rendering fields exist
- plan/elevation/scheme/palette/color/option/group/lot relationships remain valid
- richer optional schema fields still serialize when configured
- the reconstructed sample catalog has at least 3 plans, multiple elevations per plan, multiple color packages/options, lots, inventory, and varied availability states

## Snapshot Manifest

`tests/compatibility-snapshots.json` snapshots the generated endpoint list and route matches.

Update it only when intentionally adding, removing, or renaming a legacy endpoint or generated payload file. It intentionally does not snapshot complete payload contents, because recovered or reconstructed catalog data will continue to change.

## Failure Meaning

| Failure Area | Likely Cause |
| --- | --- |
| Generated payload list | Serializer output changed without route/test update. |
| Missing generated file | `node scripts\generate-legacy-payloads.js` was not run, or a route points to the wrong path. |
| Route manifest | A legacy endpoint was removed, renamed, or routed away from `data/generated`. |
| Mock route manifest | A late-flow endpoint was removed, renamed, or given no local mock response. |
| Mock XHR adapter | The browser router no longer intercepts user/session POST flows locally. |
| XML malformed | Serializer emitted broken tag structure or unserialized object text. |
| JSON malformed | Serializer emitted invalid JSON or a generated file was edited manually. |
| Required field missing | A field read by the recovered runtime was removed or renamed. |
| Relationship failure | Plan, elevation, lot, scheme, palette, color, option, or group IDs no longer line up. |
