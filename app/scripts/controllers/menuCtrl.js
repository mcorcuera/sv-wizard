var svWizard = svWizard || {};
svWizard.controllers = svWizard.controllers || {};

svWizard.controllers.MenuController = function(Settings, RequestProvider, 
  State, Menu) {
  
  this.provider = RequestProvider;
  this.settings = Settings;
  this.state = State;
  this.menu = Menu;
};

svWizard.controllers.MenuController.prototype.openRequest = function(request) {
  console.log('Hallo')
  this.state.current = request;
  this.menu.close();
};

angular.module('svWizardApp').controller( 'MenuCtrl', ['Settings',
'RequestProvider', 'State', 'Menu', svWizard.controllers.MenuController]);
  