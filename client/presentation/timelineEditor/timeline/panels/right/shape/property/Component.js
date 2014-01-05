/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.Property', {

    extend: core.Component,


    init: function(cfg) {
        this.apply(cfg);
        this.keyframes = [];

        // Контроллер фигуры на левой панели таймлайна
        this.controller = new app.timeline.panels.right.shape.Property.Controller({
            owner: this
        });

        // Представление фигуры на левой панели таймлайна
        this.view = new app.timeline.panels.right.shape.Property.View({
            owner: this
        });

        this.render();
    },


    render: function() {
        this.model.get('keyframeCollection').forEach(function(keyframe) {
            this.keyframes.push(new app.timeline.panels.right.shape.property.Keyframe({
                model: keyframe,
                parent: this
            }));
        }, this);
    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        