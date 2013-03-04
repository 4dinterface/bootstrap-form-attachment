Define("app.component",{
	event:{},
	listeners:{},	
	behaviours:[],


	init:function(){
		//подключаем поведение
		var v=this.behaviours.length;
		while(v--){
			this.addBehaviour( this.behaviours[v] );
		}

		//подключаем обработчики событий		
		for (event in this.listeners ){

		}
	},
	
	//события
	listeners:{},	

	fire:function(name,options){
		for (item in this.event[name]) this.event[name][item](options);
	},
	
	on:function(name,fun){
		if (typeof this.event[name]=="undefined") this.event[name]=[];
		this.event[name].push(fun);	
	},
	
	off:function(name){},
	
	//поведение	
	addBehaviour:function(name){
		new app.behaviours[name](this);
	},

	removeBehaviour:function(){}	
})