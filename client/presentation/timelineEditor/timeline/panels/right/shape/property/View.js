/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.Property.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,


    init: function( cfg ) {
        this.apply(cfg);

        var model = this.owner.parent.parent.model;
        var keys = this.owner.model.get('keyframeCollection').cache;

        var left = this.utilites.toPixels(model.pixelsPerSecond, keys[0]);
        var width = this.utilites.toPixels(model.pixelsPerSecond, keys[keys.length - 1]);

        var property = app.templates.timeline.panels.right.shape.property({
            left: left,
            width: width
        });

        this.dom = {};
        this.dom.line = this.utilites.stringToDOM(property);
        this.dom.property = this.dom.line.querySelector('[property]');

        this.owner.parent.view.dom.properties.appendChild(this.dom.line);
    },


    getPropertyOffsetX: function() {
        var rect = this.dom.property.getBoundingClientRect();
        return rect.left - window.pageXOffset;
    },


    destroy: function() {
        //
    }


});
