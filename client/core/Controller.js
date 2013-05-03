/**
 * Базовый класс компонента
 * @class
 * @name app.Component
 */
Define("app.Controller", /** @lends {app.Component.prototype} */({
    extend:"app.Component",
    /**
     * @constructor
     */
    el:"document",
    init: function () {	
        var me=this;
        this.apply();        
        for (event in this.domListeners) {
          var par=event.split(' ');          
          $(this.el).find( par[0]).on(par[1], this.domListeners[event].bind(me ) );
	};
                
        this._super();        
    },
	
    //события
    listeners: null,    
}));
