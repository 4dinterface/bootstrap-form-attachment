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

        //FIXME: удалить это
        if('domListeners' in this) {
//            this.addListeners(this.domListeners);
            this.bind( Object.keys( this.domListeners ) );
        }
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
     * Добавляет множество слушателей для множества элементов
     * @param {Array|Object} elementsObject
     * @param {Object} listenersObject
     */
    addListeners: function(elementsObject, listenersObject) {
        var props = Array.isArray(elementsObject) ? elementsObject : Object.keys(elementsObject);
        for(var index in props) {
            var key1 = props[index];
            for(var key2 in listenersObject[key1]) {
                this.addListener(key1, key2, listenersObject[key1][key2]);
            }
        }
    },


    /**
     * Удаляет множество слушателей для множества элементов
     * @param {Array|Object} elementsObject
     * @param {Object} listenersObject
     */
    removeListeners: function(elementsObject, listenersObject) {
        var props = Array.isArray(elementsObject) ? elementsObject : Object.keys(elementsObject);
        for(var index in props) {
            var key1 = props[index];
            for(var key2 in listenersObject[key1]) {
                this.removeListener(key1, key2);
            }
        }
    },


    /**
     * Добавляет слушатель события
     * @param {String} key Имя свойства(элемента) в this.dom[key]
     * @param {String} event
     * @param {Function} listener
     */
    addListener: function(key, event, listener) {
        var name = key + ':' + event;
        var fn = listener.bind(this);
        this.dom[key].addEventListener(event, fn, false);
        this._listeners[name] = fn;
    },


    /**
     * Удаляет слушатель события
     * @param {String} key
     * @param {String} event
     */
    removeListener: function(key, event) {
        var name = key + ':' + event;
        var fn = this._listeners[name];
        this.dom[key].removeEventListener(event, fn, false);
        delete this._listeners[name];
    },


    //события
    listeners: null,


    /**
     * Деструктор
     */
    destroy: function() {
        debugger;
        var key, event;
        for (var eventName in this._listeners) {
            eventName = eventName.split(":");
            key = eventName[0];
            name = eventName[1];
            this.removeEventListener(key, event);
        }
        this._super();
    }


});
