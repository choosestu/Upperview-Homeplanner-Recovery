const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generator = require(path.join(root, "app", "platform", "legacy-payload-generator.js"));
const { loadConfig } = require(path.join(root, "scripts", "generate-legacy-payloads.js"));

const config = loadConfig();
const payloads = generator.generatePayloads(config);

function readGenerated(relativePath) {
  return fs.readFileSync(path.join(root, "data", "generated", relativePath), "utf8");
}

function parseJsonPayload(relativePath) {
  return JSON.parse(readGenerated(relativePath));
}

Object.keys(payloads).forEach((relativePath) => {
  assert.strictEqual(
    readGenerated(relativePath),
    payloads[relativePath],
    `${relativePath} should match the normalized config serializer output`
  );
});

config.api.routes.forEach((route) => {
  assert(route.local.startsWith("data/generated/"), `${route.match} should route to data/generated`);
  assert(fs.existsSync(path.join(root, route.local)), `${route.local} should exist`);
});

const clientXml = readGenerated("homedesigner/getclientdata.generated.xml");
assert(clientXml.includes('dir="upperview"'), "client data should preserve builder key");
assert(clientXml.includes('pageOrder="0,1,2,3,12,5,6,8,9"'), "client data should preserve page order");

const summary = parseJsonPayload("db/scripts/php/getsummary.generated.json");
assert.strictEqual(summary.regiondata[0].locations[0].nbrhoods[0].name, "Grandview Trail");
assert.strictEqual(summary.regiondata[0].locations[0].nbrhoods[0].pricing, 1);

const plansXml = readGenerated("db/scripts/php/getplans.generated.xml");
assert(plansXml.includes('plan id="101"'), "plans XML should include reconstructed sample plan");
assert(plansXml.includes('elev id="1001"'), "plans XML should include reconstructed sample elevation");
assert(plansXml.includes('schemeids="1"'), "plans XML should include scheme linkage");

const elevationDetails = parseJsonPayload("db/scripts/php/getElevationDetails.generated.json");
assert.strictEqual(elevationDetails.planData.elevations[0].id, 1001);
assert.strictEqual(elevationDetails.planData.elevations[0].floorplans.length, 2);
assert.strictEqual(elevationDetails.planData.elevations[0].floorplans[0].opts[1].id, 2001);
assert.strictEqual(elevationDetails.schemes[0].elements[0].colorId, 1);

const floorplanUri = readGenerated("rendering-api/floorplan-uri.generated.txt").trim();
assert.strictEqual(floorplanUri, "app/upperview/images/floorplan-placeholder.svg");

console.log("Compatibility tests passed");
