/**
 * @name app.model.Filter
 * @class
 * @extends {app.Model}
 * 
 * Класс описывает фильтр
 * 
 * * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             FilterCollection)
 *             |                             |
 *         Property                       (Filter)
 *             |                             |
 *     KeyframeCollection             PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection
 *                                           |
 *                                        Keyframe                        
 *                                                          
 * ====================================================================== *
 */

Define('app.model.Filter', /** @lends {app.model.Keyframe.prototype} */ {
	extend : app.Model,//
	/***
	 * Конструктор экземпляров
	 * @constructor
	 * @param {Object} prop объект с описанием экземпляра
	 */
	init : function () {                        
            this._super(); 
        }
});        
