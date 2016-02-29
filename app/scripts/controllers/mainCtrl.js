var svWizard = svWizard || {};
svWizard.controllers = svWizard.controllers || {};

svWizard.controllers.Main = function(scope, State, Settings, RequestProvider, 
  Menu, Generator, M, ngDialog) {
  this.state = State;
  this.settings = Settings;
  this.requestProvider = RequestProvider;
  this.menu = Menu;
  this.generator = Generator;
  this.AuthenticationMode = M.AuthenticationMode;
  this.dialog = ngDialog;
  
  var self = this;
  //Not happy with this
  
  scope.$watch( function() {
    return self.state.current;
  }, function(){
    self.onRequestChange();
  }, true);
  
}

svWizard.controllers.Main.prototype.addressSelected = function(address) {
  if( address !== undefined && address !== null) {
      var location = address.geometry.location;
      this.state.current.location.lat = location.lat();
      this.state.current.location.lng = location.lng();
    }
};

svWizard.controllers.Main.prototype.getRatio = function(){
    var width = this.state.current.size.width;
    var height = this.state.current.size.height;
    if( width == 0 || height == 0) {
      return 1;
    }else{
      return width/height;
    }
}

svWizard.controllers.Main.prototype.generate = function() {
  var url = this.generator.generate(this.state.current, this.settings);
  this.dialog.open({
    template: 'templates/generated.html',
    className: 'ngdialog-theme-default ngdialog-theme-custom',
    controller: 'GeneratedUrlCtrl',
    controllerAs: 'generated',
    data: {
      url: url
    }
  });
};

svWizard.controllers.Main.prototype.onRequestChange = function(){
  this.state.saveCurrentRequest();
}

svWizard.controllers.Main.prototype.save = function() {
  this.state.current = this.requestProvider.saveRequest(this.state.current);
}

svWizard.controllers.Main.prototype.new = function() {
  console.log('New');
  this.state.current = angular.copy(this.state.current);
  this.state.current.timestamp = null;
  this.state.current.name  = '';
  console.log(this.state.current);
};

angular.module('svWizardApp').controller( 'MainCtrl', ['$scope', 'State', 
'Settings', 'RequestProvider', 'Menu', 'Generator', 'M', 'ngDialog',
  svWizard.controllers.Main]);
