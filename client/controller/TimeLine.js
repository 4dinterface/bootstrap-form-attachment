'use strict';

Define( 'app.controller.Timeline', {

    extend: app.Component,

    init: function( prop ) {
        this.super();
        this.apply( prop );


        // объект, в котором хранится сведения о представлении таймлайна
        this.model.timeline = {
            pixelsPerSecond: 100,
            zoom: 1,
            width: 800
        };

    }

});
