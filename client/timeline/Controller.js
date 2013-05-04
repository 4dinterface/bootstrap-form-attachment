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
    domTarget: document,


    /**
     * Конструктор объекта контроллера
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );
        this.editor = $( '#timeline-editor' );
    },


    /**
     * Обработчики dom событий
     */
    domListeners: {

        /**
         * Ловит событие и вызывает функции поведения
         */
        '#timeline-editor-body % mousedown': function( e ) {
            var target = $( e.target );
            var keyframe = target.is( '.timeline-keyframe' ) ? target : null;
            var prop = target.is( '.timeline-property' ) ? target : null;

            if ( keyframe ) {
                prop = keyframe.parent( '.timeline-property' );
            }

            this.propertySelect( e, prop );
            this.runnerMove( e );
        },

        /**
         * Ловит событие и вызывает функции поведения
         */
        '#timeline-editor % mousedown % #timeline-runner-head': function( e ) {

        },

        /**
         * Ловит событие и вызывает функции поведения
         */
        '% mousemove': function() {
        },


        /**
         * Ловит событие и вызывает функции поведения
         */
        '% mouseup': function() {
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


    propertyMove: function() {

    },


    keyframeSelect: function() {

    },


    keyframeMove: function() {

    },


    /**
     * Перемещение бегунка
     * @param {Object} e event object
     */
    runnerMove: function( e ) {
        var position = e.pageX - this.editor.offset().left;

        if ( e.ctrlKey ) {
            return
        }

        this.movie.gotoAndStop( this.utilites.toMilliseconds( this.model, position ) );
    }

});
