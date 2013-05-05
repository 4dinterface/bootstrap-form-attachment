/**
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 *
 *                         Composition
 *                              |
 *                       ShapeCollection
 *                              |
 *                            (Shape)
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
 *                                        
 * shape описывает shape
 * Может содержать множество полезных данных для view, таки как имя shape, цвет, свёрнут/развёрнут и тд
 * Каждый shape создаётся изначально со свойством propertyCollection, которое указывает на коллекцию анимируемых свойст
 */

//компонент в разработке
Define('app.model.Shape', /** @lends {app.model.Keyframe.prototype} */ {
	extend : app.Model,
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {
            this._super(); 
            this.set("propertyCollection", new app.model.PropertyCollection() ); 
            this.get("propertyCollection").parent=this;
           
           // непонятно как назвать толи filter толи FX
           this.set("filterCollection", new app.model.FilterCollection() ); 
           this.get("filterCollection").parent=this;

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
            this.fire("timelinepropertychange", {
                key:name,
                value:value
            });
            
            this.liftEvent(value,function(e){                
                e.shape=me;
                me.fire(e.eventName,e);
            })
	}
});
