const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generator = require(path.join(root, "app", "platform", "legacy-payload-generator.js"));
const { loadConfig } = require(path.join(root, "scripts", "generate-legacy-payloads.js"));

const config = loadConfig();
const payloads = generator.generatePayloads(config);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

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

const richConfig = clone(config);
richConfig.builder.parentId = 80;
richConfig.builder.selfDir = "upperview";
richConfig.builder.disclaimer = "Schema coverage test disclaimer";
richConfig.builder.contact = { firstName: "Schema", lastName: "Contact", email: "schema@example.test" };
richConfig.designer.bundle = "coverage-bundle";
richConfig.designer.requireRegister = 1;
richConfig.designer.plansSubtitle = "Schema Coverage Plans";
richConfig.designer.splashAllBtnTxt = "Schema All Plans";
richConfig.designer.crm = {
  enabled: true,
  LassoUID: "lasso-test",
  ClientID: "client-test",
  ProjectID: "project-test",
  community: "Grandview Trail",
  planName: "Schema Plan",
  domainAccountId: "domain-test",
  renderingApp: "upperview",
  renderingAppAnswer: "yes"
};
richConfig.catalog.filterCats = [{ id: 7, name: "Bedrooms", filters: [{ id: 8, name: "4 Bedrooms" }] }];
richConfig.communities[0].crmId = 1234;
richConfig.communities[0].numInv = 2;
richConfig.communities[0].numHomeSitesOnly = 1;
richConfig.communities[0].filterIds = "8";
richConfig.communities[0].landPhotos = [{ id: 1, src: "land.jpg", status: "reconstructed" }];
richConfig.communities[0].inventory = [{ id: 77, planId: 101, elevId: 1001, status: "available", lotId: 1 }];
richConfig.catalog.schemes[0].elements[0].palId = 10;
richConfig.catalog.schemes[0].elements[0].palSelId = 11;
richConfig.catalog.schemes[0].elements[0].overlayName = "Trim Overlay";
richConfig.catalog.schemes[0].elements[0].ovl = "trim.png";
richConfig.catalog.schemes[0].elements[0].swatch = "trim-swatch.png";
richConfig.catalog.palettes[0].elements[0].palId = 10;
richConfig.catalog.palettes[0].elements[0].palSelId = 11;
richConfig.catalog.palettes[0].elements[0].overlayName = "Trim Overlay";
richConfig.catalog.palettes[0].elements[0].ovl = "trim.png";
richConfig.catalog.palettes[0].elements[0].swatch = "trim-swatch.png";
richConfig.catalog.plans[0].fpPhotos = "floorplan-photo.jpg";
richConfig.catalog.plans[0].filterIds = "8";
richConfig.catalog.plans[0].elevations[0].baseImg = "base.png";
richConfig.catalog.plans[0].elevations[0].baseUrl = "base-url";
richConfig.catalog.options[1].description = "Requires an alternate kitchen layout.";
richConfig.catalog.options[1].href = "option-detail.html";
richConfig.catalog.options[1].dependent = "2000";
richConfig.catalog.options[1].dependentGroupIds = "1";
richConfig.catalog.options[1].primary = 1;
richConfig.catalog.options[1].choiceId = "open-layout";
richConfig.catalog.options[1].excludeIds = "2003";
richConfig.catalog.options[1].includeIds = "2000";
richConfig.catalog.options[1].fpAlts = [{ id: 3001, src: "alt-floorplan.svg", status: "reconstructed" }];
richConfig.catalog.interiors = [
  {
    planId: 101,
    id: 501,
    name: "Reconstructed Interior Room",
    src: "interior.jpg",
    thumb: "interior-thumb.jpg",
    modelId: 1001,
    floor: 1,
    sort: 1,
    selections: [{ id: 1, name: "Sample Finish", status: "reconstructed" }]
  }
];

const richPayloads = generator.generatePayloads(richConfig);
assert(richPayloads["homedesigner/getclientdata.generated.xml"].includes('parentId="80"'), "client serializer should support parentId");
assert(richPayloads["homedesigner/getclientdata.generated.xml"].includes('bundle="coverage-bundle"'), "designer serializer should support bundle flags");
assert(richPayloads["homedesigner/getclientdata.generated.xml"].includes('<crm LassoUID="lasso-test"'), "designer serializer should support CRM child data");
assert(richPayloads["db/scripts/php/getnbrhoodsdata.generated.xml"].includes('crmId="1234"'), "neighborhood serializer should support crmId");
assert(richPayloads["db/scripts/php/getnbrhoodsdata.generated.xml"].includes('<lot id="1"'), "neighborhood serializer should support lots");
assert(richPayloads["db/scripts/php/getnbrhoodsdata.generated.xml"].includes('<inventory id="77"'), "neighborhood serializer should support inventory passthrough");
assert(richPayloads["db/scripts/php/getplans.generated.xml"].includes('fpPhotos="floorplan-photo.jpg"'), "plan serializer should support floorplan photos");
assert(richPayloads["db/scripts/php/getplans.generated.xml"].includes('ovlname="Trim Overlay"'), "scheme serializer should support overlay metadata");

const richSummary = JSON.parse(richPayloads["db/scripts/php/getsummary.generated.json"]);
assert.strictEqual(richSummary.filterCats[0].id, 7, "summary serializer should support filter categories");
assert.strictEqual(richSummary.regiondata[0].locations[0].nbrhoods[0].numHomeSitesOnly, 1, "summary serializer should support inventory counts");

const richElevationDetails = JSON.parse(richPayloads["db/scripts/php/getElevationDetails.generated.json"]);
assert.strictEqual(richElevationDetails.planData.fpPhotos, "floorplan-photo.jpg");
assert.strictEqual(richElevationDetails.schemes[0].elements[0].palSelId, 11);
assert.strictEqual(richElevationDetails.planData.elevations[0].floorplans[0].opts[1].dependent, "2000");
assert.strictEqual(richElevationDetails.planData.elevations[0].floorplans[0].opts[1].fpAlts[0].id, 3001);
assert(richPayloads["db/scripts/php/getinteriors.generated.xml"].includes('<room planid="101" id="501"'), "interiors serializer should support rooms");

console.log("Compatibility tests passed");
