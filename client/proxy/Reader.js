// TODO можно попробывать заменить reader десериализацией
//      Мне кажется подход при котором каждый обьект формиуется отдельно начинает устаривать.
//      Возможно достаточно двух функций, 1я для моделей, 2я для коллекций

//      может быть чтобы неправить demoData есть смысл написать сначало сериализатор Writer 
//      результат сохранить в demoData и только потом переписывать reader


/**
 * Класс преобразовывает json даные  во сущности системы
 *
 * @returns {Object} Proxy объект представления таймлайна
 */
Define( "app.proxy.Reader", /** @lends {app.component} */{
    
    extend: "core.Component",    
    
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
     
     //todo- обеспечить загрузку проекта
     load:function(data,callback){
        var tlShape,
            stShape,
            me=this;
    
        //this.movie.gotoAndStop(1);
        //this.timeline.clear(); //временно заремарил
        
        //TODO нежелательно обращаться напрямую к stage из reader
        //this.stage.removeAllChildren ();
        
        //Функция создаёт проект        
        this.makeProject(data);
                        
        //console.log('timeline',this.timeline.get(0).get('x').get(1).set("select",true));
//        console.log('timeline',this.project);
        
        //Имитация асинхронности
        setTimeout(function(){
           me.project.fire("load",{}); 
           callback();
        },1);
        
        //TODO нежелательно обращаться напрямую к stage из reader
        //this.stage.update();     
    },            
    
    //Создаёт проект
    makeProject:function(data){
        for (var i in data){            
            this.project.get('symbolCollection').set( i, this.makeSymbol( data[i] ) );
        }
    },

    //Создадим символ
    makeSymbol:function(data){
        var symbol=new app.business.model.Symbol();
        for(var i in data) {            
            symbol.get('compositionCollection').set(i,this.makeComposition( data[i] ) );
        }        
        return symbol;
    },

    /**
     * Композиция
     */
    makeComposition:function(data){
        var composition =new app.business.model.Composition();
        for (var i=0;i<data.length;i++){            
            tlShape=this.makeTimelineShape ( data[i] );            
            composition.get('shapeCollection').push(tlShape);                        
        }
        return composition;
    },
    

    /**
     * Вспомогательный метод, создаёт модель shape, присваивает каждому анимируемому свойству,
     * коллекцию ключей
     * @param {Object} shape обьект описывающий shape
     */
    makeTimelineShape: function(shape){
        var ts=new app.business.model.Shape({}); 
        //console.log("SHAPE=====",shape);
        
        var props=shape.property;
        var filters=shape.filters;

        //Подключаем свойства
        for (i in props) {
            ts.get('propertyCollection').set(i, this.makeProperty(props[i],i) );                                        
        }

        //Подключаем фильтры
        for (i in filters) {
            //alert(i);
            ts.get('componentCollection').set(i, this.makeTimelineFilter(filters[i],i) );                                        
        }       
        
        ts.set('stageShape',shape.target);
        
        //console.log('shape.target',shape.target);
                
        return ts;
    },

            
    makeTimelineFilter: function(filter){
        var ts=new app.business.model.Component({});         
                
        for (i in filter.property) {
            ts.get( 'propertyCollection' ).set(i, this.makeProperty( filter.property [ i ], i ) );                                        
        }
        return ts;        
    },        
                                   
    /**
     * создаёт модель свойства
     * для каждого ключа создаётся экземпляр класса model
     * @param {Object} shape обьект описывающий shape
     */                                
    makeProperty: function(col,name){                        
        //console.log('log',col);
        var me=this;
        return new app.business.model.Property({
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
        var ret=new app.business.model.KeyframeCollection(),
            i=null,
            keyframe;
    
        
        for (i in col) 
            ret.set(i, this.makeKeyframe ( i, col[i] )  );
        
        return ret;
    },            
    
    makeKeyframe:function(i, col){
        col.key=parseInt(i, 10);            
        return new app.business.model.Keyframe( col );
    }    
});
