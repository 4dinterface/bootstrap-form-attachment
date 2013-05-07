/**
 * Класспреобразовывает json даные  во внутренние обьекты системы
 *
 * @returns {Object} Proxy объект представления таймлайна
 */
Define( "app.proxy.Reader", /** @lends {app.component} */{

    extend: core.Component,
    
    /**
     * Конструктор загрузчика, 
     * @constructor
     * @param {Object} cfg объект с аргументами, 
     * в качестве аргументов передаётся сцена и модель таймлайна
     */
    init: function( cfg) {
        this._super();        
        this.apply( cfg );                                                 
    },

            
    /**
     * Загружает данные в модель таймлайна и сцену
     * @param {Object} data данные
     */     
     load:function(data){
        var tlShape,
            stShape,
            me=this;
    
        //this.movie.gotoAndStop(1);
        this.timeline.clear();
        this.stage.removeAllChildren ();
        
        for (var i=0;i<data.length;i++){            
            tlShape=this.makeTimelineShape ( data[i] );
            stShape=this.makeStageShape    ( data[i] ); 
            
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
        console.log("SHAPE=====",shape);
        
        var props=shape.property;
        var filters=shape.filters;

        //Подключаем свойства
        for (i in props) {
            ts.get('propertyCollection').set(i, this.makeProperty(props[i],i) );                                        
        }

        //Подключаем фильтры
        for (i in filters) {
            //alert(i);
            ts.get('filterCollection').set(i, this.makeTimelineFilter(filters[i],i) );                                        
        }               
        
        return ts;
    },
            
    makeTimelineFilter: function(filter){
        var ts=new app.model.Filter({});         
                
        for (i in filter.property) {
            ts.get( 'propertyCollection' ).set(i, this.makeProperty( filter.property [ i ], i ) );                                        
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
        console.log('log',col);
        var me=this;
        return new app.model.Property({
            'name':name,
            'keyframeCollection': me.makeKeyCollection(col.keyframes),
            'type':col.type
        });
        
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
                        
        for (i in col) 
            ret.set(i, this.makeKeyframe ( i, col[i] )  );
        
        return ret;
    },
            

    
    makeKeyframe:function(i, col){
        col.key=parseInt(i, 10);            
        return new app.model.Keyframe( col );
    }

});