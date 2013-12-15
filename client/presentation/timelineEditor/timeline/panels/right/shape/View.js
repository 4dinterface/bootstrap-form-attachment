/**
 */
'use strict';


Define( "app.timeline.panels.right.Shape.View", {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        var shape = app.templates.timeline.panels.right.shape(this.owner.model);

        this.dom = {};
        this.dom.shape = this.utilites.stringToDOM(shape);
        this.dom.properties = this.dom.shape.querySelector('[properties]');

        this.owner.parent.view.dom.shapes.appendChild(this.dom.shape);
    },

    destroy: function() {
        //
    }

});
