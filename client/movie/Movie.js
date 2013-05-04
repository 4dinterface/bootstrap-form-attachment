/**
 * @author Максим Сысоев
 * компонент отвечает за воспроизведения ролика и предоставляет api
 * позволяюще управлять воспроизведением
 * 
 * в качестве параметров принимает таймлайн и сцену
 * идея api взята из Flash
 *
 * @extends {app.Component}
 * @name app.movie.Movie
 *
 * # Example
 * 
 * 
 *     @example
 *     var movie=new app.movie.Movie({
 *         timeline:timeline
 *         stage:stage
 *     });     
 *     
 *     //запускаем воспроизведение
 *     movie.play()
 *     
 *     //останавливаем воспроизведение
 *     movie.stop()
 *     
 *     //останавливаем воспроизведение
 *     movie.stop()
 *     
 *     //начинаем воспроизведение с указанной секунды
 *     movie.gotoAndPlay(3)
 *     
 *     //Показываем только один кадр на указанном времени и стоим в режиме паузы
 *     movie.gotoAndStop(3)
 *     
 *     
 */

Define('app.movie.Movie', /** @lends {app.movie.Movie} */ ({

    extend: app.Component,

    /**
     * Сцена, на которой проигрыватель будет отрисовывать текущие значения
     * @type {app.scene.Stage}
     * @private
     */
    stage: null,

    /**
     * Объект-интерполятор для проигрывателя
     * @type {app.movie.Fetch}
     * @private
     */
    fetch: null,

    /**
     * Прошедшее с момента старта время
     * @private
     * @type {number}
     */
    elapsedTime: null,

    /**
     * Текущее значение количества кадров в секунду
     * @private
     * @type {number}
     */
    framesPerSecond: 60,

    /**
     * Установит или получит текущее значение
     * кадров в секунду
     * @param {number} framesPerSecond
     */
    fps: function (framesPerSecond) {

        // тут проверка корректности аргумента
        var isCorrect = true;

        if (isCorrect) {
            createjs.Ticker.setFPS(framesPerSecond);
            this.framesPerSecond = framesPerSecond;
        }

    },

    /**
     * Конструктор объекта, позволяющего управлять воспроизведением
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function (cfg) {
        this._super();
        this.apply(cfg);

        this.fetch = new app.movie.Fetch();
        this.tick = this.tick.bind(this);

        this.fps(this.framesPerSecond);
        this.elapsedTime = 0;
    },

    /**
     * Продолжает воспроизведение, начиная с текущей временной метки
     */
    play: function() {
        createjs.Ticker.addEventListener('tick', this.tick);
        this.renderFrame();
    },

    /**
     * Производит остановку фильма на текущей временной метку.
     */
    stop: function () {
        createjs.Ticker.removeEventListener('tick', this.tick);
        this.renderFrame();
    },

    /**
     * Устанавливает прошедшее с момента старта время
     * @param {number} time время в миллисекундах.
     */
    setElapsedTime: function (time) {
        this.elapsedTime = time;
    },

    /**
     * Установка таймлайна для проигрывателя. Фактически, это прокси.
     * @param {app.model.Timeline} timeline данные о фигурах и их свойствах (таймлайн)
     */
    //TODO утвердить принадлежность данных таймлайна, после утверждения её модели
    setTimeline: function (timeline) {
        return this.fetch.setTimeline(timeline);
    },

    /**
     * Осуществляет немедленный безусловный переход на указанное время с момента старта, а затем воспроизводит текущий клип или фильм.
     * @param {number} elapsedTime временная метка
     */
    gotoAndPlay: function (elapsedTime) {
        this.setElapsedTime(elapsedTime);
        this.play();
    },

    /**
     * Осуществляет немедленный безусловный переход на указанное время с момента старта, а затем останавливает текущий клип или фильм.
     * @param {number} elapsedTime временная метка
     */
    gotoAndStop: function (elapsedTime) {
        this.stop();
        this.setElapsedTime(elapsedTime);
        this.renderFrame();
    },

    /**
     * Остановит проигрывание и перемотает на следующий кадр
     */
    nextFrame: function () {
        this.stop();
        this.onetimeTick();
    },

    /**
     * Остановит проигрывание и перемотает на предыдущий кадр
     */
    prevFrame: function () {
        this.stop();
        this.elapsedTime -= createjs.Ticker.getInterval();
        this.renderFrame();
    },

    /**
     * Отрисует текущее состояние фигур
     * @private
     */
    renderFrame: function () {

        var elapsedTime = this.elapsedTime;

        // обход фигур
        // get('shapeCollection') есть
        this.timeline.get('shapeCollection').forEach(function ( /** @type {app.model.Timeline} */ item) {

            var data = item.data,
                keyframes,
                firstKeyframe,
                secondKeyframe;

            // обход свойств
            item.get('propertyCollection').iterateProperties(function (prop,property ) {

                var keyframesCollection=property.get('keyframeCollection');
                keyframes = keyframesCollection.lookupKeyframes(elapsedTime);

                firstKeyframe = keyframes.first;
                secondKeyframe = keyframes.second;

                if (!secondKeyframe || !firstKeyframe) {
                    // отсутствует один из ключевых кадров
                    // для текущего времени
                    return;
                }

                // интерполяция
                var deltaTime,
                    offset,
                    fractionalTime,
                    currentValue;

                deltaTime = secondKeyframe.get('key') - firstKeyframe.get('key');
                offset = firstKeyframe.get('key');
                fractionalTime = ( elapsedTime - offset ) / deltaTime;
                currentValue = ( secondKeyframe.get('value') - firstKeyframe.get('value') ) * fractionalTime + firstKeyframe.get('value');

                item.target[ prop ] = Math.floor(currentValue);
                item.target.renderToCache();
            });

        });

        // на этом моменте все свойства просчитаны        
        this.stage.update();

        this.fire("onframe", {
            elapsedTime: this.elapsedTime
        });

    },

    /**
     * Вызовет tick после отрисовки, но только один раз.
     * @private
     */
    onetimeTick: function () {
        var self = this;
        var paperTick = function (e) {
            self.tick(e);
            createjs.Ticker.removeEventListener('tick', paperTick);
        };
        createjs.Ticker.addEventListener('tick', paperTick);
    },

    /**
     * Враппер отрисовщика. Вызывается из Ticker.
     * @param {Object} e объект события из createjs.Ticker
     * @private
     */
    tick: function (e) {
        var elapsedTime = this.elapsedTime += e.delta;
        this.renderFrame();
    }

}));