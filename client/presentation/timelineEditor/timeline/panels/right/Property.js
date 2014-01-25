/**
 */
'use strict';

Define('app.timeline.panels.right.Property', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        this.dom.root = this.dom.children = this.template.compile();

        this.render();

        // Активное/неактивное свойство
        this.model.on('propertychange', 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
    },


    render: function() {
        var collection = this.model.get('keyframeCollection');
        var cache = collection.cache;

        for(var i = 0, len = cache.length - 1; i < len; i++) {
            var key1 = cache[i];
            var key2 = cache[i + 1];
            var model = {};

            model[key1] = collection[key1];
            model[key2] = collection[key2];

            this.addChild(new app.timeline.panels.right.Transition({
                composition: this.composition,
                model: model,
                parent: this
            }));
        }
    },


    /**
     * Добавляет переход в свойство
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
        _fn: app.templates.timeline.panels.right.property,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});