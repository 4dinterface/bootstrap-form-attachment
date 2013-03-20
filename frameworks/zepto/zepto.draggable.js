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
        function DragBuilder( elem, options ) {

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
            this.enable();
        }


        DragBuilder.prototype = {


            /**
             * Включает режим перетаскивания
             */
            enable: function() {
                this.elem.on( 'mousedown.draggable', this._mousedown.bind( this ) );
            },


            /**
             * Отключает режим перетаскивания
             */
            disable: function() {
                this.elem.off( '.draggable' );
            },


            /**
             * Обрабатывает событие "mousedown" на элементе
             * Фиксирует точку захвата
             *
             * @param {Object} e Объект события
             * @private
             */
            _mousedown: function( e ) {
                var position = $( e.target ).position();

                this._shiftX = e.pageX - position.left;
                this._shiftY = e.pageY - position.top;

                $( document ).on({
                    'mousemove.draggable': this._mousemove.bind( this ),
                    'mouseup.draggable': this._mouseup.bind( this )
                });

                this.elem.addClass( this.options.clazz );
            },


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

                left = Math.min( left, this.options.area.right );
                left = Math.max( left, this.options.area.left );

                top = Math.min( top, this.options.area.bottom );
                top = Math.max( top, this.options.area.top );

                position = { top: top, left: left };

                switch( this.options.axis ) {
                    case 'x':
                        delete position.top;
                        break;
                    case 'y':
                        delete position.left;
                        break;
                }

                this.elem.css( position );
            },


            /**
             * Обрабатывает событие "mouseup" на элементе
             * Снимает обработчики mousemove и mouseup с документа
             *
             * @private
             */
            _mouseup: function() {
                $( document ).off( '.draggable' );
                this.elem.removeClass( this.options.clazz );
            }
        };


        // ---------------------


        return function( options ) {

            this.each(function() {
                var elem = $( this );

                elem.draggable = new DragBuilder( elem, options );
            });

            return this;
        };

    }());

}( Zepto ));
