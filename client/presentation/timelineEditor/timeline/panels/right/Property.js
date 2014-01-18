/**
 */
'use strict';

Define('app.timeline.panels.right.Property', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        var keys = this.model.get('keyframeCollection').cache;

        this.dom.document = document;
        this.dom.root = this.dom.children = this.template.compile({
            left: this.utilites.toPixels(this.composition.pixelsPerSecond, keys[0]),
            width: this.utilites.toPixels(this.composition.pixelsPerSecond, keys[keys.length - 1])
        });
        this.dom.property = this.dom.root.querySelector('[property]');

        this.offsetX = 0; //

        this.addListeners(['property'], this.events);
        this.render();

        // Активное/неактивное свойство
        this.model.on('propertychange', 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
    },


    render: function() {
        this.model.get('keyframeCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.right.Keyframe({
                composition: this.composition,
                model: item,
                parent: this
            }));
        }, this);
    },


    /**
     * Добавляет ключ в свойство
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);
    },

    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        property: {
            mousedown: function(event) {
                var propertyOffsetX = this.getPropertyOffsetX();
                var editorOffsetX = this.parent.parent.getEditorOffsetX();
                this.offsetX = event.pageX - (propertyOffsetX - editorOffsetX);
                this.addListeners(['document'], this.events);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(event) {
                this.dom.property.style.left = event.pageX - this.offsetX + 'px';
            },
            mouseup: function() {
                this.removeListeners(['document'], this.events);
            }
        }
    },


    getPropertyOffsetX: function() {
        var rect = this.dom.property.getBoundingClientRect();
        return rect.left - window.pageXOffset;
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.property,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});