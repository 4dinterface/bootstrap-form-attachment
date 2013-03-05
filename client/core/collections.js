

app.collection= function(){    
	var cash=[];
	
	F=function (){ };
		
	F.prototype={
		    
	    get:function(name){
	        return this[name];
	    },

		//возвращает значение по индексу
	    set:function(name,val){
	        this[name]=val;
			cash=this.key();
			//this.fire('change');
	    },

            //возвращает значение по индексу
            item:function(index){
               return this[ cash[index] ];     
            }     		
		
	}

	return new F;	
};