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
     
    forEach:function(callback){
       for (n in this.data) callback(this.data[n],n,this.data);       
    },

    /**
     * Пройдётся по анимируемым свойствам и вызовет callback для каждого
     * Первый аргумент - имя свойства
     * Второй - коллекция ключевых кадров для свойства
     * @param {function(string, app.model.KeyframeCollection)} callback
     */
    iterateProperties: function (callback) {
        var propertyName,
            keyframes,
            properties,
            shape;

        properties = this.data;
        shape = this.target;

        for (propertyName in properties) if (properties.hasOwnProperty(propertyName)) {

            // если у фигуры есть такое свойство - т.е. оно анимируется
            if (propertyName in this.target) {
                keyframes = properties[ propertyName ];
                callback(propertyName, keyframes);
            }

        }
    }

});

