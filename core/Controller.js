'use strict';

/**
 * @class core.Controller
 * @augments core.Component
 * @classdesc
 * Контроллер
 */
Define( "core.Controller", /** @lends core.Controller.prototype */{

    extend: "core.Component",    
    
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
            elem['on' + key] = handlers[key].bind(context || this);
        }
    },


    /**
     * Прикрепляет обработчики события к dom-элементу
     * @param {HTMLElement} element
     * @param {Object} events Пример {event:function}
     * @param {*} [data] Данные, кот. крепятся к обработчикам
     */
    attach: function(element, events, data) {
        var that = this, elem, event;
        this._fn = this._fn || {};

        // get key for dom element
        for(elem in this.dom) {
            if (this.dom[elem] === element) break;
        }

        this._fn[elem] = this._fn[elem] || {};

        for(event in events) {
            this._fn[elem][event] = function(e) {events[e.type].call(that, e, data);};
            element.addEventListener(event, this._fn[elem][event], false);
        }
    },


    /**
     * Отвязывает обработчики событий от dom-элементов
     * @param {HTMLElement} element
     * @param {Object} events Пример {event:function}
     */
    detach: function(element, events) {
        var elem, event;
        this._fn = this._fn || {};

        // get key for dom element
        for(elem in this.dom) {
            if (this.dom[elem] === element) break;
        }

        this._fn[elem] = this._fn[elem] || {};

        for(event in events) {
            element.removeEventListener(event, this._fn[elem][event], false);
            delete this._fn[elem][event];
        }
    },


    //события
    listeners: null


});
