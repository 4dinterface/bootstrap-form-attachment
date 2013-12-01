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

        this.dom.runner = {};
        this.dom.runner.head = this.utilites.getById('timeline-runner-head');
        this.dom.runner.body = this.utilites.getById('timeline-runner-body');
    },


    moveTo: function(x) {
        this.dom.runner.head.style.left = x + 'px';
        this.dom.runner.body.style.left = x + 'px';
    }


});
