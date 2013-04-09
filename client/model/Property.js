//Внимание данный компонент пока не используется

/**
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 * property описывает свойство на таймлайне
 * Может содержать множество полезных данных для view timeline,controller timeline 
 * К сожалению я несмог придумать ниодного полезного свойства :)  Но мне кажется нерв придумает 
 * Каждый property создаётся изначально со свойством keyframeCollection, которое указывает 
 * на коллекцию ключей
 */

//компонент в разработке
Define('app.model.Property', /** @lends {app.model.Keyframe.prototype} */ {
	extend : app.Model,
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {
            this._super(); 
            this.set("keyframeCollection", new app.model.KeyframeCollection() ); 
            this.get("keyframeCollection").parent=this;
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
            this.fire("propertychange", {
                key:name,
                value:value
            });

            // всплытие
            if(value.on) value.on('bubble',function(e){                
                e.property=me;
                me.fire(e.eventName,e);
            })            
	}
});