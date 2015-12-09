var svWizard = svWizard || {};

svWizard.StreetViewRequestView = Backbone.View.extend({
    initialize: function() {
        this.render();
        this.$el = $('#' + this.id);
    }, 
    render: function() {
        Polymer.dom($('#sv-request').find('#width')).value = "12";
        console.log( $('#sv-request'));
        console.log( this.$el);
    }
});