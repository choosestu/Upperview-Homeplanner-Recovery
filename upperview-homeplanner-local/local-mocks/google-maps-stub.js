window.google = window.google || {};
google.maps = google.maps || {};
google.maps.Map = function () {};
google.maps.LatLng = function (lat, lng) {
  this.lat = function () { return lat; };
  this.lng = function () { return lng; };
};
google.maps.LatLngBounds = function () {
  this.extend = function () {};
};
google.maps.Marker = function () {
  this.setMap = function () {};
};
google.maps.InfoWindow = function () {
  this.open = function () {};
  this.close = function () {};
  this.setContent = function () {};
};
google.maps.Geocoder = function () {
  this.geocode = function (request, callback) {
    callback([], google.maps.GeocoderStatus.ZERO_RESULTS);
  };
};
google.maps.GeocoderStatus = { OK: "OK", ZERO_RESULTS: "ZERO_RESULTS" };
google.maps.OverlayView = function () {};
google.maps.OverlayView.prototype.setMap = function () {};
google.maps.OverlayView.prototype.getPanes = function () { return { overlayImage: document.body, overlayMouseTarget: document.body }; };
google.maps.OverlayView.prototype.getProjection = function () {
  return {
    fromLatLngToDivPixel: function () { return { x: 0, y: 0 }; }
  };
};
google.maps.event = {
  addListener: function () { return { remove: function () {} }; },
  addDomListener: function () { return { remove: function () {} }; },
  trigger: function () {},
  removeListener: function () {}
};
google.maps.places = google.maps.places || {};
