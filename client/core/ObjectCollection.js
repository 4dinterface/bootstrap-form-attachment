//компонент в разработке
Define('app.ObjectCollection',{    
                
        extend:app.Component,
        
        cash:[],
        
        //наследование
	init:function (prop){
            this.super();
            
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
            var me=this;
	    this[name]=val;
            this.cash=Object.keys(this);
            this.length=this.cash.length;
            
            this.fire('change',{
                operation:"set",
                field:name,
                value:val,                
            });

            //обеспечим всплытие событий
            val.on('bubble',function(e){
                me.fire(e.eventName,e);
            })
        },

        //возвращает значение по индексу
        item:function(index){
            return this[ this.cash[index] ];     
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
                if ( this[prop] === this.proto[prop] ) continue;                
                if ( prop*1 ) callback(this[prop],prop , this);
            }
            return this;
        }     			
        
});