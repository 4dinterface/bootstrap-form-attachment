//array collection пока ещё в работе

Define('app.arrayCollection',{                    
        extend:app.Component,
        length:0,
        
        //cash:[],
        
        //наследование
	init:function (prop){
            this.cash=[];
            
            for(var i in prop) this[i]=prop[i];                        
            this.cash=Object.keys(this);
            this.length=this.cash.length;
        },
                

        //геттер свойств
        get:function(name){
            return this[name];
	},
        
	//setter
	set:function(name,val){
	    this[name]=val;
            cash=this.key();
            this.length=cash.length;
            this.fire('change',{});	   
        },

        //возвращает значение по индексу
        item:function(index){
            return this[ cash[index] ];     
        }

});