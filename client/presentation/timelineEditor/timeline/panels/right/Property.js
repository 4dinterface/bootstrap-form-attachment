/**
 */
'use strict';

Define('app.timeline.panels.right.Property', {
    extend: core.Controller,

    helpers: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);
        this.children = [];

        var keys = this.model.get('keyframeCollection').cache;

        this.dom = {};
        this.dom.document = document;
        this.dom.root = this.dom.children = this.template.compile({
            left: this.helpers.toPixels(this.composition.pixelsPerSecond, keys[0]),
            width: this.helpers.toPixels(this.composition.pixelsPerSecond, keys[keys.length - 1])
        });
        this.dom.property = this.dom.root.querySelector('[property]');

        this.attach(this.dom.property, this.events.property);
        this.render();
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


    events: {
        property: {
            mousedown: function(event) {
                var propertyOffsetX = this.getPropertyOffsetX();
                var editorOffsetX = this.parent.parent.getEditorOffsetX();
                var offsetX = event.pageX - (propertyOffsetX - editorOffsetX);
                this.attach(this.dom.document, this.events.document, offsetX);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(event, offsetX) {
                this.dom.property.style.left = event.pageX - offsetX + 'px';
            },
            mouseup: function() {
                this.detach(this.dom.document, this.events.document);
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
    },


    destroy: function() {
        delete this.dom;
    }
});