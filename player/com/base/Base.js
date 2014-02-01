// Базовые настройки
(function(){    
    var Base=function(displayObject){ this.init(displayObject) };    
        superClass=new player.com.Com(),
        p=Base.prototype=superClass;        
    
    p.editor="player.com.base.Editor";
    
    /**
     * конструктор, срабатывает при создании компонента
     * @param {type} displayObject
     * @returns {undefined}
     */
    p.init=function(displayObject){
        this.displayObject=displayObject;                
    }   
    
    
    /**
     * деструктор, срабатывает при удалении компонента
     * @returns {undefined}
     */
    p.destroy=function(){
        this.displayObject=null;
        
        //вызовем деструктор из родительского класса
        superClass.destroy.apply(this);        
    }
    
    //NS ('');
    player.NS('player.com.base.Component',Base);    
})()

