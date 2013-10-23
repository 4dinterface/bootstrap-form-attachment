Define("app.presentation.panels.Transport", {
    extend: core.Controller,
    
    domTarget:".player",
    
    player:null,
    f:null,
        
    init: function (cfg) {        
        this.apply(cfg);
        this._super();                                
    },

    //события dom        
    domListeners:{
        //плеер
        ".player-play % click":function(){
           var me=this;
           me.movie.play();                 
        },  

        //пауза      
        ".player-pause % click":function(e){
            this.movie.stop();          
            console.log(e);
        },

        //перемотка в начало
        ".player-back % click":function(){
            this.movie.gotoAndStop(1);
        },
                
        //перемотка назад
        ".player-frame-back % mousedown":function(){ 
            this.rewind('prevFrame')
        },
             
        ".player-frame-back % mouseup":function(){                 
             this.rewindStop();  
        },

         //перемотка вперёд        
        ".player-frame-forward % mousedown":function(){            
            this.rewind('nextFrame')
         },
             
         ".player-frame-forward % mouseup":function(){                 
            this.rewindStop();
         }
    },
            
    /**
     * запускает перемотку
     */
    rewind:function(fun){
        var me=this;
        me.movie[fun]();
        
        this.f=function(){ 
            me.movie[fun](); 
            me.timer=setTimeout(me.f,13); 
        }
        //запуск проигрывания происходит только через 100 лилисекунд
        //если пользователь успеет отпустить мышку то смещение будет всеголишь на один кадр
        //предположительно пользователь одиночными кликами сможет перемещать более точно бегунок
        me.timer=setTimeout(me.f,100); 
    },

    rewindStop:function(fun){
        clearTimeout(this.timer);    
    }            
        
});
