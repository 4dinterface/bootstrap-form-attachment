/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.property.Keyframe.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,


    init: function( cfg ) {
        this.apply(cfg);

        var model = this.owner.parent.parent.parent.model;
        var left = this.utilites.toPixels(model.pixelsPerSecond, this.owner.model.data.key);

        var keyframe = app.templates.timeline.panels.right.shape.property.keyframe({
            left: left
        });

        this.dom = {};
        this.dom.keyframe = this.utilites.stringToDOM(keyframe);

        this.owner.parent.view.dom.line.appendChild(this.dom.keyframe);
    },


    destroy: function() {
        //
    }


});
