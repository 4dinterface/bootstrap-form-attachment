//компонент в разработке

app.Collection= function(prop){    
	var cash=[];

        //наследование
	var R=function (prop){
            for(var i in prop) this[i]=prop[i];                        
            cash=Object.keys(this);
            this.length=cash.length;
        };
        
        var F=function (){ };
	F.prototype=app.Component.prototype;
	var proto=R.prototype=new F;

        //геттер свойств
        proto.get=function(name){
            return this[name];
	},
        
	//setter
	proto.set=function(name,val){
	    this[name]=val;
            cash=this.key();
            this.length=cash.length;
            this.fire('change',{});	   
        },

        //возвращает значение по индексу
        proto.item=function(index){
            return this[ cash[index] ];     
        },     		        
        
        proto.each=function(index){
            return this[ cash[index] ];     
        }     		
		    
	return new R(prop);	
};