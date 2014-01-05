/**
 */
'use strict';


Define( 'app.timeline.panels.Right.Controller', {

    extend: core.Controller,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
        this.dom.editor = this.utilites.getById('timeline-panel-right__editor');
        this.dom.editorBody = this.utilites.getById('timeline-panel-right__editor-body');

        this.assign(this.dom.editorBody, this.handlers);
    },


    handlers: {
        click: function(event) {
            var rect = this.dom.editor.getBoundingClientRect();
            var scrollLeft = this.dom.editorBody.scrollLeft;
            var x = event.pageX - window.pageXOffset - (rect.left - scrollLeft);
            var ms = this.utilites.toMilliseconds(this.owner.model.pixelsPerSecond, x);
            this.owner.movie.gotoAndStop(ms);
        }
    }


});
