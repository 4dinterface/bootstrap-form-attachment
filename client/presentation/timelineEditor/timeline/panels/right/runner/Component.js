/**
 */
'use strict';


Define( 'app.timeline.panels.right.Runner', {

    extend: core.Component,

    init:function( cfg ) {

        // Ссылка на компонет правой панель таймлайна
        this.apply(cfg);

        // Контроллер бегунка
        this.controller = new app.timeline.panels.right.Runner.Controller({
            owner: this
        });

        // Представление бегунка
        this.view = new app.timeline.panels.right.Runner.View({
            owner: this
        });


        // TODO: тест создание фигуры на левой панели таймлайна
        var shape = new app.timeline.panels.left.Shape({
            parent: this
        });

        console.info('тест создание фигуры на левой панели таймлайна', shape);

    }

});        