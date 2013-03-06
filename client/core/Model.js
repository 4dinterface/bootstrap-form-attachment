// бдыщ от hnoe (компонент в разработке)
Define('app.Model', {

	extend: app.Component,

	data: null,

	init : function (prop) {
            var i;
            
            this.data={};

            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    data[i] = prop[i];
		}
            }
            //this.cash = Object.keys(this);
            //this.length = this.cash.length;
	},

	set : function (property, value) {
		this[property] = value;
		//cash = this.key();
		//this.length = cash.length;
		this.fire("change", {});
	},


	get : function (value) {
		return data[value];
	}
});

