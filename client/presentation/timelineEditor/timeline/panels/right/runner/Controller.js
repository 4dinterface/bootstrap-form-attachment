/**
 */
'use strict';


Define( 'app.timeline.panels.right.Runner.Controller', {

    extend: core.Controller,

    utilites: app.timeline.utilites,

    init: function(cfg) {

        // Ссылка на компонент
        this.apply(cfg);
        this.dom = {};

        this.dom.runnerHead = this.utilites.getById('timeline-runner-head');
        this.dom.runnerBody = this.utilites.getById('timeline-runner-body');

        this.assign(this.dom.runnerHead, this.handlers);
    },

    handlers: {
        click: function() {
//            console.info('runner:click:test')
        }
    }

});
