var svWizardApp = angular.module('svWizardApp');

svWizardApp.directive( 'svPreview', function($timeout, $window) {
    
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
    
    function resizePanorama_(scope, parent, panoramaEl, panorama) {
        var parentSize = getInnerSize(parent);
        var pRatio = parentSize.width / parentSize.height;
        var ratio = scope.ratio();
        console.log(pRatio, scope.ratio());
        // The res
        if(pRatio > ratio) {
            panoramaEl.style.height = '100%';
            panoramaEl.style.width = ratio/pRatio * 100 + "%";
        }else{
            panoramaEl.style.width = '100%';
            panoramaEl.style.height = pRatio/ratio * 100 + "%";
        }
        // The event has to be manually triggered because if not, the panorama
        // view doesn't notice the size changed
        google.maps.event.trigger(panorama, 'resize')
        console.log( parentSize);
    }


    function getInnerSize(el) {
        var s = $window.getComputedStyle(el, null);
        var tWidth = px2int(s.getPropertyValue('width'));
        var tHeight = px2int(s.getPropertyValue('height'));
        var pRigth = px2int(s.getPropertyValue('padding-right'));
        var pLeft = px2int(s.getPropertyValue('padding-left'));
        var pTop = px2int(s.getPropertyValue('padding-top'));
        var pBottom = px2int(s.getPropertyValue('padding-bottom'));
        
        return {
            width: tWidth - pRigth - pLeft,
            height: tHeight - pTop - pBottom
        };
    }
    //Externalize in utils
    function px2int(px) {
        return parseInt(px.replace('px', ''));
    }
    
    return {
        restrict: 'E',
        scope: {
            location: '=',
            heading: '=',
            pitch: '=',
            fov: '=',
            ratio: '&'
        },
        templateUrl: 'templates/svPreview.html',
        link: function(scope, element, attrs) {
            var self = this;
            var panoramaEl = element.find('#sv-preview-panorama')[0];
            var container = element.find('.sv-preview-container')[0]
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
            
            resizePanorama_(scope, container, panoramaEl, this.panorama);
            
            scope.$watch('ratio()', function() {
                console.log(scope.ratio());
                resizePanorama_(scope, container, panoramaEl, self.panorama);
            });
            
            angular.element($window).bind('resize', function() {
                console.log("Mierdo");
                resizePanorama_(scope, container, panoramaEl, self.panorama);
            });
        }
    };
});