/**
 * @name app.model.Shape
 * @class
 * 
 * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      (PropertyCollection)           FilterCollection
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *      KeyframeCollection         ( PropertyCollection )
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection   
 *                                           |
 *                                        Keyframe
 *                                         
 * ====================================================================== *
 *                                                                                
 */
Define('app.model.PropertyCollection', /** @lends {app.Model} */ {
    //property collection наследуется от модели, несмотря на то что это коллекция    
    extend : core.data.Model,    
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
        value.parent=me;
        
        this._super();
        this.fire("propertycollectionchange", {
            name:name,
            value:value
        });
        //обеспечим всплытие событий
        //console.log(value);
        
        this.liftEvent(value,function(e){                
            //добавим инфу о propertyCollection
            e.propertyCollection=me;
            //укажем имя свойства
            e.propertyName=name;
            me.fire(e.eventName,e);
        })
        
    },

    //forEach - forEach
    forEach:function(callback, context ) {
       for (n in this.data) callback.call( context|| window, this.data[ n ], n, this.data );
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
        //fix 
        shape = this.parent.target;

        for (propertyName in properties) if (properties.hasOwnProperty(propertyName)) {

            // если у фигуры есть такое свойство - т.е. оно анимируется
            if (propertyName in shape) {
                keyframes = properties[ propertyName ];
                callback(propertyName, keyframes);
            }

        }
    }
    
});

