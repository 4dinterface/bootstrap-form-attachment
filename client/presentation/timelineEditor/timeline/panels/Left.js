/**
 */
'use strict';

Define('app.timeline.panels.Left', {
    extend: core.Component,


    init: function(cfg) {
        this.apply(cfg);
        this.children = []; // детки-конфетки

        this.dom = {};
        this.dom.children = document.getElementById('timeline-panel-left__shapes');

        this.model.on('load', function() {
            this.render();
        }.bind(this));
    },


    render: function() {
        this.model.get('shapeCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.left.Shape({
                composition: this.composition,
                model: item,
                parent: this
            }));
        }, this);
    },


    /**
     * Добавляет фигуру на панель
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);
    },


    destroy: function() {
        delete this.dom;
    }
});