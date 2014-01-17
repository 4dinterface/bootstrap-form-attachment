/**
 */
'use strict';

Define('app.timeline.panels.right.Runner', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        this.dom.runnerHead = document.getElementById('timeline-panel-right__runner-head');
        this.dom.runnerBody = document.getElementById('timeline-panel-right__runner-body');
    },


    moveTo: function(x) {
        this.dom.runnerHead.style.left = x + 'px';
        this.dom.runnerBody.style.left = x + 'px';
    }
});