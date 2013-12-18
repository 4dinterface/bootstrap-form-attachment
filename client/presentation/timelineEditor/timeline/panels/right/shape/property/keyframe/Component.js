/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.property.Keyframe', {

    extend: core.Component,

    init:function( cfg ) {

        this.apply(cfg);

        // Контроллер фигуры на левой панели таймлайна
        this.controller = new app.timeline.panels.right.shape.property.Keyframe.Controller({
            owner: this
        });

        // Представление фигуры на левой панели таймлайна
        this.view = new app.timeline.panels.right.shape.property.Keyframe.View({
            owner: this
        });

    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        