
/**
 * @class ClassLoader
 * @classdesc
 * Загрузчик приложения. В дальнейшем будет изменен
 */
Define("core.ClassLoader",{           
    init:function(){
        
    },    
    /**
     * XmlHttpRequest
     * TODO создать отдельную библиотеку для взаимодействия с сервером
     */
    getXmlHttp:function(){
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
    },
    
    /**
     * Синхронный Загрузчик скриптов
     */       
    loadScript:function(src,callback){
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
    },
    
    //подгружаем JSON файл           
    loadJson:function(src,callback){        
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
    require:function(prop,callback){                        
        this.load(prop,callback);        
    },
    
    load:function(prop,callback){
        var me=this,
            count=0;    
    
        prop.forEach(function(fname){
            count++;            
            if  ( fname.match(/(?:^|\/|\\)([^\\\/]+)$/)[1].split('.')[1] =="json"){                                
                me.loadJson(fname,function(){
                    count--;    
                    if (count==0) callback();
                });                                          
            } else {                            
                me.loadScript(fname,function(){
                    count--;
                    if (count==0) callback();
                });                
            }                            
        })                        
    },            
    
    creatorScript: function (src, parent) {

    }
});
