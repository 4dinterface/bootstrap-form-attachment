/**
 */
'use strict';


Define( 'app.timeline.panels.Right', {

    extend: core.Component,

    init: function(cfg) {

        // Ссылка на компонет таймлайна
        this.apply(cfg);

        // Контроллер правой панели таймлайна
        this.controller = new app.timeline.panels.Right.Controller({
            owner: this
        });

        // Представление правой панели таймлайна
        this.view = new app.timeline.panels.Right.View({
            owner: this
        });

        // Бегунок
        this.runner = new app.timeline.panels.right.Runner(cfg);

    }

});        