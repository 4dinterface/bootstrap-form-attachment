/**
 */
'use strict';


Define( 'app.timeline.panels.left.shape.Property.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function( cfg ) {
        this.apply(cfg);

        var property = app.templates.timeline.panels.left.shape.property(this.owner.model);

        this.dom = {};
        this.dom.property = this.utilites.stringToDOM(property);

        this.owner.parent.view.dom.properties.appendChild(this.dom.property);
    },


    destroy: function() {
        //
    }


});
