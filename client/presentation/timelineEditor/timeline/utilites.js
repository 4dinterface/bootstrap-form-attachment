'use strict';

app.timeline = app.timeline || {};


app.timeline.utilites = {

    /**
     * Преобразовывает строку в NodeList
     * @param {String} str
     * @returns {HTMLElement}
     */
    stringToDOM: function(str) {
        var container = document.createElement('div'), node;
        container.innerHTML = str;
        node = container.children[0];
        container = undefined;
        return node;
    },

    /**
     * Возвращает элемент по id
     * @param {String} id
     * @returns {HTMLElement}
     */
    getById: function(id) {
        return document.getElementById(id);
    },

    /**
     *  Переводит миллисекунды в пиксели в зависимости
     *  от настроек представления таймлана.
     *
     *  @param {Number} pixelsPerSecond
     *  @param {Number} milliseconds
     *  @return {Number}
     */
    toPixels: function(pixelsPerSecond, milliseconds) {
        return milliseconds / 1000 * pixelsPerSecond;
    },

    /**
     *  Переводит пиксели в миллисекунды в зависимости
     *  от настроек представления таймлана.
     *
     *  @param {Object} pixelsPerSecond
     *  @param {Number} pixels
     *  @return {Number}
     */
    toMilliseconds: function(pixelsPerSecond, pixels) {
        return pixels / pixelsPerSecond * 1000;
    },


    /**
     * Округляет число до целого заданной точности, которая задается определенным числом
     * Режим округления (вниз/вверх) задается параметром direction
     *
     * roundToIntByNumber(57, 10, 1) => 60
     * roundToIntByNumber(57, 10, -1) => 50
     *
     * @param {Number} number Число, которое предстоит округлить
     * @param {Number} precision Число, задающее точность округления
     * @param {Number} direction Режим округления
     * @return {Number} Округленное число
     */
    roundToIntByNumber: function(number, precision, direction) {
        var rest = number % precision;
        number += direction < 0 ? -rest : precision - rest;
        return number;
    }
};
