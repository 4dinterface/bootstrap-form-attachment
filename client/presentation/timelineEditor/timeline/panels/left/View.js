/**
 */
'use strict';


Define( "app.timeline.panels.Left.View", {

    extend: core.Component,

    init: function(cfg) {
        this.apply(cfg);

        this.owner.model.on('load', function() {
            console.info('model.load', this.model);
        }.bind(this));
    }

});
