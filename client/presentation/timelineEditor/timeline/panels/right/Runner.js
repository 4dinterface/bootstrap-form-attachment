/**
 */
'use strict';

Define('app.timeline.panels.right.Runner', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.runnerHead = document.getElementById('timeline-panel-right__runner-head');
        this.dom.runnerBody = document.getElementById('timeline-panel-right__runner-body');
        this.dom.document = document;

        this.dragShiftX = 0; //

        this.addListeners(['runnerHead'], this.events);

        this.movie.on('onframe', function(e) {
            var x = this.utilites.toPixels(this.composition.pixelsPerSecond, e.elapsedTime);
            this.moveTo(x);
        }.bind(this));
    },


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        runnerHead: {
            mousedown: function(event) {
                this.dragShiftX = this.parent.getEditorOffsetX();
                this.addListeners(['document'], this.events);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(event) {
                var x = Math.max(event.pageX - this.dragShiftX, 0);
                var ms = this.utilites.toMilliseconds(this.composition.pixelsPerSecond, x);
                this.movie.gotoAndStop(ms);
            },
            mouseup: function() {
                this.removeListeners(['document'], this.events);
            }
        }
    },


    moveTo: function(x) {
        this.dom.runnerHead.style.left = x + 'px';
        this.dom.runnerBody.style.left = x + 'px';
    }
});
