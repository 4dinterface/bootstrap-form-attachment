/**
 * @fileOverview
 * @author <a href="https://github.com/amixok/">Amixok</a>
 * @version 0.1
 */

/**
 * Базовый класс для моделей
 * @name app.Model
 * @class
 * @extends {app.Component}
 */
Define('app.Model', /** @lends {app.Model.prototype} */ ({

	extend : app.Component,

	data : null,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function (prop) {
            this._super();
            var i;

            this.data = {};

            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    this.data[i] = prop[i];
                }
            }
            //this.cash = Object.keys(this);
            //this.length = this.cash.length;
            
	},
        
	/**
	 * @method set
	 * @param {name} name
         * @param {value} value
         * 
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/
	set : function (name, value) {
            var me=this;
            this.data[name] = value;
            //cash = this.key();
            //this.length = cash.length;
            this.fire("change", {
                key:name,
                value:value
            });                           
	},


    /**
     * Получение значения свойства
     * @method get
     * @param {string} name
     * @returns {*}
     */
	get : function (name) {
		//alert(this.data[name]);
		var data = this.data[name];
		//console.log( 'this' , data );
		return data;
	}
}));

