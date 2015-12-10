var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'StreetViewRequestCtrl', function($scope) {

  var currentRequest = {
    name: 'Mikel',
    location: {lat: 37.869260, lng: -122.254811},
    size: {
      width: 320,
      height: 640
    },
    heading: 98.5,
    fov: 90,
    pitch: 10
  };
  $scope.getRatio = function() {
    var width = $scope.request.size.width;
    var height = $scope.request.size.height;
    
    if( width == 0 || height == 0) {
      return 1;
    }else{
      return width/height;
    }
  }
  $scope.request = currentRequest;
});
