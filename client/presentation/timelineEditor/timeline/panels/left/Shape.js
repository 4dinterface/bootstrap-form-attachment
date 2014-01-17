/**
 */
'use strict';

Define('app.timeline.panels.left.Shape', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        this.dom.root = this.template.compile(this.model);
        this.dom.children = this.dom.root.querySelector('[properties]');

        this.render();
    },


    render: function() {
        this.model.get('propertyCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.left.Property({
                composition: this.composition,
                model: item,
                parent: this
            }));
        }, this);
    },


    /**
     * Добавляет свойство в фигуру
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.left.shape,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});