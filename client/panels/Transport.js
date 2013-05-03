Define("app.panels.Transport", {
    extend: app.Controller,
    
    el:".player",
    
    player:null,
    f:null,
        
    init: function (cfg) {        
        this.apply(cfg);
        this._super();                                
    },

    //события dom        
    domListeners:{
        //плеер
        ".player-play click":function(){
           var me=this;
           me.movie.play();                 
           setTimeout(function () {
                me.movie.gotoAndStop(1);
            }, 60000);
        },  

        //пауза      
        ".player-pause click":function(e){
            this.movie.stop();          
            console.log(e);
        },

        //перемотка в начало
        ".player-back click":function(){
            this.movie.gotoAndStop(1);
        },
                
        //перемотка назад
        ".player-frame-back mousedown":function(){ 
            var me=this;
            this.f=function(){ me.movie.prevFrame(); me.timer=setTimeout(me.f,13); }
            this.f();
        },
             
        ".player-frame-back mouseup":function(){                 
             clearTimeout(this.timer);                 
        },

         //перемотка вперёд        
        ".player-frame-forward mousedown":function(){
            var me=this;
            me.f=function(){ me.movie.nextFrame(); me.timer=setTimeout(me.f,13) ; }
            me.f();
         },
             
         ".player-frame-forward mouseup":function(){                 
            clearTimeout(this.timer);                 
         }
    }
        
});
