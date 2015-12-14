var svWizardApp = angular.module('svWizardApp');


svWizardApp.controller( 'StreetViewRequestCtrl', ['$scope', '$rootScope',
  'ngDialog', 'M','Generator', 'Settings', 
  function($scope, $rootScope, ngDialog, M, Generator, Settings) {
    
  var currentRequest = {
    name: 'La Giralda',
    location: {lat: 37.38629, lng: -5.99195},
    size: {
      width: 640,
      height: 640
    },
    heading: 241.5,
    fov: 57,
    pitch: 27,
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
  
  $scope.openMenu = function() {
    $rootScope.$emit('openmenu');
    console.log('Hallo');
  }
  $scope.AuthenticationMode = M.AuthenticationMode;
  $scope.request = currentRequest;
}]);
