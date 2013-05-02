'use strict';

Define( 'app.controller.Timeline', {

    extend: app.Component,

    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


    init: function( prop ) {
        var me=this;
        this._super();
        this.apply( prop );


        // После того, как документ готов (ready), загрузить данные модели таймлайна
        // TODO: Надобность под вопросом
        $(function() {
            //this.model.fire( 'load' );
        }.bind( this ));



        // Ловим mousedown на таймлайне
        $( '#timeline-editor' ).on( 'mousedown', function( elem, e ) {
            var target = $( e.target );
            var keyframe = target.is( '.timeline-keyframe' ) ? target : null;
            var prop = target.is( '.timeline-property' ) ? target : null;

            if ( keyframe ) {
                prop = keyframe.parent( '.timeline-property' );
            }

            console.log( prop );

            // Перемещение бегунка при клике
            /*this.model.fire( 'oncursorchange', {
                x: e.pageX - elem.offset().left
            });*/

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



        // объект, в котором хранится сведения о представлении таймлайна
        this.model.timeline = {
            pixelsPerSecond: 100,
            zoom: 1,
            width: 800
        };

    }

});
