var svWizardApp = angular.module('svWizardApp');


svWizardApp.directive( 'svPreview', ['$timeout', '$window', 'Utils',
  function($timeout, $window, Utils) {

    function zoomListener_(scope, panorama) {
        return function() {
            $timeout(function(){
                var fov = Utils.numbers.zoom2fov(panorama.getZoom());
                //FOV cannot be > 120 for SV API
                if( fov > 120) {
                    panorama.setZoom(Utils.numbers.fov2zoom(120));
                }else{
                    scope.fov = Utils.numbers.decimalPlaces(fov,1);
                }
            });
        };
    }
    function povListener_(scope, panorama) {
        return function() {
            var pov = panorama.getPov();
            $timeout(function(){
                scope.heading = Utils.numbers.decimalPlaces(
                    Utils.numbers.wrap(pov.heading, 360), 1);
                scope.pitch =  Utils.numbers.decimalPlaces(pov.pitch, 1);
            });
        };
    }
    function positionListener_(scope, panorama) {
        return function() {
            $timeout(function(){
                var position = panorama.getPosition();
                scope.location.lat = Utils.numbers.decimalPlaces(
                        position.lat(),5);
                scope.location.lng = Utils.numbers.decimalPlaces(
                    position.lng(), 5);
            });
        };
    }
    function resizePanorama_(scope, parent, panoramaEl, panorama) {
        var parentSize = getInnerSize(parent);
        var pRatio = parentSize.width / parentSize.height;
        var ratio = scope.ratio();
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
        google.maps.event.trigger(panorama, 'resize');
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
            var panoramaEl = element.find('#sv-preview-panorama')[0];
            var container = element.find('.sv-preview-container')[0];
            var panorama = new google.maps.StreetViewPanorama(
                panoramaEl,
                {
                  addressControl: false,
                  zoomControl: false
                }
            );
            var zoomListener = zoomListener_(scope, panorama);
            var povListener = povListener_(scope, panorama);
            var positionListener = positionListener_(scope, panorama);

            var zoomListenerId = google.maps.event.addListener(panorama,
                'zoom_changed', zoomListener);
            var povListenerId = google.maps.event.addListener(panorama,
                'pov_changed', povListener);
            var positionListenerId = google.maps.event.addListener(panorama,
                'position_changed', positionListener);

            /* Listen for changes on the parameters */
            scope.$watch( 'location', function() {
                google.maps.event.removeListener(positionListenerId);
                var latLng = new google.maps.LatLng(scope.location);
                panorama.setPosition(latLng);
                positionListenerId = google.maps.event.addListener(panorama,
                    'position_changed', positionListener);
             }, true);

            scope.$watchGroup(['heading', 'pitch'], function(){
                google.maps.event.removeListener(povListenerId);
                panorama.setPov({
                  heading: scope.heading,
                  pitch: scope.pitch
                });
                povListenerId = google.maps.event.addListener(panorama,
                    'pov_changed', povListener);
            });

            scope.$watch( 'fov', function() {
                google.maps.event.removeListener(zoomListenerId);
                var fov = scope.fov;
                var zoom = Utils.numbers.fov2zoom(fov);
                panorama.setZoom(zoom);
                zoomListenerId = google.maps.event.addListener(panorama,
                    'zoom_changed', zoomListener);
            });

            resizePanorama_(scope, container, panoramaEl, panorama);

            scope.$watch('ratio()', function() {
                resizePanorama_(scope, container, panoramaEl, panorama);
            });

            angular.element($window).bind('resize', function() {
                resizePanorama_(scope, container, panoramaEl, panorama);
            });
        }
    };
}]);
