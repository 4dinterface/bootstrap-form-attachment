'use strict';

app.timeline = app.timeline || {};


app.timeline.utilites = {


    /**
     * Возвращает функцию, вызывающую исходную с задержкой delay в контексте
     * context, если таковой был указан. В случае, когда во время задержки функция
     * была вызвана еще раз, то предыдующий вызов отменяется, а таймер обновляется.
     * Таким образом из нескольких вызовов, совершающихся чаще, чем delay,
     * реально будет вызван только последний.
     *
     * @param {Function} fn
     * @param {Number} [delay=40]
     * @param {Object} [context=this]
     * @return {Function}
     */
    // TODO: Подумать над реализацией метода
    applyCallFilter: function( fn, delay, context ) {
        var timer;
        return function() {
            var that = this, args = arguments;

            clearTimeout( timer );
            timer = setTimeout( function() {
                fn.apply( context || that, args );
            }, delay || 10 );
        };
    },


    /**
     * Округляет число до определенного числа.
     * Режим округлени (вниз/вверх) задается параметром mode.
     *
     * @param {Number} value Число, которое предстоит округлить
     * @param {Number} precision Число, задающее точность округления
     * @param {Number} mode Режим округления
     * @return {Number} Округленное число
     */
    roundUpTo: function( value, precision, mode ) {
        var rest = value % precision;
        value += mode < 0 ? -rest : precision - rest;
        return value;
    },


    /**
     *  Переводит миллисекунды в пиксели в зависимости
     *  от настроек представления таймлана.
     *
     *  @this {Object}
     *  @param {Object} model
     *  @param {Number} milliseconds
     *  @return {Number}
     */
    toPixels: function( model, milliseconds ) {
        return milliseconds / 1000 * model.pixelsPerSecond;
    },


    /**
     *  Переводит пиксели в миллисекунды в зависимости
     *  от настроек представления таймлана.
     *
     *  @this {Object}
     *  @param {Object} model
     *  @param {Number} pixels
     *  @return {Number}
     */
    toMilliseconds: function( model, pixels ) {
        return pixels / model.pixelsPerSecond * 1000;
    }

};
