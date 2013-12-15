/**
 */
'use strict';


Define( "app.timeline.panels.Left.View", {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
        this.dom.shapes = this.utilites.getById('timeline-panel-left__shape-container');
    }

});
