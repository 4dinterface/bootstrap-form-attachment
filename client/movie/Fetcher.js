/**
 * @docauthor Максим Сысоев <sisoev@superSite.com>
 * компонент порсчитывает один кадр
 * 
 */

// макс внутреннее устройство Movie 
// будет виднее тебе, 
//

Define('app.movie.Fetch',{
    extend:app.Component,    
    
    //таймлайн 
    timeline:null,
    
    //сцена
    stage:null,

    //конструктор
    init:function(cfg){
        this.super();
        this.apply(cfg);        
    }
    
    //тут магия на усмотрение максима :)        
})