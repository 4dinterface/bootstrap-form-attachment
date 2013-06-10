/**
 * Контроллер таймлана
 *
 */
'use strict';


Define( 'app.timeline.Controller', {

    extend: core.Controller,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
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
     * Ссылка на представление
     * @type {app.model.view}
     * @private
     */
    view: null,

    /**
     * Утилиты таймлайна
     * @type {Object}
     * @private
     */
    utilites: app.timeline.utilites,

    /**
     * Корневой элемент относительно которого навешиваются обработчики событий
     * @type {Object}
     * @private
     */
    domTarget: $( document ),

    /**
     * Редактор таймлайна
     * @type {Object}
     * @private
     */
    domEditor: $( '#timeline-editor' ),

    /**
     * Тело редактора таймлайна
     * @type {Object}
     * @private
     */
    domEditorBody: $( '#timeline-editor-body' ),

    /**
     * Контейнер внутри тела редактора таймлайна
     * @type {Object}
     * @private
     */
    domEditorBodyBox: $( '#timeline-editor-body-box' ),

    /**
     * Бегунок на таймлайнее
     * @type {Object}
     * @private
     */
    domRunner: $( '#timeline-runner-body, #timeline-runner-head' ),

    dragShiftX: null,

    dragElems: null,

    dragPositions: null,

    dragHandler: null,

    scrollLeft: 0,


    /**
     * Конструктор объекта контроллера
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );
        this.domTarget.off( '.timeline-drag' );

        // запоминаем начальное значение прокрутки,
        // чтобы иметь возможность отследить ее изменение
        this.scrollLeft = this.domEditorBody.scrollLeft();
    },


    /**
     * Обработчики dom событий
     */
    domListeners: {


        /**
         * Ловит событие прокрутки таймлайна, фильтрует и
         * запускает actions только при scroll-x (горизонтальной прокрутке)
         */
        '#timeline-editor-body % scroll': function() {
            var scrollLeft = this.domEditorBody.scrollLeft();

            if ( this.scrollLeft !== scrollLeft ) {
                this.scrollLeft = scrollLeft;

                this.view.runnerMoveTo( this.utilites.toPixels( this.model, this.movie.elapsedTime  ) );
                this.view.renderRuler();
            }
        },


        /**
         * Ловит событие на теле таймлайна и вызывает функции поведения
         *
         * @param {Object} e объект события
         * @param {Object} [eventRunner] объект события пришедший с бегунка
         */
        '#timeline-editor-body-box % mousedown': function( e, eventRunner ) {
            e = eventRunner || e;

            var target = $( e.target );
            var keyframe = target.is( '.timeline-keyframe' ) ? target : null;
            var prop = target.is( '.timeline-property' ) ? target : null;
            var position = e.pageX - this.domEditor.offset().left + this.domEditorBody.scrollLeft();

            if ( keyframe ) {
                prop = keyframe.parent( '.timeline-property' );
            }

            this.propertySelect( e, prop );
            this.runnerMoveTo( e, position );

            // this.domTarget.on( '.timeline-drag' );
        },


        /**
         * Передает событие с бегунка на таймлан
         * Устанавливает истинную цель события
         *
         * @param {Object} e объект события
         */
        '#timeline-runner-body % mousedown': function( e ) {
            e = $.extend({}, e );

            this.domRunner.hide();
            e.target = document.elementFromPoint( e.clientX, e.clientY );
            this.domEditorBodyBox.trigger( 'mousedown', e );
            this.domRunner.show();
        },


        /**
         * Ловит событие и вызывает функции поведения
         */
        '#timeline-editor % mousedown % #timeline-runner-head': function( e ) {
            if ( e.which !== 1 ) {
                return;
            }

            this.dragElems = $( e.target );
            //this.dragPositions = this.dragElems.offset();
            this.dragShiftX = this.domEditor.offset().left

            //console.log( this.dragShiftX )

            this.dragHandler = 'runnerMoveTo';

            this.bind([ '% mousemove.timeline-drag', '% mouseup.timeline-drag' ]);
        },


        /**
         * Ловит событие и вызывает функции поведения
         */
        '% mousemove.timeline-drag': function( e ) {
            var x = e.pageX - this.dragShiftX;

            //console.log( x );

            this[ this.dragHandler ]( e, x );
        },


        /**
         * Ловит событие и отключает обработчики перетаскивания
         */
        '% mouseup.timeline-drag': function() {
            this.domTarget.off( '.timeline-drag' );
        }

    },


    /**
     * Выделение свойств
     * @param {Object} e event object
     * @param {Object|Null} prop
     */
    propertySelect: function( e, prop ) {
        if ( !prop && !e.ctrlKey ) {
            unselect( this.model, $( '.timeline-property-select' ) );
            return;
        }

        if ( e.ctrlKey ) {
            if ( prop.hasClass( 'timeline-property-select' ) ) {
                unselect( this.model, prop );
            } else {
                select( this.model, prop );
            }
        } else {
            unselect( this.model, $( '.timeline-property-select' ) );
            select( this.model, prop );
        }

        // --- helper functions ---

        function select( model, elems ) {
            model.fire( 'onclassadd', {
                elems: elems,
                clazz: 'timeline-property-select'
            });
        }

        function unselect( model, elems ) {
            model.fire( 'onclassremove', {
                elems: elems,
                clazz: 'timeline-property-select'
            });
        }
    },


    propertyMoveTo: function() {

    },


    keyframeSelect: function() {

    },


    keyframeMoveTo: function() {

    },


    /**
     * Перемещает бегунок к указанной позиции
     * @param {Object} e event object
     * @param {Number} x
     */
    runnerMoveTo: function( e, x ) {
        if ( e.ctrlKey || e.which !== 1 ) {
            return;
        }

        this.movie.gotoAndStop( this.utilites.toMilliseconds( this.model, x ) );
    }

});
