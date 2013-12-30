/**
 */
'use strict';


Define( 'app.timeline.panels.right.shape.Property.Controller', {

    extend: core.Controller,

    init: function(cfg) {
        this.apply(cfg);
        this.attach();

        this.dom.document = document;
    },


    events: {
        property: {
            mousedown: function(event) {
                var offsetX = this.owner.parent.parent.view.getOffsetX();
                var x = event.pageX - offsetX;
                this.attach({ document: this.dom.document}, this.events, offsetX);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(offsetX, event) {
                console.log('doc', arguments);
            },
            mouseup: function() {
                this.detach({ document: this.dom.document }, this.events);
                console.log(111111111111111);
            }
        }
    },


    destroy: function() {
        //
    }


});
