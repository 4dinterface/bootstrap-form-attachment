/**
 * Базовый класс для ключевых кадров
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *     KeyframeCollection             PropertyCollection
 *             |                             |
 *        ( Keyframe )                    Property
 *                                           |
 *                                     KeyframeCollection
 *                                           |
 *                                       ( Keyframe )                       
 *                                                          
 * ====================================================================== *
 * 
 * Этот класс описывает ключ
 * основным методом здесь является set который генерирует событие keyframechange
 */

Define('app.model.Keyframe', /** @lends {app.model.Keyframe.prototype} */ {

	extend : core.data.Model,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 */
	init : function () {
            this._super();                    
	},
                
        /*autoFireEvent:{
            "set":"keyframechange"
        },*/

	/**
     * Установка значения свойства
	 * @method set
	 * @param {string} property
     * @param {*} value
	 **/
	set : function (property, value) {
            this._super();
            
            //console.log('set work');
            this.fire("keyframechange", {
                key: property,
                value: value
            });
            
	}
        

	//get : function (name) {
        //    this.super();
	//}
});

