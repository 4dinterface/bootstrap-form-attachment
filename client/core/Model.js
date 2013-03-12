/**
 * @fileOverview
 * @author <a href="https://github.com/amixok/">Amixok</a>
 * @version 0.1
 */

/**
 * бдыщ от hnoe (компонент в разработке)
 * @name app.Model
 * @class
 */
Define('app.Model', /** @lends {app.Model} */ {

	extend : app.Component,

	data : null,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function (prop) {
            this.super();
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
	 * @param {property} name
         * @param {value} value
         * 
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/
	set : function (property, value) {
		this.data[property] = value;
		//cash = this.key();
		//this.length = cash.length;
		this.fire("change", {});
	},


	get : function (name) {
		//alert(this.data[name]);
		var data = this.data[name];
		//console.log( 'this' , data );
		return data;
	}
});

