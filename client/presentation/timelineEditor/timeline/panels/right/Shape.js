/**
 */
'use strict';

Define('app.timeline.panels.right.Shape', {
    extend: core.Controller,

    helpers: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);
        this.children = [];

        this.dom = {};
        this.dom.root = this.template.compile(this.model);
        this.dom.children = this.dom.root.querySelector('[properties]');

        this.render();
    },


    render: function() {
        this.model.get('propertyCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.right.Property({
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
        _fn: app.templates.timeline.panels.right.shape,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    },


    destroy: function() {
        delete this.dom;
    }
});