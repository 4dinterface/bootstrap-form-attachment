/**
 */
'use strict';


Define( 'app.timeline.panels.right.Runner.Controller', {

    extend: core.Controller,

    init: function(cfg) {

        // Ссылка на компонент
        this.apply(cfg);
        this.dom = {};

        this.dom.runner = {
            head: document.getElementById('timeline-runner-head'),
            body: document.getElementById('timeline-runner-body')
        };

        this.assign(this.dom.runner.head, this.handlers);
    },

    handlers: {
        click: function() {
//            console.info('runner:click:test')
        }
    }

});
