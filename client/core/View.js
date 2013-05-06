/**
 * Базовый класс компонента
 * @class
 * @name app.Component
 */
'use strict';

Define( "app.View", /** @lends {app.Component.prototype} */({

    extend: "app.Component",

    //флаг обсервера виджетов, который мониторит изменения в dom в поисках виджета
    widgetObserver:false,
    domTarget:"body",

    updateWidgetTimer:null,
    /**
     * @constructor
     */
    init: function() {        
        this._super();        
        //обсервер включится только в том случае если включен флаг
        //setTimeout(function(){
            if (this.widgetObserver) this.createWidgetObserver();                        
        //},1)
        
    },
            
    //========================================================================//
    //                       Обновление виджетов                              //   
    //========================================================================//
            
    createWidgetObserver:function(){
        var me=this;
        //попробуем использовать MutationObserver
        if ('MutationObserver' in window){                
            this.viewObserver = new MutationObserver(function(){ 
                clearTimeout(me.updateWidgetTimer);
                me.updateWidgetTimer=setTimeout(me._autoUpdateWidget, 1);
            });                     
                
            this.viewObserver.observe(this.domTarget, {childList: true});                
        } 
        
        //в противном случае пытаемся реализовать через mutationEvents
        else {                
            this.domTarget.addEventListener('DOMSubtreeModified',function(){
                //ниже приведённый код, гарантирует что _autoUpdateWidget сработает только однажды
                clearTimeout(me.updateWidgetTimer);
                me.updateWidgetTimer=setTimeout(me._autoUpdateWidget, 1);                    
            });
        }
        
    },


    //ручное обновление виджетов            
    updateWidget:function(){        
        //if(this.widgetObserver){}
        clearTimeout(this.updateWidgetTimer);
        this.updateWidgetTimer=setTimeout(this._autoUpdateWidget, 1);
    },        


    //автоматическое обновление виджетов, как реакция на обсервер
    _autoUpdateWidget:function(){  
        //полезная логика        
        alert('hello world');
    },      

    //события
    listeners: null
    
}));
