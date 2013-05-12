/**
 * @name app.timeline.model
 * @class
 * @extends {app.Model}
 * 
 *          
 *                        (Composition)
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
 *                                     KeyframeCollection   
 *                                           |
 *                                        Keyframe
 */                  

'use strict';


//компонент в разработке
Define( 'app.model.Composition', /** @lends {app.model.Keyframe.prototype} */ {

    //Композиция это типичная модель
    extend: core.data.Model,

    /**
     * Пикселей в секунде. Одна из составляющих визуализации таймлайна
     * @type {Number}
     * @private
     */
    pixelsPerSecond: 100,

    /**
     * Зум. Одна из составляющих визуализации таймлайна
     * @type {Number}
     * @private
     */
    zoom: 1,

    /**
     * Ширина видимой области таймлайна. Одна из составляющих визуализации таймлайна
     * @type {Number}
     * @private
     */
    visibleWidth: 800,


    /**
     * Конструктор экземпляров
     * @constructor
     */
    init: function() {
        this._super();
        this.set( 'shapeCollection', new app.model.ShapeCollection() );
    },

	/**
	 * @method set
	 * @param {*} property
     * @param {Object} value
	 * @return undefined
	 **/
    set: function( property, value ) {
        var me = this;

        value.parent = me;

        this._super();
        this.fire( 'timelinepropertychange', {
            key: name,
            value: value
        });
        
        this.liftEvent(value);        
    },
            
    getLength: function( id ) {
        var result = 0;

        var shapeCollection = this.get( 'shapeCollection' );
        var propertyCollection = null;
        var keyCollection = null;
        
        //перебор shape
        shapeCollection.forEach( function( shape ) {
            //перебор фигур
            propertyCollection = shape.get( 'propertyCollection' );                
            propertyCollection.forEach( function( prop ) {
                keyCollection = prop.get( 'keyframeCollection' );
                keyCollection.forEach( function( keyframe ) {
                    if(keyframe.get('key')>result) result= keyframe.get('key');                   
                })                                            
            })                        
        });
        
        return result;
    },    


    //getId
    getId: function( id ) {
        //результат
        var result = false;

        var shapeCollection = this.get( 'shapeCollection' );
        var propertyCollection = null;
        var keyCollection = null;

        shapeCollection.forEach( function( shape ) {

            if( shape.id == id ) {
                result = shape;
            }

            if( result === false ) {
                propertyCollection = shape.get( 'propertyCollection' );
                propertyCollection.forEach( function( prop ) {
                    if( prop.id == id ) {
                        result = prop;
                    }

                    if( result === false ) {
                        keyCollection = prop.get( 'keyframeCollection' );
                        keyCollection.forEach( function( key ) {
                            if( key.id == id ) result = key;
                        });
                    }

                });
            }
        });

        return result;
    },


    //очистка
    clear: function() {
        this.set( 'shapeCollection', new app.model.ShapeCollection() );
    }

});
