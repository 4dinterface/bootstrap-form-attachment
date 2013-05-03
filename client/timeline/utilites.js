'use strict';

app.timeline = app.timeline || {};


app.timeline.utilites = {

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