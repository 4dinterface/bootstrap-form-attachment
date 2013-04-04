/**
 * Конструктор классов
 * @param {string} name имя класса
 * @param {Object} prop описывающий класс объект
 * @returns {*}
 * @constructor
 */
Define = function (name, prop) {
    var src = prop.extend || {},
        child = function () {
            if (this.init) return this.init.apply(this, arguments)||this;
        },
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    //child prototype - скопируем туда родителя
    child.prototype = Object.create(src.prototype||src);

    //ссылки на класс
    child.prototype["proto"] = child.prototype;


    //скопируем свойства текущего класса
    for (var x in prop) {                    
        if (typeof prop[x] == "function")
            if ( fnTest.test(prop[x]) ) prop[x] = wrapper(x, prop[x], src.prototype);
        
        child.prototype[x] = prop[x];                
    }

    //console.log(child.prototype);

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
            if (num == arr.length - 1) result[val] = obj;
            else result[val] = result[val] || {};
            result = result[val];
        });

        return result;
    }
}
