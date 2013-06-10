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

Define('app.movie.Movie', /** @lends {app.movie.Movie.prototype} */ ({

    extend: core.Component,

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
    * @param {{ stage: app.scene.Stage, timeline: app.model.Timeline }} cfg объект с дополнительными свойствами
    */
    init: function (cfg) {
        this._super();

        this.apply(cfg);
        this.fetch = new app.movie.Fetch();
        this.tick = this.tick.bind(this);

        this.setStage(cfg.stage);
        this.setTimeline(cfg.timeline);

        this.fps(this.framesPerSecond);
        this.elapsedTime = 0;

        var self = this;

        this.fetch.on('missingboth', function () {
            console.log("MOVIE: stop!");
            self.pause();
        });
    },

    /**
     * Продолжает воспроизведение, начиная с текущей временной метки
     */
    play: function() {
        createjs.Ticker.addEventListener('tick', this.tick);
        this.renderFrame();

        // TODO: Макс, по возможности в событие надо передать elapsedTime
        this.fire( 'onplay' );  // by nerv added
    },

    /**
     * Производит приостановку воспроизведения
     */
    pause: function () {
        createjs.Ticker.removeEventListener('tick', this.tick);

        this.fire( 'onpause' ); // by nerv added
    },

    /**
     * Производит остановку фильма на текущей временной метку.
     */
    stop: function () {
        this.pause();
        this.renderFrame();

        this.fire( 'onstop' );  // by nerv added
    },

    /**
     * Устанавливает прошедшее с момента старта время
     * @param {number} time время в миллисекундах.
     */
    setElapsedTime: function (time) {
        this.elapsedTime = time;
    },

    /**
    * Установка таймлайна для проигрывателя.
    * @param {app.model.Timeline} timeline данные о фигурах и их свойствах (таймлайн)
    */
    setTimeline: function (timeline) {
        var me=this;
        this.fetch.timeline = timeline;

        // максим я добавил реакцию на событие в модели
        // используй этот пример в качестве TODO
        timeline.on('keyframecollectionchange',function(){
            me.renderFrame();
        })
    },

     /**
     * Установка сцены для проигрывателя.
     * @param {app.scene.Stage} stage объект сцены
     */
     setStage: function (stage) {
        this.stage = stage;        
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

        this.fetch.fetch(elapsedTime);
        this.stage.update();
        
        this.fire("onframe", {
            elapsedTime: elapsedTime
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
     * @param {{type: string, paused: boolean, delta: number, time: number, runTime: number}} e объект события из createjs.Ticker
     * @private
     */
    tick: function (e) {
        var elapsedTime = this.elapsedTime += e.delta;
        this.renderFrame();
    }

}));