/**
 */
'use strict';


Define( 'app.timeline.panels.left.Shape.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function( cfg ) {
        this.apply(cfg);

        var shape = app.templates.timeline.panels.left.shape(this.owner.shape);

        this.dom = {};
        this.dom.shape = this.utilites.stringToDOM(shape);

        this.owner.parent.view.dom.shapeContainer.appendChild(this.dom.shape);
    },


    destroy: function() {
        //
    }


});
