/**
 * @fileOverview
 * @author <a href="https://github.com/amixok/">Amixok</a>
 * @version 0.1
 */

/**
 * бдыщ от hnoe (компонент в разработке)
 * @name app.Model
 * @class
 */
Define('core.data.Model', /** @lends {app.Model} */ {

	extend : core.Component,

	data : null,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function (prop) {
            this._super();
            var i,me=this;

            this.data = {};

            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    //this.data[i] = prop[i];
                    me.set(i,prop[i]);                    
                }
            }
            //this.cash = Object.keys(this);
            //this.length = this.cash.length;
            
	},
                
        //описывает названия событий которые должны генерировать атоматически
        autoFireEvent:{            
            //set:" имя события"
        },
        
	/**
	 * @method set
	 * @param {name} name
         * @param {value} value
         * 
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/
	set : function (name, value) {
            var me=this;
            this.data[name] = value;
            //cash = this.key();
            //this.length = cash.length;

            //если устанавливаемое значение это коллекция
            if (value.isCollection) {
                //сделаем родителем коллекции эту модель
                value.parent = me;
                
                //разрешим всплытие событий
                this.liftEvent(value);
            }
            
            //событие генерируется при любом изменении                
            this.fire("change", {
                key:name,
                value:value
            });        
            
            //генерируются события указанные в autoFireEvent
            if ('set' in this.autoFireEvent){
                this.fire(this.autoFireEvent.set, {
                    key:name,
                    value:value
                });                   
            }
	},


	get : function (name) {
		//alert(this.data[name]);
		var data = this.data[name];
		//console.log( 'this' , data );
		return data;
	},

        //очистка  модели от данных
        clear : function (name) {		
            this.data={};		
            this.event={};
	}
        
});

