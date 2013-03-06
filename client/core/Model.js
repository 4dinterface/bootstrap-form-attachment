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
Define('app.Model', /** @lends {app.Model} */ ({

	extend: app.Component,

	cash: [],

    /***
     * Конструктор экземпляров
     * @constructor
     * @param {Object} prop объект с описанием экземпляра
     */
	init : function (prop) {
		var i;

        if (prop) {
            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    this[i] = prop[i];
                }
            }
        }

        this.cash = Object.keys(this);
        this.length = this.cash.length;
	},

	set : function (property, value) {
		this[property] = value;
		cash = this.key();
		this.length = cash.length;
		this.fire("change", {});
	},

	get : function (value) {
		return this[value];
	}
}));