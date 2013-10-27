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
    isModel:true,
    isCollection:false,

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
     * @method fire
     * @param {name} name
     * @param {value} options
     * @param {value} context
     * @return {undefuned} 
     * 
     * Перегрузим стандартный fire класса Components, 
     * тоесть он будет срабатывать не только для класса но и в том классе куда он агрегирован при помощи set
     * 
     **/
    fire:function(name, options, context){
        this._super();

        //передадим обработчик выше
        if (this.parent) this.parent.fire.apply( this.parent, arguments );
        return this;
    },


    //вспомогательный метод для генерации события change
    fireChange:function (par){
        this.fire(this._className.toLowerCase()+"change", par );        
    },


        
	/**
	 * @method set
	 * @param {name} name
         * @param {value} value
         * 
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/

     //TODO автоматически определять какие экземпляры класса генерировать при присваивании обьекта определенному свойству
	set : function (name, value) {
            var me=this;
            this.data[name] = value;
            //cash = this.key();
            //this.length = cash.length;

            //если устанавливаемое значение это коллекция
            if (value.isCollection || value.isModel) {
                //сделаем родителем коллекции эту модель
                value.parent = me;
            }
            
            //событие генерируется при любом изменении, имя события состоит из именикласса (маленькими буквами)+change                
            this.fireChange({
                operation:"set",
                field:name,
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

