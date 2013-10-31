/**
 * @author Diablo
 * Фасад бизнес слоя 
 *
 * @extends {app.Component}
 * @name app.business.Facade
 *
 * # Example
 * 
 *     @example
 *     
 *     //пример 1
 *     Бла Бла Бла
 *     
 *     //пример 2
 *     Бла бла бла
 *     
 * Класс фасад должен предоставить общие методы управлением слоем бизнес логики
 * 
 */
Define('app.business.Facade', /** @lends {app.movie.Movie.prototype} */ ({
    
    extend: core.Component,

// Эксперементы с интерфейсом
/*    interface:{
        i:100,
        x:200,
        z:function(){}
    },
*/    

    /**
     * Сцена, на которой проигрыватель будет отрисовывать текущие значения
     * @type {app.scene.Stage}
     * @private
     */
    stage: null,
    
    /**
    * Конструктор объекта, позволяющего управлять воспроизведением
    * @constructor
    * @param {{ stage: app.scene.Stage, timeline: app.model.Timeline }} cfg объект с дополнительными свойствами
    */
    init: function (cfg) {
        this.apply(cfg);
        this._super();  
        this.selectSymbol('root');
    },

    /**
     * Добавляет ключ в выбранный shape в указанное свойство
     * @param {number} elapsedTime временная метка
     * @public
     */
    addKeyToProperty: function (propertyName,value) {                        
        this.composition.get('shapeCollection').get(0).addKeyToProperty(
            propertyName,
            parseInt( this.movie.elapsedTime , 10),
            value
        );                                                
    },

    /**
     * Добавляет несколько ключей в выбранный shape в указанное свойство
     * @param {number} elapsedTime временная метка
     * @public
     */

    addKeysToProperty: function (prop,target) {                        
        var i;

        for (i in prop){

            target.addKeyToProperty(
                i,
                parseInt( this.movie.elapsedTime , 10),
                prop[i]
            );                                                    
        }

    
    },


    /**
     * Добавляет shape к коллекции Shape в композиции
     * @param {string} type  Тип Shape
     * @param {int} x  координата по x
     * @param {int} y  координата по y
     * @param {int} width  ширина
     * @param {int} height  высота
     * @public
     */    
    addShapeToComposition: function (type,x,y,width,height) {                        

        var shape = new app.business.model.Shape({});                    

        shape.set('stageShape',{
            xtype:type,
            x:x,
            y:y,
            width:width,
            height:height,
        });

        this.composition.get('shapeCollection').push( shape );
        //console.log('composition', this.composition.get('shapeCollection'));            
    },
            
    /**
     * Переключает Композицию
     * @param {number} elapsedTime временная метка
     * @public
     */
     selectSymbol: function (symbolId) {                
        //time получим из movie        
        this.symbol=this.project.get('symbolCollection').get( symbolId );
        this.selectComposition('0');
     },                
            
    /**
     * Переключает Композицию
     * @param {number} сompositionId айдишник композиции которую нужно сделать активной
     * @public
     * 
     * Метод должен сменить композицию
     */
     selectComposition: function (compositionId) {                
         this.composition= this.symbol.get ('compositionCollection').get(compositionId);                         
         
         //Построим композицию при помощи stageBuilder
         this.stageBuilder.setComposition(this.composition);
         this.stageBuilder.buildComposition();
         
         //установим композицию для movie
         this.movie.setTimeline(this.composition);                        
     }
     
}));
