/**
 * @name app.business.model.Shape
 * @class
 * 
 * ====================================================================== *
 *                          Project
 *                              |
 *                      (SymbolCollection)
 *                              |                              
 *                            Symbol
 *                              |                              
 *                     CompositionCollection
 *                              |                              
 *                         Composition
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
 * ====================================================================== *
 *                                                                                
 */
Define('app.business.model.SymbolCollection', /** @lends {app.Model} */ {
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

    //forEach - forEach (ВОЗМОЖНО НЕНУЖЕН)
    forEach:function(callback, context ) {
       for (n in this.data) callback.call( context|| window, this.data[ n ], n, this.data );
    }
});

