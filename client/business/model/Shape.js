/**
 * @name app.business.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 *
                            Project
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
 *      KeyframeCollection            (PropertyCollection)
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection   
 *                                           |
 *                                        Keyframe                                          
 *                                        
 * shape описывает shape
 * Может содержать множество полезных данных для view, таки как имя shape, цвет, свёрнут/развёрнут и тд
 * Каждый shape создаётся изначально со свойством propertyCollection, которое указывает на коллекцию анимируемых свойст
 */

//компонент в разработке
Define('app.business.model.Shape', /** @lends {app.model.Shape.prototype} */ {
	extend : core.data.Model,
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {
            this._super(); 
            this.set("propertyCollection", new app.business.model.PropertyCollection() ); 
            this.get("propertyCollection").parent=this;
            
            //WARNING свойство добавляются для всех, возможно есть резон пересмотреть механизм
            this.get("propertyCollection").set('x', new app.business.model.Property());
            this.get("propertyCollection").set('y', new app.business.model.Property());
            this.get("propertyCollection").set('width', new app.business.model.Property());
            this.get("propertyCollection").set('height', new app.business.model.Property());
           
           // непонятно как назвать толи filter толи FX
           this.set("filterCollection", new app.business.model.FilterCollection() ); 
           this.get("filterCollection").parent=this;

	},

                
                
    /**
     * Умное добавление ключа.
     * Если св-во отсутствует, то оно создаётся
     * Ключ добавляется
     *  
     */                        
    addKeyToProperty:function(propertyName,time,value){
        //попробуем получить св-во
        var prop=this.get('propertyCollection').get(propertyName) ;
            
        //если св-во несуществует попробуем его создать
        if(!prop) {
            prop=new app.business.model.Property({name:propertyName,});
            this.get('propertyCollection').set(propertyName,prop);
        }
            
        //добавим ключ
        prop.get('keyframeCollection').set(time,new app.business.model.Keyframe({
            "value":value,
            "easing":"line",
            "key":time
        }));
            
            //console.log('keyframeCollection',prop.get('keyframeCollection'));
     },

    /**
     * Возвращает длинну анимации shape
     */
    getLength:function(){
        var result=0,
            len=0,
            propertyCollection = this.get( 'propertyCollection' );
                      
        
        propertyCollection.forEach( function( prop ) {
            len=prop.getLength();
            if(len>result) result= len;                   
        })                        
        return result;
    }
        
});
