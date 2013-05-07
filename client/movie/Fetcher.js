/**
 * @author Максим Сысоев
 * Компонент Fetcher занимается просчитыванием и отрисовкой
 * значений свойств
 */
//TODO не забыть про кеш вычислений

/**
 * Класс, который будет возвращать актуальные значения свойств из модели
 * @name app.movie.Fetch
 * @extends {app.Component}
 * @class
 */
Define('app.movie.Fetch', /** @lends {app.movie.Fetch.prototype} */ ({

    extend: core.Component,

    /**
     * Данные, которыми может располагать Fetcher
     * @type {app.model.Timeline}
     */
    timeline: null,

    /**
     * Конструктор объекта, вытаскивающего и отрисовывающего актуальные значения свойств из модели
     * @constructor
     */
    init: function () {
        this._super();
    },

    /**
     * Высчитает значения свойств фигур на указанном времени с момента старта.
     * @param {number} elapsedTime время с момента старта
     * */
    fetch: function (elapsedTime) {
        var self = this;

        self.timeline.get('shapeCollection').forEach(function ( /** @type {app.model.Shape} */ item) {
            self.fetchShape(item, elapsedTime);
        });
    },

    /**
     * Высчитает текущие значения свойств для одной фигуры
     * @param {app.model.Shape} item слой (фигура и её данные)
     * @param {number} elapsedTime прошедшее с момента старта время
     */
    fetchShape: function (item, elapsedTime) {

        var self = this;
        var someoneRendered = false;

        item.get('propertyCollection').forEach(function (prop, propertyName) {

            var keyframesCollection = prop.get('keyframeCollection');
            var keyframes = keyframesCollection.lookupKeyframes(elapsedTime);

            var missingLeft = !keyframes.first;
            var missingRight = !keyframes.second;

            if (missingLeft || missingRight) {
                if (!missingLeft && missingRight) {
                    item.target[ propertyName ] = keyframes.first.get('value');
                } else if (missingLeft && !missingRight) {
                    item.target[ propertyName ] = keyframes.second.get('value');
                }
            } else {
                someoneRendered = true;
                item.target[ propertyName ] = self.interpolate(keyframes.first, keyframes.second, elapsedTime, propertyName);
            }

            item.target.renderToCache();
        });

        if (!someoneRendered) {
            self.fire('missingboth');
        }

    },

    /**
     * Высчитает текущее значение между двумя ключевыми кадрами
     * @param {app.model.Keyframe} firstKeyframe первый ключевой кадр
     * @param {app.model.Keyframe} secondKeyframe второй ключевой кадр
     * @param {number} elapsedTime прошедшее с момента старта время
     * @param {string} propertyName имя свойства
     * @return {number} текущее значение
     */
    interpolate: function (firstKeyframe, secondKeyframe, elapsedTime, propertyName) {
        var deltaTime,
            offset,
            fractionalTime,
            currentValue;

        deltaTime = secondKeyframe.get('key') - firstKeyframe.get('key');
        offset = firstKeyframe.get('key');
        fractionalTime = ( elapsedTime - offset ) / deltaTime;
        currentValue = this.blend(propertyName, firstKeyframe.get('value'), secondKeyframe.get('value'), fractionalTime);

        return currentValue;
    },

    /**
     * Вычислит текущее значение свойства
     * @param {string} property имя свойства
     * @param {number} from стартовая точка
     * @param {number} to конечная точка
     * @param {number} progress прогресс между двумя точками
     * @return {number} текущее значение при переданном прогрессе
     */
    blend: function (property, from, to, progress) {
        //TODO будут ли какие-то другие форматы для свойств, нежели "число" ?
        return (1.0 - progress) * from + progress * to;
    }

}));