
/**
 * @name app.business.model.KeyframeCollection
 * @extends {app.ObjectCollection}
 * 
 * ====================================================================== *
 * 
 *                          Project
 *                              |
 *                      SymbolCollection
 *                              |                              
 *                            Symbol
 *                              |                              
 *                     CompositionCollction
 *                              |                              
 *                         Composition
 *                              |
 *                       ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *      KeyframeCollection            PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     ( KeyframeCollection )  
 *                                           |
 *                                        Keyframe                      
 *                                                         
 * ====================================================================== *
 * 
 * Это коллекция ключей. Содержит метода позволяющие оперировать коллекцией
 * Set -создаёт или заменяет ключ в указанном времени
 * Get - возвращает ключ по времени
 * moveKeyframe - перемещает ключ
 * remove - удаляет ключ
 * lookupKeyframes - Попытается найти в коллекции 2 ключевых кадра, удволетворяющих условию
 * 
 * здесь следует размещать все методы оперирирующие ключами
 */
Define('app.business.model.KeyframeCollection', /** @lends {app.business.model.KeyframeCollection} */({
    extend:'core.data.ObjectCollection',
                    
    /**
     * @constructor
     * @param prop
     */
    init:function (prop){
        this._super();
    },
    
    /**
     * Перемещает ключ с одной позиции на другую
     * @param {int}  oldTime - время на которой распложен ключ
     * @param {Object} newTime - время куда мы ключ переместили 
     */      
        
    //bug - непроверен
    moveKeyframe:function(oldTime,newTime){
        
        // если ключ уже существет по новому времеи то нет необходимости его перемещать
        // два ключа немогут находится на одном времени
        if( this[newTime] !=null){
            //console.log('this[newTime]',this[newTime])
            return;
        }
        
        var keyframe=this.data[oldTime];
        //console.log(newTime,oldTime,keyframe);
        
        
        delete this[oldTime];//удалить
        delete this.data[oldTime];
        
        keyframe.set('key',newTime)
        this.data[newTime]=keyframe;
        this[newTime]=keyframe;
                                   
        //вызовем соответствующее событие
        this.fire("keyframecollectionchange", {
            key:newTime, 
            oldKey:oldTime,//возможножно бесполезные данные
            keyframeCollection:this,
            value:keyframe,
            operation:'moveKeyframe'
        });
    },

    // Подумать и сделать (нерв этот метод можеш написать ты)
    // групповое перемещание ключей 
    moveLineKeyframe:function(time,newTime){
        var me=this,
                    
            // определим насколько нужно переместить
            offsetTime=newTime-time,
            
            //границы блока            
            start=0, //начало блока
            end=0;   //конец блока

            //попробуем найти границ блока
        this.forEach(function(el,thTime){
                
            //если время меньше искомого то мы ищем старт
            if (thTime<time) {
                if (el['easing']=='none') start=0
                else if (start==0) start=thTime;
            } 
            // если время больше искомого то мы ищем end
            else {
                if (el['easing']=='none' && end==0 ) end=thTime;                
            }                      
        });
        
        console.log(start,end);

        // применим перемещение к блокам
        /*this.forEach(function(n){
            if(n ){
                var keyframe=this[oldTime];
                    delete this[oldTime];
                    this[newTime]=keyframe;       
            }                
        })*/
            
            
        //вызовем соответствующее событие
        this.fire("keyframecollectionchange", {
            key:newTime, 
            oldKey:oldTime,//возможножно бесполезные данные
            keyframeCollection:this,
            value:keyframe
        });
    },        
                

    /**
     * Удаляет ключ
     * @param {int}  time - время на которой распложен ключ
     */                          
    remove:function(time){
        //this[time].fire('onRemove');
        var keyframe=this[time]
        delete this[time];
        this.fire("keyframecollectionchange", {
            key:time,
            keyframeCollection:this,
            value:keyframe
        });    
    },
                
    /*findKey:function(time){
        var i=0,
            result=0;
        for (i=0; i<this.cash.length;i++){
            alert(this.cash[i]);
        }
    },*/

    /**
     * Попытается найти в коллекции 2 ключевых кадра, удволетворяющих условию
     * ВРЕМЯ_ПЕРВОГО <= ТЕКУЩЕЕ_ВРЕМЯ < ВРЕМЯ_ВТОРОГО
     * @param {number} elapsedTime текущее время с момента старта
     * @return {{ first: app.business.model.KeyframeCollection, second: app.business.model.KeyframeCollection }}
     */
    lookupKeyframes: function (elapsedTime) {

        var firstKeyframe,
            secondKeyframe,
            key,
            keyframe;
            //elapsedTime=parseInt( elapsedTime , 10); //Эксперементальная строчка (DIABLO)

        for (var i = 0, m = this.cache.length; i < m; i++) {
            key = parseInt(this.cache[i], 10);

            if (isFinite(key)) {
                keyframe = this[ key ];
                if (elapsedTime < key) {
                    secondKeyframe = keyframe;
                    break;
                }
                firstKeyframe = keyframe;
            }
        }

        return {
            first: firstKeyframe,
            second: secondKeyframe
        };
    },

    /**
     * Определение лимита слева ( "<=" )
     * Здесь равно, потому что может захватить и нуль.
     * @param {number} key
     * @return {app.business.model.Keyframe}
     */
    getLeftLimit:function(key){
        var result = null;
        this.forEach(function(item){
            if (item.get('key') <= key) {
                var isCloser = !result ||  item.get('key') > result.get('key');
                if (isCloser) {
                    result = item;
                }
            }
        });
        return result;        
    },

    /**
     * Определение лимита справа ( ">" )
     * Здесь неравно, чтобы не захватывал нуль
     * @param {number} key
     * @return {app.business.model.Keyframe}
     */
     getRightLimit:function(key){        
        var result = null;
        this.forEach(function(item){
            if (item.get('key') > key) {
                var isCloser = !result || item.get('key') < result.get('key');
                if (isCloser) {
                    result = item;
                }
            }
        });
        return result;        
    }        
    
}));
