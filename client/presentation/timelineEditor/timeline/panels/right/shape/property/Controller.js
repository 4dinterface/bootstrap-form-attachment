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
                var propertyOffsetX = this.owner.view.getPropertyOffsetX();
                var editorOffsetX = this.owner.parent.parent.view.getEditorOffsetX();
                var offsetX = event.pageX - (propertyOffsetX - editorOffsetX);
                this.attach({ document: this.dom.document}, this.events, offsetX);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(offsetX, event) {
                this.owner.view.dom.property.style.left = event.pageX - offsetX + 'px';
            },
            mouseup: function() {
                this.detach({ document: this.dom.document }, this.events);
            }
        }
    },


    destroy: function() {
        //
    }


});
