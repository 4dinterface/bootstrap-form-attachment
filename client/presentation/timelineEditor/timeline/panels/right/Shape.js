/**
 */
'use strict';

Define('app.timeline.panels.right.Shape', {
    extend: "app.timeline.Component",

    init: function() {
        this._super();

        this.dom.root = this.template.compile(this.model);
        this.dom.children = this.dom.root.querySelector('[properties]');

        this.render();

        // Скрыть/показать фигуру
        this.model.on(app.events.shape.CHANGE, 'minimized', function(event) {
            this.dom.children.classList[event.value ? 'add' : 'remove']('minimized');
        }.bind(this));

        // Активная/неактивная фигура
        this.model.on(app.events.shape.CHANGE, 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
    },


    render: function() {
        this.model.get('propertyCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.right.Property({
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
        _fn: app.templates.timeline.panels.right.shape,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});
