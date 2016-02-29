var svWizard = svWizard || {};
svWizard.controllers = svWizard.controllers || {};

svWizard.controllers.Save = function($scope, RequestProvider) {
  this.scope = $scope;
  this.requestProvider = RequestProvider;
  this.request = $scope.ngDialogData.request;
};

svWizard.controllers.Save.prototype.saveRequest = function() {
  this.request = this.requestProvider.
    updateRequest(this.request.id, this.request);
  
  this.scope.closeThisDialog();
};


svWizard.controllers.Save.prototype.saveRequestAs = function() {
  this.requestProvider.createRequest(this.request);
  this.scope.closeThisDialog();
};

angular.module('svWizardApp').controller( 'SaveCtrl',['$scope', 
  'RequestProvider', svWizard.controllers.Save]);
