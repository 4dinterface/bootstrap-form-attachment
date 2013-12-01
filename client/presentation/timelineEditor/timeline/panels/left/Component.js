/**
 */
'use strict';


Define( 'app.timeline.panels.Left', {

    extend: core.Component,

    init:function( cfg ) {

        // Ссылка на компонет таймлайна
        this.parent = cfg.parent;

        // Контроллер левой панели таймлайна
        this.controller = new app.timeline.panels.Left.Controller({
            owner: this
        });

        // Представление левой панели таймлайна
        this.view = new app.timeline.panels.Left.View({
            owner: this
        });


        // TODO: тест создание фигуры на левой панели таймлайна
        var shape = new app.timeline.panels.left.Shape({
            parent: this
        });

        console.info('тест создание фигуры на левой панели таймлайна', shape);

    }

});        