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
     * @type {Object}
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
     * Временная метка старта проигрывания. Устанавливается методом setTime.
     */
    startPosition: null,

    /**
     * Конструктор объекта, позволяющего управлять воспроизведением
     * @constructor
     * @param {Object} cfg объект с дополнительными свойствами
     */
    init: function(cfg){
        this.super();
        this.apply(cfg);
        this.fetch = new app.movie.Fetch();
    },

    /**
     * Продолжает воспроизведение, начиная с текущей временной метки
     */
    play: function() {
        
    },

    /**
     * Производит остановку фильма на текущей временной метку.
     */
    stop: function () {

    },

    /**
     * Перемещает временную метку на указанную
     * @param {number} time временная метка.
     */
    setTime: function(time) {
        
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
     * Осуществляет немедленный безусловный переход на указанную временную метку, а затем воспроизводит текущий клип или фильм.
     * @param {number} timestamp временная метка
     */
    gotoAndPlay: function (timestamp) {
        this.setTime(timestamp);
        this.play();
    },

    /**
     * Осуществляет немедленный безусловный переход на указанную временную метку, а затем останавливает текущий клип или фильм.
     * @param {number} timestamp временная метка
     */
    gotoAndStop: function (timestamp) {
        this.setTime(timestamp);
        this.stop();
    },

    /**
     * Остановит проигрывание и перемотает на следующий кадр
     */
    nextFrame: function () {

    },

    /**
     * Остановит проигрывание и перемотает на предыдущий кадр
     */
    prevFrame: function () {

    },

    /**
     * Отрисует на сцене текущее состояние фигур и их свойств
     * @private
     */
    renderFrame: function () {

    }

}));