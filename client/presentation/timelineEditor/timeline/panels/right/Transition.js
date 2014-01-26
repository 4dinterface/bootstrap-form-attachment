/**
 */
'use strict';

Define('app.timeline.panels.right.Transition', {
    extend: 'app.timeline.Component',


    init: function() {
        this._super();

        var keyframes = Object.keys(this.model);

        this.dom.document = document;
        this.dom.root = this.dom.children = this.template.compile({
            left: this.utilites.toPixels(this.composition.pixelsPerSecond, keyframes[0]),
            width: this.utilites.toPixels(this.composition.pixelsPerSecond, keyframes[1] - keyframes[0])
        });

        this.dragShiftX = 0; //

        this.addListeners(['root'], this.events);
    },


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        root: {
            mousedown: function(event) {
                var offsetX = event.pageX - this.getRootOffsetX();
                this.dragShiftX = offsetX + this.parent.parent.parent.getEditorOffsetX();
                this.addListeners(['document'], this.events);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(event) {
                this.dom.root.style.left = event.pageX - this.dragShiftX + 'px';
            },
            mouseup: function() {
                this.removeListeners(['document'], this.events);
            }
        }
    },


    getRootOffsetX: function() {
        var rect = this.dom.root.getBoundingClientRect();
        return rect.left;
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.transition,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});