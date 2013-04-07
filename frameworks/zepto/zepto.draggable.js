/**
 * Draggable. Zepto plugin.
 */

(function( $ ) {

    'use strict';


    $.fn.draggable = (function() {


        /**
         * Строит перетаскиваемые элементы
         *
         * @param {Object} elem Dom-элемент в обертке Zepto
         * @param {Object} options
         * @constructor
         * @returns {Object}
         */
        function DragBuilder( e, options ) {
            var elem = $( e.target );
            var position = elem.position();

            // TODO: выделение блока. Подумать
            elem.addClass( 'timeline-block-select' );

            // фиксируем начальную позицию блока
            this._position = position;

            // TODO: грязный хак
            this._items = {};
            this._items.elems = $( '.timeline-block-select' ).not( elem );
            this._items.positions = this._items.elems.map(function() {
                 return $( this ).position();
            });

            this._shiftX = e.pageX - position.left;
            this._shiftY = e.pageY - position.top;

            this.options = $.extend( true, {
                axis: 'xy',                                              // Ось, по которой перемещается элемент
                clazz: '',                                               // Класс, который применяется к элементу во время перетаскивания
                area: {                                                 // Область передвижения
                    top: Number.NEGATIVE_INFINITY,
                    right: Number.POSITIVE_INFINITY,
                    bottom: Number.POSITIVE_INFINITY,
                    left: Number.NEGATIVE_INFINITY
                }
            }, options );

            this.elem = elem;

            // TODO: Убрать это безобразие (по возможности)
            $( document ).on({
                'mousemove.draggable': this._mousemove.bind( this ),
                'mouseup.draggable': this._mouseup.bind( this )
            });

            $( 'body' ).addClass( this.options.clazz );
        }


        DragBuilder.prototype = {


            /**
             * Включает режим перетаскивания
             */
//            enable: function() {
//                this.elem.on( 'mousedown.draggable', this._mousedown.bind( this ) );
//            },


            /**
             * Отключает режим перетаскивания
             */
//            disable: function() {
//                this.elem.off( '.draggable' );
//            },


            /**
             * Обрабатывает событие "mousedown" на элементе
             * Фиксирует точку захвата
             *
             * @param {Object} e Объект события
             * @private
             */

            // Перенесен в конструктор
//            _mousedown: function( e ) {
//                var position = $( e.target ).position();
//
//                this._shiftX = e.pageX - position.left;
//                this._shiftY = e.pageY - position.top;
//
//                $( document ).on({
//                    'mousemove.draggable': this._mousemove.bind( this ),
//                    'mouseup.draggable': this._mouseup.bind( this )
//                });
//
//                $( 'body' ).addClass( this.options.clazz );
//            },


            /**
             * Обрабатывает событие "mousemove" на элементе
             * Передвигает элемент
             *
             * @param {Object} e Объект события
             * @private
             */
            _mousemove: function( e ) {
                var left = e.pageX - this._shiftX;
                var top = e.pageY - this._shiftY;
                var position = {};

                // TODO: Хак, переписать
                var difference = left - this._position.left;


                left = Math.min( left, this.options.area.right );
                left = Math.max( left, this.options.area.left );

                top = Math.min( top, this.options.area.bottom );
                top = Math.max( top, this.options.area.top );

                position = { top: top, left: left };


                // TODO: Хак, переписать
                var newPositions = $.map( this._items.positions, function( pos ) {
                    var newPos = pos.left + difference;
                    newPos = newPos < 0 ? 0 : newPos;
                    return newPos;
                });


                switch( this.options.axis ) {
                    case 'x':
                        delete position.top;
                        break;
                    case 'y':
                        delete position.left;
                        break;
                }

                this.elem.css( position );


                // TODO: Хак, переписать
                this._items.elems.each(function( index ) {
                    var newLeft = newPositions[ index ];
                    $( this ).css( 'left', newLeft );
                });
            },


            /**
             * Обрабатывает событие "mouseup" на элементе
             * Снимает обработчики mousemove и mouseup с документа
             *
             * @private
             */
            _mouseup: function() {
                $( document ).off( '.draggable' );
                $( 'body' ).removeClass( this.options.clazz );

                // TODO: снятие выделения с блока после перемещения. Надо ли вообще???
                // this.elem.removeClass( 'timeline-block-select' );
            }
        };


        // ---------------------


        // TODO: Убрать объект события из параметров
        return function( e, options ) {

            $( e.target ).draggable = new DragBuilder( e, options );
//            this.each(function() {
//                var elem = $( this );
//
//                elem.draggable = new DragBuilder( e, elem, options );
//            });

            return this;
        };

    }());

}( Zepto ));
