/**
 */
'use strict';

Define('app.timeline.panels.right.Ruler', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.root = this.children = this.utilites.getById('timeline-panel-right__ruler');

        this.render();
    },


    render: function() {
        var visibleWidth = this.parent.getEditorVisibleWidth();
        var scrollLeft = this.parent.getEditorScrollLeft();

        var pixelsPerSecond = this.composition.pixelsPerSecond / 1;
        var stepInPx = pixelsPerSecond / 1; //zoom;

        var startInPx = this.utilites.roundToIntByNumber(scrollLeft, stepInPx, -1);
        var endInPx = this.utilites.roundToIntByNumber(scrollLeft + visibleWidth, stepInPx, 1);

        var data = {
            left: -(scrollLeft % stepInPx), // TODO: переписать?
            ticks: []
        };

        // Далее рассчет ведется в миллисекундах
        var startInMs = this.utilites.toMilliseconds(pixelsPerSecond, startInPx);
        var endInMs = this.utilites.toMilliseconds(pixelsPerSecond, endInPx);
        var stepInMs = this.utilites.toMilliseconds(pixelsPerSecond, stepInPx);

        while(startInMs < endInMs) {
            data.ticks.push({
                width: pixelsPerSecond,
                value: startInMs
            });
            startInMs += stepInMs;
        }

        this.dom.root.innerHTML = this.template.fill(data);
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.ruler,
        fill: function(data) {
            return this._fn(data);
        },
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});
