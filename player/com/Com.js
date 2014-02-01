// Базовые настройки
(function(){    
    var Com=function(){},
        p=Com.prototype=new createjs.EventDispatcher();            
    
    //p.editor="player.com.base.Editor";
    p.init=function(target){
        
    }       
    
    p.destroy=function(){
        
    }   
    
    //Поджигаем событие
    p.fire=function(name,options){
        this.dipatchEvent(name);
    }
        
    //геттер
    p.get=function(name){
        return this[name];
    }
    
    //сеттер
    p.set=function(name,val){
        this[name]=val;  
        this.fire('change');
    }
    
    //NS ('');
    player.NS('player.com.Com',Com);    
})()

