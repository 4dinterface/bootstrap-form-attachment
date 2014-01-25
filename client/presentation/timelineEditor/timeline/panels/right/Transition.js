/**
 */
'use strict';

Define('app.timeline.panels.right.Transition', {
    extend: app.timeline.Component,


    init: function() {
        this._super();

        var keyframes = Object.keys(this.model);

        this.dom.document = document;
        this.dom.root = this.dom.children = this.template.compile({
            left: this.utilites.toPixels(this.composition.pixelsPerSecond, keyframes[0]),
            width: this.utilites.toPixels(this.composition.pixelsPerSecond, keyframes[1] - keyframes[0])
        });

//        this.dragShiftX = 0; //

//        this.addListeners(['runnerHead'], this.events);
    },


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
//    events: {
//        runnerHead: {
//            mousedown: function(event) {
//                this.dragShiftX = this.parent.getEditorOffsetX();
//                this.addListeners(['document'], this.events);
//                event.stopPropagation();
//                event.preventDefault();
//            }
//        },
//        document: {
//            mousemove: function(event) {
//                var x = Math.max(event.pageX - this.dragShiftX, 0);
//                var ms = this.utilites.toMilliseconds(this.composition.pixelsPerSecond, x);
//                this.movie.gotoAndStop(ms);
//            },
//            mouseup: function() {
//                this.removeListeners(['document'], this.events);
//            }
//        }
//    },
//
//
//    moveTo: function(x) {
//        this.dom.runnerHead.style.left = x + 'px';
//        this.dom.runnerBody.style.left = x + 'px';
//    },


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