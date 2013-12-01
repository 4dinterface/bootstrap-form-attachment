/**
 * Базовый класс компонента
 * @class
 * @name app.Component
 */
'use strict';


Define( "core.Controller", /** @lends {app.Component.prototype} */({

    extend: "core.Component",    


    /**
     * @constructor
     */
    init: function() {
        //this.apply();
        this._super();

        if('domListeners' in this) this.bind( Object.keys( this.domListeners ) );
    },

    


    /**
     * Привязывает обработчики событий к элементам
     * @param {Array|String} listeners
     */
    bind: function( listeners ) {
        listeners = $.isArray( listeners ) ? listeners : [ listeners ];

        listeners.forEach(function( listener ){
            var params = listener.split( '%' );

            // Один обработчик на все события
            if ( $.isFunction( this.domListeners[ listener ] ) ) {

                listener = $.trim( listener );
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

        }, this );

    },

    /**
     * Назначает обработчики событий html элементу через свойства (DOM Level 0)
     * @param {HTMLElement} elem
     * @param {Object} handlers В формате { click: handler }
     * @param {Object} [context]
     */
    assign: function(elem, handlers, context) {
        for(var key in handlers) {
            elem['on' + key] = handlers[key].bind(context || this, elem);
        }
    },


    //события
    listeners: null


}));
