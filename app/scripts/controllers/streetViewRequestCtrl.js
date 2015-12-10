var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'StreetViewRequestCtrl', function($scope) {

  var currentRequest = {
    name: 'Mikel',
    location: {lat: 37.869260, lng: -122.254811},
    size: {
      width: 640,
      height: 640
    },
    heading: 98.5,
    fov: 90,
    pitch: 10
  };

  $scope.request = currentRequest;
});
