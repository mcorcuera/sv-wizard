(function() {
    console.log('Initializing map');
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('map'),
      {
        addressControl: false,
        zoomControl: false,
        position: {lat: 37.869260, lng: -122.254811},
        pov: {heading: 165, pitch: 0},
        zoom: 1
      });
})();
