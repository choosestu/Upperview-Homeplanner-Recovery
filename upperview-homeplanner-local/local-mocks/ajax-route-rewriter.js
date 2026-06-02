// Local archive repair: route missing historical PHP endpoints to static files.
(function () {
  var routes = [
    [/\/db\/scripts\/php\/getcolorlib\.php/, "data/reconstructed/db/scripts/php/getcolorlib.reconstructed.xml"],
    [/\/homedesigner\/getclientdata\.php/, "data/reconstructed/homedesigner/getclientdata.reconstructed.xml"],
    [/\/db\/scripts\/php\/getsummary\.php/, "data/reconstructed/db/scripts/php/getsummary.reconstructed.json"],
    [/\/db\/scripts\/php\/getnbrhoodsdata\.php/, "data/reconstructed/db/scripts/php/getnbrhoodsdata.reconstructed.xml"],
    [/\/db\/scripts\/php\/getplans\.php/, "data/reconstructed/db/scripts/php/getplans.reconstructed.xml"],
    [/\/db\/scripts\/php\/getElevationDetails\.php/, "data/reconstructed/db/scripts/php/getElevationDetails.reconstructed.json"],
    [/\/db\/scripts\/php\/getElevationElements\.php/, "data/reconstructed/db/scripts/php/getElevationElements.reconstructed.json"],
    [/\/db\/scripts\/php\/getElevationSchemes\.php/, "data/reconstructed/db/scripts/php/getElevationSchemes.reconstructed.json"],
    [/\/db\/scripts\/php\/getPlanFloorplans\.php/, "data/reconstructed/db/scripts/php/getPlanFloorplans.reconstructed.json"],
    [/\/db\/scripts\/php\/getelevnbrhoods\.php/, "data/reconstructed/db/scripts/php/getelevnbrhoods.reconstructed.json"],
    [/\/db\/scripts\/php\/getinteriors\.php/, "data/reconstructed/db/scripts/php/getinteriors.reconstructed.xml"],
    [/\/api\/v1\/fp\//, "data/reconstructed/rendering-api/floorplan-uri.reconstructed.txt"]
  ];

  function localRoute(url) {
    var a = document.createElement("a");
    a.href = url;
    for (var i = 0; i < routes.length; i++) {
      if (routes[i][0].test(a.pathname)) return routes[i][1];
    }
    return url;
  }

  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    arguments[1] = localRoute(url);
    return open.apply(this, arguments);
  };
}());
