// BLUR (ЭКСПЕРЕМЕНТ)
// shadow сначало X, затем Y, затем Размытие
(function(){
    
    var Shadow=function(target){ this.init(target) },
        p=Shadow.prototype;
        
    p.editor="player.com.shadow.Editor";
    
    p.init=function(target){
        target.shadow = new createjs.Shadow("#000000", target.shadowX, 15, 10);    
        target.needUpdate=true;
    }          
    
    player.NS('player.com.shadow.Component',Shadow);
})()