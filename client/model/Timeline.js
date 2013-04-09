/**
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 */

//компонент в разработке
Define('app.model.Timeline', /** @lends {app.model.Keyframe.prototype} */ {
	extend : app.Model,
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {
            this._super(); 
            this.set("shapeCollection", new app.model.ShapeCollection() );            
	},        
	/**
	 * @method set
	 * @param {property} name
         * @param {value} value
	 * @return null
	 **/
	set : function (property, value) {
            var me=this;
            this._super();
            this.fire("timelinepropertychange", {
                key:name,
                value:value
            });

            // всплытие
            if(value.on) value.on('bubble',function(e){                
                //e.propertyName=name;
                me.fire(e.eventName,e);
            })            
	}
});