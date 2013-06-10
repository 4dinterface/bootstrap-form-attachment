/**
 * Главный неймспейс для фреймворка
 * @namespace
 */
window.core=window.core

/**
 * Конструктор классов
 * @param {string} name имя класса
 * @param {Object} prop описывающий класс объект
 * @returns {*}
 * @constructor
 */
core.Define = Define = function (name, prop) {
    
    //если extend( родительский класс ) передали строкой
    prop.extend =typeof prop.extend == "string" ? NS(prop.extend): prop.extend;

    //проверим передали ли ли нам extend вообще
    var src = prop.extend || {},
        //конструктор    
        child = function () {
            if (this.init) return this.init.apply(this, arguments)||this;
        },
                
        //тест на наличие функции супер в коде        
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
            
    //child prototype - скопируем туда родителя
    child.prototype = Object.create( src.prototype || src );

    //ссылки на класс
    child.prototype["proto"] = child.prototype;

    //prop
    //NS child.prototype[x]
    
    //примеси
    // TODO - протестировать    
    // TODO - добавить исключение при отсутствии property
    if ('mixins' in prop){        
        var l=prop.mixins.length,i=0;        
        for (;i<l;i++){            
            //копируем свойства
            for (var x in prop.mixins[i].prototype) { 
                child.prototype[x] = prop.mixins[i].prototype[x];
            }
            
            console.log('mixins prototype=', child.prototype);
        }
    }
    
    
    //скопируем свойства текущего класса
    for (var x in prop) {                    
        if (typeof prop[x] == "function")
            if ( fnTest.test(prop[x]) ) prop[x] = wrapper(x, prop[x], src.prototype);
        
        child.prototype[x] = prop[x];                
    }

    
    
    
    //вызовем препроцессор, если есть
    if ('preprocessor' in child.prototype) child.prototype.preprocessor(child);
    
    // специальный режим при котором несоздаётся класса, вместо этого сразу создаётся экземпляр
    if (prop.mode=='one') child=new child();    
    
    //вернём результат
    return NS(name, child);
    


    //враппер для функций
    function wrapper(name, fun, src) {
        return function () {
            var arg = arguments;
            this._super = function () {
                if (src[name]) src[name].apply(this, arg);
            };
            return fun.apply(this,arguments);	
	}
    }

    //устанавливает значение по неймспейсу
    function NS(name, obj) {
        var result = window;
        name.split(".").forEach(function (val, num, arr) {
            if (num == arr.length - 1) result[val] = obj||result[val];
            else result[val] = result[val] || {};
            result = result[val];
        });

        return result;
    }   
    
}