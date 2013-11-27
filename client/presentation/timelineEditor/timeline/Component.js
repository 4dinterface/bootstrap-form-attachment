/**
 * Таймлайн
 */
'use strict';


Define( 'app.timeline.Timeline', {

    extend: core.Component,

    init:function( cfg ) {

        this.model = cfg.model;
        this.movie = cfg.movie;


        // Контроллер таймлайна
        this.controller = new app.timeline.Timeline.Controller({
            component: this
        });

        // Представление таймлайна
        this.view = new app.timeline.Timeline.View({
            component: this
        });


        // Левая и правая панели таймлайна
        this.panels = {
            left: new app.timeline.panels.Left({
                parent: this
            }),
            right: new app.timeline.panels.Right({
                parent: this
            })
        };

        console.info( 'app.timeline.Timeline', this)

    }
});        