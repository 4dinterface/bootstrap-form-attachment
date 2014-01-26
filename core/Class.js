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
        
        //if(prop.extend) console.log('prop.extend',prop.extend.prototype);

        //проверим передали ли ли нам extend вообще
        var src = prop.extend || {},
            //конструктор    
            Child = function () {
                if (this.init) return this.init.apply(this, arguments)||this;
            };                    

        //child prototype - скопируем туда родителя
        Child.prototype = Object.create( src.prototype || src );

        //ссылки на класс
        Child.prototype["proto"] = Child.prototype;
        Child.prototype["_parentClass"] = src.prototype || src;

        //неймспес класса
        Child.prototype._classNS=name;
        Child.prototype._className=className;    

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
                    Child.prototype[x] = mixsrc.prototype[x];
                }
                //console.log('mixins prototype=', child.prototype);
            }
        }


        //скопируем свойства текущего класса
        for (var x in prop) {                    
            if (typeof prop[x] == "function")
                if ( fnTest.test(prop[x]) ) prop[x] = wrapper(x, prop[x], src.prototype);

            Child.prototype[x] = prop[x];                
        }
        
        //скопируем ссылки на обьекты из USING в прототип класса
        for (var i in prop.using){
            Child.prototype[i]= core.NS(prop.using[i]);                       
        };

        // ============ поддержка интерфейсов (DRIFT)=============//
        //var error="";
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
        if ('preprocessor' in Child.prototype) Child.prototype.preprocessor(Child);

        // специальный режим при котором несоздаётся класс, вместо этого сразу создаётся экземпляр
        if (prop.mode=='one') Child=new Child();            
                
        return Child;
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
        //TODO Внимание, поведение using при наследовании может оказаться неудовлетворительным        
        if (prop.using){
            for (var i in prop.using) ret.push( prop.using[i] );
        }            
        
        return ret.concat(prop.mixins||[],prop.require||[])        
    }
    
}(window.core||{})





//alert([].concat(df));