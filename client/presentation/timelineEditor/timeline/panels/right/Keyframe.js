/**
 */
'use strict';

Define('app.timeline.panels.right.Keyframe', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

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
    }
});