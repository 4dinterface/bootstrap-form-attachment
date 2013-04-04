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
     * Конструктор объекта, позволяющего управлять воспроизведением
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function(cfg){
        this._super();
        this.apply(cfg);
        this.fetch = new app.movie.Fetch();
        this.tick = this.tick.bind(this);
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
        //TODO продолжительность всего таймлайна
        var duration = 1e3 * this.timeline.timeline.width / (this.timeline.timeline.pixelsPerSecond * this.timeline.timeline.zoom);
        var progress = elapsedTime === 0 ? 0 : duration / elapsedTime;

        // обход фигур
        this.timeline.forEach(function (item) {

            var data = item.data,
                prop,
                keyframes,
                firstKeyframe,
                secondKeyframe;

            // обход свойств
            for (prop in data) if (data.hasOwnProperty(prop)) {
                keyframes = data[prop];

                // поиск двух ключевых кадров для текущей временной метки
                keyframes.forEach(function (keyframe, key) {

                    key = key | 0;

                    if (typeof keyframe.get("key") !== "number") {
                        keyframe.set("key", key);
                    }

                    if (!firstKeyframe) {
                        firstKeyframe = keyframe;
                    } else if (!secondKeyframe) {
                        secondKeyframe = keyframe;
                    } else {
                        // есть 2 ключевых кадра. теперь выборка
                        if (keyframe.get("key") > elapsedTime) {
                            secondKeyframe = keyframe;
                        } else {
                            firstKeyframe = keyframe;
                        }
                    }

                });

                // интерполяция
                var offset,
                    scale,
                    fractionalTime,
                    currentValue;

                offset = firstKeyframe.get('key');
                scale = 1.0 / (secondKeyframe.get('key') - firstKeyframe.get('key'));

                fractionalTime = ( progress - offset) * scale;

                currentValue = (1.0 - fractionalTime) * firstKeyframe.get('value') + fractionalTime * secondKeyframe.get('value');

                item.target[ prop ] = Math.floor(currentValue);
            }

        });

        // на этом моменте все свойства просчитаны
        this.stage.update();
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
        this.fire("onframe", {
            elapsedTime: elapsedTime
        });
    }

}));