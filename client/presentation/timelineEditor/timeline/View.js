/**
 * Представление таймлана
 */
'use strict';


Define( "app.timeline.Timeline.View", {

    extend: core.Component,

    init: function( cfg ) {

        this.owner = cfg.component;
        this.domRoot = document.getElementById('timeline')

    }

});
