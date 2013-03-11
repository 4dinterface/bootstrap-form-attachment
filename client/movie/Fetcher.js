/**
 * @author Максим Сысоев
 * компонент порсчитывает один кадр
 */

// макс внутреннее устройство будет виднее тебе, 
// с одной стороны слишком высокое разделение не должно стать помехой в скорости
// с другой хоть какнибудь резделить код на классы нужно
//

/**
 * Класс, который будет возвращать актуальные значения свойств из модели
 * @name app.movie.Fetch
 * @extends {app.Component}
 */
//TODO утвердить высчет значений свойств после утверждения модели таймлайна
//TODO не забыть про кеш вычислений
Define('app.movie.Fetch', /** @lends {app.movie.Fetch} */ ({

    extend: app.Component,

    /**
     * Данные, которыми может располагать Fetcher
     * @type {app.model.Timeline}
     * @private
     */
    timeline: null,
    
    //сцена
    stage: null,

    /**
     * Конструктор объекта, вытаскивающего значения свойств из модели
     * @constructor
     * @param {Object} cfg объект с аргументами
     */
    init: function(cfg){
        this.super();
        this.apply(cfg);
        this.currentValues = {};
    },

    /**
     * Установка таймлайна для просчитывателя
     * @param {app.model.Timeline} timeline данные о фигурах и их свойствах (таймлайн)
     */
    setTimeline: function (timeline) {
        this.timeline = timeline;
    },

    /**
     * Текущие значения свойств фигур
     * @type {Object}
     * @private
     */
    currentValues: null,

    /**
     * Высчитает значения свойств фигур на указанном времени с момента старта и вызовет коллбек для каждого из них.
     * @param {number} elapsedTime время с момента старта
     * @param {Function} callback коллбек. Первый аргумент - фигура, второй - имя свойства, третий - значение свойства
     * */
    fetch: function (elapsedTime, callback) {

        //TODO ещё предстоит

    },

    /**
     * Высчитает значения свойств модели на указанной временной метке и вернёт результат
     * @param {app.Model} model модель фигуры с её ключевыми значениями
     * @param {number} timestamp временная метка
     * @return {Object.<string, number>} вычситанные значения свойств для модели. Ключ - имя свойства, значение - значение свойства
     */
    fetchModel: function (model, timestamp) {
        var fetchedInfo, property, properties, keyframes;
        var firstKeyframe, secondKeyframe, fractionalTime;
        var timingFunction, easing;

        // TODO утвердить формат возвращаемый fetch'ем свойств
        fetchedInfo = {};
        //TODO утвердить класс для моделей, хранящих в себе фигуры и их ключевые свойства
        properties = model.prop;

        //TODO хоть какие либо мелкие функции для циклов будут?
        for (property in properties) if (properties.hasOwnProperty(property)) {
            keyframes = properties[property];
            //TODO утвердить поиск двух ключевых кадров после утверждения модели ключевых кадров
            //TODO поиск двух кейфреймов будет находиться в коллекции
            keyframes = keyframes.lookUpKeyframes(keyframes, timestamp);

            firstKeyframe = keyframes.first;
            secondKeyframe = keyframes.second;

            timingFunction = firstKeyframe.easing;

            //TODO подумать, как считать прогресс текущего времени между двумя ключевыми кадрами
            // НЕ ТЕСТИЛ. ФОРМУЛА МОЖЕТ БЫТЬ БАГНУТА
            fractionalTime = (firstKeyframe.key - secondKeyframe.key) / (timestamp - firstKeyframe.key);

            easing = timingFunction(fractionalTime);

            fetchedInfo[property] = this.blend(property, firstKeyframe.value, secondKeyframe.value, easing);
        }

        return fetchedInfo;
    },

    blend: function (property, from, to, progress) {
        //TODO будут ли какие-то другие форматы для свойств, нежели "число" ?
        return (to - from) * progress + from;
    }

}));