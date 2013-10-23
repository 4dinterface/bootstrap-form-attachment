/**
 * Представление таймлана
 *
 * @return {Object} Timeline объект представления таймлайна
 */
'use strict';


Define( "app.timeline.View", /** @lends {app.component} */{

    extend: core.Component,

    /**
     * Данные модели таймлайна
     * @type {Object} Модель таймлайна
     * @private
     */
    model: null,

    /**
     * Компонет воспроизведения
     * @type {Object}
     * @private
     */
    movie: null,

    /**
     * Флаг включения/отключения авто-скролла
     * @type {Boolean}
     * @private
     */
    enableAutoScroll: false,

    /**
     * Утилиты таймлайна
     * @type {Object}
     * @private
     */
    utilites: app.timeline.utilites,

    /**
     * Тело редактора таймлайна
     * @type {Object}
     * @private
     */
    domEditorBody: $( '#timeline-editor-body' ),

    /**
     * Контейнер линейки
     * @type {Object}
     * @private
     */
    domRulerBox: $( '#timeline-ruler-box' ),

    /**
     * Голова бегунка
     * @type {Object}
     * @private
     */
    domRunnerHead: $( '#timeline-runner-head' ),

    /**
     * Тело бегунока
     * @type {Object}
     * @private
     */
    domRunnerBody: $( '#timeline-runner-body' ),


    /**
     * Конструктор объекта представления
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     * @this {Object} timeline
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );

        // Предполагается, что событие срабатывает после готовности документа
        this.model.on( 'load', function( e ) {
            $( '#timeline-editor-body-box' ).jqotesub( '#template-timeline-line', this.createTimeline() );
            this.renderRuler();
        }.bind( this ));


        //=====================================================================//
        //внимание
        //Пример реакции на изменения модели,
        //нерв перепиши так тебе было удобно,
        //мне кажется перерисовка таймлайна целиком это немножко топорно. хотя ХЗ.
        //=====================================================================//

        //изменение коллекции ключей (ключ добавили / удалили)
        this.model.on( 'keyframecollectionchange', function( e ) {
            this.refrashTimeline();
        }.bind( this ));

        //изменение состава свойств (стало видно новое свойств/или наоборот его убрали)
        this.model.on( 'propertycollectionchange', function( e ) {
            this.refrashTimeline();
        }.bind( this ));

        //топорный метод обновления, перерисовыет таймлай без бегунка
        // если с бегунком то получится 2 бегунка, поэтому Runner убран
        this.refrashTimeline=function (){
            $( '#timeline-editor-body-box' ).jqotesub( '#template-timeline-line', this.createTimeline() );
        };

        //=====================================================================//


        this.model.on( 'onclassadd', function( e ) {
            e.elems.addClass( e.clazz );
        });


        this.model.on( 'onclassremove', function( e ) {
            e.elems.removeClass( e.clazz );
        });


        // ---------------------- RUNNER ------------------------


        // Передвижение бегунка при воспроизведении анимации
        this.movie.on( 'onframe', function( e ) {
            var x = this.utilites.toPixels( this.model, e.elapsedTime );

            this.runnerMoveTo( x );

            if ( this.enableAutoScroll ) {
                this.autoScroll( x );
            }
        }.bind( this ));



        this.movie.on( 'onplay', function() {
            //TODO: тут прокрутка к начальной точке воспроизведения
            // TODO: нужна ли?
            this.enableAutoScroll = true;
        }.bind( this ));


        this.movie.on( 'onpause', function() {
            this.enableAutoScroll = false;
        }.bind( this ));


        this.movie.on( 'onstop', function() {
            this.enableAutoScroll = false;
        }.bind( this ));

        // ------------------- END RUNNER ------------------------

    },


    /**
     * Автоматически прокручивает таймлайн при воспроизведении
     *
     * @param {Number} x Позиция в пикселях к которой прокручивать по горизонтали
     * @this {Object} timeline
     * @private
     */
    autoScroll: function( x ) {
        var domEditorBody = this.domEditorBody.get( 0 );
        var visibleWidth = domEditorBody.clientWidth;
        var scrollWidth = domEditorBody.scrollWidth;
        var scrollLeft = domEditorBody.scrollLeft;
        var positionInPercents = ( x - scrollLeft ) * 100 / visibleWidth;

        if ( positionInPercents < 90 || scrollLeft + visibleWidth === scrollWidth ) {
            return;
        }

        this.scrollTo( x );
    },


    /**
     * Прокручивает таймлайн к определенной позиции
     *
     * @param {Number} x Позиция в пикселях к которой прокручивать по горизонтали
     */
    scrollTo: function( x ) {
        this.domEditorBody.scrollLeft( x );
        // this.movie.pause();  // debug only
    },


    /**
     * Перемещает бегунок к указанной позиции
     * Также синхронизирует тело и голову бегунка
     *
     * @param x позиция, в кот. должен быть отрисован бегунок
     */
    runnerMoveTo: function( x ) {
        var scrollLeft = this.domEditorBody.scrollLeft();

        this.domRunnerHead.css( 'left', x - scrollLeft );
        this.domRunnerBody.css( 'left', x );
    },


    /**
     * Рисует/перерисовывает линейку
     */
    renderRuler: function() {
        var visibleWidth = this.domEditorBody.clientWidth();
        var scrollLeft = this.domEditorBody.scrollLeft();
        var step = this.model.pixelsPerSecond / this.model.zoom;
        var min = this.utilites.roundUpTo( scrollLeft, step, -1 );
        var max = this.utilites.roundUpTo( scrollLeft + visibleWidth, step, 1 );
        var data = {
            left: -( scrollLeft % step ), // TODO: переписать?
            ticks: []
        };

        // Далее рассчет ведется в миллисекундах
        min = this.utilites.toMilliseconds( this.model, min );
        max = this.utilites.toMilliseconds( this.model, max );
        step = this.utilites.toMilliseconds( this.model, step );

        while( min < max ) {
            data.ticks.push({
                width: this.model.pixelsPerSecond,
                value: min
            });
            min += step;
        }

        this.domRulerBox.jqotesub( '#template-timeline-ruler', data );
    },


    // TODO: нужен ли, если бегунок изменния таймлайна (полная перерисовка) не затрагивают
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
                left: keyframes.items[ 0 ].left,
                width: keyframes.items[ keyframes.items.length - 1 ].left - keyframes.items[ 0 ].left,
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
     * @return {Object} keyframes Массив ключей для создания разметки
     */
    createKeyframes: function( keyframesCollection, clazz ) {

        var zoom = this.utilites.toPixels( this.model, this.model.zoom ); // TODO: Не забыть про zoom
        var keyframes = [];
        //var shift = 0;

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
            item.left = item.left * zoom;
            return item;
        });

        // order by asc
        keyframes = keyframes.sort(function( a, b ) {
            return a.left - b.left;
        });

        //shift = keyframes[ 0 ].left;

        // fix position
//        keyframes = keyframes.map(function( item ) {
//            item.left = item.left - keyframes[ 0 ].left;
//            return item;
//        });

        return {
            items: keyframes
//            shift: shift
        };

    }

});
