/**
 */
'use strict';

Define('app.timeline.panels.right.Keyframe', {
    extend: core.Component,

    utilites: app.timeline.utilites,

    init: function(cfg) {
        this.apply(cfg);

        this.dom = {};
        this.dom.root = this.template.compile({
            left: this.utilites.toPixels(this.composition.pixelsPerSecond, this.model.data.key)
        });
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.keyframe,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    },

    destroy: function() {
        delete this.dom;
    }
});