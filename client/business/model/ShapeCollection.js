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
 *                         Composition
 *                              |
 *                       (ShapeCollection)
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
 
Define('app.business.model.ShapeCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    //по сути это arrayCollection
    extend : core.data.ArrayCollection,
    data:null,

    /**
     * @constructor
     */
    init : function () {        
        this._super();                   
    }                 

        
});
