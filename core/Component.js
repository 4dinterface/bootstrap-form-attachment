/**
 * 
 * @class core.Component
 * 
 * @classdesc
 * <B>Компоненты, базовые строительные блоки приложения. </B> <br/>
 * 1) обеспечивают уникальный id каждому компоненту <br/>
 * 2) реализуют механизьм событий on, off, fire <br/>
 * 3) реализует механизьм управления поведениями useBehaviour, unUseBehaviour, useOneBehaviour, unUseBehavioursAll <br/><br/>
 * Пример использования Component</br>
 * <pre>
 * Define( "example",{
 *   extend: "core.Component",
 *   behaviours:{
 *     'bahav1':'app.exampleBehaviours1',
 *     'bahav2':'app.exampleBehaviours2'
 *   },
 *   
 *   init:function(){
 *      this.super();
 *      this.useBehaviour('behav1');
 *   },
 *   
 *   listeners:{
 *       "свойство событие1":function(){
 *          this.useOneBehaviour('behav1');
 *       },
 *       "свойство событие2":function(){
 *          this.useOneBehaviour('behav2');
 *       }*       
 *   }
 * });  
 * </pre>
 * 
 * @param {object} param обьект со свойствами которые передаются конструктору 2
 */
Define("core.Component", /** @lends core.Component.prototype */{    
    /**
     * Регистр событий и их обработчиков
     * @type {Object}
     * @private
     */

    event: null,
    componentCount:0,
    behaviours:null,

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
                //console.log('res[0]',"="+res[0]+"=", this );
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
    
    
    /**
     * Удалит обработчик на событии
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик
     */
    off: function (name) {},

    /*
     * Метод обеспечивающий всплытие
     * в данный момент не применяется, вероятно будет удален
     */
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
    
    /**
     * вставляет свойста в обьект
     * @param {object} prop обьект со свойствами
     */
    apply:function(prop){        
       	for(var x in prop){	        		
		   this[x] = prop[x];
	    }	
    },

    /**
     *  включает поведение. Тоесть обработчики события в поведеннии 
     *  начнут срабатывать
     *  @param {string} name имя поведения
     */
    useBehaviour:function(name){
        this.behaviours[name].status=true;
    },

    /**
     *  включим одно поведение, и выключим остальные
     *  @param {string} name имя поведения
     */
    useOneBehaviour:function(name){
        this.unUseBehavioursAll();
        this.behaviours[name].status=true;        
        //console.log( name,this.behaviours[name] );
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



});

//счётчик временно здесь, потом определим его куданибудь в утилиты
var componentCount=0;
