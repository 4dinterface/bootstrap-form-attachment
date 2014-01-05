/**
 * Представление таймлана
 */
'use strict';


Define( "app.timeline.Timeline.View", {

    extend: core.Component,

    init: function( cfg ) {
        this.apply(cfg);
        this.domRoot = document.getElementById('timeline')
    }

});
