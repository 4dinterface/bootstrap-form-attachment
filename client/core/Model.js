// бдыщ от hnoe (компонент в разработке)
Define('app.Model', {

	extend: app.Component,

	data: null,

	init : function (prop) {
            var i;
            
            this.data={};

            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    this.data[i] = prop[i];
		}
            }
            //this.cash = Object.keys(this);
            //this.length = this.cash.length;
	},

	set : function (property, value) {x
		this.data[property] = value;
		//cash = this.key();
		//this.length = cash.length;
		this.fire("change", {});
	},


	get : function (name) {
                //alert(this.data[name]);
                var data=this.data[name];
                //console.log( 'this' , data );
		return data;                
	}
});

