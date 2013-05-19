/* 
 * Коллекция фильтров подключенных к Shape
 * 
 * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             (FilterCollection)
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *     KeyframeCollection             PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection
 *                                           |
 *                                        Keyframe                        
 *                                                          
 * ====================================================================== *
 */

Define('app.model.FilterCollection', /** @lends {app.Model} */ {
    //можно унаследовать от 
    extend : core.data.ArrayCollection,    
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
     * @param {name} name
     * @param {value} value
     * @return null
     **/
    set : function (num, value) {        
        var me=this;
        
        value.parent=me;
                        
        this._super();
        
        this.fire("filtercollectionchange", {
            name:name,
            value:value
        });
        
        //поднимем события из value на этот уровень
        this.liftEvent(value);
    },


            
    push : function (value) {                
        var me=this;
        
        this._super();
        
        this.fire("filtercollectionchange", {
            name:this.length,
            value:value
        });

        //поднимем события из value на этот уровень
        this.liftEvent(value);
    }         
        
            
});
