var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'StreetViewRequestCtrl', function($scope, ngDialog) {

  var currentRequest = {
    name: '',
    location: {lat: 37.869260, lng: -122.254811},
    size: {
      width: 640,
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
  
  $scope.generate = function() {
    var r = $scope.request;
    var baseUrl = 'https://maps.googleapis.com/maps/api/streetview?';
    baseUrl += 'location=' + r.location.lat + ',' + r.location.lng;
    baseUrl += '&heading=' + r.heading;
    baseUrl += '&pitch=' + r.pitch;
    baseUrl += '&fov=' + r.fov;
    baseUrl += '&size=' + r.size.width + 'x' + r.size.height;
    ngDialog.open({
      template: 'templates/generated.html',
      className: 'ngdialog-theme-default ngdialog-theme-custom',
      controller: 'GeneratedDialogCtrl',
      data: {
        url: baseUrl
      }
    })
    console.log(baseUrl);
  }
  
  $scope.dialogOpen = false;
  $scope.request = currentRequest;
});
