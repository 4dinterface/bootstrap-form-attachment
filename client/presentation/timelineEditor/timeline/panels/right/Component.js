/**
 */
'use strict';


Define( 'app.timeline.panels.Right', {

    extend: core.Component,

    init:function( cfg ) {

        // Ссылка на компонет таймлайна
        this.parent = cfg.parent;

        // Контроллер правой панели таймлайна
        this.controller = new app.timeline.panels.Right.Controller({
            component: this
        });

        // Представление правой панели таймлайна
        this.view = new app.timeline.panels.Right.View({
            component: this
        });

    }

});        