//компонент в разработке
Define('app.Collection',{    
                
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

        /**
	 * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can be
	 * @method forEach
	 * @param {callback} ASD
	 * value, including HEX colors, rgb and rgba. The default value is a transparent background.
	 * @param {String} mimeType The MIME type of the image format to be create. The default is "image/png". If an unknown MIME type
	 * is passed in, or if the browser does not support the specified MIME type, the default value will be used.
	 * @return {String} a Base64 encoded image.
	 **/
        forEach:function(callback){
            for(prop in this) {
                if (!object.hasOwnProperty(prop)) continue;
                if (prop!="length") continue;
                
                callback(prop,this[prop],this);
            }
            return this[ cash[index] ];     
        }     				    	
});