/**
 * @class core.Component
 *
 * @classdesc
 * <B>Компоненты, базовые строительные блоки приложения. </B> <br/>
 * 1) обеспечивают уникальный id каждому компоненту <br/>
 * 2) реализуют механизьм событий on, off, fire <br/>
 * 3) реализует механизьм управления поведениями useBehaviour, unUseBehaviour, useOneBehaviour, unUseBehavioursAll <br/><br/>
 * Пример использования Component</br>
 * <pre>
 Define( "example",{
     extend: "core.Component",
     behaviours:{
       'behav1':'app.exampleBehaviours1',
       'behav2':'app.exampleBehaviours2'
     },
     
     init:function(){
        this.super();
        this.useBehaviour('behav1');
     },
     
     listeners:{
         "свойство событие1":function(){
            this.useOneBehaviour('behav1');
         },
         "свойство событие2":function(){
            this.useOneBehaviour('behav2');
         }
     }
  });
 * </pre>
 */
Define("core.Component", /** @lends core.Component.prototype */{

    /**
     * Регистр событий и их обработчиков
     * @type {Object}
     * @private
     */
    event: null,

    /**
     * Каунтер для числа созданных компонентов
     * @type {number}
     * @private
     */
    componentCount: 0,

    /**
     * Поведения
     * @type {Object}
     */
    behaviours: null,

    /**
     * уникальный идентификатор
     * @type {number}
     */
    id: null,

    /**
     * Информация о событиях и обработчиках
     * @private
     */
    listeners: null,

    /**
     * @constructor
     */
    init: function () {
        var res;

        //увеличим счётчик компонентов и используем его как уникальный идентификатор
        componentCount++;
        this.id = componentCount;

        //подключаем обработчики событий
        this.event = {};

        for (var event in this.listeners) {
            res = event.split(' ');
            // подпишемся на событие компонента
            if (res.length == 1) {
                this.on(res[0], this.listeners[ event ].bind(this));
            }
            // подпишемся на события одного из свойств компонента
            else {
                this[ res[0] ].on(res[1], this.listeners[ event ].bind(this));
            }
        }

        //инициализация поведений
        if (this.behaviours) {
            for (var i in this.behaviours) {
                this.behaviours[i] = new ( core.NS(this.behaviours[i]) )({
                    parent: this
                });
            }
        }

    },

    /**
     * Отправит событие на обработку с указанным объектом события
     * @param {string} name имя события на отправку
     * @param {Object} [options] представляющий событие объект
     * @param {Object} [context] контекст исполнения
     */
    fire: function (name, options, context) {

        var item;

        context = context || this;

        // добавляем свойства
        if (options) {
            if (!('eventName' in options))  options.eventName = name;
            if (!('eventTarget' in options)) options.eventTarget = this;
        }

        // если event=null тогда присвоим обьект
        // TODO убедится что это оптимальное решение
        this.event = this.event || {}

        //сработают все обработчики                
        if (name in this.event) {
            for (item in this.event[name]) {
                this.event[name][item].call(context, options);
            }
        }

        //TODO buble event вероятно устарела, проверить и если не используется удалить
        //bubble event 
        for (item in this.event['bubble']) {
            this.event['bubble'][item].call(context, options);
        }

    },

    /**
     * Установит обработчик на событие
     * @param {string} name имя события
     * @param {function (Object): ?} fun функция-обработчик
     */
    on: function (name, fun) {
        if (!(name in this.event)) {
            this.event[name] = [];
        }
        //FIXME: если передана fun, которая уже есть в массиве this.event[name]
        this.event[name].push(fun);
    },


    /**
     * Удалит обработчик на событии
     * @param {string} name имя события
     * @param {function (Object): ?} callback функция-обработчик
     */
    off: function (name, callback) {
        if (name in this.event) {
            var listeners = this.event[name], listenerCallback;
            for (var i = 0; i < listeners.length; i++) {
                listenerCallback = listeners[i];
                if (listenerCallback === callback) {
                    listeners.splice(i, 1);
                }
            }
        }
    },

    /*
     * Метод обеспечивающий всплытие
     * в данный момент не применяется, вероятно будет удален
     */
    liftEvent: function (src, opt) {
        //console.log('buble');

        var me = this;
        if (!src.on) return;

        switch (typeof opt) {
            //если второй параметр undefined
            case "undefined":
                src.on('bubble', function (e) {
                    me.fire(e.eventName, e);
                })
                break;

            //если второй параметр функция
            case "function":
                src.on('bubble', opt)
                break;

            case "object":
                /*src.on('bubble',function(e){
                 me.fire(e.eventName,e);
                 })*/
                break;
        }
    },


    //вставляет свойста в обьект
    apply: function (prop) {
        var dst = arguments.length === 1 ? this : arguments[ 0 ];

        for (var index in arguments) {
            var obj = arguments[index];
            if (dst !== obj) {
                for (var key in obj) {
                    dst[key] = obj[key];
                }
            }
        }

        return dst;
    },

    /**
     *  включает поведение. Тоесть обработчики события в поведеннии
     *  начнут срабатывать
     *  @param {string} name имя поведения
     */
    useBehaviour: function (name) {
        this.behaviours[name].status = true;
    },

    /**
     *  включим одно поведение, и выключим остальные
     *  @param {string} name имя поведения
     */
    useOneBehaviour: function (name) {
        this.unUseBehavioursAll();
        this.behaviours[name].status = true;
        //console.log( name,this.behaviours[name] );
    },


    /**
     *  выключим поведение
     */
    unUseBehaviour: function (name) {
        this.behaviours[i].status = false;
    },

    /**
     *  выключим все поведения
     */
    unUseBehavioursAll: function () {
        for (var i in this.behaviours) {
            this.behaviours[i].status = false;
        }
    }



});

//счётчик временно здесь, потом определим его куданибудь в утилиты
var componentCount = 0;
