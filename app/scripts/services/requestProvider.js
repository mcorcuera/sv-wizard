var svWizard = svWizard || {};

var svWizardApp = angular.module('svWizardApp');

svWizardApp.service('RequestProvider', ['localStorageService',
    function(localStorageService) {
    var REQUESTS = 'requests';
    var CURRENT = 'current';

    var requests_ = {};
    var requestsArray_ = []
    var current_ = {};

    init_();

    /*Loads the requests from locastorage*/
    function init_() {
      var rawRequests = localStorageService.get(REQUESTS);
      console.log(rawRequests);
      if(angular.isDefined(rawRequests) && rawRequests !== null
        && rawRequests.length > 0) {
        requests_ = angular.fromJson(rawRequests);
      }else{
        requests_ = {};
      }
      console.log(requests_);
      updateArray_();
      
      var rawCurrent = localStorageService.get(CURRENT);
      if(angular.isDefined(rawCurrent) && rawCurrent !== null &&
        rawCurrent.length > 0) {
        console.log(rawCurrent);
        current_ = angular.fromJson(rawCurrent);
      }else{
        current_ = {};
      }
    }

    function updateArray_() {
      requestsArray_ = [];
      for(var key in requests_) {
        requestsArray_.push(requests_[key]);
      }
    }

    function saveRequests_() {
      var requestsJson = angular.toJson(requests_);
      localStorageService.set(REQUESTS, requestsJson);

    }
    this.saveRequest = function(request) {
      console.log('Save');
      var timestamp = request.timestamp;
      if( request.timestamp === null) {
        request.timestamp = Date.now() + '';
      }
      console.log(request.timestamp);
      requests_[request.timestamp] = request;
      saveRequests_();
      updateArray_();
      return request;
    }

    this.getRequests = function() {
      return requestsArray_;
    }

    this.getCurrentRequest = function(){
      if(angular.isUndefined(current_.size) ||
        angular.isUndefined(current_.location) ||
        angular.isUndefined(current_.heading) ||
        angular.isUndefined(current_.fov) ||
        angular.isUndefined(current_.pitch)) {
          console.log('Undefined');
          return null;
        }
      return current_;
    }

    this.removeRequest = function(timestamp) {
      delete requests_[timestamp];
      saveRequests_();
      updateArray_();
      return true;
    }

    this.updateCurrentRequest = function(request) {
      console.log('Updating');
      current_ = request;
      var currentJson = angular.toJson(current_);
      localStorageService.set(CURRENT, currentJson);
    }



    }
]);
