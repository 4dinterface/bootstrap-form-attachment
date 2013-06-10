/**
 * Базовый класс компонента
 * @class
 * @name app.Component
 */
Define("core.Component", /** @lends {app.Component.prototype} */({
    /**
     * Регистр событий и их обработчиков
     * @type {Object}
     * @private
     */
    event: null,
    componentCount:0,

    /**
     * @constructor
     */
    init: function () {	
        var res;
        
        //увеличим счётчик компонентов и используем его как уникальный идентификатор
        componentCount++;
        this.id=componentCount;
                
        //подключаем обработчики событий
        this.event={};
                
	for (event in this.listeners) {
            res=event.split(' ');
            // подпишемся на событие компонента
            if(res.length==1){                
                this.on( res[0], this.listeners[ event ].bind(this) );
            } 
            // подпишемся на события одного из свойств компонента
            else {
                console.log('res[0]',"="+res[0]+"=", this );
                this[ res[0] ].on( res[1], this.listeners[ event ].bind(this) );
            }
	}
        //console.log('ths',this);
    },
	
    //события
    listeners: null,

    /**
     * Отправит событие на обработку с указанным объектом события
     * @param {string} name имя события на отправку
     * @param {Object} [options] представляющий событие объект
     * @param {Object} [context] контекст исполнения
     */
    fire: function (name, options, context) {
       
        var item;

        context = context || this;

        // добавляем свойства
        if(options){               
            if( !('eventName' in options)  )  options.eventName=name;
            if( !('eventTarget' in options) ) options.eventTarget=this; 
        }

        //сработают все обработчики
        //TODO если нет не одного обработчика будет ошибка, исправить !
        if (name in this.event){
            for (item in this.event[name]) {
                this.event[name][item].call(context,options);                
            }        
        }
        
        //bubble event
        for (item in this.event['bubble']) {
           this.event['bubble'][item].call(context,options);           
        }     
                
    },

    /**
     * Установит обработчик на событие
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик
     */
    on: function (name,fun) {
        if ( !(name in this.event))  {
            this.event[name]=[];
        }
        
	this.event[name].push(fun);	
    },
    
    off: function (name) {},

    //метод обеспечивающий всплытие
    liftEvent:function(src,opt){
        //console.log('buble');
        
        var me=this;
        if(!src.on) return;                        
        
        switch(typeof opt){
            //если второй параметр undefined
            case "undefined":                
               src.on('bubble',function(e){
                   me.fire(e.eventName,e);
               })
            break; 

           //если второй параметр функция
            case "function":                                      
               src.on('bubble',opt)
            break;        
        
            case "object":                
               /*src.on('bubble',function(e){
                   me.fire(e.eventName,e);
               })*/
            break;        
        }
    },
    
    //вставляет свойста в обьект
    apply:function(prop){        
       	for(var x in prop){	        		
		this[x] = prop[x];
	}	
    }

}));

//счётчик временно здесь, потом определим его куданибудь в утилиты
var componentCount=0;