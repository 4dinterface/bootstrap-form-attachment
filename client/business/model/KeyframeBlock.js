/*
 * Коллекция ключей именуемая блоком
 * это последовательность ключей начинающаяяся с первого ключа после easing:none или вообще певого ключа в свойстве
 * до певого ключа со свойством easing:none
 * Выборка ключей в блок производится в конструкторе
 * 
 * групповые методы работы над ключами
 * 
 * set(name,value) устанавливает свойство name в свойство value
 *
 * offset( ) псмещает все ключи на значение value. 
 * Именно смещает а не перемещает
 * 
 * fixPosition ( ) вызывается в конце перемещения time
 */
Define('app.business.model.KeyframeBlock', /** @lends {app.business.model.KeyframeCollection} */{    
    extend:'core.Component',                
    
    rightBorder:0,
    leftBorder:0,

    /**
     * @constructor
     * param prop
     */
    init:function (prop){                        
        var lastItem=null,
            workFlag=true; 
    
        this.time=prop.time;
        this.model=prop.model;
        this.keyframeBuffer=[];

        this.model.get('keyframeCollection').forEach(function(item){     
            
            //если слева нашли easing=none тода сбросим массив найденных ключей
            if(item.get('key')<this.time && item.get('easing')=='none'){                                                
                this.keyframeBuffer=[];                                                                
                this.leftBorder=lastItem? lastItem.get('key'):0; //ключ ограничивающий перемещение слева
            }               
            
            //если найдем easing=none справа тогда отключим дальнейшеее запоминание ключей
            if(item.get('key')>this.time && item.get('easing')=='none'){
                workFlag=false;//отключаем дальнейшее запоминание ключей
                this.rightBorder=item; //ключ ограничивающий перемещение справа
            }
            
            //если мы все еще работаем то запишем найденный ключ в массив
            if (workFlag){
                this.keyframeBuffer.push({
                    time:item.get('key'), //старое время, пригодится при перемещении
                    keyframe:item            //cсылка на сам блок
                })                
            }                                                
            
            lastItem=item;            
        },this)                                
        
        //console.log('block',this.keyframeBuffer);
        //console.log('model',this.model);                        
        
        this._super();                        
    },
    
    /*
     * применяет set к выборке
     * @param {string} name  Имя свойства.
     * @param  value значение
     */
    set:function(name,value){
        this.keyframeBuffer.forEach(function(item){ 
            item.keyframe.set(name,value);            
        })
    },
    
    /**
     * Смещает ключи в группе на значение value
     * @param {string} name Имя свойства.
     */
    offset:function(value){
        var me=this;            
        this.keyframeBuffer.forEach(function(item){         
            me.model.get('keyframeCollection').moveKeyframe(
               item.keyframe.get('key'), 
               Math.round(item.time+value)
            );
         })            
     },
     
     /** 
      * фиксирует позицию после перемещения
      * Если этого не сделать то повторное перемещение начнется со скачка 
      * так как результат перемещениея не учтен в time
      */
     fixPosition: function(){
        this.keyframeBuffer.forEach(function(item){
            item.time=item.keyframe.get('key');
        })         
     }
});