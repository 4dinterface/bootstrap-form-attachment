'use strict';

Define( 'app.timeline.utilites', {

    extend: app.Component,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


    init: function( cfg ) {
        this._super();
        this.apply( cfg );

    }

});
