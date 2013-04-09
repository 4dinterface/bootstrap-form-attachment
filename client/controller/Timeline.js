'use strict';

Define( 'app.controller.Timeline', {

    extend: app.Component,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


    init: function( prop ) {
        this._super();
        this.apply( prop );


        // объект, в котором хранится сведения о представлении таймлайна
        this.model.timeline = {
            pixelsPerSecond: 100,
            zoom: 1,
            width: 800
        };

    }

});
