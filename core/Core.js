
/**
 * @class ClassLoader
 * @classdesc
 * Загрузчик приложения. 
 */

window.core=window.core||{};
window.core.ClassLoader=window.core.ClassLoader||{};

+function(p){    
    /**
     * XmlHttpRequest
     * TODO создать отдельную библиотеку для взаимодействия с сервером
     */
    p.getXmlHttp=function(){
        var xmlhttp;
        
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (E) {
            xmlhttp = false;
          }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
          xmlhttp = new XMLHttpRequest();
        }
        
        return xmlhttp;
    };
    
    /**
     * Синхронный Загрузчик скриптов
     */       
    p.loadScript=function(src,callback){
        var script = document.createElement("script");

        //TODO: Временно закомментировал, т.к. слетают точки останова
	//script.src = src+"?ns="+( Math.random()*1000 );
        script.src = src;
        script.async=false;        

	document.getElementsByTagName("head")[0].appendChild(script);        
        
	//обработчик загрузки
	script.onload = function () {
            callback();
	};        
    };
    
//core/ui/style.css
    p.loadStyle=function(src,callback){
        var style = document.createElement("link");

        //TODO: Временно закомментировал, т.к. слетают точки останова
	//script.src = src+"?ns="+( Math.random()*1000 );
        style.href = src;
        style.rel = "stylesheet";
        

	document.getElementsByTagName("head")[0].appendChild(style);        
        
	//обработчик загрузки
	//script.onload = function () {
            //callback();
	//};        
        callback();
    },        
    
    //подгружаем JSON файл           
    p.loadJson=function(src,callback){        
        var count=0,
            me=this;
        
        var xmlhttp = this.getXmlHttp()
        xmlhttp.open('GET', src, false);
        xmlhttp.send(null);
        
        if(xmlhttp.status == 200) {
          var result=JSON.parse( xmlhttp.responseText);          
          this.load(result,callback);          
        }        
    },
            
    //подгружает скрипты   
    p.require=function(prop,callback){                        
        p.load(prop,function(){            
            $(function(){                
                callback();   
            });            
        });                
    },
    
    p.load=function(prop,callback){
        var me=this,
            count=0;    
    
        prop.forEach(function(fname){            
            count++;            
            var ext=fname.match(/(?:^|\/|\\)([^\\\/]+)$/)[1].split('.')[1] ;
            if  ( ext=='json'){                                
                me.loadJson(fname,function(){
                    count--;    
                    if (count==0) callback();
                });                                          
            } else if (ext=='js'){                            
                me.loadScript(fname,function(){
                    count--;
                    if (count==0) callback();
                });                
            } else if(ext=="css"){
                me.loadStyle(fname,function(){});                
                count--;                
                if (count==0) callback();
            }                           
            
        })                                
    }            
    core.require=p.require;
    
    //creatorScript: function (src, parent) {}
}(core.ClassLoader);    
//});
