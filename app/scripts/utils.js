var svWizard = svWizard || {};

svWizard.utils = {};

svWizard.utils.numbers = (function() {
    var numbers = {};
    numbers.decimalPlaces = function(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round( num * multiplier) / multiplier;
    };
    
    numbers.wrap = function(num,max) {
        if( num >= 0) {
            return num % max;
        }else if( num < 0) {
            return max + num%max;
        }
    };
    
    //From the documentation: https://goo.gl/hCvvt
    // fov = 180 / (2 ^ zoom)
    // zoom = (log(180) - log(fov))/log(2)
    numbers.fov2zoom = function(fov) {
        return Math.log(180/fov) / Math.log(2);
    };
    
    numbers.zoom2fov = function(zoom) {
        return 180 / (Math.pow(2,zoom));
    }
    return numbers;
})();

svWizard.utils.ui = {
    
}