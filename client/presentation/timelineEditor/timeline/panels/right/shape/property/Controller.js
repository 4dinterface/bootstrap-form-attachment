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
            click: function(event) {
                this.attach({ document: this.dom.document }, this.events);
            }
        },
        document: {
            click: function() {
                console.log('doc');
            }
        }
    },


    destroy: function() {
        //
    }


});
