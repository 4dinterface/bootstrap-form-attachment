/**
 * Виджет, 
 * 
 * @Example
 * Define("core.ui.form.NumberField", {
 *    extend:"core.widget.Widget",
 *    widget:"NumberField",       
 *    listeners:{    
 *        "view updatedata":function(){            
 *            this.set('value', this.getScope() [ this.bindPropName ] );
 *        }, 
 *    },
 *    render:function(){          
 *         $(this.domTarget).val( this.value );        
 *    }                
 * });        
 *
 *  Основные инструменты
 *  this.value  значение виджета 
 *  this.set('value',знач) //устанавливает this.value и вызывает метод render
 *  this.domTarget //указывает на дум к которому прикреплен виджет
 *  this.digest()  // если кто то ввел новое значение в виджет, 
 *                 // то для того чтобы это значение повлияло на таймлайн нужно вызвать digest
 *  this.getScope() возвращает обьект который виджеты изменяют
 *  this.bindPropName //указывает на то какое именно свойство нужно изменять в обьекте который вернул this.getScope()               
 *  
 * @class
 * @name app.Component
 */
Define("core.widget.Widget", /** @lends {app.Component.prototype} */({
    extend:"core.Component",
    
    domTarget:"",
    widget:"",

    //препроцессор
    //в момент обьявления класса, зарегестрирует виджет в менеджере виджетов
    preprocessor:function(cls){
        if(this.widget!="") core.widget.widgetManager.registerWidget(this.widget,cls);
    },

    /**
     * @constructor
     */
    init: function () {	           
        this.view=this.domTarget.parents('.scope'); // TODO попробывать перенести в родительский класс
        this.bindPropName= this.domTarget.attr('data-dsource');                
        
        this._super();     
               
        this.domTarget=$(this.domTarget);                
        
        // пометим виджет классом, чтобы отличать активированные виджеты от неактивированных
        $(this.domTarget).addClass('live_widget');
                                             
        //если нет id то он будет сгенерирован автматически
        if ($(this.domTarget).attr("id")=="" ) $(this.domTarget).attr("id", core.utilites.genId() );
    },
            
   //TODO вероятно методнеиспользуется
    useEvent:function(){
        var me=this;
        this.apply();        
        for (event in this.domListeners) {
          var par=event.split(' ');          
          $(this.el).find( par[0]).on(par[1], this.domListeners[event].bind(me ) );
	};
                
        this._super();        
    },
            
    //обьявим метод ответственный за обновлеие виджета
    refresh:function(){},//?
    
    //Возвращает scope
    getScope:function(){
        return this.view[0].scope;        
    },
    
    //устанавливает значение
    set:function(name,deg){        
        this[name]=deg;            
        this.render();                                                 
    },
    
    //Обстрактный метод перерисовки виджет, наследуется всеми классами
    render:function(){
                
    },
    
    // метод публикует установленные значения    
    digest:function(){
       this.domTarget.trigger('change',{
            srcElement: this.domTarget,
            widget:this,
            value:this.value
        });                  
    },
	
    //события
    listeners: null
}));
