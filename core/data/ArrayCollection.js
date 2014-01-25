/**
 * Коллекция фигур
 * @class
 * @name app.model.ShapeCollection
 * @extends {app.Component}
 */
Define('core.data.ArrayCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    extend : "core.Component",
    data:null,

    isModel:false,
    isCollection:true,

    /**
     * @constructor
     */
    init : function () {
        this.data=[];
        this._super();                   
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

    //Вспомогательный метод
    fireChange:function (par){
        //TODO пустить через app.events
        this.fire(this._className.toLowerCase()+"change", par );        
    },
                
    /**
     * @method set
     * @param {name} name
     * @param {value} value
     * @return null
     **/
    set : function (num, value) {                                
        this.data[i]=value;      

        //сгенерируем
        if (value.isCollection || value.isModel) {
            //сделаем родителем коллекции эту модель
            value.parent = this;                            
        }

        this.fireChange({
            key:num,
            value:value,
            operation:"set"
        }); 
        return value;                       
    },
            
    push : function (value) {                
        this.data.push(value);
        this.length=this.data.length;               

        //сгенерируем
        if (value.isCollection || value.isModel) {
            //сделаем родителем коллекции эту модель
            value.parent = this;                            
        }

        this.fireChange({
            key:name, // ТОДО ВАТАФАК он же нулл будет
            value:value,
            operation:"push"
        });        
        return value;
    },
    
       
    /**
     * @method get
     * @param {property} name
     * @param {value} value
     * @return null
     **/
    get : function (num) {            
        return this.data[num];        
    },  
    
    forEach:function(callback, context ) {
        this.data.forEach(callback, context );
    },

    /**
     * Деструктор для ArrayCollection
     * @override
     */
    destroy: function () {

        // Вызов декструкторов для данных внутри модели
        for (var value in this.data) {
            if (value.isCollection || value.isModel) {
                value.destroy();
            }
        }

        // Передадим управление перекрытому родительскому методу
        this._super();

    }

});
