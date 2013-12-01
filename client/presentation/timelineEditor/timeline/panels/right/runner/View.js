/**
 */
'use strict';


Define( 'app.timeline.panels.right.Runner.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        // Ссылка на компонент
        this.apply(cfg);

        this.dom = {};
      
        this.dom.editor = {};
        this.dom.editor.body = this.utilites.getById('timeline-editor-body');

        this.dom.runner = {};
        this.dom.runner.head = this.utilites.getById('timeline-runner-head');
        this.dom.runner.body = this.utilites.getById('timeline-runner-body');

        this.owner.movie.on('onframe', function(e) {
            var x = this.utilites.toPixels(this.owner.model.pixelsPerSecond, e.elapsedTime);
            this.moveTo(x);
        }.bind(this));
    },


    moveTo: function(x) {
        var scrollLeft = this.dom.editor.body.scrollLeft;
        this.dom.runner.head.style.left = x - scrollLeft + 'px';
        this.dom.runner.body.style.left = x + 'px';
    }


});
