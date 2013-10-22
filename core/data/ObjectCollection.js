//компонент в разработке
/**
 * @name app.ObjectCollection
 * @class
 */
Define('core.data.ObjectCollection', /** @lends app.ObjectCollection */({

        //наследование        
        extend:core.Component,
        
        cache:null,
        data:null,
        isModel:false,
        isCollection:true,

        //протестируем браузер и узнаем будет ли он упорядочевать ключи из обьекта
        tstSort:(function(){
            var tst={ 10:10, 5:5, 1:1 };     
            return Object.keys(tst)[0]==1 && Object.keys(tst)[1]==5 && Object.keys(tst)[2]==10;
        })(),
        
        /**
         * @constructor
         * @param {Object} prop
         */
	init:function (prop){
        this._super();
            
        this.cache=[];
        this.data={};
            
        for(var i in prop) {
            this[i]=prop[i];//удалить
            this.data[i]=prop[i];
        }                                    

        this.cache=Object.keys(this.data);
        this.length=this.cache.length;
    },

    /**
     * @method fire
     * @param {name} name
     * @param {value} options
     * @param {value} context
     * @return {undefuned} 
     * 
     * Перегрузим стандартный fire класса Components, 
     * тоесть он будет срабатывать не только для класса но и в том классе куда он агрегирован при помощи set
     * 
     **/
    fire:function(name, options, context){
        this._super();

        //передадим обработчик выше
        if (this.parent) 
            if (this.parent.fire) this.parent.fire.apply( this.parent, arguments );

        return this;
    },

    fireChange:function (par){
        this.fire(this._className.toLowerCase()+"change", par );        
    },
    
                

    //геттер свойств

    get:function(name){
        return this.data[name];
	},
        
	//setter
	set:function(name,value){
        var me=this;
	    this.data[name]=value;
        this[name]=value;//удалить
            
        this.cache=Object.keys(this.data);            
            
        this.length=this.cache.length;

        //сгенерируем
        if (value.isCollection || value.isModel) {
            //сделаем родителем коллекции эту модель
            value.parent = me;                            
        }
            
        this.fireChange({
            operation:"set",
            field:name,
            value:value
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
        for(prop in this.data) {
            if ( this[prop] === this.proto[prop] ) continue;                
            //if ( isFinite(parseInt(prop, 10)) ) callback(this[prop],prop , this);
            if(prop*1) callback.call( context || window, this.data[prop], prop , this );
        }
        return this;
    }     			
        
}));
