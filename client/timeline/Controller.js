/**
 * Контроллер таймлана
 *
 */
'use strict';


Define( 'app.timeline.Controller', {

    extend: app.Controller,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


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


    dragShiftX: null,

    dragElems: null,

    dragPositions: null,

    dragHandler: null,


    /**
     * Конструктор объекта контроллера
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );
        this.domTarget.off( '.drag' );
    },


    /**
     * Обработчики dom событий
     */
    domListeners: {

        /**
         * Ловит событие и вызывает функции поведения
         */
        '#timeline-editor-body-box % mousedown': function( e ) {
            var target = $( e.target );
            var keyframe = target.is( '.timeline-keyframe' ) ? target : null;
            var prop = target.is( '.timeline-property' ) ? target : null;

            if ( keyframe ) {
                prop = keyframe.parent( '.timeline-property' );
            }

            this.propertySelect( e.ctrlKey, prop );
            this.runnerMove( e.ctrlKey, e.pageX - this.domEditor.offset().left );

            // this.domTarget.on( '.drag' );
        },


        /**
         * Ловит событие и вызывает функции поведения
         */
        '#timeline-editor % mousedown % #timeline-runner-head': function( e ) {
            this.dragElems = $( e.target );
            //this.dragPositions = this.dragElems.offset();
            this.dragShiftX = this.domEditor.offset().left

            //console.log( this.dragShiftX )

            this.dragHandler = 'runnerMove';

            this.bind([ '% mousemove.drag', '% mouseup.drag' ]);
        },


        /**
         * Ловит событие и вызывает функции поведения
         */
        '% mousemove.drag': function( e ) {
            var x = e.pageX - this.dragShiftX;

            // console.log( x );

            this[ this.dragHandler ]( false, x );
        },


        /**
         * Ловит событие и отключает обработчики перетаскивания
         */
        '% mouseup.drag': function() {
            this.domTarget.off( '.drag' );
        }

    },


    /**
     * Выделение свойств
     * @param {Boolean} ctrlKey
     * @param {Object|Null} prop
     */
    propertySelect: function( ctrlKey, prop ) {

        if ( !prop && !ctrlKey ) {
            unselect( this.model, $( '.timeline-property-select' ) );
            return;
        }

        if ( ctrlKey ) {
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


    propertyMove: function() {

    },


    keyframeSelect: function() {

    },


    keyframeMove: function() {

    },


    /**
     * Перемещение бегунка
     * @param {Boolean} ctrlKey
     * @param {Number} position
     */
    runnerMove: function( ctrlKey, position ) {
        if ( ctrlKey ) {
            return
        }

        this.movie.gotoAndStop( this.utilites.toMilliseconds( this.model, position ) );
    }

    // TODO: при клике на бегунок в области таймлайна, блок под ним не выделятеся

});
