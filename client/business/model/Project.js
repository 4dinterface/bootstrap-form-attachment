/**
 * @name app.business.model.Project
 * @class
 * @extends {app.Model}
 * 
 *                          (Project)
 *                              |
 *                      SymbolCollection
 *                              |                              
 *                            Symbol
 *                              |                              
 *                     CompositionCollction
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
 */                  

'use strict';


//компонент в разработке
Define( 'app.business.model.Project', /** @lends {app.model.Keyframe.prototype} */ {

    //Композиция это типичная модель
    extend: "core.data.Model",

    /**
     * Конструктор экземпляров
     * @constructor
     */
    init: function() {
        this._super();
        this.set( 'symbolCollection',  new app.business.model.SymbolCollection() );
    },

	/**
	 * @method set
	 * @param {*} property
     * @param {Object} value
	 * @return undefined
	 **/
    set: function( property, value ) {
        var me = this;

        value.parent = me;

        this._super();
        this.fire( 'projectchange', {
            key: name,
            value: value
        });
        
        this.liftEvent(value);        
    },
                            
    //очистка
    clear: function() {
        this.set( 'symbolCollection',  new app.business.model.SymbolCollection() );
    }

});
