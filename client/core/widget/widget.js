/**
 * Виджет, 
 * бля я хз что писать, 
 * должен быть базовый класс удобный для построения элементов управления :)
 * повсей видимости должен работать впаре с widget менеджером
 *  
 * @class
 * @name app.Component
 */
Define("app.Widget", /** @lends {app.Component.prototype} */({
    extend:"app.Component",
    /**
     * @constructor
     */
    init: function () {	      
        
    },
            
    useEvent:function(){
        var me=this;
        this.apply();        
        for (event in this.domListeners) {
          var par=event.split(' ');          
          $(this.el).find( par[0]).on(par[1], this.domListeners[event].bind(me ) );
	};
                
        this._super();        
    },        
	
    //события
    listeners: null
}));
