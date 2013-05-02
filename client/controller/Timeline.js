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
        this._super();
        this.apply( prop );


        // После того, как документ готов (ready), загрузить данные модели таймлайна
        // TODO: Надобность под вопросом
        $(function() {
            //this.model.fire( 'load' );
        }.bind( this ));



        // Ловим mousedown на таймлайне
        $( '#timeline-editor' ).on( 'mousedown', function( elem, e ) {

            // Перемещение бегунка при клике
            this.model.fire( 'oncursorchange', {
                x: e.pageX - elem.offset().left
            });

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
        }.bind( this, $( '#timeline-editor' ) ));



        // объект, в котором хранится сведения о представлении таймлайна
        this.model.timeline = {
            pixelsPerSecond: 100,
            zoom: 1,
            width: 800
        };

    }

});
