/**
 *  Система класов
 *  
 *  Обьявление происходит в несколько этапов
 *  Сначало DEFINE подписывается на слежение за событиями       
 */

+function(core){            
    var 
        //тест на наличие функции супер в коде        
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,

        //тест на наличие обьекта по неймспейсу
        readyRequiresTest=function(name){
            return core.NS(name)!==undefined; 
        };        
    
    /**
     * Конструктор классов
     * @param {string} name имя класса
     * @param {Object} prop описывающий класс объект
     * @constructor
     */    
    core.Define = Define = function (name, prop) {  
        //класс в неймспейс попадет только тогда когда будут подгружены все зависимости    
        var ret=getRequires(prop);                                
        core.ClassLoader.waitReady(function(){            
            if ( ret.every(readyRequiresTest) ) {
                core.NS(name, Class(name,prop) );            
                return true;                
            }                        
        })        
        //core.NS(name, Class(name,prop) );                   
    }
        
    
    /**
     * Функция CLASS 
     * Конструктор классов, затем видимо будет разбит на более мелки методы
     */
    function Class(name, prop){
        
        var classNsArr=name.split('.'),
        className=classNsArr[classNsArr.length-1]; //отделяет имя класса от неймспейса     
    
        //если extend( родительский класс ) передали строкой
        prop.extend =typeof prop.extend == "string" ? core.NS(prop.extend): prop.extend;
        
        if(prop.extend) console.log('prop.extend',prop.extend.prototype);

        //проверим передали ли ли нам extend вообще
        var src = prop.extend || {},
            //конструктор    
            child = function () {
                if (this.init) return this.init.apply(this, arguments)||this;
            };
            

        //child prototype - скопируем туда родителя
        child.prototype = Object.create( src.prototype || src );

        //ссылки на класс
        child.prototype["proto"] = child.prototype;
        child.prototype["_parentClass"] = src.prototype || src;

        //неймспес класса
        child.prototype._classNS=name;
        child.prototype._className=className;    

        //prop
        //NS child.prototype[x]

        //примеси
        // TODO - протестировать    
        // TODO - добавить исключение при отсутствии property
        if ('mixins' in prop){            
            var l=prop.mixins.length,i=0;        
            for (;i<l;i++){   
                
                var mixsrc=typeof prop.mixins[i] == "string" ? core.NS(prop.mixins[i]): prop.mixins[i];
        
                //копируем свойства
                for (var x in mixsrc.prototype) { 
                    child.prototype[x] = mixsrc.prototype[x];
                }
                //console.log('mixins prototype=', child.prototype);
            }
        }


        //скопируем свойства текущего класса
        for (var x in prop) {                    
            if (typeof prop[x] == "function")
                if ( fnTest.test(prop[x]) ) prop[x] = wrapper(x, prop[x], src.prototype);

            child.prototype[x] = prop[x];                
        }

        // ============ поддержка интерфейсов (DRIFT)=============//
        var error="";

        /*if(prop.interface){
            for (var x in prop.interface) {           
                if ( typeof prop[x] != typeof prop.interface[x] ) error+="  "+x+ ": " + typeof prop.interface[x] +"\n"; 
            }
            if (error !=""){
                error="CORE framework: unreleased interface property in class "+name+"\n"+error;        
                throw "\n"+error;
            }
        }*/

        //вызовем препроцессор, если есть
        if ('preprocessor' in child.prototype) child.prototype.preprocessor(child);

        // специальный режим при котором несоздаётся класс, вместо этого сразу создаётся экземпляр
        if (prop.mode=='one') child=new child();            
                
        return child;
    };    


    /**
     * враппер для функций
     * @param {type} name
     * @param {type} fun
     * @param {type} src
     * @returns {unresolved}
     */
    function wrapper(name, fun, src) {
        return function () {
            var arg = arguments;            
            this._super = function () {
                if (src[name]) src[name].apply(this, arg);
            };
            
            return fun.apply(this,arguments);	
	}
    }    
    
    /**
     * Вернет массив со всеми зависимостями
     * @param {type} prop
     * @returns {Array}
     */
    function getRequires(prop){        
        var ret= (prop.extend)?[prop.extend]:[];
        return ret.concat(prop.mixins||[],prop.require||[])        
    }
    
}(window.core||{})