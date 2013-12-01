/**
 */
'use strict';


Define( 'app.timeline.panels.Left', {

    extend: core.Component,

    init:function( cfg ) {

        this.apply(cfg);
        this.shapes = [];

        // Контроллер левой панели таймлайна
        this.controller = new app.timeline.panels.Left.Controller({
            owner: this
        });

        // Представление левой панели таймлайна
        this.view = new app.timeline.panels.Left.View({
            owner: this
        });


        this.model.on('load', function() {
            console.info('model.load');
        });

    }

});        