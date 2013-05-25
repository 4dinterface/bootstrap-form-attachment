/** 
 * Реализация паттерна "поведение"
 * @class
 * @name app.Behaviour
 * @autor Diablo
 * 
 * Компонент может иметь несколько схем поведений
 * Включённое поведение получает право обрабатывать события компонента
 * Выключенное поведения,  неполучают события.
 * Компонент может свободно включать и выключать события
 **/

Define("core.Behaviour", /** @lends {app.Component.prototype} */({
    /**
     * Регистр событий и их обработчиков
     * @type {Object}
     * @private
     */
    event: null,
    
    //обьект с продекларированными подписями на события
    listeners:null,
    
    //флаг активности true включен, false - выключен
    status:true,

    /**
     * @constructor
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
	
    //события
    listeners: null,

    /**
     * Отправит событие на обработку с указанным объектом события
     * @param {string} name имя события на отправку
     * @param {Object} options представляющий событие объект
     * @param {Object} context контекст исполнения
     * 
     * само "поведение" неимеет собственных событий, поэтому поджигает события компонента
     */
    fire: function (name, options, context) {
       this.parent.fire.apply(this.parent,options);
    },

    /**
     * Установит обработчик на событие
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик
     * 
     * Обработчики вешаются на компонент которому принадлежит поведение
     * На данный момент обработчики срабатывают в контексте поведения 
     * TODO убедится что контекст поведения оптимален
     */
    on: function (name,fun,ctx) {
        var me=this;        
        this.parent.on(name, function(){
            //обработчик сработает только если поведение активно
            if (me.status) me[name].apply(me,arguments,ctx);
        } );
    },
    
    //отписываемся от события на компоненте
    off: function (name) {
        this.parent.off(name)
    },

    
    //вставляет свойста в обьект
    apply:function(prop){        
       	for(var x in prop){	        		
		this[x] = prop[x];
	}	
    }    
    
}));