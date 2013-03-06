/**
 * @docauthor Максим Сысоев <sisoev@superSite.com>
 * компонент отвечает за воспроизведения ролика и предоставляет api
 * позволяюще управлять воспроизведением
 * 
 * в качестве параметров принимает таймлайн и сцену
 * идея api взята из Flash
 *
 * @extends {app.Component}
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

    //таймлайн 
    timeline: null,
    
    //сцена
    stage: null,

    //конструктор
    init: function(cfg){
        this.super();
        this.apply(cfg);   
        
        //если будет отдельный класс для вычисления то можно р
        //this.fetch=new app.movie.Fetch({ })
    },

    //начать воспризведение
    play: function(){
        
    },
    
    stop: function(){
        
    },

    //переходит на кадр и начинаеит проигрывание
    gotoAndPlay: function(time){
        
    },
    
    //переходит на время, и начинает проигрывание
    gotoAndStop: function(){
        
    }
    
    //
    //nextFrame: function(){
    //},
    
    //
    //prevFrame: function(){
    //}

}));