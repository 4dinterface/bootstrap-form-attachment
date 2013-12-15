/**
 * @class core.Behaviour
 * @classdesc
 * Поведения для компонентов. Это слушатели событий, 
 * которые можно включать и выключать на лету помере необходимости.
 * 
 * @param {object} param обьект со свойствами которые передаются конструктору 2
 */
Define("core.Behaviour",  /** @lends core.Behaviour.prototype */{
    /**
     * Регистр событий и их обработчиков
     * type {Object}
     * private
     */
    event: null,
    
    //обьект с продекларированными подписями на события
    listeners:null,
    
    //флаг активности true включен, false - выключен
    status:false,
   
    /* 
     * @constructs 
     */
    init: function (param) {	           
        
        var res;        
        
        // ссылка на контролёр владелец
        this.parent=param.parent;                    
        
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
                //TODO - такое событие небудет отключаться                
                this.parent[ res[0] ].on( res[1], this.listeners[ event ].bind(this) );
            }
	}           
    },
	    

    /**     
     * Отправит событие на обработку с указанным объектом события 
     * само "поведение" неимеет собственных событий, поэтому поджигает события компонента
     * 
     * @param {string} name имя события на отправку
     * @param {Object} options представляющий событие объект
     * @param {Object} context контекст исполнения
     */
    fire: function (name, options, context) {
       this.parent.fire.apply(this.parent,options);
    },

    /**     
     * Установит обработчик на событие
     * Обработчики вешаются на компонент которому принадлежит поведение
     * На данный момент обработчики срабатывают в контексте поведения 
     * TODO убедится что контекст поведения оптимален
     * 
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик     
     */
    on: function (name,fun,ctx) {
        var me=this;        
        this.parent.on(name, function(){
            //обработчик сработает только если поведение активно
            if (me.status) fun.apply(me,arguments,ctx);
        } );
    },
    
    /**     
     * Удалит обработчик с события
     * @param {string} name имя события
     */
    off: function (name) {
        this.parent.off(name)
    },
    
    /**     
     * вставляет свойста в обьект
     * @param {object} prop свойства
     */    
    apply:function(prop){        
      for(var x in prop){	        		
	      this[x] = prop[x];
	  }	
    }       
});