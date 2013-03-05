//компонент в разработке

app.Collection= function(prop){    
	var cash=[];

        //наследование
	var R=function (){ };
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
            //this.fire('change');	   
        },

        //возвращает значение по индексу
        proto.item=function(index){
            return this[ cash[index] ];     
        }     		
		    
	return R;	
};