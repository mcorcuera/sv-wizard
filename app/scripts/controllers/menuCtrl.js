var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'MenuCtrl', ['$scope', '$rootScope', 'Settings',
  function($scope, $rootScope, Settings) {
  
  $scope.auth = Settings.getSettings();
  
  $scope.$watch('auth.apiKey', function() {
    Settings.setApiKey($scope.auth.apiKey);
  });
  
  $scope.$watch('auth.clientId', function() {
    Settings.setClientId($scope.auth.clientId);
  });
  
  $scope.$watch('auth.cryptoKey', function() {
    Settings.setCryptoKey($scope.auth.cryptoKey);
  });
  
    
}]);
