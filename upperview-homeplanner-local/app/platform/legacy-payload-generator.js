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

  function isDefined(value) {
    return value !== undefined && value !== null;
  }

  function attrs(values, omitEmpty) {
    return Object.keys(values).filter(function (key) {
      if (!isDefined(values[key])) return false;
      if (!omitEmpty) return true;
      return values[key] !== "" && values[key] !== false && values[key] !== 0;
    }).map(function (key) {
      return key + "=\"" + attr(values[key]) + "\"";
    }).join(" ");
  }

  function joinAttrs() {
    return Array.prototype.slice.call(arguments).filter(Boolean).join(" ");
  }

  function addDefined(target, source, keys) {
    keys.forEach(function (key) {
      if (isDefined(source[key])) target[key] = source[key];
    });
    return target;
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

  function allElevations(config) {
    var elevations = [];
    (config.catalog.plans || []).forEach(function (plan) {
      (plan.elevations || []).forEach(function (elevation) {
        var copy = {};
        Object.keys(elevation).forEach(function (key) { copy[key] = elevation[key]; });
        copy.planId = plan.id;
        copy.planName = plan.name;
        elevations.push(copy);
      });
    });
    return elevations;
  }

  function optionPayload(option) {
    var payload = {
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
    return addDefined(payload, option, [
      "type",
      "status",
      "description",
      "href",
      "dependent",
      "dependentGroupIds",
      "primary",
      "designatedPrimary",
      "choiceId",
      "excludeIds",
      "includeIds",
      "sort",
      "sku",
      "pricingStatus",
      "availabilityStatus"
    ]);
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
    var designerRequiredAttrs = {
      contentStorage: designer.contentStorage,
      pageOrder: designer.pageOrder || config.workflow.defaultPageOrder,
      bgColor: designer.bgColor,
      displayIntPhotos: designer.displayIntPhotos,
      displayExtPhotos: designer.displayExtPhotos,
      showFilters: designer.showFilters,
      showPlansCount: designer.showPlansCount,
      allCommunitiesLabel: designer.allCommunitiesLabel,
      availableCommunitiesLabel: designer.availableCommunitiesLabel,
      quickMoveinLabel: designer.quickMoveinLabel
    };
    var designerOptionalAttrs = {
      bundle: designer.bundle,
      customRegMsg: designer.customRegMsg,
      requireRegister: designer.requireRegister,
      designButtonOnly: designer.designButtonOnly,
      plansSubtitle: designer.plansSubtitle,
      elevTitleSqft: designer.elevTitleSqft,
      elevTitleBr: designer.elevTitleBr,
      elevTitleBath: designer.elevTitleBath,
      omitCityInBrochure: designer.omitCityInBrochure,
      omitLocationFilter: designer.omitLocationFilter,
      presetPlanFilter: designer.presetPlanFilter,
      useMetric: designer.useMetric,
      lotSort: designer.lotSort,
      showAvailableHomes: designer.showAvailableHomes,
      showBrochureElevDetails: designer.showBrochureElevDetails,
      showBrochureNbrhoodDetails: designer.showBrochureNbrhoodDetails,
      plainStart: designer.plainStart,
      showCities: designer.showCities,
      showAvailableCommunities: designer.showAvailableCommunities,
      communityIsColorScheme: designer.communityIsColorScheme,
      showAllBtn: designer.showAllBtn,
      nbrhoodsBg: designer.nbrhoodsBg,
      allPlansImage: designer.allPlansImage,
      inventoryImage: designer.inventoryImage,
      designMeImage: designer.designMeImage,
      splashAllBtnHide: designer.splashAllBtnHide,
      splashAllBtnTxt: designer.splashAllBtnTxt,
      splashAllBtnSubtxt: designer.splashAllBtnSubtxt,
      splashAllBtnImage: designer.splashAllBtnImage,
      splashAllBtnVerb: designer.splashAllBtnVerb,
      splashDsnBtnHide: designer.splashDsnBtnHide,
      splashDsnBtnTxt: designer.splashDsnBtnTxt,
      splashDsnBtnSubtxt: designer.splashDsnBtnSubtxt,
      splashDsnBtnImage: designer.splashDsnBtnImage,
      splashDsnBtnVerb: designer.splashDsnBtnVerb,
      splashInvBtnHide: designer.splashInvBtnHide,
      splashInvBtnTxt: designer.splashInvBtnTxt,
      splashInvBtnSubtxt: designer.splashInvBtnSubtxt,
      splashInvBtnImage: designer.splashInvBtnImage,
      splashInvBtnVerb: designer.splashInvBtnVerb
    };
    var clientRequiredAttrs = {
      id: builder.id,
      name: builder.name,
      altLogo: builder.altLogo,
      logo: builder.logo,
      dir: builder.dir || builder.key,
      website: builder.website,
      designApp: builder.designApp,
      phone: builder.phone,
      email: builder.email,
      fbPostUrl: builder.fbPostUrl
    };
    var clientOptionalAttrs = {
      parentId: builder.parentId,
      selfDir: builder.selfDir,
      disclaimer: builder.disclaimer,
      "contact-fname": builder.contact && builder.contact.firstName,
      "contact-lname": builder.contact && builder.contact.lastName,
      "contact-email": builder.contact && builder.contact.email
    };
    var crm = designer.crm || {};
    var crmLine = crm.enabled ? "    <crm " + attrs({
      LassoUID: crm.LassoUID,
      ClientID: crm.ClientID,
      ProjectID: crm.ProjectID,
      community: crm.community,
      planName: crm.planName,
      domainAccountId: crm.domainAccountId,
      renderingApp: crm.renderingApp,
      renderingAppAnswer: crm.renderingAppAnswer
    }) + " />" : "";
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <designers " + joinAttrs(attrs(designerRequiredAttrs), attrs(designerOptionalAttrs, true)) + " />",
      crmLine,
      "  <client " + joinAttrs(attrs(clientRequiredAttrs), attrs(clientOptionalAttrs, true)) + " />",
      "</data>",
      ""
    ].filter(function (line) { return line !== ""; }).join("\n");
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
    var nbrhoodSummary = addDefined({
      id: community.id,
      name: community.name,
      metro: community.metro || community.name,
      state: community.state,
      city: community.city,
      sort: community.sort || "Name",
      pricing: boolNum(community.pricingEnabled)
    }, community, [
      "numInv",
      "numHomeSitesOnly",
      "numPlans",
      "numElevs",
      "minSqft",
      "maxSqft",
      "minBed",
      "maxBed",
      "minBath",
      "maxBath",
      "minPrice",
      "maxPrice",
      "filterIds",
      "tags",
      "url"
    ]);
    var locationSummary = addDefined({
      id: community.metroId || community.id,
      metroId: community.metroId || community.id,
      name: community.city,
      metro: community.metro || community.name,
      state: community.state,
      city: community.city,
      region: community.metro || community.name,
      nbrhoods: [nbrhoodSummary]
    }, community.summaryLocation || {}, ["numInv", "minPrice", "maxPrice", "minSqft", "maxSqft"]);
    var regionSummary = addDefined({
      id: community.metroId || community.id,
      name: community.metro || community.name,
      state: community.state,
      numInv: community.numInv || 0,
      locations: [locationSummary]
    }, community.summaryRegion || {}, ["numInv", "minPrice", "maxPrice", "minSqft", "maxSqft"]);
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      maxPhpInt: 2147483647,
      filterCats: config.catalog.filterCats || [],
      regiondata: [regionSummary]
    };
  }

  function getNbrhoodsDataXml(config) {
    var community = firstCommunity(config);
    var agent = community.agent || {};
    var paletteIds = (config.catalog.palettes || []).map(function (palette) { return palette.id; }).join(",");
    var schemeIds = (config.catalog.schemes || []).map(function (scheme) { return scheme.id; }).join(",");
    var categories = community.standardFeatures || [];
    var legend = community.legend || [];
    var lots = community.lots || [];
    var inventory = community.inventory || [];
    var landPhotos = community.landPhotos || [];
    var nbrhoodAttrs = {
      id: community.id,
      name: community.name,
      def: boolNum(community.defaultCommunity),
      salesapp: boolNum(community.salesApp),
      logo: community.logo,
      cap: community.caption || community.name,
      descr: community.description,
      long: community.longitude,
      lat: community.latitude,
      city: community.city,
      state: community.state,
      metro: community.metro || community.name,
      metroId: community.metroId || community.id,
      site: community.site,
      active: boolNum(community.active),
      pricing: boolNum(community.pricingEnabled),
      cutsheet: community.cutsheet,
      cmtd: community.colorMethod,
      sort: community.sort,
      order: community.order,
      lotType: community.lotType,
      thumb: community.thumb,
      imgs: community.imgs,
      crmId: community.crmId,
      schemeids: schemeIds,
      palids: paletteIds,
      url: community.url,
      addr1: community.addr1,
      addr2: community.addr2,
      landPhotoFolder: community.landPhotoFolder
    };
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <nbrhood " + attrs(nbrhoodAttrs) + ">",
      "    <agent agentid=\"" + attr(agent.id) + "\" fname=\"" + attr(agent.firstName) + "\" lname=\"" + attr(agent.lastName) + "\" email=\"" + attr(agent.email) + "\" phone=\"" + attr(agent.phone) + "\" />",
      "    <stdfeatures>",
      categories.map(function (category) {
        var features = (category.features || []).map(function (feature) {
          return "        <feature id=\"" + attr(feature.id) + "\" name=\"" + attr(feature.name) + "\" />";
        }).join("\n");
        return "      <category id=\"" + attr(category.id) + "\" name=\"" + attr(category.name) + "\">\n" + features + "\n      </category>";
      }).join("\n"),
      "    </stdfeatures>",
      legend.length ? "    <legend>\n" + legend.map(function (entry) {
        return "      <entry " + attrs(entry) + " />";
      }).join("\n") + "\n    </legend>" : "    <legend />",
      lots.map(function (lot) {
        var lotText = isDefined(lot.label) ? lot.label : (isDefined(lot.name) ? lot.name : lot.id);
        return "    <lot " + attrs({
          id: lot.id,
          x: lot.x,
          y: lot.y,
          width: lot.width,
          height: lot.height,
          sold: lot.sold,
          status: lot.status,
          elevId: lot.elevId,
          planId: lot.planId,
          cost: lot.cost,
          premium: lot.premium,
          address: lot.address,
          lotType: lot.lotType,
          mls: lot.mls,
          photoFolder: lot.photoFolder
        }) + ">" + text(lotText) + "</lot>";
      }).join("\n"),
      inventory.map(function (item) {
        return "    <inventory " + attrs(item) + " />";
      }).join("\n"),
      landPhotos.map(function (photo) {
        return "    <landphoto " + attrs(photo) + " />";
      }).join("\n"),
      "  </nbrhood>",
      "</data>",
      ""
    ].filter(function (line) { return line !== ""; }).join("\n");
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
          return "        <ele " + attrs({
            id: element.id,
            cid: element.colorId,
            palId: element.palId,
            palSelId: element.palSelId,
            ovlname: element.overlayName,
            ovl: element.ovl,
            swatch: element.swatch
          }) + " />";
        }).join("\n");
        return "      <palette " + attrs({ id: palette.id, name: palette.name, layid: palette.layid, lay: palette.lay, blend: palette.blend }) + ">\n" + elements + "\n      </palette>";
      }).join("\n"),
      "    </palettes>",
      "    <schemes>",
      schemes.map(function (scheme) {
        var elements = (scheme.elements || []).map(function (element) {
          return "        <ele " + attrs({
            id: element.id,
            blend: element.blend,
            cid: element.colorId,
            palId: element.palId,
            palSelId: element.palSelId,
            ovlname: element.overlayName,
            ovl: element.ovl,
            swatch: element.swatch
          }) + ">" + text(element.label) + "</ele>";
        }).join("\n");
        return "      <scheme " + attrs({ id: scheme.id, name: scheme.name, cost: scheme.cost || 0 }) + ">\n" + elements + "\n      </scheme>";
      }).join("\n"),
      "    </schemes>",
      plans.map(function (plan) {
        var elevations = (plan.elevations || []).map(function (elevation) {
          return "      <elev " + attrs({
            id: elevation.id,
            name: elevation.name,
            cap: elevation.caption,
            description: elevation.description,
            tag: elevation.tag,
            thumb: elevation.thumb,
            thumbLg: elevation.thumbLg,
            base: elevation.base,
            baseImg: elevation.baseImg,
            baseUrl: elevation.baseUrl,
            bed: elevation.bedrooms,
            bath: elevation.bathrooms,
            size: elevation.squareFeet,
            cost: elevation.basePrice,
            schemeids: (elevation.schemeIds || []).join(","),
            cars: elevation.garageSpaces,
            floorCount: elevation.floorCount,
            defaultFloor: elevation.defaultFloor || plan.defaultFloor || 1,
            imgs: elevation.imgs,
            fpimgs: elevation.fpimgs,
            status: elevation.status,
            pricingStatus: elevation.pricingStatus,
            availabilityStatus: elevation.availabilityStatus
          }) + " />";
        }).join("\n");
        var planXml = "    <plan " + attrs({
          id: plan.id,
          name: plan.name,
          videoUrl: plan.videoUrl,
          defaultFloor: plan.defaultFloor || 1,
          imgs: plan.imgs,
          fpimgs: plan.fpimgs,
          fpPhotos: plan.fpPhotos,
          photos: plan.photos,
          def: boolNum(plan.defaultPlan),
          description: plan.description,
          status: plan.status,
          pricingStatus: plan.pricingStatus,
          availabilityStatus: plan.availabilityStatus,
          filterIds: plan.filterIds,
          tags: Array.isArray(plan.tags) ? plan.tags.join(",") : plan.tags
        }) + ">\n" + elevations + "\n    </plan>";
        return planXml;
      }).join("\n"),
      (community.inventory || []).map(function (item) {
        return "    <inventory " + attrs(item) + " />";
      }).join("\n"),
      "  </nbrhood>",
      "</data>",
      ""
    ].filter(function (line) { return line !== ""; }).join("\n");
  }

  function elevationDetails(config) {
    var plan = firstPlan(config);
    var plans = config.catalog.plans || [];
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        imgs: plans.map(function (item) { return item.imgs || ""; }).filter(Boolean).join(","),
        fpimgs: plans.map(function (item) { return item.fpimgs || ""; }).filter(Boolean).join(","),
        fpPhotos: plans.map(function (item) { return item.fpPhotos || ""; }).filter(Boolean).join(","),
        photos: plans.map(function (item) { return item.photos || ""; }).filter(Boolean).join(","),
        elevations: allElevations(config).map(function (elevation) {
          var payload = {
            id: elevation.id,
            planId: elevation.planId,
            planName: elevation.planName,
            elements: elevation.elements || [],
            paletteOverlays: elevation.paletteOverlays || [],
            floorplans: floorplans(config)
          };
          return addDefined(payload, elevation, [
            "name",
            "caption",
            "tag",
            "description",
            "thumb",
            "thumbLg",
            "base",
            "baseImg",
            "baseUrl",
            "imgs",
            "fpimgs",
            "photos",
            "status",
            "pricingStatus",
            "availabilityStatus"
          ]);
        })
      },
      schemes: (config.catalog.schemes || []).map(function (scheme) {
        return {
          id: scheme.id,
          name: scheme.name,
          cost: scheme.cost || 0,
          elements: (scheme.elements || []).map(function (element) {
            return addDefined({
              elementId: element.id,
              lay: element.label,
              blendmode: element.blend,
              colorId: element.colorId
            }, element, ["palId", "palSelId", "overlayName", "ovl", "swatch"]);
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
            return addDefined({ id: element.id, cid: element.colorId }, element, ["palId", "palSelId", "overlayName", "ovl", "swatch"]);
          })
        };
      })
    };
  }

  function elevationElements(config) {
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        elevations: allElevations(config).map(function (elevation) {
          return { id: elevation.id, planId: elevation.planId, elements: elevation.elements || [] };
        })
      }
    };
  }

  function elevationSchemes(config) {
    var seen = {};
    var schemeIds = [];
    allElevations(config).forEach(function (elevation) {
      (elevation.schemeIds || []).forEach(function (schemeId) {
        if (!seen[schemeId]) {
          seen[schemeId] = true;
          schemeIds.push(schemeId);
        }
      });
    });
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      schemeIds: schemeIds
    };
  }

  function planFloorplans(config) {
    return {
      _status: "generated",
      _source: "app/config/upperview-project.config.js",
      planData: {
        elevations: allElevations(config).map(function (elevation) {
          return { id: elevation.id, planId: elevation.planId, floorplans: floorplans(config) };
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
    var interiors = config.catalog.interiors || [];
    return [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<!-- Status: generated. Source of truth: app/config/upperview-project.config.js. -->",
      "<data>",
      "  <nbrhood id=\"" + attr(community.id) + "\" name=\"" + attr(community.name) + "\">",
      interiors.length ? "    <interiors>\n" + interiors.map(function (room) {
        var roomAttrs = {
          planid: room.planId,
          id: room.id,
          name: room.name,
          src: room.src,
          thumb: room.thumb,
          modelId: room.modelId,
          floor: room.floor,
          sort: room.sort
        };
        var selections = room.selections || [];
        if (!selections.length) return "      <room " + attrs(roomAttrs) + " />";
        return "      <room " + attrs(roomAttrs) + ">\n" + selections.map(function (selection) {
          return "        <selection " + attrs(selection) + " />";
        }).join("\n") + "\n      </room>";
      }).join("\n") + "\n    </interiors>" : "    <interiors />",
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
