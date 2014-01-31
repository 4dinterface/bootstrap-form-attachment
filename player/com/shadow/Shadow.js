player=player||{};
player.com=player.com||{};

// BLUR (ЭКСПЕРЕМЕНТ)
// shadow сначало X, затем Y, затем Размытие
(function(){
    player.com.Shadow=function(target){ this.init(target) };    
    var p=player.com.Shadow.prototype;    

    p.init=function(target){
        target.shadow = new createjs.Shadow("#000000", target.shadowX, 15, 10);    
        target.needUpdate=true;
    }                
})()
