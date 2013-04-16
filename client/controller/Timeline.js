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
        $(function() {
            this.model.fire( 'load' );
        }.bind( this ));


//        var shapeCol = this.model.get( 'shapeCollection' );
//        var shape = shapeCol.get( 0 )
//        var propCol = shape.get( 'propertyCollection' );
//        var prop = propCol.get( 12 );


        // Выделение блока
        $( '.timeline-block' ).click(function( e ) {
            var line = $( e.target ).parent( '.timeline-line' );
            var data = $.parseJSON( line.attr( 'data-value' ) );
            var block = line.find( '.timeline-block' );
            var selector = line.attr( 'id' );
            var clazz = block.hasClass( 'timeline-block-select' ) ? '' : 'timeline-block-select';

            this.model.fire( 'propertyselect', {
                selector: selector,
                data: data,
                clazz: clazz
            });
        }.bind( this ));



        // объект, в котором хранится сведения о представлении таймлайна
        this.model.timeline = {
            pixelsPerSecond: 100,
            zoom: 1,
            width: 800
        };

    }

});
