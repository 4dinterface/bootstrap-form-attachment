/**
 * @name app.business.model.Symbol
 * @class
 * @extends {app.Model}
 * 
 *          
 *                          Project
 *                              |
 *                      SymbolCollection
 *                              |                              
 *                           (Symbol)
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
 *
 **/                  

'use strict';


//компонент в разработке
Define( 'app.business.model.Symbol', /** @lends {app.model.Keyframe.prototype} */ {

    //Композиция это типичная модель
    extend: core.data.Model,

    /**
     * Конструктор экземпляров
     * @constructor
     */
    init: function() {
        this._super();
        this.set( 'compositionCollection', new app.business.model.CompositionCollection() );
    }

    
    
});
