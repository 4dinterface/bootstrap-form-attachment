/**
 */
'use strict';


Define( 'app.timeline.panels.Right.View', {

    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
//        this.dom.panel = this.utilites.getById('timeline-panel-right');
        this.dom.editor = this.utilites.getById('timeline-panel-right__editor');
        this.dom.editorBody = this.utilites.getById('timeline-panel-right__editor-body');
        this.dom.shapes = this.utilites.getById('timeline-panel-right__editor-body__shapes');
    },


    // Возвращает смещение
    getOffsetX: function() {
        var rect = this.dom.editor.getBoundingClientRect();
        var scrollLeft = this.dom.editorBody.scrollLeft;
        return rect.left - window.pageXOffset - scrollLeft;
    }


});
