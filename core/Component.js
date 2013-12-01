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
    behaviours:null,

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

        //инициализация поведений
        if (this.behaviours) {
           for(i in this.behaviours) {                           
               //alert(i);
               this.behaviours[i]=new ( core.NS( this.behaviours[i] ) )({
                    parent:this
               })

           }            
        }     
        

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
        var dst = arguments.length === 1 ? this : arguments[ 0 ];

        for(var index in arguments) {
            var obj = arguments[index];
            if (dst !== obj) {
                for(var key in obj) {
                    dst[key] = obj[key];
                }
            }
        }

        return dst;
    },

    /**
     *  включим поведение
     */
    useBehaviour:function(name){
        this.behaviours[name].status=true;
    },

    /**
     *  включим одно поведение, и выключим остальные
     */
    useOneBehaviour:function(name){
        this.unUseBehavioursAll();
        this.behaviours[name].status=true;        
        console.log( name,this.behaviours[name] );
    },


    /**
     *  выключим поведение
     */
    unUseBehaviour:function(name){
        this.behaviours[i].status=false;
    },

    /**
     *  выключим все поведения
     */
    unUseBehavioursAll:function(){
        for (var i in this.behaviours){
            this.behaviours[i].status=false;
        }
    }



}));

//счётчик временно здесь, потом определим его куданибудь в утилиты
var componentCount=0;
