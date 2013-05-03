/**
 * Базовый класс компонента
 * @class
 * @name app.Component
 */
'use strict';


Define( "app.Controller", /** @lends {app.Component.prototype} */({

    extend: "app.Component",


    /**
     * @constructor
     */
    init: function() {
        this.apply();

        var listener;
        var selector;
        var event;
        var index;


        for( listener in this.domListeners ) {

            // Один обработчик на все события
            if ( $.isFunction( this.domListeners[ listener ] ) ) {

                listener = $.trim( listener );
                index = listener.indexOf( '%' );

                if ( index > 0 ) {
                    selector = listener.slice( 0, index );
                    event = listener.slice( index + 1 );

                    $( this.domTarget ).find( selector ).on( event, this.domListeners[ listener ].bind( this ) );
                } else {
                    index = !index < 0 ? 0: index + 1;
                    event = listener.slice( index );

                    $( this.domTarget ).on( event, this.domListeners[ listener ].bind( this ) );
                }

            // Несколько обработчиков
            } else {

                listener = $.trim( listener );

                // object

            }

        }

        this._super();
    },


    //события
    listeners: null


}));
