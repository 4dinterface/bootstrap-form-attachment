// Базовые настройки
Define('player.com.base.Editor',{
    extend:"player.com.Editor",
    
    //сгенерированный дум
    domTarget:null,
    
    init:function(displayObject,component){
        this._super();                      
        
        this.alpha=core.widget.widgetManager.createWidget('Range',{            
            scope:component,            
            'data-dsource':'x'
        })        
        this.panel.add(this.alpha)
    },   
    
    destroy:function(){
        
    }            
});