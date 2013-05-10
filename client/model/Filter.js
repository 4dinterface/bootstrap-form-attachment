/**
 * @name app.model.Filter
 * @class
 * @extends {app.Model}
 * 
 * Класс описывает фильтр
 * 
 * * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection)
 *             |                             |
 *         Property                       (Filter)
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

Define('app.model.Filter', /** @lends {app.model.Keyframe.prototype} */ {
	extend : core.data.Model,//
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {                        
            this._super(); 
            this.set("propertyCollection", new app.model.PropertyCollection() ); 
            this.get("propertyCollection").parent=this;
        },
                
        /**
	 * @method set
	 * @param {property} name
         * @param {value} value
	 * @return null
	 **/
	set : function (property, value) {
            var me=this;
            value.parent=me;
            this._super();
            this.fire("filterchange", {
                key:name,
                value:value
            });
            
            this.liftEvent(value,function(e){                
                e.shape=me;
                me.fire(e.eventName,e);
            })
	}
});        
