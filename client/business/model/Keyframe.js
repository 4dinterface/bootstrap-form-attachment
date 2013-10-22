/**
 * Базовый класс для ключевых кадров
 * @name app.model.Keyframe
 * @class
 * @extends {app.Model}
 * 
 * ====================================================================== *
 * 
 *                          (Project)
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
 *                                     KeyframeCollection   
 *                                           |
 *                                        (Keyframe)
 *                                                          
 * ====================================================================== *
 * 
 * Этот класс описывает ключ
 * основным методом здесь является set который генерирует событие keyframechange
 */

Define('app.business.model.Keyframe', /** @lends {app.model.Keyframe.prototype} */ {

	extend : core.data.Model,

	/***
	 * Конструктор экземпляров
	 * @constructor
	 */
	init : function () {
            this._super();                    
	},

    //автоматическая генерация события  при вызове метода
    /*autoFireEvent:{
        "set":"keyframechange"
    }*/
	
});

