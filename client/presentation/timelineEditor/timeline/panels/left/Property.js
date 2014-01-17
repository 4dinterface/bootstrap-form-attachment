/**
 */
'use strict';

Define('app.timeline.panels.left.Property', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

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
    }
});