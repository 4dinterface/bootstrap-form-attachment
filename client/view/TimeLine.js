/**
 * Представление таймлана
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

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



        //здесь твой код
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

//       console.log( this.toPixels( 250 ) )

        //var real = +( this.options.get( 'zoom' ) % 1 * 10 ).toFixed();
        //var isEven = !( real & 1 );

        // если не делиться на 5 без остатка, то
        // увеличиваем ширину блока линейки

        //var ms = this.toMilliseconds( this.options.get( 'ratio' ) * this.options.get( 'zoom' ) );


//        var x = Math.round( ms / 1000 );
//
//        if ( 1000 % x !== 0 ) {
//            x = ( x / 2 | 0 ) * 2;
//        }
//        //x = ( x / 2 | 0 ) * 2;
//
//        var step = 1000 / x;


        //var z = this.options.get( 'zoom' ) % 1 * 10 | 0;//.toFixed();
        //var x = this.toPixels( 1000 ) * this.options.get( 'zoom' );

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

        //console.log( this.toPixels( 1000 ) * this.options.get( 'zoom' ) );
        //console.log( this.toPixels( 750 ) * this.options.get( 'zoom' ) );

//        var points = new Array( 800 / x | 0 );
//        var ms = this.toMilliseconds( x ) / this.options.get( 'zoom' );
//
////        var width = pixelsInSecond % 4 ? 110 : 100;
////        var points = new Array( 800 / width | 0 );
//        var index = 0;
////
//        for( ; index < points.length; index++ ) {
//            points[ index ] = {
//                width: x,
//                value: ( index * ms / 1000 ).toFixed( 3 )
//            };
//        }
//
//
        $( '#timeline-ruler' ).jqotesub( '#template-timeline-ruler', points );
    },


    /**
    * Рисует/обновляет представление таймлана
     *
     * @this {Timeline}
     */
    render: function() {

        this.createRuler();

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
        var ratio = this.toPixels( 100 ) * this.options.get( 'zoom' );     // 100 is magic number : )

        this.model.forEach(function( child ) {

            Object.keys( child.data.prop ).forEach(function( name ) {
                var prop = child.data.prop[ name ];
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

            })

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

} );