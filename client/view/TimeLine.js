/**
 * Представление таймлана
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

Define( "app.view.Timeline", /** @lends {app.component} */{

    extend: app.Component,



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

        // установить отношение кол-ва пикслей к миллисекунде
        this.options.set( 'ratio', 100 );

        this.render();
    },


    /**
    * Рисует/обновляет представление таймлана
     *
     * @this {Timeline}
     */
    render: function() {

        console.log( this.model );
        //Это только демонстрационный код, от которого можно отталкнуться

        var m = this.model;

        //цикл по обьектам
        for( var i = 0; i < m.length; i++ ) {
            document.write(m[i].get('title')+"<br>");

            //цикл по свойствам
            for( var pi in m[i].get( 'prop' ) ) {
                document.write(pi+"<br>");
            }

        }

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