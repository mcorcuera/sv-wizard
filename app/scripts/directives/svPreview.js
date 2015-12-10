var svWizardApp = angular.module('svWizardApp');

svWizardApp.directive( 'svPreview', function($timeout) {
    
    function zoomListener_(scope, self) {
        return function() {
            $timeout(function(){
                scope.fov = 180 / (Math.pow(2,self.panorama.getZoom()));
            });
        };
    }
    
    function povListener_(scope, self) {
        return function() {
            var pov = self.panorama.getPov();
            $timeout(function(){
                scope.heading = pov.heading;
                scope.pitch = pov.pitch;
            });
        };
    }
    
    function positionListener_(scope, self) {
        return function() {
            $timeout(function(){
                var position = self.panorama.getPosition();
                scope.location.lat = position.lat();
                scope.location.lng = position.lng();
            });
        };
    }
    
    return {
        restrict: 'E',
        scope: {
            location: '=',
            heading: '=',
            pitch: '=',
            fov: '=',
            ratio: '='
        },
        templateUrl: 'templates/svPreview.html',
        link: function(scope, element, attrs) {
            var self = this;
            var panoramaEl = element.find('#sv-preview-panorama')[0];
            var zoomListener = zoomListener_(scope, this);
            var povListener = povListener_(scope, this);
            var positionListener = positionListener_(scope, this);
            
            this.panorama = new google.maps.StreetViewPanorama(
                panoramaEl,
                {
                  addressControl: false,
                  zoomControl: false,
                  position: {lat: 37.869260, lng: -122.254811},
                  pov: {heading: 165, pitch: 0},
                  zoom: 1
                }
            );
            
            var zoomListenerId = google.maps.event.addListener(this.panorama, 
                'zoom_changed', zoomListener);
            var povListenerId = google.maps.event.addListener(this.panorama, 
                'pov_changed', povListener);
            var positionListenerId = google.maps.event.addListener(this.panorama, 
                'position_changed', positionListener);
                
            /* Listen for changes on the parameters */
            scope.$watch( 'location', function() {
                google.maps.event.removeListener(positionListenerId);
                var latLng = new google.maps.LatLng(scope.location);
                self.panorama.setPosition(latLng);
                positionListenerId = google.maps.event.addListener(self.panorama, 
                    'position_changed', positionListener);
             }, true);
             
            scope.$watchGroup(['heading', 'pitch'], function(){
                google.maps.event.removeListener(povListenerId);
                self.panorama.setPov({
                  heading: scope.heading,
                  pitch: scope.pitch
                });
                povListenerId = google.maps.event.addListener(self.panorama, 
                    'pov_changed', povListener);
            });
            
            scope.$watch( 'fov', function() {
                //From the documentation: https://goo.gl/hCvvt
                // fov = 180 / (2 ^ zoom)
                // zoom = (log(180) - log(fov))/log(2)
                google.maps.event.removeListener(zoomListenerId);
                var fov = scope.fov;
                var zoom = Math.log(180/fov) / Math.log(2);
                self.panorama.setZoom(zoom);
                zoomListenerId = google.maps.event.addListener(self.panorama, 
                    'zoom_changed', zoomListener);
            });
            
        }
    };
});