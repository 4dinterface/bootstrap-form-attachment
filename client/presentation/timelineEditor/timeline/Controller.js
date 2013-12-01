/**
 * Контроллер таймлана
 *
 */
'use strict';


Define( 'app.timeline.Timeline.Controller', {

    extend: core.Controller,

    init: function( cfg ) {

        this.owner = cfg.component;
        this.domRoot = document.getElementById('timeline');

        this.assign(this.domRoot, this.handlers);
    },


    handlers: {
        /**
         * @param {HTMLElement} elem
         * @param {Event} event
         * @this {Controller}
         */
        click: function(elem, event) {
            console.log(this, arguments);
        }
    }

});
