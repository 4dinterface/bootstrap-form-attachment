/**
 */
'use strict';


Define( 'app.timeline.panels.right.Shape', {

    extend: core.Component,


    init:function(cfg) {
        this.apply(cfg);
        this.properties = [];

        // Контроллер левой панели таймлайна
        this.controller = new app.timeline.panels.right.Shape.Controller({
            owner: this
        });

        // Представление левой панели таймлайна
        this.view = new app.timeline.panels.right.Shape.View({
            owner: this
        });

        this.render();
    },


    render: function() {
        this.model.get('propertyCollection').forEach(function(property) {
            this.properties.push(new app.timeline.panels.right.shape.Property({
                model: property,
                parent: this
            }));
        }, this);
    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        