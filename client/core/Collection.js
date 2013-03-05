//компонент в разработке
//alert(100500);
Define('app.Collection',{    
                
        extend:app.Component,
        
        cash:[],
        
        //наследование
	init:function (prop){
            for(var i in prop) this[i]=prop[i];                        
            this.cash=Object.keys(this);
            this.length=cash.length;
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
        },     		        
        
        each:function(index){
            return this[ cash[index] ];     
        }     				    	
});