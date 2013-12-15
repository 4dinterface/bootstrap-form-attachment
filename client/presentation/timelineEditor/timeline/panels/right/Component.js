/**
 */
'use strict';


Define( 'app.timeline.panels.Right', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {

        // Ссылка на компонет таймлайна
        this.apply(cfg);
        this.shapes = [];

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


        this.model.on('load', function() {
            this.render();
        }.bind(this));


        this.movie.on('onframe', function(e) {
            var x = this.utilites.toPixels(this.model.pixelsPerSecond, e.elapsedTime);
            this.runner.view.moveTo(x);
        }.bind(this));
    },


    render: function() {
        this.model.get('shapeCollection').forEach(function(shape) {
            this.shapes.push(new app.timeline.panels.right.Shape({
                model: shape,
                parent: this
            }));
        }, this);
    }


});        