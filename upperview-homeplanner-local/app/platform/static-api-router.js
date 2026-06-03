// Reusable static API adapter for replaying the recovered frontend without a PHP backend.
(function (global, document) {
  var config = global.HomePlannerConfig || {};
  var configuredRoutes = config.api && config.api.routes ? config.api.routes : [];
  var fallbackRoutes = [
    { match: "/db/scripts/php/getcolorlib.php", local: "data/reconstructed/db/scripts/php/getcolorlib.reconstructed.xml" },
    { match: "/homedesigner/getclientdata.php", local: "data/reconstructed/homedesigner/getclientdata.reconstructed.xml" },
    { match: "/db/scripts/php/getsummary.php", local: "data/reconstructed/db/scripts/php/getsummary.reconstructed.json" },
    { match: "/db/scripts/php/getnbrhoodsdata.php", local: "data/reconstructed/db/scripts/php/getnbrhoodsdata.reconstructed.xml" },
    { match: "/db/scripts/php/getplans.php", local: "data/reconstructed/db/scripts/php/getplans.reconstructed.xml" },
    { match: "/db/scripts/php/getElevationDetails.php", local: "data/reconstructed/db/scripts/php/getElevationDetails.reconstructed.json" },
    { match: "/db/scripts/php/getElevationElements.php", local: "data/reconstructed/db/scripts/php/getElevationElements.reconstructed.json" },
    { match: "/db/scripts/php/getElevationSchemes.php", local: "data/reconstructed/db/scripts/php/getElevationSchemes.reconstructed.json" },
    { match: "/db/scripts/php/getPlanFloorplans.php", local: "data/reconstructed/db/scripts/php/getPlanFloorplans.reconstructed.json" },
    { match: "/db/scripts/php/getelevnbrhoods.php", local: "data/reconstructed/db/scripts/php/getelevnbrhoods.reconstructed.json" },
    { match: "/db/scripts/php/getinteriors.php", local: "data/reconstructed/db/scripts/php/getinteriors.reconstructed.xml" },
    { match: "/api/v1/fp/", local: "data/reconstructed/rendering-api/floorplan-uri.reconstructed.txt" }
  ];
  var routes = configuredRoutes.length ? configuredRoutes : fallbackRoutes;

  function toPathname(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.pathname;
  }

  function localRoute(url) {
    var pathname = toPathname(url);
    for (var i = 0; i < routes.length; i++) {
      if (pathname.indexOf(routes[i].match) !== -1) return routes[i].local;
    }
    return url;
  }

  global.HomePlannerPlatform = global.HomePlannerPlatform || {};
  global.HomePlannerPlatform.localRoute = localRoute;
  global.HomePlannerPlatform.routes = routes;

  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    arguments[1] = localRoute(url);
    return open.apply(this, arguments);
  };
}(window, document));
