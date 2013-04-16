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
        this._super();
        this.apply( cfg);                         

        //загрузка эксперементальных данных(потом это нужно удалить)
        this.load(data);                
        
        //alert ( this.timeline.getId(8) );
    },

            
    /**
     * Загружает данные в модель таймлайна и сцену
     * @param {Object} data данные
     */     
     load:function(data){
        var tlShape,
            stShape,
            me=this;
        
        for (var i=0;i<data.length;i++){            
            tlShape=this.makeTimelineShape(data[i]);
            stShape=this.makeStageShape(data[i]); 
            
            tlShape.target=stShape;
            stShape.timeline=tlShape;
            
            this.timeline.get('shapeCollection').push(tlShape);                        
            this.stage.addChild( stShape );
        }
        //console.log('timeline',this.timeline.get(0).get('x').get(1).set("select",true));
        console.log('timeline',this.timeline);
        
        //обновление
        
        //Имитация асинхронности
        setTimeout(function(){
           me.timeline.fire("load",{}); 
        },1);
        
        this.stage.update();
    },            

    /**
     * Вспомогательный метод, создаёт модель shape, присваивает каждому анимируемому свойству,
     * коллекцию ключей
     * @param {Object} shape обьект описывающий shape
     */
    makeTimelineShape: function(shape){
        var ts=new app.model.Shape({}); 
        //console.log('ts',ts.get('propertyCollection'));
        
        for (i in shape){
            //if (i!="target") ts.get('propertyCollection').set(i, this.makeKeyCollection(shape[i]) );                                        
            if (i!="target") ts.get('propertyCollection').set(i, this.makeProperty(shape[i],i) );                                        
        }
        return ts;
    },

    /**
     * создаёт shape для сцены
     * свойство xtype в target, указывает какой именно обьект конструировать
     * @param {Object} shape обьект описывающий shape
     */
    makeStageShape: function(shape){        
        //console.log('shape=',shape);
        var cls=shape.target.xtype;                        
        return new app.scene.shape[cls](shape.target);
    },
            
    /**
     * создаёт модель свойства
     * для каждого ключа создаётся экземпляр класса model
     * @param {Object} shape обьект описывающий shape
     */                                
    makeProperty: function(col,name){                
        console.log(col);
        var prop =new app.model.Property(col);
        prop.set('name',name);
        prop.set('keyframeCollection',new this.makeKeyCollection(col) );
        return prop;
    },
            
    /**
     * создаёт коллекцию ключей
     * для каждого ключа создаётся экземпляр класса model
     * @param {Object} shape обьект описывающий shape
     */                
    makeKeyCollection: function(col){        
        var ret=new app.model.KeyframeCollection(),
            i=null,
            keyframe;
    
        for (i in col) {
            keyframe = new app.model.Keyframe( col[i] );
            keyframe.set('key', parseInt(i, 10));
            ret.set(i, keyframe);
        }        
        return ret;
    }
    
});