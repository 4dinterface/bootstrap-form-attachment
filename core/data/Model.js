/** 
 * @name core.data.Model
 * @class
 * @extends {core.Component}
 */
Define('core.data.Model', /** @lends {core.data.Model.prototype} */ {
    extend : "core.Component",
    data : null,
    isModel:true,
    isCollection:false,

    /***
     * Конструктор экземпляров
     * @constructs
     * @param {Object} prop объект с описанием экземпляра
    */
    init : function (prop) {
        this._super();
        var i,me=this;

        this.data = {};

        this.listenerWrappers = {};

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
        //TODO пустить через app.events
        this.fire(this._className.toLowerCase()+"change", par );        
    },

    /**
     * Для ассоциативной связи между функцией-подписчиком и её враппером.
     * ключ - ID, значение - оригинальная функция-подписчик
     * @enum {Function}
     */
    listenerWrappers: null,

    /**
     * On подписка на события
     * @param {string} eventname имя события
     * @param {string=} fieldname имя отслеживаемого параметра (можно опускать)
     * @param {Function} callback (callback);
     * @override
     */
    on:function(eventname, fieldname, callback){
        //console.log('proto',this._parentClass);
        var listenerWrapperId;

        // проверим является ли второй параметр строкой, если да то там указано поле
        if (typeof fieldname=='string' ){
            listenerWrapperId = this._parentClass.on.call(this, eventname,function(e){
                if (e.field==fieldname) callback.apply(this,arguments);             
            });
            this.listenerWrappers[ listenerWrapperId ] = callback;
        }  
        else { //если во втором параметре функция то это обычный вызов
            this._super();
        }        
    },

    /**
     * @override
     * @param {string} eventName
     * @param {!Function} callback
     */
    off: function (eventName, callback) {
        var listenerId;
        for (var wrapperId in this.listenerWrappers) {
            if (this.listenerWrappers[wrapperId] === callback) {
                listenerId = wrapperId;
                break;
            }
        }
        this._parentClass.off.call(this, eventName, listenerId);
        delete this.listenerWrappers[wrapperId];
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
        if (typeof value=="object"){                        
            if (value.isCollection || value.isModel) {
                //сделаем родителем коллекции эту модель
                value.parent = me;
            }
        }    
        
        //событие генерируется при любом изменении, имя события состоит из именикласса (маленькими буквами)+change                
        this.fireChange({
            operation:"set",
            field:name,     
            value:value
        });

        // генерируются события указанные в autoFireEvent            
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
    },

    /**
     * Деструктор для модели
     * @override
     */
    destroy: function () {

        // Очистка врапперов обработчиков событий
        for (var wrapperId in this.listenerWrappers) {
            delete this.listenerWrappers[wrapperId];
        }

        // Вызов декструкторов для данных внутри модели
        for (var value in this.data) {
            if (value.isCollection || value.isModel) {
                value.destroy();
            }
        }

        // Передадим управление перекрытому родительскому методу
        this._super();

    }
});

