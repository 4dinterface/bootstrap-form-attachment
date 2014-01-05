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

        this.dom.runnerHead = this.utilites.getById('timeline-panel-right__runner-head');
        this.dom.runnerBody = this.utilites.getById('timeline-panel-right__runner-body');
    },


    moveTo: function(x) {
        this.dom.runnerHead.style.left = x + 'px';
        this.dom.runnerBody.style.left = x + 'px';
    }


});
