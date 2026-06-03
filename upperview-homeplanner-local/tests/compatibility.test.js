const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generator = require(path.join(root, "app", "platform", "legacy-payload-generator.js"));
const { loadConfig } = require(path.join(root, "scripts", "generate-legacy-payloads.js"));
const snapshots = require("./compatibility-snapshots.json");

const config = loadConfig();
const payloads = generator.generatePayloads(config);

const expectedPayloadPaths = [
  "homedesigner/getclientdata.generated.xml",
  "db/scripts/php/getcolorlib.generated.xml",
  "db/scripts/php/getsummary.generated.json",
  "db/scripts/php/getnbrhoodsdata.generated.xml",
  "db/scripts/php/getplans.generated.xml",
  "db/scripts/php/getElevationDetails.generated.json",
  "db/scripts/php/getElevationElements.generated.json",
  "db/scripts/php/getElevationSchemes.generated.json",
  "db/scripts/php/getPlanFloorplans.generated.json",
  "db/scripts/php/getelevnbrhoods.generated.json",
  "db/scripts/php/getinteriors.generated.xml",
  "rendering-api/floorplan-uri.generated.txt"
];

const requiredRoutes = [
  "/homedesigner/getclientdata.php",
  "/db/scripts/php/getcolorlib.php",
  "/db/scripts/php/getsummary.php",
  "/db/scripts/php/getnbrhoodsdata.php",
  "/db/scripts/php/getplans.php",
  "/db/scripts/php/getElevationDetails.php",
  "/db/scripts/php/getElevationElements.php",
  "/db/scripts/php/getElevationSchemes.php",
  "/db/scripts/php/getPlanFloorplans.php",
  "/db/scripts/php/getelevnbrhoods.php",
  "/db/scripts/php/getinteriors.php",
  "/api/v1/fp/"
];

function test(name, fn) {
  try {
    fn();
    console.log("ok - " + name);
  } catch (error) {
    error.message = name + ": " + error.message;
    throw error;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizedArray(value) {
  return JSON.parse(JSON.stringify(value));
}

function readGenerated(relativePath) {
  return fs.readFileSync(path.join(root, "data", "generated", relativePath), "utf8");
}

function parseJsonPayload(relativePath) {
  try {
    return JSON.parse(readGenerated(relativePath));
  } catch (error) {
    throw new Error(relativePath + " is malformed JSON: " + error.message);
  }
}

function attrsFrom(xml, tagName, predicate) {
  const regex = new RegExp("<" + tagName + "\\b([^>]*)>", "g");
  const matches = [];
  let match;
  while ((match = regex.exec(xml))) {
    if (!predicate || predicate(match[0], match[1])) matches.push(parseAttrs(match[1]));
  }
  return matches;
}

function parseAttrs(attrText) {
  const attrs = {};
  const regex = /([A-Za-z0-9_:-]+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(attrText))) attrs[match[1]] = match[2];
  return attrs;
}

function firstAttrs(xml, tagName, predicate) {
  const attrs = attrsFrom(xml, tagName, predicate);
  assert(attrs.length > 0, "missing <" + tagName + "> element");
  return attrs[0];
}

function assertFields(object, fields, label) {
  fields.forEach((field) => {
    assert(
      Object.prototype.hasOwnProperty.call(object, field),
      label + " missing required field `" + field + "`"
    );
  });
}

function assertAttrs(attrs, fields, label) {
  fields.forEach((field) => {
    assert(
      Object.prototype.hasOwnProperty.call(attrs, field),
      label + " missing required attribute `" + field + "`"
    );
  });
}

function assertXmlLooksWellFormed(xml, label) {
  assert(xml.trim().startsWith("<?xml"), label + " should start with XML declaration");
  assert(!xml.includes("[object Object]"), label + " contains an unserialized object");

  const stack = [];
  const tagRegex = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<\/?([A-Za-z0-9_:-]+)\b[^>]*>/g;
  let match;
  while ((match = tagRegex.exec(xml))) {
    const raw = match[0];
    const tagName = match[1];
    if (!tagName || raw.startsWith("<!--") || raw.startsWith("<?") || raw.startsWith("<![CDATA[")) continue;
    if (raw.startsWith("</")) {
      const open = stack.pop();
      assert.strictEqual(open, tagName, label + " has mismatched closing tag </" + tagName + ">");
    } else if (!raw.endsWith("/>")) {
      stack.push(tagName);
    }
  }
  assert.deepStrictEqual(stack, [], label + " has unclosed XML tags");
}

function ids(values) {
  return normalizedArray(values.map((value) => Number(value.id)));
}

function csvIds(value) {
  if (value === undefined || value === null || value === "") return [];
  return String(value).split(",").map((id) => Number(id.trim())).filter((id) => !Number.isNaN(id));
}

function catalogIds() {
  const planIds = ids(config.catalog.plans);
  const elevationIds = config.catalog.plans.flatMap((plan) => ids(plan.elevations || []));
  const schemeIds = ids(config.catalog.schemes);
  const paletteIds = ids(config.catalog.palettes);
  const colorIds = ids(config.catalog.colors);
  const optionIds = ids(config.catalog.options);
  const groupIds = ids(config.catalog.floorplanGroups);
  const communityIds = ids(config.communities);
  return { planIds, elevationIds, schemeIds, paletteIds, colorIds, optionIds, groupIds, communityIds };
}

test("reconstructed sample catalog is rich enough for buyer-flow demos", () => {
  const plans = config.catalog.plans || [];
  const elevations = plans.flatMap((plan) => plan.elevations || []);
  const options = config.catalog.options || [];
  const schemes = config.catalog.schemes || [];
  const palettes = config.catalog.palettes || [];
  const lots = config.communities.flatMap((community) => community.lots || []);
  const inventory = config.communities.flatMap((community) => community.inventory || []);
  const availabilityStates = new Set(
    plans.map((plan) => plan.availabilityStatus)
      .concat(elevations.map((elevation) => elevation.availabilityStatus))
      .concat(lots.map((lot) => lot.sold))
      .filter(Boolean)
  );

  assert(plans.length >= 3, "sample catalog should include at least 3 reconstructed plans");
  plans.forEach((plan) => {
    assert(plan.name.startsWith("Reconstructed "), "plan " + plan.id + " should be clearly marked reconstructed");
    assert((plan.elevations || []).length >= 2, "plan " + plan.id + " should include multiple elevations");
  });
  assert(elevations.length >= 6, "sample catalog should include at least 6 reconstructed elevations");
  assert(options.length >= 6, "sample catalog should include multiple floorplan/options records");
  assert(schemes.length >= 3, "sample catalog should include multiple color schemes");
  assert(palettes.length >= 3, "sample catalog should include multiple palettes");
  assert(lots.length >= 6, "sample catalog should include lot/siteplan examples");
  assert(inventory.length >= 2, "sample catalog should include quick move-in inventory examples");
  ["available", "inventory", "hold", "sold", "model", "quick-move-in"].forEach((state) => {
    assert(availabilityStates.has(state), "sample catalog should include availability state `" + state + "`");
  });
});

test("generated payload file list is stable", () => {
  assert.deepStrictEqual(Object.keys(payloads).sort(), expectedPayloadPaths.slice().sort());
  assert.deepStrictEqual(expectedPayloadPaths.slice().sort(), snapshots.generatedPayloadPaths.slice().sort());
});

test("generated files match serializer output", () => {
  expectedPayloadPaths.forEach((relativePath) => {
    assert.strictEqual(
      readGenerated(relativePath),
      payloads[relativePath],
      relativePath + " should match legacy-payload-generator output"
    );
  });
});

test("all generated endpoint files exist", () => {
  expectedPayloadPaths.forEach((relativePath) => {
    assert(fs.existsSync(path.join(root, "data", "generated", relativePath)), relativePath + " is missing");
  });
});

test("route manifest remains compatible", () => {
  const routeMatches = normalizedArray(config.api.routes.map((route) => route.match).sort());
  assert.deepStrictEqual(routeMatches, requiredRoutes.slice().sort());
  assert.deepStrictEqual(routeMatches, snapshots.routeMatches.slice().sort());

  config.api.routes.forEach((route) => {
    assert(route.local.startsWith("data/generated/"), route.match + " should route to data/generated");
    assert(fs.existsSync(path.join(root, route.local)), route.match + " points to missing file " + route.local);
    assert(["xml", "json", "text"].includes(route.format), route.match + " has unsupported format " + route.format);
  });
});

test("XML payloads are well formed enough for jQuery traversal", () => {
  expectedPayloadPaths.filter((relativePath) => relativePath.endsWith(".xml")).forEach((relativePath) => {
    assertXmlLooksWellFormed(readGenerated(relativePath), relativePath);
  });
});

test("JSON payloads parse", () => {
  expectedPayloadPaths.filter((relativePath) => relativePath.endsWith(".json")).forEach(parseJsonPayload);
});

test("client boot XML has required legacy fields", () => {
  const xml = readGenerated("homedesigner/getclientdata.generated.xml");
  const designers = firstAttrs(xml, "designers");
  const client = firstAttrs(xml, "client");

  assertAttrs(designers, [
    "contentStorage",
    "pageOrder",
    "bgColor",
    "displayIntPhotos",
    "displayExtPhotos",
    "showFilters",
    "showPlansCount",
    "allCommunitiesLabel",
    "availableCommunitiesLabel",
    "quickMoveinLabel"
  ], "client boot <designers>");
  assertAttrs(client, ["id", "name", "altLogo", "logo", "dir", "website", "designApp", "phone", "email", "fbPostUrl"], "client boot <client>");
  assert.strictEqual(client.dir, config.builder.dir || config.builder.key);
});

test("color library XML has vendors and colors with required fields", () => {
  const xml = readGenerated("db/scripts/php/getcolorlib.generated.xml");
  const vendors = attrsFrom(xml, "vendor");
  const colors = attrsFrom(xml, "color");

  assert(vendors.length > 0, "color library should include vendors");
  assert(colors.length > 0, "color library should include colors");
  vendors.forEach((vendor) => assertAttrs(vendor, ["id", "name"], "vendor"));
  colors.forEach((color) => assertAttrs(color, ["id", "vendorId", "ident", "name", "hex"], "color"));

  const vendorIds = ids(vendors);
  colors.forEach((color) => assert(vendorIds.includes(Number(color.vendorId)), "color " + color.id + " references missing vendor " + color.vendorId));
});

test("summary JSON has required region/location/community fields", () => {
  const summary = parseJsonPayload("db/scripts/php/getsummary.generated.json");
  assertFields(summary, ["maxPhpInt", "filterCats", "regiondata"], "summary root");
  assert(Array.isArray(summary.regiondata) && summary.regiondata.length > 0, "summary.regiondata should not be empty");

  summary.regiondata.forEach((region) => {
    assertFields(region, ["id", "name", "state", "numInv", "locations"], "summary region");
    assert(Array.isArray(region.locations) && region.locations.length > 0, "summary region should include locations");
    region.locations.forEach((location) => {
      assertFields(location, ["id", "metroId", "name", "metro", "state", "city", "region", "nbrhoods"], "summary location");
      assert(Array.isArray(location.nbrhoods) && location.nbrhoods.length > 0, "summary location should include neighborhoods");
      location.nbrhoods.forEach((community) => {
        assertFields(community, ["id", "name", "metro", "state", "city", "sort", "pricing"], "summary neighborhood");
      });
    });
  });
});

test("neighborhood XML has required community fields and valid lot references", () => {
  const xml = readGenerated("db/scripts/php/getnbrhoodsdata.generated.xml");
  const nbrhoods = attrsFrom(xml, "nbrhood");
  const { planIds, elevationIds } = catalogIds();
  const lotStatuses = new Set();

  assert(nbrhoods.length > 0, "neighborhood XML should include neighborhoods");
  nbrhoods.forEach((nbrhood) => {
    assertAttrs(nbrhood, ["id", "name", "def", "salesapp", "active", "pricing", "city", "state", "metro", "metroId", "cmtd", "sort", "order", "lotType", "schemeids", "palids"], "neighborhood");
  });

  const agent = firstAttrs(xml, "agent");
  assertAttrs(agent, ["agentid", "fname", "lname", "email", "phone"], "agent");

  attrsFrom(xml, "lot").forEach((lot) => {
    assertAttrs(lot, ["id", "sold", "planId", "elevId"], "lot");
    assert(planIds.includes(Number(lot.planId)), "lot " + lot.id + " references missing plan " + lot.planId);
    assert(elevationIds.includes(Number(lot.elevId)), "lot " + lot.id + " references missing elevation " + lot.elevId);
    lotStatuses.add(lot.sold);
  });
  ["available", "inventory", "hold", "sold", "model"].forEach((status) => {
    assert(lotStatuses.has(status), "neighborhood lots should include `" + status + "` availability");
  });
});

test("plans XML preserves plan/elevation/scheme/palette relationships", () => {
  const xml = readGenerated("db/scripts/php/getplans.generated.xml");
  const plans = attrsFrom(xml, "plan");
  const elevations = attrsFrom(xml, "elev");
  const schemes = attrsFrom(xml, "scheme");
  const palettes = attrsFrom(xml, "palette");
  const { schemeIds, paletteIds, colorIds } = catalogIds();

  assert(plans.length > 0, "plans XML should include at least one plan");
  assert(elevations.length > 0, "plans XML should include at least one elevation");
  assert(schemes.length > 0, "plans XML should include schemes");
  assert(palettes.length > 0, "plans XML should include palettes");
  assert.strictEqual(plans.length, config.catalog.plans.length, "plans XML should include every reconstructed plan");
  assert.strictEqual(elevations.length, config.catalog.plans.flatMap((plan) => plan.elevations || []).length, "plans XML should include every reconstructed elevation");

  plans.forEach((plan) => assertAttrs(plan, ["id", "name", "defaultFloor", "imgs", "fpimgs", "def", "description"], "plan"));
  elevations.forEach((elevation) => {
    assertAttrs(elevation, ["id", "cap", "description", "tag", "thumb", "thumbLg", "base", "bed", "bath", "size", "cost", "schemeids", "cars", "floorCount", "defaultFloor"], "elevation");
    csvIds(elevation.schemeids).forEach((schemeId) => assert(schemeIds.includes(schemeId), "elevation " + elevation.id + " references missing scheme " + schemeId));
  });
  schemes.forEach((scheme) => assertAttrs(scheme, ["id", "name", "cost"], "scheme"));
  palettes.forEach((palette) => assertAttrs(palette, ["id", "name", "layid", "lay", "blend"], "palette"));
  assert.deepStrictEqual(ids(schemes).sort((a, b) => a - b), schemeIds.slice().sort((a, b) => a - b));
  assert.deepStrictEqual(ids(palettes).sort((a, b) => a - b), paletteIds.slice().sort((a, b) => a - b));

  attrsFrom(xml, "ele").forEach((element) => {
    if (Object.prototype.hasOwnProperty.call(element, "cid") && element.cid !== "") {
      assert(colorIds.includes(Number(element.cid)), "scheme/palette element references missing color " + element.cid);
    }
  });
});

test("lazy elevation JSON payloads preserve required structures", () => {
  const details = parseJsonPayload("db/scripts/php/getElevationDetails.generated.json");
  const elements = parseJsonPayload("db/scripts/php/getElevationElements.generated.json");
  const schemes = parseJsonPayload("db/scripts/php/getElevationSchemes.generated.json");
  const floorplans = parseJsonPayload("db/scripts/php/getPlanFloorplans.generated.json");

  [details, elements, floorplans].forEach((payload) => {
    assertFields(payload, ["planData"], "lazy payload root");
    assertFields(payload.planData, ["elevations"], "lazy planData");
    assert(Array.isArray(payload.planData.elevations), "lazy planData.elevations should be an array");
  });
  assertFields(schemes, ["schemeIds"], "elevation schemes root");
  assert(Array.isArray(schemes.schemeIds), "schemeIds should be an array");

  const expectedElevationIds = normalizedArray(catalogIds().elevationIds.slice().sort((a, b) => a - b));
  assert.deepStrictEqual(
    details.planData.elevations.map((elevation) => Number(elevation.id)).sort((a, b) => a - b),
    expectedElevationIds,
    "elevation details should include all reconstructed elevations"
  );
  assert.deepStrictEqual(
    elements.planData.elevations.map((elevation) => Number(elevation.id)).sort((a, b) => a - b),
    expectedElevationIds,
    "elevation elements should include all reconstructed elevations"
  );
  assert.deepStrictEqual(
    floorplans.planData.elevations.map((elevation) => Number(elevation.id)).sort((a, b) => a - b),
    expectedElevationIds,
    "plan floorplans should include all reconstructed elevations"
  );
});

test("floorplan option relationships are intact", () => {
  const details = parseJsonPayload("db/scripts/php/getElevationDetails.generated.json");
  const { optionIds, groupIds } = catalogIds();

  details.planData.elevations.forEach((elevation) => {
    assert(Array.isArray(elevation.floorplans), "elevation " + elevation.id + " should include floorplans");
    elevation.floorplans.forEach((floorplan) => {
      assertFields(floorplan, ["fnum", "groups", "opts"], "floorplan");
      floorplan.groups.forEach((group) => {
        assertFields(group, ["id", "groupType", "name", "designatedPrimary", "fpOptIds"], "floorplan group");
        assert(groupIds.includes(Number(group.id)), "floorplan group " + group.id + " is missing from config");
        csvIds(group.fpOptIds).forEach((optionId) => assert(optionIds.includes(optionId), "floorplan group " + group.id + " references missing option " + optionId));
      });
      floorplan.opts.forEach((option) => {
        assertFields(option, ["id", "name", "src", "src2", "base", "listOrder", "renderOrder", "opt", "cost", "size", "groupIds", "fpAlts"], "floorplan option");
        assert(optionIds.includes(Number(option.id)), "generated option " + option.id + " is missing from config");
        csvIds(option.groupIds).forEach((groupId) => assert(groupIds.includes(groupId), "option " + option.id + " references missing group " + groupId));
        csvIds(option.dependent).forEach((optionId) => assert(optionIds.includes(optionId), "option " + option.id + " depends on missing option " + optionId));
      });
    });
  });
});

test("elevation neighborhood and interiors endpoints are parseable", () => {
  const elevNbrhoods = parseJsonPayload("db/scripts/php/getelevnbrhoods.generated.json");
  assert(Array.isArray(elevNbrhoods), "getelevnbrhoods should return an array");
  elevNbrhoods.forEach((community) => assertFields(community, ["id", "name", "status"], "elevation-neighborhood summary"));

  const interiorsXml = readGenerated("db/scripts/php/getinteriors.generated.xml");
  assertXmlLooksWellFormed(interiorsXml, "getinteriors.generated.xml");
  const interiorsCommunity = firstAttrs(interiorsXml, "nbrhood");
  assertAttrs(interiorsCommunity, ["id", "name"], "interiors neighborhood");
});

test("rendering URI endpoint is non-empty text", () => {
  const floorplanUri = readGenerated("rendering-api/floorplan-uri.generated.txt").trim();
  assert(floorplanUri.length > 0, "floorplan rendering URI should not be empty");
  assert.strictEqual(floorplanUri, config.catalog.rendering.floorplanUri);
});

test("expanded schema serializer coverage remains supported", () => {
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
});

console.log("Compatibility tests passed");
