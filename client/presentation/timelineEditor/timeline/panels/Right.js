/**
 */
'use strict';

Define('app.timeline.panels.Right', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        // Бегунок
        this.runner = new app.timeline.panels.right.Runner({
            composition: this.composition,
            movie: this.movie,
            parent: this
        });

        this.dom.root = this.utilites.getById('timeline-panel-right__editor');
        this.dom.editorHead = this.utilites.getById('timeline-panel-right__editor-head');
        this.dom.editorBody = this.utilites.getById('timeline-panel-right__editor-body');
        this.dom.children = this.utilites.getById('timeline-panel-right__editor-body__shapes');

        this.addListeners(this.dom, this.events);

        this.model.on('load', function() {
            this.render();
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


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        editorHead: {
            click: function(event) {
                var shiftX = this.getEditorOffsetX() - this.getEditorScrollLeft();
                var x = event.pageX - shiftX;
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
        return rect.left;
    },


    getEditorScrollLeft: function() {
        return this.dom.editorBody.scrollLeft;
    }
});