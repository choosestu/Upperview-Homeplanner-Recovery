// Generates legacy HomePlanner endpoint payloads from HomePlannerConfig.
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.HomePlannerPlatform = root.HomePlannerPlatform || {};
    root.HomePlannerPlatform.legacyPayloadGenerator = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {
  function attr(value) {
    if (value === undefined || value === null) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function text(value) {
    if (value === undefined || value === null) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function boolNum(value) {
    return value ? 1 : 0;
  }

  function firstCommunity(config) {
    return config.communities[0];
  }

  function firstPlan(config) {
    return config.catalog.plans[0];
  }

  function firstElevation(config) {
    var plan = firstPlan(config);
    return plan && plan.elevations ? plan.elevations[0] : undefined;
  }

  function optionPayload(option) {
    return {
      id: option.id,
      name: option.name,
      src: option.src || "",
      src2: option.src2 || "",
      base: boolNum(option.base),
      listOrder: option.listOrder || 0,
      renderOrder: option.renderOrder || 0,
      opt: boolNum(option.opt),
      cost: option.cost || 0,
      size: option.size || 0,
      groupIds: option.groupIds || "",
      fpAlts: option.fpAlts || []
    };
  }

  function floorplans(config) {
    var options = config.catalog.options || [];
    var groups = config.catalog.floorplanGroups || [];
    var floorNumbers = [];

    options.forEach(function (option) {
      if (floorNumbers.indexOf(option.floorNumber) === -1) floorNumbers.push(option.floorNumber);
    });
    floorNumbers.sort(function (a, b) { return a - b; });

    return floorNumbers.map(function (floorNumber) {
      return {
        fnum: floorNumber,
        groups: groups
          .filter(function (group) { return group.floorNumber === floorNumber; })
          .map(function (group) {
            return {
              id: group.id,
              groupType: group.groupType,
              name: group.name,
              designatedPrimary: group.designatedPrimary || 0,
              fpOptIds: (group.optionIds || []).join(",")
            };
          }),
        opts: options
          .filter(function (option) { return option.floorNumber === floorNumber; })
          .sort(function (a, b) { return (a.listOrder || 0) - (b.listOrder || 0); })
          .map(optionPayload)
      };
    });
  }

  function getClientDataXml(config) {
    var builder = config.builder;
    var designer = config.designer || {};
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <designers",
      "    contentStorage=\"" + attr(designer.contentStorage) + "\"",
      "    pageOrder=\"" + attr(designer.pageOrder || config.workflow.defaultPageOrder) + "\"",
      "    bgColor=\"" + attr(designer.bgColor) + "\"",
      "    displayIntPhotos=\"" + attr(designer.displayIntPhotos) + "\"",
      "    displayExtPhotos=\"" + attr(designer.displayExtPhotos) + "\"",
      "    showFilters=\"" + attr(designer.showFilters) + "\"",
      "    showPlansCount=\"" + attr(designer.showPlansCount) + "\"",
      "    allCommunitiesLabel=\"" + attr(designer.allCommunitiesLabel) + "\"",
      "    availableCommunitiesLabel=\"" + attr(designer.availableCommunitiesLabel) + "\"",
      "    quickMoveinLabel=\"" + attr(designer.quickMoveinLabel) + "\" />",
      "  <client",
      "    id=\"" + attr(builder.id) + "\"",
      "    name=\"" + attr(builder.name) + "\"",
      "    altLogo=\"" + attr(builder.altLogo) + "\"",
      "    logo=\"" + attr(builder.logo) + "\"",
      "    dir=\"" + attr(builder.dir || builder.key) + "\"",
      "    website=\"" + attr(builder.website) + "\"",
      "    designApp=\"" + attr(builder.designApp) + "\"",
      "    phone=\"" + attr(builder.phone) + "\"",
      "    email=\"" + attr(builder.email) + "\"",
      "    fbPostUrl=\"" + attr(builder.fbPostUrl) + "\" />",
      "</data>",
      ""
    ].join("\n");
  }

  function getColorLibXml(config) {
    var vendors = config.catalog.vendors || [];
    var colors = config.catalog.colors || [];
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <vendors>",
      vendors.map(function (vendor) {
        return "    <vendor id=\"" + attr(vendor.id) + "\" name=\"" + attr(vendor.name) + "\" />";
      }).join("\n"),
      "  </vendors>",
      "  <colors>",
      colors.map(function (color) {
        return "    <color id=\"" + attr(color.id) + "\" vendorId=\"" + attr(color.vendorId) + "\" ident=\"" + attr(color.ident) + "\" name=\"" + attr(color.name) + "\" hex=\"" + attr(color.hex) + "\" />";
      }).join("\n"),
      "  </colors>",
      "</data>",
      ""
    ].join("\n");
  }

  function getSummaryJson(config) {
    var community = firstCommunity(config);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      maxPhpInt: 2147483647,
      filterCats: [],
      regiondata: [
        {
          id: community.metroId || community.id,
          name: community.metro || community.name,
          state: community.state,
          numInv: 0,
          locations: [
            {
              id: community.metroId || community.id,
              metroId: community.metroId || community.id,
              name: community.city,
              metro: community.metro || community.name,
              state: community.state,
              city: community.city,
              region: community.metro || community.name,
              nbrhoods: [
                {
                  id: community.id,
                  name: community.name,
                  metro: community.metro || community.name,
                  state: community.state,
                  city: community.city,
                  sort: community.sort || "Name",
                  pricing: boolNum(community.pricingEnabled)
                }
              ]
            }
          ]
        }
      ]
    };
  }

  function getNbrhoodsDataXml(config) {
    var community = firstCommunity(config);
    var agent = community.agent || {};
    var paletteIds = (config.catalog.palettes || []).map(function (palette) { return palette.id; }).join(",");
    var schemeIds = (config.catalog.schemes || []).map(function (scheme) { return scheme.id; }).join(",");
    var categories = community.standardFeatures || [];
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <nbrhood",
      "    id=\"" + attr(community.id) + "\"",
      "    name=\"" + attr(community.name) + "\"",
      "    def=\"" + boolNum(community.defaultCommunity) + "\"",
      "    salesapp=\"" + boolNum(community.salesApp) + "\"",
      "    logo=\"" + attr(community.logo) + "\"",
      "    cap=\"" + attr(community.caption || community.name) + "\"",
      "    descr=\"" + attr(community.description) + "\"",
      "    long=\"" + attr(community.longitude) + "\"",
      "    lat=\"" + attr(community.latitude) + "\"",
      "    city=\"" + attr(community.city) + "\"",
      "    state=\"" + attr(community.state) + "\"",
      "    metro=\"" + attr(community.metro || community.name) + "\"",
      "    metroId=\"" + attr(community.metroId || community.id) + "\"",
      "    site=\"" + attr(community.site) + "\"",
      "    active=\"" + boolNum(community.active) + "\"",
      "    pricing=\"" + boolNum(community.pricingEnabled) + "\"",
      "    cutsheet=\"" + attr(community.cutsheet) + "\"",
      "    cmtd=\"" + attr(community.colorMethod) + "\"",
      "    sort=\"" + attr(community.sort) + "\"",
      "    order=\"" + attr(community.order) + "\"",
      "    lotType=\"" + attr(community.lotType) + "\"",
      "    thumb=\"" + attr(community.thumb) + "\"",
      "    imgs=\"" + attr(community.imgs) + "\"",
      "    schemeids=\"" + attr(schemeIds) + "\"",
      "    palids=\"" + attr(paletteIds) + "\"",
      "    url=\"" + attr(community.url) + "\"",
      "    addr1=\"" + attr(community.addr1) + "\"",
      "    addr2=\"" + attr(community.addr2) + "\">",
      "    <agent agentid=\"" + attr(agent.id) + "\" fname=\"" + attr(agent.firstName) + "\" lname=\"" + attr(agent.lastName) + "\" email=\"" + attr(agent.email) + "\" phone=\"" + attr(agent.phone) + "\" />",
      "    <stdfeatures>",
      categories.map(function (category) {
        var features = (category.features || []).map(function (feature) {
          return "        <feature id=\"" + attr(feature.id) + "\" name=\"" + attr(feature.name) + "\" />";
        }).join("\n");
        return "      <category id=\"" + attr(category.id) + "\" name=\"" + attr(category.name) + "\">\n" + features + "\n      </category>";
      }).join("\n"),
      "    </stdfeatures>",
      "    <legend />",
      "  </nbrhood>",
      "</data>",
      ""
    ].join("\n");
  }

  function getPlansXml(config) {
    var community = firstCommunity(config);
    var palettes = config.catalog.palettes || [];
    var schemes = config.catalog.schemes || [];
    var plans = config.catalog.plans || [];
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <nbrhood id=\"" + attr(community.id) + "\" name=\"" + attr(community.name) + "\">",
      "    <palettes>",
      palettes.map(function (palette) {
        var elements = (palette.elements || []).map(function (element) {
          return "        <ele id=\"" + attr(element.id) + "\" cid=\"" + attr(element.colorId) + "\" />";
        }).join("\n");
        return "      <palette id=\"" + attr(palette.id) + "\" name=\"" + attr(palette.name) + "\" layid=\"" + attr(palette.layid) + "\" lay=\"" + attr(palette.lay) + "\" blend=\"" + attr(palette.blend) + "\">\n" + elements + "\n      </palette>";
      }).join("\n"),
      "    </palettes>",
      "    <schemes>",
      schemes.map(function (scheme) {
        var elements = (scheme.elements || []).map(function (element) {
          return "        <ele id=\"" + attr(element.id) + "\" blend=\"" + attr(element.blend) + "\" cid=\"" + attr(element.colorId) + "\">" + text(element.label) + "</ele>";
        }).join("\n");
        return "      <scheme id=\"" + attr(scheme.id) + "\" name=\"" + attr(scheme.name) + "\" cost=\"" + attr(scheme.cost || 0) + "\">\n" + elements + "\n      </scheme>";
      }).join("\n"),
      "    </schemes>",
      plans.map(function (plan) {
        var elevations = (plan.elevations || []).map(function (elevation) {
          return "      <elev id=\"" + attr(elevation.id) + "\" cap=\"" + attr(elevation.caption) + "\" description=\"" + attr(elevation.description) + "\" tag=\"" + attr(elevation.tag) + "\" thumb=\"" + attr(elevation.thumb) + "\" thumbLg=\"" + attr(elevation.thumbLg) + "\" base=\"" + attr(elevation.base) + "\" bed=\"" + attr(elevation.bedrooms) + "\" bath=\"" + attr(elevation.bathrooms) + "\" size=\"" + attr(elevation.squareFeet) + "\" cost=\"" + attr(elevation.basePrice) + "\" schemeids=\"" + attr((elevation.schemeIds || []).join(",")) + "\" cars=\"" + attr(elevation.garageSpaces) + "\" floorCount=\"" + attr(elevation.floorCount) + "\" defaultFloor=\"" + attr(elevation.defaultFloor || plan.defaultFloor || 1) + "\" />";
        }).join("\n");
        return "    <plan id=\"" + attr(plan.id) + "\" name=\"" + attr(plan.name) + "\" videoUrl=\"" + attr(plan.videoUrl) + "\" defaultFloor=\"" + attr(plan.defaultFloor || 1) + "\" imgs=\"" + attr(plan.imgs) + "\" fpimgs=\"" + attr(plan.fpimgs) + "\" def=\"" + boolNum(plan.defaultPlan) + "\" description=\"" + attr(plan.description) + "\">\n" + elevations + "\n    </plan>";
      }).join("\n"),
      "  </nbrhood>",
      "</data>",
      ""
    ].join("\n");
  }

  function elevationDetails(config) {
    var plan = firstPlan(config);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        imgs: plan.imgs || "",
        fpimgs: plan.fpimgs || "",
        elevations: (plan.elevations || []).map(function (elevation) {
          return {
            id: elevation.id,
            elements: elevation.elements || [],
            paletteOverlays: elevation.paletteOverlays || [],
            floorplans: floorplans(config)
          };
        })
      },
      schemes: (config.catalog.schemes || []).map(function (scheme) {
        return {
          id: scheme.id,
          name: scheme.name,
          cost: scheme.cost || 0,
          elements: (scheme.elements || []).map(function (element) {
            return { elementId: element.id, lay: element.label, blendmode: element.blend, colorId: element.colorId };
          })
        };
      }),
      palettes: (config.catalog.palettes || []).map(function (palette) {
        return {
          id: palette.id,
          name: palette.name,
          layid: palette.layid,
          lay: palette.lay,
          blendmode: palette.blend,
          elements: (palette.elements || []).map(function (element) {
            return { id: element.id, cid: element.colorId };
          })
        };
      })
    };
  }

  function elevationElements(config) {
    var plan = firstPlan(config);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        elevations: (plan.elevations || []).map(function (elevation) {
          return { id: elevation.id, elements: elevation.elements || [] };
        })
      }
    };
  }

  function elevationSchemes(config) {
    var elevation = firstElevation(config);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      schemeIds: elevation ? (elevation.schemeIds || []) : []
    };
  }

  function planFloorplans(config) {
    var plan = firstPlan(config);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        elevations: (plan.elevations || []).map(function (elevation) {
          return { id: elevation.id, floorplans: floorplans(config) };
        })
      }
    };
  }

  function elevNbrhoods(config) {
    return config.communities.map(function (community) {
      return { id: community.id, name: community.name, status: config.catalog.status || "generated" };
    });
  }

  function interiorsXml(config) {
    var community = firstCommunity(config);
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <nbrhood id=\"" + attr(community.id) + "\" name=\"" + attr(community.name) + "\">",
      "    <interiors />",
      "  </nbrhood>",
      "</data>",
      ""
    ].join("\n");
  }

  function stringifyJson(payload) {
    return JSON.stringify(payload, null, 2) + "\n";
  }

  function generatePayloads(config) {
    return {
      "homedesigner/getclientdata.generated.xml": getClientDataXml(config),
      "db/scripts/php/getcolorlib.generated.xml": getColorLibXml(config),
      "db/scripts/php/getsummary.generated.json": stringifyJson(getSummaryJson(config)),
      "db/scripts/php/getnbrhoodsdata.generated.xml": getNbrhoodsDataXml(config),
      "db/scripts/php/getplans.generated.xml": getPlansXml(config),
      "db/scripts/php/getElevationDetails.generated.json": stringifyJson(elevationDetails(config)),
      "db/scripts/php/getElevationElements.generated.json": stringifyJson(elevationElements(config)),
      "db/scripts/php/getElevationSchemes.generated.json": stringifyJson(elevationSchemes(config)),
      "db/scripts/php/getPlanFloorplans.generated.json": stringifyJson(planFloorplans(config)),
      "db/scripts/php/getelevnbrhoods.generated.json": stringifyJson(elevNbrhoods(config)),
      "db/scripts/php/getinteriors.generated.xml": interiorsXml(config),
      "rendering-api/floorplan-uri.generated.txt": (config.catalog.rendering && config.catalog.rendering.floorplanUri ? config.catalog.rendering.floorplanUri : "") + "\n"
    };
  }

  return {
    generatePayloads: generatePayloads
  };
}));
