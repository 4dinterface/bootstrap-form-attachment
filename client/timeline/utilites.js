'use strict';

app.timeline = app.timeline || {};


app.timeline.utilites = {

    /**
     *  Переводит миллисекунды в пиксели в зависимости
     *  от настроек представления таймлана.
     *
     *  @this {Timeline}
     *  @param {Number} milliseconds
     *  @return {Number}
     */
    toPixels: function( milliseconds, pixelsPerSecond ) {
        return milliseconds / 1000 * this.model.pixelsPerSecond;
    },


    /**
     *  Переводит пиксели в миллисекунды в зависимости
     *  от настроек представления таймлана.
     *
     *  @this {Timeline}
     *  @param {Number} pixels
     *  @return {Number}
     */
    toMilliseconds: function( pixels ) {
        return pixels / this.model.pixelsPerSecond * 1000;
    }

};