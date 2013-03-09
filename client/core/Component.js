Define("app.Component", /** @lends {app.component} */({

    /**
     * Регистр событий и их обработчиков
     * @type {Object}
     * @private
     */
    event: null,

    init: function () {		
        //подключаем обработчики событий
        this.event={};
        //alert(x);
	for (event in this.listeners) {
            
	}
    },
	
    //события
    listeners: {},

    /**
     * Отправит событие на обработку с указанным объектом события
     * @param {string} name имя события на отправку
     * @param {Object} options представляющий событие объект
     */
    fire: function (name, options) {                
        var item;
        
        //
        if(options){
            if(! 'eventName' in options) options.eventName=name;
            if(! 'eventTarget' in options) options.eventTarget=this; 
        }
        
	for (item in this.event[name]) {
            this.event[name][item](options);
        }        
        
        //bubble event
        
        for (item in this.event['bubble']) {
            this.event['bubble'][item](options);
        }        
    },

    /**
     * Установит обработчик на событие
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик
     */
    on: function (name,fun) {
        if (typeof this.event[name]=="undefined") {
            this.event[name]=[];
        }
        
	this.event[name].push(fun);	
    },

    off: function (name) {},
    
    //вставляет свойста в обьект
    apply:function(prop){        
       	for(var x in prop){	        		
		this[x] = prop[x];
	}	
    }

}));