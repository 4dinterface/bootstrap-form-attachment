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
	},
                
        //getId
        getId:function(id){
            //результат            
            var result=false;
            
            var shapeCollection=this.get('shapeCollection');
            var propertyCollection=null;
            var keyCollection=null;
            
            shapeCollection.forEach(function(shape){
                
                if (shape.id==id) {
                    result=shape;
                }
                
                if (result===false){
                    propertyCollection=shape.get('propertyCollection');
                    propertyCollection.forEach(function(prop){                                                
                        if (prop.id==id) {
                            result=prop;                            
                        }
                        
                        if (result===false){                            
                            keyCollection=prop.get('keyframeCollection');
                            keyCollection.forEach(function(key){
                                if (key.id==id) result=key;
                            })
                        }
                        
                    })
                }                
            });                        
            //alert (result);            
                    
            return result;
            
        }
});