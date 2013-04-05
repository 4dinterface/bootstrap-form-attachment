/**
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 */

//компонент в разработке
Define('app.model.Keyframe', /** @lends {app.model.Keyframe.prototype} */ {

	extend : app.Model,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {
            this._super();                    
	},        
	/**
	 * @method set
	 * @param {property} name
         * @param {value} value
	 * @return null
	 **/
	set : function (property, value) {
            this._super();
            this.fire("keyframechange", {
                key:name,
                value:value
            });
	},


	//get : function (name) {
        //    this.super();
	//}
});

