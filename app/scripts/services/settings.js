var svWizard = svWizard || {};

var svWizardApp = angular.module('svWizardApp');

svWizardApp.service('Settings', function() {
    var apiKey_ = '';
    var cryptoKey_ = '';
    var clientId_ = '';
    
    this.getApiKey = function() {
        return apiKey_;
    };
    
    this.getCryptoKey = function() {
        return cryptoKey_;
    };
    
    this.getClientId = function() {
        return clientId_;
    };
    
    this.getSettings = function() {
        return {
            apiKey: apiKey_,
            cryptoKey: cryptoKey_,
            clientId: clientId_
        }
    };
    
    this.setApiKey = function( apiKey) {
        apiKey_ = apiKey;
    };
    
    this.setCryptoKey = function(cryptoKey) {
        cryptoKey_ = cryptoKey;
    };
    
    this.setClientId = function(clientId) {
        clientId_ = clientId;
    }
    
    function loadSetings() {
        apiKey_ = 'AIzaSyANxPTPYnf8_ymxAXUaOOkRDDzdjOkZE3Q';
        cryptoKey_ = 'UUU';
        clientId_ = 'gme-boo';
    }
    
    loadSetings();
    
});