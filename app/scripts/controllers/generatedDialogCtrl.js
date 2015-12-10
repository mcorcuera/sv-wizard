var svWizardApp = angular.module('svWizardApp');

svWizardApp.controller( 'GeneratedDialogCtrl', function($scope, $window) {
    
    $scope.url = $scope.ngDialogData.url;
    
    $scope.copy = function() {
        
    };
    
    $scope.open = function() {
        $window.open($scope.url);
    };
});