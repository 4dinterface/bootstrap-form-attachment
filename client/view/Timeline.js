/**
 * Представление таймлана
 *
 * @return {Object} Timeline объект представления таймлайна
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


        // Предполагается, что событие срабатывает после готовности документа
        this.model.on( 'load', function( e ) {            
            this.render();
        }.bind( this ));


        this.model.on( 'propertyselect', function( e /*
        e: {
            selector: DOM Selector,
            data: {
                shapeId: Number,
                propName: String
            },
            clazz: String
        }
        */ ) {
            var shape = this.model.get( 'shapeCollection' ).get( e.data.shapeId );
            var prop = shape.get( 'propertyCollection' ).get( e.data.propName );

            this.render( e.selector, prop, clazz );
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
    * item: {
    *     selector: String,
    *
    *     clazz: String
    * }
    *
    * @param {Array} items
    * @this {Timeline}
    */
    render: function( items ) {

        if ( arguments.length === 0 ) {
            // используем шаблонизатор для генерации разметки
            $( '#timeline-editor-body' ).jqotesub( '#template-timeline-line', this.createTimeline() );

            this.createRuler();
            return;
        }


        $( selector ).jqotesub( '#template-timeline-block', this.query() );
    },


    /**
     *  Создает таймлайн
     *
     *  @this {Timeline}
     *  @return {Array} lines
     */
    createTimeline: function() {
        var data = [];

        this.model.get( 'shapeCollection' ).forEach(function( shape ) {
            shape.get( 'propertyCollection' ).forEach(function( prop ) {
                 data.push({
                     shape: shape,
                     props: [ prop ]
                 });
            }, this );
        }, this );

        return this.createLines( data );
    },


    /**
     *  Создает линии таймлайна
     *
     *  @param {Array} arr Массив данных для построения линий на таймлайне
     *  @this {Timeline}
     *  @return {Array} lines Массив для создания разметки
     */
    createLines: (function() {
        var index = -1;

        return function( arr ) {
          // item.shape: a shape
          // item.props: array of properties
            return arr.map(function( item ) {
                index += 1;
                return {
                    index: index,
                    shapeId: item.shape.id,
                    properties:  this.createProperties( item.props )
                };
            }, this );
        };
    }()),


    /**
     *  Создает свойства
     *
     *  @param {Array} props Массив данных для построения свойств на таймлайне
     *  @this {Timeline}
     *  @return {Array} props Массив для создания разметки
     */
    createProperties: function( props ) {
        return props.map(function( prop ) {
            var keyframes = prop.cache.slice();
            var left = this.toPixels( +keyframes[ 0 ] );        // TODO: Не забыть про zoom

            keyframes = this.createKeyframes( keyframes );

            return {
                id: prop.id,
                left: left,
                width: keyframes[ keyframes.length - 1 ],
                keyframes: keyframes
            }
        }, this );
    },


    /**
     * Создает ключи
     *
     * @param {Array} keyframes Массив данных для построения ключей на таймлайне
     * @this {Timeline}
     * @return {Array} keyframes Массив для создания разметки
     */
    createKeyframes: function( keyframes ) {
        var zoom = this.toPixels( this.options.get( 'zoom' ) ); // TODO: Не забыть про zoom

        // get only numbers
        keyframes = keyframes.filter(function( val ) {
            return !isNaN( +val );
        });

        // apply zoom
        keyframes = keyframes.map(function( item ) {
            return item * zoom;
        });

        // order by asc
        keyframes = keyframes.sort(function( a, b ) {
            return a - b;
        });

        // fix position
        keyframes = keyframes.map(function( item ) {
            return item - keyframes[ 0 ];
        });

        return keyframes;
    },


    /**
     *  Опции представления таймлайна. Прочитать/установить.
     *
     *  @this {Timeline}
     *  @return {Object} options
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
     *  от настроек представления таймлана.
     *
     *  @this {Timeline}
     *  @param {Number} milliseconds
     *  @return {Number}
     */
    toPixels: function( milliseconds ) {
        return milliseconds / 1000 * this.options.get( 'ratio' );
    },


    /**
     *  Переводит пиксили в миллисекунды в зависимости
     *  от настроек представления таймлана.
     *
     *  @this {Timeline}
     *  @param {Number} pixels
     *  @return {Number}
     */
    toMilliseconds: function( pixels ) {
        return pixels / this.options.get( 'ratio' ) * 1000;
    }

});
