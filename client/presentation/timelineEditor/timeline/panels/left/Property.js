/**
 */
'use strict';

Define('app.timeline.panels.left.Property', {
    extend: core.Component,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
        this.dom.root = this.template.compile(this.model);
    },

    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.left.property,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    },

    destroy: function() {
        delete this.dom;
    }
});