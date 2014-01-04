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

        this.attach(this.dom.editorBody, this.events.editorBody);
    },


    events: {
        editorBody: {
            click: function(event) {
                var offsetX = this.owner.view.getEditorOffsetX();
                var x = event.pageX - offsetX;
                var ms = this.utilites.toMilliseconds(this.owner.model.pixelsPerSecond, x);
                this.owner.movie.gotoAndStop(ms);
            }
        }
    }


});
