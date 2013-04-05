/**
 * @name app.model.Shape
 * @class
 */
Define('app.model.Shape', /** @lends {app.Model} */ {
    extend : app.Model,
    /***
     * Конструктор экземпляров
    * @constructor
    * @param {Object} prop объект с описанием экземпляра
    */
    init : function () {
        this._super();                    
    },                  
    /**
     * @method set
     * @param {property} name
     * @param {value} value
     * @return null
     **/
    set : function (name, value) {
        var me=this;
        this._super();
        this.fire("shapechange", {
            name:name,
            value:value
        });
        //обеспечим всплытие событий
        //console.log(value);
        
        if(value.on) value.on('bubble',function(e){
            //добавим инфу о shape
            e.shape=me;
            //укажем имя свойства
            e.propertyName=name;
            me.fire(e.eventName,e);
        })
    },

    /**
     * Перебор с
     */
    forEach:function(f){
        for(i in this.data){
            f(this.data[i],i,this.data)
        }
    }        
    
});

