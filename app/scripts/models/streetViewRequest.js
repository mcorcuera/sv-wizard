var svWizard = svWizard || {};

svWizard.StreetViewRequest = Backbone.Model.extend({
    defaults: {
        name: 'No name',
        location: {
            lat: 0.0,
            lng: 0.0
        },
        heading: 90,
        pitch: 90,
        fov: 90,
        size: {
            width: 640,
            height: 640
        },
        authenticationMode: svWizard.AuthenticationMode.NONE
    }
});