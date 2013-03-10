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
        var width = 800;
        var points = new Array( width / 50 | 0 );
        var section = 50 / this.options.get( 'zoom' ) / 100;

        console.log( this.toMilliseconds( 100 ) );

        var index = 0;

        for( ; index < points.length; index++ ) {
            points[ index ] = ( section * index ).toFixed( 3 );
        }

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

        this.model.forEach(function( child ) {

            Object.keys( child.data.prop ).forEach(function( name ) {
                var prop = child.data.prop[ name ];
                var keyframes = prop.cash.slice();
                var width;
                var left;

                keyframes = keyframes.filter(function( val ) {
                    return !isNaN( +val );
                });

                keyframes = keyframes.map(function( val ) {
                    return this.toPixels( val * 100 ) * this.options.get( 'zoom' );
                }, this );

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

            }, this )

        }, this );

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