/**
 */
'use strict';

Define('app.timeline.panels.Right', {
    extend: app.timeline.Component,


    init: function(cfg) {
        this._super();

        // Бегунок
        this.runner = new app.timeline.panels.right.Runner(cfg);

        this.dom.root = this.utilites.getById('timeline-panel-right__editor');
        this.dom.editorBody = this.utilites.getById('timeline-panel-right__editor-body');
        this.dom.children = this.utilites.getById('timeline-panel-right__editor-body__shapes');

        this.attach(this.dom.editorBody, this.events.editorBody);

        this.model.on('load', function() {
            this.render();
        }.bind(this));

        this.movie.on('onframe', function(e) {
            var x = this.utilites.toPixels(this.model.pixelsPerSecond, e.elapsedTime);
            this.runner.moveTo(x);
        }.bind(this));
    },


    render: function() {
        this.model.get('shapeCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.right.Shape({
                composition: this.composition,
                model: item,
                parent: this
            }));
        }, this);
    },


    events: {
        editorBody: {
            click: function(event) {
                var offsetX = this.getEditorOffsetX();
                var x = event.pageX - offsetX;
                var ms = this.utilites.toMilliseconds(this.model.pixelsPerSecond, x);
                this.movie.gotoAndStop(ms);
            }
        }
    },

    /**
     * Добавляет фигуру на панель
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);
    },


    getEditorOffsetX: function() {
        var rect = this.dom.root.getBoundingClientRect();
        var scrollLeft = this.dom.editorBody.scrollLeft;
        return rect.left - window.pageXOffset - scrollLeft;
    }
});