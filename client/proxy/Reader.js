/**
 * Класспреобразовывает json даные  во внутренние обьекты системы
 *
 * @returns {Object} Proxy объект представления таймлайна
 */

Define( "app.proxy.Reader", /** @lends {app.component} */{
    extend: app.Component,

    init: function( prop) {
        this.super();
        this.apply( prop );                 

        //загрузка эксперементальных данных(потом это нужно удалить)
        this.load(data);
    },
            
    // загрузка
    load:function(data){
        var tlShape,
            stShape;
        
        for (var i=0;i<data.length;i++){            
            tlShape=this.makeTimelineShape(data[i]);
            stShape=this.makeStageShape();            
            
            this.timeline[i]=tlShape;
            this.stage.addChild( stShape );
        }
        this.stage.update();
    },            

    //        
    makeTimelineShape: function(shape){
        var ts=new app.Model({}); 
        
        for (i in shape){
            ts.set(i, new app.ObjectCollection( shape[i] ) );                
        }
        return ts;
    },

    //
    makeStageShape: function(shape){
        var s = new createjs.Shape();
        s.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, 40, 40);
	s.x = 12;
	s.y = 10;
	return s;
    }    
});