/**
 * @author Diablo
 *
 * Задача класса построить сцену, и перестраивать её согласно изменениям в таймлайне
 * @extends {app.Component}
 * @name app.movie.StageBuilder
 * 
 */

Define('app.movie.StageBuilder', /** @lends {app.movie.Movie.prototype} */ ({
    extend: core.Component,
    
    /**
     * Сцена
     * @type {app.scene.Stage}
     * @private
     */
    stage: null, 
    
    /**
     * timeline
     * @type {app.scene.Stage}
     * @private
     */    
    composition:null,
    
    /**
    * Конструктор объекта, позволяющего управлять воспроизведением
    * @constructor
    * @param {{ stage: app.scene.Stage, timeline: app.model.Timeline }} cfg объект с дополнительными свойствами
    */
    init: function (cfg) {
        var me=this;
        this._super();
        this.apply(cfg);            
        this.composition.on('load',function(){
            me.buildComposition();
            me.stage.update();
        });
    },
            
    /**
     * метод строит на сцене всю композицию целиком
     */
    buildComposition:function(){        
        var me=this;
        this.composition.get('shapeCollection').forEach(function(shape){                                    
            me.buildShape(shape);
        })
    },

    /**
     * метод строит на сцене один shape
     */
    buildShape:function(shape){
        var cls=shape.get('stageShape').xtype,
            stageShape=new app.scene.shape[cls](shape.get('stageShape'));
                                        
        shape.target=stageShape;
        stageShape.timeline=shape;
                        
        this.stage.addChild( stageShape );                            
    },

    /**
    * Установка таймлайна 
    * @param {app.model.Timeline} timeline данные о фигурах и их свойствах (таймлайн)
    */
    setComposition: function (timeline) {        
        //отпишемся от событий старой композиции
        if (this.composition) this.offListeners();
        //сменим композицию
        this.composition = composition;
        //подпишимся на события новой композиции
        this.onListeners();
    },
            
    onListeners:function(){

    },
            
    offListeners:function(){

    },        

     /**
     * Установка сцены
     * @param {app.scene.Stage} stage объект сцены
     */
     setStage: function (stage) {
        this.stage = stage;        
     }
     
}));

