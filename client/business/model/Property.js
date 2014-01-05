//Внимание данный компонент пока не используется

/**
 * @name app.business.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 * ====================================================================== *
 *  
 *                          Project
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
 *          Keyframe                      (Property)
 *                                           |
 *                                     KeyframeCollection   
 *                                           |
 *                                        Keyframe
 * ====================================================================== *
 * 
 * property описывает свойство на таймлайне
 * Может содержать множество полезных данных для view timeline,controller timeline 
 * К сожалению я несмог придумать ниодного полезного свойства :)  Но мне кажется нерв придумает 
 * Каждый property создаётся изначально со свойством keyframeCollection, которое указывает 
 * на коллекцию ключей
 */

//компонент в разработке
Define('app.business.model.Property', /** @lends {app.business.model.Keyframe.prototype} */ {
	extend : core.data.Model,
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {                        
            this._super(); 
            
            //если ключ отсутствует keyframeCollection, тогда создадим keyframeCollection
            if ( ! this.get("keyframeCollection") ) {
                this.set("keyframeCollection", new app.business.model.KeyframeCollection() ); 
                this.get("keyframeCollection").parent=this;
            }
            
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
            this.fire("propertychange", {
                key:name,
                value:value
            });

            // всплытие
            this.liftEvent(value,function(e){                
                e.property=me;
                me.fire(e.eventName,e);
            })            
	},
                
    /**
     * Возращает длинну анимации свойства
     */        
    getLength:function(){
            var result=0,
                keyCollection = this.get( 'keyframeCollection' );
        
            keyCollection.forEach( function( keyframe ) {
                if(keyframe.get('key')>result) result= keyframe.get('key');
            })            
            return result;
        }
        
});
