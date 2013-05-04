/**
 * Коллекция фигур
 * @class
 * @name app.model.ShapeCollection
 * @extends {app.Component}
 * 
 *                          Timeline
 *                              |
 *                      (ShapeCollection)
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
 *                                        
 */
Define('app.model.ShapeCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    //по сути это arrayCollection
    extend : app.ArrayCollection,
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
        
        this.fire("timelinechange", {
            name:name,
            value:value
        });
        
        //поднимем события из value на этот уровень
        //this.liftEvent(value);
    },
            
    push : function (value) {                
        var me=this;
        
        this._super();
        
        this.fire("timelinechange", {
            name:this.length,
            value:value
        });

        //поднимем события из value на этот уровень
        this.liftEvent(value);
    }         

    
    
});
