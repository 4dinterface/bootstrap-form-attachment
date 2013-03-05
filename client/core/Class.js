Define=function(name,prop){
        'use strict';
	
	var src=prop.extend || {},
	    child=function(){
		if (this.init) this.init.apply(this,arguments);
	    };
	
	//child prototype - скопируем туда родителя
	var F=function(){};
	F.prototype=src.prototype;
	child.prototype=new F;

	//ссылки на класс 
	child.prototype["proto"]=child.prototype;

	//скопируем свойства текущего класса
	for(var x in prop){	        
		if ( typeof prop[x]=="function" ) prop[x]=wrapper ( x, prop[x], src.prototype );
		child.prototype[x] = prop[x];
	}	

	//console.log(child.prototype);

	//вернём результат	
	return NS(name,child);	


	//враппер для функций
	function wrapper(name,fun,src){
		return function(){
			var arg=arguments;
			this.super=function(){ 								
				if (src[name]) src[name].apply(this,arg);
			};

			fun.apply(this,arguments);	
		}
	}

	//устанавливает значение по неймспейсу
	function NS(name,obj){
		var result=window;		
		name.split(".").forEach(function(val,num,arr){			
			if (num==arr.length-1) result[val]=obj;
			else result[val]=result[val] || {};
			result=result[val];
		});

		return result;
	}
}