'use strict';

app.timeline = app.timeline || {};


app.timeline.utilites = {

    /**
     * Преобразовывает строку в NodeList
     * @param {String} str
     * @returns {NodeList}
     */
    stringToDOM: function(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.childNodes[ 1 ]; // TODO: 0 - Text, 1 - Node, 2 - Text
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
    toPixels: function( pixelsPerSecond, milliseconds ) {
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
    toMilliseconds: function( pixelsPerSecond, pixels ) {
        return pixels / pixelsPerSecond * 1000;
    }

};
