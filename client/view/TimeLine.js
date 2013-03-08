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
        // -----------------------

        // установить кол-во пикслей в миллисекунде
        this.options.set( 'ratio', 100 );

        var that = this;


        Zepto(function() {
            that.render();
        });

    },


    /**
    * Рисует/обновляет представление таймлана
     *
     * @this {Timeline}
     */
    render: function() {

        console.log( this.model );
        //Это только демонстрационный код, от которого можно отталкнуться

        var lines = [];

        this.model.forEach(function( child ) {

            Object.keys( child.data.prop ).forEach(function( name ) {
                var prop = child.data.prop[ name ];
                var points = prop.cash.slice();
                var width;
                var left;

                points = points.filter(function( val ) {
                    return !isNaN( +val );
                });

                points = points.sort(function( a, b ) {
                    return a - b;
                });

                left = points[ 0 ] * 100;
                width = points[ points.length - 1 ] * 100;

                left = this.toPixels( left );
                width = this.toPixels( width );

                lines.push({
                    top: 0,
                    left: left,
                    width: width,
                    backgroundColor: '#48d1cc'
                });

            }, this );

        }, this );

        console.log( lines );

        // используем шаблонизатор для генерации разметки
        $( '#timeline-editor' ).jqoteapp( '#timeline-line-template', lines );

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