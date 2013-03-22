//компонент в разработке
Define('app.model.KeyframeCollection',{                    
        extend:app.ObjectCollection,
                
        //наследование
	init:function (prop){
            this.super();
        },
                        
	//setter
	set:function(name,val){
            var me=this;
            this.super();

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
        }
});