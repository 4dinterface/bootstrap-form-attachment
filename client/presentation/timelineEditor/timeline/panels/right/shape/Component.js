/**
 */
'use strict';


Define( 'app.timeline.panels.right.Shape', {

    extend: core.Component,


    init:function(cfg) {

        this.apply(cfg);
        this.shapes = [];

        // Контроллер левой панели таймлайна
        this.controller = new app.timeline.panels.right.Shape.Controller({
            owner: this
        });

        // Представление левой панели таймлайна
        this.view = new app.timeline.panels.right.Shape.View({
            owner: this
        });

        this.model.on('load', function() {
            this.render();
        }.bind(this));
    },


    render: function() {
//        this.model.get('propertyCollection').forEach(function(property) {
//            this.properties.push(new app.timeline.panels.right.shape.Property({
//                model: property,
//                parent: this
//            }));
//        }.bind(this));
    },


    destroy: function() {
        this.controller.destroy();
        this.view.destroy();
    }


});        