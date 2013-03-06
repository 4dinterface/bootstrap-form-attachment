//компонент в разработке
/**
 * @name app.Collection
 */
Define('app.Collection', /** @lends {app.Collection} */ ({
                
        extend:app.Component,
        
        cash:[],
        
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
        },     		        

        //перебор в порядке следования
        each:function(index){
            return this[ cash[index] ];     
        }     				    	
}));