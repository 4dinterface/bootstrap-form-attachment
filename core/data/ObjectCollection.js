/**
 * Компонент в разработке
 * @name app.ObjectCollection
 * @author Евгений
 * @class
 * @extends {core.Component}
 */
Define('core.data.ObjectCollection', /** @lends core.data.ObjectCollection.prototype */({
    //наследование
    extend: "core.Component",

    cache: null,
    data: null,
    isModel: false,
    isCollection: true,

    /**
     * протестируем браузер и узнаем будет ли он упорядочевать ключи из обьекта
     * @type {bool}
     */
    tstSort: (function () {
        var tst = { 10: 10, 5: 5, 1: 1 };
        return Object.keys(tst)[0] == 1 && Object.keys(tst)[1] == 5 && Object.keys(tst)[2] == 10;
    })(),

    /**
     * @constructor
     * @param {Object} prop
     */
    init: function (prop) {
        this._super();

        this.cache = [];
        this.data = {};
        
        //установим в цикле все свойства
        for (var i in prop) {
            this[i] = prop[i];//код дублирует ссылки на ключи в само обьекте (стоит вопрос о полезности)
            this.data[i] = prop[i]; //здесь хранятся собственно самы данные
        }

        //TODO не вижу здесь контроля со стороны tstSort (это может быть важно для Safary и Firefox)
        this.cache = Object.keys(this.data); //копия ключей в массиве
        this.length = this.cache.length;     //длинна кеша
    },

    /**
     * Перегрузим стандартный fire класса Components,
     * тоесть он будет срабатывать не только для класса но и в том классе куда он агрегирован при помощи set
     * @method fire
     * @param {name} name
     * @param {value} options
     * @param {value} context
     * @override
     * @return {undefined}
     **/
    fire: function (name, options, context) {
        this._super();

        //передадим обработчик выше (всплытие событий)
        if (this.parent)
            if (this.parent.fire) this.parent.fire.apply(this.parent, arguments);

        return this;
    },

    fireChange: function (par) {
        //TODO пустить через app.events
        this.fire(this._className.toLowerCase() + "change", par);
    },


    /**
     * On подписка на события
     * @param {string} eventName имя события
     * @param {string} fieldname имя отслеживаемого параметра (можно опускать). Фильтруется по свойству `field`
     * @param {Function} callback callback
     */
    on: function (eventname, fieldname, callback) {
        // проверим является ли второй параметр строкой, если да то там указано поле
        if (typeof fieldname == 'string') {
            this._parentClass.on.call(this, eventname, function (e) {
                if (e.field == fieldname) callback.apply(this, arguments);
            })
        }
        else { //если во втором параметре функция то это обычный вызов
            this._super();
        }
    },


    /**
     * Геттер свойств
     * @param {string} name
     * @returns {*}
     */
    get: function (name) {
        return this.data[name];
    },

    /**
     * Сеттер свойств
     * @param {string} name
     * @param {*} value
     */
    set: function (name, value) {
        var me = this;
        this.data[name] = value; // сохраняем данные
        this[name] = value;//удалить (данные копируются в this)

        //обновляем кэш и длинну
        this.cache = Object.keys(this.data);
        this.length = this.cache.length;

        //если value это модель или коллекция то установим parent 
        if (value.isCollection || value.isModel) {
            //сделаем родителем коллекции эту модель
            value.parent = me;
        }
        
        //подожгем событие
        this.fireChange({
            operation: "set",
            field: name,
            value: value
        });
    },

    //возвращает значение по индексу
    // TODO проверить код
    item: function (index) {
        return this.data[ this.cache[index] ];
    },

    // Удаляет записи
    remove: function () {
        //TODO сделать удаление записей
    },

    /**
     * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can be
     * @method forEach
     * @param {callback} ASD
     * value, including HEX colors, rgb and rgba. The default value is a transparent background.
     * @param {String} mimeType The MIME type of the image format to be create. The default is "image/png". If an unknown MIME type
     * is passed in, or if the browser does not support the specified MIME type, the default value will be used.
     * @return {String} a Base64 encoded image.
     **/
    forEach: function (callback, context) {
        var prop;
        for (prop in this.data) {
            // если вдруг мы нашли свойство из прототипа тогда пропускаем 
            // TODO вероятно такая ситуация невозможна, в this.data такой обьект попасть неможет
            // так что проверка вероятно лишняя (заметка от diablo)
            if (this[prop] === this.proto[prop]) continue; 
            
            if (isFinite(parseInt(prop, 10))) callback.call(context || window, this.data[prop], prop, this);
        }
        return this;
    },

    /**
     * Деструктор для ObjectCollection
     * @override
     */
    destroy: function () {

        // Вызов декструкторов для данных внутри модели
        for (var value in this.data) {
            if (value.isCollection || value.isModel) {
                value.destroy();
            }
        }

        // Передадим управление перекрытому родительскому методу
        this._super();

    }

}));
