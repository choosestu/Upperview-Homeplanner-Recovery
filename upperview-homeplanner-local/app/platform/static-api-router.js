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
  var mockLog = [];

  function toPathname(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.pathname;
  }

  function findRoute(url) {
    var pathname = toPathname(url);
    var match = null;
    for (var i = 0; i < routes.length; i++) {
      if (pathname.indexOf(routes[i].match) !== -1 && (!match || routes[i].match.length > match.match.length)) {
        match = routes[i];
      }
    }
    return match;
  }

  function localRoute(url) {
    var route = findRoute(url);
    return route && route.local ? route.local : url;
  }

  function serializeMockBody(route) {
    if (route.body !== undefined) return route.body;
    if (route.response !== undefined) {
      return typeof route.response === "string" ? route.response : JSON.stringify(route.response);
    }
    return route.format === "json" ? JSON.stringify({ status: "mocked", ok: true }) : "OK";
  }

  function contentType(route) {
    if (route.contentType) return route.contentType;
    if (route.format === "json") return "application/json";
    if (route.format === "xml") return "application/xml";
    return "text/plain";
  }

  function setMockXhrState(xhr, route, body) {
    var headers = "content-type: " + contentType(route) + "\r\nx-homeplanner-mock: true\r\n";
    function define(name, value) {
      try {
        Object.defineProperty(xhr, name, { configurable: true, value: value });
      } catch (e) {
        try { xhr[name] = value; } catch (ignore) {}
      }
    }
    define("readyState", 4);
    define("status", route.statusCode || 200);
    define("statusText", route.statusText || "OK");
    define("responseText", body);
    define("response", body);
    xhr.getAllResponseHeaders = function () { return headers; };
    xhr.getResponseHeader = function (name) {
      return String(name).toLowerCase() === "content-type" ? contentType(route) : null;
    };
  }

  global.HomePlannerPlatform = global.HomePlannerPlatform || {};
  global.HomePlannerPlatform.localRoute = localRoute;
  global.HomePlannerPlatform.routes = routes;
  global.HomePlannerPlatform.mockLog = mockLog;

  var open = XMLHttpRequest.prototype.open;
  var send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    var route = findRoute(url);
    this.__homePlannerMockRoute = route && route.mock ? route : null;
    this.__homePlannerMockMethod = method;
    this.__homePlannerMockUrl = url;
    if (!this.__homePlannerMockRoute) arguments[1] = localRoute(url);
    return open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    var xhr = this;
    var route = xhr.__homePlannerMockRoute;
    if (!route) return send.apply(xhr, arguments);

    mockLog.push({
      at: new Date().toISOString(),
      method: xhr.__homePlannerMockMethod || "",
      url: xhr.__homePlannerMockUrl || route.match,
      route: route.match,
      body: body || "",
      status: "mocked-local-noop"
    });

    global.setTimeout(function () {
      var responseBody = serializeMockBody(route);
      setMockXhrState(xhr, route, responseBody);
      if (typeof xhr.onreadystatechange === "function") xhr.onreadystatechange();
      if (typeof xhr.onload === "function") xhr.onload();
      if (typeof xhr.onloadend === "function") xhr.onloadend();
    }, 0);
  };
}(window, document));
