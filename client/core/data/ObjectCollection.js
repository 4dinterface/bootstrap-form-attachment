//компонент в разработке
/**
 * @name app.ObjectCollection
 * @class
 */
Define('app.ObjectCollection', /** @lends app.ObjectCollection */({
                
        extend:app.Component,
        
        cache:[],
        
        //наследование
    /**
     * @constructor
     * @param {Object} prop
     */
	init:function (prop){
            this._super();
            
            this.cache=[];            
            
            for(var i in prop) this[i]=prop[i];                        
            this.cache=Object.keys(this);
            this.length=this.cache.length;
        },
                

        //геттер свойств
        get:function(name){
            return this[name];
	},
        
	//setter
	set:function(name,val){
            var me=this;
	    this[name]=val;
            this.cache=Object.keys(this);
            this.cache=Object.keys(this);
            
            this.length=this.cache.length;
            
            this.fire('change',{
                operation:"set",
                field:name,
                value:val
            });

        },

        //возвращает значение по индексу
        item:function(index){
            return this[ this.cache[index] ];     
        },     	

         // Удаляет записи
         remove:function(){
     
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
        forEach:function( callback, context ) {
            var prop;
            for(prop in this) {
                if ( this[prop] === this.proto[prop] ) continue;                
                //if ( isFinite(parseInt(prop, 10)) ) callback(this[prop],prop , this);
                if(prop*1) callback.call( context || window, this[prop], prop , this );
            }
            return this;
        }     			
        
}));
