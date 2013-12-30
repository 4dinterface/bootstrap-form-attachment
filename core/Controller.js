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
     * Прикрепляет обработчики события к dom-элементам
     * @param {Object} [elements=this.dom] Пример {elem:dom}
     * @param {Object} [events=this.events] Пример {elem:{event:function}}
     * @param {*...} [data] Данные, кот. крепятся к обработчикам
     */
    attach: function(elements, events, data) {
        elements = elements || this.dom;
        events = events || this.events;
        this._events = this._events || {}; // TODO: убрать отсюда
        data = Array.prototype.slice.call(arguments, 2);
        data.unshift(this);

        for(var key in elements) {
            if (key in events) {
                this._events[key] = this._events[key] || {};
                for(var event in events[key]) {
                    this._events[key][event] = Function.prototype.bind.apply(this.events[key][event], data);
                    elements[key].addEventListener(event, this._events[key][event], false);
                }
            }
        }
    },


    /**
     * Отвязывает обработчики событий от dom-элементов
     * @param [elements=this.dom] Пример {elem:dom}
     * @param [events=this.events] Пример {elem:{event:function}}
     */
    detach: function(elements, events) {
        elements = elements || this.dom;
        events = events || this.events;
        this._events = this._events || {}; // TODO: убрать отсюда

        for(var key in elements) {
            if (key in events) {
                this._events[key] = this._events[key] || {};
                for(var event in events[key]) {
                    elements[key].removeEventListener(event, this._events[key][event], false);
                    delete this._events[key][event];
                }
            }
        }
    },


    //события
    listeners: null


});
