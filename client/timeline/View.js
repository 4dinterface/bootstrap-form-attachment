/**
 * Представление таймлана
 *
 * @return {Object} Timeline объект представления таймлайна
 */

'use strict';


Define( "app.timeline.View", /** @lends {app.component} */{

    extend: app.Component,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,

    /**
     * Подключаем утилиты таймлайна
     * @type {Object}
     * @private
     */
    utilites: app.timeline.utilites,


    /**
     * Конструктор объекта представления
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );


        console.log( this.model.zoom );


        // Предполагается, что событие срабатывает после готовности документа
        this.model.on( 'load', function( e ) {
            $( '#timeline-editor-body' ).jqotesub( '#template-timeline-line', this.createTimeline() );
            $( '#timeline-editor' ).jqoteapp( '#template-timeline-runner', this.createRunner() );

            this.createRuler();
        }.bind( this ));



        this.model.on( 'onclassadd', function( e ) {
            e.elems.addClass( e.clazz );
        });


        this.model.on( 'onclassremove', function( e ) {
            e.elems.removeClass( e.clazz );
        });


        // ---------------------- CURSOR ------------------------


        // Передвижение бегунка при воспроизведении анимации
        this.movie.on( 'onframe', function( e ) {
            $( '#timeline-runner' ).css( 'left', this.utilites.toPixels( this.model, e.elapsedTime ) );
        }.bind( this ));


        // ------------------- END CURSOR ------------------------
        
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

        var ms = this.utilites.toMilliseconds( this.model, 100 ) / this.model.zoom;
        var m;

        var x = [ 1000, 500, 250, 125, 100, 50, 25, 10, 5, 1 ];

        //console.log( z );
        x.some(function( num ) {
            if ( ms / num | 0 > 0 ) {
                m = num;
                return true;
            }
        });

        width = this.utilites.toPixels( this.model, m ) * this.model.zoom;

        points = new Array( 800 / width | 0 );


        var index = 0;
//
        for( ; index < points.length; index++ ) {
            points[ index ] = {
                width: width,
                value: m * index
            };
        }

        $( '#timeline-ruler' ).jqotesub( '#template-timeline-ruler', points );
    },


    // reserved
    render: function( items ) {
    },


    createRunner: function() {
        // test only
        return 150;
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
     *  @param {String} clazz Класс, присваемый элементам
     *  @this {Timeline}
     *  @return {Array} lines Массив для создания разметки
     */
    createLines: (function() {
        var index = -1;

        return function( arr, clazz ) {
          // item.shape: a shape
          // item.props: array of properties
            return arr.map(function( item ) {
                index += 1;
                return {
                    index: index,
                    shapeId: item.shape.id,
                    properties:  this.createProperties( item.props ),
                    clazz: clazz || ''
                };
            }, this );
        };
    }()),


    /**
     *  Создает свойства
     *
     *  @param {Array} props Массив данных для построения свойств на таймлайне
     *  @param {String} clazz Класс, присваемый элементам
     *  @this {Timeline}
     *  @return {Array} props Массив для создания разметки
     */
    createProperties: function( props, clazz ) {
        return props.map(function( prop ) {
            var keyframeCollection = prop.get( 'keyframeCollection' );
            var keyframes = this.createKeyframes( keyframeCollection );

            return {
                id: prop.id,
                left: keyframes.shift,
                width: keyframes.items[ keyframes.items.length - 1 ].left,
                keyframes: keyframes.items,
                clazz: clazz || ''
            }
        }, this );
    },


    /**
     * Создает ключи
     *
     * @param {Array} keyframesCollection Массив данных для построения ключей на таймлайне
     *  @param {String} clazz Класс, присваемый элементам
     * @this {Timeline}
     * @return {Object} keyframes Массив ключей для создания разметки + сдвиг
     */
    createKeyframes: function( keyframesCollection, clazz ) {

        var zoom = this.utilites.toPixels( this.model, this.model.zoom ); // TODO: Не забыть про zoom
        var keyframes = [];
        var shift = 0;

        // get time and id
        Object.keys( keyframesCollection ).filter(function( key ) {
            var keyframe = keyframesCollection[ key ];

            if ( !isNaN( +key ) ) {
                keyframes.push({
                    id: keyframe.id,
                    left: key,
                    clazz: clazz || ''
                });
            }
        });

        // apply zoom
        keyframes = keyframes.map(function( item ) {
            item.left = item.left * zoom
            return item;
        });

        // order by asc
        keyframes = keyframes.sort(function( a, b ) {
            return a.left - b.left;
        });

        shift = keyframes[ 0 ].left;

        // fix position
        keyframes = keyframes.map(function( item ) {
            item.left = item.left - keyframes[ 0 ].left;
            return item;
        });

        return {
            items: keyframes,
            shift: shift
        };

    }

});
