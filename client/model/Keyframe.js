/**
 * @namespace
 */
app;

/**
 * Базовый класс для ключевых кадров
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 */
Define('app.model.Keyframe', /** @lends {app.model.Keyframe.prototype} */ {

	extend : app.Model,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 */
	init : function () {
            this._super();                    
	},

	/**
     * Установка значения свойства
	 * @method set
	 * @param {string} property
     * @param {*} value
	 **/
	set : function (property, value) {
            this._super();
            this.fire("keyframechange", {
                key: property,
                value: value
            });
	}


	//get : function (name) {
        //    this.super();
	//}
});

