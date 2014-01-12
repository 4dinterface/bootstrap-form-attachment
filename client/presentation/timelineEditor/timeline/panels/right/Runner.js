/**
 */
'use strict';

Define('app.timeline.panels.right.Runner', {
    extend: core.Component,


    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
        this.dom.runnerHead = document.getElementById('timeline-panel-right__runner-head');
        this.dom.runnerBody = document.getElementById('timeline-panel-right__runner-body');
    },


    moveTo: function(x) {
        this.dom.runnerHead.style.left = x + 'px';
        this.dom.runnerBody.style.left = x + 'px';
    },


    destroy: function() {
        delete this.dom;
    }
});