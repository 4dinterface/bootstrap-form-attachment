/**
 */
'use strict';

Define('app.timeline.panels.left.Shape', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.root = this.template.compile(this.model);
        this.dom.children = this.dom.root.querySelector('[properties]');
        this.dom.minimize = this.dom.root.querySelector('[minimize]');
        this.dom.disabled = this.dom.root.querySelector('[disabled]');

        this.addListeners(this.dom, this.events);
        this.render();

        // Скрыть/показать фигуру
        this.model.on('shapechange', 'minimized', function(event) {
            this.dom.children.classList[event.value ? 'add' : 'remove']('minimized');
        }.bind(this));

        // Активная/неактивная фигура
        this.model.on('shapechange', 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
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
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        minimize: {
            click: function() {
                this.model.set('minimized', !this.model.get('minimized'));
            }
        },
        disabled: {
            click: function() {
                this.model.set('disabled', !this.model.get('disabled'));
            }
        }
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