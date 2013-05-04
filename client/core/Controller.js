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
        //this.apply();
        this._super();


        var listener;
        var params;


        for( listener in this.domListeners ) {
            
            // Один обработчик на все события
            if ( $.isFunction( this.domListeners[ listener ] ) ) {

                params = listener.split( '%' );

                if ( !params[ 0 ].length ) {
                    params.shift();
                }

                switch ( params.length ) {

                    case 3:
                        $( params[ 0 ], this.domTarget )
                            .on( params[ 1 ], params[ 2 ], this.domListeners[ listener ].bind( this ) );
                        break;

                    case 2:
                        $( params[ 0 ], this.domTarget )
                            .on( params[ 1 ], this.domListeners[ listener ].bind( this ) );
                        break;

                    case 1:
                        $( this.domTarget )
                            .on( params[ 0 ], this.domListeners[ listener ].bind( this ) );
                        break;

                }

            // Несколько обработчиков
            } else {

                listener = $.trim( listener );

                // object

            }

        }
1
    },


    //события
    listeners: null


}));
