/**
 * Класспреобразовывает json даные  во внутренние обьекты системы
 *
 * @returns {Object} Proxy объект представления таймлайна
 */
Define( "app.proxy.Reader", /** @lends {app.component} */{
    extend: app.Component,
    
    /**
     * Конструктор загрузчика, 
     * @constructor
     * @param {Object} cfg объект с аргументами, 
     * в качестве аргументов передаётся сцена и модель таймлайна
     */
    init: function( cfg) {
        this.super();
        this.apply( cfg);                         

        //загрузка эксперементальных данных(потом это нужно удалить)
        this.load(data);
    },

            
    /**
     * Загружает данные в модель таймлайна и сцену
     * @param {Object} data данные
     */     
     load:function(data){
        var tlShape,
            stShape;
        
        for (var i=0;i<data.length;i++){            
            tlShape=this.makeTimelineShape(data[i]);
            stShape=this.makeStageShape(data[i]); 
            
            tlShape.target=stShape;
            stShape.timeline=tlShape;
            
            this.timeline[i]=tlShape;
            this.stage.addChild( stShape );
        }
        console.log('timeline',this.timeline);
        //обновление
        this.stage.update();
    },            

    /**
     * Вспомогательный метод, создаёт модель shape, присваивает каждому анимируемому свойству,
     * коллекцию ключей
     * @param {Object} shape обьект описывающий shape
     */
    makeTimelineShape: function(shape){
        var ts=new app.model.Shape({}); 
        
        for (i in shape){
            if (i!="target") ts.set(i, this.makeKeyCollection(shape[i]) );                                        
        }
        return ts;
    },

    /**
     * создаёт shape для сцены
     * свойство xtype в target, указывает какой именно обьект конструировать
     * @param {Object} shape обьект описывающий shape
     */
    makeStageShape: function(shape){        
        var cls=shape.target.xtype;
        return new app.scene.shape[cls]({
            x:20,
            y:10
        })	         
    },
            

    /**
     * создаёт коллекцию ключей
     * для каждого ключа создаётся экземпляр класса model
     * @param {Object} shape обьект описывающий shape
     */
            
    makeKeyCollection: function(col){        

        var ret=new app.model.KeyframeCollection(),
            i=null;    
    
        for (i in col) {                  
            ret.set(i, new app.model.Keyframe( col[i] ));            
        }        
        return ret;
    }
    
});