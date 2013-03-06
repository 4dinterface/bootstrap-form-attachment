// бдыщ от hnoe (компонент в разработке) :octocat:
Define('app.Model', {

	extend: app.Component,

	cash: [],

	init : function (prop) {
		var i;

		for (i in prop) {
			if (prop.hasOwnProperty(i)) {
				this[i] = prop[i];
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
});

