/**
 */
'use strict';


Define( 'app.timeline.panels.left.Shape', {

    extend: core.Component,

    init:function( cfg ) {

        // Ссылка на левую панель таймлайна
        this.parent = cfg.parent;

        // Контроллер фигуры на левой таймлайна
        this.controller = new app.timeline.panels.left.Shape.Controller({
            component: this
        });

        // Представление фигуры на левой таймлайна
        this.view = new app.timeline.panels.left.Shape.View({
            component: this
        });

    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        