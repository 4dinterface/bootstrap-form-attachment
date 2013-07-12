/**
 * Коллекция фигур
 * @class
 * @name app.model.ShapeCollection
 * @extends {app.Component}
 * 
 *                          Project
 *                              |
 *                      SymbolCollection
 *                              |                              
 *                            Symbol
 *                              |                              
 *                     CompositionCollection
 *                              |                              
 *                         (Composition)
 *                              |
 *                       ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *      KeyframeCollection            PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection   
 *                                           |
 *                                        Keyframe
 
 **/
 
Define('app.model.ShapeCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    //по сути это arrayCollection
    extend : core.data.ArrayCollection,
    data:null,

    /**
     * @constructor
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
        
        value.parent=me;
                        
        this._super();
        
        this.fire("compositionchange", {
            name:name,
            value:value
        });
        
        //поднимем события из value на этот уровень
        this.liftEvent(value);
    },

    /**
     * @method push     
     * @param {value} value
     * @return null
     **/            
    push : function (value) {                
        var me=this;
        
        this._super();
        
        this.fire("compositionchange", {
            name:this.length,
            value:value
        });

        //поднимем события из value на этот уровень
        this.liftEvent(value);
    }         
        
});
