/**
 * Представление таймлана
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';


Define( "app.view.Timeline", /** @lends {app.component} */{

    extend: app.Component,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


    init: function( prop ) {
        this._super();
        this.apply( prop );



        // Готовность модели.
        // Предполагается, что это события срабатывает после готовности документа
        this.model.on( 'load', function( e ) {            
            this.render();
        }.bind( this ));

        // -----------------------//

        // установить кол-во пикслей в секунде
        this.options.set( 'ratio', 100 );

        // установить зум
        this.options.set( 'zoom', 1 );

    },


    // создать линейку
    createRuler: function() {

        // 0 ... 1 ... 2 ... 3 ... 4 ... 5
        // 0 ... 2,5 ... 5 ... 7,5 ... 10 ... 12,5
        // 0 ... 5 ... 10 ... 15 ... 20 ... 25
        // 0 ... 10 ... 20 ... 30 ... 40 ... 50
        // 0 ... 25 ... 50 ... 75 ... 100 ... 125
        // 0 ... 50 ... 100 ... 150 ... 200 ... 250
        // 0 ... 100 ... 200 ... 300 ... 400 ... 500
        // 0 ... 250 ... 500 ... 750 ... 1000 ... 1250
        // 0 ... 500 ... 1000 ... 1500 ... 2000 ... 2500
        // 0 ... 1000 ... 2000 ... 3000 ... 4000 ... 5000
        // 0 ... 2500 ... 5000 ... 7500 ... 10000 ... 12500
        // 0 ... 5000 ... 10000 ... 15000 ... 20000 ... 25000


        //TODO Продумать алгоритм построения линейки и переписать черновик

        var width = 800;
        var points = [];

        var ms = this.toMilliseconds( 100 ) / this.options.get( 'zoom' );
        var m;

        var x = [ 1000, 500, 250, 125, 100, 50, 25, 10, 5, 1 ];

        //console.log( z );
        x.some(function( num ) {
            if ( ms / num | 0 > 0 ) {
                m = num;
                return true;
            }
        });

        width = this.toPixels( m ) * this.options.get( 'zoom' );

        points = new Array( 800 / width | 0 );


        var index = 0;
//
        for( ; index < points.length; index++ ) {
            points[ index ] = {
                width: width,
                value: m * index
            };
        }

        // console.log( m );
        // console.log( this.toPixels( m ) * this.options.get( 'zoom' ) );

        $( '#timeline-ruler' ).jqotesub( '#template-timeline-ruler', points );
    },


    /**
    * Рисует/обновляет представление таймлана
     *
     * @this {Timeline}
     */
    render: function() {

        // используем шаблонизатор для генерации разметки
        $( '#timeline-editor-body' ).jqotesub( '#template-timeline-line', this.query() );

        this.createRuler();
    },


    /**
     * Запрашивает у модели данные
     * Возвращает массив обработанных данных полученных из кейфреймов
     *
     * @this {Timeline}
     * @returns {Array}
     */
    query: function() {
        var lines = [];
        var ratio = this.toPixels( this.options.get( 'zoom' ) );    // O_o ну пока так

        var childs = [];
        var props = [];

        // TODO Костыль, переписать

        //евгений доступ через get('shapeCollection') 
        this.model.forEach(function( child ) {
            child.forEach(function( prop,name ) {                
                var keyframes = prop.cache.slice(),
                    width,
                    left;

                // TODO объеденить filter и map в один цикл

                keyframes = keyframes.filter(function( val ) {
                    return !isNaN( +val );
                });

                keyframes = keyframes.map(function( val ) {
                    return val * ratio;
                });

                keyframes = keyframes.sort(function( a, b ) {
                    return a - b;
                });

                left = keyframes[ 0 ];
                width = keyframes[ keyframes.length - 1 ] - left;     // fix

                keyframes = keyframes.map(function( item ) {
                    return item - left;
                });

                lines.push({
                    left: left,
                    width: width,
                    keyframes: keyframes
                });

            });
        });

        return lines;
    },

/**
     *  Опции представления таймлайна. Прочитать/установить.
     *
     *  @this {Timeline}
     *  @returns {Object} options
     */
    options: (function() {
        var data = {};

        return {
            get: function( key ) {
                return data[ key ];
            },
            set: function( key, value ) {
                data[ key ] = value;
            }
        };
    }()),


    /**
     *  Переводит миллисекунды в пиксили в зависимости
     *  от настроек представления таймлана, например, зума.
     *
     *  @this {Timeline}
     *  @param {Number} milliseconds
     *  @returns {Number}
     */
    toPixels: function( milliseconds ) {
        return milliseconds / 1000 * this.options.get( 'ratio' );
    },


    /**
     *  Переводит пиксили в миллисекунды в зависимости
     *  от настроек представления таймлана, например, зума.
     *
     *  @this {Timeline}
     *  @param {Number} pixels
     *  @returns {Number}
     */
    toMilliseconds: function( pixels ) {
        return pixels / this.options.get( 'ratio' ) * 1000;
    }

});
