var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'StreetViewRequestCtrl', function($scope) {

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
  $scope.$watch( 'request.location', function() {
    console.log(panorama.getPosition().toString())
    panorama.setPosition($scope.request.location);
  }, true);

  var currentRequest = {
    name: 'Mikel',
    location: {lat: 37.869260, lng: -122.254811},
    size: {
      width: 640,
      height: 640
    },
    heading: 98.5,
    fov: 45,
    pitch: 10
  };

  $scope.request = currentRequest;
});
