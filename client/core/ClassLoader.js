// компонент в разработке
Define("app.ClassLoader",{       
    init:function(){
        
    },
    loadScript:function(src,callback){
        var script = document.createElement("script");				
	script.src = src+"?ns="+( Math.random()*1000 );
	document.getElementsByTagName("head")[0].appendChild(script);
        
	//обработчик загрузки
	script.onload = function () {
            callback();
	};        
    },
    //подгружает скрипты   
    require:function(prop,callback){
        var me=this,
            count=0;    
    
        prop.forEach(function(el){
            count++;
            me.loadScript(el,function(){
                count--;
                if (count==0) callback();
            });
        })
    },
            
    creatorScript: function (src, parent) {

    }
});
