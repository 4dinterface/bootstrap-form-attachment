'use strict';
/**
 * @class core.widget.Widget
 * @augments core.Component
 * @classdesc 
 * Пример обьявления виджета
 * <pre>
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
 * </pre>
 * 
 *  Основные инструменты <br/>
 *  this.value  значение виджета <br/>
 *  this.set('value',знач) //устанавливает this.value и вызывает метод render <br/>
 *  this.domTarget //указывает на дум к которому прикреплен виджет <br/>
 *  this.digest()  // если кто то ввел новое значение в виджет,  <br/>
 *                 // то для того чтобы это значение повлияло на таймлайн нужно вызвать digest
 *  this.getScope() возвращает обьект который виджеты изменяют <br/>
 *  this.bindPropName //указывает на то какое именно свойство нужно изменять в обьекте который вернул this.getScope()                <br/>
 */
Define("core.widget.Widget", /** @lends core.widget.Widget.prototype */{
    extend:"core.Component",
    
    isWidget:true,
    
    domTarget:"",
    widget:"",
    
    /**
     * Препроцесс срабатывает на стадии наследования, до создания экземпляров класса.
     * Данный препроцессор в момент обьявления класса, зарегестрирует виджет в менеджере виджетов
     * @property cls
     */
    preprocessor:function(cls){
        if(this.widget!="") core.widget.widgetManager.registerWidget(this.widget,cls);
    },
    
    /* @constructs */
    init: function (property) {	                           
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
    
    /**
     * Метод ответственный за добавление в виджет содержимое
     */
    add:function(){
        
    },
    
    //Возвращает scope
    getScope:function(){
        this.view=this.domTarget.parents('.scope'); 
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
});
