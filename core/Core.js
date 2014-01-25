
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
        
        //Если функция define обьявлена то можно грузить асинхронно
        //script.async=(core.Define)?true:false;        
        script.async=false;        

	document.getElementsByTagName("head")[0].appendChild(script);        
        
	//обработчик загрузки
	script.onload = callback;   
	
    };
    
    //core/ui/style.css
    p.loadStyle=function(src,callback){
        var style = document.createElement("link");

        //TODO: Временно закомментировал, т.к. слетают точки останова
	//script.src = src+"?ns="+( Math.random()*1000 );
        style.href = src;
        style.rel = "stylesheet";
        
	document.getElementsByTagName("head")[0].appendChild(style);                
        //ждать загрузки стиля нет надобности (по крайней мере пока) :)
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
            //проверяем чтобы все классы были загружены
            p.waitReady(function(){                    
                if(p.waitList.length==1) {
                    p.waitList.splice(0,1);                        
                    $(callback);
                }
            })
                //callback();   
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
                    if (count==0) {
                        callback();               
                        
                        //сообщим ожидающим функция о том что еще один скрипт загружен
                        p.fireReady();            
                    }
                });                
            } else if(ext=="css"){
                me.loadStyle(fname,function(){});                
                count--;                
                if (count==0) callback();
            }                           
            
        })                                
    }            
    
    //список классов ожидающих загрузки
    p.waitList=[];
    
    //регистрируем функцию ожидающую загрузки
    p.waitReady=function(wait){
        this.waitList.push(wait);
    }
    
    //Проверяем какаие классы готовы к инициализации
    p.fireReady=function(){
        var i=this.waitList.length;
        while(i--){
            //если ready функция класса вернет true тогда удалимм ее из списка и перезапустим цикл
            if ( this.waitList[i]()==true ){
                this.waitList.splice(i,1)
                i=this.waitList.length;
            }
        }
    }
    
    core.require=p.require;
    
    //creatorScript: function (src, parent) {}
}(core.ClassLoader);    
//});

//устанавливает значение по неймспейсу
core.NS=function(name, obj) {
    var result = window;
    name.split(".").forEach(function (val, num, arr) {        

        if (num == arr.length - 1) result[val] = obj||result[val];
        else result[val] = result[val] || {};

        result = result[val];
    });

    return result;
}   