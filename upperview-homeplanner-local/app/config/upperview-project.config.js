// Status: reconstructed. Project-specific configuration for the local UpperView prototype.
(function (global) {
  global.HomePlannerConfig = {
    meta: {
      status: "reconstructed",
      source: "Recovered UpperView HomePlanner frontend plus inferred local data",
      notes: "Original UpperView PHP data was not captured. Neutral reconstructed catalog data is used."
    },
    builder: {
      id: 1,
      key: "upperview",
      name: "UpperView",
      dir: "upperview",
      website: "https://www.upperviewhomes.com/",
      logo: "",
      altLogo: "",
      phone: "",
      email: "",
      designApp: 1,
      parentId: "",
      selfDir: "",
      disclaimer: "",
      contact: { firstName: "", lastName: "", email: "" },
      analyticsId: "UA-46999026-29",
      facebookAppId: "944621658936860",
      fbPostUrl: ""
    },
    project: {
      id: 1,
      key: "grandview-trail",
      name: "Grandview Trail",
      city: "Oshawa",
      state: "ON",
      targetNeighborhood: "Grandview Trail"
    },
    designer: {
      contentStorage: "cloudinary",
      pageOrder: "0,1,2,3,12,5,6,8,9",
      bgColor: "E5F0B8",
      displayIntPhotos: "001",
      displayExtPhotos: "001",
      bundle: "",
      customRegMsg: "",
      requireRegister: 0,
      designButtonOnly: 0,
      plansSubtitle: "",
      elevTitleSqft: "",
      elevTitleBr: "",
      elevTitleBath: "",
      omitCityInBrochure: 0,
      omitLocationFilter: 0,
      showFilters: 1,
      presetPlanFilter: "",
      showPlansCount: 1,
      useMetric: 0,
      lotSort: "",
      allCommunitiesLabel: "All Communities",
      availableCommunitiesLabel: "Available Communities",
      showAvailableHomes: 0,
      showBrochureElevDetails: 0,
      showBrochureNbrhoodDetails: 0,
      plainStart: 0,
      showCities: 0,
      showAvailableCommunities: 0,
      communityIsColorScheme: 0,
      showAllBtn: 0,
      nbrhoodsBg: "",
      allPlansImage: "",
      inventoryImage: "",
      designMeImage: "",
      quickMoveinLabel: "Quick Move-In",
      splashAllBtnHide: 0,
      splashAllBtnTxt: "",
      splashAllBtnSubtxt: "",
      splashAllBtnImage: "",
      splashAllBtnVerb: "",
      splashDsnBtnHide: 0,
      splashDsnBtnTxt: "",
      splashDsnBtnSubtxt: "",
      splashDsnBtnImage: "",
      splashDsnBtnVerb: "",
      splashInvBtnHide: 0,
      splashInvBtnTxt: "",
      splashInvBtnSubtxt: "",
      splashInvBtnImage: "",
      splashInvBtnVerb: "",
      crm: {
        enabled: false,
        LassoUID: "",
        ClientID: "",
        ProjectID: "",
        community: "",
        planName: "",
        domainAccountId: "",
        renderingApp: "",
        renderingAppAnswer: ""
      }
    },
    communities: [
      {
        id: 1,
        key: "grandview-trail",
        name: "Grandview Trail",
        caption: "Grandview Trail",
        description: "Grandview Trail is a warm and family-friendly community located within North Oshawa.",
        city: "Oshawa",
        state: "ON",
        metro: "Grandview Trail",
        metroId: 1,
        latitude: 43.945,
        longitude: -78.837,
        pricingEnabled: true,
        colorMethod: "PALETTE",
        defaultCommunity: true,
        salesApp: true,
        active: true,
        sort: "Name",
        order: "asc",
        lotType: "lot",
        logo: "",
        site: "",
        cutsheet: "",
        thumb: "",
        imgs: "",
        crmId: 0,
        url: "https://www.upperviewhomes.com/",
        addr1: "",
        addr2: "",
        numInv: 0,
        numHomeSitesOnly: 0,
        numPlans: 1,
        numElevs: 1,
        minSqft: 2512,
        maxSqft: 2512,
        minBed: 4,
        maxBed: 4,
        minBath: 3.5,
        maxBath: 3.5,
        minPrice: 807990,
        maxPrice: 807990,
        landPhotoFolder: "",
        landPhotos: [],
        legend: [
          { id: 1, code: "available", name: "Available", color: "#8bbf40", status: "reconstructed" }
        ],
        lots: [
          {
            id: 1,
            label: "Reconstructed Lot 1",
            status: "reconstructed",
            sold: "available",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            planId: 101,
            elevId: 1001,
            cost: 0,
            premium: 0,
            address: "",
            lotType: "lot",
            mls: "",
            photoFolder: ""
          }
        ],
        inventory: [],
        agent: { id: 1, firstName: "", lastName: "", email: "", phone: "" },
        standardFeatures: [
          {
            id: 1,
            name: "Community",
            features: [
              { id: 1, name: "Reconstructed sample data for local prototype only" }
            ]
          }
        ]
      }
    ],
    catalog: {
      status: "reconstructed",
      vendors: [
        { id: 1, name: "Reconstructed Vendor" }
      ],
      colors: [
        { id: 1, vendorId: 1, ident: "white", name: "White", hex: "FFFFFF" },
        { id: 2, vendorId: 1, ident: "black", name: "Black", hex: "000000" },
        { id: 3, vendorId: 1, ident: "gray", name: "Gray", hex: "808080" },
        { id: 4, vendorId: 1, ident: "bluegray", name: "Blue Gray", hex: "708090" }
      ],
      filterCats: [],
      palettes: [
        {
          id: 1,
          name: "Reconstructed Neutral Palette",
          layid: 1,
          lay: "Exterior",
          blend: "m",
          elements: [{ id: 1, colorId: 1 }]
        }
      ],
      schemes: [
        {
          id: 1,
          name: "Reconstructed Neutral Scheme",
          cost: 0,
          elements: [{ id: 1, blend: "m", colorId: 1, label: "Body Colour", palId: "", palSelId: "", overlayName: "", ovl: "", swatch: "" }]
        }
      ],
      plans: [
        {
          id: 101,
          communityIds: [1],
          name: "Reconstructed Sample Plan",
          description: "Neutral reconstructed sample plan for local app-flow testing.",
          videoUrl: "",
          defaultFloor: 1,
          imgs: "",
          fpimgs: "",
          fpPhotos: "",
          photos: "",
          tags: ["reconstructed"],
          filterIds: "",
          status: "reconstructed",
          pricingStatus: "reconstructed",
          availabilityStatus: "reconstructed",
          defaultPlan: true,
          elevations: [
            {
              id: 1001,
              caption: "A",
              tag: "A",
              description: "Reconstructed sample elevation.",
              thumb: "",
              thumbLg: "",
              base: "",
              baseImg: "",
              baseUrl: "",
              imgs: "",
              fpimgs: "",
              photos: "",
              bedrooms: 4,
              bathrooms: 3.5,
              squareFeet: 2512,
              garageSpaces: 2,
              basePrice: 807990,
              floorCount: 2,
              defaultFloor: 1,
              schemeIds: [1],
              elements: [{ id: 1, name: "Body Colour", src: "" }],
              paletteOverlays: [],
              availableInCommunityIds: [1],
              status: "reconstructed",
              pricingStatus: "reconstructed",
              availabilityStatus: "reconstructed"
            }
          ]
        }
      ],
      colorPackages: [
        {
          id: 1,
          name: "Reconstructed Neutral Scheme",
          status: "reconstructed",
          elements: [{ id: 1, name: "Body Colour", colorId: 1 }]
        }
      ],
      options: [
        {
          id: 2000,
          name: "Reconstructed Base First Floor",
          type: "base",
          status: "reconstructed",
          floorNumber: 1,
          src: "floorplan-placeholder.svg",
          src2: "",
          base: true,
          listOrder: 0,
          renderOrder: 0,
          opt: false,
          cost: 0,
          size: 0,
          groupIds: "",
          fpAlts: [],
          description: "",
          href: "",
          dependent: "",
          dependentGroupIds: "",
          primary: 0,
          choiceId: "",
          excludeIds: "",
          includeIds: "",
          sku: "",
          pricingStatus: "reconstructed",
          availabilityStatus: "reconstructed"
        },
        {
          id: 2001,
          name: "Reconstructed Open Layout Option",
          type: "structural",
          status: "reconstructed",
          floorNumber: 1,
          src: "",
          src2: "",
          base: false,
          listOrder: 1,
          renderOrder: 1,
          opt: true,
          cost: 0,
          size: 0,
          groupIds: "1",
          fpAlts: [],
          description: "Neutral reconstructed option for local app-flow testing.",
          href: "",
          dependent: "",
          dependentGroupIds: "",
          primary: 0,
          choiceId: "",
          excludeIds: "",
          includeIds: "",
          sku: "",
          pricingStatus: "reconstructed",
          availabilityStatus: "reconstructed"
        },
        {
          id: 2002,
          name: "Reconstructed Base Second Floor",
          type: "base",
          status: "reconstructed",
          floorNumber: 2,
          src: "floorplan-placeholder.svg",
          src2: "",
          base: true,
          listOrder: 0,
          renderOrder: 0,
          opt: false,
          cost: 0,
          size: 0,
          groupIds: "",
          fpAlts: [],
          description: "",
          href: "",
          dependent: "",
          dependentGroupIds: "",
          primary: 0,
          choiceId: "",
          excludeIds: "",
          includeIds: "",
          sku: "",
          pricingStatus: "reconstructed",
          availabilityStatus: "reconstructed"
        }
      ],
      floorplanGroups: [
        { id: 1, floorNumber: 1, groupType: "structural", name: "First Floor Options", designatedPrimary: 0, optionIds: [2001] }
      ],
      interiors: [],
      rendering: {
        floorplanUri: "app/upperview/images/floorplan-placeholder.svg"
      }
    },
    workflow: {
      defaultPageOrder: "0,1,2,3,12,5,6,8,9",
      buyerStateKeys: [
        "selectedCommunityId",
        "selectedPlanId",
        "selectedElevationId",
        "selectedSchemeId",
        "selectedFloorplanOptions",
        "selectedLotId",
        "leadProfile",
        "favorites"
      ]
    },
    api: {
      mode: "static-generated",
      routes: [
        { match: "/homedesigner/getclientdata.php", local: "data/generated/homedesigner/getclientdata.generated.xml", fallback: "data/reconstructed/homedesigner/getclientdata.reconstructed.xml", format: "xml", status: "generated" },
        { match: "/db/scripts/php/getcolorlib.php", local: "data/generated/db/scripts/php/getcolorlib.generated.xml", fallback: "data/reconstructed/db/scripts/php/getcolorlib.reconstructed.xml", format: "xml", status: "generated" },
        { match: "/db/scripts/php/getsummary.php", local: "data/generated/db/scripts/php/getsummary.generated.json", fallback: "data/reconstructed/db/scripts/php/getsummary.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getnbrhoodsdata.php", local: "data/generated/db/scripts/php/getnbrhoodsdata.generated.xml", fallback: "data/reconstructed/db/scripts/php/getnbrhoodsdata.reconstructed.xml", format: "xml", status: "generated" },
        { match: "/db/scripts/php/getplans.php", local: "data/generated/db/scripts/php/getplans.generated.xml", fallback: "data/reconstructed/db/scripts/php/getplans.reconstructed.xml", format: "xml", status: "generated" },
        { match: "/db/scripts/php/getElevationDetails.php", local: "data/generated/db/scripts/php/getElevationDetails.generated.json", fallback: "data/reconstructed/db/scripts/php/getElevationDetails.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getElevationElements.php", local: "data/generated/db/scripts/php/getElevationElements.generated.json", fallback: "data/reconstructed/db/scripts/php/getElevationElements.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getElevationSchemes.php", local: "data/generated/db/scripts/php/getElevationSchemes.generated.json", fallback: "data/reconstructed/db/scripts/php/getElevationSchemes.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getPlanFloorplans.php", local: "data/generated/db/scripts/php/getPlanFloorplans.generated.json", fallback: "data/reconstructed/db/scripts/php/getPlanFloorplans.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getelevnbrhoods.php", local: "data/generated/db/scripts/php/getelevnbrhoods.generated.json", fallback: "data/reconstructed/db/scripts/php/getelevnbrhoods.reconstructed.json", format: "json", status: "generated" },
        { match: "/db/scripts/php/getinteriors.php", local: "data/generated/db/scripts/php/getinteriors.generated.xml", fallback: "data/reconstructed/db/scripts/php/getinteriors.reconstructed.xml", format: "xml", status: "generated" },
        { match: "/api/v1/fp/", local: "data/generated/rendering-api/floorplan-uri.generated.txt", fallback: "data/reconstructed/rendering-api/floorplan-uri.reconstructed.txt", format: "text", status: "generated" }
      ]
    }
  };
}(window));
