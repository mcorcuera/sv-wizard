var svWizardApp = angular.module('svWizardApp');


svWizardApp.controller( 'StreetViewRequestCtrl',
  function($scope, ngDialog, M, Generator, Settings) {
  var currentRequest = {
    name: '',
    location: {lat: 37.869260, lng: -122.254811},
    size: {
      width: 640,
      height: 640
    },
    heading: 98.5,
    fov: 90,
    pitch: 10,
    authenticationMode: M.AuthenticationMode.NONE
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

  $scope.AuthenticationMode = M.AuthenticationMode;

  $scope.generate = function() {
    var url = Generator.generate($scope.request, Settings.getSettings());
    ngDialog.open({
      template: 'templates/generated.html',
      className: 'ngdialog-theme-default ngdialog-theme-custom',
      controller: 'GeneratedDialogCtrl',
      data: {
        url: url
      }
    });
  }
  $scope.request = currentRequest;
}]);
