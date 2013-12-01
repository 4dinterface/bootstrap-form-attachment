/**
 */
'use strict';


Define( 'app.timeline.panels.Right.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};

        this.dom.editorBody = this.utilites.getById('timeline-editor-body');

        this.owner.movie.on('onframe', function(e) {
            var x = this.utilites.toPixels(this.owner.model.pixelsPerSecond, e.elapsedTime);
            this.owner.runner.view.moveTo(x);
        }.bind(this));
    }

});
