var svWizard = svWizard || {};

setTimeout( function() {
  var panorama = new google.maps.StreetViewPanorama(
  document.getElementById('map'),
  {
    addressControl: false,
    zoomControl: false,
    position: {lat: 37.869260, lng: -122.254811},
    pov: {heading: 165, pitch: 0},
    zoom: 1
  }
);

var currentRequest = new svWizard.StreetViewRequest();

var requestView = new svWizard.StreetViewRequestView({
  id: 'sv-request',
  model: currentRequest
})
}, 0)

