// BLUR (ЭКСПЕРЕМЕНТ)
// shadow сначало X, затем Y, затем Размытие
(function(){
    var Blur=function(target){ this.init(target) };    
    var p=Blur.prototype;    
    
    p.editor="player.com.blur.Editor";
    p.blurFilter=null;

    p.init=function(target){
        //this.blurX>0||this.blurY>0 возможно невсегда нужно инициализировать
        this.blurFilter = new createjs.BoxBlurFilter( 0,0,0);
        target.filters.push(this.blurFilter);                                                               
        target.needUpdate=true;
        this.bounds = this.blurFilter.getBounds();
     }        
     
     player.NS('player.com.blur.Component',Blur);    
})()