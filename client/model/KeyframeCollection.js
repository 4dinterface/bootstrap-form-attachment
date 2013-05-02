
/**
 * @name app.model.KeyframeCollection
 * @extends {app.ObjectCollection}
 * 
 * ====================================================================== *
 * 
 *                          Timeline
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *   (( KeyframeCollection ))            PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                  ( ( KeyframeCollection ) )   
 *                                           |
 *                                         Keyframe                       
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
Define('app.model.KeyframeCollection', /** @lends {app.model.KeyframeCollection} */({
        extend:'app.ObjectCollection',
                
        //наследование
        /**
        * @constructor
        * @param prop
        */
	init:function (prop){
            this._super();
        },
                        
	//setter
	set:function(name,val){
            var me=this;
            
            val.parent=me;
            this._super();

            //вызовем соответствующее событие
            this.fire("keyframecollectionchange", {
                key:name,
                collectionKeyframes:this,
                value:val
            });
            
            //обеспечим всплытие событий
            val.on('bubble',function(e){
                //добавим в соыие информацию о колекции кейфреймов
                e.collectionKeyframes=me;
                me.fire(e.eventName,e);
            })

            
        },
                
       /**
        * Перемещает ключ с одной позиции на другую
        * @param {int}  oldTime - время на которой распложен ключ
        * @param {Object} newTime - время куда мы ключ переместили 
        */          
        moveKeyframe:function(oldTime,newTime){
            var keyframe=this[oldTime];
            delete this[oldTime];
            this[newTime]=keyframe;
                                    
            //вызовем соответствующее событие
            this.fire("keyframecollectionchange", {
                key:newTime, 
                oldKey:oldTime,//возможножно бесполезные данные
                keyframeCollection:this,
                value:keyframe
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

            // применим перемещение к блокам
            this.forEach(function(n){
                if(n ){
                    var keyframe=this[oldTime];
                    delete this[oldTime];
                    this[newTime]=keyframe;       
                }                
            })
            
            
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
        },

    /**
     * Попытается найти в коллекции 2 ключевых кадра, удволетворяющих условию
     * ВРЕМЯ_ПЕРВОГО <= ТЕКУЩЕЕ_ВРЕМЯ < ВРЕМЯ_ВТОРОГО
     * @param {number} elapsedTime текущее время с момента старта
     * @return {{ first: app.model.KeyframeCollection, second: app.model.KeyframeCollection }}
     */
    lookupKeyframes: function (elapsedTime) {

        var firstKeyframe,
            secondKeyframe,
            key,
            keyframe;

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
    }
    
}));
