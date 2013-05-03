/**
 * Контроллер таймлана
 *
 */
'use strict';


Define( 'app.timeline.controller', {

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
     * Конструктор объекта контроллера
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function( cfg ) {
        this._super();
        this.apply( cfg );


        // Ловим mousedown на таймлайне
        $( '#timeline-editor' ).on( 'mousedown', function( elem, e ) {
            var target = $( e.target );
            var keyframe = target.is( '.timeline-keyframe' ) ? target : null;
            var prop = target.is( '.timeline-property' ) ? target : null;
            var cursorPosition = e.pageX - elem.offset().left;


            if ( keyframe ) {
                prop = keyframe.parent( '.timeline-property' );

                // here drag ...
            }


            if ( prop ) {

                if ( !e.ctrlKey ) {

                    this.model.fire( 'onclassremove', {
                        elems: $( '.timeline-property-select' ),
                        clazz: 'timeline-property-select'
                    });

                }

                this.model.fire( 'onclassadd', {
                    elems: prop,
                    clazz: 'timeline-property-select'
                });

                // here drag ...

            } else {

                this.model.fire( 'onclassremove', {
                    elems: $( '.timeline-property-select' ),
                    clazz: 'timeline-property-select'
                });

            }

            // Перемещение бегунка при клике
            this.movie.gotoAndStop( this.utilites.toMilliseconds( this.model, cursorPosition ) );

        }.bind( this, $( '#timeline-editor' ) ));



        // Ловим mousedown на свойствах в таймлайне
//        $( '#timeline-editor' ).on( 'mousedown', '.timeline-property', function( e ) {
//
//            var prop = $( e.target );
//            var id = prop.attr( 'data-property-id' );
//            var selector = '[data-property-id="' + id + '"]';
//            var clazz = prop.hasClass( 'timeline-property-select' ) ? '' : 'timeline-property-select';
//
//            this.model.fire( 'propertyselect', {
//                selector: selector,
//                id: id,
//                clazz: clazz
//            });
//        }.bind( this ));

    }

});
