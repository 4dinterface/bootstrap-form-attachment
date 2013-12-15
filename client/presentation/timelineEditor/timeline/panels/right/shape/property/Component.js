/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.Property', {

    extend: core.Component,

    init:function( cfg ) {

        this.apply(cfg);

        // Контроллер фигуры на левой панели таймлайна
        this.controller = new app.timeline.panels.right.shape.Property.Controller({
            owner: this
        });

        // Представление фигуры на левой панели таймлайна
        this.view = new app.timeline.panels.right.shape.Property.View({
            owner: this
        });

    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        