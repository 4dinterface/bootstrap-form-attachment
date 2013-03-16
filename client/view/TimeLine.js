/**
 * Представление таймлана
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';


Define( "app.view.Timeline", /** @lends {app.component} */{

    extend: app.Component,
    //model:
    init: function( prop ) {
        this.super();
        this.apply( prop );
        //this.model=prop;

        //потом будет так
        //model.on('change',function(){
        //    this.render;            
        //});

        // -----------------------//

        // установить кол-во пикслей в секунде
        this.options.set( 'ratio', 100 );

        // установить зум
        this.options.set( 'zoom', 1 );


        var that = this;


        Zepto(function() {
            that.render();

            // testing
            var slider = $( '[type=range]' );
            var filed = $( '[type=text]' );

            slider.on( 'change', function() {
                filed.val( this.value );
                applyZoom( +this.value );
            });

            function applyZoom( value ) {
                that.options.set( 'zoom', value );
                that.render();
            }

        });

    },


    // создать линейку
    createRuler: function() {



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

        console.log( m );
        console.log( this.toPixels( m ) * this.options.get( 'zoom' ) );

        $( '#timeline-ruler' ).jqotesub( '#template-timeline-ruler', points );
    },


    /**
    * Рисует/обновляет представление таймлана
     *
     * @this {Timeline}
     */
    render: function() {

        // используем шаблонизатор для генерации разметки
        $( '#timeline-editor' ).jqotesub( '#template-timeline-line', this.query() );

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
        var ratio = this.options.get( 'zoom' );

        var childs = [];
        var props = [];

        // TODO Костыль, переписать
        Object.keys( this.model ).forEach(function( key ) {
            if ( !isNaN( +key ) ) {
                childs.push( this.model[ key ] );
            }
        }, this );


        childs.forEach(function( child ) {
            Object.keys( child.data ).forEach(function( name ) {
                var prop = child.get( name );
                var keyframes = prop.cash.slice();
                var width;
                var left;

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
